import React, { useEffect, useState } from "react";
import axios from "axios";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/members`);
        setMembers(res.data);
      } catch (err) {
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">সদস্যের তালিকা</h2>

      {loading ? (
        <p>Loading...</p>
      ) : members.length === 0 ? (
        <p className="text-gray-600">কোনো সদস্য পাওয়া যায়নি।</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">সিরিয়াল</th>
              <th className="border px-3 py-2">সদস্য নাম্বার</th>
              <th className="border px-3 py-2">সদস্যর তথ্য</th>
              <th className="border px-3 py-2">পিতা/স্বামী</th>
              <th className="border px-3 py-2">ভর্তির তারিখ</th>
              <th className="border px-3 py-2">অবস্থা</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <td className="border px-3 py-2 text-center">{index + 1}</td>
                <td className="border px-3 py-2">{member.memberId}</td>
                <td className="border px-3 py-2">{member.name}</td>
                <td className="border px-3 py-2">{member.fatherOrHusband}</td>
                <td className="border px-3 py-2">
                  {new Date(member.createdAt).toLocaleDateString("bn-BD")}
                </td>
                <td className="border px-3 py-2">{member.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MemberList;
