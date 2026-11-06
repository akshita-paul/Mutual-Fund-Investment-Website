import React from "react";
import {
  TrendingUp, Users, BarChart2, Layers,
  ArrowRight, ShieldCheck, BookOpen, PieChart,
} from "lucide-react";
import StatCard from "../components/StatCard";
import FundCard from "../components/FundCard";
import SIPCalculator from "../components/SIPCalculator";
import { mutualFundsData } from "../data/mutualFunds";

const popularFundIds = [1, 4, 5, 6];

export default function Home({ setCurrentPage, setSelectedFund, compareList, setCompareList, showToast }) {
  const popularFunds = mutualFundsData.filter((f) => popularFundIds.includes(f.id));

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
      showToast("You can compare up to 3 funds at a time.", "error");
    } else {
      setCompareList([...compareList, id]);
      showToast("Fund added to comparison!", "success");
    }
  };

  return (
    <div>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-700/40 border border-emerald-600/40 rounded-full px-4 py-1.5 mb-6">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-emerald-300 font-medium">
                Educational Project · Sample Data Only
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              Invest Smarter.{" "}
              <span className="text-emerald-400">Grow Your Future.</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Explore mutual funds, compare their performance, and understand your
              investment options — all in one clean, beginner-friendly dashboard.
              Built for first-time investors and college students.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("explore")}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
              >
                Explore Mutual Funds <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate("portfolio")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <PieChart className="h-4 w-4" /> View My Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Layers} label="Total Mutual Funds" value="250+" sub="Across all categories" color="emerald" />
          <StatCard icon={TrendingUp} label="Avg. Market Return" value="12.5%" sub="Historical average" color="blue" />
          <StatCard icon={Users} label="Registered Investors" value="10,000+" sub="Sample figure" color="violet" />
          <StatCard icon={BarChart2} label="Fund Categories" value="5" sub="Equity, Debt, Hybrid & more" color="amber" />
        </div>
      </section>

      {/* ── POPULAR FUNDS ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Popular Mutual Funds</h2>
            <p className="text-slate-500 text-sm mt-1">
              Sample funds for demonstration · Not real investment advice
            </p>
          </div>
          <button
            onClick={() => navigate("explore")}
            className="hidden sm:flex items-center gap-1.5 text-sm text-emerald-600 font-semibold hover:text-emerald-700"
          >
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularFunds.map((fund) => (
            <FundCard
              key={fund.id}
              fund={fund}
              onViewDetails={handleViewDetails}
              onAddToCompare={handleAddToCompare}
              compareList={compareList}
            />
          ))}
        </div>
        <div className="sm:hidden mt-4 text-center">
          <button
            onClick={() => navigate("explore")}
            className="text-sm text-emerald-600 font-semibold"
          >
            View All Funds →
          </button>
        </div>
      </section>

      {/* ── SIP CALCULATOR ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">SIP Calculator</h2>
          <p className="text-slate-500 text-sm mt-1">
            Estimate your potential returns with a Systematic Investment Plan
          </p>
        </div>
        <SIPCalculator />
      </section>

      {/* ── WHY INVEST ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Why Mutual Funds?</h2>
          <p className="text-slate-500 text-sm mt-1">Key benefits for new investors</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: Layers,
              title: "Diversification",
              desc: "Spread your money across many stocks and bonds, reducing risk compared to picking individual stocks.",
              color: "emerald",
            },
            {
              icon: ShieldCheck,
              title: "Professional Management",
              desc: "Expert fund managers research and manage investments on your behalf, saving you time and effort.",
              color: "blue",
            },
            {
              icon: BookOpen,
              title: "Start Small with SIP",
              desc: "Begin investing with as little as ₹500/month through a Systematic Investment Plan and build wealth gradually.",
              color: "violet",
            },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
              <div
                className={`inline-flex p-3 rounded-xl mb-4 ${
                  color === "emerald"
                    ? "bg-emerald-50"
                    : color === "blue"
                    ? "bg-blue-50"
                    : "bg-violet-50"
                }`}
              >
                <Icon
                  className={`h-6 w-6 ${
                    color === "emerald"
                      ? "text-emerald-600"
                      : color === "blue"
                      ? "text-blue-600"
                      : "text-violet-600"
                  }`}
                />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to Explore?</h2>
          <p className="text-emerald-100 mb-6 max-w-md mx-auto text-sm">
            Browse our sample fund library, compare performance, and learn what
            works best for your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate("explore")}
              className="bg-white text-emerald-700 px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-emerald-50 transition-colors"
            >
              Explore Funds
            </button>
            <button
              onClick={() => navigate("learn")}
              className="bg-emerald-500/50 border border-white/30 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-emerald-500/70 transition-colors"
            >
              Learn Basics
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
