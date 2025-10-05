import React, { useEffect, useState } from "react";
import axios from "axios";
// সকল DPS কালেকশন
const AllDpsCollections = () => {
  const [data, setData] = useState([]); // array of { scheme, settings: [...] }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSchemeId, setOpenSchemeId] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/dps-schemes-with-members`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("ডেটা আনতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <div className="p-6">লোড হচ্ছে…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!data.length) return <div className="p-6">কোনো DPS স্কিম পাওয়া যায়নি।</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">সকল DPS স্কিম ও সদস্যগণ</h1>

      {data.map(({ scheme, settings }) => (
        <div key={scheme._id} className="mb-4 border rounded-lg overflow-hidden shadow-sm">
          {/* header */}
          <div
            className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
            onClick={() => setOpenSchemeId(openSchemeId === scheme._id ? null : scheme._id)}
          >
            <div>
              <div className="text-lg font-semibold">{scheme.schemeName}</div>
              <div className="text-sm text-gray-600">
                মাসিক: ৳{scheme.monthlyAmount} · মেয়াদ: {scheme.durationMonths} মাস · মোট টার্গেট: ৳{scheme.targetAmount}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {settings.length} সদস্য · <span className="ml-3 text-indigo-600">View</span>
            </div>
          </div>

          {/* body */}
          {openSchemeId === scheme._id && (
            <div className="p-4 bg-white">
              {settings.length === 0 ? (
                <div className="text-gray-500">এই স্কিমে কোনো সদস্য নেই।</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="p-2">#</th>
                        <th className="p-2">Member ID</th>
                        <th className="p-2">নাম</th>
                        <th className="p-2">মাসিক</th>
                        <th className="p-2">মেয়াদ</th>
                        <th className="p-2">লাভ%</th>
                        <th className="p-2">Collections</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {settings.map((s, idx) => {
                        const member = s.member;
                        return (
                          <tr key={s._id} className="border-b">
                            <td className="p-2">{idx + 1}</td>
                            <td className="p-2">{s.memberId || (member && member.memberId) || "-"}</td>
                            <td className="p-2">{(member && member.name) || "Unknown"}</td>
                            <td className="p-2">৳{s.monthlyAmount || (scheme.monthlyAmount)}</td>
                            <td className="p-2">{s.durationMonths || scheme.durationMonths} মাস</td>
                            <td className="p-2">{s.interestRate ?? scheme.interestRate}%</td>
                            <td className="p-2">
                              {Array.isArray(s.collections) ? s.collections.length : 0}
                              {s.collections && s.collections.length > 0 && (
                                <div className="text-xs text-gray-500">
                                  শেষ: {new Date(s.collections[s.collections.length - 1].date).toLocaleDateString()}
                                </div>
                              )}
                            </td>
                            <td className="p-2">{s.status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllDpsCollections;
