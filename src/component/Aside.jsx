import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import {
    FaUsers,
    FaUserTie,
    FaMoneyBillWave,
    FaRegListAlt,
    FaChartPie,
    FaCalculator,
    FaFileAlt,
    FaWallet,
    FaRegMoneyBillAlt,
    FaArrowLeft,
    FaCoins,
    FaChevronUp,
    FaChevronDown,
  } from "react-icons/fa";
  import { MdOutlinePayments, MdAccessTime, MdSavings } from "react-icons/md";
  

const menuCategories = [
    {
      name: "সদস্য ব্যবস্থাপনা",
      icon: <FaUsers />,
      subMenu: [
        // { name: "এলাকা তৈরী করুন", path: "/dashboard/area", icon: <FaRegListAlt /> },
        { name: "সদস্য তৈরী করুন", path: "/dashboard/member-create", icon: <FaUserTie /> },
        { name: "সকল সদস্যের তথ্য", path: "/dashboard/member-info", icon: <FaRegListAlt /> },
        { name: "সদস্যের তালিকা", path: "/dashboard/member-list", icon: <FaUsers /> },
        // { name: "সমিতির ফী কালেকশন", path: "/dashboard/fee-collection", icon: <FaMoneyBillWave /> },
        // { name: "সমিতির সকল ফী কালেকশন", path: "/dashboard/all-fees", icon: <MdOutlinePayments /> },
        // { name: "বিলম্ব সার্ভিস চার্জ কালেকশন", path: "/dashboard/late-fee", icon: <FaCoins /> },
        // { name: "সার্ভিস চার্জ", path: "/dashboard/service-fee", icon: <FaCoins /> },
      ],
    },
    {
      name: "লোন / লোন ব্যবস্থাপনা",
      icon: <FaWallet />,
      subMenu: [
        // { name: "", path: "/dashboard/loan-management", icon: <FaRegMoneyBillAlt /> },
        { name: "লোন প্রদান করুন", path: "/dashboard/loan-create", icon: <FaCoins /> },
        { name: "সকল লোনের তথ্য", path: "/dashboard/all-loans", icon: <FaRegListAlt /> },
        // { name: "লোন এবং সঞ্চয় কালেকশন", path: "/dashboard/loan-savings-collection", icon: <MdSavings /> },
        { name: "লোনের কিস্তি কালেকশন", path: "/dashboard/loan-installment-collection", icon: <MdAccessTime /> },
        { name: "লোনের সকল কিস্তি কালেকশন", path: "/dashboard/all-loan-installments", icon: <MdAccessTime /> },
        // { name: "লোনের কিস্তির তারিখ", path: "/dashboard/installment-date", icon: <MdAccessTime /> },
        { name: "আজ লোনের কিস্তির তারিখ", path: "/dashboard/today-installment", icon: <MdAccessTime /> },
        { name: "লোনের আবেদন ফর্ম", path: "/dashboard/loan-application", icon: <FaFileAlt /> },
        { name: "লোন বন্ধ করুন", path: "/dashboard/close-loan", icon: <FaCoins /> },
        { name: "কিস্তির তারিখ মেয়াদ উত্তীর্ণ - সদস্য", path: "/dashboard/expire", icon: <MdAccessTime /> },
      ],
    },
    {
      name: "FDR",
      icon: <FaCalculator />,
      subMenu: [
        { name: "FDR ক্যালকুলেটর", path: "/dashboard/fdr-calculator", icon: <FaCalculator /> },
        { name: "FDR স্কিম তৈরি করুন", path: "/dashboard/fdr-scheme-create", icon: <FaFileAlt /> },
        { name: "FDR সেটিং এবং কালেকশন", path: "/dashboard/fdr-settings", icon: <FaCoins /> },
        { name: "সকল FDR কালেকশন", path: "/dashboard/all-fdr", icon: <MdOutlinePayments /> },
        { name: "FDR ব্যবস্থাপনা", path: "/dashboard/fdr-management", icon: <FaChartPie /> },
        { name: "FDR কালেকশন রিপোর্ট", path: "/dashboard/fdr-collection-report", icon: <FaFileAlt /> },
        { name: "FDR উত্তোলন রিপোর্ট", path: "/dashboard/fdr-withdraw-report", icon: <FaFileAlt /> },
        { name: "FDR জমা এবং উত্তোলন রিপোর্ট", path: "/dashboard/fdr-deposit-withdraw-report", icon: <FaFileAlt /> },
        // { name: "FDR প্রদানক্রিত লাভ রিপোর্ট", path: "/dashboard/fdr-profit-report", icon: <FaCoins /> },
        // { name: "সার্ভিস চার্জ কর্তন রিপোর্ট", path: "/dashboard/fdr-service-charge-report", icon: <FaCoins /> },
        // { name: "সদস্য অনুসারে FDR লেনদেন রিপোর্ট", path: "/dashboard/fdr-member-report", icon: <FaUsers /> },
      ],
    },
    {
      name: "DPS ব্যবস্থাপনা",
      icon: <MdSavings />,
      subMenu: [
        { name: "DPS ক্যালকুলেটর", path: "/dashboard/dps-calculator", icon: <FaCalculator /> },
        { name: "আজ DPS এর কিস্তি দেয়ার তারিখ", path: "/dashboard/dps-today", icon: <MdAccessTime /> },
        { name: "DPS স্কিম তৈরী করুন", path: "/dashboard/dps-scheme-create", icon: <FaFileAlt /> },
        { name: "সকল DPS স্কিম", path: "/dashboard/all-dps-schemes", icon: <MdOutlinePayments /> },
        { name: "DPS স্কিম সেটিং করুন", path: "/dashboard/dps-scheme-settings", icon: <FaCoins /> },
        { name: "DPS কালেকশন করুন", path: "/dashboard/dps-collection", icon: <FaMoneyBillWave /> },
        { name: "সকল DPS কালেকশন", path: "/dashboard/all-dps-collection", icon: <MdOutlinePayments /> },
        { name: "DPS ব্যবস্থাপনা", path: "/dashboard/dps-management", icon: <FaChartPie /> },
        { name: "দৈনিক DPS কালেকশন রিপোর্ট", path: "/dashboard/dps-daily-collection-report", icon: <FaFileAlt /> },
        // { name: "দৈনিক DPS উত্তোলন রিপোর্ট", path: "/dashboard/dps-daily-withdraw-report", icon: <FaFileAlt /> },
        // { name: "DPS লভ্যাংশ প্রদান রিপোর্ট", path: "/dashboard/dps-dividend-report", icon: <FaCoins /> },
        // { name: "DPS সার্ভিস চার্জ কর্তন রিপোর্ট", path: "/dashboard/dps-service-charge-report", icon: <FaCoins /> },
        { name: "সকল DPS সদস্যের লেনদেন রিপোর্ট", path: "/dashboard/dps-member-report", icon: <FaUsers /> },
      ],
    },
    {
      name: "জমা-খরচ বিভাগ",
      icon: <FaWallet />,
      subMenu: [
        { name: "খরচের খাত ব্যবস্থাপনা", path: "/dashboard/expense-head-management", icon: <FaRegListAlt /> },
        { name: "অন্যান্য আয়-ব্যয়ের খাত", path: "/dashboard/other-income-expense", icon: <FaRegListAlt /> },
        { name: "অন্যান্য নগদ জমার খাত", path: "/dashboard/other-cash-deposit", icon: <FaCoins /> },
        { name: "বেতনের রিপোর্ট", path: "/dashboard/salary-report", icon: <FaFileAlt /> },
        { name: "হিসাব শুরুর ক্যাশ টাকা", path: "/dashboard/opening-cash", icon: <FaWallet /> },
        { name: "খরচের রিপোর্ট", path: "/dashboard/expense-report", icon: <FaFileAlt /> },
      ],
    },
    {
      name: "সমিতি ব্যবস্থাপনা রিপোর্ট",
      icon: <FaChartPie />,
      subMenu: [
        { name: "সার্ভিস চার্জ রিপোর্ট", path: "/dashboard/service-charge-report", icon: <FaFileAlt /> },
        { name: "দৈনিক কালেকশন রিপোর্ট", path: "/dashboard/daily-collection-report", icon: <FaFileAlt /> },
        { name: "দৈনিক লেনদেন রিপোর্ট", path: "/dashboard/daily-transaction-report", icon: <FaFileAlt /> },
        { name: "দৈনিক প্রদান রিপোর্ট", path: "/dashboard/daily-payment-report", icon: <FaFileAlt /> },
        { name: "হাতে নগদ রিপোর্ট", path: "/dashboard/cash-on-hand-report", icon: <FaWallet /> },
        { name: "সকল সদস্যের ব্যালেন্স রিপোর্ট", path: "/dashboard/member-balance-report", icon: <FaUsers /> },
        { name: "লভ্যাংশ রিপোর্ট", path: "/dashboard/dividend-report", icon: <FaCoins /> },
        { name: "কিস্তি এর উপর ভিত্তি করে লভ্যাংশ রিপোর্ট", path: "/dashboard/dividend-by-installment", icon: <FaCoins /> },
        { name: "বিলম্ব সার্ভিস চার্জ রিপোর্ট", path: "/dashboard/late-service-charge-report", icon: <FaCoins /> },
        { name: "সমিতি ফী কালেকশন রিপোর্ট", path: "/dashboard/society-fee-report", icon: <FaMoneyBillWave /> },
        { name: "ভর্তি ফি কালেকশন রিপোর্ট", path: "/dashboard/admission-fee-report", icon: <FaMoneyBillWave /> },
        { name: "আজ যাদের প্রদানকৃত টাকা এন্ট্রি করা হয়েছে", path: "/dashboard/today-paid-report", icon: <MdAccessTime /> },
        { name: "আজ যাদের কালেকশন এন্ট্রি করা হয়েছে", path: "/dashboard/today-collection-report", icon: <MdAccessTime /> },
        { name: "আজ যাদের লেনদেন এন্ট্রি করা হয়েছে", path: "/dashboard/today-transaction-report", icon: <MdAccessTime /> },
      ],
    },
  ];

const Aside = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <aside className="w-1/5 min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-50 border-r border-gray-200 p-6">
    <Link to="/">
      <h2 className="text-xl md:text-2xl font-bold border-b border-gray-300 pb-5 text-gray-800 mb-6 flex items-center gap-5">
        <FaArrowLeft /> হোমপেজ
      </h2>
    </Link>
  
    <ul className="space-y-2">
      {menuCategories.map((category, idx) => (
        <li key={idx}>
          <button
            onClick={() => toggleMenu(idx)}
            className="w-full flex justify-between items-center px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              {category.icon} {/* Category icon */}
              {category.name}
            </span>
            {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
          </button>
  
          {openIndex === idx && (
            <ul className="ml-4 mt-2 space-y-1">
              {category.subMenu.map((item, subIdx) => (
                <li key={subIdx}>
                  <NavLink
                    to={item.path}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-indigo-200 hover:text-gray-900 transition-all duration-200"
                  >
                    {item.icon} {/* Sub-menu icon */}
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </aside>
  
  );
};

export default Aside;
