import React, { useState, useMemo } from "react";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import FundCard from "../components/FundCard";
import { mutualFundsData, categories, riskLevels } from "../data/mutualFunds";

const sortOptions = [
  { label: "1Y Return (High → Low)", key: "oneYear", dir: "desc" },
  { label: "1Y Return (Low → High)", key: "oneYear", dir: "asc" },
  { label: "3Y Return (High → Low)", key: "threeYear", dir: "desc" },
  { label: "5Y Return (High → Low)", key: "fiveYear", dir: "desc" },
  { label: "Min. Investment (Low → High)", key: "minInvestment", dir: "asc" },
  { label: "Expense Ratio (Low → High)", key: "expenseRatio", dir: "asc" },
];

export default function ExploreFunds({ setCurrentPage, setSelectedFund, compareList, setCompareList, showToast }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [risk, setRisk] = useState("All");
  const [minInv, setMinInv] = useState("All");
  const [sortIdx, setSortIdx] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewDetails = (fund) => {
    setSelectedFund(fund);
    navigate("fundDetails");
  };

  const handleAddToCompare = (id) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter((c) => c !== id));
      showToast("Fund removed from comparison.", "info");
    } else if (compareList.length >= 3) {
      showToast("Max 3 funds can be compared at a time.", "error");
    } else {
      setCompareList([...compareList, id]);
      showToast("Added to compare list!", "success");
    }
  };

  const minInvOptions = ["All", "Under ₹1,000", "Under ₹5,000", "Under ₹10,000"];

  const filtered = useMemo(() => {
    let data = [...mutualFundsData];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      );
    }
    if (category !== "All") data = data.filter((f) => f.category === category);
    if (risk !== "All") data = data.filter((f) => f.risk === risk);
    if (minInv === "Under ₹1,000") data = data.filter((f) => f.minInvestment < 1000);
    if (minInv === "Under ₹5,000") data = data.filter((f) => f.minInvestment < 5000);
    if (minInv === "Under ₹10,000") data = data.filter((f) => f.minInvestment < 10000);

    const opt = sortOptions[sortIdx];
    data.sort((a, b) => {
      const va = opt.key === "minInvestment" || opt.key === "expenseRatio"
        ? a[opt.key]
        : a.returns[opt.key];
      const vb = opt.key === "minInvestment" || opt.key === "expenseRatio"
        ? b[opt.key]
        : b.returns[opt.key];
      return opt.dir === "desc" ? vb - va : va - vb;
    });

    return data;
  }, [search, category, risk, minInv, sortIdx]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setRisk("All");
    setMinInv("All");
    setSortIdx(0);
  };
  const hasFilters = search || category !== "All" || risk !== "All" || minInv !== "All";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Explore Mutual Funds</h1>
        <p className="text-slate-500 text-sm mt-1">
          Browse {mutualFundsData.length} sample funds · All data is fictional
        </p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by fund name or category..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>

        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <select
            value={sortIdx}
            onChange={(e) => setSortIdx(Number(e.target.value))}
            className="pl-10 pr-8 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white appearance-none cursor-pointer min-w-[220px]"
          >
            {sortOptions.map((opt, i) => (
              <option key={i} value={i}>{opt.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-colors ${
            filtersOpen || hasFilters
              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300"
          }`}
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasFilters && (
            <span className="bg-emerald-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              !
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {filtersOpen && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">Risk Level</label>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {riskLevels.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">Min. Investment</label>
            <select
              value={minInv}
              onChange={(e) => setMinInv(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {minInvOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          {hasFilters && (
            <div className="sm:col-span-3 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <X className="h-3.5 w-3.5" /> Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Category Chips */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              category === c
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Compare banner */}
      {compareList.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-5 flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-blue-700 font-medium">
            {compareList.length} fund{compareList.length > 1 ? "s" : ""} selected for comparison
          </p>
          <button
            onClick={() => navigate("compare")}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            Compare Now →
          </button>
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-100">
          <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-700 mb-1">No funds found</h3>
          <p className="text-sm text-slate-400 mb-4">Try adjusting your search or filters.</p>
          <button onClick={clearFilters} className="text-sm text-emerald-600 font-semibold">
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs text-slate-400 mb-4">
            Showing {filtered.length} fund{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((fund) => (
              <FundCard
                key={fund.id}
                fund={fund}
                onViewDetails={handleViewDetails}
                onAddToCompare={handleAddToCompare}
                compareList={compareList}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
