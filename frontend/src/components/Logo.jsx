import React from "react";

/**
 * Bab Ajyad mark: an open door-frame with a check-mark that "breaks out"
 * of the frame. Redrawn as vector from the brochure design.
 *
 * tone="light"  -> for burgundy / dark backgrounds (silver frame + white check)
 * tone="brand"  -> for white backgrounds (burgundy frame + gray check)
 */
export function LogoMark({ tone = "light", className = "w-10 h-10" }) {
  const frame = tone === "light" ? "#d6d6da" : "#8e1b31";
  const check = tone === "light" ? "#ffffff" : "#8c8c91";
  return (
    <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
      <path
        d="M74 16H18v78h68V70"
        fill="none"
        stroke={frame}
        strokeWidth="8"
        strokeLinejoin="miter"
      />
      <path d="M27 54l10-9 13 14L98 6l6 5-50 76H46z" fill={check} />
    </svg>
  );
}

export default function Logo({ tone = "light", size = "md", showTagline = true }) {
  const dark = tone === "light";
  const mark = size === "lg" ? "w-16 h-16" : "w-10 h-10";
  const name = size === "lg" ? "text-4xl" : "text-2xl md:text-3xl";
  return (
    <span className="flex items-center gap-3" dir="rtl">
      <LogoMark tone={tone} className={mark} />
      <span className="flex flex-col leading-none">
        <span className={`font-serif font-bold ${name} ${dark ? "text-parchment" : "text-oxblood"}`}>
          باب أجياد
        </span>
        {showTagline && (
          <span className={`text-[11px] mt-1.5 tracking-wide ${dark ? "text-stone" : "text-silver"}`}>
            بوابتك للإبداع
          </span>
        )}
      </span>
    </span>
  );
}
