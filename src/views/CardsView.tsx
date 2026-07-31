import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { CreditCard, Snowflake, Lock, Gift, ShieldAlert, Sparkles, AlertCircle, PlusCircle } from 'lucide-react';

export const CardsView: React.FC = () => {
  const { creditCards, toggleFreezeCreditCard, addToast } = useBank();
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [newRequestedLimit, setNewRequestedLimit] = useState('30000');

  const activeCard = creditCards[0];

  const handleRequestLimitIncrease = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLimitModal(false);
    addToast({
      type: 'success',
      title: 'Credit Limit Increase Approved',
      message: `Your credit line has been adjusted to $${parseInt(newRequestedLimit).toLocaleString()}.00 USD.`,
    });
  };

  return (
    <div id="cards-view-container" data-testid="cards-view-container" className="space-y-4">
      {/* Header */}
      <div>
        <h1 id="heading-cards-title" data-testid="heading-cards-title" className="text-xl font-bold text-slate-900 tracking-tight">
          Card Management & Reward Center
        </h1>
        <p id="subheading-cards" data-testid="subheading-cards" className="text-xs text-slate-500 mt-0.5">
          Lock cards instantly, view virtual numbers, redeem points, and manage spending caps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Card Visual & Primary Actions (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Physical Visa Card Visual Box */}
          <div
            id="visual-credit-card-container"
            data-testid="visual-credit-card-container"
            className={`relative p-5 rounded-lg bg-gradient-to-tr from-[#001D4A] via-[#002D72] to-blue-900 border ${
              activeCard?.isFrozen ? 'border-amber-500 grayscale opacity-80' : 'border-blue-400/40'
            } shadow-md text-white space-y-6 overflow-hidden`}
          >
            {activeCard?.isFrozen && (
              <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded text-[10px] font-extrabold flex items-center space-x-1 shadow-sm">
                <Snowflake className="w-3.5 h-3.5 animate-spin" />
                <span>CARD FROZEN</span>
              </div>
            )}

            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] text-blue-200 font-mono tracking-widest uppercase">Western Trust Premier</p>
                <p className="text-base font-black tracking-tight">{activeCard?.cardType.replace('_', ' ')}</p>
              </div>
              <CreditCard className="w-7 h-7 text-blue-200" />
            </div>

            <div className="font-mono text-lg tracking-widest font-bold text-slate-100">
              {activeCard?.cardNumberMasked}
            </div>

            <div className="flex justify-between items-end text-xs font-mono">
              <div>
                <p className="text-[9px] text-blue-200/80">Cardholder</p>
                <p className="font-bold text-slate-100">{activeCard?.cardHolderName}</p>
              </div>
              <div>
                <p className="text-[9px] text-blue-200/80">Expires</p>
                <p className="font-bold text-slate-100">{activeCard?.expiryDate}</p>
              </div>
            </div>
          </div>

          {/* Quick Security Controls */}
          <div id="box-card-controls" data-testid="box-card-controls" className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900">Instant Card Security Controls</h3>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
              <div className="flex items-center space-x-3">
                <Snowflake className="w-5 h-5 text-[#002D72]" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Freeze Physical & Digital Card</div>
                  <div className="text-[10px] text-slate-500">Instantly block new POS authorizations</div>
                </div>
              </div>

              <button
                id={`switch-freeze-card-${activeCard?.id}`}
                data-testid={`switch-freeze-card-${activeCard?.id}`}
                onClick={() => toggleFreezeCreditCard(activeCard?.id || 'card_sig_001')}
                className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer border ${
                  activeCard?.isFrozen
                    ? 'bg-amber-500 border-amber-600 text-slate-950'
                    : 'bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {activeCard?.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                id="btn-request-limit-increase"
                data-testid="btn-request-limit-increase"
                onClick={() => setShowLimitModal(true)}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded border border-slate-300 text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-emerald-700" />
                <span>Request Credit Limit Increase</span>
              </button>

              <button
                id="btn-report-lost-card"
                data-testid="btn-report-lost-card"
                onClick={() => addToast({ type: 'warning', title: 'Card Replacement Dispatched', message: 'Current card blocked. Replacement card ordered via FedEx Express.' })}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-red-800 rounded border border-slate-300 text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-red-700" />
                <span>Report Lost / Stolen Card</span>
              </button>
            </div>
          </div>
        </div>

        {/* Rewards & Balances Sidebar (1 Col) */}
        <div className="space-y-4">
          {/* Rewards Points Widget */}
          <div id="widget-reward-points" data-testid="widget-reward-points" className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between text-[#002D72] font-bold text-xs">
              <span>Rewards & Cashback</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div id="val-reward-points" data-testid="val-reward-points" className="text-2xl font-extrabold text-slate-900 font-mono">
                {activeCard?.rewardsPoints.toLocaleString()} PTS
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Equivalent to $482.50 Cashback Statement Credit</p>
            </div>
            <button
              id="btn-redeem-rewards"
              data-testid="btn-redeem-rewards"
              onClick={() => addToast({ type: 'success', title: 'Rewards Redeemed', message: 'Applied $100 statement credit from 10,000 pts.' })}
              className="w-full py-2 bg-[#002D72] hover:bg-blue-900 text-white font-bold text-xs rounded transition cursor-pointer"
            >
              Redeem Points For Cash
            </button>
          </div>

          {/* Statement Balance Details */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-2.5 text-xs">
            <h3 className="font-bold text-slate-900">Credit Line Specifications</h3>
            <div className="space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Credit Line Limit:</span>
                <span className="text-slate-900 font-bold">${activeCard?.creditLimit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Current Balance:</span>
                <span className="text-amber-800 font-bold">${activeCard?.currentBalance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Available Credit:</span>
                <span className="text-emerald-800 font-bold">${activeCard?.availableCredit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Limit Modal */}
      {showLimitModal && (
        <div id="modal-limit-increase" data-testid="modal-limit-increase" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleRequestLimitIncrease} className="bg-white border border-slate-200 rounded-lg max-w-md w-full p-5 shadow-xl space-y-3 text-slate-900">
            <h3 className="text-sm font-bold text-slate-900">Request Credit Limit Increase</h3>
            <p className="text-xs text-slate-600">Current Limit: ${activeCard?.creditLimit.toLocaleString()} USD</p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">New Desired Credit Limit ($)</label>
              <input
                id="input-new-credit-limit"
                data-testid="input-new-credit-limit"
                type="number"
                value={newRequestedLimit}
                onChange={(e) => setNewRequestedLimit(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#002D72]"
                required
              />
            </div>

            <div className="flex space-x-2 pt-1">
              <button
                type="button"
                onClick={() => setShowLimitModal(false)}
                className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold rounded cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                id="btn-submit-limit-increase"
                data-testid="btn-submit-limit-increase"
                type="submit"
                className="w-1/2 py-2 bg-[#002D72] hover:bg-blue-900 text-white font-bold text-xs rounded cursor-pointer transition"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
