import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserTie, FaRegListAlt, FaUsers, FaCoins, FaFileAlt, FaCalculator,
  FaChartPie, FaMoneyBillWave, FaWallet
} from "react-icons/fa";
import { MdAccessTime, MdOutlinePayments } from "react-icons/md";

const DashboardHome = () => {
  const buttons = [
    { name: "সদস্য তৈরী করুন", path: "/dashboard/member-create", icon: <FaUserTie /> },
    { name: "সকল সদস্যের তথ্য", path: "/dashboard/member-info", icon: <FaRegListAlt /> },
    { name: "সদস্যের তালিকা", path: "/dashboard/member-list", icon: <FaUsers /> },

    { name: "লোন প্রদান করুন", path: "/dashboard/loan-create", icon: <FaCoins /> },
    { name: "সকল লোনের তথ্য", path: "/dashboard/all-loans", icon: <FaRegListAlt /> },
    { name: "লোনের কিস্তি কালেকশন", path: "/dashboard/loan-installment-collection", icon: <MdAccessTime /> },
    { name: "লোনের সকল কিস্তি কালেকশন", path: "/dashboard/all-loan-installments", icon: <MdAccessTime /> },
    { name: "আজ লোনের কিস্তির তারিখ", path: "/dashboard/today-installment", icon: <MdAccessTime /> },
    { name: "লোনের আবেদন ফর্ম", path: "/dashboard/loan-application", icon: <FaFileAlt /> },
    { name: "লোন বন্ধ করুন", path: "/dashboard/close-loan", icon: <FaCoins /> },
    { name: "কিস্তির তারিখ মেয়াদ উত্তীর্ণ - সদস্য", path: "/dashboard/expire", icon: <MdAccessTime /> },

    { name: "FDR ক্যালকুলেটর", path: "/dashboard/fdr-calculator", icon: <FaCalculator /> },
    { name: "FDR স্কিম তৈরি করুন", path: "/dashboard/fdr-scheme-create", icon: <FaFileAlt /> },
    { name: "FDR সেটিং এবং কালেকশন", path: "/dashboard/fdr-settings", icon: <FaCoins /> },
    { name: "সকল FDR কালেকশন", path: "/dashboard/all-fdr", icon: <MdOutlinePayments /> },
    { name: "FDR ব্যবস্থাপনা", path: "/dashboard/fdr-management", icon: <FaChartPie /> },
    { name: "FDR কালেকশন রিপোর্ট", path: "/dashboard/fdr-collection-report", icon: <FaFileAlt /> },
    { name: "FDR জমা এবং উত্তোলন রিপোর্ট", path: "/dashboard/fdr-deposit-withdraw-report", icon: <FaFileAlt /> },

    { name: "DPS ক্যালকুলেটর", path: "/dashboard/dps-calculator", icon: <FaCalculator /> },
    { name: "আজ DPS এর কিস্তি দেয়ার তারিখ", path: "/dashboard/dps-today", icon: <MdAccessTime /> },
    { name: "DPS স্কিম তৈরী করুন", path: "/dashboard/dps-scheme-create", icon: <FaFileAlt /> },
    { name: "সকল DPS স্কিম", path: "/dashboard/all-dps-schemes", icon: <MdOutlinePayments /> },
    { name: "DPS স্কিম সেটিং করুন", path: "/dashboard/dps-scheme-settings", icon: <FaCoins /> },
    { name: "DPS কালেকশন করুন", path: "/dashboard/dps-collection", icon: <FaMoneyBillWave /> },
    { name: "সকল DPS কালেকশন", path: "/dashboard/all-dps-collection", icon: <MdOutlinePayments /> },
    { name: "DPS ব্যবস্থাপনা", path: "/dashboard/dps-management", icon: <FaChartPie /> },
    { name: "দৈনিক DPS কালেকশন রিপোর্ট", path: "/dashboard/dps-daily-collection-report", icon: <FaFileAlt /> },
    { name: "সকল DPS সদস্যের লেনদেন রিপোর্ট", path: "/dashboard/dps-member-report", icon: <FaUsers /> },

    { name: "খরচের খাত ব্যবস্থাপনা", path: "/dashboard/expense-head-management", icon: <FaRegListAlt /> },
    { name: "অন্যান্য আয়-ব্যয়ের খাত", path: "/dashboard/other-income-expense", icon: <FaRegListAlt /> },
    { name: "হিসাব শুরুর ক্যাশ টাকা", path: "/dashboard/opening-cash", icon: <FaWallet /> },

    { name: "দৈনিক কালেকশন রিপোর্ট", path: "/dashboard/daily-collection-report", icon: <FaFileAlt /> },
    { name: "দৈনিক লেনদেন রিপোর্ট", path: "/dashboard/daily-transaction-report", icon: <FaFileAlt /> },
    { name: "সকল সদস্যের ব্যালেন্স রিপোর্ট", path: "/dashboard/member-balance-report", icon: <FaUsers /> },
    { name: "লভ্যাংশ রিপোর্ট", path: "/dashboard/dividend-report", icon: <FaCoins /> },
  ];

  const gradients = [
    "from-green-400 to-emerald-500",
    "from-yellow-400 to-orange-500",
    "from-indigo-400 to-purple-500",
    "from-pink-400 to-red-500",
    "from-blue-400 to-cyan-500",
    "from-purple-400 to-pink-500",
    "from-rose-400 to-fuchsia-500",
    "from-lime-400 to-green-500",
  ];

  return (
    <div className="p-8">
  <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">ড্যাশবোর্ড হোম</h1>
  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
    {buttons.map((btn, index) => {
      const gradient = gradients[index % gradients.length];       // মূল gradient
      const lightGradient = gradient
        .replace(/-900/g, "-900")   // from part হালকা
        .replace(/-900/g, "-900");  // to part হালকা

      return (
        <Link
          key={index}
          to={btn.path}
          className={`flex flex-col items-center justify-center bg-gradient-to-r ${lightGradient} rounded-2xl shadow hover:shadow-lg transition-all p-4 text-center`}
        >
          {/* Icon circle মূল রঙে */}
          <div className={`w-14 h-14 flex items-center justify-center mb-3 rounded-full bg-gradient-to-r ${gradient} text-white text-2xl`}>
            {btn.icon}
          </div>

          {/* Button Name মূল রঙে */}
          <div className={`bg-gradient-to-r ${gradient} text-white rounded-lg py-2 px-4 text-sm font-semibold`}>
            {btn.name}
          </div>
        </Link>
      );
    })}
  </div>
</div>


  );
};

export default DashboardHome;
