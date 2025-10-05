import React, { useEffect, useState } from "react";
import axios from "axios";
//সকল FDR কালেকশন page
const FdrCollectionReport = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/fdr-collections`);
        setCollections(res.data);
      } catch (err) {
        console.error(err);
        alert("ডেটা লোড করতে সমস্যা হয়েছে!");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) return <div className="p-6 text-center">লোড হচ্ছে...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 সকল FDR কালেকশন</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full text-sm border">
          <thead className="bg-indigo-100 text-gray-800">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">সদস্যের নাম</th>
              <th className="p-3 text-left">মোবাইল</th>
              <th className="p-3 text-left">স্কিমের নাম</th>
              <th className="p-3 text-left">স্কিমের ধরন</th>
              <th className="p-3 text-left">সময়কাল (মাস)</th>
              <th className="p-3 text-left">লভ্যাংশ</th>
              <th className="p-3 text-left">FDR টাকা</th>
              <th className="p-3 text-left">কালেকশন তারিখ</th>
              <th className="p-3 text-left">কার্যকর তারিখ</th>
              <th className="p-3 text-left">অবস্থা</th>
              <th className="p-3 text-left">SMS পাঠানো হয়েছে?</th>
              <th className="p-3 text-left">বর্ণনা</th>
            </tr>
          </thead>
          <tbody>
            {collections.length > 0 ? (
              collections.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium">{item.memberName}</td>
                  <td className="p-3">{item.memberPhone}</td>
                  <td className="p-3">{item.schemeName}</td>
                  <td className="p-3">{item.schemeType}</td>
                  <td className="p-3">{item.duration}</td>
                  <td className="p-3">{item.interestValue} {item.interestType}</td>
                  <td className="p-3 font-semibold text-green-600">৳{item.fdrAmount}</td>
                  <td className="p-3">{new Date(item.collectionDate).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(item.effectiveDate).toLocaleDateString()}</td>
                  <td className="p-3">{item.status}</td>
                  <td className="p-3">{item.sendSMS ? "হ্যাঁ" : "না"}</td>
                  <td className="p-3">{item.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="p-3 text-center text-gray-500">
                  কোনো কালেকশন পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FdrCollectionReport;
