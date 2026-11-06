import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, AlertCircle } from "lucide-react";

function sipCalculate(monthly, rate, years) {
  const r = rate / 100 / 12;
  const n = years * 12;
  if (r === 0) {
    return { total: monthly * n, returns: 0, final: monthly * n };
  }
  const final = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const total = monthly * n;
  const returns = final - total;
  return { total, returns, final };
}

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const { total, returns, final } = sipCalculate(monthly, rate, years);

  const pieData = [
    { name: "Amount Invested", value: Math.round(total), color: "#3b82f6" },
    { name: "Est. Returns", value: Math.round(returns), color: "#10b981" },
  ];

  const fmtINR = (n) =>
    "₹" + Number(n.toFixed(0)).toLocaleString("en-IN");

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow p-3">
          <p className="text-xs font-semibold text-slate-700">{payload[0].name}</p>
          <p className="text-sm font-bold" style={{ color: payload[0].payload.color }}>
            {fmtINR(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-emerald-600" />
        <h2 className="text-lg font-bold text-slate-800">SIP Calculator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Monthly Investment</label>
              <span className="text-sm font-bold text-emerald-600">{fmtINR(monthly)}</span>
            </div>
            <input
              type="range"
              min={500}
              max={100000}
              step={500}
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>₹500</span><span>₹1,00,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Expected Annual Return</label>
              <span className="text-sm font-bold text-emerald-600">{rate}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1%</span><span>30%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Investment Duration</label>
              <span className="text-sm font-bold text-emerald-600">{years} yr{years > 1 ? "s" : ""}</span>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 yr</span><span>40 yrs</span>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Total Invested</span>
              <span className="text-sm font-semibold text-slate-800">{fmtINR(total)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Est. Returns</span>
              <span className="text-sm font-semibold text-emerald-600">
                +{fmtINR(returns)}
              </span>
            </div>
            <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">Final Value</span>
              <span className="text-lg font-bold text-slate-800">{fmtINR(final)}</span>
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs text-slate-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 text-center">
            <p className="text-2xl font-bold text-slate-800">{fmtINR(final)}</p>
            <p className="text-xs text-slate-500">Estimated Corpus</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 flex gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">
          <strong>Disclaimer:</strong> These are estimated projections based on a constant rate of return. 
          Actual returns may vary. Mutual fund investments are subject to market risk. 
          This calculator is for educational purposes only.
        </p>
      </div>
    </div>
  );
}
