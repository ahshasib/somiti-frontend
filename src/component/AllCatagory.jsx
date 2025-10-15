import React, { useEffect } from "react";
import { FaUserTie, FaUsers, FaMoneyBillWave, FaRegListAlt, FaTasks, FaChartPie } from "react-icons/fa";
import { MdAdminPanelSettings, MdOutlinePayments, MdAccessTime } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const categories = [
  { name: "সকল লোনের তথ্য", short: "সকল লোনের তথ্য", icon: <FaUserTie /> },
  { name: "লোনের তারিখ", short: " লোনের তারিখ", icon: <MdAdminPanelSettings /> },
  { name: "FDR ক্যালকুলেটর", short: "FDR ক্যালকুলেটর", icon: <FaTasks /> },
  { name: "সকল FDR কালেকশন", short: "সকল FDR কালেকশন", icon: <FaUsers /> },
  { name: "FDR জমা", short: "FDR জমা", icon: <FaChartPie /> },
  { name: "DPS ক্যালকুলেটর", short: "DPS ক্যালকুলেটর", icon: <FaRegListAlt /> },
  { name: "সকল DPS স্কিম", short: "সকল DPS স্কিম", icon: <FaUsers /> },
  { name: "সকল DPS কালেকশন", short: "সকল DPS কালেকশন", icon: <FaRegListAlt /> },
  { name: "দৈনিক DPS", short: "দৈনিক DPS", icon: <FaUsers /> },
  { name: "ফী কালেকশন", short: "ফী", icon: <FaMoneyBillWave /> },
  { name: "সকল ফী", short: "সকল ফী", icon: <MdOutlinePayments /> },
  { name: "সকল FDR", short: "বিলম্ব", icon: <FaMoneyBillWave /> },
  { name: "DPS ক্যালকুলেটর", short: "সার্ভিস", icon: <FaMoneyBillWave /> },
  { name: "কিস্তির তারিখ", short: "কিস্তি", icon: <MdAccessTime /> },
  { name: "মেয়াদ উত্তীর্ণ", short: "মেয়াদ", icon: <MdAccessTime /> },
  { name: "ব্যবস্থাপনা", short: "সঞ্চয়", icon: <FaChartPie /> },
  { name: "কিস্তি", short: "সঞ্চয় কিস্তি", icon: <MdOutlinePayments /> },
  { name: "সকল কিস্তি", short: "সকল সঞ্চয়", icon: <MdOutlinePayments /> },
];

const AllCatagory = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="relative py-15">
      {/* Shadow Backgrounds */}
      <div className="absolute -top-0 -left-20 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-40 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 w-10/12 mx-auto ">
        <h2 className="text-4xl text-center font-bold mb-2 text-gray-800">
          সমিতি ক্যাটাগরি
        </h2>
        <p className="text-gray-600 mb-10 text-center">
          এখানে আপনি সহজেই স্টাফ, সদস্য, ফি এবং সঞ্চয় সংক্রান্ত সকল কাজ এক জায়গা থেকে পরিচালনা করতে পারবেন।
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
  {categories.map((cat, index) => (
    <Link
      to="/dashboard"
      key={index}
      data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
      className="flex flex-col items-center justify-center p-4 cursor-pointer font-semibold rounded-lg 
                 bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 
                 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 
                 text-white shadow-lg shadow-gray-400/50 hover:shadow-xl hover:shadow-gray-500/60 
                 transition-all duration-500"
    >
      <div className="text-4xl drop-shadow-md">{cat.icon}</div>
      <span className="mt-2 text-lg font-medium drop-shadow-sm">{cat.short}</span>
    </Link>
  ))}
</div>

      </div>
    </div>
  );
};

export default AllCatagory;
