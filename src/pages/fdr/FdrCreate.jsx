import React, { useState } from "react";
import axios from "axios";
//FDR স্কিম তৈরি করুন page
const FdrCreate = () => {
  const [schemeName, setSchemeName] = useState("");
  const [schemeType, setSchemeType] = useState("Fixed লাভ");
  const [duration, setDuration] = useState(1);
  const [interestValue, setInterestValue] = useState(0);
  const [interestType, setInterestType] = useState("%");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/fdr-schemes`, {
        schemeName,
        schemeType,
        duration,
        interestValue,
        interestType,
        startDate,
        status,
      });
      alert(res.data.message);
      // Reset form
      setSchemeName("");
      setSchemeType("Fixed লাভ");
      setDuration(1);
      setInterestValue(0);
      setInterestType("%");
      setStartDate(new Date().toISOString().slice(0, 10));
      setStatus("active");
    } catch (err) {
      console.error(err);
      alert("FDR স্কিম তৈরি করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-start justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">FDR স্কিম তৈরি করুন</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">তারিখঃ</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Scheme Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">স্কিমের ধরনঃ</label>
            <select
              value={schemeType}
              onChange={(e) => setSchemeType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="Fixed লাভ">Fixed লাভ</option>
              <option value="মাসিক Fixed লাভ">মাসিক Fixed লাভ</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">সময়কাল (মাস/বছর)</label>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Interest Value */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">লভ্যাংশঃ</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                step="0.01"
                value={interestValue}
                onChange={(e) => setInterestValue(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <select
                value={interestType}
                onChange={(e) => setInterestType(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="%">%</option>
                <option value="৳">৳</option>
              </select>
            </div>
          </div>

          {/* Scheme Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">স্কিমের নামঃ</label>
            <input
              type="text"
              value={schemeName}
              onChange={(e) => setSchemeName(e.target.value)}
              placeholder="যেমন: ১ বছর স্কিম - মাসিক 1000 টাকা"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">অবস্থা</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="active">সক্রিয়</option>
              <option value="inactive">বন্ধ</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {loading ? "লোড হচ্ছে..." : "স্কিম তৈরি করুন"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FdrCreate;
