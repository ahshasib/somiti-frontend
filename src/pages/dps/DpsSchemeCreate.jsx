import React, { useState, useEffect } from "react";
import axios from "axios";

const DpsSchemeCreate = () => {
  const [form, setForm] = useState({
    schemeName: "",
    durationMonths: "12",
    monthlyAmount: "50",
    dpsType: "লাভ বিহীন",
    interestRate: 0,
    targetAmount: 0,
    status: "active",
  });

  // DPS হিসাব করা
  useEffect(() => {
    let interestRate = form.dpsType === "লাভ" ? Number(form.interestRate) : 0;

    let baseAmount = form.durationMonths * form.monthlyAmount;
    let total = baseAmount;

    // লাভ থাকলে সুদ যোগ হবে
    if (form.dpsType === "লাভ" && interestRate > 0) {
      total += (baseAmount * interestRate) / 100;
    }

    const durationText =
      form.durationMonths >= 12
        ? `${form.durationMonths / 12} বছর`
        : `${form.durationMonths} মাস`;

    const schemeName = `${durationText} স্কিম - মাসিক ${form.monthlyAmount} টাকা - ${form.dpsType} - ${interestRate}% লাভ`;

    setForm((prev) => ({
      ...prev,
      interestRate,
      targetAmount: Math.round(total),
      schemeName,
    }));
  }, [form.durationMonths, form.monthlyAmount, form.dpsType, form.interestRate]);

  // ইনপুট পরিবর্তন হ্যান্ডেল করা
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ফর্ম সাবমিট
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/dps-schemes`,
        form
      );
      alert("✅ DPS স্কিম সফলভাবে তৈরি হয়েছে!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ স্কিম তৈরিতে সমস্যা হয়েছে!");
    }
  };

  // মাসিক কিস্তির অপশন ৫০ থেকে ১৪০০ পর্যন্ত
  const monthlyOptions = [];
  for (let i = 50; i <= 1400; i += 50) {
    monthlyOptions.push(i);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-50 to-indigo-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">DPS স্কিম তৈরী করুন</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* সময়কাল */}
          <div>
            <label className="block mb-1 font-medium">DPS সময়কাল (মাস)</label>
            <select
              name="durationMonths"
              value={form.durationMonths}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
              required
            >
              {[6, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120].map((m) => (
                <option key={m} value={m}>
                  {m >= 12 ? `${m / 12} বছর` : `${m} মাস`}
                </option>
              ))}
            </select>
          </div>

          {/* মাসিক কিস্তি */}
          <div>
            <label className="block mb-1 font-medium">মাসিক কিস্তির টাকাঃ</label>
            <select
              name="monthlyAmount"
              value={form.monthlyAmount}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
              required
            >
              {monthlyOptions.map((amt) => (
                <option key={amt} value={amt}>
                  {amt} টাকা
                </option>
              ))}
            </select>
          </div>

          {/* টাইপ */}
          <div>
            <label className="block mb-1 font-medium">DPS টাইপ</label>
            <select
              name="dpsType"
              value={form.dpsType}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
              required
            >
              <option value="লাভ বিহীন">লাভ বিহীন</option>
              <option value="লাভ">লাভ</option>
            </select>
          </div>

          {/* লভ্যাংশ */}
          <div>
            <label className="block mb-1 font-medium">লভ্যাংশ (%)</label>
            <input
              type="number"
              name="interestRate"
              value={form.interestRate}
              onChange={handleChange}
              disabled={form.dpsType === "লাভ বিহীন"}
              className={`w-full border px-3 py-2 rounded-lg ${
                form.dpsType === "লাভ বিহীন" ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="যেমন: 8"
            />
          </div>

          {/* টার্গেট টাকাঃ */}
          <div>
            <label className="block mb-1 font-medium">টার্গেট টাকাঃ</label>
            <input
              type="number"
              name="targetAmount"
              value={form.targetAmount}
              className="w-full border px-3 py-2 rounded-lg bg-gray-100"
              readOnly
            />
          </div>

          {/* স্কীমের নাম */}
          <div>
            <label className="block mb-1 font-medium">DPS স্কীমের নামঃ</label>
            <input
              type="text"
              name="schemeName"
              value={form.schemeName}
              className="w-full border px-3 py-2 rounded-lg bg-gray-100"
              readOnly
            />
          </div>

          {/* অবস্থা */}
          <div>
            <label className="block mb-1 font-medium">অবস্থাঃ</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="active">সক্রিয়</option>
              <option value="inactive">নিষ্ক্রিয়</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-semibold mt-4"
          >
            স্কিম তৈরি করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default DpsSchemeCreate;
