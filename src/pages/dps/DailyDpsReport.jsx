import React, { useEffect, useState } from "react";
import axios from "axios";
//দৈনিক DPS কালেকশন রিপোর্ট
const DailyDpsReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(data)
  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/daily-dps-report`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("ডেটা লোড করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">লোড হচ্ছে...</div>;

  // টোটাল কালেকশন হিসাব
  const totalCollected = data.reduce((sum, d) => sum + (d.collectedAmount || 0), 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 দৈনিক DPS কালেকশন রিপোর্ট</h1>

      <div className="mb-4 text-lg font-medium">
        মোট কালেকশন: ৳{totalCollected}
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-indigo-100 text-gray-800">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">মেম্বার নাম</th>
              <th className="p-3 text-left">ফোন নম্বর</th>
              <th className="p-3 text-left">DPS স্কিম</th>
              <th className="p-3 text-left">আজকের কিস্তি</th>
              <th className="p-3 text-left">তারিখ</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((d, i) => (
                <tr key={`${d.schemeName}-${d.memberPhone}`} className="border-b hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium">{d.memberName}</td>
                  <td className="p-3">{d.memberPhone}</td>
                  <td className="p-3">{d.schemeName}</td>
                  <td className="p-3">৳{d.collectedAmount}</td>
                  <td className="p-3">{new Date(d.collectionDate).toLocaleDateString("bn-BD")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-3 text-gray-500">
                  আজকের জন্য কোনো DPS কালেকশন নেই।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyDpsReport;
