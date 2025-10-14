import React, { useEffect, useState } from "react";
import axios from "axios";
// লোনের সকল কিস্তি কালেকশন
const LoansCollectionPage = () => {
  const [loans, setLoans] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [allInstallments, setAllInstallments] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  // বিস্তারিত member data load করা
  const handleDetails = async (memberId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/member-installments/${memberId}`
      );
      setAllInstallments(res.data);
      setSelectedMember(memberId);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching member installments:", err);
    }
  };

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
            <th className="border px-3 py-2">Action</th>
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
              <td className="border px-3 py-2">
                  <button
                    onClick={() => handleDetails(loan.memberId)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    বিস্তারিত
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>


  {/* Modal / Popup */}
  {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 rounded-lg p-6 relative max-h-[80vh] overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">
        মেম্বার {selectedMember} এর সব কিস্তির তারিখ
      </h3>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Installment No</th>
            <th className="border px-3 py-2">Amount</th>
            <th className="border px-3 py-2">Date</th>
            <th className="border px-3 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {allInstallments.map((inst) => (
            <tr key={inst.installmentNo}>
              <td className="border px-3 py-2">{inst.installmentNo}</td>
              <td className="border px-3 py-2">{inst.installmentAmount}</td>
              <td className="border px-3 py-2">{inst.date}</td>
              <td className="border px-3 py-2">{inst.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
      >
        ✖
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default LoansCollectionPage;
