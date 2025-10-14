import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [members, setMembers] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // 🔹 New state

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true); // ✅ Start loading
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/loans`);
        let allLoans = res.data;

        if (user?.role === "member") {
          allLoans = allLoans.filter((loan) => loan.memberId === user._id);
        }

        setLoans(allLoans);
      } catch (err) {
        console.error("Error fetching loans:", err);
      } finally {
        setLoading(false); // ✅ End loading
      }
    };

    fetchLoans();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      const newMembers = {};

      await Promise.all(
        loans.map(async (loan) => {
          if (loan.memberId && !newMembers[loan.memberId]) {
            try {
              const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/members/${loan.memberId}`
              );
              newMembers[loan.memberId] = res.data;
            } catch (err) {
              console.warn(`Member ${loan.memberId} not found`);
            }
          }
        })
      );

      setMembers(newMembers);
    };

    if (loans.length > 0) {
      fetchMembers();
    }
  }, [loans]);

  const filteredLoans = loans.filter((loan) => {
    const term = searchTerm.toLowerCase();
    return (
      new Date(loan.loanDate).toLocaleDateString().toLowerCase().includes(term) ||
      loan.name?.toLowerCase().includes(term) ||
      loan.mobileNumber?.toLowerCase().includes(term) ||
      loan.memberId?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-full mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <h2 className="text-2xl font-bold text-gray-800">📋 সকল লোনের তথ্য</h2>

        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="তারিখ, নাম, মোবাইল বা মেম্বার আইডি লিখুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>

      {/* 🔹 Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-gray-600">ডেটা লোড হচ্ছে...</span>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-indigo-100">
              <tr className="text-gray-800 text-center">
                <th className="border px-4 py-3">তারিখ</th>
                <th className="border px-4 py-3">লোন গ্রহণকারীর তথ্য</th>
                <th className="border px-4 py-3">লোনের তথ্য</th>
                <th className="border px-4 py-3">কিস্তির তথ্য</th>
                <th className="border px-4 py-3">মোট টাকা</th>
                <th className="border px-4 py-3">বর্ণনা</th>
                {user?.role !== "member" && (
                  <th className="border px-4 py-3">রসিদ</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => {
                  const memberInfo = members[loan.memberId];
                  return (
                    <tr
                      key={loan._id}
                      className="text-center hover:bg-gray-50 transition-all duration-150"
                    >
                      <td className="border px-4 py-2 font-medium text-gray-700">
                        {new Date(loan.loanDate).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2 text-gray-700">
                        {memberInfo ? (
                          <>
                            {memberInfo.name} <br />
                            <span className="text-xs text-gray-500">
                              {memberInfo.mobileNumber || "N/A"} /{" "}
                              {memberInfo.memberId || "N/A"}
                            </span>
                          </>
                        ) : (
                          <>
                            {loan.name || "Unknown"} <br />
                            <span className="text-xs text-gray-400">
                              {loan.memberId}
                            </span>
                          </>
                        )}
                      </td>
                      <td className="border px-4 py-2 text-gray-700">
                        পরিমাণ: {loan.initialLoanAmount}
                        <br />
                        ডিভিডেন্ড: {loan.dividend} {loan.dividendType}
                      </td>
                      <td className="border px-4 py-2 text-gray-700">
                        ধরন: {loan.installmentType}
                        <br />
                        সংখ্যা: {loan.installments}
                        <br />
                        প্রতি কিস্তি: {loan.installmentAmount.toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-gray-700 font-semibold">
                        ৳{loan.totalLoan.toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-gray-600">
                        {loan.description || "-"}
                      </td>
                      {user?.role !== "member" && (
                        <td className="border px-4 py-2">
                          <Link
                            to={`/dashboard/loan-receipt/${loan._id}`}
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-all duration-150"
                          >
                            রসিদ
                          </Link>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={user?.role === "member" ? "6" : "7"}
                    className="text-center text-gray-500 py-6 text-sm"
                  >
                    কোন লোন তথ্য পাওয়া যায়নি 😔
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllLoans;
