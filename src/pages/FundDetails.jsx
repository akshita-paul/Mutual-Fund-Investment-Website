import React from "react";
import {
  ArrowLeft, TrendingUp, TrendingDown, PlusCircle, AlertCircle, Info,
  DollarSign, Percent, Target, ShieldCheck,
} from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import PerformanceChart from "../components/PerformanceChart";

const riskColors = {
  Low: "bg-blue-50 text-blue-700 border-blue-200",
  Moderate: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  "Very High": "bg-red-50 text-red-700 border-red-200",
};

function ReturnBadge({ label, value }) {
  const isPos = value >= 0;
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 text-center">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <div className={`flex items-center justify-center gap-1 text-lg font-bold ${isPos ? "text-emerald-600" : "text-red-600"}`}>
        {isPos ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        {isPos ? "+" : ""}{value}%
      </div>
      <p className="text-xs text-slate-400 mt-0.5">p.a.</p>
    </div>
  );
}

export default function FundDetails({ fund, setCurrentPage, onAddToPortfolio, showToast }) {
  if (!fund) return null;

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToPortfolio = () => {
    showToast(`${fund.name} opened in Add Investment. Go to My Portfolio to invest.`, "info");
    navigate("portfolio");
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow p-3">
          <p className="text-xs font-semibold text-slate-700">{payload[0].name}</p>
          <p className="text-sm font-bold" style={{ color: payload[0].payload.color }}>
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate("explore")}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Explore Funds
      </button>

      {/* Disclaimer */}
      <div className="flex gap-2 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">
          <strong>Educational Project:</strong> All fund data, returns, and charts shown here are fictional sample data
          for demonstration purposes. This does not represent a real investment product.
        </p>
      </div>

      {/* Title Row */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs font-medium px-3 py-1 rounded-full border ${riskColors[fund.risk]}`}>
                {fund.risk} Risk
              </span>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-3 py-1 rounded-full border border-emerald-200">
                {fund.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">{fund.name}</h1>
            <p className="text-slate-500 text-sm mt-2 max-w-xl leading-relaxed">{fund.description}</p>
          </div>
          <button
            onClick={handleAddToPortfolio}
            className="shrink-0 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
          >
            <PlusCircle className="h-4 w-4" /> Add to Portfolio
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
          <div className="bg-emerald-50 p-2 rounded-lg">
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Min. Investment</p>
            <p className="text-sm font-bold text-slate-800">₹{fund.minInvestment.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Percent className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Expense Ratio</p>
            <p className="text-sm font-bold text-slate-800">{fund.expenseRatio}% p.a.</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
          <div className="bg-violet-50 p-2 rounded-lg">
            <ShieldCheck className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Risk Level</p>
            <p className="text-sm font-bold text-slate-800">{fund.risk}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
          <div className="bg-amber-50 p-2 rounded-lg">
            <Target className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Category</p>
            <p className="text-sm font-bold text-slate-800 leading-tight">{fund.category}</p>
          </div>
        </div>
      </div>

      {/* Returns */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <ReturnBadge label="1-Year Return" value={fund.returns.oneYear} />
        <ReturnBadge label="3-Year (p.a.)" value={fund.returns.threeYear} />
        <ReturnBadge label="5-Year (p.a.)" value={fund.returns.fiveYear} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <PerformanceChart data={fund.historicalPerformance} title="12-Month NAV Performance" />

        {/* Asset Allocation */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Asset Allocation</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={fund.assetAllocation}
                cx="50%"
                cy="50%"
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `${value}%`}
                labelLine={false}
              >
                {fund.assetAllocation.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 mt-3 text-center">
            * Indicative allocation for illustration only
          </p>
        </div>
      </div>

      {/* Fund Objective */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-700">Fund Objective & Investment Approach</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{fund.objective}</p>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h4 className="text-xs font-semibold text-slate-700 mb-2">About the Fund</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            This fund targets investors with a {fund.risk.toLowerCase()} risk appetite looking for
            {fund.category === "Debt Funds" || fund.category === "Hybrid Funds"
              ? " stable, income-oriented returns over the medium term."
              : " long-term capital appreciation through equity participation."}
            {fund.category === "ELSS / Tax-Saving Funds" &&
              " It also provides tax benefits under Section 80C with a mandatory 3-year lock-in period."}
            {fund.category === "Index Funds" &&
              " Being passively managed, it tracks its benchmark index closely with minimal tracking error and very low costs."}
          </p>
        </div>
      </div>
    </div>
  );
}
