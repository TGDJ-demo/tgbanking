import React, { useState, useMemo } from 'react';
import { useBank } from '../context/BankContext';
import { Search, Filter, ArrowUpDown, Download, FileText, ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';
import { Transaction } from '../types';

export const TransactionsView: React.FC = () => {
  const { transactions, exportTransactions } = useBank();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'date' | 'amount' | 'merchant'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTxDetail, setActiveTxDetail] = useState<Transaction | null>(null);

  const categories = ['ALL', 'Groceries', 'Dining', 'Shopping', 'Utilities', 'Salary', 'Transfer', 'Investment', 'Travel', 'Healthcare', 'Services'];

  const filteredAndSortedTx = useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesSearch =
          tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || tx.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortField === 'date') {
          return sortOrder === 'desc' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
        } else if (sortField === 'amount') {
          return sortOrder === 'desc' ? Math.abs(b.amount) - Math.abs(a.amount) : Math.abs(a.amount) - Math.abs(b.amount);
        } else {
          return sortOrder === 'desc' ? b.merchant.localeCompare(a.merchant) : a.merchant.localeCompare(b.merchant);
        }
      });
  }, [transactions, searchTerm, selectedCategory, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedTx.length / pageSize) || 1;
  const paginatedTx = filteredAndSortedTx.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div id="transactions-view-container" data-testid="transactions-view-container" className="space-y-4">
      {/* Header & Export Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 id="heading-transactions-title" data-testid="heading-transactions-title" className="text-xl font-bold text-slate-900 tracking-tight">
            Transaction Ledger & Audit Trail
          </h1>
          <p id="subheading-transactions" data-testid="subheading-transactions" className="text-xs text-slate-500 mt-0.5">
            Search, filter, sort, and validate transaction records with stable Selenium test locators.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="btn-export-csv"
            data-testid="btn-export-csv"
            name="export-csv"
            onClick={() => exportTransactions('CSV')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export CSV</span>
          </button>
          <button
            id="btn-export-pdf"
            data-testid="btn-export-pdf"
            name="export-pdf"
            onClick={() => exportTransactions('JSON')}
            className="px-3 py-1.5 bg-[#002D72] hover:bg-blue-900 text-white rounded text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export PDF/JSON</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div id="toolbar-transaction-filters" data-testid="toolbar-transaction-filters" className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm flex flex-col md:flex-row gap-2.5">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            id="input-transaction-search"
            data-testid="input-transaction-search"
            name="search"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search merchant, reference ID, description..."
            className="w-full bg-slate-50 border border-slate-300 rounded pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#002D72]"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-48">
          <select
            id="select-transaction-category"
            data-testid="select-transaction-category"
            name="category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#002D72]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Select */}
        <div className="w-full md:w-48">
          <select
            id="select-transaction-sort"
            data-testid="select-transaction-sort"
            name="sort"
            value={`${sortField}_${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('_');
              setSortField(field as any);
              setSortOrder(order as any);
            }}
            className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#002D72]"
          >
            <option value="date_desc">Date (Newest First)</option>
            <option value="date_asc">Date (Oldest First)</option>
            <option value="amount_desc">Amount (Highest First)</option>
            <option value="amount_asc">Amount (Lowest First)</option>
            <option value="merchant_asc">Merchant (A - Z)</option>
          </select>
        </div>

        {/* Page Size Select */}
        <div className="w-full md:w-32">
          <select
            id="select-page-size"
            data-testid="select-page-size"
            name="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#002D72]"
          >
            <option value={5}>5 Per Page</option>
            <option value={10}>10 Per Page</option>
            <option value={25}>25 Per Page</option>
            <option value={50}>50 Per Page</option>
          </select>
        </div>
      </div>

      {/* Transactions Data Table */}
      <div id="table-transactions-container" data-testid="table-transactions-container" className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table id="table-transactions" data-testid="table-transactions" className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider font-extrabold">
              <tr>
                <th className="p-3">Reference & Date</th>
                <th className="p-3">Account</th>
                <th className="p-3">Merchant / Payee</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Amount ($ USD)</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {paginatedTx.map((tx) => (
                <tr
                  key={tx.id}
                  id={`tx-row-${tx.id}`}
                  data-testid={`tx-row-${tx.id}`}
                  className="hover:bg-slate-50 transition"
                >
                  <td className="p-3 font-mono">
                    <div id={`tx-ref-${tx.id}`} data-testid={`tx-ref-${tx.id}`} className="font-bold text-slate-900">
                      {tx.referenceNumber}
                    </div>
                    <div className="text-[10px] text-slate-500">{tx.date}</div>
                  </td>
                  <td className="p-3 text-slate-700 font-medium">{tx.accountName}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-base">{tx.merchantLogo || '💳'}</span>
                      <span id={`tx-merchant-name-${tx.id}`} data-testid={`tx-merchant-name-${tx.id}`} className="font-bold text-slate-900">
                        {tx.merchant}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200 text-[10px] font-medium">
                      {tx.category}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      id={`tx-status-badge-${tx.id}`}
                      data-testid={`tx-status-badge-${tx.id}`}
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                        tx.status === 'COMPLETED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : tx.status === 'PENDING'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-red-50 text-red-800 border-red-200'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className={`p-3 text-right font-mono font-bold text-xs ${tx.amount > 0 ? 'text-emerald-800' : 'text-slate-900'}`}>
                    {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      id={`btn-view-tx-detail-${tx.id}`}
                      data-testid={`btn-view-tx-detail-${tx.id}`}
                      onClick={() => setActiveTxDetail(tx)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-[#002D72] rounded border border-slate-300 transition cursor-pointer"
                      title="Inspect Transaction Details"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div id="pagination-controls" data-testid="pagination-controls" className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            Showing <span id="text-page-start" data-testid="text-page-start" className="font-bold text-slate-900">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span id="text-page-end" data-testid="text-page-end" className="font-bold text-slate-900">{Math.min(currentPage * pageSize, filteredAndSortedTx.length)}</span> of{' '}
            <span id="text-total-count" data-testid="text-total-count" className="font-bold text-slate-900">{filteredAndSortedTx.length}</span> entries
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-page-prev"
              data-testid="btn-page-prev"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-700 rounded border border-slate-300 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span id="text-current-page-num" data-testid="text-current-page-num" className="px-2 font-mono font-bold text-slate-900">
              Page {currentPage} of {totalPages}
            </span>
            <button
              id="btn-page-next"
              data-testid="btn-page-next"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-700 rounded border border-slate-300 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {activeTxDetail && (
        <div
          id="modal-transaction-detail"
          data-testid="modal-transaction-detail"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-lg p-5 shadow-xl text-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 id="modal-tx-title" data-testid="modal-tx-title" className="text-sm font-bold text-slate-900">
                Transaction Inspection Receipt
              </h3>
              <button
                id="btn-close-modal-tx"
                data-testid="btn-close-modal-tx"
                onClick={() => setActiveTxDetail(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Reference Number</span>
                  <span id="modal-val-ref" data-testid="modal-val-ref" className="font-bold text-[#002D72] text-xs">
                    {activeTxDetail.referenceNumber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Settlement Amount</span>
                  <span
                    id="modal-val-amount"
                    data-testid="modal-val-amount"
                    className={`font-bold text-xs ${activeTxDetail.amount > 0 ? 'text-emerald-800' : 'text-slate-900'}`}
                  >
                    ${Math.abs(activeTxDetail.amount).toFixed(2)} USD
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Merchant Name</span>
                  <span className="font-bold text-slate-900">{activeTxDetail.merchant}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Category</span>
                  <span className="font-bold text-slate-900">{activeTxDetail.category}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Timestamp</span>
                  <span className="text-slate-700">{activeTxDetail.date}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Processing Channel</span>
                  <span className="text-slate-700">{activeTxDetail.channel}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">Bank Description Note</span>
                <p className="text-slate-800 mt-0.5 font-sans text-xs">{activeTxDetail.description}</p>
              </div>
            </div>

            <button
              id="btn-close-tx-modal-bottom"
              data-testid="btn-close-tx-modal-bottom"
              onClick={() => setActiveTxDetail(null)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded border border-slate-300 cursor-pointer transition"
            >
              Close Receipt Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
