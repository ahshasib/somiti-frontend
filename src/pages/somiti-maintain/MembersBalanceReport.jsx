import React, { useEffect, useState } from "react";
import axios from "axios";

const MembersBalanceReport = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null);

    const fetchMembers = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/members-balance-report`
            );
            setMembers(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">সকল সদস্যের ব্যালেন্স রিপোর্ট</h2>

            {loading ? (
                <p className="text-center">লোড হচ্ছে...</p>
            ) : members.length === 0 ? (
                <p className="text-center text-gray-600">কোনো সদস্য পাওয়া যায়নি</p>
            ) : (
                <table className="w-full border-collapse border text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">সদস্যের নাম</th>
                            <th className="border p-2">মোবাইল</th>
                            <th className="border p-2">ঠিকানা</th>
                            <th className="border p-2">মোট লোন প্রদান</th>
                            <th className="border p-2">লোন কালেকশন</th>
                            <th className="border p-2">DPS জমা</th>
                            <th className="border p-2">DPS ব্যালান্স</th>
                            <th className="border p-2">FDR জমা</th>
                            <th className="border p-2">বিস্তারিত</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.memberId} className="hover:bg-gray-50">
                                <td className="border p-2">{member.name}</td>
                                <td className="border p-2">{member.mobile}</td>
                                <td className="border p-2">{member.address}</td>
                                <td className="border p-2">{member.totalLoanGiven} ৳</td>
                                <td className="border p-2">{member.totalLoanCollection} ৳</td>
                                <td className="border p-2">{member.totalDPSDeposit} ৳</td>
                                <td className="border p-2">{member.totalDPSBalance} ৳</td>
                                <td className="border p-2">{member.totalFDRDeposit} ৳</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => setSelectedMember(member)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        বিস্তারিত
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal */}
            {selectedMember && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow max-w-4xl w-full overflow-auto max-h-[80vh]">
                        <h3 className="text-xl font-bold mb-4">{selectedMember.name} এর বিস্তারিত</h3>
                        <p><strong>Mobile:</strong> {selectedMember.mobile}</p>
                        <p><strong>Address:</strong> {selectedMember.address}</p>

                        <h4 className="mt-4 font-semibold">Loans:</h4>
                        {selectedMember.loans.length === 0 ? (
                            <p>-</p>
                        ) : (
                            selectedMember.loans.map((loan, idx) => (
                                <div key={idx} className="border p-2 mb-2 rounded">
                                    <p><strong>Loan Amount:</strong> {loan.initialLoanAmount} ৳</p>
                                    <p><strong>Total Collected:</strong> {loan.collections.reduce((a, c) => a + c.amount, 0)} ৳</p>
                                    <p><strong>Description:</strong> {loan.description}</p>
                                </div>
                            ))
                        )}

                        <h4 className="mt-4 font-semibold">DPS:</h4>
                        {selectedMember.dpsSettings.length === 0 ? (
                            <p>-</p>
                        ) : (
                            selectedMember.dpsSettings.map((dps, idx) => (
                                <div key={idx} className="border p-2 mb-2 rounded">
                                    <p><strong>Scheme ID:</strong> {dps.schemeId}</p>
                                    <p><strong>Total Collected:</strong> {dps.collections.reduce((a, c) => a + c.collectedAmount, 0)} ৳</p>
                                    <p><strong>Balance:</strong> {dps.collections.reduce((a, c) => a + c.balance, 0)} ৳</p>
                                </div>
                            ))
                        )}

                        <h4 className="mt-4 font-semibold">FDR:</h4>
                        {selectedMember.fdrSettings.length === 0 ? (
                            <p>-</p>
                        ) : (
                            selectedMember.fdrSettings.map((fdr, idx) => (
                                <div key={idx} className="border p-2 mb-2 rounded">
                                    <p><strong>FDR Amount:</strong> {fdr.fdrAmount} ৳</p>
                                    <p><strong>Description:</strong> {fdr.description}</p>
                                </div>
                            ))
                        )}

                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => setSelectedMember(null)}
                        >
                            বন্ধ করুন
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MembersBalanceReport;
