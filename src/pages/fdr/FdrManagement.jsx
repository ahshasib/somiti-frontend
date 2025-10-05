import React, { useEffect, useState } from "react";
import axios from "axios";
//FDR ব্যবস্থাপনা page
const FdrManagement = () => {
  const [fdrList, setFdrList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFdr, setSelectedFdr] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const fetchFdr = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/fdr-management`);
      setFdrList(res.data);
    } catch (err) {
      console.error(err);
      alert("FDR ডেটা লোড করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFdr();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("আপনি কি নিশ্চিত FDR ডিলিট করতে চান?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/fdr-management/${id}`);
      alert("FDR ডিলিট করা হয়েছে।");
      fetchFdr();
    } catch (err) {
      console.error(err);
      alert("ডিলিট করতে সমস্যা হয়েছে!");
    }
  };

  const handleWithdraw = async (fdrId) => {
    if (withdrawAmount <= 0) return alert("সঠিক টাকা দিন।");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/fdr-management/withdraw/${fdrId}`,
        { amount: withdrawAmount }
      );
      alert(res.data.message);
      setWithdrawAmount(0);
      setSelectedFdr(null);
      fetchFdr();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "উত্তোলন করতে সমস্যা হয়েছে!");
    }
  };

  if (loading) return <div className="p-6 text-center">লোড হচ্ছে...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 FDR ব্যবস্থাপনা</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full text-sm border">
          <thead className="bg-indigo-100 text-gray-800">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">নাম</th>
              <th className="p-3">মোবাইল</th>
              <th className="p-3">স্কিম</th>
              <th className="p-3">টাকা</th>
              <th className="p-3">লভ্যাংশ</th>
              <th className="p-3">সময়কাল</th>
              <th className="p-3">স্ট্যাটাস</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fdrList.map((fdr, i) => (
              <tr key={fdr.fdrId} className="border-b hover:bg-gray-50">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{fdr.memberName}</td>
                <td className="p-3">{fdr.phone}</td>
                <td className="p-3">{fdr.schemeName}</td>
                <td className="p-3">৳{fdr.fdrAmount}</td>
                <td className="p-3">{fdr.interestValue} {fdr.interestType}</td>
                <td className="p-3">{fdr.duration} মাস</td>
                <td className="p-3">{fdr.status}</td>
                <td className="p-3 flex flex-col gap-1">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => setSelectedFdr(fdr)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleWithdraw(fdr.fdrId)}
                  >
                    Withdraw
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => alert("Edit ফিচার আসলেই এখানে করবে")}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(fdr.fdrId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      {selectedFdr && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">FDR Details</h2>
            <p><strong>Member:</strong> {selectedFdr.memberName}</p>
            <p><strong>Phone:</strong> {selectedFdr.phone}</p>
            <p><strong>Scheme:</strong> {selectedFdr.schemeName}</p>
            <p><strong>Amount:</strong> ৳{selectedFdr.fdrAmount}</p>
            <p><strong>Interest:</strong> {selectedFdr.interestValue} {selectedFdr.interestType}</p>
            <p><strong>Duration:</strong> {selectedFdr.duration} মাস</p>
            <p><strong>Effective Date:</strong> {selectedFdr.effectiveDate}</p>
            <p><strong>Collection Date:</strong> {selectedFdr.collectionDate}</p>
            <p><strong>Status:</strong> {selectedFdr.status}</p>
            <p><strong>Description:</strong> {selectedFdr.description}</p>

            <div className="mt-4 flex gap-2">
              <input
                type="number"
                min="0"
                placeholder="উত্তোলন টাকার পরিমাণ"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
                className="border px-2 py-1 rounded flex-1"
              />
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => handleWithdraw(selectedFdr.fdrId)}
              >
                Withdraw
              </button>
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded"
                onClick={() => setSelectedFdr(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FdrManagement;
