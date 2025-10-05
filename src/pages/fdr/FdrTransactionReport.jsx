import React, { useEffect, useState } from "react";
import axios from "axios";

const FdrTransactionReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("deposit");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/fdr-transaction-report?type=${type}&date=${date}`
      );
      setReport(res.data.data);
    } catch (err) {
      console.error(err);
      alert("রিপোর্ট আনতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [type, date]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
          💰 <span>FDR জমা এবং উত্তোলন রিপোর্ট</span>
        </h1>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-wrap gap-5 items-center">
        <div>
          <label className="font-semibold mr-2 text-gray-700">ধরণ:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option value="deposit">💵 জমা রিপোর্ট</option>
            <option value="withdraw">🏦 উত্তোলন রিপোর্ট</option>
          </select>
        </div>

        <div>
          <label className="font-semibold mr-2 text-gray-700">তারিখ:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <button
          onClick={fetchReport}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          🔍 রিপোর্ট দেখুন
        </button>
      </div>

      {/* Table Section */}
      {loading ? (
        <p className="text-center text-gray-600 text-lg mt-10">
          ⏳ রিপোর্ট লোড হচ্ছে...
        </p>
      ) : report.length === 0 ? (
        <p className="text-center text-red-500 text-lg mt-10">
          ⚠️ এই তারিখে কোনো তথ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-indigo-600 text-white text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">ধরণ</th>
                <th className="p-3">সদস্য নাম</th>
                <th className="p-3">ফোন</th>
                <th className="p-3">স্কিম</th>
                <th className="p-3">পরিমাণ</th>
                <th className="p-3">লভ্যাংশ</th>
                <th className="p-3">কার্যকর তারিখ</th>
              </tr>
            </thead>
            <tbody>
              {report.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b transition ${
                    item.type === "জমা"
                      ? "hover:bg-green-50"
                      : "hover:bg-red-50"
                  }`}
                >
                  <td className="p-3">{index + 1}</td>
                  <td
                    className={`p-3 font-semibold ${
                      item.type === "জমা"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.type}
                  </td>
                  <td className="p-3">{item.memberName}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3">{item.schemeName}</td>
                  <td className="p-3 font-semibold text-gray-900">
                    ৳{item.fdrAmount.toLocaleString("bn-BD")}
                  </td>
                  <td className="p-3">{item.interestValue}%</td>
                  <td className="p-3">
                    {new Date(item.effectiveDate).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Section */}
      {!loading && report.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow p-4 text-right font-semibold text-gray-800">
          মোট {type === "deposit" ? "জমা" : "উত্তোলন"} পরিমাণ:{" "}
          <span className="text-indigo-600">
            ৳
            {report
              .reduce((sum, item) => sum + item.fdrAmount, 0)
              .toLocaleString("bn-BD")}
          </span>
        </div>
      )}
    </div>
  );
};

export default FdrTransactionReport;
