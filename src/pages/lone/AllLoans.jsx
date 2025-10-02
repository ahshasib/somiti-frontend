import React, { useEffect, useState } from "react";
import axios from "axios";
//সকল লোনের তথ্য page
const AllLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/loans`);
        setLoans(res.data);
      } catch (err) {
        console.error("Error fetching loans:", err);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="max-w-full mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">সকল লোনের তথ্য</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 bg-indigo-200">তারিখ</th>
              <th className="border px-4 py-2 bg-indigo-200">লোন গ্রহণকারীর তথ্য</th>
              <th className="border px-4 py-2 bg-indigo-200">লোনের তথ্য</th>
              <th className="border px-4 py-2 bg-indigo-200">কিস্তির তথ্য</th>
              <th className="border px-4 py-2 bg-indigo-200">মোট টাকার পরিমাণ</th>
              <th className="border px-4 py-2 bg-indigo-200">বর্ণনা</th>
              <th className="border px-4 py-2 bg-indigo-200">লোন প্রদান করেছেন</th>
              <th className="border px-4 py-2 bg-indigo-200">রিসিট</th>
              <th className="border px-4 py-2 bg-indigo-200">পরিবর্তন</th>
              <th className="border px-4 py-2 bg-indigo-200">বিস্তারিত</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="text-sm">
                <td className="border px-4 py-2">
                  {new Date(loan.loanDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{loan.name}</td>
                <td className="border px-4 py-2">
                  Amount: {loan.loanAmount} <br />
                  Dividend: {loan.dividend} {loan.dividendType} <br />
                </td>
                <td className="border px-4 py-2">
                  Type: {loan.installmentType} <br />
                  Count: {loan.installments} <br />
                  Per Installment: {loan.installmentAmount.toFixed(2)}
                </td>
                <td className="border px-4 py-2">{loan.totalLoan.toFixed(2)}</td>
                <td className="border px-4 py-2">{loan.description || "-"}</td>
                <td className="border px-4 py-2">Admin Name</td>
                <td className="border px-4 py-2">Receipt</td>
                <td className="border px-4 py-2">Edit/Delete</td>
                <td className="border px-4 py-2">Details</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLoans;
