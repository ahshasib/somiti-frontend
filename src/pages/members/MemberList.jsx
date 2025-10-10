import React, { useEffect, useState } from "react";
import axios from "axios";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/members`);
        setMembers(res.data);
        setFilteredMembers(res.data);
      } catch (err) {
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // সার্চ ফাংশন
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = members.filter(
      (member) =>
        member.name?.toLowerCase().includes(query) ||
        member.memberId?.toLowerCase().includes(query)
    );
    setFilteredMembers(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto p-2 mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        🧾 সদস্যের তালিকা
      </h2>

      {/* Search Section */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="নাম বা সদস্য নাম্বার লিখুন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-indigo-300 rounded-l-md px-4 py-2 w-1/2 focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md shadow-md transition"
        >
          🔍 অনুসন্ধান
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">লোড হচ্ছে...</p>
      ) : filteredMembers.length === 0 ? (
        <p className="text-center text-gray-600">কোনো সদস্য পাওয়া যায়নি।</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">সিরিয়াল</th>
                <th className="px-4 py-3 text-left">সদস্য নাম্বার</th>
                <th className="px-4 py-3 text-left">সদস্যর নাম</th>
                <th className="px-4 py-3 text-left">পিতা/স্বামী</th>
                <th className="px-4 py-3 text-left">ভর্তির তারিখ</th>
                <th className="px-4 py-3 text-left">অবস্থা</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr
                  key={member._id}
                  className={`hover:bg-indigo-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="border px-4 py-2 text-center font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="border px-4 py-2 font-semibold text-indigo-600">
                    {member.memberId}
                  </td>
                  <td className="border px-4 py-2 text-gray-800">{member.name}</td>
                  <td className="border px-4 py-2 text-gray-700">
                    {member.fatherOrHusband || "-"}
                  </td>
                  <td className="border px-4 py-2 text-gray-600">
                    {new Date(member.createdAt).toLocaleDateString("bn-BD")}
                  </td>
                  <td
                    className={`border px-4 py-2 text-center font-semibold ${
                      member.status === "active"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {member.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemberList;
