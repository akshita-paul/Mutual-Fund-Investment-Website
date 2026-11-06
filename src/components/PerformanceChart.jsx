import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export default function PerformanceChart({ data, title = "NAV Performance" }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
          <p className="text-xs font-semibold text-slate-700">{label}</p>
          <p className="text-sm font-bold text-emerald-600">
            NAV: ₹{payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v}`}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="nav"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ fill: "#10b981", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#059669" }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-slate-400 mt-3 text-center">
        * Sample historical NAV data for illustration only
      </p>
    </div>
  );
}
