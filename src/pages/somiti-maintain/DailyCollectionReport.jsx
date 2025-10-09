import React, { useEffect, useState } from "react";
import axios from "axios";

const DailyCollectionReport = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null); // নির্বাচিত row
  const [showModal, setShowModal] = useState(false); // popup নিয়ন্ত্রণ

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

  const handleShowDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

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
              <th className="border p-2">বিস্তারিত</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((item, index) => (
              <tr
                key={`${item._id || "no-id"}-${index}`}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="border p-2 font-semibold text-blue-600 text-center">
                  {item.type || "-"}
                </td>
                <td className="border p-2 text-center">{item.memberId || "-"}</td>
                <td className="border p-2 text-center">
                  {item.schemeId || item.name || "-"}
                </td>
                <td className="border p-2 text-center font-medium text-green-600">
                  {item.collectedAmount ? `${item.collectedAmount} ৳` : "-"}
                </td>
                <td className="border p-2 text-center">{item.description || "-"}</td>
                <td className="border p-2 text-center">
                  {item.date
                    ? new Date(item.date).toLocaleDateString("bn-BD")
                    : "-"}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleShowDetails(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                  >
                    বিস্তারিত
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Popup Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-center mb-4 text-blue-600">
              বিস্তারিত তথ্য
            </h3>
            <div className="space-y-2 text-sm">
              <p><strong>ধরণ:</strong> {selectedItem.type || "-"}</p>
              <p><strong>Member ID:</strong> {selectedItem.memberId || "-"}</p>
              <p><strong>স্কিম/নাম:</strong> {selectedItem.schemeId || selectedItem.name || "-"}</p>
              <p><strong>টাকার পরিমাণ:</strong> {selectedItem.collectedAmount ? `${selectedItem.collectedAmount} ৳` : "-"}</p>
              <p><strong>বর্ণনা:</strong> {selectedItem.description || "-"}</p>
              <p><strong>তারিখ:</strong> {selectedItem.date ? new Date(selectedItem.date).toLocaleString("bn-BD") : "-"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyCollectionReport;
