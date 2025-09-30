import React, { useEffect } from "react";
import { FaUsers, FaHandshake, FaTrophy, FaClock } from "react-icons/fa";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";

const Statistics = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="relative py-20 ">
        <div className="absolute -top-0 -left-20 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-40 z-0"></div>
      <div className="w-11/12 md:w-10/12 mx-auto text-center z-100">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 ">
          আমাদের সাফল্যের পরিসংখ্যান
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          সমিতি প্ল্যাটফর্মের মাধ্যমে আমাদের অর্জন ও সদস্যদের সফলতা এখানে তুলে ধরা হলো।
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div
            className="bg-gradient-to-r from-blue-100 to-indigo-100 shadow-md rounded-2xl p-6 hover:shadow-xl transition"
            data-aos="fade-up"
          >
            <FaUsers className="text-5xl text-blue-600 mx-auto mb-4" />
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl py-3 px-5 inline-block mb-2">
              <h3 className="text-2xl md:text-3xl font-bold">
                <CountUp end={5000} duration={3} enableScrollSpy />+
              </h3>
            </div>
            <p className="text-gray-600 font-bold text-lg">সদস্য</p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-gradient-to-r from-green-100 to-emerald-100 shadow-md rounded-2xl p-6 hover:shadow-xl transition"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FaHandshake className="text-5xl text-green-600 mx-auto mb-4" />
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl py-3 px-5 inline-block mb-2">
              <h3 className="text-2xl md:text-3xl font-bold">
                <CountUp end={150} duration={3} enableScrollSpy />+
              </h3>
            </div>
            <p className="text-gray-600 font-bold text-lg">চুক্তি সম্পন্ন</p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-gradient-to-r from-yellow-100 to-orange-100 shadow-md rounded-2xl p-6 hover:shadow-xl transition"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <FaTrophy className="text-5xl text-yellow-500 mx-auto mb-4" />
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl py-3 px-5 inline-block mb-2">
              <h3 className="text-2xl md:text-3xl font-bold">
                <CountUp end={50} duration={3} enableScrollSpy />+
              </h3>
            </div>
            <p className="text-gray-600 font-bold text-lg">পুরষ্কার</p>
          </div>

          {/* Card 4 */}
          <div
            className="bg-gradient-to-r from-purple-100 to-pink-100 shadow-md rounded-2xl p-6 hover:shadow-xl transition"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <FaClock className="text-5xl text-purple-600 mx-auto mb-4" />
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 px-5 inline-block mb-2">
              <h3 className="text-2xl md:text-3xl font-bold">
                <CountUp end={10} duration={3} enableScrollSpy />+
              </h3>
            </div>
            <p className="text-gray-600 font-bold text-lg">বছরের অভিজ্ঞতা</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
