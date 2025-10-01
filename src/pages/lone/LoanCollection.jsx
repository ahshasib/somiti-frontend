import React, { useState, useEffect } from "react";
import axios from "axios";
// লোনের কিস্তি কালেকশন page
const LoanCollection = () => {
  const [areas, setAreas] = useState([]);
  const [members, setMembers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    area: "",
    memberName: "",
    selectedLoan: "",
    amount: "",
    description: "",
    sendSMS: false,
    balance: 846,
  });

  // Fetch areas
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/areas`);
        setAreas(res.data);
      } catch (err) {
        console.error("Error fetching areas:", err);
      }
    };
    fetchAreas();
  }, []);

  // Fetch members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/members`);
        setMembers(res.data);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };
    fetchMembers();
  }, []);

  // Fetch loans for selected member
  useEffect(() => {
    const fetchLoans = async () => {
      if (!formData.memberName) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/loans?member=${formData.memberName}`);
        setLoans(res.data);
      } catch (err) {
        console.error("Error fetching loans:", err);
      }
    };
    fetchLoans();
  }, [formData.memberName]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.selectedLoan || !formData.amount) {
      alert("Please select a loan and enter amount!");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/loans/collection`, {
        loanId: formData.selectedLoan,
        collectionAmount: parseFloat(formData.amount),
        description: formData.description,
        sendSMS: formData.sendSMS,
      });

      alert(`Collection saved! Current due: ${res.data.currentDue}`);

      // Update frontend loan data
      setLoans((prev) =>
        prev.map((l) =>
          l._id === formData.selectedLoan ? { ...l, totalLoan: res.data.currentDue, collections: res.data.loan.collections } : l
        )
      );

      // Reset amount & description
      setFormData({ ...formData, amount: "", description: "" });

    } catch (err) {
      console.error(err);
      alert("Error saving collection");
    }
  };

  const totalDue = loans.reduce((sum, l) => sum + l.totalLoan, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">লোনের কিস্তি কালেকশন</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* তারিখ */}
        <div>
          <label className="block font-medium">*তারিখঃ</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        {/* এলাকা */}
        <div>
          <label className="block font-medium">এলাকাঃ</label>
          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">এলাকা নির্বাচন করুন</option>
            {areas.map((area) => (
              <option key={area._id} value={area.name}>{area.name}</option>
            ))}
          </select>
        </div>

        {/* সদস্য */}
        <div>
          <label className="block font-medium">*সদস্যর নামঃ</label>
          <select
            name="memberName"
            value={formData.memberName}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">সদস্য নির্বাচন করুন</option>
            {members.map((m) => (
              <option key={m._id} value={m.name}>{m.name}</option>
            ))}
          </select>
        </div>

        {/* মোট বাকি */}
        <div>
          <label className="block font-medium">মোট লোনের বাকি টাকাঃ</label>
          <input
            type="text"
            value={totalDue}
            disabled
            className="border px-3 py-2 rounded w-full bg-gray-100"
          />
        </div>

        {/* লোন লিস্ট */}
        <div>
          <label className="block font-medium">*লোন লিস্টঃ</label>
          <select
            name="selectedLoan"
            value={formData.selectedLoan}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">লোন নির্বাচন করুন</option>
            {loans.map((loan) => (
              <option key={loan._id} value={loan._id}>
                {loan.initialLoanAmount} টাকা - {loan.installments} কিস্তি
              </option>
            ))}
          </select>
        </div>

        {/* টাকার পরিমাণ */}
        <div>
          <label className="block font-medium">*টাকার পরিমানঃ</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="টাকার পরিমান লিখুন"
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        {/* বর্ণনা */}
        <div>
          <label className="block font-medium">বর্ণনাঃ</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="বর্ণনা লিখুন"
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        {/* SMS */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="sendSMS"
            checked={formData.sendSMS}
            onChange={handleChange}
          />
          <label>SMS পাঠাতে চান?</label>
        </div>

        {/* Balance */}
        <div>
          <label className="block font-medium">ব্যালেন্সঃ</label>
          <input
            type="text"
            name="balance"
            value={formData.balance}
            disabled
            className="border px-3 py-2 rounded w-full bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoanCollection;
