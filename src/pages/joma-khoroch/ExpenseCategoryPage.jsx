import React, { useEffect, useState } from "react";
import axios from "axios";

//খরচের খাত ব্যবস্থাপনা page
const ExpenseCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [detailsModal, setDetailsModal] = useState(null);

  // Load data
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/expense-category`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  // Add category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/expense-category`, {
      categoryName,
    });
    setCategories([...categories, res.data]);
    setCategoryName("");
  };

  // Add expense
  const handleAddExpense = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/expense-category/${selectedCategory._id}/add-expense`,
      { amount, note }
    );
    setCategories(
      categories.map((c) => (c._id === res.data._id ? res.data : c))
    );
    setShowModal(false);
    setAmount("");
    setNote("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        খরচের খাত ব্যবস্থাপনা
      </h2>

      {/* Add form */}
      <form onSubmit={handleAddCategory} className="mb-5 flex gap-3">
        <input
          type="text"
          placeholder="খরচের খাতের নাম"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border p-2 rounded w-64"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          যোগ করুন
        </button>
      </form>

      {/* Table */}
      <table className="w-full border border-gray-300 bg-white rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">খরচের খাতের নাম</th>
            <th className="p-3 border">মোট খরচ</th>
            <th className="p-3 border">টাকা প্রদান</th>
            <th className="p-3 border">বিস্তারিত</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td className="p-3 border">{cat.categoryName}</td>
              <td className="p-3 border">{cat.totalExpense} ৳</td>
              <td className="p-3 border text-center">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowModal(true);
                  }}
                >
                  টাকা প্রদান
                </button>
              </td>
              <td className="p-3 border text-center">
                <button
                  className="bg-gray-600 text-white px-3 py-1 rounded"
                  onClick={() => setDetailsModal(cat)}
                >
                  বিস্তারিত
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* টাকা প্রদান Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-3">
              {selectedCategory.categoryName}
            </h3>
            <input
              type="number"
              placeholder="পরিমাণ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 w-full mb-3 rounded"
            />
            <input
              type="text"
              placeholder="নোট (ঐচ্ছিক)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                বাতিল
              </button>
              <button
                onClick={handleAddExpense}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                সংরক্ষণ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* বিস্তারিত Modal */}
      {detailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-3">
              {detailsModal.categoryName} - বিস্তারিত
            </h3>
            {detailsModal.transactions.length > 0 ? (
              detailsModal.transactions.map((t, i) => (
                <div
                  key={i}
                  className="border-b py-2 text-sm text-gray-700 flex justify-between"
                >
                  <span>{new Date(t.date).toLocaleDateString("bn-BD")}</span>
                  <span>{t.amount} ৳</span>
                  <span>{t.note}</span>
                </div>
              ))
            ) : (
              <p>কোনো লেনদেন নেই</p>
            )}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setDetailsModal(null)}
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCategoryPage;
