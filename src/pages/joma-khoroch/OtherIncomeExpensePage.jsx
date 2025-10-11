import React, { useEffect, useState } from "react";
import axios from "axios";

const OtherIncomeExpensePage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Load categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/other-income-expense`);
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
      alert("ডেটা আনতে সমস্যা হয়েছে");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add Category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/other-income-expense`, { name });
      setCategories([...categories, res.data.data]);
      setName("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  // Open custom transaction modal
  const openTransactionModal = (id, type) => {
    setCurrentCategoryId(id);
    setTransactionType(type);
    setTransactionAmount("");
    setShowTransactionModal(true);
  };

  // Confirm transaction
  const handleConfirmTransaction = async () => {
    const amount = parseFloat(transactionAmount);
    if (!amount || amount <= 0) {
      alert("সঠিক পরিমাণ লিখুন");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/other-income-expense/${currentCategoryId}/transaction`,
        { type: transactionType, amount }
      );
      setCategories(categories.map(cat => (cat._id === currentCategoryId ? res.data.data : cat)));
      setShowTransactionModal(false);
    } catch (err) {
      console.error(err);
      alert("Transaction যোগ করতে সমস্যা হয়েছে");
    }
  };

  // View transaction details
  const handleViewTransactions = (transactions) => {
    setSelectedTransactions(transactions);
    setShowDetailModal(true);
  };

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700 border-b pb-3">অন্যান্য আয়-ব্যয়ের খাত</h1>

      {/* Add Category */}
      <form className="mb-6 flex gap-3" onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="খাতের নাম"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Add
        </button>
      </form>

      {/* Categories Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-100 text-gray-800 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">খাতের নাম</th>
              <th className="px-4 py-3 text-right">মোট জমা</th>
              <th className="px-4 py-3 text-right">মোট খরচ</th>
              <th className="px-4 py-3 text-right">মোট লাভ</th>
              <th className="px-4 py-3 text-center">বিস্তারিত</th>
              <th className="px-4 py-3 text-center">টাকা জমা</th>
              <th className="px-4 py-3 text-center">টাকা খরচ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((cat, index) => (
              <tr key={cat._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-700">{cat.name}</td>
                <td className="px-4 py-3 text-right text-green-600 font-semibold">{cat.totalDeposit || 0}</td>
                <td className="px-4 py-3 text-right text-red-600 font-semibold">{cat.totalExpense || 0}</td>
                <td className="px-4 py-3 text-right font-medium">{(cat.totalDeposit || 0) - (cat.totalExpense || 0)}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleViewTransactions(cat.transactions || [])}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                  >
                    দেখুন
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm"
                    onClick={() => openTransactionModal(cat._id, "deposit")}
                  >
                    জমা
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                    onClick={() => openTransactionModal(cat._id, "expense")}
                  >
                    খরচ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Transaction Modal */}
      {showTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-80 p-6 shadow-lg relative">
            <h2 className="text-xl font-bold mb-4 text-indigo-700">
              {transactionType === "deposit" ? "টাকা জমা" : "টাকা খরচ"}
            </h2>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
              onClick={() => setShowTransactionModal(false)}
            >
              ✕
            </button>
            <input
              type="number"
              placeholder="টাকার পরিমাণ লিখুন"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                onClick={() => setShowTransactionModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                onClick={handleConfirmTransaction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Transaction Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-96 p-6 shadow-lg relative">
            <h2 className="text-xl font-bold mb-4 text-indigo-700 border-b pb-2">Transaction Details</h2>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
              onClick={() => setShowDetailModal(false)}
            >
              ✕
            </button>
            <div className="max-h-80 overflow-y-auto mt-2">
              {selectedTransactions.length === 0 ? (
                <p className="text-gray-500 text-center">কোনো transaction নেই।</p>
              ) : (
                <ul>
                  {selectedTransactions.map((t, idx) => (
                    <li
                      key={idx}
                      className={`flex justify-between py-2 px-3 rounded-lg mb-2 text-sm font-medium ${
                        t.type === "deposit"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <span>{t.amount} টাকা</span>
                      <span>{new Date(t.date).toLocaleDateString("bn-BD")}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherIncomeExpensePage;
