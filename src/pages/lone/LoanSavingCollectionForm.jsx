import React, { useState } from "react";
//লোন এবং সঞ্চয় কালেকশন page
const LoanSavingCollectionForm = () => {
  const [date, setDate] = useState("2025-10-01");
  const [area, setArea] = useState("");
  const [memberName, setMemberName] = useState("");
  const [loanList, setLoanList] = useState("");
  const [loanCollection, setLoanCollection] = useState("");
  const [savingCollection, setSavingCollection] = useState("");
  const [description, setDescription] = useState("");
  const [sendSMS, setSendSMS] = useState(false);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-6">লোন এবং সঞ্চয় কিস্তি কালেকশন</h2>

      <form className="space-y-4">
        {/* তারিখ */}
        <div className="flex items-center gap-4">
          <label className="w-44 font-medium">*তারিখঃ</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        {/* এলাকার নাম */}
        <div className="flex items-center gap-4">
          <label className="w-44 font-medium">এলাকার নামঃ</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="এলাকার নাম লিখুন"
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        {/* সদস্যর নাম */}
        <div className="flex items-center gap-4">
          <label className="w-44 font-medium">*সদস্যর নামঃ</label>
          <input
            type="text"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="সদস্যের নাম লিখুন"
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        {/* মোট লোনের বাকি টাকাঃ */}
        <div className="flex items-center gap-4">
          <label className="w-44 font-medium">মোট লোনের বাকি টাকাঃ</label>
          <input
            type="text"
            value="0.00"
            readOnly
            className="flex-1 border rounded px-2 py-1 text-sm bg-gray-100"
          />
        </div>

        {/* লোন লিস্ট */}
        <div className="flex items-center gap-4">
          <label className="w-44 font-medium">*লোন লিস্টঃ</label>
          <select
            value={loanList}
            onChange={(e) => setLoanList(e.target.value)}
            className="flex-1 border rounded px-2 py-1 text-sm"
          >
            <option value="">-- লোন নির্বাচন করুন --</option>
            <option value="loan1">লোন ১</option>
            <option value="loan2">লোন ২</option>
          </select>
        </div>

        {/* লোন কালেকশন */}
        <div className="flex items-center gap-4">
          <label className="w-44 font-medium">*লোন কালেকশনঃ</label>
          <input
            type="number"
            value={loanCollection}
            onChange={(e) => setLoanCollection(e.target.value)}
            placeholder="লোন কালেকশনের পরিমান লিখুন"
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        {/* মোট সঞ্চয় */}
        <div className="flex items-center gap-4">
          <label className="w-44 font-medium">মোট সঞ্চয়ঃ</label>
          <input
            type="text"
            value="0.00"
            readOnly
            className="flex-1 border rounded px-2 py-1 text-sm bg-gray-100"
          />
        </div>

        {/* সঞ্চয় কালেকশন */}
        <div className="flex items-center gap-4">
          <label className="w-44 font-medium">*সঞ্চয় কালেকশনঃ</label>
          <input
            type="number"
            value={savingCollection}
            onChange={(e) => setSavingCollection(e.target.value)}
            placeholder="সঞ্চয় কালেকশনের পরিমান লিখুন"
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
        </div>

        {/* বর্ণনা */}
        <div className="flex items-start gap-4">
          <label className="w-44 font-medium mt-1">বর্ণনাঃ</label>
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

        {/* ব্যালেন্স */}
        <div className="flex items-center gap-4">
          <label className="w-44 font-medium">ব্যালেন্সঃ</label>
          <input
            type="text"
            value="0"
            readOnly
            className="flex-1 border rounded px-2 py-1 text-sm bg-gray-100"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
          >
            কালেকশন জমা দিন
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanSavingCollectionForm;
