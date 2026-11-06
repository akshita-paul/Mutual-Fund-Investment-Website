import React, { useState } from "react";
import { X, BookOpen, ChevronRight } from "lucide-react";

const TOPICS = [
  {
    id: 1,
    icon: "📊",
    title: "What Are Mutual Funds?",
    summary:
      "A mutual fund pools money from many investors and invests it in a diversified portfolio of stocks, bonds, or other assets.",
    content: `
**What Are Mutual Funds?**

A mutual fund is a financial vehicle that pools money from many investors to invest in a diversified portfolio of securities such as stocks, bonds, government securities, or money market instruments.

**How It Works:**
- Investors put money into the fund by buying units (like shares).
- A professional fund manager uses that pooled money to invest in various securities.
- Profits (or losses) are shared proportionally among all investors.

**Key Terms:**
- **NAV (Net Asset Value):** The price of one unit of the mutual fund. It is calculated daily.
- **Units:** The share you hold in a mutual fund. More units = bigger ownership.
- **Fund Manager:** A professional who decides where to invest the money.

**Example:**
Imagine 100 friends pool ₹10,000 each to buy a diverse collection of stocks. No single person could afford that diversity alone, but together they can. That's the basic idea of a mutual fund.

**Why Use Them?**
Mutual funds offer access to professional management and diversification even with small investment amounts.
    `,
  },
  {
    id: 2,
    icon: "⚙️",
    title: "How Do Mutual Funds Work?",
    summary:
      "Funds collect money from investors, invest it across assets, and professional managers monitor and rebalance the portfolio.",
    content: `
**How Do Mutual Funds Work?**

**Step-by-Step Process:**

1. **You Invest:** You buy units of a mutual fund by investing money.
2. **Pooling:** Your money is pooled with other investors' money.
3. **Investing:** The fund manager invests the pooled corpus in stocks, bonds, or other assets according to the fund's objective.
4. **NAV Calculation:** Every business day, the fund calculates its Net Asset Value (NAV) based on market prices.
5. **Returns:** If the investments grow, the NAV increases and so does the value of your units.

**Types of Returns:**
- **Capital Gains:** Profit from selling your units at a higher NAV.
- **Dividends:** Some funds distribute a portion of profits periodically.

**When You Want Your Money Back:**
You can redeem (sell) your units at the current NAV. The money is credited to your bank account within 1–3 business days (for most funds).

**Regulatory Oversight:**
In India, mutual funds are regulated by SEBI (Securities and Exchange Board of India), ensuring investor protection and transparency.
    `,
  },
  {
    id: 3,
    icon: "🗂️",
    title: "Types of Mutual Funds",
    summary:
      "Funds are categorized by asset class (equity, debt, hybrid) and by investment objective. Each suits different risk profiles.",
    content: `
**Types of Mutual Funds**

**By Asset Class:**

**1. Equity Funds** (Higher Risk, Higher Potential Return)
- Invest primarily in stocks.
- Suitable for long-term goals (5+ years).
- Subcategories: Large Cap, Mid Cap, Small Cap, Flexi Cap, Sector Funds.

**2. Debt Funds** (Lower Risk, Stable Returns)
- Invest in bonds, government securities, and money market instruments.
- Suitable for short to medium-term goals.
- Subcategories: Liquid Funds, Short Duration, Corporate Bond Funds.

**3. Hybrid Funds** (Moderate Risk)
- Mix of equity and debt.
- Balanced Advantage Funds dynamically adjust this mix.
- Good for moderate risk-takers.

**4. Index Funds** (Passive, Low Cost)
- Track a market index like Nifty 50 or Sensex.
- Very low expense ratio since there's no active management.
- Returns mirror the index.

**5. ELSS / Tax-Saving Funds**
- Equity-oriented funds with tax benefits under Section 80C.
- 3-year lock-in period.
- Potential for high returns with tax savings.

**By Management Style:**
- **Active:** Fund manager actively picks stocks (higher cost).
- **Passive:** Tracks an index automatically (lower cost).
    `,
  },
  {
    id: 4,
    icon: "🔄",
    title: "What Is SIP?",
    summary:
      "SIP (Systematic Investment Plan) lets you invest a fixed amount regularly, helping you build wealth through discipline and rupee cost averaging.",
    content: `
**What Is SIP (Systematic Investment Plan)?**

A SIP is a method of investing in mutual funds by contributing a fixed amount every month (or week/quarter) automatically.

**How SIP Works:**
1. You choose a fund and decide an amount (e.g., ₹1,000/month).
2. On the chosen date each month, the amount is auto-debited from your bank account.
3. Units are purchased at that day's NAV.
4. Over time, you accumulate units and potentially grow your wealth.

**Key Benefits:**

**1. Rupee Cost Averaging**
When markets fall, your fixed amount buys more units. When markets rise, it buys fewer. This averages out your cost over time.

**2. Discipline and Habit**
SIP automates saving. You don't need to time the market — just stay consistent.

**3. Power of Compounding**
Returns earned are reinvested, generating more returns. Over 10–20 years, this effect becomes very powerful.

**4. Start Small**
You can start a SIP with as little as ₹100–₹500 per month.

**Example:**
₹5,000/month for 10 years at 12% annual return = approximately ₹11.6 lakhs, while you invested only ₹6 lakhs.
    `,
  },
  {
    id: 5,
    icon: "📉",
    title: "Understanding Risk and Returns",
    summary:
      "Higher potential returns generally come with higher risk. Understanding this trade-off helps you choose the right fund.",
    content: `
**Understanding Risk and Returns**

**The Golden Rule:**
Higher potential returns almost always come with higher risk. This is not a flaw — it's how financial markets work.

**Types of Risk in Mutual Funds:**

**1. Market Risk**
The value of your investment can go up or down with the stock market. Equity funds face the most market risk.

**2. Credit Risk**
In debt funds, there's a risk that the borrower (company or government) may default on payments.

**3. Liquidity Risk**
Some funds invest in assets that are hard to sell quickly (e.g., real estate securities), so redeeming may take longer.

**4. Interest Rate Risk**
Debt fund values fall when interest rates rise.

**Risk Categories in India (SEBI):**
- **Low Risk:** Liquid funds, short-duration debt funds.
- **Moderate Risk:** Hybrid funds, balanced advantage funds.
- **High Risk:** Equity funds, sector funds.
- **Very High Risk:** Small cap funds, sectoral/thematic funds.

**Managing Risk:**
- Diversify across fund types.
- Match your investment horizon to the fund's risk.
- Don't panic-sell during market dips.
- Use SIP instead of lump sum to reduce timing risk.

**Returns Benchmarking:**
Compare a fund's returns to its benchmark index to understand if the manager is adding value.
    `,
  },
  {
    id: 6,
    icon: "💸",
    title: "What Is an Expense Ratio?",
    summary:
      "The expense ratio is the annual fee charged by a fund for management and operations. Lower is generally better for long-term wealth building.",
    content: `
**What Is an Expense Ratio?**

The expense ratio is the annual fee a mutual fund charges to manage your investment. It is expressed as a percentage of the total assets.

**How It Works:**
- If a fund has an expense ratio of 1.5% and you invest ₹1,00,000:
  - You pay ₹1,500 per year in fees.
  - This is deducted from the NAV daily, so you don't pay it separately.

**What Does It Cover?**
- Fund manager's salary
- Research and analysis
- Administrative and operational costs
- Marketing and distribution (in some cases)

**SEBI Limits (India):**
- Equity funds: Up to 2.25%
- Debt funds: Up to 2%
- Index/ETF funds: Usually 0.1% – 0.5%

**Why Does It Matter?**
Over long periods, even a small difference in expense ratio has a significant impact.

**Example:**
₹10 lakhs invested for 20 years at 12% return:
- With 0.5% expense ratio → ~₹91 lakhs
- With 2.0% expense ratio → ~₹73 lakhs
That's a difference of ₹18 lakhs just from the fee!

**Takeaway:**
For long-term investing, prefer funds with lower expense ratios, especially index funds which are passively managed.
    `,
  },
  {
    id: 7,
    icon: "📌",
    title: "What Is NAV?",
    summary:
      "NAV (Net Asset Value) is the price of one unit of a mutual fund, calculated daily based on the market value of its holdings.",
    content: `
**What Is NAV (Net Asset Value)?**

NAV stands for Net Asset Value. It represents the per-unit market value of a mutual fund scheme.

**Formula:**
> NAV = (Total Assets – Total Liabilities) ÷ Total Number of Units

**Example:**
- A fund holds ₹100 crore worth of stocks and bonds.
- It has ₹2 crore in liabilities (expenses, fees).
- It has issued 10 crore units.
- NAV = (100 – 2) / 10 = **₹9.80 per unit**

**When Is NAV Calculated?**
Every business day after market hours (around 9–11 PM in India). It reflects that day's closing market prices.

**Common Misconceptions:**

❌ "A fund with NAV ₹10 is cheaper than one with NAV ₹100"
✅ This is **not true**. NAV doesn't determine whether a fund is expensive or cheap — the returns and fund quality matter.

❌ "Higher NAV means better performance"
✅ **Not always.** A new fund starts at ₹10 NAV. An older fund may have NAV of ₹500. NAV grows over time with market performance.

**NAV and Your Investment:**
- When you invest: Units = Amount / NAV
- When you redeem: Amount = Units × NAV

**Tracking NAV:**
You can track a fund's NAV daily on the AMFI (Association of Mutual Funds of India) website or on fund house websites.
    `,
  },
  {
    id: 8,
    icon: "⚖️",
    title: "Benefits & Limitations",
    summary:
      "Mutual funds offer diversification, professional management, and flexibility — but also carry risks and fees worth understanding.",
    content: `
**Benefits and Limitations of Mutual Funds**

**✅ Benefits:**

**1. Diversification**
Spreads risk across many securities. Even a small investment gets you exposure to 50–100 stocks.

**2. Professional Management**
Expert fund managers research markets and make informed investment decisions for you.

**3. Liquidity**
Most mutual funds (except ELSS and close-ended funds) can be redeemed within 1–3 business days.

**4. Flexibility**
You can start with as little as ₹100/month via SIP and increase or stop anytime.

**5. Transparency**
SEBI regulations require funds to disclose their portfolio monthly and NAV daily.

**6. Tax Efficiency**
ELSS funds provide tax deductions. Long-term gains on equity funds (held >1 year) are taxed favorably.

**7. Regulated**
All mutual funds in India are regulated by SEBI, providing investor protection.

---

**❌ Limitations:**

**1. Market Risk**
Unlike fixed deposits, mutual fund returns are not guaranteed. You can lose money.

**2. Expense Costs**
Actively managed funds charge fees that eat into your returns over time.

**3. No Control Over Portfolio**
You cannot choose which specific stocks the fund buys. The fund manager decides.

**4. Lock-in Period**
ELSS funds have a 3-year lock-in. Some close-ended funds may also restrict withdrawals.

**5. Over-diversification**
Too much diversification can dilute returns. Owning too many funds can complicate portfolio tracking.

**Conclusion:**
Mutual funds are excellent for most retail investors seeking a balanced approach to wealth creation, as long as you understand the risks and invest according to your financial goals.
    `,
  },
];

