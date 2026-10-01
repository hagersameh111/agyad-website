import React from "react";
import { NAV } from "../../data/nav";
import Logo from "../Logo.jsx";

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-ink-line py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <Logo tone="light" />
        <nav className="flex flex-wrap gap-7 justify-center">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-stone hover:text-gild-bright text-sm transition-colors"
            >
              {n.label}
            </button>
          ))}
        </nav>
        <p className="text-stone/70 text-xs">© ٢٠٢٦ باب أجياد للدعاية والإعلان</p>
      </div>
    </footer>
  );
}