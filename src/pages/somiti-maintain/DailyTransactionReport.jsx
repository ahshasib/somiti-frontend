import React, { useEffect, useState } from "react";
import axios from "axios";

const DailyTransactionReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 আজকের তারিখ (local time অনুযায়ী)
  const today = new Date().toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/daily-transaction-report`);
        setReport(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching report:", error);
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        দৈনিক লেনদেন রিপোর্ট ({today})
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">লোড হচ্ছে...</p>
      ) : report ? (
        <div className="space-y-3 text-gray-700 text-base">
          <p className="flex justify-between border-b pb-1">
            <span>মোট লোন কালেকশনঃ</span>
            <span className="font-semibold text-green-700">{report.totalLoanCollection} ৳</span>
          </p>

          <p className="flex justify-between border-b pb-1">
            <span>মোট এফ.ডি.আর কালেকশনঃ</span>
            <span className="font-semibold text-green-700">{report.totalFDRCollection} ৳</span>
          </p>

          <p className="flex justify-between border-b pb-1">
            <span>মোট ডি.পি.এস কালেকশনঃ</span>
            <span className="font-semibold text-green-700">{report.totalDPSCollection} ৳</span>
          </p>

          <p className="flex justify-between border-b pb-1 mt-4">
            <span>মোট লোন প্রদানঃ</span>
            <span className="font-semibold text-red-700">{report.totalLoanDisbursed} ৳</span>
          </p>

          <p className="flex justify-between border-b pb-1">
            <span>মোট এফ.ডি.আর উত্তোলনঃ</span>
            <span className="font-semibold text-red-700">{report.totalFDRWithdraw} ৳</span>
          </p>

          <p className="flex justify-between border-b pb-1">
            <span>মোট এফ.ডি.আর লাভ উত্তোলনঃ</span>
            <span className="font-semibold text-red-700">{report.totalFDRProfitWithdraw} ৳</span>
          </p>

          <p className="flex justify-between border-b pb-1">
            <span>মোট ডি.পি.এস উত্তোলনঃ</span>
            <span className="font-semibold text-red-700">{report.totalDPSWithdraw} ৳</span>
          </p>

          <p className="flex justify-between border-b pb-1 mt-4">
            <span>মোট ক্যাশ হতে ব্যাংকে জমাঃ</span>
            <span className="font-semibold text-blue-700">{report.totalCashToBank} ৳</span>
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-600">আজ কোনো লেনদেন নেই</p>
      )}
    </div>
  );
};

export default DailyTransactionReport;
