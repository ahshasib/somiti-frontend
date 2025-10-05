import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEye, FiEdit, FiTrash2, FiDollarSign } from "react-icons/fi";
import Swal from "sweetalert2";

const FdrManagement = () => {
  const [fdrList, setFdrList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFdr, setSelectedFdr] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [editFdr, setEditFdr] = useState(null);
  const [updateData, setUpdateData] = useState({
    fdrAmount: 0,
    status: "active",
    description: "",
    effectiveDate: "",
  });

  // Fetch all FDR
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

  // Delete FDR
// Delete FDR
const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "আপনি কি FDR ডিলিট করতে চান?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, ডিলিট করো",
      cancelButtonText: "বাতিল",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/fdr-management/${id}`);
      Swal.fire("ডিলিট হয়েছে!", "FDR সফলভাবে ডিলিট করা হয়েছে।", "success");
      fetchFdr();
    } catch (err) {
      console.error(err);
      Swal.fire("ত্রুটি!", "ডিলিট করতে সমস্যা হয়েছে!", "error");
    }
  };
  
  // Withdraw
  const handleWithdraw = async (fdrId) => {
    if (withdrawAmount <= 0)
      return Swal.fire("সতর্কতা!", "সঠিক টাকা দিন।", "warning");
  
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/fdr-management/withdraw/${fdrId}`,
        { amount: withdrawAmount }
      );
      Swal.fire("সফল!", res.data.message, "success");
      setWithdrawAmount(0);
      setSelectedFdr(null);
      fetchFdr();
    } catch (err) {
      console.error(err);
      Swal.fire("ত্রুটি!", err.response?.data?.message || "উত্তোলন করতে সমস্যা হয়েছে!", "error");
    }
  };

   // Open Edit Modal
   const openEditModal = (fdr) => {
    setEditFdr(fdr);
    setUpdateData({
      fdrAmount: fdr.fdrAmount,
      status: fdr.status,
      description: fdr.description || "",
      effectiveDate: fdr.effectiveDate || new Date().toISOString().slice(0, 10),
    });
  };
  
  // Edit Submit
  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/fdr-management/${editFdr.fdrId}`,
        updateData
      );
      Swal.fire("সফল!", "FDR আপডেট করা হয়েছে।", "success");
      setEditFdr(null);
      fetchFdr();
    } catch (err) {
      console.error(err);
      Swal.fire("ত্রুটি!", "আপডেট করতে সমস্যা হয়েছে!", "error");
    }
  };
  


 
  if (loading) return <div className="p-6 text-center text-lg">লোড হচ্ছে...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">📊 FDR ব্যবস্থাপনা</h1>

      {/* Table */}
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
                <td className="p-3 capitalize">{fdr.status}</td>
                <td className="p-3 flex flex-col md:flex-row gap-2">
                  <button
                    className="flex items-center gap-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    onClick={() => setSelectedFdr(fdr)}
                  >
                    <FiEye /> View
                  </button>
                  <button
                    className="flex items-center gap-1 px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                    onClick={() => setSelectedFdr(fdr)}
                  >
                    <FiDollarSign /> Withdraw
                  </button>
                  <button
                    className="flex items-center gap-1 px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    onClick={() => openEditModal(fdr)}
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    className="flex items-center gap-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    onClick={() => handleDelete(fdr.fdrId)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View / Withdraw Modal */}
      {selectedFdr && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
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

            <div className="mt-4 flex flex-col gap-2">
              <input
                type="number"
                min="0"
                placeholder="উত্তোলন টাকার পরিমাণ"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
                className="border px-3 py-2 rounded w-full"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                  onClick={() => setSelectedFdr(null)}
                >
                  Close
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleWithdraw(selectedFdr.fdrId)}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editFdr && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit FDR</h2>

            <label className="block mb-1">Amount (৳)</label>
            <input
              type="number"
              value={updateData.fdrAmount}
              onChange={(e) => setUpdateData({ ...updateData, fdrAmount: parseFloat(e.target.value) })}
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <label className="block mb-1">Status</label>
            <select
              value={updateData.status}
              onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-3"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <label className="block mb-1">Effective Date</label>
            <input
              type="date"
              value={updateData.effectiveDate}
              onChange={(e) => setUpdateData({ ...updateData, effectiveDate: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <label className="block mb-1">Description</label>
            <textarea
              value={updateData.description}
              onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded"
                onClick={() => setEditFdr(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={handleEditSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FdrManagement;
