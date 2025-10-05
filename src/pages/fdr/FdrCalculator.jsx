import React, { useState, useMemo } from "react";

/**
 * FDRCalculator
 * - Assumption: interestRate is monthly % (e.g. 1 means 1% per month)
 * - monthlyProfit = principal * (interestRate / 100)
 * - totalProfit = monthlyProfit * months
 * - totalWithProfit = principal + totalProfit
 */

const formatCurrency = (num) => {
  if (isNaN(num) || num === null) return "৳0.00";
  return "৳" + Number(num).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const FdrCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [monthlyRate, setMonthlyRate] = useState(""); // % per month
  const [months, setMonths] = useState(12);

  // parse safe numbers
  const P = parseFloat(principal) || 0;
  const r = parseFloat(monthlyRate) || 0;
  const n = parseInt(months) || 0;

  // calculations (useMemo for performance)
  const monthlyProfit = useMemo(() => {
    return (P * (r / 100));
  }, [P, r]);

  const totalProfit = useMemo(() => {
    return monthlyProfit * n;
  }, [monthlyProfit, n]);

  const totalWithProfit = useMemo(() => {
    return P + totalProfit;
  }, [P, totalProfit]);

  const handleReset = () => {
    setPrincipal("");
    setMonthlyRate("");
    setMonths(12);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-100 flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">🧮 FDR ক্যালকুলেটর</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Principal */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">FDR টাকাঃ</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="যেমন: 100000"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Monthly Rate */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">লভ্যাংশ (% মাসিক)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={monthlyRate}
              onChange={(e) => setMonthlyRate(e.target.value)}
              placeholder="যেমন: 1 (মানে 1% প্রতি মাসে)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Months */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">সময় (মাস)</label>
            <input
              type="number"
              min="1"
              step="1"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Quick-presets */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">প্রিসেট সময়</label>
            <div className="flex gap-2">
              {[3,6,12,24,36,60].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMonths(m)}
                  className={`px-3 py-2 rounded-lg text-sm border ${
                    Number(months) === m ? "bg-indigo-500 text-white" : "bg-white text-gray-700"
                  }`}
                >
                  {m} ম
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">প্রফিট (মাসিক)</span>
            <span className="text-lg font-semibold text-indigo-700">{formatCurrency(monthlyProfit)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">মোট মাসিক (মাস) — {n} মাস</span>
            <span className="text-lg font-semibold text-indigo-700">{n} × {formatCurrency(monthlyProfit)}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-indigo-100">
            <span className="text-gray-900 font-medium">সর্বমোট প্রফিটঃ</span>
            <span className="text-xl font-bold text-green-700">{formatCurrency(totalProfit)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium">FDR + সর্বমোট প্রফিটঃ</span>
            <span className="text-xl font-bold text-green-800">{formatCurrency(totalWithProfit)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Reset
          </button>

          <button
            onClick={() => {
              // small validation and info
              if (P <= 0) {
                alert("প্রথমে FDR টাকার পরিমাণ দিন।");
                return;
              }
              if (r <= 0) {
                alert("লভ্যাংশ (%) দিন (মাসিক)।");
                return;
              }
              if (n <= 0) {
                alert("সময় (মাস) দিন।");
                return;
              }
              // show quick summary
              const msg = `FDR: ${formatCurrency(P)}\nপ্রতি মাসে লাভ: ${formatCurrency(monthlyProfit)}\nমেয়াদ: ${n} মাস\nসর্বমোট প্রফিট: ${formatCurrency(totalProfit)}\nমোট (প্রমিত): ${formatCurrency(totalWithProfit)}`;
              alert(msg);
            }}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Quick Summary
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          নোট: এখানে লভ্যাংশকে **মাসিক (%)** হিসেবে ধরা হয়েছে। যদি তুমি বার্ষিক হার দিতে চাও (yearly %), বা চাও কিভাবে বার্ষিককে মাসিকে রূপান্তর করতে হয়, বলো — আমি ক্যালকুলেটর আপডেট করে দেবো।
        </p>
      </div>
    </div>
  );
};

export default FdrCalculator;
