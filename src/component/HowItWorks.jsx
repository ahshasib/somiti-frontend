import React from "react";
import { FaUserTie, FaUsers, FaMoneyBillWave, FaFileAlt } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="py-20 relative">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-50 z-100"></div>
        <div className=" absolute bottom-0 right-0 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-40 "></div>
      <div className="w-11/12 md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side - Image */}
        <div data-aos="fade-right">
          <img
            src="/6.jpg" // এখানে তোমার নিজের ইমেজ URL দাও
            alt="How it works illustration"
            className="w-full "
          />
        </div>

        {/* Right Side - Steps */}
        <div data-aos="fade-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            কিভাবে কাজ করে?
          </h2>
          <p className="text-gray-600 mb-8">
            আমাদের সমিতি ম্যানেজমেন্ট সিস্টেম ব্যবহার করা খুব সহজ। নিচের ধাপগুলো
            অনুসরণ করুন আর সহজেই সবকিছু ম্যানেজ করুন।
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <FaUserTie className="text-3xl text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-700">স্টাফ লগইন করুন</h3>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <FaUsers className="text-3xl text-green-600" />
              <h3 className="text-lg font-semibold text-gray-700">সদস্য যোগ করুন</h3>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <FaMoneyBillWave className="text-3xl text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-700">ফী/সঞ্চয় এন্ট্রি করুন</h3>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <FaFileAlt className="text-3xl text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-700">রিপোর্ট পান</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
