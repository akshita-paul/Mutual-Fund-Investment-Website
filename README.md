# FundWise – Mutual Fund Investment Website

> **College Web Development Project** | React.js · Tailwind CSS · Recharts · Lucide React

---

## 🚀 Getting Started

```bash
# Navigate to the project folder
cd fundwise-app

# Start the development server
npm start

# Open in browser
http://localhost:3000
```

---

## 📁 Project Structure

```
fundwise-app/
├── public/
│   └── index.html
└── src/
    ├── components/
    │   ├── Navbar.jsx          # Responsive navigation with mobile menu
    │   ├── Footer.jsx          # Footer with quick links
    │   ├── FundCard.jsx        # Reusable fund card component
    │   ├── StatCard.jsx        # Statistics display card
    │   ├── PerformanceChart.jsx# Line chart for NAV performance
    │   ├── SIPCalculator.jsx   # Interactive SIP calculator with donut chart
    │   └── InvestmentModal.jsx # Modal form for adding investments
    ├── pages/
    │   ├── Home.jsx            # Landing page with hero, stats, popular funds
    │   ├── ExploreFunds.jsx    # Fund browser with search, filter, sort
    │   ├── FundDetails.jsx     # Detailed fund view with charts
    │   ├── CompareFunds.jsx    # Side-by-side fund comparison
    │   ├── Portfolio.jsx       # Simulated portfolio dashboard
    │   └── Learn.jsx           # Educational articles with modals
    ├── data/
    │   └── mutualFunds.js      # All sample fund data (10 funds)
    ├── App.jsx                 # Main app with routing & toast notifications
    ├── index.js                # React entry point
    └── index.css               # Tailwind CSS imports + custom styles
```

---

## 🌟 Features

### Navigation
- Responsive navbar with mobile hamburger menu
- Smooth navigation between all sections
- Active page highlighting

### Home Page
- Hero section with CTA buttons
- 4 statistics cards (funds, returns, investors, categories)
- Popular Funds section (4 sample funds)
- Interactive SIP Calculator
- "Why Mutual Funds?" section
- CTA banner

### Explore Funds
- 10 sample funds across 5 categories
- Search by fund name or category
- Filter by: Category, Risk Level, Min. Investment
- Sort by: 1Y/3Y/5Y returns, expense ratio, min. investment
- Category chip filters
- Compare list banner

### Fund Details
- Full fund information (risk, returns, expense ratio, objective)
- 12-month NAV performance line chart
- Asset allocation donut chart
- "Add to Portfolio" button

### Compare Funds
- Select up to 3 funds side by side
- Color-coded: green = best, red = worst
- Add/remove funds dynamically
- Empty state with guidance

### My Portfolio
- Simulated portfolio with pre-filled investments
- Summary cards: invested, current value, P&L, return %
- 12-month portfolio performance line chart
- Holdings table with P&L per investment
- Add Investment modal form
- Remove investment button

### SIP Calculator
- Sliders for monthly amount, rate, and duration
- Real-time calculation with donut chart
- Disclaimer about estimates

### Learn
- 8 educational topics with modals
- Beginner-friendly content in simple English
- Quick tips section

---

## 📊 Sample Data

10 sample mutual funds across all categories:

| Fund | Category | Risk |
|------|----------|------|
| BlueChip Growth Fund | Equity | High |
| Secure Bond Income Fund | Debt | Low |
| Balanced Advantage Fund | Hybrid | Moderate |
| Nifty 50 Index Fund | Index | Moderate |
| TaxSaver ELSS Fund | ELSS | High |
| MidCap Momentum Fund | Equity | Very High |
| Conservative Hybrid Fund | Hybrid | Low |
| SmallCap Discovery Fund | Equity | Very High |
| Flexi Cap Opportunities Fund | Equity | Moderate |
| Short Duration Debt Fund | Debt | Low |

---

## ⚠️ Disclaimer

This is an **educational college project**. All mutual fund data, NAV values, returns, and investment figures are **fictional sample data** for demonstration purposes only. This website:

- Does NOT represent real investment products
- Does NOT provide financial advice
- Does NOT connect to any real market data or APIs
- Does NOT process real money or payments
- Does NOT implement real authentication

---

## 🛠️ Tech Stack

- **React.js 18** – Frontend framework
- **Tailwind CSS 3** – Utility-first styling
- **Recharts** – Charts and data visualizations
- **Lucide React** – Icon library
- **React State** – All data management (no backend)

---

*Built as a college-level web development project demonstrating React component architecture, state management, and responsive UI design.*
