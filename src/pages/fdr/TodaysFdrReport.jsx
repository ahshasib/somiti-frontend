import React, { useEffect, useState } from "react";
import axios from "axios";

const FdrDailyReport = () => {
    const [report, setReport] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [loading, setLoading] = useState(true);

    const fetchReport = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/fdr-daily-report?date=${date}`
            );
            setReport(res.data.data);
        } catch (err) {
            console.error(err);
            alert("রিপোর্ট আনতে সমস্যা হয়েছে!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [date]);

    // মোট FDR টাকা হিসাব
    const totalAmount = report.reduce((sum, item) => sum + item.fdrAmount, 0);

    return (
        <div className="p-6 bg-gradient-to-b from-indigo-50 via-white to-indigo-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                        🗓️ দৈনিক FDR কালেকশন রিপোর্ট
                    </h1>
                    <div className="flex items-center gap-3 mt-3 md:mt-0">
                        <label className="font-semibold text-gray-700">
                            তারিখ নির্বাচন করুন:
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border border-indigo-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                        />
                    </div>
                </div>

                {/* Report Table */}
                {loading ? (
                    <p className="text-center text-gray-600 py-10 text-lg font-medium">
                        🔄 রিপোর্ট লোড হচ্ছে...
                    </p>
                ) : report.length === 0 ? (
                    <p className="text-center text-red-500 py-10 text-lg font-semibold">
                        ❌ এই তারিখে কোনো FDR কালেকশন নেই।
                    </p>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full text-sm border-collapse">
                            <thead className="bg-indigo-100 text-gray-800">
                                <tr className="text-left">
                                    <th className="p-3">#</th>
                                    <th className="p-3">সদস্য নাম</th>
                                    <th className="p-3">ফোন</th>
                                    <th className="p-3">স্কিম</th>
                                    <th className="p-3">পরিমাণ</th>
                                    <th className="p-3">লভ্যাংশ</th>
                                    <th className="p-3">সময়কাল</th>
                                    <th className="p-3">কার্যকর তারিখ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-indigo-50 transition-colors"
                                    >
                                        <td className="p-3 font-medium text-gray-700">
                                            {index + 1}
                                        </td>
                                        <td className="p-3">{item.memberName}</td>
                                        <td className="p-3">{item.phone}</td>
                                        <td className="p-3">{item.schemeName}</td>
                                        <td className="p-3 text-indigo-700 font-semibold">
                                            ৳{item.fdrAmount.toLocaleString()}
                                        </td>
                                        <td className="p-3">
                                            {item.interestValue} {item.interestType}
                                        </td>
                                        <td className="p-3">{item.duration} মাস</td>
                                        <td className="p-3">
                                            {new Date(item.effectiveDate).toLocaleDateString("bn-BD")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-indigo-50 font-semibold text-gray-800">
                                <tr>
                                    <td colSpan="4" className="p-3 text-right">
                                        মোট FDR সংখ্যা: {report.length} টি
                                    </td>
                                    <td colSpan="4" className="p-3 text-indigo-700 font-bold">
                                        মোট পরিমাণ: ৳{totalAmount.toLocaleString()}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FdrDailyReport;
