import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const LoanCollection = () => {
  const [members, setMembers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    memberId: "",
    selectedLoan: "",
    amount: "",
    description: "",
    sendSMS: false,
  });

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

  useEffect(() => {
    const fetchLoans = async () => {
      if (!formData.memberId) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/loans?memberId=${formData.memberId}`
        );
        setLoans(res.data);
      } catch (err) {
        console.error("Error fetching loans:", err);
      }
    };
    fetchLoans();
  }, [formData.memberId]);

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
      Swal.fire("Error", "Please select a loan and enter amount!", "error");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/loans/collection`,
        {
          loanId: formData.selectedLoan,
          collectionAmount: parseFloat(formData.amount),
          description: formData.description,
          sendSMS: formData.sendSMS,
          date: formData.date
        }
      );

      Swal.fire({
        title: "Success",
        text: `Collection saved! Current due: ${res.data.currentDue}`,
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
      });

      setLoans((prev) =>
        prev.map((l) =>
          l._id === formData.selectedLoan
            ? { ...l, totalLoan: res.data.currentDue, collections: res.data.loan.collections }
            : l
        )
      );

      setFormData({ ...formData, amount: "", description: "" });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Error saving collection", "error");
    }
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.mobileNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMember = (member) => {
    setFormData({ ...formData, memberId: member.memberId });
    setSearchTerm("");
  };

  const totalDue = loans.reduce((sum, l) => sum + l.totalLoan, 0);

  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        লোনের কিস্তি কালেকশন
      </h2>

      {/* Member Search */}
      <div className="mb-6 relative bg-white rounded">
        <input
          type="text"
          placeholder="সদস্যর নাম বা মোবাইল নাম্বার লিখুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {searchTerm && (
          <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((m) => (
                <div
                  key={m._id}
                  className="flex justify-between items-center p-3 hover:bg-blue-50 cursor-pointer"
                >
                  <div>
                    <p className="font-medium text-gray-800">{m.name}</p>
                    <p className="text-sm text-gray-500">{m.mobileNumber}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectMember(m)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Select
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 p-3">কোন সদস্য পাওয়া যায়নি</p>
            )}
          </div>
        )}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">তারিখ</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">সদস্য নির্বাচন করুন</label>
            <select
              name="memberId"
              value={formData.memberId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">সদস্য নির্বাচন করুন</option>
              {members.map((m) => (
                <option key={m._id} value={m.memberId}>
                  {m.name} ({m.mobileNumber})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">মোট লোনের বাকি টাকাঃ</label>
            <input
              type="text"
              value={totalDue}
              disabled
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">লোন লিস্ট</label>
            <select
              name="selectedLoan"
              value={formData.selectedLoan}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">লোন নির্বাচন করুন</option>
              {loans.map((loan) => (
                <option key={loan._id} value={loan._id}>
                  {loan.initialLoanAmount} টাকা - {loan.installments} কিস্তি
                </option>
              ))}
            </select>
          </div>

          {/* Installment Amount */}
          {formData.selectedLoan && (
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                কিস্তির পরিমান
              </label>
              <input
                type="text"
                value={loans.find((l) => l._id === formData.selectedLoan)?.installmentAmount ?? ""}
                disabled
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
              />
            </div>
          )}

          <div>
            <label className="block font-medium text-gray-700 mb-1">টাকার পরিমান</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="টাকার পরিমান লিখুন"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">বর্ণনাঃ</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="বর্ণনা লিখুন"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              name="sendSMS"
              checked={formData.sendSMS}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label className="text-gray-700 font-medium">SMS পাঠাতে চান?</label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoanCollection;
