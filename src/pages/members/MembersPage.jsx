import React, { useEffect, useState } from "react";
import axios from "axios";

const MembersPage = () => {
  const [members, setMembers] = useState([]);

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

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">সকল সদস্যর তথ্য</h2>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">তারিখ</th>
            <th className="border px-2 py-1">সদস্যর তথ্য</th>
            <th className="border px-2 py-1">সদস্য নাম্বার</th>
            <th className="border px-2 py-1">সদস্য</th>
            <th className="border px-2 py-1">নোমিনীর তথ্য</th>
            <th className="border px-2 py-1">নোমিনী</th>
            {/* <th className="border px-2 py-1">সাক্ষর</th> */}
            <th className="border px-2 py-1">M-NID</th>
            <th className="border px-2 py-1">NID-ছবি </th>
            {/* <th className="border px-2 py-1">আবেদন ফি</th> */}
            <th className="border px-2 py-1">পরিবর্তন</th>
            <th className="border px-2 py-1">সদস্য তৈরিকারী</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td className="border px-2 py-1">
                {new Date(member.createdAt).toLocaleDateString("bn-BD")}
              </td>
              <td className="border px-2 py-1">
                নাম: {member.name}<br />
                মোবাইল: {member.mobileNumber}<br />
                ঠিকানা: {member.address}
              </td>
              <td className="border px-2 py-1">{member.memberId}</td>
              <td className="border px-2 py-1">
                {member.memberImage && (
                  <img src={member.memberImage} alt="Member" className="w-12 h-12 object-cover" />
                )}
              </td>
              <td className="border px-2 py-1">
                নাম: {member.nomineeName}<br />
                মোবাইল: {member.nomineeMobile}<br />
                সম্পর্ক: {member.nomineeRelation}
              </td>
              <td className="border px-2 py-1">
                {member.nomineeImage && (
                  <img src={member.nomineeImage} alt="Nominee" className="w-12 h-12 object-cover" />
                )}
              </td>
              {/* <td className="border px-2 py-1">
               
                {member.signature && (
                  <img src={member.signature} alt="Signature" className="w-16 h-8 object-cover" />
                )}
              </td> */}
              <td className="border px-2 py-1">{member.nidNumber}</td>
              <td className="border px-2 py-1">
                {member.nidFront? (
                  <a href={member.nidFront} target="_blank" className="text-blue-600 underline">
                    <img src={member.nidFront} alt="nidFront" className="w-16 h-8 object-cover" />
                  </a>
                ) : "-"}
              </td>
              {/* <td className="border px-2 py-1">{member.applicationFee || "-"}</td> */}
              <td className="border px-2 py-1">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</button>
              </td>
              <td className="border px-2 py-1">ADMIN</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersPage;
