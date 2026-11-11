import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Download, Share2, Award, Calendar, CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";

const coursesData = [
  { id: 1, title: "Battery Replacement SOP", category: "Mandatory" },
  { id: 2, title: "Emergency Jumpstart Procedures", category: "Field Critical" },
  { id: 3, title: "Battery vs Alternator Diagnosis", category: "Advanced" },
  { id: 4, title: "Roadside Assistance Protocol", category: "Mandatory" },
  { id: 5, title: "Customer Handling & Upselling", category: "Skills" },
];

export default function StaffCertificate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const certificateRef = useRef<HTMLDivElement>(null);
  const courseId = parseInt(id || "1");
  
  const course = coursesData.find(c => c.id === courseId) || coursesData[0];
  const staffEmail = localStorage.getItem("staffEmail") || "technician@company.com";
  const staffName = staffEmail.split("@")[0].charAt(0).toUpperCase() + staffEmail.split("@")[0].slice(1);
  const completionDate = new Date().toLocaleDateString("en-US", { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const certificateId = `CERT-${courseId}-${Date.now().toString().slice(-6)}`;

  useEffect(() => {
    // Check if course is actually completed
    const progress = localStorage.getItem(`courseProgress_${courseId}`);
    if (progress !== "100") {
      navigate(`/staff/course/${courseId}`);
    }
  }, [courseId, navigate]);

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("Certificate download started! (In production, this would generate a PDF)");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${course.title} - Certificate`,
        text: `I just completed ${course.title} and earned my certificate!`,
      }).catch(() => {
        // Fallback for browsers that don't support sharing
        alert("Certificate sharing feature (would integrate with social media in production)");
      });
    } else {
      alert("Certificate sharing feature (would integrate with social media in production)");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/staff/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <div>
                <h1 className="font-semibold text-gray-900">Certificate</h1>
                <p className="text-xs text-gray-600">Course Completion</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 flex items-start gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-green-900 mb-1">
              Congratulations! 🎉
            </h2>
            <p className="text-green-700">
              You have successfully completed <strong>{course.title}</strong> and earned your certificate.
            </p>
          </div>
        </div>

        {/* Certificate */}
        <div 
          ref={certificateRef}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-[#d97706]"
        >
          {/* Certificate Header */}
          <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] text-white px-8 py-6 text-center">
            <Award className="w-16 h-16 mx-auto mb-3 text-[#d97706]" />
            <h1 className="text-3xl font-bold mb-2">Certificate of Completion</h1>
            <p className="text-blue-200">Professional Training Program</p>
          </div>

          {/* Certificate Body */}
          <div className="px-12 py-10">
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg mb-6">This is to certify that</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-[#d97706] inline-block pb-2 px-8">
                {staffName}
              </h2>
              <p className="text-gray-600 text-lg mb-4">has successfully completed</p>
              <h3 className="text-2xl font-semibold text-[#1e3a8a] mb-8">
                {course.title}
              </h3>
            </div>

            {/* Certificate Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Calendar className="w-6 h-6 text-[#1e3a8a] mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">Date of Completion</p>
                <p className="text-sm font-semibold text-gray-900">{completionDate}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Award className="w-6 h-6 text-[#d97706] mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">Certificate ID</p>
                <p className="text-sm font-semibold text-gray-900">{certificateId}</p>
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="mb-2">
                  <div className="h-12 flex items-end justify-center">
                    <div className="border-b-2 border-gray-900 w-48">
                      <p className="text-2xl font-serif italic mb-1">John Smith</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">Training Director</p>
                <p className="text-xs text-gray-600">Learning & Development</p>
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <div className="h-12 flex items-end justify-center">
                    <div className="border-b-2 border-gray-900 w-48">
                      <p className="text-2xl font-serif italic mb-1">Sarah Johnson</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">CEO</p>
                <p className="text-xs text-gray-600">Company Leadership</p>
              </div>
            </div>

            {/* Company Seal */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-[#d97706] bg-gradient-to-br from-[#1e3a8a] to-[#d97706]">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
            <p className="text-xs text-gray-600">
              This certificate verifies that the above-named individual has successfully completed all course requirements
              and demonstrated proficiency in the subject matter.
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <button
            onClick={() => navigate("/staff/dashboard")}
            className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow text-center"
          >
            <Award className="w-8 h-8 text-[#1e3a8a] mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">View All Certificates</h3>
            <p className="text-sm text-gray-600">See your achievements</p>
          </button>

          <button
            onClick={() => navigate("/staff/dashboard")}
            className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow text-center"
          >
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">Continue Learning</h3>
            <p className="text-sm text-gray-600">Explore more courses</p>
          </button>

          <button
            onClick={handleShare}
            className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow text-center"
          >
            <Share2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">Share Achievement</h3>
            <p className="text-sm text-gray-600">Tell others about it</p>
          </button>
        </div>

        {/* Verification Info */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-medium text-blue-900 mb-2">Certificate Verification</h3>
          <p className="text-sm text-blue-700 mb-3">
            This certificate can be verified using the certificate ID: <strong>{certificateId}</strong>
          </p>
          <p className="text-xs text-blue-600">
            Employers and institutions can verify this certificate by contacting our verification department.
          </p>
        </div>
      </div>
    </div>
  );
}
