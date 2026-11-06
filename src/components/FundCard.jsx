import React from "react";
import { TrendingUp, TrendingDown, Eye, PlusCircle, CheckCircle } from "lucide-react";

const riskColors = {
  Low: "bg-blue-50 text-blue-700 border-blue-200",
  Moderate: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  "Very High": "bg-red-50 text-red-700 border-red-200",
};

export default function FundCard({ fund, onViewDetails, onAddToCompare, compareList = [] }) {
  const isInCompare = compareList.includes(fund.id);
  const r1 = fund.returns.oneYear;
  const r3 = fund.returns.threeYear;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow flex flex-col gap-4">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-800 text-sm leading-snug">{fund.name}</h3>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 ${riskColors[fund.risk] || "bg-slate-50 text-slate-600 border-slate-200"}`}
          >
            {fund.risk}
          </span>
        </div>
        <p className="text-xs text-emerald-600 font-medium mt-1">{fund.category}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 rounded-lg p-2.5 text-center">
          <p className="text-xs text-slate-500 mb-0.5">1Y Return</p>
          <div className="flex items-center justify-center gap-1">
            {r1 >= 0 ? (
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-500" />
            )}
            <span className={`text-sm font-bold ${r1 >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {r1 >= 0 ? "+" : ""}{r1}%
            </span>
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5 text-center">
          <p className="text-xs text-slate-500 mb-0.5">3Y Return</p>
          <div className="flex items-center justify-center gap-1">
            {r3 >= 0 ? (
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-500" />
            )}
            <span className={`text-sm font-bold ${r3 >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {r3 >= 0 ? "+" : ""}{r3}%
            </span>
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5 text-center">
          <p className="text-xs text-slate-500 mb-0.5">Min. Investment</p>
          <p className="text-sm font-semibold text-slate-700">₹{fund.minInvestment.toLocaleString()}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5 text-center">
          <p className="text-xs text-slate-500 mb-0.5">Expense Ratio</p>
          <p className="text-sm font-semibold text-slate-700">{fund.expenseRatio}%</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{fund.description}</p>

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onViewDetails(fund)}
          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 text-white py-2 rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
        >
          <Eye className="h-3.5 w-3.5" />
          View Details
        </button>
        <button
          onClick={() => onAddToCompare(fund.id)}
          disabled={!isInCompare && compareList.length >= 3}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
            isInCompare
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : compareList.length >= 3
              ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
              : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
          }`}
        >
          {isInCompare ? (
            <CheckCircle className="h-3.5 w-3.5" />
          ) : (
            <PlusCircle className="h-3.5 w-3.5" />
          )}
          {isInCompare ? "Added" : "Compare"}
        </button>
      </div>
    </div>
  );
}
