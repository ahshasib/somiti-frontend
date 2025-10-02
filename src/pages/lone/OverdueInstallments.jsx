import React, { useEffect, useState } from "react";
import axios from "axios";
//কিস্তির তারিখ মেয়াদ উত্তীর্ণ - সদস্য
const OverdueInstallments = () => {
  const [overdue, setOverdue] = useState([]);

  useEffect(() => {
    const fetchOverdue = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/overdue-installments`
        );
        setOverdue(res.data);
      } catch (err) {
        console.error("Error fetching overdue installments:", err);
      }
    };

    fetchOverdue();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">কিস্তির তারিখ মেয়াদ উত্তীর্ণ - সদস্য</h2>

      {overdue.length === 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {overdue.map((inst) => (
              <tr key={inst.loanId + inst.installmentNo}>
                <td className="border px-3 py-2">{inst.memberName}</td>
                <td className="border px-3 py-2">{inst.mobileNumber}</td>
                <td className="border px-3 py-2">{inst.installmentNo}</td>
                <td className="border px-3 py-2 text-blue-600">{inst.installmentAmount}</td>
                <td className="border px-3 py-2">{inst.dueDate}</td>
                <td className="border px-3 py-2">{inst.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OverdueInstallments;
