import { useNavigate } from "react-router";
import { ChevronLeft, Download, Share2, Award } from "lucide-react";

export default function Certificate() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="font-semibold text-gray-900">Certificate</h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Share2 className="w-5 h-5 text-gray-900" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Certificate Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative z-10">
            {/* Logo */}
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
              <Award className="w-10 h-10 text-[#1e3a8a]" />
            </div>

            {/* Title */}
            <div className="mb-6">
              <p className="text-sm text-blue-100 mb-1">Certificate of Completion</p>
              <h2 className="text-2xl font-semibold mb-2">
                Battery Replacement SOP
              </h2>
              <p className="text-blue-100 text-sm">
                This certifies that
              </p>
            </div>

            {/* Name */}
            <div className="mb-6">
              <p className="text-3xl font-semibold mb-1">John Doe</p>
              <p className="text-blue-100 text-sm">Employee ID: EMP-2024-001</p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-blue-200 mb-1">Issue Date</p>
                <p className="text-sm font-medium">February 15, 2024</p>
              </div>
              <div>
                <p className="text-xs text-blue-200 mb-1">Expiry Date</p>
                <p className="text-sm font-medium">February 15, 2026</p>
              </div>
              <div>
                <p className="text-xs text-blue-200 mb-1">Score</p>
                <p className="text-sm font-medium">95%</p>
              </div>
              <div>
                <p className="text-xs text-blue-200 mb-1">Certificate ID</p>
                <p className="text-sm font-medium">CERT-2024-5847</p>
              </div>
            </div>

            {/* Signature */}
            <div className="pt-6 border-t border-white/20">
              <div className="flex items-end justify-between">
                <div>
                  <div className="w-32 h-px bg-white/40 mb-2"></div>
                  <p className="text-xs text-blue-100">Training Administrator</p>
                  <p className="text-sm font-medium">Jane Smith</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-blue-100 mb-1">LearnHub</p>
                  <p className="text-sm font-medium">Corporate Learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Info */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Certificate Information</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Verified Certificate</p>
                <p className="text-xs text-gray-600">This certificate is officially verified and recognized</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-[#1e3a8a]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Valid for 2 Years</p>
                <p className="text-xs text-gray-600">Renewal required before expiry date</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Share2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Shareable</p>
                <p className="text-xs text-gray-600">Share with employers or on social media</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button className="w-full py-3 bg-[#1e3a8a] text-white rounded-xl font-medium hover:bg-[#1e293b] transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download PDF
          </button>
          <button className="w-full py-3 border-2 border-gray-200 text-gray-900 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}