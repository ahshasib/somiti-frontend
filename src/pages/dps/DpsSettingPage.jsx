import React, { useEffect, useState } from "react";
import axios from "axios";
//DPS স্কিম সেটিং করুন
const DpsSettingPage = () => {
  const [members, setMembers] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    startDate: "",
    memberId: "",
    schemeId: "",
    durationMonths: "",
    monthlyAmount: "",
    interestRate: 0,
    targetAmount: 0,
    description: "",
    status: "active",
  });

  // Fetch members and schemes
  useEffect(() => {
    const fetchData = async () => {
      const membersRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/members`);
      const schemesRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/dps-schemes`);
      setMembers(membersRes.data);
      setSchemes(schemesRes.data);
    };
    fetchData();
  }, []);

  // Auto-fill DPS scheme details when scheme is selected
  useEffect(() => {
    const scheme = schemes.find((s) => s._id === form.schemeId);
    if (scheme) {
      setForm((prev) => ({
        ...prev,
        durationMonths: scheme.durationMonths,
        monthlyAmount: scheme.monthlyAmount,
        interestRate: scheme.interestRate,
        targetAmount: scheme.targetAmount,
      }));
    }
  }, [form.schemeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/dps-settings`, form);
      alert("DPS সেটিং সফলভাবে তৈরি হয়েছে!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error creating DPS setting");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-50 to-indigo-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">DPS স্কিম সেটিং করুন</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* তারিখ */}
          <div>
            <label className="block mb-1 font-medium">তারিখ</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>

          {/* কিস্তি শুরুর তারিখ */}
          <div>
            <label className="block mb-1 font-medium">কিস্তি শুরুর তারিখ</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>

          {/* সদস্য নির্বাচন */}
          <div>
            <label className="block mb-1 font-medium">সদস্যর নামঃ</label>
            <select
              name="memberId"
              value={form.memberId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
              required
            >
              <option value="">সদস্য নির্বাচন করুন</option>
              {members.map((m) => (
                <option key={m._id} value={m.memberId}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* DPS স্কিম নির্বাচন */}
          <div>
            <label className="block mb-1 font-medium">DPS স্কীমের নাম</label>
            <select
              name="schemeId"
              value={form.schemeId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
              required
            >
              <option value="">একটি নির্বাচন করুন</option>
              {schemes.map((s) => (
                <option key={s._id} value={s._id}>{s.schemeName}</option>
              ))}
            </select>
          </div>

          {/* Duration, monthlyAmount, interestRate, targetAmount auto-filled */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">DPS সময়কাল</label>
              <input type="text" value={form.durationMonths} readOnly className="w-full border px-3 py-2 rounded-lg bg-gray-100" />
            </div>
            <div>
              <label className="block mb-1 font-medium">মাসিক কিস্তির টাকা</label>
              <input type="text" value={form.monthlyAmount} readOnly className="w-full border px-3 py-2 rounded-lg bg-gray-100" />
            </div>
            <div>
              <label className="block mb-1 font-medium">লভ্যাংশ (%)</label>
              <input type="text" value={form.interestRate} readOnly className="w-full border px-3 py-2 rounded-lg bg-gray-100" />
            </div>
            <div>
              <label className="block mb-1 font-medium">টার্গেট টাকা</label>
              <input type="text" value={form.targetAmount} readOnly className="w-full border px-3 py-2 rounded-lg bg-gray-100" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">বর্ণনাঃ</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 font-medium">অবস্থাঃ</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg">
              <option value="active">সক্রিয়</option>
              <option value="inactive">নিষ্ক্রিয়</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-semibold mt-4">
            সেটিং সংরক্ষণ করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default DpsSettingPage;
