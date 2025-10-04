import React, { useEffect, useState } from "react";

const AllDpsSchemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/dps-schemes`); // তোমার সার্ভারের URL অনুযায়ী পরিবর্তন করো
                const data = await res.json();
                setSchemes(data);
            } catch (err) {
                console.error("Error fetching DPS schemes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemes();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">সকল DPS স্কিম</h2>

            {loading ? (
                <p className="text-center text-gray-600">লোড হচ্ছে...</p>
            ) : schemes.length === 0 ? (
                <p className="text-center text-red-500">কোনো স্কিম পাওয়া যায়নি।</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 bg-white rounded-lg">
                        <thead className="bg-pink-100 text-gray-700">
                            <tr>
                                <th className="border px-4 py-2">ক্রম</th>
                                <th className="border px-4 py-2">স্কিমের নাম</th>
                                <th className="border px-4 py-2">সময়কাল (মাস)</th>
                                <th className="border px-4 py-2">মাসিক জমা</th>
                                <th className="border px-4 py-2">ধরন</th>
                                <th className="border px-4 py-2">সুদের হার (%)</th>
                                <th className="border px-4 py-2">লক্ষ্যমাত্রা</th>
                                <th className="border px-4 py-2">অবস্থা</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schemes.map((scheme, index) => (
                                <tr key={scheme._id} className="text-center hover:bg-gray-50">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{scheme.schemeName}</td>
                                    <td className="border px-4 py-2">
                                        {scheme.durationMonths >= 12
                                            ? `${scheme.durationMonths / 12} বছর`
                                            : `${scheme.durationMonths} মাস`}
                                    </td>
                                    <td className="border px-4 py-2">{scheme.monthlyAmount} ৳</td>
                                    <td className="border px-4 py-2">{scheme.dpsType}</td>
                                    <td className="border px-4 py-2">{scheme.interestRate}%</td>
                                    <td className="border px-4 py-2">{scheme.targetAmount} ৳</td>
                                    <td
                                        className={`border px-4 py-2 font-semibold ${scheme.status === "active"
                                                ? "text-green-600"
                                                : "text-red-500"
                                            }`}
                                    >
                                        {scheme.status === "active" ? "চলমান" : "বন্ধ"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllDpsSchemes;
