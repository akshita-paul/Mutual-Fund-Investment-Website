import React, { useState } from "react";
import { TrendingUp, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", page: "home" },
  { label: "Explore Funds", page: "explore" },
  { label: "Compare Funds", page: "compare" },
  { label: "My Portfolio", page: "portfolio" },
  { label: "Learn", page: "learn" },
];

export default function Navbar({ currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2 group"
          >
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-navy-900 group-hover:text-emerald-600 transition-colors" style={{ color: "#0f172a" }}>
              Fund<span className="text-emerald-600">Wise</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => navigate("explore")}
              className="ml-3 px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-4 pt-2 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === link.page
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => navigate("explore")}
            className="w-full mt-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
