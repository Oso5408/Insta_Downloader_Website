"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

// Change this version string to force the notice to reappear for all users
const NOTICE_VERSION = "2024-06-27-v2";
const LOCALSTORAGE_KEY = `update-notice-dismissed-${NOTICE_VERSION}`;

export default function UpdateNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if not dismissed for this version
    if (typeof window !== "undefined" && !localStorage.getItem(LOCALSTORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALSTORAGE_KEY, "true");
    }
  };

  if (!visible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 flex items-center justify-between shadow-lg animate-slide-down">
      <div className="flex items-center space-x-3">
        <span className="font-semibold">🚀 Update:</span>
        <span>
          We've added <b>Nepali (नेपाली)</b> language support! The main download form and all features are now available in Nepali, Hindi, Chinese, and English.<br className="hidden md:inline" />
          <b>Translations improved</b> for the main download form and content type selector. <b>Download reliability</b> and error handling have also been enhanced.
        </span>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 p-1 rounded hover:bg-white/10 transition-colors"
        aria-label="Dismiss update notice"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

// Add this animation to your globals.css or tailwind config if you want a smooth slide-down effect:
// @keyframes slide-down { from { transform: translateY(-100%); } to { transform: translateY(0); } }
// .animate-slide-down { animation: slide-down 0.4s cubic-bezier(0.4,0,0.2,1); } 