import React from "react";
import { TrendingUp } from "lucide-react";

export default function Footer({ setCurrentPage }) {
  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Fund<span className="text-emerald-400">Wise</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              FundWise is a college-level educational project demonstrating a
              mutual fund investment platform. All data is fictional and for
              demonstration purposes only.
            </p>
            <div className="mt-4 inline-block bg-amber-900/40 border border-amber-700/50 rounded-lg px-3 py-2">
              <p className="text-xs text-amber-400 font-medium">
                ⚠️ Not real financial advice. For educational use only.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", page: "home" },
                { label: "Explore Funds", page: "explore" },
                { label: "Compare Funds", page: "compare" },
                { label: "My Portfolio", page: "portfolio" },
              ].map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => navigate(l.page)}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-white font-semibold mb-4">Learn</h3>
            <ul className="space-y-2 text-sm">
              {[
                "What Are Mutual Funds?",
                "Understanding SIP",
                "Risk & Returns",
                "Expense Ratio",
              ].map((topic) => (
                <li key={topic}>
                  <button
                    onClick={() => navigate("learn")}
                    className="hover:text-emerald-400 transition-colors text-left"
                  >
                    {topic}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2024 FundWise — College Web Development Project. All sample data
            is fictional.
          </p>
          <p className="text-xs text-slate-500">
            Built with React · Tailwind CSS · Recharts
          </p>
        </div>
      </div>
    </footer>
  );
}
