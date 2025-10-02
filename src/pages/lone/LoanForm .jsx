import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoanForm = () => {
  const [members, setMembers] = useState([]); // সব সদস্যের লিস্ট
  const [selectedMember, setSelectedMember] = useState(null); // নির্বাচিত সদস্য অবজেক্ট

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
        setMembers(res.data); // ধরে নিচ্ছি সার্ভার থেকে array আসবে
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };
    fetchMembers();
  }, []);

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
      memberId: selectedMember.memberId,  // ✅ Custom MemberId যাবে
      member: selectedMember._id,        // ✅ MongoDB _id ও পাঠাতে পারো চাইলে
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
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/loans`, loanData);
      console.log("Server Response:", res.data);
      alert("Loan Saved Successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving loan data");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-6">লোন প্রদান করুন</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* তারিখ */}
        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*তারিখঃ</label>
          <input
            type="date"
            value={loanDate}
            onChange={(e) => setLoanDate(e.target.value)}
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        {/* সদস্য নির্বাচন */}
        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*সদস্যর নামঃ</label>
          <select
            value={selectedMember ? selectedMember._id : ""}
            onChange={(e) => {
              const member = members.find((m) => m._id === e.target.value);
              setSelectedMember(member || null);
            }}
            className="flex-1 border rounded px-2 py-1 text-sm"
          >
            <option value="">-- বাছাই করুন --</option>
            {members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name} ({m.memberId})  {/* ✅ Custom ID দেখাচ্ছি */}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => navigate("/add-member")}
            className="bg-green-500 text-white px-3 py-1 rounded text-sm"
          >
            +
          </button>
        </div>

        {/* Loan Amount */}
        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*লোনের পরিমানঃ</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="লোনের পরিমান লিখুন"
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        {/* লভ্যাংশ */}
        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*লভ্যাংশঃ</label>
          <div className="flex flex-1 gap-2">
            <input
              type="number"
              value={dividend}
              onChange={(e) => setDividend(e.target.value)}
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <select
              value={dividendType}
              onChange={(e) => setDividendType(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="%">%</option>
              <option value="৳">৳</option>
            </select>
          </div>
        </div>

        {/* মোট লোন */}
        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">মোট লোনঃ</label>
          <input
            type="text"
            value={totalLoan}
            readOnly
            className="flex-1 border rounded px-2 py-1 text-sm bg-gray-100"
          />
        </div>

        {/* কিস্তির ধরণ */}
        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*কিস্তির ধরণঃ</label>
          <select
            value={installmentType}
            onChange={(e) => setInstallmentType(e.target.value)}
            className="flex-1 border rounded px-2 py-1 text-sm"
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
        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*কিস্তিঃ</label>
          <input
            type="number"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
            placeholder="টি"
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        {/* কিস্তির টাকা */}
        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*কিস্তির টাকাঃ</label>
          <input
            type="text"
            value={installmentAmount}
            readOnly
            className="flex-1 border rounded px-2 py-1 text-sm bg-gray-100"
          />
        </div>

        {/* বর্ণনা */}
        <div className="flex items-start gap-4">
          <label className="w-40 font-medium mt-1">বর্ণনাঃ</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="বর্ণনা লিখুন"
            className="flex-1 border rounded px-2 py-1 text-sm"
          ></textarea>
        </div>

        {/* SMS */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sendSMS}
            onChange={(e) => setSendSMS(e.target.checked)}
          />
          <label>SMS পাঠাতে চান?</label>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
          >
            লোন প্রদান করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanForm;
