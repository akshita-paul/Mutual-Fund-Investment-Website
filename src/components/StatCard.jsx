import React from "react";

export default function StatCard({ icon: Icon, label, value, sub, color = "emerald" }) {
  const colorMap = {
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100" },
    blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-100" },
    violet: { bg: "bg-violet-50", icon: "text-violet-600", border: "border-violet-100" },
    amber: { bg: "bg-amber-50", icon: "text-amber-600", border: "border-amber-100" },
  };
  const c = colorMap[color] || colorMap.emerald;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`${c.bg} ${c.border} border p-3 rounded-xl`}>
        <Icon className={`h-6 w-6 ${c.icon}`} />
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-800 leading-tight">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
