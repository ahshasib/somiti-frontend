import React, { useState } from "react";

const LoanForm = () => {
  const [memberName, setMemberName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [dividend, setDividend] = useState(0);
  const [totalLoan, setTotalLoan] = useState(0);
  const [installmentType, setInstallmentType] = useState("");
  const [installments, setInstallments] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [description, setDescription] = useState("");
  const [sendSMS, setSendSMS] = useState(false);

  const handleLoanAmountChange = (e) => {
    const value = e.target.value;
    setLoanAmount(value);
    const total = parseFloat(value || 0) + (parseFloat(value || 0) * dividend) / 100;
    setTotalLoan(total.toFixed(2));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-6">লোন প্রদান করুন</h2>
      
      <form className="space-y-4">
        {/* Inline field */}
        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*তারিখঃ</label>
          <input
            type="date"
            defaultValue="2025-10-01"
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*সদস্যর নামঃ</label>
          <input
            type="text"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="সদস্যের নাম লিখুন"
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">বর্তমান টাকাঃ</label>
          <input
            type="text"
            value="0.00"
            readOnly
            className="flex-1 border rounded px-2 py-1 text-sm bg-gray-100"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*লোনের পরিমানঃ</label>
          <input
            type="number"
            value={loanAmount}
            onChange={handleLoanAmountChange}
            placeholder="লোনের পরিমান লিখুন"
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*লভ্যাংশঃ</label>
          <input
            type="number"
            value={dividend}
            onChange={(e) => setDividend(e.target.value)}
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">মোট লোনঃ</label>
          <input
            type="text"
            value={totalLoan}
            readOnly
            className="flex-1 border rounded px-2 py-1 text-sm bg-gray-100"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*কিস্তির ধরণঃ</label>
          <select
            value={installmentType}
            onChange={(e) => setInstallmentType(e.target.value)}
            className="flex-1 border rounded px-2 py-1 text-sm"
          >
            <option value="">-- বাছাই করুন --</option>
            <option value="সাপ্তাহিক">সাপ্তাহিক</option>
            <option value="মাসিক">মাসিক</option>
          </select>
        </div>

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

        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">*কিস্তির টাকাঃ</label>
          <input
            type="number"
            value={installmentAmount}
            onChange={(e) => setInstallmentAmount(e.target.value)}
            placeholder="টাকার পরিমান লিখুন"
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex items-start gap-4">
          <label className="w-40 font-medium mt-1">বর্ণনাঃ</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="বর্ণনা লিখুন"
            className="flex-1 border rounded px-2 py-1 text-sm"
          ></textarea>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sendSMS}
            onChange={(e) => setSendSMS(e.target.checked)}
          />
          <label>SMS পাঠাতে চান?</label>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">ব্যালেন্সঃ</label>
          <input
            type="text"
            value="0"
            readOnly
            className="flex-1 border rounded px-2 py-1 text-sm bg-gray-100"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
          >
            লোন প্রদান করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanForm;
