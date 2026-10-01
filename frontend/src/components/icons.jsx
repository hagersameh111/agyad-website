import React from "react";

const Icon = ({ path, className = "w-6 h-6", vb = "0 0 24 24" }) => (
  <svg
    viewBox={vb}
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {path}
  </svg>
);

// ------------------------------------
// شعار باب أجياد (Bab Ajyad Logo)
// ------------------------------------
export const IconLogo = (p) => (
  <Icon
    {...p}
    path={
      <>
        {/* الإطار الخارجي المائل (Perspective Frame) */}
        <path d="M7 6l10-2.5v15l-10 2.5V6z" />
        {/* الإطار الداخلي */}
        <path d="M10 8.5l4-1v9l-4 1v-9z" />
        {/* علامة الصح البارزة والديناميكية (سمك خط أكبر قليلاً لإبرازها) */}
        <path d="M2 13l7.5 7.5L23 3" strokeWidth="1.8" />
      </>
    }
  />
);

export const IconBillboard = (p) => (
  <Icon
    {...p}
    path={
      <>
        <rect x="3" y="5" width="18" height="10" rx="0.5" />
        <path d="M8 15v4M16 15v4M6 22h12" />
        <path d="M7 8.5h5M7 11h3" />
      </>
    }
  />
);

export const IconPrinter = (p) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M6 9V3h12v6" />
        <rect x="4" y="9" width="16" height="8" rx="0.5" />
        <path d="M6 14h12v7H6z" />
      </>
    }
  />
);

export const IconPalette = (p) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M12 3a9 9 0 100 18c1.4 0 2-1 2-2s-.6-1.4-1-2c-.5-.7 0-1.6 1-1.6H16a4 4 0 004-4A9 9 0 0012 3z" />
        <circle cx="8" cy="11" r="0.9" />
        <circle cx="8" cy="15" r="0.9" />
        <circle cx="12" cy="7.5" r="0.9" />
        <circle cx="16" cy="9.5" r="0.9" />
      </>
    }
  />
);

export const IconVan = (p) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M3 16V7h11l4 4v5" />
        <rect x="3" y="16" width="15" height="0.1" />
        <circle cx="7" cy="17.5" r="1.6" />
        <circle cx="16" cy="17.5" r="1.6" />
        <path d="M14 11h4" />
      </>
    }
  />
);

export const IconCurtain = (p) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M4 4h16" />
        <path d="M6 4c0 6-2 8-2 14M18 4c0 6 2 8 2 14M10 4c0 6-1.5 8-1.5 14M14 4c0 6 1.5 8 1.5 14" />
      </>
    }
  />
);

export const IconStorefront = (p) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M4 9l1-5h14l1 5" />
        <path d="M4 9a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0 2 2 0 004 0" />
        <path d="M5 9v11h14V9" />
        <path d="M10 20v-6h4v6" />
      </>
    }
  />
);

export const IconPin = (p) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.3" />
      </>
    }
  />
);

export const IconPhone = (p) => (
  <Icon {...p} path={<path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5V18c0 1-1 2-2 2C10 20 4 14 4 8c0-1 1-2 1-4z" />} />
);

export const IconMail = (p) => (
  <Icon
    {...p}
    path={
      <>
        <rect x="3" y="5" width="18" height="14" rx="0.5" />
        <path d="M3 6l9 7 9-7" />
      </>
    }
  />
);

export const IconClock = (p) => (
  <Icon
    {...p}
    path={
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    }
  />
);

export const IconSend = (p) => <Icon {...p} path={<path d="M21 3L10.5 13.5M21 3l-6.5 18-4-8-8-4z" />} />;

export const IconMenu = (p) => <Icon {...p} path={<path d="M4 7h16M4 12h16M4 17h16" />} />;

export const IconClose = (p) => <Icon {...p} path={<path d="M5 5l14 14M19 5L5 19" />} />;

export const IconChevron = (p) => <Icon {...p} path={<path d="M15 6l-6 6 6 6" />} />;

export const IconStar = (p) => (
  <Icon {...p} path={<path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l4 4M18 18l-4-4M6 18l4-4M18 6l-4 4" />} />
);

export const IconPlay = (p) => (
  <Icon {...p} path={<path d="M8 5.5v13l11-6.5-11-6.5z" />} />
);

export const IconShare = (p) => (
  <Icon
    {...p}
    path={
      <>
        <circle cx="6" cy="12" r="2.2" />
        <circle cx="17.5" cy="6" r="2.2" />
        <circle cx="17.5" cy="18" r="2.2" />
        <path d="M8 10.8l7.7-3.7M8 13.2l7.7 3.7" />
      </>
    }
  />
);

export const IconCheck = (p) => <Icon {...p} path={<path d="M4 12.5l5 5L20 6" />} />;

export const IconImage = (p) => (
  <Icon
    {...p}
    path={
      <>
        <rect x="3" y="4" width="18" height="16" rx="0.5" />
        <circle cx="8.5" cy="9.5" r="1.6" />
        <path d="M3 16l5.5-5 4 4 3-2.5L21 16" />
      </>
    }
  />
);

export const IconArrow = (p) => (
  <Icon 
    {...p} 
    path={<path d="M19 12H5M12 19l-7-7 7-7" />} 
  />
);

export const IconGlobe = (p) => (
  <Icon
    {...p}
    path={
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
      </>
    }
  />
);

export const IconTarget = (p) => (
  <Icon
    {...p}
    path={
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.2" />
      </>
    }
  />
);

export const IconEye = (p) => (
  <Icon
    {...p}
    path={
      <>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    }
  />
);

// الدالة المسؤولة عن ربط البيانات بالمكونات
export const getIconComponent = (iconName) => {
  const icons = {
    billboard: IconBillboard,
    van: IconVan,
    storefront: IconStorefront,
    palette: IconPalette,
    printer: IconPrinter,
    curtain: IconCurtain,
    star: IconStar,
    // camera: IconCamera, // يرجى التأكد من إضافة IconCamera إذا كنت تستخدمها
    // video: IconVideo, // يرجى التأكد من إضافة IconVideo إذا كنت تستخدمها
    share: IconShare
  };
  return icons[iconName] || IconStorefront; // Fallback
};