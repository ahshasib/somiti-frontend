import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const DpsSettingPage = () => {
  const [members, setMembers] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

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
      setFilteredMembers(membersRes.data);
    };
    fetchData();
  }, []);

  // Filter members by search
  useEffect(() => {
    const results = members.filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.mobileNumber.includes(search)
    );
    setFilteredMembers(results);
  }, [search, members]);

  // Auto-fill scheme details
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

  const handleMemberSelect = (member) => {
    setForm((prev) => ({ ...prev, memberId: member.memberId }));
    setSearch(member.name);
    setFilteredMembers([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/dps-settings`, form);
      Swal.fire({
        title: "✅ DPS সেটিং সফলভাবে তৈরি হয়েছে!",
        icon: "success",
        draggable: true
      });
      
      setForm({
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
      setSearch("");
    } catch (err) {
      console.error(err);
      alert("❌ Error creating DPS setting");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 ">
      <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-indigo-100">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
          🏦 DPS স্কিম সেটিং করুন
        </h2>

        {/* 🔍 Member Search */}
        <div className="mb-8 relative">
          <label className="block mb-2 font-semibold text-gray-700">🔎 সদস্য খুঁজুন</label>
          <input
            type="text"
            placeholder="নাম বা মোবাইল নম্বর লিখুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-4 py-3 rounded-xl shadow-sm outline-none transition-all"
          />
          {search && filteredMembers.length > 0 && (
            <ul className="absolute bg-white border border-gray-200 rounded-xl mt-2 w-full max-h-56 overflow-y-auto shadow-lg z-20">
              {filteredMembers.map((member) => (
                <li
                  key={member._id}
                  onClick={() => handleMemberSelect(member)}
                  className="px-4 py-2 cursor-pointer hover:bg-indigo-100 transition-all"
                >
                  <span className="font-medium text-gray-800">{member.name}</span> —{" "}
                  <span className="text-sm text-gray-500">{member.mobileNumber}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🧾 Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Date & Start Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">তারিখ</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">কিস্তি শুরুর তারিখ</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none transition"
                required
              />
            </div>
          </div>

          {/* Member Selection */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">সদস্যর নামঃ</label>
            <select
              name="memberId"
              value={form.memberId}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none transition"
              required
            >
              <option value="">সদস্য নির্বাচন করুন</option>
              {members.map((m) => (
                <option key={m._id} value={m.memberId}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* DPS Scheme */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">DPS স্কীমের নাম</label>
            <select
              name="schemeId"
              value={form.schemeId}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none transition"
              required
            >
              <option value="">একটি নির্বাচন করুন</option>
              {schemes.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.schemeName}
                </option>
              ))}
            </select>
          </div>

          {/* Auto-filled fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">সময়কাল (মাস)</label>
              <input
                type="text"
                value={form.durationMonths}
                readOnly
                className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">মাসিক কিস্তি</label>
              <input
                type="text"
                value={form.monthlyAmount}
                readOnly
                className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">লভ্যাংশ (%)</label>
              <input
                type="text"
                value={form.interestRate}
                readOnly
                className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">টার্গেট টাকা</label>
              <input
                type="text"
                value={form.targetAmount}
                readOnly
                className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">বর্ণনাঃ</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border-2 border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none transition"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">অবস্থাঃ</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none transition"
            >
              <option value="active">সক্রিয়</option>
              <option value="inactive">নিষ্ক্রিয়</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold mt-6 shadow-md transition-all"
          >
            💾 সেটিং সংরক্ষণ করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default DpsSettingPage;
