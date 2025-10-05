import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const DpsManagement = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
console.log(schemes)
    // 🔹 Data Load Function
    const fetchData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/dps-management`);
            setSchemes(res.data);
        } catch (err) {
            console.error(err);
            Swal.fire("ত্রুটি!", "ডেটা লোড করতে সমস্যা হয়েছে।", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 🗑️ DPS বন্ধ করো
    const handleDelete = async (id, name) => {
        Swal.fire({
            title: `${name} স্কিম বন্ধ করতে চান?`,
            text: "এই স্কিমটি মুছে গেলে পুনরুদ্ধার করা যাবে না!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "হ্যাঁ, বন্ধ করুন",
            cancelButtonText: "বাতিল",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/dps-management/${id}`);
                    Swal.fire("সফল!", "DPS স্কিম সফলভাবে বন্ধ করা হয়েছে।", "success");
                    fetchData(); // Refresh table
                } catch (err) {
                    console.error(err);
                    Swal.fire("ত্রুটি!", "DPS বন্ধ করা সম্ভব হয়নি।", "error");
                }
            }
        });
    };

    if (loading)
        return <div className="p-6 text-center text-gray-600 font-medium">⏳ লোড হচ্ছে...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">💼 DPS ব্যবস্থাপনা</h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-indigo-100 text-gray-800">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">স্কিম নাম</th>
                            <th className="p-3 text-left">শুরু তারিখ</th>
                            <th className="p-3 text-left">মেয়াদ</th>
                            <th className="p-3 text-left">মাসিক পরিমাণ</th>
                            <th className="p-3 text-left">টার্গেট</th>
                            <th className="p-3 text-left">মোট সদস্য</th>
                            <th className="p-3 text-left">অবস্থা</th>
                            <th className="p-3 text-center">অ্যাকশন</th>
                        </tr>
                    </thead>

                    <tbody>
                        {schemes.length > 0 ? (
                            schemes.map((s, i) => (
                                <tr key={s._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{i + 1}</td>
                                    <td className="p-3 font-medium">{s.schemeName}</td>
                                    <td className="p-3">
                                        {s.startDate

                                            ? new Date(s.
                                                startDate).toLocaleDateString("bn-BD")
                                            : "—"}
                                    </td>
                                    <td className="p-3">{s.durationMonths} মাস</td>
                                    <td className="p-3">৳{s.monthlyAmount}</td>
                                    <td className="p-3">৳{s.targetAmount}</td>
                                    <td className="p-3">{s.totalMembers}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs ${s.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {s.status === "active" ? "চলমান" : "বন্ধ"}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleDelete(s._id, s.schemeName)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            DPS বন্ধ করুন
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-6 text-gray-500">
                                    কোনো DPS স্কিম পাওয়া যায়নি।
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DpsManagement;
