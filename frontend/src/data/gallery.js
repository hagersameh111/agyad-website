import {
  IconBillboard,
  IconPrinter,
  IconPalette,
  IconCurtain,
  IconStorefront,
  IconVan,
} from "../components/icons.jsx";

export const GALLERY = [
    
  { cat: "لوحات", title: "لوحة إعلانية خارجية", icon: IconBillboard, size: "tall" , image: "/1.png",},
  { cat: "طباعة", title: "طباعة رقمية عريضة", icon: IconPrinter, size: "wide" , image: "/2.png",},
  { cat: "تصميم", title: "هوية بصرية متكاملة", icon: IconPalette, size: "normal" , image: "/3.png",},
  { cat: "ستائر", title: "ستائر عرض قماشية", icon: IconCurtain, size: "normal" , image: "/6.png",},
  { cat: "لوحات", title: "واجهة محل LED", icon: IconStorefront, size: "wide" , image: "/4.png",},
  { cat: "طباعة", title: "تغليف مركبات", icon: IconVan, size: "tall" , image: "/5.png"},
];

export const FILTERS = ["الكل", "لوحات", "طباعة", "تصميم", "ستائر"];