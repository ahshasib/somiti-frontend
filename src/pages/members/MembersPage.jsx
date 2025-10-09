import React, { useEffect, useState } from "react";
import axios from "axios";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/members`);
        setMembers(res.data);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };
    fetchMembers();
  }, []);

  const handleView = (member) => {
    setSelectedMember(member);
    setEditData(member);
    setIsEditing(false);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setEditData({
      _id: member._id,
      name: member.name,
      mobileNumber: member.mobileNumber,
      nomineeName: member.nomineeName,
      nomineeMobile: member.nomineeMobile,
    });
    setIsEditing(true);
  };

  const handleClose = () => {
    setSelectedMember(null);
    setIsEditing(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/members/${editData._id}`,
        editData
      );

      setMembers((prev) =>
        prev.map((m) => (m._id === editData._id ? res.data : m))
      );

      setIsEditing(false);
      setSelectedMember(null);
      alert("✅ সদস্য তথ্য সফলভাবে আপডেট হয়েছে!");
    } catch (err) {
      console.error("Error updating member:", err);
      alert("❌ সদস্য তথ্য আপডেট করতে ব্যর্থ হয়েছে!");
    }
  };

  return (
    <div className="p-6 max-w-full  min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        🧾 সকল সদস্যের তথ্য
      </h2>
      <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden shadow-md">
        <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <tr>
            <th className="border px-4 py-2 text-left">তারিখ</th>
            <th className="border px-4 py-2 text-left">সদস্যর তথ্য</th>
            <th className="border px-4 py-2">সদস্য নাম্বার</th>
            <th className="border px-4 py-2">ছবি</th>
            <th className="border px-4 py-2 text-left">নোমিনীর তথ্য</th>
            <th className="border px-4 py-2">নোমিনীর ছবি</th>
            <th className="border px-4 py-2">এনআইডি নাম্বার</th>
            <th className="border px-4 py-2">এনআইডি ছবি</th>
            <th className="border px-4 py-2">পরিবর্তন</th>
            <th className="border px-4 py-2">বিস্তারিত</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {members.map((member, index) => (
            <tr
              key={member._id}
              className={`hover:bg-indigo-50 transition ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="border px-3 py-2 text-gray-700 text-sm">
                {new Date(member.createdAt).toLocaleDateString("bn-BD")}
              </td>
              <td className="border px-3 py-2 text-gray-700 text-sm">
                <strong>নাম:</strong> {member.name} <br />
                <strong>মোবাইল:</strong> {member.mobileNumber} <br />
                <strong>ঠিকানা:</strong> {member.address}
              </td>
              <td className="border px-3 py-2 text-center text-gray-700 font-semibold">
                {member.memberId}
              </td>
              <td className="border px-3 py-2 text-center">
                {member.memberImage && (
                  <img
                    src={member.memberImage}
                    alt="Member"
                    className="w-12 h-12 object-cover rounded-full border border-gray-300"
                  />
                )}
              </td>
              <td className="border px-3 py-2 text-gray-700 text-sm">
                <strong>নাম:</strong> {member.nomineeName} <br />
                <strong>মোবাইল:</strong> {member.nomineeMobile} <br />
                <strong>সম্পর্ক:</strong> {member.nomineeRelation}
              </td>
              <td className="border px-3 py-2 text-center">
                {member.nomineeImage && (
                  <img
                    src={member.nomineeImage}
                    alt="Nominee"
                    className="w-12 h-12 object-cover rounded-full border border-gray-300"
                  />
                )}
              </td>
              <td className="border px-3 py-2 text-gray-700 text-center">
                {member.nidNumber}
              </td>
              <td className="border px-3 py-2 text-center">
                {member.nidFront ? (
                  <img
                    src={member.nidFront}
                    alt="nidFront"
                    className="w-14 h-8 object-cover rounded border"
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className="border px-3 py-2 text-center">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-xs shadow"
                  onClick={() => handleEdit(member)}
                >
                  ✏️ সম্পাদনা
                </button>
              </td>
              <td className="border px-3 py-2 text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs shadow"
                  onClick={() => handleView(member)}
                >
                  🔍 বিস্তারিত
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-[500px] p-6 max-h-[90vh] overflow-y-auto shadow-xl border border-indigo-200 relative animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-center text-indigo-700 border-b pb-2">
              {isEditing ? "📝 সদস্য তথ্য সম্পাদনা" : "📋 সদস্যের বিস্তারিত তথ্য"}
            </h2>

            {Object.keys(editData).map((key) => {
              if (
                ["memberImage", "nomineeImage", "nidFront", "nidBack", "nomineeNidFront", "nomineeNidBack", "createdAt", "_id", "__v"].includes(key)
              )
                return null;
              return (
                <div key={key} className="mb-3">
                  <label className="font-medium text-gray-700 capitalize">{key}:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name={key}
                      value={editData[key] || ""}
                      onChange={handleEditChange}
                      className="border px-3 py-1 rounded-md w-full mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                  ) : (
                    <p className="ml-2 text-gray-800">{editData[key]}</p>
                  )}
                </div>
              );
            })}

            {/* ছবি সেকশন */}
            <div className="mt-4 space-y-3">
              {editData.memberImage && (
                <>
                  <p className="text-sm text-gray-600">Member Image:</p>
                  <img src={editData.memberImage} alt="Member" className="w-full h-40 object-cover rounded-lg border" />
                </>
              )}
              {editData.nomineeImage && (
                <>
                  <p className="text-sm text-gray-600">Nominee Image:</p>
                  <img src={editData.nomineeImage} alt="Nominee" className="w-full h-40 object-cover rounded-lg border" />
                </>
              )}
              {editData.nidFront && (
                <>
                  <p className="text-sm text-gray-600">NID Front:</p>
                  <img src={editData.nidFront} alt="NID Front" className="w-full h-40 object-cover rounded-lg border" />
                </>
              )}
              {editData.nidBack && (
                <>
                  <p className="text-sm text-gray-600">NID Back:</p>
                  <img src={editData.nidBack} alt="NID Back" className="w-full h-40 object-cover rounded-lg border" />
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-5 flex justify-end gap-3 border-t pt-3">
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md shadow"
                >
                  💾 সংরক্ষণ
                </button>
              )}
              <button
                onClick={handleClose}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md shadow"
              >
                ❌ বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersPage;