function TopicCard({ topic, onClick }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="text-3xl">{topic.icon}</div>
      <h3 className="font-semibold text-slate-800 text-sm leading-snug">{topic.title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed flex-1">{topic.summary}</p>
      <button
        onClick={() => onClick(topic)}
        className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold hover:text-emerald-700 mt-auto"
      >
        Read More <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function TopicModal({ topic, onClose }) {
  const lines = topic.content.trim().split("\n");

  const renderLine = (line, i) => {
    if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      const text = line.slice(2, -2);
      return <h3 key={i} className="text-base font-bold text-slate-800 mt-5 mb-1">{text}</h3>;
    }
    if (line.startsWith("**") && line.includes("**")) {
      return (
        <p key={i} className="text-sm text-slate-600 leading-relaxed mb-1" dangerouslySetInnerHTML={{
          __html: line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
        }} />
      );
    }
    if (line.startsWith("- ")) {
      return <li key={i} className="text-sm text-slate-600 ml-4 list-disc leading-relaxed">{line.slice(2)}</li>;
    }
    if (line.startsWith("> ")) {
      return (
        <blockquote key={i} className="border-l-4 border-emerald-400 pl-4 italic text-sm text-slate-600 my-2">
          {line.slice(2)}
        </blockquote>
      );
    }
    if (line.startsWith("❌") || line.startsWith("✅")) {
      return <p key={i} className="text-sm text-slate-600 leading-relaxed mb-1">{line}</p>;
    }
    if (line.startsWith("---")) {
      return <hr key={i} className="border-slate-200 my-4" />;
    }
    if (line.trim() === "") return <div key={i} className="h-2" />;
    return <p key={i} className="text-sm text-slate-600 leading-relaxed">{line}</p>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{topic.icon}</span>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-800">{topic.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 space-y-0.5">
          {lines.map((line, i) => renderLine(line, i))}
        </div>
        <div className="p-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Learn() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Learn About Mutual Funds</h1>
        <p className="text-slate-500 text-sm mt-1">
          Beginner-friendly explanations for first-time investors and college students
        </p>
      </div>

      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 mb-8 text-white">
        <div className="max-w-xl">
          <div className="text-3xl mb-3">🎓</div>
          <h2 className="text-xl font-bold mb-2">Start Your Investment Education</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Understanding mutual funds is the first step to making smarter financial decisions.
            These articles are written in simple English — no finance background required.
          </p>
        </div>
      </div>

      {/* Topic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TOPICS.map((topic) => (
          <TopicCard key={topic.id} topic={topic} onClick={setSelectedTopic} />
        ))}
      </div>

      {/* Quick Tips */}
      <div className="mt-12 bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
        <h3 className="font-bold text-slate-800 mb-4">💡 Quick Tips for New Investors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Start early — even small amounts grow significantly over 10–20 years.",
            "Don't try to time the market — invest consistently through SIP.",
            "Match the fund's risk level with your personal risk tolerance.",
            "Review your portfolio every 6–12 months, not every day.",
            "Index funds are a great starting point for beginners — low cost, broad exposure.",
            "Never invest money you'll need in less than 3 years in equity funds.",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="text-emerald-500 font-bold shrink-0 mt-0.5">→</span>
              {tip}
            </div>
          ))}
        </div>
      </div>

      {selectedTopic && (
        <TopicModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
      )}
    </div>
  );
}
