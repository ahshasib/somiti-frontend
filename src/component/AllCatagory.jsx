import React from "react";
import { FaUserTie, FaUsers, FaMoneyBillWave, FaRegListAlt, FaTasks, FaChartPie } from "react-icons/fa";
import { MdAdminPanelSettings, MdOutlinePayments, MdAccessTime } from "react-icons/md";

const categories = [
  { name: "স্টাফ লগইন", short: "স্টাফ লগইন", icon: <FaUserTie /> },
  { name: "সমিতি কালেক্টর", short: "কালেক্টর", icon: <MdAdminPanelSettings /> },
  { name: "স্টাফ পদবি", short: "পদবি", icon: <FaTasks /> },
  { name: "স্টাফ নাম", short: "স্টাফ নাম", icon: <FaUsers /> },
  { name: "স্টাফ অনুমতি", short: "অনুমতি", icon: <FaChartPie /> },
  { name: "এলাকা", short: "এলাকা", icon: <FaRegListAlt /> },
  { name: "সদস্য তৈরি", short: "সদস্য", icon: <FaUsers /> },
  { name: "সদস্য তথ্য", short: "তথ্য", icon: <FaRegListAlt /> },
  { name: "সদস্য তালিকা", short: "তালিকা", icon: <FaUsers /> },
  { name: "ফী কালেকশন", short: "ফী", icon: <FaMoneyBillWave /> },
  { name: "সকল ফী", short: "সকল ফী", icon: <MdOutlinePayments /> },
  { name: "বিলম্ব চার্জ", short: "বিলম্ব", icon: <FaMoneyBillWave /> },
  { name: "সার্ভিস চার্জ", short: "সার্ভিস", icon: <FaMoneyBillWave /> },
  { name: "কিস্তির তারিখ", short: "কিস্তি", icon: <MdAccessTime /> },
  { name: "মেয়াদ উত্তীর্ণ", short: "মেয়াদ", icon: <MdAccessTime /> },
  { name: "সঞ্চয় ব্যবস্থাপনা", short: "সঞ্চয়", icon: <FaChartPie /> },
  { name: "সঞ্চয় কিস্তি", short: "সঞ্চয় কিস্তি", icon: <MdOutlinePayments /> },
  { name: "সকল সঞ্চয় কিস্তি", short: "সকল সঞ্চয়", icon: <MdOutlinePayments /> },
];

const AllCatagory = () => {
  return (
    <div className="relative">
      {/* Shadow Backgrounds */}
      <div className="absolute -top-0 -left-20 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-40 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 w-10/12 mx-auto py-15">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">সমিতি ক্যাটাগরি</h2>
        <p className="text-gray-600 mb-6">
  এখানে আপনি সহজেই স্টাফ, সদস্য, ফি এবং সঞ্চয় সংক্রান্ত সকল কাজ এক জায়গা থেকে পরিচালনা করতে পারবেন।
</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center p-4 cursor-pointer font-semibold rounded-lg 
              bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 
              hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 
              text-white shadow-lg shadow-gray-400/50 hover:shadow-xl hover:shadow-gray-500/60 
              transition-all duration-500"
            >
              <div className="text-4xl drop-shadow-md">{cat.icon}</div>
              <span className="mt-2 text-lg font-medium drop-shadow-sm">{cat.short}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCatagory;
