// import React, { useState } from "react";
// import { Link, NavLink } from "react-router";
// import {
//     FaUsers,
//     FaUserTie,
//     FaMoneyBillWave,
//     FaRegListAlt,
//     FaChartPie,
//     FaCalculator,
//     FaFileAlt,
//     FaWallet,
//     FaRegMoneyBillAlt,
//     FaArrowLeft,
//     FaCoins,
//     FaChevronUp,
//     FaChevronDown,
//   } from "react-icons/fa";
//   import { MdOutlinePayments, MdAccessTime, MdSavings } from "react-icons/md";


// const menuCategories = [
//     {
//       name: "সদস্য ব্যবস্থাপনা",
//       icon: <FaUsers />,
//       subMenu: [
//         // { name: "এলাকা তৈরী করুন", path: "/dashboard/area", icon: <FaRegListAlt /> },
//         { name: "সদস্য তৈরী করুন", path: "/dashboard/member-create", icon: <FaUserTie /> },
//         { name: "সকল সদস্যের তথ্য", path: "/dashboard/member-info", icon: <FaRegListAlt /> },
//         { name: "সদস্যের তালিকা", path: "/dashboard/member-list", icon: <FaUsers /> },
//         // { name: "সমিতির ফী কালেকশন", path: "/dashboard/fee-collection", icon: <FaMoneyBillWave /> },
//         // { name: "সমিতির সকল ফী কালেকশন", path: "/dashboard/all-fees", icon: <MdOutlinePayments /> },
//         // { name: "বিলম্ব সার্ভিস চার্জ কালেকশন", path: "/dashboard/late-fee", icon: <FaCoins /> },
//         // { name: "সার্ভিস চার্জ", path: "/dashboard/service-fee", icon: <FaCoins /> },
//       ],
//     },
//     {
//       name: "লোন ব্যবস্থাপনা",
//       icon: <FaWallet />,
//       subMenu: [
//         // { name: "", path: "/dashboard/loan-management", icon: <FaRegMoneyBillAlt /> },
//         { name: "লোন প্রদান করুন", path: "/dashboard/loan-create", icon: <FaCoins /> },
//         { name: "সকল লোনের তথ্য", path: "/dashboard/all-loans", icon: <FaRegListAlt /> },
//         // { name: "লোন এবং সঞ্চয় কালেকশন", path: "/dashboard/loan-savings-collection", icon: <MdSavings /> },
//         { name: "লোনের কিস্তি কালেকশন", path: "/dashboard/loan-installment-collection", icon: <MdAccessTime /> },
//         { name: "লোনের সকল কিস্তি কালেকশন", path: "/dashboard/all-loan-installments", icon: <MdAccessTime /> },
//         // { name: "লোনের কিস্তির তারিখ", path: "/dashboard/installment-date", icon: <MdAccessTime /> },
//         { name: "আজ লোনের কিস্তির তারিখ", path: "/dashboard/today-installment", icon: <MdAccessTime /> },
//         { name: "লোনের আবেদন ফর্ম", path: "/dashboard/loan-application", icon: <FaFileAlt /> },
//         { name: "লোন বন্ধ করুন", path: "/dashboard/close-loan", icon: <FaCoins /> },
//         { name: "কিস্তির তারিখ মেয়াদ উত্তীর্ণ - সদস্য", path: "/dashboard/expire", icon: <MdAccessTime /> },
//       ],
//     },
//     {
//       name: "FDR",
//       icon: <FaCalculator />,
//       subMenu: [
//         { name: "FDR ক্যালকুলেটর", path: "/dashboard/fdr-calculator", icon: <FaCalculator /> },
//         { name: "FDR স্কিম তৈরি করুন", path: "/dashboard/fdr-scheme-create", icon: <FaFileAlt /> },
//         { name: "FDR সেটিং এবং কালেকশন", path: "/dashboard/fdr-settings", icon: <FaCoins /> },
//         { name: "সকল FDR কালেকশন", path: "/dashboard/all-fdr", icon: <MdOutlinePayments /> },
//         { name: "FDR ব্যবস্থাপনা", path: "/dashboard/fdr-management", icon: <FaChartPie /> },
//         { name: "FDR কালেকশন রিপোর্ট", path: "/dashboard/fdr-collection-report", icon: <FaFileAlt /> },
//         // { name: "FDR উত্তোলন রিপোর্ট", path: "/dashboard/fdr-withdraw-report", icon: <FaFileAlt /> },
//         { name: "FDR জমা এবং উত্তোলন রিপোর্ট", path: "/dashboard/fdr-deposit-withdraw-report", icon: <FaFileAlt /> },
//         // { name: "FDR প্রদানক্রিত লাভ রিপোর্ট", path: "/dashboard/fdr-profit-report", icon: <FaCoins /> },
//         // { name: "সার্ভিস চার্জ কর্তন রিপোর্ট", path: "/dashboard/fdr-service-charge-report", icon: <FaCoins /> },
//         // { name: "সদস্য অনুসারে FDR লেনদেন রিপোর্ট", path: "/dashboard/fdr-member-report", icon: <FaUsers /> },
//       ],
//     },
//     {
//       name: "DPS ব্যবস্থাপনা",
//       icon: <MdSavings />,
//       subMenu: [
//         { name: "DPS ক্যালকুলেটর", path: "/dashboard/dps-calculator", icon: <FaCalculator /> },
//         { name: "আজ DPS এর কিস্তি দেয়ার তারিখ", path: "/dashboard/dps-today", icon: <MdAccessTime /> },
//         { name: "DPS স্কিম তৈরী করুন", path: "/dashboard/dps-scheme-create", icon: <FaFileAlt /> },
//         { name: "সকল DPS স্কিম", path: "/dashboard/all-dps-schemes", icon: <MdOutlinePayments /> },
//         { name: "DPS স্কিম সেটিং করুন", path: "/dashboard/dps-scheme-settings", icon: <FaCoins /> },
//         { name: "DPS কালেকশন করুন", path: "/dashboard/dps-collection", icon: <FaMoneyBillWave /> },
//         { name: "সকল DPS কালেকশন", path: "/dashboard/all-dps-collection", icon: <MdOutlinePayments /> },
//         { name: "DPS ব্যবস্থাপনা", path: "/dashboard/dps-management", icon: <FaChartPie /> },
//         { name: "দৈনিক DPS কালেকশন রিপোর্ট", path: "/dashboard/dps-daily-collection-report", icon: <FaFileAlt /> },
//         // { name: "দৈনিক DPS উত্তোলন রিপোর্ট", path: "/dashboard/dps-daily-withdraw-report", icon: <FaFileAlt /> },
//         // { name: "DPS লভ্যাংশ প্রদান রিপোর্ট", path: "/dashboard/dps-dividend-report", icon: <FaCoins /> },
//         // { name: "DPS সার্ভিস চার্জ কর্তন রিপোর্ট", path: "/dashboard/dps-service-charge-report", icon: <FaCoins /> },
//         { name: "সকল DPS সদস্যের লেনদেন রিপোর্ট", path: "/dashboard/dps-member-report", icon: <FaUsers /> },
//       ],
//     },
//     {
//       name: "জমা-খরচ বিভাগ",
//       icon: <FaWallet />,
//       subMenu: [
//         { name: "খরচের খাত ব্যবস্থাপনা", path: "/dashboard/expense-head-management", icon: <FaRegListAlt /> },
//         { name: "অন্যান্য আয়-ব্যয়ের খাত", path: "/dashboard/other-income-expense", icon: <FaRegListAlt /> },
//         // { name: "অন্যান্য নগদ জমার খাত", path: "/dashboard/other-cash-deposit", icon: <FaCoins /> },
//         { name: "বেতনের রিপোর্ট", path: "/dashboard/salary-report", icon: <FaFileAlt /> },
//         { name: "হিসাব শুরুর ক্যাশ টাকা", path: "/dashboard/opening-cash", icon: <FaWallet /> },
//         // { name: "খরচের রিপোর্ট", path: "/dashboard/expense-report", icon: <FaFileAlt /> },
//       ],
//     },
//     {
//       name: "সমিতি ব্যবস্থাপনা রিপোর্ট",
//       icon: <FaChartPie />,
//       subMenu: [
//         // { name: "সার্ভিস চার্জ রিপোর্ট", path: "/dashboard/service-charge-report", icon: <FaFileAlt /> },
//         { name: "দৈনিক কালেকশন রিপোর্ট", path: "/dashboard/daily-collection-report", icon: <FaFileAlt /> },
//         { name: "দৈনিক লেনদেন রিপোর্ট", path: "/dashboard/daily-transaction-report", icon: <FaFileAlt /> },
//         // { name: "দৈনিক প্রদান রিপোর্ট", path: "/dashboard/daily-payment-report", icon: <FaFileAlt /> },
//         // { name: "হাতে নগদ রিপোর্ট", path: "/dashboard/cash-on-hand-report", icon: <FaWallet /> },
//         { name: "সকল সদস্যের ব্যালেন্স রিপোর্ট", path: "/dashboard/member-balance-report", icon: <FaUsers /> },
//         { name: "লভ্যাংশ রিপোর্ট", path: "/dashboard/dividend-report", icon: <FaCoins /> },
//         // { name: "কিস্তি এর উপর ভিত্তি করে লভ্যাংশ রিপোর্ট", path: "/dashboard/dividend-by-installment", icon: <FaCoins /> },
//         // { name: "বিলম্ব সার্ভিস চার্জ রিপোর্ট", path: "/dashboard/late-service-charge-report", icon: <FaCoins /> },
//         // { name: "সমিতি ফী কালেকশন রিপোর্ট", path: "/dashboard/society-fee-report", icon: <FaMoneyBillWave /> },
//         // { name: "ভর্তি ফি কালেকশন রিপোর্ট", path: "/dashboard/admission-fee-report", icon: <FaMoneyBillWave /> },
//         // { name: "আজ যাদের প্রদানকৃত টাকা এন্ট্রি করা হয়েছে", path: "/dashboard/today-paid-report", icon: <MdAccessTime /> },
//         // { name: "আজ যাদের কালেকশন এন্ট্রি করা হয়েছে", path: "/dashboard/today-collection-report", icon: <MdAccessTime /> },
//         // { name: "আজ যাদের লেনদেন এন্ট্রি করা হয়েছে", path: "/dashboard/today-transaction-report", icon: <MdAccessTime /> },
//       ],
//     },
//   ];
//   const user = JSON.parse(localStorage.getItem("user"));
// const Aside = ({ isOpen, onClose }) => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleMenu = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <>
//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//   className={`
//     fixed lg:relative z-50 w-64 mt-16 lg:mt-0 h-full lg:h-auto bg-gradient-to-b from-gray-200 via-gray-100 to-gray-200 border-r border-gray-200 p-6
//     transform transition-transform duration-300
//     ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
//     overflow-y-auto
//   `}
// >
//    {/* Home link */}
//    <Link to="/" onClick={onClose} className="mb-6 block">
//     <h2 className="text-lg md:text-xl font-bold border-b border-gray-300 pb-5 text-gray-800 flex items-center gap-5">
//       <FaArrowLeft /> হোমপেজ
//     </h2>
//   </Link>

