import { IconBillboard, IconVan, IconStorefront, IconPalette, IconPrinter, IconCurtain } from "../components/icons.jsx";

export const getIconComponent = (iconName) => {
  const icons = {
    billboard: IconBillboard,
    van: IconVan,
    storefront: IconStorefront,
    palette: IconPalette,
    printer: IconPrinter,
    curtain: IconCurtain
  };
  return icons[iconName] || IconStorefront;
};