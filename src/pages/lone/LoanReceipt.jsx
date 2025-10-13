import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LoanReceipt = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [logo, setLogo] = useState(null);
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loanRes, logoRes, memberRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/loans/${id}`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/logo-get`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/members`),
        ]);

        const currentLoan = loanRes.data;
        const currentMember = memberRes.data.find(
          (m) => m.memberId === currentLoan.memberId
        );

        setLoan(currentLoan);
        setLogo(logoRes.data);
        setMember(currentMember);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handlePrint = () => window.print();

  if (!loan) return <p className="text-center mt-10">লোড হচ্ছে...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 border-[1.5px] border-gray-300 rounded-lg shadow-xl mt-6 print:shadow-none print:border-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b-2 border-gray-300 pb-4">
        {logo && <img src={logo.logoUrl} alt={logo.title} className="w-28" />}
        <div className="text-center flex-1">
          <h2 className="text-3xl font-extrabold text-gray-800">
            লোন অনুমোদন রসিদ
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            (Loan Approval Receipt)
          </p>
        </div>
      </div>

      {/* Member Info */}
      {member && (
        <div className="mb-6 bg-gray-50 p-5 rounded-lg shadow-inner border border-gray-200">
          <h3 className="font-bold text-lg mb-3 text-gray-800 border-b pb-2">
            সদস্যের তথ্য
          </h3>
          <div className="grid grid-cols-2 gap-3 text-[14px] text-gray-700 leading-relaxed">
            <p><strong>নাম:</strong> {member.name}</p>
            
            <p><strong>মোবাইল:</strong> {member.mobileNumber}</p>
            <p><strong>ঠিকানা:</strong> {member.address}</p>
         
           
          </div>

          {/* <div className="flex gap-6 mt-5">
            <div className="text-center">
              <img
                src={member.memberImage}
                alt="Member"
                className="w-24 h-24 rounded-lg border shadow-md object-cover"
              />
              <p className="text-sm text-gray-600 mt-1">সদস্য</p>
            </div>
            <div className="text-center">
              <img
                src={member.nomineeImage}
                alt="Nominee"
                className="w-24 h-24 rounded-lg border shadow-md object-cover"
              />
              <p className="text-sm text-gray-600 mt-1">নমিনি</p>
            </div>
          </div> */}
        </div>
      )}

      {/* Loan Info */}
      <div className="border-t-2 border-gray-300 pt-5">
        <h3 className="font-bold text-lg mb-3 text-gray-800 border-b pb-2">
          লোন সম্পর্কিত তথ্য
        </h3>
        <div className="space-y-2 text-[15px] text-gray-700 leading-relaxed">
          <p><strong>তারিখ:</strong> {new Date(loan.loanDate).toLocaleDateString()}</p>
          <p><strong>লোনের পরিমাণ:</strong> ৳{loan.initialLoanAmount}</p>
          <p><strong>ডিভিডেন্ড:</strong> {loan.dividend} {loan.dividendType}</p>
          <p><strong>কিস্তির ধরন:</strong> {loan.installmentType}</p>
          <p><strong>কিস্তির সংখ্যা:</strong> {loan.installments}</p>
          <p><strong>প্রতি কিস্তির পরিমাণ:</strong> ৳{loan.installmentAmount.toFixed(2)}</p>
          <p><strong>মোট লোন:</strong> ৳{loan.totalLoan.toFixed(2)}</p>
          <p><strong>বর্ণনা:</strong> {loan.description || "কোন বর্ণনা নেই"}</p>
          <p><strong>প্রদানকারী (অ্যাডমিন):</strong> {loan.addedBy}</p>
        </div>
      </div>

      {/* Signature Section */}
      <div className="mt-10 grid grid-cols-2 text-center text-gray-700">
        <div>
          <div className="border-t-2 border-gray-400 w-48 mx-auto"></div>
          <p className="text-sm mt-1">সদস্যের স্বাক্ষর</p>
        </div>
        <div>
          <div className="border-t-2 border-gray-400 w-48 mx-auto"></div>
          <p className="text-sm mt-1">অফিসারের স্বাক্ষর</p>
        </div>
      </div>

      {/* Print Button */}
      <div className="text-center mt-8 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition-all duration-200"
        >
          প্রিন্ট করুন
        </button>
      </div>
    </div>
  );
};

export default LoanReceipt;
