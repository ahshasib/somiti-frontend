import React from "react";
import { Link } from "react-router";
import {
  FaUserTie,
  FaUsers,
  FaMoneyBillWave,
  FaRegListAlt,
  FaTasks,
  FaChartPie,
  FaArrowLeft,
} from "react-icons/fa";
import {
  MdAdminPanelSettings,
  MdOutlinePayments,
  MdAccessTime,
} from "react-icons/md";

const menuItems = [
  { name: "স্টাফ লগইন", path: "/dashboard/staff-login", icon: <FaUserTie /> },
  { name: "সমিতি কালেক্টর", path: "/dashboard/collector", icon: <MdAdminPanelSettings /> },
  { name: "স্টাফ পদবি", path: "/dashboard/designation", icon: <FaTasks /> },
  { name: "স্টাফ নাম", path: "/dashboard/staff-name", icon: <FaUsers /> },
  { name: "স্টাফ অনুমতি", path: "/dashboard/permission", icon: <FaChartPie /> },
  { name: "এলাকা", path: "/dashboard/area", icon: <FaRegListAlt /> },
  { name: "সদস্য তৈরি", path: "/dashboard/member-create", icon: <FaUsers /> },
  { name: "সদস্য তথ্য", path: "/dashboard/member-info", icon: <FaRegListAlt /> },
  { name: "সদস্য তালিকা", path: "/dashboard/member-list", icon: <FaUsers /> },
  { name: "ফী কালেকশন", path: "/dashboard/fee-collection", icon: <FaMoneyBillWave /> },
  { name: "সকল ফী", path: "/dashboard/all-fees", icon: <MdOutlinePayments /> },
  { name: "বিলম্ব চার্জ", path: "/dashboard/late-fee", icon: <FaMoneyBillWave /> },
  { name: "সার্ভিস চার্জ", path: "/dashboard/service-fee", icon: <FaMoneyBillWave /> },
  { name: "কিস্তির তারিখ", path: "/dashboard/installment-date", icon: <MdAccessTime /> },
  { name: "মেয়াদ উত্তীর্ণ", path: "/dashboard/expire", icon: <MdAccessTime /> },
  { name: "সঞ্চয় ব্যবস্থাপনা", path: "/dashboard/savings", icon: <FaChartPie /> },
  { name: "সঞ্চয় কিস্তি", path: "/dashboard/savings-installment", icon: <MdOutlinePayments /> },
  { name: "সকল সঞ্চয় কিস্তি", path: "/dashboard/all-savings", icon: <MdOutlinePayments /> },
];

const Aside = () => {
  return (
    <aside className="w-1/5 min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-50 border-r border-gray-200 p-6">
      <Link to = "/"><h2 className="text-xl md:text-2xl font-bold border-b border-gray-300 pb-5 text-gray-800 mb-6 flex items-center gap-5"> <FaArrowLeft />হোমপেজ </h2></Link>

      <ul className="space-y-2">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <Link
              to={item.path}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white transition-all duration-300"
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
