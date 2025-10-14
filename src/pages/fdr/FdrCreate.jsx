import React, { useState, useEffect } from "react";
import axios from "axios";

const FdrCreate = () => {
    const [schemeType, setSchemeType] = useState("Fixed লাভ");
    const [duration, setDuration] = useState(1); // মাস
    const [interestValue, setInterestValue] = useState(0);
    const [interestType, setInterestType] = useState("%");
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [status, setStatus] = useState("active");
    const [loading, setLoading] = useState(false);
    const [schemeName, setSchemeName] = useState("");

    // Auto-generate scheme name
    useEffect(() => {
        const durationText = duration + " মাস";
        const interestText = `${interestValue} ${interestType} লাভের স্কিম`;
        setSchemeName(`${durationText} - ${interestText}`);
    }, [duration, interestValue, interestType]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/fdr-schemes`, {
                schemeName,
                schemeType,
                duration,
                interestValue,
                interestType,
                startDate,
                status,
            });
            alert(res.data.message);
            
            // Reset form
            setSchemeType("Fixed লাভ");
            setDuration(1);
            setInterestValue(0);
            setInterestType("%");
            setStartDate(new Date().toISOString().slice(0, 10));
            setStatus("active");
        } catch (err) {
            console.error(err);
            alert("FDR স্কিম তৈরি করতে সমস্যা হয়েছে!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-indigo-50 flex items-start justify-center p-6">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">FDR স্কিম তৈরি করুন</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">তারিখঃ</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* Scheme Type */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">স্কিমের ধরনঃ</label>
                        <select
                            value={schemeType}
                            onChange={(e) => setSchemeType(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="Fixed লাভ">ফিক্সড  লাভ</option>
                            <option value="মাসিক Fixed লাভ">মাসিক ফিক্সড  লাভ</option>
                        </select>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">সময়কাল (মাস)</label>
                        <input
                            type="number"
                            min="0"
                            value={duration}
                            onChange={(e) => {
                                const val = e.target.value;
                                setDuration(val === "" ? 0 : parseInt(val));
                            }}
                            className="w-full border rounded-lg px-3 py-2"
                        />


                    </div>

                    {/* Interest Value */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">লভ্যাংশঃ</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={interestValue}
                                onChange={(e) => setInterestValue(e.target.value)}
                                className="flex-1 border rounded-lg px-3 py-2"
                            />
                            <select
                                value={interestType}
                                onChange={(e) => setInterestType(e.target.value)}
                                className="border rounded-lg px-3 py-2"
                            >
                                <option value="%">%</option>
                                <option value="৳">৳</option>
                            </select>
                        </div>
                    </div>

                    {/* Auto-generated Scheme Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">স্কিমের নামঃ</label>
                        <input
                            type="text"
                            value={schemeName}
                            readOnly
                            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">অবস্থা</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="active">সক্রিয়</option>
                            <option value="inactive">বন্ধ</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        {loading ? "লোড হচ্ছে..." : "স্কিম তৈরি করুন"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FdrCreate;