//   {/* Profile Section */}
//   <div className="flex flex-col items-center mb-6 p-4 bg-white rounded-2xl shadow-md">
//   <img
//     src={user?.img || "/default-profile.jpg"} // যদি user.image না থাকে default image
//     alt="Profile"
//     className="w-20 h-20 rounded-full mb-3 border-2 border-indigo-500"
//   />
//   <h3 className="text-lg font-semibold text-gray-800">{user?.name || "Unknown User"}</h3>
//   <p className="text-sm text-gray-500">Role: {user?.role || "-"}</p>
//   <p className="text-sm text-gray-500">ID: {user?._id || "-"}</p>
//   <p className="text-sm text-gray-500">Phone: {user?.mobileNumber || "-"}</p>
// </div>


//   {/* Menu */}
//   <ul className="space-y-3">
//     {menuCategories.map((category, idx) => (
//       <li key={idx}>
//         <button
//           onClick={() => toggleMenu(idx)}
//           className="w-full flex justify-between items-center px-3 py-4 text-gray-800 font-semibold text-sm hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all duration-300 border-b border-gray-200"
//         >
//           <span className="flex items-center gap-3">
//             <span className="text-lg text-indigo-600">{category.icon}</span>
//             {category.name}
//           </span>
//           <span className="text-gray-500">{openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}</span>
//         </button>

