import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const FdrSettingForm = () => {
  const [members, setMembers] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [selectedMember, setSelectedMember] = useState("");
  const [selectedScheme, setSelectedScheme] = useState("");
  const [collectionDate, setCollectionDate] = useState(new Date().toISOString().slice(0, 10));
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().slice(0, 10));
  const [fdrAmount, setFdrAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [sendSMS, setSendSMS] = useState(false);
  const [duration, setDuration] = useState(0);
  const [interestValue, setInterestValue] = useState(0);
  const [interestType, setInterestType] = useState("%");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/fdr-options`);
        setMembers(res.data.members);
        setSchemes(res.data.schemes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const scheme = schemes.find((s) => s._id === selectedScheme);
    if (scheme) {
      setDuration(scheme.duration);
      setInterestValue(scheme.interestValue);
      setInterestType(scheme.interestType);
    }
  }, [selectedScheme, schemes]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = members.filter(
        (m) =>
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.mobileNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers([]);
    }
  }, [searchTerm, members]);

  const handleSelectMember = (member) => {
    setSelectedMember(member.memberId);
    setSearchTerm("");
    Swal.fire({
      title: `${member.name} নির্বাচিত হয়েছে`,
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/fdr-settings`, {
        memberId: selectedMember,
        schemeId: selectedScheme,
        collectionDate,
        effectiveDate,
        fdrAmount,
        description,
        status,
        sendSMS,
      });

      Swal.fire({
        title: "🎉 FDR সেটিং সফলভাবে যোগ করা হয়েছে!",
        icon: "success",
        confirmButtonColor: "#4F46E5",
      });

      setSelectedMember("");
      setSelectedScheme("");
      setCollectionDate(new Date().toISOString().slice(0, 10));
      setEffectiveDate(new Date().toISOString().slice(0, 10));
      setFdrAmount(0);
      setDescription("");
      setStatus("active");
      setSendSMS(false);
      setDuration(0);
      setInterestValue(0);
      setInterestType("%");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "❌ সমস্যা হয়েছে!",
        text: "FDR সেটিং যোগ করতে ব্যর্থ হয়েছে!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex justify-center items-start p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          🏦 FDR সেটিং ও কালেকশন ফর্ম
        </h2>

        {/* 🔍 Search Bar */}
        <div className="relative mb-8">
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 shadow-inner">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="সদস্যর নাম বা মোবাইল নাম্বার লিখুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          {searchTerm && (
            <div className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-52 overflow-y-auto z-10">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((m) => (
                  <div
                    key={m._id}
                    onClick={() => handleSelectMember(m)}
                    className="flex items-center justify-between px-4 py-2 hover:bg-indigo-50 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <FaUserCircle className="text-indigo-500 text-xl" />
                      <div>
                        <p className="font-semibold">{m.name}</p>
                        <p className="text-sm text-gray-500">{m.mobileNumber}</p>
                      </div>
                    </div>
                    <span className="text-sm text-indigo-600 font-medium">Select</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-2">কোন সদস্য পাওয়া যায়নি</p>
              )}
            </div>
          )}
        </div>

        {/* 🧾 Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* তারিখ */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">তারিখঃ</label>
            <input
              type="date"
              value={collectionDate}
              onChange={(e) => setCollectionDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* কার্যকর তারিখ */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">কার্যকর তারিখঃ</label>
            <input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* সদস্য */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">সদস্যর নামঃ</label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-200"
            >
              <option value="">সদস্য নির্বাচন করুন</option>
              {members.map((m) => (
                <option key={m._id} value={m.memberId}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* স্কিম */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">স্কিমের নামঃ</label>
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-200"
            >
              <option value="">স্কিম নির্বাচন করুন</option>
              {schemes.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.schemeName}
                </option>
              ))}
            </select>
          </div>

          {/* সময়কাল */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">সময়কাল (মাস)</label>
            <input
              type="number"
              value={duration}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          {/* লভ্যাংশ */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">লভ্যাংশঃ</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={interestValue}
                readOnly
                className="flex-1 border rounded-lg px-3 py-2 bg-gray-100"
              />
              <input
                type="text"
                value={interestType}
                readOnly
                className="w-20 border rounded-lg px-3 py-2 bg-gray-100"
              />
            </div>
          </div>

          {/* FDR Amount */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">FDR টাকাঃ</label>
            <input
              type="number"
              value={fdrAmount}
              onChange={(e) => setFdrAmount(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">বর্ণনাঃ</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">অবস্থা</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-200"
            >
              <option value="active">সক্রিয়</option>
              <option value="inactive">বন্ধ</option>
            </select>
          </div>

          {/* SMS */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={sendSMS}
              onChange={(e) => setSendSMS(e.target.checked)}
              className="h-4 w-4 text-indigo-600"
            />
            <label className="text-gray-700 font-medium">SMS পাঠাতে চান?</label>
          </div>

          {/* Button (Full Width) */}
          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all shadow-md"
            >
              {loading ? "লোড হচ্ছে..." : "💾 সেটিং সংরক্ষণ করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FdrSettingForm;
