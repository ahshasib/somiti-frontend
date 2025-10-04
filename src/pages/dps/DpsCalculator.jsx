import React, { useState } from "react";

const DpsCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [months, setMonths] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState(null);

  const calculateDPS = (e) => {
    e.preventDefault();

    // ইনপুটগুলোকে সংখ্যায় রূপান্তর
    const P = parseFloat(monthlyDeposit);
    const n = parseInt(months);
    const r = parseFloat(interestRate) / 100 / 12; // মাসিক সুদের হার

    // মোট জমা অর্থ
    const totalDeposit = P * n;

    // সাধারণ DPS maturity ফর্মুলা:
    // M = P * [(1 + r)^n - 1] / r
    const maturityAmount = r > 0 ? P * ((Math.pow(1 + r, n) - 1) / r) : totalDeposit;

    setResult({
      totalDeposit: totalDeposit.toFixed(2),
      maturityAmount: maturityAmount.toFixed(2),
      profit: (maturityAmount - totalDeposit).toFixed(2),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🧮 DPS ক্যালকুলেটর
        </h2>

        <form onSubmit={calculateDPS} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              মাসিক জমার পরিমাণ (৳)
            </label>
            <input
              type="number"
              value={monthlyDeposit}
              onChange={(e) => setMonthlyDeposit(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="যেমন: 1000"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              মেয়াদ (মাস)
            </label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="যেমন: 36"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              সুদের হার (% প্রতি বছর)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="যেমন: 8"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            হিসাব করুন
          </button>
        </form>

        {result && (
          <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-indigo-700 mb-3">
              📊 হিসাবের ফলাফল
            </h3>
            <p className="text-gray-700">মোট জমা: ৳{result.totalDeposit}</p>
            <p className="text-gray-700">লভ্যাংশ (প্রায়): ৳{result.profit}</p>
            <p className="text-gray-800 font-bold">
              মেয়াদ শেষে পাবেন: ৳{result.maturityAmount}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DpsCalculator;
