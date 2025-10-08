import React, { useEffect, useState } from "react";
import axios from "axios";

const DailyCollectionReport = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/daily-collection`);
      setCollections(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const today = new Date().toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        দৈনিক কালেকশন রিপোর্ট ({today})
      </h2>

      {loading ? (
        <p className="text-center">লোড হচ্ছে...</p>
      ) : collections.length === 0 ? (
        <p className="text-center text-gray-600">আজ কোনো কালেকশন নেই</p>
      ) : (
        <table className="w-full border-collapse border text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ধরণ</th>
              <th className="border p-2">Member ID</th>
              <th className="border p-2">স্কিম/নাম</th>
              <th className="border p-2">টাকার পরিমাণ</th>
              <th className="border p-2">বর্ণনা</th>
              <th className="border p-2">তারিখ</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border p-2 font-semibold text-blue-600">
                  {item.type}
                </td>
                <td className="border p-2">{item.memberId}</td>
                <td className="border p-2">
                  {item.schemeId || item.name || "-"}
                </td>
                <td className="border p-2">{item.collectedAmount} ৳</td>
                <td className="border p-2">{item.description || "-"}</td>
                <td className="border p-2">
                  {new Date(item.date).toLocaleDateString("bn-BD")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DailyCollectionReport;
