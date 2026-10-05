import React from "react";
import { IconPhone } from "./icons.jsx";

export default function FloatingCallButton() {
  return (
    <a
      href="tel:+966595014299" // Replace with your actual phone number
      className="fixed bottom-8 left-8 z-50 flex items-center justify-center w-14 h-14 bg-[#b3223f] text-white rounded-full shadow-[0_8px_20px_-6px_rgba(179,34,63,0.6)] hover:bg-[#8e1b31] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
      aria-label="اتصل بنا"
      title="اتصل بنا"
    >
      <IconPhone className="w-6 h-6" />
    </a>
  );
}