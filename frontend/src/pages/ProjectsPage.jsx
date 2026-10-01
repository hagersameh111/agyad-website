import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageNav from "../components/layout/Navbar.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import PageFooter from "../components/layout/Footer.jsx";
import { LogoMark } from "../components/Logo.jsx";
import { IconChevron } from "../components/icons.jsx";
import { fetchAllProjectsPageData } from "../services/api.js";

const toArabicDigits = (n) =>
  String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

/* used if the request fails or returns nothing usable */
const FALLBACK = {
  pageHeader: {
    title: "أعمالنا",
    subtitle: "نماذج من المشاريع التي نفذناها لعملائنا.",
  },
  categories: ["الكل"],
  projects: [],
};

/* ---------------------------------------------------------------
   Empty state
   - no projects at all      -> "coming soon" message + contact CTA
   - filter has no results   -> message + "show all" button
---------------------------------------------------------------- */
function EmptyState({ filter, onReset }) {
  const filtered = filter !== "الكل";

  return (
    <section className="relative overflow-hidden bg-white border border-dashed border-[#D9D9D9] px-6 py-16 md:py-24 text-center">
      {/* brochure-style corner shapes */}
      <div
        className="absolute top-0 right-0 w-28 h-28 bg-[#E6E6E8]"
        style={{ clipPath: "polygon(0 0,100% 0,100% 100%)" }}
      />
      <div
        className="absolute top-0 right-0 w-16 h-16 bg-[#9B0028]"
        style={{ clipPath: "polygon(0 0,100% 0,100% 100%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-20 h-20 bg-[#E6E6E8]"
        style={{ clipPath: "polygon(0 0,0 100%,100% 100%)" }}
      />

      {/* illustration: stacked empty cards + logo */}
      <div className="relative mx-auto mb-10 w-56 h-44" aria-hidden="true">
        <div className="absolute inset-x-6 top-6 bottom-0 -rotate-6 border-2 border-dashed border-[#D9D9D9] bg-[#F8F8F8]" />
        <div className="absolute inset-x-6 top-3 bottom-3 rotate-3 border-2 border-dashed border-[#D9D9D9] bg-white" />
        <div className="absolute inset-x-4 top-0 bottom-6 bg-white border border-[#E6E6E8] shadow-[0_18px_40px_-18px_rgba(155,0,40,.45)] flex items-center justify-center">
          <span className="absolute w-24 h-24 rounded-full bg-[#9B0028]/10 animate-pulse" />
          <LogoMark tone="brand" className="relative w-16 h-16" />
        </div>
      </div>

      <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#9B0028] mb-4">
        {filtered ? "لا توجد مشاريع في هذا التصنيف" : "أعمالنا في الطريق إليك"}
      </h2>

      <p className="text-[#555555] leading-8 max-w-md mx-auto mb-9">
        {filtered ? (
          <>
            لم نضف بعد مشاريع ضمن تصنيف{" "}
            <span className="font-bold text-[#9B0028]">«{filter}»</span>. يمكنك
            استعراض بقية أعمالنا أو التواصل معنا لنبدأ مشروعك القادم.
          </>
        ) : (
          "نجهّز حالياً معرض أعمالنا لنعرضه لك بأفضل صورة. تابعنا قريباً، أو تواصل معنا وابدأ مشروعك مع باب أجياد."
        )}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {filtered ? (
          <button
            onClick={onReset}
            className="group inline-flex items-center gap-3 bg-[#9B0028] text-white px-8 py-3.5 text-sm font-bold rounded-[20px] shadow-[0_14px_36px_-12px_rgba(155,0,40,.7)] hover:bg-[#7d0020] transition-colors"
          >
            عرض كل المشاريع
            <IconChevron className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
          </button>
        ) : (
          <a
            href="/#contact"
            className="group inline-flex items-center gap-3 bg-[#9B0028] text-white px-8 py-3.5 text-sm font-bold rounded-[20px] shadow-[0_14px_36px_-12px_rgba(155,0,40,.7)] hover:bg-[#7d0020] transition-colors"
          >
            تواصل معنا
            <IconChevron className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
          </a>
        )}

        <Link
          to="/"
          className="border border-[#D9D9D9] bg-white text-[#555555] px-8 py-3.5 text-sm rounded-[20px] hover:border-[#9B0028] hover:text-[#9B0028] transition-colors"
        >
          العودة للرئيسية
        </Link>
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState("الكل");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const pageData = await fetchAllProjectsPageData();
        setData({
          pageHeader: pageData?.pageHeader || FALLBACK.pageHeader,
          categories: pageData?.categories?.length
            ? pageData.categories
            : FALLBACK.categories,
          projects: Array.isArray(pageData?.projects) ? pageData.projects : [],
        });
      } catch {
        setData(FALLBACK);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#9B0028]">
        جاري التحميل...
      </div>
    );
  }

  const hasAny = data.projects.length > 0;
  const items =
    filter === "الكل"
      ? data.projects
      : data.projects.filter((p) => p.category === filter);
  const isEmpty = items.length === 0;

  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen bg-[#F8F8F8] text-[#3C3C3C] font-sans pt-10"
    >
      <PageNav />

      <main className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <section className="pt-20 pb-12 text-right">
          <div className="w-24 h-1 bg-[#9B0028] mb-6 rounded-full"></div>

          <h1 className="text-5xl md:text-6xl font-bold text-[#9B0028] mb-6">
            {data.pageHeader.title}
          </h1>

          <p className="text-[#555555] leading-8 max-w-2xl">
            {data.pageHeader.subtitle}
          </p>
        </section>

        {/* Filters (hidden when there is nothing to filter) */}
        {hasAny && (
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-12">
            <div className="flex flex-wrap gap-3">
              {data.categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setFilter(c);
                    setPage(1);
                  }}
                  className={
                    "px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 " +
                    (filter === c
                      ? "bg-[#9B0028] border-[#9B0028] text-white shadow-lg"
                      : "bg-white border-[#D9D9D9] text-[#555555] hover:border-[#9B0028] hover:text-[#9B0028]")
                  }
                >
                  {c}
                </button>
              ))}
            </div>

            {!isEmpty && (
              <p className="text-sm text-[#555555]">
                <span className="text-[#9B0028] font-bold">
                  {toArabicDigits(items.length)} مشروع
                </span>{" "}
                تم تنفيذه بنجاح
              </p>
            )}
          </section>
        )}

        {/* Decorative divider */}
        <div className="relative mb-12">
          <div className="h-px bg-[#D9D9D9]"></div>
          <div className="absolute right-0 top-0 w-20 h-1 bg-[#9B0028]"></div>
        </div>

        {isEmpty ? (
          <div className="pb-20">
            <EmptyState filter={filter} onReset={() => setFilter("الكل")} />
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} />
              ))}
            </section>

            {/* Pagination */}
            <nav className="flex items-center justify-center gap-3 py-16">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-11 h-11 bg-white border border-[#D9D9D9] text-[#555555] hover:border-[#9B0028] hover:text-[#9B0028] flex items-center justify-center transition-all"
              >
                <IconChevron className="w-4 h-4 rotate-180" />
              </button>

              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={
                    "w-11 h-11 flex items-center justify-center border transition-all duration-300 font-medium " +
                    (page === n
                      ? "bg-[#9B0028] border-[#9B0028] text-white"
                      : "bg-white border-[#D9D9D9] text-[#555555] hover:border-[#9B0028] hover:text-[#9B0028]")
                  }
                >
                  {toArabicDigits(n)}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(3, p + 1))}
                className="w-11 h-11 bg-white border border-[#D9D9D9] text-[#555555] hover:border-[#9B0028] hover:text-[#9B0028] flex items-center justify-center transition-all"
              >
                <IconChevron className="w-4 h-4" />
              </button>
            </nav>
          </>
        )}
      </main>

      <PageFooter />
    </div>
  );
}