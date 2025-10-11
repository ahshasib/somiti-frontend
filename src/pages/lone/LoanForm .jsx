import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoanForm = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [loanAmount, setLoanAmount] = useState("");
  const [dividend, setDividend] = useState(0);
  const [dividendType, setDividendType] = useState("%");
  const [totalLoan, setTotalLoan] = useState(0);
  const [installmentType, setInstallmentType] = useState("");
  const [installments, setInstallments] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [description, setDescription] = useState("");
  const [sendSMS, setSendSMS] = useState(false);
  const [loanDate, setLoanDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const navigate = useNavigate();

  // 🔹 সব সদস্য লোড করা
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/members`);
        setMembers(res.data);
        setFilteredMembers(res.data);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };
    fetchMembers();
  }, []);

  // 🔹 সার্চ হ্যান্ডলার
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter(
        (m) =>
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.memberId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  }, [searchTerm, members]);

  // মোট লোন ক্যালকুলেশন
  useEffect(() => {
    let total = 0;
    if (dividendType === "%") {
      total =
        parseFloat(loanAmount || 0) +
        (parseFloat(loanAmount || 0) * parseFloat(dividend || 0)) / 100;
    } else {
      total = parseFloat(loanAmount || 0) + parseFloat(dividend || 0);
    }
    setTotalLoan(total.toFixed(2));
  }, [loanAmount, dividend, dividendType]);

  // কিস্তির টাকা ক্যালকুলেশন
  useEffect(() => {
    if (installments && totalLoan) {
      const perInstallment = parseFloat(totalLoan || 0) / parseFloat(installments || 1);
      setInstallmentAmount(perInstallment.toFixed(2));
    }
  }, [installments, totalLoan]);

  // ফর্ম সাবমিট
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMember) {
      alert("সদস্য নির্বাচন করুন");
      return;
    }

    const loanData = {
      date: new Date(loanDate),
      memberId: selectedMember.memberId,
      member: selectedMember._id,
      name: selectedMember.name,
      loanAmount: parseFloat(loanAmount),
      dividend: parseFloat(dividend),
      dividendType,
      totalLoan: parseFloat(totalLoan),
      installmentType,
      installments: parseInt(installments),
      installmentAmount: parseFloat(installmentAmount),
      description,
      sendSMS,
    };

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/loans`, loanData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Loan saved successfully for ${loanData.name}!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error(err);
      alert("Error saving loan data");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl mt-10">
  <h2 className="text-2xl font-bold mb-8 text-center text-indigo-700">
    লোন প্রদান করুন
  </h2>

  {/* 🔍 সার্চ বার */}
  <div className="mb-6 relative">
    <input
      type="text"
      placeholder="সদস্যের নাম বা আইডি দিয়ে সার্চ করুন..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
    />
    {searchTerm.trim() && filteredMembers.length > 0 && (
      <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg w-full mt-1 max-h-48 overflow-y-auto">
        {filteredMembers.map((m) => (
          <li
            key={m._id}
            onClick={() => {
              setSelectedMember(m);
              setSearchTerm(`${m.name} (${m.memberId})`);
              setFilteredMembers(members);
            }}
            className="px-4 py-2 hover:bg-indigo-100 cursor-pointer text-sm transition"
          >
            {m.name} ({m.memberId})
          </li>
        ))}
      </ul>
    )}
  </div>

  <form className="space-y-5" onSubmit={handleSubmit}>
    {/* তারিখ */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
      <label className="w-40 font-medium text-gray-700">*তারিখঃ</label>
      <input
        type="date"
        value={loanDate}
        onChange={(e) => setLoanDate(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
      />
    </div>

    {/* সদস্য নির্বাচন */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
      <label className="w-40 font-medium text-gray-700">*সদস্যর নামঃ</label>
      <select
        value={selectedMember ? selectedMember._id : ""}
        onChange={(e) => {
          const member = members.find((m) => m._id === e.target.value);
          setSelectedMember(member || null);
          setSearchTerm(member ? `${member.name} (${member.memberId})` : "");
        }}
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
      >
        <option value="">-- বাছাই করুন --</option>
        {members.map((m) => (
          <option key={m._id} value={m._id}>
            {m.name} ({m.memberId})
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => navigate("/dashboard/member-create")}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
      >
        +
      </button>
    </div>

    {/* Loan Amount */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
      <label className="w-40 font-medium text-gray-700">*লোনের পরিমানঃ</label>
      <input
        type="number"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
        placeholder="লোনের পরিমান লিখুন"
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
      />
    </div>

    {/* লভ্যাংশ */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
      <label className="w-40 font-medium text-gray-700">*লভ্যাংশঃ</label>
      <div className="flex flex-1 gap-2">
        <input
          type="number"
          value={dividend}
          onChange={(e) => setDividend(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
        />
        <select
          value={dividendType}
          onChange={(e) => setDividendType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
        >
          <option value="%">%</option>
          <option value="৳">৳</option>
        </select>
      </div>
    </div>

    {/* মোট লোন */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
      <label className="w-40 font-medium text-gray-700">মোট লোনঃ</label>
      <input
        type="text"
        value={totalLoan}
        readOnly
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100 outline-none"
      />
    </div>

    {/* কিস্তির ধরণ */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
      <label className="w-40 font-medium text-gray-700">*কিস্তির ধরণঃ</label>
      <select
        value={installmentType}
        onChange={(e) => setInstallmentType(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
      >
        <option value="">-- বাছাই করুন --</option>
        <option value="দৈনিক">দৈনিক</option>
        <option value="সাপ্তাহিক">সাপ্তাহিক</option>
        <option value="পাক্ষিক">পাক্ষিক</option>
        <option value="মাসিক">মাসিক</option>
        <option value="৬-মাসিক">৬-মাসিক</option>
      </select>
    </div>

    {/* কিস্তি সংখ্যা */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
      <label className="w-40 font-medium text-gray-700">*কিস্তিঃ</label>
      <input
        type="number"
        value={installments}
        onChange={(e) => setInstallments(e.target.value)}
        placeholder="টি"
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
      />
    </div>

    {/* কিস্তির টাকা */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
      <label className="w-40 font-medium text-gray-700">*কিস্তির টাকাঃ</label>
      <input
        type="text"
        value={installmentAmount}
        readOnly
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100 outline-none"
      />
    </div>

    {/* বর্ণনা */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
      <label className="w-40 font-medium text-gray-700 mt-1">বর্ণনাঃ</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="বর্ণনা লিখুন"
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
      ></textarea>
    </div>

    {/* SMS */}
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={sendSMS}
        onChange={(e) => setSendSMS(e.target.checked)}
        className="w-4 h-4 accent-indigo-600"
      />
      <label className="text-gray-700">SMS পাঠাতে চান?</label>
    </div>

    {/* Submit */}
    <div className="text-center mt-4">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
      >
        লোন প্রদান করুন
      </button>
    </div>
  </form>
</div>

  );
};

export default LoanForm;
