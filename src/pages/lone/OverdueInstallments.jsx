import React, { useEffect, useState } from "react";
import axios from "axios";

// কিস্তির তারিখ মেয়াদ উত্তীর্ণ - সদস্য
const OverdueInstallments = () => {
  const [overdue, setOverdue] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOverdue = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/overdue-installments`
        );
        setOverdue(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching overdue installments:", err);
      }
    };

    fetchOverdue();
  }, []);

  // 🔍 Search Filter
  useEffect(() => {
    const result = overdue.filter(
      (item) =>
        item.mobileNumber?.toString().includes(search) ||
        item.memberId?.toString().includes(search) ||
        item.memberName?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, overdue]);

 // 🔹 মেসেজ পাঠানোর ফাংশন (Server এ কল যাবে)
const handleSendMessage = async (phone, name) => {
  const message = `প্রিয় ${name}, আপনার কিস্তির তারিখ পেরিয়ে গেছে। অনুগ্রহ করে যত দ্রুত সম্ভব পরিশোধ করুন।`;
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/send-loan-sms`,
      { phone, message }
    );

    if (res.data.success) {
      alert(`📩 মেসেজ পাঠানো হয়েছে ${name} (${phone})`);
    } else {
      alert("❌ মেসেজ পাঠানো ব্যর্থ হয়েছে!");
    }
  } catch (err) {
    console.error("❌ SMS send error:", err.message);
    alert("❌ মেসেজ পাঠানোর সময় ত্রুটি হয়েছে!");
  }
};


  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">
        কিস্তির তারিখ মেয়াদ উত্তীর্ণ - সদস্য
      </h2>

      {/* 🔍 Search Bar */}
      <div className="mb-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Member ID বা নাম দিয়ে খুঁজুন..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-600">মেয়াদ উত্তীর্ণ কোনো কিস্তি নেই ✅</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Member Name</th>
              <th className="border px-3 py-2">Mobile</th>
              <th className="border px-3 py-2">Installment No</th>
              <th className="border px-3 py-2">Amount</th>
              <th className="border px-3 py-2">Due Date</th>
              <th className="border px-3 py-2">Type</th>
              <th className="border px-3 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inst) => (
              <tr
                key={inst.loanId + inst.installmentNo}
                className="hover:bg-gray-50 transition"
              >
                <td className="border px-3 py-2">{inst.memberName}</td>
                <td className="border px-3 py-2">{inst.mobileNumber}</td>
                <td className="border px-3 py-2">{inst.installmentNo}</td>
                <td className="border px-3 py-2 text-blue-600">
                  {inst.installmentAmount}
                </td>
                <td className="border px-3 py-2">{inst.dueDate}</td>
                <td className="border px-3 py-2">{inst.type}</td>
                <td className="border px-3 py-2 text-center">
                  <button
                    onClick={() =>
                      handleSendMessage(inst.mobileNumber, inst.memberName)
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    মেসেজ পাঠান
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OverdueInstallments;
