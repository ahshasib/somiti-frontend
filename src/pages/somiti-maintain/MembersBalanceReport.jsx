import React, { useEffect, useState } from "react";
import axios from "axios";

const MembersBalanceReport = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/members-balance-report`
      );
      setMembers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🧾 সকল সদস্যের ব্যালেন্স রিপোর্ট
      </h2>

      {loading ? (
        <p className="text-center text-gray-600 animate-pulse">
          লোড হচ্ছে...
        </p>
      ) : members.length === 0 ? (
        <p className="text-center text-gray-600">
          কোনো সদস্য পাওয়া যায়নি
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-indigo-100 to-pink-100 text-gray-800 text-sm uppercase tracking-wide">
              <tr>
                <th className="py-3 px-4 text-left border-b">সদস্যের নাম</th>
                <th className="py-3 px-4 text-left border-b">মোবাইল</th>
                <th className="py-3 px-4 text-left border-b">ঠিকানা</th>
                <th className="py-3 px-4 border-b">মোট লোন প্রদান</th>
                <th className="py-3 px-4 border-b">লোন কালেকশন</th>
                <th className="py-3 px-4 border-b">DPS জমা</th>
                <th className="py-3 px-4 border-b">DPS ব্যালান্স</th>
                <th className="py-3 px-4 border-b">FDR জমা</th>
                <th className="py-3 px-4 border-b">বিস্তারিত</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.map((member, index) => (
                <tr
                  key={member.memberId}
                  className={`hover:bg-indigo-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {member.name}
                  </td>
                  <td className="py-3 px-4">{member.mobile}</td>
                  <td className="py-3 px-4">{member.address}</td>
                  <td className="py-3 px-4 font-semibold text-indigo-600">
                    {member.totalLoanGiven} ৳
                  </td>
                  <td className="py-3 px-4 text-green-600 font-semibold">
                    {member.totalLoanCollection} ৳
                  </td>
                  <td className="py-3 px-4 text-blue-600 font-semibold">
                    {member.totalDPSDeposit} ৳
                  </td>
                  <td className="py-3 px-4 text-yellow-600 font-semibold">
                    {member.totalDPSBalance} ৳
                  </td>
                  <td className="py-3 px-4 text-purple-600 font-semibold">
                    {member.totalFDRDeposit} ৳
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-lg shadow hover:from-indigo-600 hover:to-blue-500 transition"
                    >
                      বিস্তারিত
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl w-full overflow-auto max-h-[85vh] border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-center text-indigo-700">
              {selectedMember.name} এর বিস্তারিত
            </h3>
            <p className="text-gray-700 mb-2">
              <strong>📞 Mobile:</strong> {selectedMember.mobile}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>🏠 Address:</strong> {selectedMember.address}
            </p>

            {/* Loans */}
            <h4 className="mt-4 font-semibold text-lg border-b pb-1 text-gray-800">
              💰 Loans:
            </h4>
            {selectedMember.loans.length === 0 ? (
              <p className="text-gray-500">-</p>
            ) : (
              selectedMember.loans.map((loan, idx) => (
                <div key={idx} className="border p-3 mt-2 rounded-lg bg-gray-50">
                  <p><strong>Loan Amount:</strong> {loan.initialLoanAmount} ৳</p>
                  <p>
                    <strong>Total Collected:</strong>{" "}
                    {loan.collections.reduce((a, c) => a + c.amount, 0)} ৳
                  </p>
                  <p><strong>Description:</strong> {loan.description}</p>
                </div>
              ))
            )}

            {/* DPS */}
            <h4 className="mt-4 font-semibold text-lg border-b pb-1 text-gray-800">
              📊 DPS:
            </h4>
            {selectedMember.dpsSettings.length === 0 ? (
              <p className="text-gray-500">-</p>
            ) : (
              selectedMember.dpsSettings.map((dps, idx) => (
                <div key={idx} className="border p-3 mt-2 rounded-lg bg-gray-50">
                  <p><strong>Scheme ID:</strong> {dps.schemeId}</p>
                  <p>
                    <strong>Total Collected:</strong>{" "}
                    {dps.collections.reduce((a, c) => a + c.collectedAmount, 0)} ৳
                  </p>
                  <p>
                    <strong>Balance:</strong>{" "}
                    {dps.collections.reduce((a, c) => a + c.balance, 0)} ৳
                  </p>
                </div>
              ))
            )}

            {/* FDR */}
            <h4 className="mt-4 font-semibold text-lg border-b pb-1 text-gray-800">
              🏦 FDR:
            </h4>
            {selectedMember.fdrSettings.length === 0 ? (
              <p className="text-gray-500">-</p>
            ) : (
              selectedMember.fdrSettings.map((fdr, idx) => (
                <div key={idx} className="border p-3 mt-2 rounded-lg bg-gray-50">
                  <p><strong>FDR Amount:</strong> {fdr.fdrAmount} ৳</p>
                  <p><strong>Description:</strong> {fdr.description}</p>
                </div>
              ))
            )}

            <div className="flex justify-center mt-6">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow"
                onClick={() => setSelectedMember(null)}
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersBalanceReport;
