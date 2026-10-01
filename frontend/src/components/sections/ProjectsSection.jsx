import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../../services/api.js";
import { getIconComponent } from "../../utils/iconMap.jsx";
import { IconChevron } from "../icons.jsx";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  if (loading) return <div className="text-center text-parchment py-24">جاري التحميل...</div>;

  return (
    <section id="projects" className="bg-ink py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-right mb-16">
          <p className="text-gild-bright text-sm mb-3">أعمالنا</p>
          <h2 className="font-serif text-4xl md:text-5xl text-parchment">مشاريع مختارة</h2>
          <div className="hairline w-24 my-7 mr-0 ml-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-ink-line">
          {projects.map((p, i) => {
            const ProjectIcon = getIconComponent(p.icon);
            return (
              <div key={p.id || i} className="bg-ink p-8 md:p-10 flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <span className="font-serif text-3xl text-gild-bright/50">{p.year}</span>
                  <ProjectIcon className="w-8 h-8 text-gild-bright" />
                </div>
                <h3 className="font-serif text-2xl text-parchment mb-3">{p.title}</h3>
                <p className="text-stone text-sm leading-7 mb-8 flex-1">{p.body}</p>
                <Link 
                  to={`/projects/${p.id}`} 
                  className="underline-grow self-start text-sm text-gild-bright inline-flex items-center gap-2 mt-4"
                >
                  استكشف المشروع <IconChevron className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}