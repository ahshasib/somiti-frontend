import React, { useEffect, useState } from "react";
import axios from "axios";

//অন্যান্য আয়-ব্যয়ের খাত page
const OtherIncomeExpensePage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

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

  // নতুন খাত create
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/other-income-expense`, { name });
      setCategories([...categories, res.data.data]);
      setName("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  // টাকা জমা/খরচ add
  const handleTransaction = async (id, type) => {
    const amount = parseFloat(prompt(`টাকার পরিমাণ (${type === "deposit" ? "জমা" : "খরচ"}) লিখুন:`));
    if (!amount || amount <= 0) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/other-income-expense/${id}/transaction`, { type, amount });
      setCategories(categories.map(cat => (cat._id === id ? res.data.data : cat)));
    } catch (err) {
      console.error(err);
      alert("Transaction যোগ করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">অন্যান্য আয়-ব্যয়ের খাত</h1>

      {/* Add Category Form */}
      <form className="mb-5 flex gap-2" onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="খাতের নাম"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-indigo-100">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">খাতের নাম</th>
              <th className="p-3">মোট জমা</th>
              <th className="p-3">মোট খরচ</th>
              <th className="p-3">মোট লাভ</th>
              <th className="p-3">সংশোধন</th>
              <th className="p-3">টাকা জমা</th>
              <th className="p-3">টাকা খরচ</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{cat.name}</td>
                <td className="p-3">{cat.totalDeposit}</td>
                <td className="p-3">{cat.totalExpense}</td>
                <td className="p-3">{cat.totalDeposit - cat.totalExpense}</td>
                <td className="p-3">Edit</td>
                <td className="p-3">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleTransaction(cat._id, "deposit")}
                  >
                    জমা
                  </button>
                </td>
                <td className="p-3">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleTransaction(cat._id, "expense")}
                  >
                    খরচ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OtherIncomeExpensePage;
