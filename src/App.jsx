import React, { useState, useCallback, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ExploreFunds from "./pages/ExploreFunds";
import FundDetails from "./pages/FundDetails";
import CompareFunds from "./pages/CompareFunds";
import Portfolio from "./pages/Portfolio";
import Learn from "./pages/Learn";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

// ── Toast ────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles = {
    success: { bg: "bg-emerald-600", icon: CheckCircle },
    error: { bg: "bg-red-600", icon: AlertCircle },
    info: { bg: "bg-blue-600", icon: Info },
  };
  const { bg, icon: Icon } = styles[type] || styles.info;

  return (
    <div
      className={`${bg} text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 min-w-[260px] max-w-sm`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button onClick={onClose} className="shrink-0 opacity-70 hover:opacity-100">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedFund, setSelectedFund] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const sharedProps = {
    currentPage,
    setCurrentPage,
    selectedFund,
    setSelectedFund,
    compareList,
    setCompareList,
    showToast,
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home {...sharedProps} />;
      case "explore":
        return <ExploreFunds {...sharedProps} />;
      case "fundDetails":
        return selectedFund ? (
          <FundDetails fund={selectedFund} {...sharedProps} />
        ) : (
          <ExploreFunds {...sharedProps} />
        );
      case "compare":
        return <CompareFunds {...sharedProps} />;
      case "portfolio":
        return <Portfolio {...sharedProps} />;
      case "learn":
        return <Learn {...sharedProps} />;
      default:
        return <Home {...sharedProps} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 items-end">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}
