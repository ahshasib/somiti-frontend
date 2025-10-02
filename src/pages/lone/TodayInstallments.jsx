import React, { useEffect, useState } from "react";
import axios from "axios";

const TodayInstallments = () => {
  const [installments, setInstallments] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [allInstallments, setAllInstallments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTodayInstallments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/today-installments`
        );
        // server-side থেকে শুধুমাত্র আজকের কিস্তি আসছে
        setInstallments(res.data);
      } catch (err) {
        console.error("Error fetching installments:", err);
      }
    };
    fetchTodayInstallments();
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
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">আজ লোনের কিস্তির তারিখ</h2>

      {installments.length === 0 ? (
        <p className="text-gray-600 text-center py-4">
          আজ কারো কিস্তির তারিখ নেই ✅
        </p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Member Name</th>
              <th className="border px-3 py-2">Mobile</th>
              <th className="border px-3 py-2">Installment No</th>
              <th className="border px-3 py-2">Amount</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Type</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {installments.map((inst) => (
              <tr key={inst.loanId + inst.installmentNo}>
                <td className="border px-3 py-2">{inst.memberName}</td>
                <td className="border px-3 py-2">{inst.mobileNumber}</td>
                <td className="border px-3 py-2">{inst.installmentNo}</td>
                <td className="border px-3 py-2 text-blue-600">
                  {inst.installmentAmount}
                </td>
                <td className="border px-3 py-2">{inst.date}</td>
                <td className="border px-3 py-2">{inst.type}</td>
                <td className="border px-3 py-2">
                  <button
                    onClick={() => handleDetails(inst.memberId)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    বিস্তারিত
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal / Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 rounded-lg p-6 relative">
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

export default TodayInstallments;
