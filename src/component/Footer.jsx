import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-50 to-purple-50 py-10 mt-16">
      <div className="w-11/12 md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 justify-center">
        
        {/* Left - Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">সমিতি</h2>
          <p className="text-gray-700 w-[50%]">
            সদস্য, ফি, সঞ্চয় ও স্টাফ ব্যবস্থাপনার জন্য সহজ এবং নিরাপদ প্ল্যাটফর্ম।
          </p>
        </div>

        {/* Middle - Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">যোগাযোগ</h3>
          <p className="flex items-center gap-2 mb-2">
            <FaPhone /> +880 1730-848524
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaEnvelope />  usrcsltd@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> ঢাকা, বাংলাদেশ
          </p>
        </div>

        {/* Right - Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">আমাদের অনুসরণ করুন</h3>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-gray-600">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-gray-600">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-600">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600 mt-10 border-t border-gray-300 pt-5">
        © {new Date().getFullYear()} Somiti. সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
};

export default Footer;
