import React, { useEffect, useState } from "react";
import axios from "axios";

const DpsReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/dps-report`);
      setReport(res.data);
    } catch (err) {
      console.error(err);
      alert("রিপোর্ট লোড করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) return <div className="p-6 text-center">লোড হচ্ছে...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 সকল DPS সদস্যের লেনদেন রিপোর্ট</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full text-sm border">
          <thead className="bg-indigo-100 text-gray-800">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">নাম</th>
              <th className="p-3 text-left">মোবাইল</th>
              <th className="p-3 text-left">স্কিম</th>
              <th className="p-3 text-left">মাসিক কিস্তি</th>
              <th className="p-3 text-left">কিস্তির সংখ্যা</th>
              <th className="p-3 text-left">মোট টাকা</th>
            </tr>
          </thead>
          <tbody>
            {report.length > 0 ? (
              report.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium">{item.memberName}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3">{item.schemeName}</td>
                  <td className="p-3">৳{item.monthlyAmount}</td>
                  <td className="p-3">{item.totalInstallments}</td>
                  <td className="p-3 font-semibold text-green-600">৳{item.totalAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center text-gray-500">
                  কোনো লেনদেন পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DpsReport;
