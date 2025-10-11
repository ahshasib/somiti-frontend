import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const DpsCollectionPage = () => {
  const [members, setMembers] = useState([]);
  const [settings, setSettings] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    memberId: "",
    schemeId: "",
    collectedAmount: 0,
    description: "",
    smsSent: false,
    balance: 854, // agent balance
    interestRate: 0,
    targetAmount: 0,
  });

  // Fetch members
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

  // Search filter
  useEffect(() => {
    const results = members.filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.mobileNumber.includes(search)
    );
    setFilteredMembers(results);
  }, [search, members]);

  // Fetch member's active DPS settings
  useEffect(() => {
    const fetchSettings = async () => {
      if (!form.memberId) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/member-dps-settings/${form.memberId}`
        );
        setSettings(res.data);
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    };
    fetchSettings();
  }, [form.memberId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Auto-fill when scheme selected
  useEffect(() => {
    const selectedSetting = settings.find((s) => s._id === form.schemeId);
    if (selectedSetting) {
      setForm((prev) => ({
        ...prev,
        collectedAmount: selectedSetting.monthlyAmount || 0,
        interestRate: selectedSetting.interestRate || 0,
        targetAmount: selectedSetting.targetAmount || 0,
      }));
    }
  }, [form.schemeId, settings]);

  const handleMemberSelect = (member) => {
    setForm((prev) => ({ ...prev, memberId: member.memberId }));
    setSearch(member.name);
    setFilteredMembers([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.memberId || !form.schemeId) return;

    const selectedSetting = settings.find((s) => s._id === form.schemeId);
    if (!selectedSetting) {
      alert("Selected DPS setting not found");
      return;
    }

    const payload = {
      date: form.date,
      memberId: form.memberId,
      schemeId: selectedSetting.schemeId._id,
      collectedAmount: form.collectedAmount,
      description: form.description,
      smsSent: form.smsSent,
      balance: form.balance,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/dps-allcollections`,
        payload
      );
      Swal.fire({
        title: "✅ DPS কালেকশন সফলভাবে সম্পন্ন হয়েছে!",
        icon: "success",
        draggable: true
      });
      
    //   console.log(res.data);

      setForm({
        date: new Date().toISOString().split("T")[0],
        memberId: "",
        schemeId: "",
        collectedAmount: 0,
        description: "",
        smsSent: false,
        
        interestRate: 0,
        targetAmount: 0,
      });
      setSearch("");
      setSettings([]);
    } catch (err) {
    //   console.error(err);
      Swal.fire({
        icon: "error",
        title: "❌ Error in DPS collection",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          💰 DPS কালেকশন ফর্ম
        </h2>

        {/* 🔍 Search Bar */}
        <div className="mb-6 relative">
          <label className="block mb-2 text-gray-700 font-medium">
            সদস্য খুঁজুন
          </label>
          <input
            type="text"
            placeholder="নাম বা মোবাইল নম্বর লিখুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-indigo-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
          />
          {search && filteredMembers.length > 0 && (
            <ul className="absolute bg-white border border-gray-200 rounded-lg mt-1 w-full max-h-48 overflow-y-auto shadow-md z-10">
              {filteredMembers.map((member) => (
                <li
                  key={member._id}
                  onClick={() => handleMemberSelect(member)}
                  className="px-3 py-2 cursor-pointer hover:bg-indigo-100"
                >
                  <span className="font-semibold text-gray-800">
                    {member.name}
                  </span>{" "}
                  — <span className="text-sm text-gray-600">{member.mobileNumber}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🧾 Form */}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* তারিখ */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">তারিখ</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg shadow-sm"
            />
          </div>

          {/* সদস্য নির্বাচন */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              সদস্যের নাম
            </label>
            <select
              name="memberId"
              value={form.memberId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg shadow-sm"
              required
            >
              <option value="">সদস্য নির্বাচন করুন</option>
              {members.map((m) => (
                <option key={m._id} value={m.memberId}>
                  {m.name} ({m.memberId})
                </option>
              ))}
            </select>
          </div>

          {/* DPS স্কীম নাম */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              DPS স্কীম নাম
            </label>
            <select
              name="schemeId"
              value={form.schemeId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg shadow-sm"
              required
            >
              <option value="">স্কীম নির্বাচন করুন</option>
              {settings.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.schemeId.schemeName}
                </option>
              ))}
            </select>
          </div>

          {/* বর্তমান টাকা */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              বর্তমান টাকা
            </label>
            <input
              type="number"
              value={form.collectedAmount}
              readOnly
              className="w-full border px-3 py-2 rounded-lg bg-gray-100 shadow-sm"
            />
          </div>

          {/* DPS গ্রহনের পরিমান */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              DPS গ্রহনের পরিমান
            </label>
            <input
              type="number"
              name="collectedAmount"
              value={form.collectedAmount}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg shadow-sm"
            />
          </div>

          {/* ব্যালেন্স */}
          {/* <div>
            <label className="block mb-1 font-medium text-gray-700">ব্যালেন্স</label>
            <input
              type="number"
              value={form.balance}
              readOnly
              className="w-full border px-3 py-2 rounded-lg bg-gray-100 shadow-sm"
            />
          </div> */}

          {/* বর্ণনা */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">বর্ণনা</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg shadow-sm"
            ></textarea>
          </div>

          {/* SMS পাঠাবেন */}
          <div className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              name="smsSent"
              checked={form.smsSent}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600"
            />
            <label className="text-gray-700 font-medium">SMS পাঠাতে চান?</label>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold mt-4 transition-all shadow-md"
            >
              🚀 কালেকশন করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DpsCollectionPage;
