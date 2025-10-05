import React, { useState, useEffect } from "react";
import axios from "axios";
//FDR সেটিং এবং কালেকশন page
const FdrSettingForm = () => {
  const [members, setMembers] = useState([]);
  const [schemes, setSchemes] = useState([]);
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

  // Auto-fill duration and interest when scheme changes
  useEffect(() => {
    const scheme = schemes.find(s => s._id === selectedScheme);
    if (scheme) {
      setDuration(scheme.duration);
      setInterestValue(scheme.interestValue);
      setInterestType(scheme.interestType);
    }
  }, [selectedScheme, schemes]);

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
      alert("FDR সেটিং সফলভাবে যোগ করা হয়েছে!");
      // Reset form
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
      console.error(err);
      alert("FDR সেটিং যোগ করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-start justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">ফিক্সড ডিপোজিট কালেকশন করুন</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Collection Date */}
          <div>
            <label>তারিখঃ</label>
            <input type="date" value={collectionDate} onChange={e => setCollectionDate(e.target.value)} className="w-full border rounded-lg px-3 py-2"/>
          </div>

          {/* Member */}
          <div>
            <label>সদস্যর নামঃ</label>
            <select value={selectedMember} onChange={e => setSelectedMember(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              <option value="">সদস্য নির্বাচন করুন</option>
              {members.map(m => <option key={m._id} value={m.memberId}>{m.name}</option>)}
            </select>
          </div>

          {/* Scheme */}
          <div>
            <label>স্কিমের নামঃ</label>
            <select value={selectedScheme} onChange={e => setSelectedScheme(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              <option value="">স্কিম নির্বাচন করুন</option>
              {schemes.map(s => <option key={s._id} value={s._id}>{s.schemeName}</option>)}
            </select>
          </div>

          {/* Effective Date */}
          <div>
            <label>কার্যকর তারিখঃ</label>
            <input type="date" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} className="w-full border rounded-lg px-3 py-2"/>
          </div>

          {/* Duration */}
          <div>
            <label>সময়কাল (মাস)</label>
            <input type="number" value={duration} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-100"/>
          </div>

          {/* Interest */}
          <div>
            <label>লভ্যাংশঃ</label>
            <div className="flex gap-2">
              <input type="number" value={interestValue} readOnly className="flex-1 border rounded-lg px-3 py-2 bg-gray-100"/>
              <input type="text" value={interestType} readOnly className="border rounded-lg px-3 py-2 bg-gray-100"/>
            </div>
          </div>

          {/* FDR Amount */}
          <div>
            <label>FDR টাকাঃ</label>
            <input type="number" value={fdrAmount} onChange={e => setFdrAmount(e.target.value)} className="w-full border rounded-lg px-3 py-2"/>
          </div>

          {/* Description */}
          <div>
            <label>বর্ণনাঃ</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded-lg px-3 py-2"/>
          </div>

          {/* Status */}
          <div>
            <label>অবস্থা</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              <option value="active">সক্রিয়</option>
              <option value="inactive">বন্ধ</option>
            </select>
          </div>

          {/* SMS */}
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={sendSMS} onChange={e => setSendSMS(e.target.checked)}/>
            <label>SMS পাঠাতে চান?</label>
          </div>

          <button type="submit" disabled={loading} className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            {loading ? "লোড হচ্ছে..." : "সেটিং সংরক্ষণ করুন"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FdrSettingForm;
