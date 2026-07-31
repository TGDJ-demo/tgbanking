import React from 'react';
import { useBank } from '../context/BankContext';
import { TrendingUp, ArrowUpRight, ArrowDownRight, PieChart, DollarSign } from 'lucide-react';

export const InvestmentsView: React.FC = () => {
  const { investments } = useBank();

  const totalValue = investments.reduce((sum, i) => sum + i.totalValue, 0);
  const totalGain = investments.reduce((sum, i) => sum + i.unrealizedGainLoss, 0);

  return (
    <div id="investments-view-container" data-testid="investments-view-container" className="space-y-4">
      {/* Header */}
      <div>
        <h1 id="heading-investments-title" data-testid="heading-investments-title" className="text-xl font-bold text-slate-900 tracking-tight">
          Wealth & Investment Portfolio
        </h1>
        <p id="subheading-investments" data-testid="subheading-investments" className="text-xs text-slate-500 mt-0.5">
          Monitor ETF, Equities, Mutual Funds, and IRA retirement holdings with real-time performance tracking.
        </p>
      </div>

      {/* Portfolio Overview Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div id="card-portfolio-total" data-testid="card-portfolio-total" className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Total Portfolio Value</span>
          <div id="val-portfolio-total-value" data-testid="val-portfolio-total-value" className="text-xl font-extrabold text-slate-900 font-mono mt-1">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div id="card-portfolio-gain" data-testid="card-portfolio-gain" className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Total Unrealized Gain</span>
          <div id="val-portfolio-unrealized-gain" data-testid="val-portfolio-unrealized-gain" className="text-xl font-extrabold text-emerald-800 font-mono mt-1 flex items-center space-x-1">
            <ArrowUpRight className="w-5 h-5 text-emerald-700" />
            <span>+${totalGain.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div id="card-portfolio-return" data-testid="card-portfolio-return" className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Total All-Time Return</span>
          <div id="val-portfolio-return-pct" data-testid="val-portfolio-return-pct" className="text-xl font-extrabold text-emerald-800 font-mono mt-1">
            +19.45%
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div id="table-investments-container" data-testid="table-investments-container" className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Asset Holdings & Securities</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table id="table-investments" data-testid="table-investments" className="w-full text-left text-xs text-slate-800">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Asset / Symbol</th>
                <th className="p-3">Asset Class</th>
                <th className="p-3">Shares Held</th>
                <th className="p-3 font-mono">Avg Cost</th>
                <th className="p-3 font-mono">Market Price</th>
                <th className="p-3 font-mono">Total Value</th>
                <th className="p-3 font-mono text-right">Unrealized P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {investments.map((asset) => (
                <tr key={asset.id} id={`holding-row-${asset.id}`} data-testid={`holding-row-${asset.id}`} className="hover:bg-slate-50">
                  <td className="p-3">
                    <div id={`holding-symbol-${asset.id}`} data-testid={`holding-symbol-${asset.id}`} className="font-mono font-bold text-slate-900 text-xs">
                      {asset.symbol}
                    </div>
                    <div className="text-[11px] text-slate-500">{asset.name}</div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded text-[10px] font-bold">
                      {asset.type}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-800">{asset.shares}</td>
                  <td className="p-3 font-mono text-slate-700">${asset.avgCost.toFixed(2)}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">${asset.currentPrice.toFixed(2)}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">${asset.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="p-3 font-mono font-bold text-right text-emerald-800">
                    +${asset.unrealizedGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
