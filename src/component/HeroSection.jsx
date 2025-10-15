import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="relative bg-white min-h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Bubble Shadow Effect */}
            <div className="absolute hidden md:block -top-20 -left-20 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-50 z-100"></div>
            <div className=" absolute hidden md:block bottom-0 right-0 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-40 z-100"></div>

            {/* Content */}
            <div className="w-11/12 md:w-10/12 mx-auto grid md:grid-cols-2 gap-10 items-center z-10">
                {/* Left Side Text */}
                <div className="space-y-5">
                    <h1 className="text-4xl md:text-3xl lg:text-5xl font-bold leading-tight 
               bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 
               bg-clip-text text-transparent">
                        স্বাগতম <span className="from-pink-500 via-red-500 to-yellow-500 bg-gradient-to-r bg-clip-text text-transparent">সমিতি</span> প্ল্যাটফর্মে
                    </h1>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        সদস্য, ফি, সঞ্চয় এবং স্টাফ ব্যবস্থাপনা করুন আরও সহজভাবে, সবকিছু এক জায়গায়। <br />
                        আপনার সমিতির কার্যক্রম এখন হবে আরও স্বচ্ছ, সঠিক এবং দ্রুত। <br />
                        সময় ও খরচ বাঁচিয়ে আনুন আধুনিক ব্যবস্থাপনার সুবিধা।
                    </p>
                    <Link to="/dashboard">
                    <button className="px-6 py-3 cursor-pointer text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 transition-all duration-500">
                        শুরু করুন
                    </button>
                    </Link>
                </div>



                {/* Right Side Image */}
                <div className="flex justify-center w-full">
                    <img
                        src="/3.jpg"
                        alt="Hero Illustration"
                        className="w-full md:w-full "
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
