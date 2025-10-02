import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CloseLoansPage = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/close-loans`);
        setMembers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMembers();
  }, []);

  // বিস্তারিত দেখার জন্য
  const handleDetails = async (memberId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/member-loans/${memberId}`
      );
      setSelectedMember({ memberId, loans: res.data });
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  // লোন বন্ধ করা
  const handleCloseLoan = (memberId) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "লোন বন্ধ করলে সব কিস্তি ডিলিট হয়ে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, বন্ধ করুন",
      cancelButtonText: "বাতিল"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/close-loan/${memberId}`);
          Swal.fire("সফল", "লোন বন্ধ হয়েছে", "success");
          setMembers(members.filter(m => m.memberId !== memberId));
        } catch (err) {
          console.error(err);
          Swal.fire("ত্রুটি", "লোন বন্ধ করা যায়নি", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">লোন বন্ধ করুন</h2>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Member Name</th>
            <th className="border px-3 py-2">Mobile</th>
            <th className="border px-3 py-2">Total Loan</th>
            <th className="border px-3 py-2">Due Amount</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.memberId}>
              <td className="border px-3 py-2">{member.name}</td>
              <td className="border px-3 py-2">{member.mobileNumber}</td>
              <td className="border px-3 py-2">{member.totalLoan}</td>
              <td className="border px-3 py-2">{member.dueAmount}</td>
              <td className="border px-3 py-2 flex gap-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => handleDetails(member.memberId)}
                >
                  বিস্তারিত
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleCloseLoan(member.memberId)}
                >
                  লোন বন্ধ করুন
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-3/4 md:w-1/2 rounded-lg p-6 relative">
            <h3 className="text-lg font-bold mb-4">
              মেম্বার {selectedMember.memberId} এর লোন বিস্তারিত
            </h3>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2">Loan ID</th>
                  <th className="border px-3 py-2">Total Loan</th>
                  <th className="border px-3 py-2">Installment Type</th>
                  <th className="border px-3 py-2">Installments</th>
                  <th className="border px-3 py-2">Paid Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedMember.loans.map((loan) => {
                  const paidAmount = loan.collections?.reduce((sum, c) => sum + c.amount, 0) || 0;
                  return (
                    <tr key={loan._id}>
                      <td className="border px-3 py-2">{loan._id}</td>
                      <td className="border px-3 py-2">{loan.totalLoan}</td>
                      <td className="border px-3 py-2">{loan.installmentType}</td>
                      <td className="border px-3 py-2">{loan.installments}</td>
                      <td className="border px-3 py-2">{paidAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloseLoansPage;
