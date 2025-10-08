import React, { useEffect, useState } from "react";
import axios from "axios";

const InitialCashPage = () => {
  const [cashData, setCashData] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // ডাটা লোড করা
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/initial-cash`);
    setCashData(res.data);
  };

  // যোগ/আপডেট করা
  const handleSave = async () => {
    if (!amount) return alert("টাকার পরিমাণ দিন");
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/initial-cash`, {
      amount,
      description,
    });
    setCashData(res.data);
    alert("তথ্য সংরক্ষণ করা হয়েছে ✅");
  };

  // পরিবর্তন বাটনে ক্লিক করলে ইনপুটে মান বসানো
  const handleEdit = () => {
    setAmount(cashData.amount);
    setDescription(cashData.description);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        হিসাব শুরুর ক্যাশ টাকা
      </h2>

      {/* ইনপুট সেকশন */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <input
          type="number"
          placeholder="টাকার পরিমাণ"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="বর্ণনা"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          সংরক্ষণ করুন
        </button>
      </div>

      {/* টেবিল */}
      {cashData && (
        <table className="w-full border-collapse border text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">তারিখ</th>
              <th className="border p-2">টাকার পরিমাণ</th>
              <th className="border p-2">বর্ণনা</th>
              <th className="border p-2">পরিবর্তন</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">
                {new Date(cashData.date).toLocaleDateString("bn-BD")}
              </td>
              <td className="border p-2">{cashData.amount} ৳</td>
              <td className="border p-2">{cashData.description}</td>
              <td className="border p-2">
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  পরিবর্তন
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InitialCashPage;
