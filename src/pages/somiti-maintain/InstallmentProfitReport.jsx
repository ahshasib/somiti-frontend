import React, { useEffect, useState } from "react";
import axios from "axios";

const InstallmentProfitReport = () => {
  const [reportData, setReportData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalPrincipal, setTotalPrincipal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/installment-profit-report`);
      setReportData(res.data.report);
      setTotalProfit(res.data.totalProfit);
      setTotalPrincipal(res.data.totalPrincipal);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-pink-50 via-white to-indigo-50 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700 tracking-wide">
        📊 লভ্যাংশ রিপোর্ট
      </h2>

      {loading ? (
        <p className="text-center text-lg font-medium text-gray-600 animate-pulse">
          লোড হচ্ছে...
        </p>
      ) : reportData.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-medium">
          আজ কোনো কালেকশন নেই 💡
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-indigo-100 text-indigo-800">
                  <th className="border p-3 font-semibold">তারিখ</th>
                  <th className="border p-3 font-semibold">লেনদেন ধরণ</th>
                  <th className="border p-3 font-semibold">সদস্যের নাম / মোবাইল</th>
                  <th className="border p-3 font-semibold">টাকার পরিমাণ</th>
                  <th className="border p-3 font-semibold">লোন ইন্টারেস্ট</th>
                  <th className="border p-3 font-semibold">কিস্তি গ্রহণ</th>
                  <th className="border p-3 font-semibold">মোট লাভ</th>
                  <th className="border p-3 font-semibold">বর্ণনা</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr
                    key={index}
                    className={`transition duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-indigo-50`}
                  >
                    <td className="border p-3 text-gray-700">
                      {new Date(item.date).toLocaleDateString("bn-BD")}
                    </td>
                    <td className="border p-3 text-gray-700 font-medium">
                      {item.type}
                    </td>
                    <td className="border p-3 text-gray-700">
                      <span className="font-semibold">{item.memberName}</span>
                      <br />
                      <span className="text-sm text-gray-500">{item.mobileNumber}</span>
                    </td>
                    <td className="border p-3 font-semibold text-gray-800">
                      {item.amount} ৳
                    </td>
                    <td className="border p-3 text-indigo-600 font-semibold">
                      {item.loanInterest.toFixed(2)} ৳
                    </td>
                    <td className="border p-3 text-green-600 font-semibold">
                      {item.principalReceived.toFixed(2)} ৳
                    </td>
                    <td className="border p-3 text-pink-600 font-semibold">
                      {item.totalProfit.toFixed(2)} ৳
                    </td>
                    <td className="border p-3 text-gray-600">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="p-5 bg-green-50 border border-green-200 rounded-xl text-center shadow-sm">
              <p className="text-xl font-semibold text-green-800">
                💰 মোট আসল টাকা
              </p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {totalPrincipal.toFixed(2)} ৳
              </p>
            </div>
            <div className="p-5 bg-pink-50 border border-pink-200 rounded-xl text-center shadow-sm">
              <p className="text-xl font-semibold text-pink-800">
                📈 মোট লভ্যাংশ
              </p>
              <p className="text-2xl font-bold text-pink-600 mt-2">
                {totalProfit.toFixed(2)} ৳
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InstallmentProfitReport;
