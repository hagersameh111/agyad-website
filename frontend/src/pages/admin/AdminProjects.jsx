import React, { useState, useEffect } from "react";
import { fetchProjects, deleteProject } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const res = await deleteProject(id);
      if (res.success) {
        setProjects(projects.filter((p) => p._id !== id));
      } else {
        alert("Failed to delete project");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F3F3F4] p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#8e1b31]">إدارة المشاريع</h1>
          <div className="flex gap-4">
            <Link to="/admin/projects/new" className="bg-[#b3223f] text-white px-6 py-2 rounded-lg">إضافة مشروع جديد</Link>
            <button onClick={handleLogout} className="bg-[#2b2b2e] text-white px-6 py-2 rounded-lg">تسجيل الخروج</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-[#e6e6e8] border-b">
              <tr>
                <th className="p-4 font-semibold text-[#2b2b2e]">العنوان</th>
                <th className="p-4 font-semibold text-[#2b2b2e]">التصنيف</th>
                <th className="p-4 font-semibold text-[#2b2b2e]">السنة</th>
                <th className="p-4 font-semibold text-[#2b2b2e]">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e6e8]">
              {projects.map((project) => (
                <tr key={project._id} className="hover:bg-[#f3f3f4]">
                  <td className="p-4">{project.title}</td>
                  <td className="p-4">{project.category}</td>
                  <td className="p-4">{project.year}</td>
                  <td className="p-4 flex gap-4">
                    <Link to={`/admin/projects/edit/${project._id}`} className="text-blue-600 hover:underline">تعديل</Link>
                    <button onClick={() => handleDelete(project._id)} className="text-[#b3223f] hover:underline">حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}