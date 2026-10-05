import React, { useState, useEffect } from "react";
import { fetchGallery, createGalleryItem, deleteGalleryItem } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();

  // New Item Form State
  const [formData, setFormData] = useState({
    title: "",
    cat: "طباعة خارجية", // Default category
    icon: "billboard",
    size: "normal",
    image: "",
  });

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    const data = await fetchGallery();
    setGallery(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الصورة؟")) {
      const res = await deleteGalleryItem(id);
      if (res.success) {
        setGallery(gallery.filter((g) => g._id !== id));
      } else {
        alert("فشل في حذف الصورة");
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createGalleryItem(formData);
      if (res.success) {
        // Refresh the gallery list and close the form
        loadGallery();
        setIsFormOpen(false);
        setFormData({ title: "", cat: "طباعة خارجية", icon: "billboard", size: "normal", image: "" });
      } else {
        alert(res.message || "حدث خطأ أثناء الإضافة");
      }
    } catch (error) {
      alert("فشل في حفظ الصورة.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F3F3F4] p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-[#8e1b31]">معرض الأعمال</h1>
            <Link to="/admin/projects" className="text-[#2b2b2e] hover:underline text-sm border-r border-gray-300 pr-4">إدارة المشاريع</Link>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsFormOpen(!isFormOpen)} 
              className="bg-[#b3223f] text-white px-6 py-2 rounded-lg"
            >
              {isFormOpen ? "إلغاء الإضافة" : "إضافة صورة جديدة"}
            </button>
            <button onClick={handleLogout} className="bg-[#2b2b2e] text-white px-6 py-2 rounded-lg">تسجيل الخروج</button>
          </div>
        </div>

        {/* Add New Item Form */}
        {isFormOpen && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e6e6e8] mb-8">
            <h2 className="text-xl font-bold text-[#2b2b2e] mb-4">إضافة عمل جديد</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                
                <div>
                  <label className="block text-sm font-bold mb-2">العنوان</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-[#f3f3f4] border border-[#e6e6e8] rounded-lg px-4 py-2" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">الرابط/مسار الصورة</label>
                  <input type="text" name="image" value={formData.image} onChange={handleInputChange} required placeholder="/images/example.jpg" className="w-full bg-[#f3f3f4] border border-[#e6e6e8] rounded-lg px-4 py-2" />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">التصنيف</label>
                  <select name="cat" value={formData.cat} onChange={handleInputChange} className="w-full bg-[#f3f3f4] border border-[#e6e6e8] rounded-lg px-4 py-2">
                    <option value="طباعة خارجية">طباعة خارجية</option>
                    <option value="طباعة داخلية">طباعة داخلية</option>
                    <option value="هوية بصرية">هوية بصرية</option>
                    <option value="شاشات رقمية">شاشات رقمية</option>
                    <option value="تغليف مركبات">تغليف مركبات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">الحجم في الشبكة</label>
                  <select name="size" value={formData.size} onChange={handleInputChange} className="w-full bg-[#f3f3f4] border border-[#e6e6e8] rounded-lg px-4 py-2">
                    <option value="normal">عادي (Normal)</option>
                    <option value="wide">عريض (Wide)</option>
                    <option value="tall">طويل (Tall)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">الأيقونة</label>
                  <select name="icon" value={formData.icon} onChange={handleInputChange} className="w-full bg-[#f3f3f4] border border-[#e6e6e8] rounded-lg px-4 py-2">
                    <option value="billboard">لوحة (Billboard)</option>
                    <option value="printer">طابعة (Printer)</option>
                    <option value="palette">ألوان (Palette)</option>
                    <option value="curtain">ستارة (Curtain)</option>
                    <option value="storefront">متجر (Storefront)</option>
                    <option value="van">مركبة (Van)</option>
                  </select>
                </div>

              </div>
              <button type="submit" className="bg-[#8e1b31] text-white px-8 py-3 rounded-lg mt-4 font-bold">حفظ العمل</button>
            </form>
          </div>
        )}

        {/* Gallery Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-[#e6e6e8] border-b">
              <tr>
                <th className="p-4 font-semibold text-[#2b2b2e]">الصورة</th>
                <th className="p-4 font-semibold text-[#2b2b2e]">العنوان</th>
                <th className="p-4 font-semibold text-[#2b2b2e]">التصنيف</th>
                <th className="p-4 font-semibold text-[#2b2b2e]">الحجم</th>
                <th className="p-4 font-semibold text-[#2b2b2e]">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e6e8]">
              {gallery.map((item) => (
                <tr key={item._id} className="hover:bg-[#f3f3f4]">
                  <td className="p-4">
                    <img src={item.image} alt={item.title} className="w-16 h-12 object-cover rounded border border-gray-200" />
                  </td>
                  <td className="p-4">{item.title}</td>
                  <td className="p-4">{item.cat || item.category}</td>
                  <td className="p-4">{item.size}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(item._id)} className="text-[#b3223f] hover:underline">حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {gallery.length === 0 && (
            <div className="p-8 text-center text-gray-500">لا يوجد أعمال في المعرض حالياً.</div>
          )}
        </div>
      </div>
    </div>
  );
}