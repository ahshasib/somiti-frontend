import React, { useEffect, useState } from "react";
import axios from "axios";
//লভ্যাংশ রিপোর্ট page
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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6"> লভ্যাংশ রিপোর্ট</h2>

      {loading ? (
        <p className="text-center">লোড হচ্ছে...</p>
      ) : reportData.length === 0 ? (
        <p className="text-center text-gray-600">আজ কোনো কালেকশন নেই</p>
      ) : (
        <>
          <table className="w-full border-collapse border text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">তারিখ</th>
                <th className="border p-2">লেনদেন ধরণ</th>
                <th className="border p-2">সদস্যের নাম / মোবাইল</th>
                <th className="border p-2">টাকার পরিমাণ</th>
                <th className="border p-2">লোন ইন্টারেস্ট</th>
                <th className="border p-2">কিস্তি গ্রহণ</th>
                <th className="border p-2">মোট লাভ</th>
                <th className="border p-2">বর্ণনা</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="border p-2">{new Date(item.date).toLocaleDateString("bn-BD")}</td>
                  <td className="border p-2">{item.type}</td>
                  <td className="border p-2">{item.memberName} <br />
                  <span className="text-sm text-gray-500">{item.mobileNumber}</span>
                  </td>
                  <td className="border p-2">{item.amount} ৳</td>
                  <td className="border p-2">{item.loanInterest.toFixed(2)} ৳</td>
                  <td className="border p-2">{item.principalReceived.toFixed(2)} ৳</td>
                  <td className="border p-2">{item.totalProfit.toFixed(2)} ৳</td>
                  <td className="border p-2">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
            <p className="font-semibold"> মোট লভ্যাংশ: {totalProfit.toFixed(2)} ৳</p>
            <p className="font-semibold"> মোট আসল টাকা: {totalPrincipal.toFixed(2)} ৳</p>
          </div>
        </>
      )}
    </div>
  );
};

export default InstallmentProfitReport;