//         {openIndex === idx && (
//           <ul className="ml-4 mt-2 space-y-1">
//             {category.subMenu.map((item, subIdx) => (
//               <li key={subIdx}>
//                 <NavLink
//                   to={item.path}
//                   className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 text-sm font-medium hover:bg-indigo-200 hover:text-gray-900 transition-all duration-200"
//                   onClick={onClose}
//                 >
//                   <span className="text-indigo-600">{item.icon}</span>
//                   {item.name}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         )}
//       </li>
//     ))}
//   </ul>
// </aside>

//     </>
//   );
// };

// export default Aside;


// ✅ Role অনুযায়ী full filtering করা version
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaUsers,
  FaUserTie,
  FaMoneyBillWave,
  FaRegListAlt,
  FaChartPie,
  FaCalculator,
  FaFileAlt,
  FaWallet,
  FaArrowLeft,
  FaCoins,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { MdOutlinePayments, MdAccessTime, MdSavings } from "react-icons/md";

const allMenuCategories = [
  {
    name: "সদস্য ব্যবস্থাপনা",
    icon: <FaUsers />,
    roles: ["admin", "agent", "member"],
    subMenu: [
      { name: "সদস্য তৈরী করুন", path: "/dashboard/member-create", icon: <FaUserTie />, roles: ["admin"] },
      { name: "সকল সদস্যের তথ্য", path: "/dashboard/member-info", icon: <FaRegListAlt />, roles: ["admin"] },
      { name: "সদস্যের তালিকা", path: "/dashboard/member-list", icon: <FaUsers />, roles: ["admin", "agent", "member"] },
    ],
  },
  {
    name: "লোন ব্যবস্থাপনা",
    icon: <FaWallet />,
    roles: ["admin", "agent", "member"],
    subMenu: [
      { name: "লোন প্রদান করুন", path: "/dashboard/loan-create", icon: <FaCoins />, roles: ["admin"] },
      { name: "সকল লোনের তথ্য", path: "/dashboard/all-loans", icon: <FaRegListAlt />, roles: ["admin", "member"] },
      { name: "লোনের কিস্তি কালেকশন", path: "/dashboard/loan-installment-collection", icon: <MdAccessTime />, roles: ["admin", "agent"] },
      { name: "লোনের সকল কিস্তি কালেকশন", path: "/dashboard/all-loan-installments", icon: <MdAccessTime />, roles: ["admin"] },
      { name: "আজ লোনের কিস্তির তারিখ", path: "/dashboard/today-installment", icon: <MdAccessTime />, roles: ["admin", "agent"] },
      { name: "লোনের আবেদন ফর্ম", path: "/dashboard/loan-application", icon: <FaFileAlt />, roles: ["admin"] },

      { name: "কিস্তির তারিখ মেয়াদ উত্তীর্ণ - সদস্য", path: "/dashboard/expire", icon: <MdAccessTime />, roles: ["admin", "agent"] },
      { name: "লোন বন্ধ করুন", path: "/dashboard/close-loan", icon: <FaCoins />, roles: ["admin"] },
    ],
  },
  {
    name: "FDR",
    icon: <FaCalculator />,
    roles: ["admin", "member"],
    subMenu: [
      { name: "FDR ক্যালকুলেটর", path: "/dashboard/fdr-calculator", icon: <FaCalculator />, roles: ["admin", "member"] },
      { name: "FDR স্কিম তৈরি করুন", path: "/dashboard/fdr-scheme-create", icon: <FaFileAlt />, roles: ["admin"] },
      { name: "FDR ব্যবস্থাপনা", path: "/dashboard/fdr-management", icon: <FaChartPie />, roles: ["admin",] },
      { name: "FDR সেটিং এবং কালেকশন", path: "/dashboard/fdr-settings", icon: <FaCoins />, roles: ["admin"] },
      { name: "সকল FDR কালেকশন", path: "/dashboard/all-fdr", icon: <MdOutlinePayments />, roles: ["admin", "member"] },

      { name: "FDR কালেকশন রিপোর্ট", path: "/dashboard/fdr-collection-report", icon: <FaFileAlt />, roles: ["admin"] },
      { name: "FDR জমা এবং উত্তোলন রিপোর্ট", path: "/dashboard/fdr-deposit-withdraw-report", icon: <FaFileAlt />, roles: ["admin"] },
    ],
  },
  {
    name: "DPS ব্যবস্থাপনা",
    icon: <MdSavings />,
    roles: ["admin", "agent", "member"],
    subMenu: [
      { name: "DPS ক্যালকুলেটর", path: "/dashboard/dps-calculator", icon: <FaCalculator />, roles: ["admin", "agent", "member"] },
      { name: "DPS স্কিম তৈরী করুন", path: "/dashboard/dps-scheme-create", icon: <FaFileAlt />, roles: ["admin"] },
      { name: "DPS স্কিম সেটিং করুন", path: "/dashboard/dps-scheme-settings", icon: <FaCoins />, roles: ["admin"] },
      { name: "সকল DPS স্কিম", path: "/dashboard/all-dps-schemes", icon: <MdOutlinePayments />, roles: ["admin", "agent"] },
      { name: "DPS ব্যবস্থাপনা", path: "/dashboard/dps-management", icon: <FaChartPie />, roles: ["admin"] },
      { name: "DPS কালেকশন করুন", path: "/dashboard/dps-collection", icon: <FaMoneyBillWave />, roles: ["admin", "agent"] },
      { name: "সকল DPS কালেকশন", path: "/dashboard/all-dps-collection", icon: <MdOutlinePayments />, roles: ["admin", "agent", "member"] },
      { name: "আজ DPS এর কিস্তি দেয়ার তারিখ", path: "/dashboard/dps-today", icon: <MdAccessTime />, roles: ["admin", "agent"] },
      { name: "দৈনিক DPS কালেকশন রিপোর্ট", path: "/dashboard/dps-daily-collection-report", icon: <FaFileAlt />, roles: ["admin", "agent"] },
      { name: "সকল DPS সদস্যের লেনদেন রিপোর্ট", path: "/dashboard/dps-member-report", icon: <FaUsers />, roles: ["admin"] },

    ],
  },
  {
    name: "জমা-খরচ বিভাগ",
    icon: <FaWallet />,
    roles: ["admin"],
    subMenu: [
      { name: "খরচের খাত ব্যবস্থাপনা", path: "/dashboard/expense-head-management", icon: <FaRegListAlt />, roles: ["admin"] },
      { name: "অন্যান্য আয়-ব্যয়ের খাত", path: "/dashboard/other-income-expense", icon: <FaRegListAlt />, roles: ["admin"] },
      // { name: "অন্যান্য নগদ জমার খাত", path: "/dashboard/other-cash-deposit", icon: <FaCoins /> },
      { name: "বেতনের রিপোর্ট", path: "/dashboard/salary-report", icon: <FaFileAlt />, roles: ["admin"] },
      { name: "হিসাব শুরুর ক্যাশ টাকা", path: "/dashboard/opening-cash", icon: <FaWallet />, roles: ["admin"] },
      // { name: "খরচের রিপোর্ট", path: "/dashboard/expense-report", icon: <FaFileAlt /> },
    ],
  },
  {
    name: "সমিতি ব্যবস্থাপনা রিপোর্ট",
    icon: <FaChartPie />,
    roles: ["admin", "agent", "member"],
    subMenu: [
      { name: "দৈনিক কালেকশন রিপোর্ট", path: "/dashboard/daily-collection-report", icon: <FaFileAlt />, roles: ["admin", "agent", "member"] },
      { name: "দৈনিক লেনদেন রিপোর্ট", path: "/dashboard/daily-transaction-report", icon: <FaFileAlt />, roles: ["admin"] },
      { name: "সকল সদস্যের ব্যালেন্স রিপোর্ট", path: "/dashboard/member-balance-report", icon: <FaUsers />, roles: ["admin"] },
      { name: "লভ্যাংশ রিপোর্ট", path: "/dashboard/dividend-report", icon: <FaCoins />, roles: ["admin"] },
    ],
  },
];

