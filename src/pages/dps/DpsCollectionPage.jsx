import React, { useState, useEffect } from "react";
import axios from "axios";

const DpsCollectionPage = () => {
    const [members, setMembers] = useState([]);
    const [settings, setSettings] = useState([]);
    const [form, setForm] = useState({
        date: new Date().toISOString().split("T")[0],
        memberId: "",
        schemeId: "",
        collectedAmount: 0,
        description: "",
        smsSent: false,
        balance: 854, // agent balance
        interestRate: 0,
        targetAmount: 0,
    });

    // Fetch members
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/members`);
                setMembers(res.data);
            } catch (err) {
                console.error("Error fetching members:", err);
            }
        };
        fetchMembers();
    }, []);

    // Fetch member's active DPS settings when member selected
    useEffect(() => {
        const fetchSettings = async () => {
            if (!form.memberId) return;
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/member-dps-settings/${form.memberId}`);
                setSettings(res.data);
            } catch (err) {
                console.error("Error fetching settings:", err);
            }
        };
        fetchSettings();
    }, [form.memberId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // Auto-fill collectedAmount, interestRate, targetAmount when scheme selected
    useEffect(() => {
        const selectedSetting = settings.find(s => s._id === form.schemeId);
        if (selectedSetting) {
            setForm(prev => ({
                ...prev,
                collectedAmount: selectedSetting.monthlyAmount || 0,
                interestRate: selectedSetting.interestRate || 0,
                targetAmount: selectedSetting.targetAmount || 0,
            }));
        }
    }, [form.schemeId, settings]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.memberId || !form.schemeId) return;

        // Get the selected DPS setting
        const selectedSetting = settings.find(s => s._id === form.schemeId);
        if (!selectedSetting) {
            alert("Selected DPS setting not found");
            return;
        }

        // Payload with proper schemeId reference
        const payload = {
            date: form.date,
            memberId: form.memberId,
            schemeId: selectedSetting.schemeId._id, // scheme reference id
            collectedAmount: form.collectedAmount,
            description: form.description,
            smsSent: form.smsSent,
            balance: form.balance
        };

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/dps-allcollections`, payload);
            alert("DPS কালেকশন সফলভাবে সম্পন্ন হয়েছে!");
            console.log(res.data);

            // Reset form
            setForm({
                date: new Date().toISOString().split("T")[0],
                memberId: "",
                schemeId: "",
                collectedAmount: 0,
                description: "",
                smsSent: false,
                balance: 854,
                interestRate: 0,
                targetAmount: 0,
            });

            setSettings([]);
        } catch (err) {
            console.error(err);
            alert("Error in DPS collection");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-100 flex justify-center items-center p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">DPS কালেকশন করুন</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* তারিখ */}
                    <div>
                        <label className="block mb-1 font-medium">তারিখ</label>
                        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" />
                    </div>

                    {/* সদস্য নির্বাচন */}
                    <div>
                        <label className="block mb-1 font-medium">সদস্যের নাম</label>
                        <select name="memberId" value={form.memberId} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required>
                            <option value="">সদস্য নির্বাচন করুন</option>
                            {members.map(m => (
                                <option key={m._id} value={m.memberId}>
                                    {m.name} ({m.memberId})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* DPS স্কীম নাম */}
                    <div>
                        <label className="block mb-1 font-medium">DPS স্কীম নাম</label>
                        <select name="schemeId" value={form.schemeId} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required>
                            <option value="">স্কীম নির্বাচন করুন</option>
                            {settings.map(s => (
                                <option key={s._id} value={s._id}>
                                    {s.schemeId.schemeName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* বর্তমান টাকা */}
                    <div>
                        <label className="block mb-1 font-medium">বর্তমান টাকা</label>
                        <input type="number" value={form.collectedAmount} readOnly className="w-full border px-3 py-2 rounded-lg bg-gray-100" />
                    </div>

                    {/* DPS গ্রহনের পরিমান */}
                    <div>
                        <label className="block mb-1 font-medium">DPS গ্রহনের পরিমান</label>
                        <input type="number" name="collectedAmount" value={form.collectedAmount} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" />
                    </div>

                    {/* বর্ণনা */}
                    <div>
                        <label className="block mb-1 font-medium">বর্ণনা</label>
                        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg"></textarea>
                    </div>

                    {/* SMS পাঠাবেন? */}
                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="smsSent" checked={form.smsSent} onChange={handleChange} />
                        <label>SMS পাঠাতে চান?</label>
                    </div>

                    {/* ব্যালেন্স */}
                    <div>
                        <label className="block mb-1 font-medium">ব্যালেন্স</label>
                        <input type="number" value={form.balance} readOnly className="w-full border px-3 py-2 rounded-lg bg-gray-100" />
                    </div>

                    <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-semibold mt-4">
                        কালেকশন করুন
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DpsCollectionPage;
