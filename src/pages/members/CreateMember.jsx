import React, { useState } from "react";
import axios from "axios";

const CreateMember = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // =======================
  // Initial form state
  // =======================
  const initialState = {
    date: new Date().toISOString().split("T")[0],
    name: "",
    mobileNumber: "",
    memberId: "",
    address: "",
    nidNumber: "",
    fatherOrHusband: "",
    guarantor: "",
    nomineeName: "",
    nomineeMobile: "",
    nomineeRelation: "",
    password: "",
    status: "active",

    // Image files
    memberFile: null,
    nomineeFile: null,
    nidFrontFile: null,
    nidBackFile: null,
  };

  const [formData, setFormData] = useState(initialState);

  // =======================
  // Handle input change
  // =======================
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // =======================
  // Upload image to imgbb
  // =======================
  const uploadImage = async (file) => {
    if (!file) return "";
    const form = new FormData();
    form.append("image", file);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      form
    );
    return res.data.data.url;
  };

  // =======================
  // Handle form submit
  // =======================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Upload images
      const memberImage = await uploadImage(formData.memberFile);
      const nomineeImage = await uploadImage(formData.nomineeFile);
      const nidFront = await uploadImage(formData.nidFrontFile);
      const nidBack = await uploadImage(formData.nidBackFile);

      // Prepare data to send
      const dataToSend = {
        date: formData.date,
        name: formData.name,
        mobileNumber: formData.mobileNumber,
        memberId: formData.memberId,
        address: formData.address,
        nidNumber: formData.nidNumber,
        fatherOrHusband: formData.fatherOrHusband,
        guarantor: formData.guarantor,
        nomineeName: formData.nomineeName,
        nomineeMobile: formData.nomineeMobile,
        nomineeRelation: formData.nomineeRelation,
        password: formData.password,
        status: formData.status,
        memberImage,
        nomineeImage,
        nidFront,
        nidBack,
      };

      // Send to server
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/members`,
        dataToSend
      );

      if (res.data?.member) {
        setMessage("✅ সদস্য সফলভাবে তৈরি হয়েছে!");
        setFormData(initialState);
      } else {
        setMessage("⚠️ কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ সার্ভার এর সাথে কানেক্ট করা যায়নি!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">সদস্য তৈরী করুন</h2>

      {message && (
        <div
          className={`p-3 mb-4 rounded ${
            message.includes("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* অন্যান্য ফিল্ড */}
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="সদস্যর নাম" required className="border px-3 py-2 rounded w-full" />
        <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="মোবাইল নম্বর" required className="border px-3 py-2 rounded w-full" />
        <input type="text" name="memberId" value={formData.memberId} onChange={handleChange} placeholder="সদস্য ID" className="border px-3 py-2 rounded w-full" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="ঠিকানা" className="border px-3 py-2 rounded w-full" />
        <input type="text" name="nidNumber" value={formData.nidNumber} onChange={handleChange} placeholder="NID নম্বর" required className="border px-3 py-2 rounded w-full" />
        <input type="text" name="fatherOrHusband" value={formData.fatherOrHusband} onChange={handleChange} placeholder="পিতা/স্বামী নাম" className="border px-3 py-2 rounded w-full" />
        <input type="text" name="guarantor" value={formData.guarantor} onChange={handleChange} placeholder="জামানতকারীর তথ্য" className="border px-3 py-2 rounded w-full" />
        <input type="text" name="nomineeName" value={formData.nomineeName} onChange={handleChange} placeholder="নোমিনীর নাম" className="border px-3 py-2 rounded w-full" />
        <input type="text" name="nomineeMobile" value={formData.nomineeMobile} onChange={handleChange} placeholder="নোমিনীর মোবাইল" className="border px-3 py-2 rounded w-full" />
        <input type="text" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} placeholder="নোমিনীর সম্পর্ক" className="border px-3 py-2 rounded w-full" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="পাসওয়ার্ড" className="border px-3 py-2 rounded w-full" />

        {/* Image fields */}
        <div>
          <label>সদস্য ছবি</label>
          <input type="file" name="memberFile" onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label>নোমিনির ছবি</label>
          <input type="file" name="nomineeFile" onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label>NID সামনের অংশ</label>
          <input type="file" name="nidFrontFile" onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label>NID পিছনের অংশ</label>
          <input type="file" name="nidBackFile" onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>

        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateMember;
