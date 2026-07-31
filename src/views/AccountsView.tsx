import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { Wallet, Copy, Download, FileText, Check, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export const AccountsView: React.FC = () => {
  const { accounts, transactions, exportTransactions, addToast } = useBank();
  const [selectedAccountId, setSelectedAccountId] = useState<string>(accounts[0]?.id || 'acc_chk_101');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId) || accounts[0];
  const accountTxList = transactions.filter((t) => t.accountId === selectedAccountId);

  const handleCopyText = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    addToast({
      type: 'info',
      title: 'Copied to Clipboard',
      message: `${fieldName}: ${text}`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div id="accounts-view-container" data-testid="accounts-view-container" className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 id="heading-accounts-title" data-testid="heading-accounts-title" className="text-xl font-bold text-slate-900 tracking-tight">
            Accounts & Statements Portal
          </h1>
          <p id="subheading-accounts" data-testid="subheading-accounts" className="text-xs text-slate-500 mt-0.5">
            Manage deposit accounts, balances, routing numbers, and download official monthly PDF/CSV statements.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="btn-download-statement-csv"
            data-testid="btn-download-statement-csv"
            name="export-statement-csv"
            onClick={() => exportTransactions('CSV')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export CSV Statement</span>
          </button>
          <button
            id="btn-download-statement-pdf"
            data-testid="btn-download-statement-pdf"
            name="export-statement-pdf"
            onClick={() => exportTransactions('JSON')}
            className="px-3 py-1.5 bg-[#002D72] hover:bg-blue-900 text-white rounded text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export Official JSON/PDF</span>
          </button>
        </div>
      </div>

      {/* Accounts List Grid */}
      <div id="grid-accounts-list" data-testid="grid-accounts-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {accounts.map((acc) => {
          const isSelected = acc.id === selectedAccountId;
          return (
            <div
              key={acc.id}
              id={`account-card-${acc.id}`}
              data-testid={`account-card-${acc.id}`}
              onClick={() => setSelectedAccountId(acc.id)}
              className={`p-4 rounded-lg border transition cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/80 border-[#002D72] shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span id={`acc-type-tag-${acc.id}`} data-testid={`acc-type-tag-${acc.id}`} className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-[#002D72] uppercase">
                  {acc.accountType}
                </span>
                <span id={`acc-status-tag-${acc.id}`} data-testid={`acc-status-tag-${acc.id}`} className="text-[10px] font-bold text-emerald-800">
                  {acc.status}
                </span>
              </div>

              <h3 id={`acc-name-${acc.id}`} data-testid={`acc-name-${acc.id}`} className="text-xs font-bold text-slate-900 mt-2.5">
                {acc.name}
              </h3>
              <p id={`acc-num-${acc.id}`} data-testid={`acc-num-${acc.id}`} className="text-[11px] text-slate-500 font-mono mt-0.5">
                Account: {acc.accountNumber}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-200 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Current Balance</p>
                  <p id={`acc-balance-${acc.id}`} data-testid={`acc-balance-${acc.id}`} className="text-base font-bold text-slate-900 font-mono">
                    ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                {acc.interestRate > 0 && (
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {acc.interestRate}% APY
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Account Detail Panel */}
      {selectedAccount && (
        <div id="panel-account-details" data-testid="panel-account-details" className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <span id="label-selected-acc-type" data-testid="label-selected-acc-type" className="text-[10px] font-extrabold text-[#002D72] uppercase tracking-wider">
                Selected Account Specifications
              </span>
              <h2 id="text-selected-acc-title" data-testid="text-selected-acc-title" className="text-lg font-bold text-slate-900">
                {selectedAccount.name}
              </h2>
            </div>

            <div className="flex items-center space-x-4 bg-slate-50 p-2.5 rounded border border-slate-200 font-mono">
              <div>
                <p className="text-[10px] text-slate-500 font-medium">Available Balance</p>
                <p id="val-selected-available-balance" data-testid="val-selected-available-balance" className="text-base font-bold text-emerald-800">
                  ${selectedAccount.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {/* Account Spec Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
            <div>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Account Number</p>
              <div className="flex items-center space-x-1.5 mt-1">
                <span id="val-account-number" data-testid="val-account-number" className="text-xs font-mono font-bold text-slate-900">
                  {selectedAccount.accountNumber}
                </span>
                <button
                  id="btn-copy-account-number"
                  data-testid="btn-copy-account-number"
                  onClick={() => handleCopyText(selectedAccount.accountNumber, 'Account Number')}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {copiedField === 'Account Number' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">ABA Routing Number</p>
              <div className="flex items-center space-x-1.5 mt-1">
                <span id="val-routing-number" data-testid="val-routing-number" className="text-xs font-mono font-bold text-slate-900">
                  {selectedAccount.routingNumber}
                </span>
                <button
                  id="btn-copy-routing-number"
                  data-testid="btn-copy-routing-number"
                  onClick={() => handleCopyText(selectedAccount.routingNumber, 'Routing Number')}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {copiedField === 'Routing Number' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">IBAN Code</p>
              <div className="flex items-center space-x-1.5 mt-1 truncate">
                <span id="val-iban-code" data-testid="val-iban-code" className="text-xs font-mono font-bold text-slate-900 truncate">
                  {selectedAccount.iban}
                </span>
                <button
                  id="btn-copy-iban-code"
                  data-testid="btn-copy-iban-code"
                  onClick={() => handleCopyText(selectedAccount.iban, 'IBAN')}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer shrink-0"
                >
                  {copiedField === 'IBAN' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Currency / APY</p>
              <p id="val-currency-apy" data-testid="val-currency-apy" className="text-xs font-mono font-bold text-slate-900 mt-1">
                {selectedAccount.currency} • {selectedAccount.interestRate}% APY
              </p>
            </div>
          </div>

          {/* Mini Statement History Table */}
          <div>
            <h3 id="heading-mini-statement" data-testid="heading-mini-statement" className="text-xs font-bold text-slate-900 mb-2">
              Account Transaction Ledger Activity ({accountTxList.length} Records)
            </h3>
            <div className="overflow-x-auto rounded border border-slate-200">
              <table id="table-mini-statement" data-testid="table-mini-statement" className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider font-extrabold">
                  <tr>
                    <th className="p-2.5">Reference / Date</th>
                    <th className="p-2.5">Merchant / Payee</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">Channel</th>
                    <th className="p-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {accountTxList.slice(0, 10).map((tx) => (
                    <tr key={tx.id} id={`statement-row-${tx.id}`} data-testid={`statement-row-${tx.id}`} className="hover:bg-slate-50">
                      <td className="p-2.5">
                        <div id={`tx-ref-${tx.id}`} data-testid={`tx-ref-${tx.id}`} className="font-mono text-[11px] text-slate-800 font-bold">
                          {tx.referenceNumber}
                        </div>
                        <div className="text-[10px] text-slate-500">{tx.date}</div>
                      </td>
                      <td className="p-2.5 font-bold text-slate-900">{tx.merchant}</td>
                      <td className="p-2.5">{tx.category}</td>
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-mono text-[10px] border border-slate-200">
                          {tx.channel}
                        </span>
                      </td>
                      <td className={`p-2.5 text-right font-mono font-bold ${tx.amount > 0 ? 'text-emerald-800' : 'text-slate-900'}`}>
                        {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
