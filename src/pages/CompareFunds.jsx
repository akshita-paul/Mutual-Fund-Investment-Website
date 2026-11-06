import React, { useState } from "react";
import { X, Scale, ArrowRight, PlusCircle } from "lucide-react";
import { mutualFundsData } from "../data/mutualFunds";

function ReturnCell({ value, allValues }) {
  const max = Math.max(...allValues);
  const min = Math.min(...allValues);
  const isMax = value === max && allValues.filter((v) => v === max).length < allValues.length;
  const isMin = value === min && allValues.filter((v) => v === min).length < allValues.length;
  return (
    <span
      className={`font-semibold ${
        isMax ? "text-emerald-600" : isMin ? "text-red-500" : "text-slate-700"
      }`}
    >
      {value >= 0 ? "+" : ""}{value}%
    </span>
  );
}

export default function CompareFunds({ compareList, setCompareList, setCurrentPage, setSelectedFund, showToast }) {
  const [addingFund, setAddingFund] = useState(false);
  const [pickId, setPickId] = useState("");

  const compareFunds = mutualFundsData.filter((f) => compareList.includes(f.id));

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeFund = (id) => {
    setCompareList(compareList.filter((c) => c !== id));
    showToast("Fund removed from comparison.", "info");
  };

  const availableFunds = mutualFundsData.filter((f) => !compareList.includes(f.id));

  const handlePickFund = () => {
    if (!pickId) return;
    if (compareList.length >= 3) {
      showToast("Max 3 funds allowed.", "error");
      return;
    }
    setCompareList([...compareList, Number(pickId)]);
    setPickId("");
    setAddingFund(false);
    showToast("Fund added to comparison!", "success");
  };

  const rows = [
    { label: "Category", render: (f) => f.category },
    { label: "Risk Level", render: (f) => (
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
        f.risk === "Low" ? "bg-blue-50 text-blue-700 border-blue-200"
        : f.risk === "Moderate" ? "bg-amber-50 text-amber-700 border-amber-200"
        : f.risk === "High" ? "bg-orange-50 text-orange-700 border-orange-200"
        : "bg-red-50 text-red-700 border-red-200"
      }`}>{f.risk}</span>
    )},
    {
      label: "1Y Return",
      render: (f, funds) => (
        <ReturnCell value={f.returns.oneYear} allValues={funds.map((x) => x.returns.oneYear)} />
      ),
      compare: true,
    },
    {
      label: "3Y Return (p.a.)",
      render: (f, funds) => (
        <ReturnCell value={f.returns.threeYear} allValues={funds.map((x) => x.returns.threeYear)} />
      ),
      compare: true,
    },
    {
      label: "5Y Return (p.a.)",
      render: (f, funds) => (
        <ReturnCell value={f.returns.fiveYear} allValues={funds.map((x) => x.returns.fiveYear)} />
      ),
      compare: true,
    },
    {
      label: "Expense Ratio",
      render: (f, funds) => {
        const values = funds.map((x) => x.expenseRatio);
        const min = Math.min(...values);
        const max = Math.max(...values);
        return (
          <span className={`font-semibold ${
            f.expenseRatio === min && values.filter(v => v === min).length < values.length
              ? "text-emerald-600"
              : f.expenseRatio === max && values.filter(v => v === max).length < values.length
              ? "text-red-500"
              : "text-slate-700"
          }`}>{f.expenseRatio}%</span>
        );
      },
      compare: true,
    },
    {
      label: "Min. Investment",
      render: (f) => `₹${f.minInvestment.toLocaleString()}`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Compare Mutual Funds</h1>
        <p className="text-slate-500 text-sm mt-1">
          Select up to 3 funds to compare side by side · Sample data only
        </p>
      </div>

      {/* Empty state */}
      {compareList.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
          <Scale className="h-14 w-14 text-slate-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No funds selected</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-xs mx-auto">
            Go to Explore Funds and click "Compare" on any fund to add it here.
          </p>
          <button
            onClick={() => navigate("explore")}
            className="flex items-center gap-2 mx-auto bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            Explore Funds <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Add Fund Picker */}
      {compareList.length > 0 && compareList.length < 3 && (
        <div className="mb-5">
          {addingFund ? (
            <div className="flex gap-3 items-center bg-white border border-slate-200 rounded-xl p-4">
              <select
                value={pickId}
                onChange={(e) => setPickId(e.target.value)}
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="">-- Select a fund --</option>
                {availableFunds.map((f) => (
                  <option key={f.id} value={f.id}>{f.name} ({f.category})</option>
                ))}
              </select>
              <button
                onClick={handlePickFund}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => { setAddingFund(false); setPickId(""); }}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAddingFund(true)}
              className="flex items-center gap-2 border-2 border-dashed border-slate-300 hover:border-emerald-400 text-slate-500 hover:text-emerald-600 px-5 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              <PlusCircle className="h-4 w-4" /> Add a Fund to Compare
            </button>
          )}
        </div>
      )}

      {/* Comparison Table */}
      {compareFunds.length > 0 && (
        <>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left text-xs font-semibold text-slate-500 px-6 py-4 w-40">
                      Metric
                    </th>
                    {compareFunds.map((fund) => (
                      <th key={fund.id} className="px-6 py-4 text-left min-w-[200px]">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-800 leading-snug">{fund.name}</p>
                            <p className="text-xs text-emerald-600 mt-0.5">{fund.category}</p>
                          </div>
                          <button
                            onClick={() => removeFund(fund.id)}
                            className="text-slate-300 hover:text-red-400 transition-colors mt-0.5 shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                    {compareFunds.length < 3 && (
                      <th className="px-6 py-4 text-left min-w-[160px]">
                        <div className="text-xs text-slate-300 font-normal">Slot available</div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => (
                    <tr
                      key={row.label}
                      className={ri % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                    >
                      <td className="px-6 py-4 text-xs font-medium text-slate-500 whitespace-nowrap">
                        {row.label}
                      </td>
                      {compareFunds.map((fund) => (
                        <td key={fund.id} className="px-6 py-4 text-sm text-slate-700">
                          {row.render(fund, compareFunds)}
                        </td>
                      ))}
                      {compareFunds.length < 3 && <td className="px-6 py-4" />}
                    </tr>
                  ))}
                  {/* View Details row */}
                  <tr className="bg-white border-t border-slate-100">
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">Actions</td>
                    {compareFunds.map((fund) => (
                      <td key={fund.id} className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedFund(fund);
                            navigate("fundDetails");
                          }}
                          className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    ))}
                    {compareFunds.length < 3 && <td />}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Best value
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> Worst value
            </span>
            <span>· For returns and expense ratio only</span>
          </div>
        </>
      )}

      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <p className="text-xs text-amber-700">
          <strong>Note:</strong> All figures shown are fictional sample data for educational purposes.
          Green highlighting indicates the best-performing fund for that metric; red indicates lowest.
        </p>
      </div>
    </div>
  );
}
