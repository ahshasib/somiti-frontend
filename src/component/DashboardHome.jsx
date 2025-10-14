import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserTie,
  FaRegListAlt,
  FaUsers,
  FaCoins,
  FaFileAlt,
  FaCalculator,
  FaChartPie,
  FaMoneyBillWave,
  FaWallet,
} from "react-icons/fa";
import { MdAccessTime, MdOutlinePayments, MdSavings } from "react-icons/md";

const allMenuCategories = [
  {
    name: "সদস্য ব্যবস্থাপনা",
    icon: <FaUsers />,
    roles: ["admin", "agent", "member"],
    subMenu: [
      {
        name: "সদস্য তৈরী করুন",
        path: "/dashboard/member-create",
        icon: <FaUserTie />,
        roles: ["admin"],
      },
      {
        name: "সকল সদস্যের তথ্য",
        path: "/dashboard/member-info",
        icon: <FaRegListAlt />,
        roles: ["admin"],
      },
      {
        name: "সদস্যের তালিকা",
        path: "/dashboard/member-list",
        icon: <FaUsers />,
        roles: ["admin", "agent", "member"],
      },
    ],
  },
  {
    name: "লোন ব্যবস্থাপনা",
    icon: <FaWallet />,
    roles: ["admin", "agent", "member"],
    subMenu: [
      {
        name: "লোন প্রদান করুন",
        path: "/dashboard/loan-create",
        icon: <FaCoins />,
        roles: ["admin"],
      },
      {
        name: "সকল লোনের তথ্য",
        path: "/dashboard/all-loans",
        icon: <FaRegListAlt />,
        roles: ["admin", "member"],
      },
      {
        name: "লোনের কিস্তি কালেকশন",
        path: "/dashboard/loan-installment-collection",
        icon: <MdAccessTime />,
        roles: ["admin", "agent"],
      },
      {
        name: "লোনের সকল কিস্তি কালেকশন",
        path: "/dashboard/all-loan-installments",
        icon: <MdAccessTime />,
        roles: ["admin"],
      },
      {
        name: "আজ লোনের কিস্তির তারিখ",
        path: "/dashboard/today-installment",
        icon: <MdAccessTime />,
        roles: ["admin", "agent"],
      },
      { name: "লোনের আবেদন ফর্ম", path: "/dashboard/loan-application", icon: <FaFileAlt />,roles: ["admin"] },

      { name: "কিস্তির তারিখ মেয়াদ উত্তীর্ণ - সদস্য", path: "/dashboard/expire", icon: <MdAccessTime />,roles: ["admin", "agent"] },
      {
        name: "লোন বন্ধ করুন",
        path: "/dashboard/close-loan",
        icon: <FaCoins />,
        roles: ["admin"],
      },
    ],
  },
  {
    name: "FDR",
    icon: <FaCalculator />,
    roles: ["admin", "member"],
    subMenu: [
      {
        name: "FDR ক্যালকুলেটর",
        path: "/dashboard/fdr-calculator",
        icon: <FaCalculator />,
        roles: ["admin", "member"],
      },
      {
        name: "FDR স্কিম তৈরি করুন",
        path: "/dashboard/fdr-scheme-create",
        icon: <FaFileAlt />,
        roles: ["admin"],
      },
      {
        name: "FDR সেটিং এবং কালেকশন",
        path: "/dashboard/fdr-settings",
        icon: <FaCoins />,
        roles: ["admin"],
      },
      {
        name: "সকল FDR কালেকশন",
        path: "/dashboard/all-fdr",
        icon: <MdOutlinePayments />,
        roles: ["admin"],
      },
      {
        name: "FDR কালেকশন রিপোর্ট",
        path: "/dashboard/fdr-collection-report",
        icon: <FaFileAlt />,
        roles: ["admin"],
      },
      { name: "FDR জমা এবং উত্তোলন রিপোর্ট", path: "/dashboard/fdr-deposit-withdraw-report", icon: <FaFileAlt />,roles: ["admin"] },
      { name: "FDR ব্যবস্থাপনা", path: "/dashboard/fdr-management", icon: <FaChartPie />,roles: ["admin", "member"] },
    ],
  },
  {
    name: "DPS ব্যবস্থাপনা",
    icon: <MdSavings />,
    roles: ["admin", "agent", "member"],
    subMenu: [
      {
        name: "DPS ক্যালকুলেটর",
        path: "/dashboard/dps-calculator",
        icon: <FaCalculator />,
        roles: ["admin", "agent", "member"],
      },
      {
        name: "DPS স্কিম তৈরী করুন",
        path: "/dashboard/dps-scheme-create",
        icon: <FaFileAlt />,
        roles: ["admin"],
      },
      {
        name: "সকল DPS স্কিম",
        path: "/dashboard/all-dps-schemes",
        icon: <MdOutlinePayments />,
        roles: ["admin", "agent", "member"],
      },
      {
        name: "DPS কালেকশন করুন",
        path: "/dashboard/dps-collection",
        icon: <FaMoneyBillWave />,
        roles: ["admin", "agent"],
      },
      {
        name: "সকল DPS কালেকশন",
        path: "/dashboard/all-dps-collection",
        icon: <MdOutlinePayments />,
        roles: ["admin", "agent"],
      },
      { name: "DPS ব্যবস্থাপনা", path: "/dashboard/dps-management", icon: <FaChartPie />,roles: ["admin"] },
      { name: "দৈনিক DPS কালেকশন রিপোর্ট", path: "/dashboard/dps-daily-collection-report", icon: <FaFileAlt />,roles: ["admin", "agent"] },
      { name: "সকল DPS সদস্যের লেনদেন রিপোর্ট", path: "/dashboard/dps-member-report", icon: <FaUsers />,roles: ["admin","agent","member"] },
      { name: "DPS স্কিম সেটিং করুন", path: "/dashboard/dps-scheme-settings", icon: <FaCoins />,roles: ["admin"] },
      { name: "আজ DPS এর কিস্তি দেয়ার তারিখ", path: "/dashboard/dps-today", icon: <MdAccessTime />,roles: ["admin", "agent"] },

    ],
  },
  {
    name: "জমা-খরচ বিভাগ",
    icon: <FaWallet />,
    roles: ["admin"],
    subMenu: [
      { name: "খরচের খাত ব্যবস্থাপনা", path: "/dashboard/expense-head-management", icon: <FaRegListAlt />,roles: ["admin"] },
      { name: "অন্যান্য আয়-ব্যয়ের খাত", path: "/dashboard/other-income-expense", icon: <FaRegListAlt />,roles: ["admin"] },
      // { name: "অন্যান্য নগদ জমার খাত", path: "/dashboard/other-cash-deposit", icon: <FaCoins /> },
      { name: "বেতনের রিপোর্ট", path: "/dashboard/salary-report", icon: <FaFileAlt />,roles: ["admin"] },
      { name: "হিসাব শুরুর ক্যাশ টাকা", path: "/dashboard/opening-cash", icon: <FaWallet />,roles: ["admin"] },
      // { name: "খরচের রিপোর্ট", path: "/dashboard/expense-report", icon: <FaFileAlt /> },
    ],
  },

  {
    name: "সমিতি ব্যবস্থাপনা রিপোর্ট",
    icon: <FaChartPie />,
    roles: ["admin", "agent", "member"],
    subMenu: [
      {
        name: "দৈনিক কালেকশন রিপোর্ট",
        path: "/dashboard/daily-collection-report",
        icon: <FaFileAlt />,
        roles: ["admin", "agent", "member"],
      },
      {
        name: "দৈনিক লেনদেন রিপোর্ট",
        path: "/dashboard/daily-transaction-report",
        icon: <FaFileAlt />,
        roles: ["admin"],
      },
      {
        name: "সকল সদস্যের ব্যালেন্স রিপোর্ট",
        path: "/dashboard/member-balance-report",
        icon: <FaUsers />,
        roles: ["admin"],
      },
      {
        name: "লভ্যাংশ রিপোর্ট",
        path: "/dashboard/dividend-report",
        icon: <FaCoins />,
        roles: ["admin"],
      },
    ],
  },
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

const DashboardHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // শুধু যেগুলা user.role এর মধ্যে আছে সেগুলা show করবে
  const visibleMenus = allMenuCategories
    .filter((cat) => cat.roles.includes(user?.role))
    .flatMap((cat) =>
      cat.subMenu.filter((sub) => sub.roles.includes(user?.role))
    );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        ড্যাশবোর্ড হোম
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {visibleMenus.map((btn, index) => {
          const gradient = gradients[index % gradients.length];
          return (
            <Link
              key={index}
              to={btn.path}
              className={`flex flex-col items-center justify-center bg-gradient-to-r ${gradient} rounded-2xl shadow hover:shadow-lg transition-all p-4 text-center`}
            >
              <div
                className={`w-14 h-14 flex items-center justify-center mb-3 rounded-full bg-gradient-to-r ${gradient} text-white text-2xl`}
              >
                {btn.icon}
              </div>
              <div
                className={`bg-gradient-to-r ${gradient} text-white rounded-lg py-2 px-4 text-sm font-semibold`}
              >
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
