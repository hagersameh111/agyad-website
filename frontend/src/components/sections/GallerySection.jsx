import React, { useState, useEffect } from "react";
import { fetchGallery } from "../../services/api.js";

const FILTERS = ["الكل", "طباعة خارجية", "طباعة داخلية", "هوية بصرية", "شاشات رقمية", "تغليف مركبات"];

export default function GallerySection() {
  const [filter, setFilter] = useState("الكل");
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      const data = await fetchGallery();
      setGalleryItems(data);
      setLoading(false);
    };
    loadGallery();
  }, []);

  const items = filter === "الكل" 
    ? galleryItems 
    : galleryItems.filter((g) => g.cat === filter);

  if (loading) return <div className="text-center py-24 text-charcoal">جاري التحميل...</div>;

  return (
    <section id="gallery" className="bg-parchment text-charcoal py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-right mb-12">
          <p className="text-oxblood text-sm mb-3">جميع الأعمال</p>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-oxblood">تصفح إبداعاتنا</h2>
          <div className="hairline w-24 my-7 mr-0 ml-auto opacity-70" />
        </div>
        <div dir="ltr" lang="ar">
        <div className="flex flex-wrap gap-x-8 gap-y-3 justify-end mb-12 border-b border-charcoal/10 pb-6 text-right">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "text-sm pb-1 transition-colors border-b " +
                (filter === f
                  ? "text-oxblood border-oxblood"
                  : "text-charcoal/50 border-transparent hover:text-charcoal")
              }
            >
              {f}
            </button>
          ))}
        </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[190px] sm:auto-rows-[160px] md:auto-rows-[190px]">
          {items.map((g, i) => (
            <div
              key={`${g.title}-${i}`}
              className={
                "group relative overflow-hidden border border-charcoal/10 bg-stone-200 " +
                (g.size === "tall" ? "sm:row-span-2" : g.size === "wide" ? "md:col-span-2" : "")
              }
            >
              <img
                src={g.image}
                alt={g.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-right">
                <p className="text-white font-serif text-lg">{g.title}</p>
                <p className="text-white/80 text-xs mt-1">{g.cat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}