const Aside = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [logo, setLogo] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ✅ Category ফিল্টার
  const menuCategories = allMenuCategories
    .filter((menu) => menu.roles.includes(role))
    .map((menu) => ({
      ...menu,
      subMenu: menu.subMenu.filter((item) => item.roles.includes(role)), // ✅ submenu filter
    }))
    .filter((menu) => menu.subMenu.length > 0);


    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleUpload = async (e) => {
      e.preventDefault();
      if (!title || !file) {
        alert("Please fill all fields!");
        return;
      }
  
      setLoading(true);
  
      try {
        // 1️⃣ Imgbb API upload
        const formData = new FormData();
        formData.append("image", file);
  
        const imgbbKey = import.meta.env.VITE_IMGBB_KEY; // .env তে রাখা API key
        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
          method: "POST",
          body: formData,
        });
  
        const imgbbData = await imgbbRes.json();
        if (!imgbbData.success) {
          alert("ImgBB upload failed!");
          setLoading(false);
          return;
        }
  
        const logoUrl = imgbbData.data.url; // Imgbb থেকে প্রাপ্ত URL
  
        // 2️⃣ Backend এ POST করে DB তে save করা
        const backendRes = await fetch(`${import.meta.env.VITE_BASE_URL}/api/logo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, logoUrl }),
        });
  
        if (backendRes.ok) {
          alert("Logo uploaded successfully!");
          setTitle("");
          setFile(null);
        } else {
          alert("Failed to save logo to DB.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
      }
  
      setLoading(false);
    };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`
            fixed lg:relative z-50 w-64 mt-16 lg:mt-0 h-full lg:h-auto bg-gradient-to-b from-gray-200 via-gray-100 to-gray-200 border-r border-gray-200 p-6
               transform transition-transform duration-300
              ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
               overflow-y-auto
            `}
      >
        <Link to="/" onClick={onClose} className="mb-6 block">
          <h2 className="text-lg md:text-xl font-bold border-b border-gray-300 pb-5 text-gray-800 flex items-center gap-5">
            <FaArrowLeft /> হোমপেজ
          </h2>
        </Link>

        {/* Profile */}
        <div className="flex flex-col items-center mb-6 p-4 bg-white rounded-2xl shadow-md">
          <img
            src={user?.img || "/default-profile.jpg"}
            alt="Profile"
            className="w-20 h-20 rounded-full mb-3 border-2 border-indigo-500"
          />
          <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
          <p className="text-sm text-gray-500">Role: {user?.role}</p>
          <p className="text-sm text-gray-500">ID: {user?._id || "-"}</p>
          <p className="text-sm text-gray-500">Phone: {user?.mobileNumber || "-"}</p>

          {/* Add Logo Button (Admin Only) */}
          {role === "admin" && (
            <button
              onClick={() => setShowPopup(true)}
              className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              + Add Logo
            </button>
          )}
        </div>

        {/* Menu */}
        <ul className="space-y-3">
          {menuCategories.map((category, idx) => (
            <li key={idx}>
              <button
                onClick={() => toggleMenu(idx)}
                className="w-full flex justify-between items-center px-3 py-4 text-gray-800 font-semibold text-sm hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all duration-300 border-b border-gray-200"
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg text-indigo-600">{category.icon}</span>
                  {category.name}
                </span>
                <span className="text-gray-500">
                  {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>

              {openIndex === idx && (
                <ul className="ml-4 mt-2 space-y-1">
                  {category.subMenu.map((item, subIdx) => (
                    <li key={subIdx}>
                      <NavLink
                        to={item.path}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 text-sm font-medium hover:bg-indigo-200 hover:text-gray-900 transition-all duration-200"
                        onClick={onClose}
                      >
                        <span className="text-indigo-600">{item.icon}</span>
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>


        {/* Popup Modal */}
        {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative animate-fadeIn">
      {/* Header */}
      <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Upload New Logo</h3>

      {/* Form */}
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 font-semibold transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        <button
          type="button"
          onClick={() => setShowPopup(false)}
          className="bg-gray-200 text-gray-800 p-3 rounded-xl hover:bg-gray-300 font-semibold transition"
        >
          Cancel
        </button>
      </form>

      {/* Close Icon */}
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition text-xl font-bold"
      >
        &times;
      </button>
    </div>
  </div>
)}

      </aside>
    </>
  );
};

export default Aside;
