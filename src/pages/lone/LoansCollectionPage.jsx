import React, { useEffect, useState } from "react";
import axios from "axios";
// লোনের সকল কিস্তি কালেকশন
const LoansCollectionPage = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/loans-with-members`);
        setLoans(res.data);
      } catch (err) {
        console.error("Error fetching loans:", err);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">লোনের সকল কিস্তি কালেকশন</h2>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Member Name</th>
            <th className="border px-3 py-2">Mobile</th>
            <th className="border px-3 py-2">Initial Loan</th>
            <th className="border px-3 py-2">Total Loan</th>
            <th className="border px-3 py-2">Paid</th>
            <th className="border px-3 py-2">Due</th>
            <th className="border px-3 py-2">Installments</th>
            <th className="border px-3 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.loanId}>
              <td className="border px-3 py-2">{loan.memberName}</td>
              <td className="border px-3 py-2">{loan.mobileNumber}</td>
              <td className="border px-3 py-2">{loan.initialLoanAmount}</td>
              <td className="border px-3 py-2">{loan.totalLoan}</td>
              <td className="border px-3 py-2 text-green-600">{loan.totalPaid}</td>
              <td className="border px-3 py-2 text-red-600">{loan.due}</td>
              <td className="border px-3 py-2">{loan.installments}</td>
              <td className="border px-3 py-2">{loan.installmentType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoansCollectionPage;
