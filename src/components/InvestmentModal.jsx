import React, { useState } from "react";
import { X, PlusCircle } from "lucide-react";
import { mutualFundsData } from "../data/mutualFunds";

export default function InvestmentModal({ onClose, onAdd }) {
  const [fundId, setFundId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fundId) { setError("Please select a fund."); return; }
    if (!amount || Number(amount) <= 0) { setError("Please enter a valid amount."); return; }
    const selectedFund = mutualFundsData.find((f) => f.id === Number(fundId));
    if (Number(amount) < selectedFund.minInvestment) {
      setError(`Minimum investment for this fund is ₹${selectedFund.minInvestment.toLocaleString()}.`);
      return;
    }
    onAdd({
      id: Date.now(),
      fundId: Number(fundId),
      fundName: selectedFund.name,
      category: selectedFund.category,
      amount: Number(amount),
      date,
      currentReturn: selectedFund.returns.oneYear,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-800">Add Investment</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Mutual Fund *
            </label>
            <select
              value={fundId}
              onChange={(e) => { setFundId(e.target.value); setError(""); }}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            >
              <option value="">-- Choose a fund --</option>
              {mutualFundsData.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Investment Amount (₹) *
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setError(""); }}
              placeholder="e.g. 10000"
              min={500}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            {fundId && (
              <p className="text-xs text-slate-400 mt-1">
                Min. investment: ₹{mutualFundsData.find((f) => f.id === Number(fundId))?.minInvestment.toLocaleString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Investment Date *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> This is a simulated investment for demonstration purposes. 
              No real money is involved.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
            >
              Add Investment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
