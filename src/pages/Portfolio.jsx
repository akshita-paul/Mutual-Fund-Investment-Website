import React, { useState } from "react";
import {
  TrendingUp, TrendingDown, PlusCircle, Trash2,
  BarChart2, AlertCircle,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import InvestmentModal from "../components/InvestmentModal";
import { portfolioMonthlyData } from "../data/mutualFunds";

const INITIAL_PORTFOLIO = [
  {
    id: 1,
    fundId: 1,
    fundName: "BlueChip Growth Fund",
    category: "Equity Funds",
    amount: 25000,
    date: "2024-01-15",
    currentReturn: 18.4,
  },
  {
    id: 2,
    fundId: 4,
    fundName: "Nifty 50 Index Fund",
    category: "Index Funds",
    amount: 15000,
    date: "2024-02-10",
    currentReturn: 15.8,
  },
  {
    id: 3,
    fundId: 5,
    fundName: "TaxSaver ELSS Fund",
    category: "ELSS / Tax-Saving Funds",
    amount: 10000,
    date: "2024-03-20",
    currentReturn: 21.3,
  },
];

function fmtINR(n) {
  return "₹" + Number(n.toFixed(0)).toLocaleString("en-IN");
}

export default function Portfolio({ showToast }) {
  const [investments, setInvestments] = useState(INITIAL_PORTFOLIO);
  const [showModal, setShowModal] = useState(false);

  const totalInvested = investments.reduce((s, i) => s + i.amount, 0);
  const totalCurrentValue = investments.reduce(
    (s, i) => s + i.amount * (1 + i.currentReturn / 100),
    0
  );
  const totalPnL = totalCurrentValue - totalInvested;
  const totalReturn = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  const handleAdd = (investment) => {
    setInvestments((prev) => [...prev, investment]);
    showToast("Investment added successfully!", "success");
  };

  const handleRemove = (id) => {
    setInvestments((prev) => prev.filter((i) => i.id !== id));
    showToast("Investment removed.", "info");
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow p-3">
          <p className="text-xs font-semibold text-slate-700">{label}</p>
          <p className="text-sm font-bold text-emerald-600">
            {fmtINR(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const isPositive = totalPnL >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Portfolio</h1>
          <p className="text-slate-500 text-sm mt-1">
            Simulated investments · No real money involved
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <PlusCircle className="h-4 w-4" /> Add Investment
        </button>
      </div>

      {/* Disclaimer */}
      <div className="flex gap-2 items-start bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6">
        <AlertCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700">
          This is a <strong>simulated portfolio</strong> for educational purposes. No real transactions occur.
          Current values are calculated using sample annual return rates.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <p className="text-xs text-slate-500 mb-1">Total Invested</p>
          <p className="text-xl font-bold text-slate-800">{fmtINR(totalInvested)}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <p className="text-xs text-slate-500 mb-1">Current Value</p>
          <p className="text-xl font-bold text-slate-800">{fmtINR(totalCurrentValue)}</p>
        </div>
        <div className={`rounded-xl border shadow-sm p-5 ${isPositive ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"}`}>
          <p className="text-xs text-slate-500 mb-1">Total P&L</p>
          <div className={`flex items-center gap-1 text-xl font-bold ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {isPositive ? "+" : ""}{fmtINR(totalPnL)}
          </div>
        </div>
        <div className={`rounded-xl border shadow-sm p-5 ${isPositive ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"}`}>
          <p className="text-xs text-slate-500 mb-1">Overall Return</p>
          <p className={`text-xl font-bold ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
            {isPositive ? "+" : ""}{totalReturn.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 mb-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Portfolio Performance (Sample 12-Month Data)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={portfolioMonthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
              width={55}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ fill: "#10b981", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#059669" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Holdings ({investments.length})</h3>
        </div>

        {investments.length === 0 ? (
          <div className="text-center py-16">
            <BarChart2 className="h-10 w-10 text-slate-200 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-600 mb-1">No investments yet</h3>
            <p className="text-sm text-slate-400 mb-4">Click "Add Investment" to get started.</p>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm text-emerald-600 font-semibold"
            >
              + Add Investment
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {["Fund Name", "Category", "Date", "Invested", "Current Value", "P&L", "Return %", "Action"].map(
                    (h) => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-500 px-6 py-3 whitespace-nowrap">
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {investments.map((inv, i) => {
                  const currentValue = inv.amount * (1 + inv.currentReturn / 100);
                  const pnl = currentValue - inv.amount;
                  const ret = (pnl / inv.amount) * 100;
                  const pos = pnl >= 0;

                  return (
                    <tr key={inv.id} className={`border-t border-slate-50 ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-800 leading-snug">{inv.fundName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-emerald-600 font-medium">{inv.category}</span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">{inv.date}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700 whitespace-nowrap">
                        {fmtINR(inv.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700 whitespace-nowrap">
                        {fmtINR(currentValue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-semibold ${pos ? "text-emerald-600" : "text-red-500"}`}>
                          {pos ? "+" : ""}{fmtINR(pnl)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            pos ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                          }`}
                        >
                          {pos ? "+" : ""}{ret.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleRemove(inv.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                          title="Remove investment"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <InvestmentModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
