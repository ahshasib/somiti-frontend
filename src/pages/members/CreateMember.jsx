import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

const CreateMember = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
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
    memberFile: null,
    nomineeFile: null,
    nidFrontFile: null,
    nidBackFile: null,
    nomineeNidFrontFile: null,
    nomineeNidBackFile: null,
  });

  const [fileNames, setFileNames] = useState({
    memberFile: "",
    nomineeFile: "",
    nidFrontFile: "",
    nidBackFile: "",
    nomineeNidFrontFile: "",
    nomineeNidBackFile: "",
  });

  // ================= Auto-generate Member ID =================
  useEffect(() => {
    const generateMemberId = async () => {
      try {
        // Backend API call to get last member ID
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/members/last`);
        const lastId = res.data?.lastMemberId || "0000"; // যদি কোনো member না থাকে
        const newIdNumber = String(parseInt(lastId) + 1).padStart(4, "0");
        setFormData((prev) => ({ ...prev, memberId: newIdNumber }));
      } catch (err) {
        console.error("Member ID generate error:", err);
        setFormData((prev) => ({ ...prev, memberId: "0001" }));
      }
    };
    generateMemberId();
  }, []);
  // ============================================================

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
      setFileNames({ ...fileNames, [name]: files[0]?.name || "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const memberImage = await uploadImage(formData.memberFile);
      const nomineeImage = await uploadImage(formData.nomineeFile);
      const nidFront = await uploadImage(formData.nidFrontFile);
      const nidBack = await uploadImage(formData.nidBackFile);
      const nomineeNidFront = await uploadImage(formData.nomineeNidFrontFile);
      const nomineeNidBack = await uploadImage(formData.nomineeNidBackFile);

      const dataToSend = {
        ...formData,
        memberImage,
        nomineeImage,
        nidFront,
        nidBack,
        nomineeNidFront,
        nomineeNidBack,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/members`,
        dataToSend
      );

      if (res.data?.member) {
        setMessage("✅ সদস্য সফলভাবে তৈরি হয়েছে!");
        setFormData({
          ...formData,
          memberFile: null,
          nomineeFile: null,
          nidFrontFile: null,
          nidBackFile: null,
          nomineeNidFrontFile: null,
          nomineeNidBackFile: null,
        });
        setFileNames({
          memberFile: "",
          nomineeFile: "",
          nidFrontFile: "",
          nidBackFile: "",
          nomineeNidFrontFile: "",
          nomineeNidBackFile: "",
        });
        // নতুন member ID generate করা
        const newIdNumber = String(parseInt(formData.memberId) + 1).padStart(4, "0");
        setFormData((prev) => ({ ...prev, memberId: newIdNumber }));
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

  // ===== Image fields =====
  const imageFields = [
    { label: "সদস্য ছবি", name: "memberFile" },
    { label: "নোমিনির ছবি", name: "nomineeFile" },
    { label: "সদস্য NID সামনের অংশ", name: "nidFrontFile" },
    { label: "সদস্য NID পিছনের অংশ", name: "nidBackFile" },
    { label: "নোমিনীর NID সামনের অংশ", name: "nomineeNidFrontFile" },
    { label: "নোমিনীর NID পিছনের অংশ", name: "nomineeNidBackFile" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        সদস্য তৈরী করুন
      </h2>

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[ 
            { label: "সদস্যর নাম", name: "name", type: "text" },
            { label: "মোবাইল নম্বর", name: "mobileNumber", type: "text" },
            { label: "সদস্য ID", name: "memberId", type: "text", readOnly: true },
            { label: "ঠিকানা", name: "address", type: "text" },
            { label: "NID নম্বর", name: "nidNumber", type: "text" },
            { label: "পিতা/স্বামী নাম", name: "fatherOrHusband", type: "text" },
            { label: "জামানতকারীর তথ্য", name: "guarantor", type: "text" },
            { label: "নোমিনীর নাম", name: "nomineeName", type: "text" },
            { label: "নোমিনীর মোবাইল", name: "nomineeMobile", type: "text" },
            { label: "নোমিনীর সম্পর্ক", name: "nomineeRelation", type: "text" },
            { label: "পাসওয়ার্ড", name: "password", type: "password" },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <label className="md:w-40 font-medium text-gray-700">{field.label}:</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                required={["name", "mobileNumber", "nidNumber"].includes(field.name)}
                readOnly={field.readOnly || false}
                className="flex-1 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full bg-gray-100"
              />
            </div>
          ))}
        </div>

        {/* Image Upload */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {imageFields.map((img, idx) => (
            <label
              key={idx}
              className="flex flex-col items-center justify-center border border-gray-300 rounded-lg h-32 w-32 cursor-pointer hover:bg-gray-50 transition relative"
            >
              <FaCamera className="text-gray-400 text-2xl mb-1" />
              <span className="text-sm text-gray-500 text-center">
                {fileNames[img.name] || img.label}
              </span>
              <input type="file" name={img.name} onChange={handleChange} className="hidden" />
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 w-full font-semibold"
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateMember;
