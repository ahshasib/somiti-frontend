import React, { useEffect, useState } from "react";
import axios from "axios";

const FdrCollectionReport = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [logo, setLogo] = useState(null); // ✅ logo state

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

    const fetchLogo = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/logo-get`);
        
        if (res.data && res.data.logoUrl) {
          setLogo(res.data.logoUrl); // ✅ logo url ধরছি
        }
      } catch (err) {
        console.error("Logo লোড করতে সমস্যা:", err);
      }
    };

    fetchCollections();
    fetchLogo(); // ✅ logo লোড হবে
  }, []);

  const handleOpenReceipt = (collection) => {
    setSelectedCollection(collection);
    setShowReceipt(true);
  };

  const handlePrint = () => {
    window.print();
  };

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
              <th className="p-3 text-left">FDR টাকা</th>
              <th className="p-3 text-left">রসিদ</th>
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
                  <td className="p-3 font-semibold text-green-600">৳{item.fdrAmount}</td>
                  <td className="p-3">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleOpenReceipt(item)}
                    >
                      রসিদ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  কোনো কালেকশন পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Receipt Modal */}
      {showReceipt && selectedCollection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50 overflow-auto">
          <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 rounded-lg p-6 relative shadow-2xl border border-gray-300">
            
            {/* Close Button */}
            <button
              onClick={() => setShowReceipt(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✖
            </button>

            {/* Header: Logo + Title */}
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-3">
                {/* ✅ Dynamic logo */}
                {logo ? (
                  <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
                ) : (
                  <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain opacity-60" />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-indigo-700">FDR রসিদ</h2>
                  <p className="text-gray-600 text-sm">
                    সদস্যের বিস্তারিত তথ্য ও লেনদেনের বিবরণ
                  </p>
                </div>
              </div>
              <div className="text-right text-gray-500 text-xs">
                {/* <p>তারিখ: {new Date(selectedCollection.createdAt).toLocaleDateString("bn-BD")}</p>
                <p>রসিদ নং: {selectedCollection._id.slice(-6).toUpperCase()}</p> */}
              </div>
            </div>

            {/* Receipt Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4">
              <p><strong>সদস্যের নাম:</strong> {selectedCollection.memberName}</p>
              <p><strong>মোবাইল:</strong> {selectedCollection.memberPhone}</p>
              <p><strong>স্কিমের নাম:</strong> {selectedCollection.schemeName}</p>
              <p><strong>স্কিমের ধরন:</strong> {selectedCollection.schemeType}</p>
              <p><strong>সময়কাল:</strong> {selectedCollection.duration} মাস</p>
              <p><strong>লভ্যাংশ:</strong> {selectedCollection.interestValue} {selectedCollection.interestType}</p>
              <p><strong>FDR টাকা:</strong> ৳{selectedCollection.fdrAmount}</p>
              <p><strong>কালেকশন তারিখ:</strong> {new Date(selectedCollection.collectionDate).toLocaleDateString("bn-BD")}</p>
              <p><strong>কার্যকর তারিখ:</strong> {new Date(selectedCollection.effectiveDate).toLocaleDateString("bn-BD")}</p>
              <p><strong>অবস্থা:</strong> {selectedCollection.status}</p>
              <p><strong>SMS পাঠানো হয়েছে:</strong> {selectedCollection.sendSMS ? "হ্যাঁ" : "না"}</p>
              <p className="col-span-2"><strong>বিবরণ:</strong> {selectedCollection.description}</p>
            </div>

            {/* Rules / Notes */}
            <div className="border-t pt-3 text-gray-600 text-sm space-y-1 mb-4">
              <p>⚠️ দয়া করে নিশ্চিত করুন যে সমস্ত তথ্য সঠিক।</p>
              <p>⚠️ এই রসিদ শুধুমাত্র নথি হিসেবে ব্যবহারের জন্য।</p>
              <p>⚠️ কোনো প্রশ্ন বা সংশোধনের জন্য অফিসের সাথে যোগাযোগ করুন।</p>
            </div>

            {/* Footer / Signature Section */}
            <div className="mt-4 border-t pt-3">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-gray-600 text-sm">অফিসারের স্বাক্ষর:</p>
                  <p className="font-semibold">______________________</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">সদস্যের স্বাক্ষর:</p>
                  <p className="font-semibold">______________________</p>
                </div>
              </div>
              <p className="text-center text-gray-500 text-xs mt-2">
                ধন্যবাদ আপনার সহযোগিতার জন্য
              </p>
            </div>

            {/* Print Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handlePrint}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow font-semibold"
              >
                🖨️ Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FdrCollectionReport;
