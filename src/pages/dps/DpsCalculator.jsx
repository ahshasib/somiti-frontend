import React, { useState } from "react";

const DpsCalculator = () => {
  const [duration, setDuration] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState({
    totalDeposit: 0,
    profit: 0,
    totalWithProfit: 0,
  });

  const handleCalculate = (e) => {
    e.preventDefault();

    const P = parseFloat(monthlyAmount);
    const n = parseInt(duration);
    const r = parseFloat(interestRate) / 100 / 12; // মাসিক সুদের হার

    const totalDeposit = P * n;
    const maturityAmount =
      r > 0 ? P * ((Math.pow(1 + r, n) - 1) / r) : totalDeposit;

    const profit = maturityAmount - totalDeposit;

    setResult({
      totalDeposit: totalDeposit.toFixed(2),
      profit: profit.toFixed(2),
      totalWithProfit: maturityAmount.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🧮 DPS ক্যালকুলেটর
        </h2>

        <form onSubmit={handleCalculate} className="space-y-5">
          {/* সময়কাল */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              DPS সময়কাল (মাস)
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">একটি নির্বাচন করুন</option>
              <option value="6">৬ মাস</option>
              <option value="12">১ বছর</option>
              <option value="24">২ বছর</option>
              <option value="36">৩ বছর</option>
              <option value="60">৫ বছর</option>
            </select>
          </div>

          {/* মাসিক কিস্তির টাকাঃ */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              মাসিক কিস্তির টাকাঃ
            </label>
            <select
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">একটি নির্বাচন করুন</option>
              <option value="50">৳50</option>
              <option value="100">৳100</option>
              <option value="200">৳200</option>
              <option value="500">৳500</option>
              <option value="1000">৳1000</option>
              <option value="2000">৳2000</option>
              <option value="5000">৳5000</option>
            </select>
          </div>

          {/* লভ্যাংশ */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              লভ্যাংশ (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
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

        {/* হিসাবের ফলাফল */}
        <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-5 space-y-2">
          <h3 className="text-lg font-semibold text-indigo-700 mb-3">
            📊 হিসাবের ফলাফল
          </h3>
          <p className="text-gray-700">
            টার্গেট টাকাঃ <span className="font-semibold">৳{result.totalDeposit}</span>
          </p>
          <p className="text-gray-700">
            প্রফিটঃ <span className="font-semibold">৳{result.profit}</span>
          </p>
          <p className="text-gray-800 font-bold">
            মোট টাকা (প্রফিটসহ): ৳{result.totalWithProfit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DpsCalculator;
