import React, { useRef } from "react";

const LoanApplicationForm = () => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // page reload করে state ফিরিয়ে আনা
  };

  return (
    <div className="p-6">
      <div ref={printRef} className="bg-white p-8 max-w-[210mm] mx-auto border border-gray-300">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold">উত্তরন সঞ্চয় ও ঋনদান সমবায় সমিতি লিঃ</h1>
          <p>বাদুরতলা বাজার</p>
          <p>01730848524</p>
          <p>রেজিস্ট্রেশন নম্বরঃ ২১ঝাল</p>
          <p>রেজিস্ট্রেশন তারিখঃ 24/04/2013</p>
        </div>

        {/* Title & Date */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold">লোন প্রদানের জন্য আবেদন পত্র</h2>
          <p>{new Date().toLocaleDateString("bn-BD")}</p>
        </div>

        {/* To */}
        <div className="mb-4">
          <p>বরাবর</p>
          <p>সভাপতি</p>
          <p>উত্তরন সঞ্চয় ও ঋনদান সমবায় সমিতি লিঃ</p>
          <p>বাদুরতলা বাজার</p>
        </div>

        {/* Subject & Intro */}
        <div className="mb-4">
          <p>বিষয়: লোন প্রদানের জন্য আবেদন পত্র।</p>
          <p>
            জনাব, যথাবিহিত সম্মান প্রদর্শন পূর্বক নিবেদন এই যে, উত্তরন সঞ্চয়
            ও ঋনদান সমবায় সমিতি লিঃ এর একজন নিয়মিত সদস্য । আমি আপনার
            প্রতিষ্ঠান হতে 
            ................................................. টাকা লোন নেওয়ার জন্য
            আবেদন করিতেছি। আমি নিয়মিত কিস্তি প্রদান করে যথাসময়ের মধ্যে সম্পূর্ণ
            লোন পরিশোধ করিব।
          </p>
          <p>
            নিম্নে আমার প্রয়োজনীয় তথ্যাবলী নির্ভুল ভাবে পেশ করেছি এবং
            প্রয়োজনীয় কাগজপত্র সংযুক্ত করে দিয়েছি। তথ্য সংক্রান্ত যে কোন
            ত্রুটি-বিচ্যুতির জন্য আমি দায়ী থাকবো।
          </p>
        </div>

        {/* Member Info */}
        <div className="mb-4 space-y-2">
          <h3 className="font-bold">সদস্যর তথ্য</h3>
          <div>
            <label>সদস্যর নামঃ </label>
            <input type="text" className="border px-2 py-1 w-full" />
          </div>
          <div>
            <label>মোবাইল নম্বরঃ </label>
            <input type="text" className="border px-2 py-1 w-full" />
          </div>
          <div>
            <label>ঠিকানাঃ </label>
            <input type="text" className="border px-2 py-1 w-full" />
          </div>
          <div>
            <label>জাতীয় পরিচয় পত্রঃ </label>
            <input type="text" className="border px-2 py-1 w-full" />
          </div>
        </div>

        {/* Guarantor Info */}
        <div className="mb-4 space-y-2">
          <h3 className="font-bold">জামানতকারীর তথ্য</h3>
          <div>
            <label>নামঃ </label>
            <input type="text" className="border px-2 py-1 w-full" />
          </div>
          <div>
            <label>মোবাইল নম্বরঃ </label>
            <input type="text" className="border px-2 py-1 w-full" />
          </div>
          <div>
            <label>ঠিকানাঃ </label>
            <input type="text" className="border px-2 py-1 w-full" />
          </div>
          <div>
            <label>জন্ম তারিখঃ </label>
            <input type="date" className="border px-2 py-1 w-full" />
          </div>
          <div>
            <label>পরিচয় পত্র নম্বরঃ </label>
            <input type="text" className="border px-2 py-1 w-full" />
          </div>
        </div>

        {/* Guarantor & Member Declaration */}
        <div className="mb-4">
          <h3 className="font-bold">জামানতকারীর অঙ্গীকারনামা</h3>
          <p>
            আমি এই মর্মে অঙ্গীকার করিতেছি যে, উল্লেখিত আবেদনকারী ব্যক্তি আমার
            পরিচিত। আমি তাহাকে ব্যক্তিগতভাবে চিনি ও জানি। উল্লিখিত ব্যক্তি যদি
            লোন গ্রহণ করিয়া নিয়ম বহির্ভূতভাবে টাকা পরিশোধ করতে ব্যর্থ হয়,
            তাহলে উল্লেখিত টাকার দায় - দায়িত্ব বহন করিতে বাধ্য থাকিব।
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-bold">লোন গ্রহণকারীর অঙ্গীকারনামা</h3>
          <p>
            আমি আপনার সংগঠনের সকল নিয়ম কানুন মানিয়া চলিতে বাধ্য থাকিবো এবং
            নিয়মিত যথাসময়ের মধ্যে আমার লোন পরিশোধ করিব। অন্যথায় সমিতির
            নিয়মানুসারে কর্তৃপক্ষ আমার বিরুদ্ধে আইনানুগ ব্যবস্থা গ্রহণ করিলে
            আমি তাহা মানিয়া লইতে বাধ্য থাকিব।
          </p>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center">
            <p>সভাপতির স্বাক্ষর ও সিল</p>
          </div>
          <div className="text-center">
            <p>সম্পাদক স্বাক্ষর ও সিল</p>
          </div>
          <div className="text-center col-span-2 mt-4">
            <p>আবেদনকারীর স্বাক্ষর</p>
          </div>
          <div className="text-center col-span-2 mt-2">
            <p>জামানতকারীর স্বাক্ষর</p>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="text-center mt-6">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default LoanApplicationForm;
