import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchProjectById, createProject, updateProject } from "../../services/api";

export default function AdminProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    category: "",
    year: new Date().getFullYear(),
    body: "",
    icon: "billboard",
    videoPlaceholder: "",
    overview: "",
    story: "",
    images: "",
    results: "",
    deliverables: "",
    clientInfo: {
      client: "",
      brandManager: "",
      region: "",
      category: "",
      launchWindow: "",
      duration: "",
      channels: "",
      mainObjective: ""
    }
  });

  useEffect(() => {
    if (isEditing) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    const data = await fetchProjectById(id);
    if (data) {
      setFormData({
        slug: data.slug || "",
        title: data.title || "",
        subtitle: data.subtitle || "",
        category: data.category || "",
        year: data.year || new Date().getFullYear(),
        body: data.description || "",
        icon: data.icon || "billboard",
        videoPlaceholder: data.videoPlaceholder || "",
        overview: data.overview || "",
        story: data.story || "",
        // Convert arrays to newline-separated strings for the textareas
        images: data.images ? data.images.join("\n") : "",
        results: data.results ? data.results.join("\n") : "",
        deliverables: data.deliverables ? data.deliverables.join("\n") : "",
        clientInfo: data.clientInfo || {
          client: "", brandManager: "", region: "", category: "",
          launchWindow: "", duration: "", channels: "", mainObjective: ""
        }
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClientInfoChange = (e) => {
    setFormData({
      ...formData,
      clientInfo: { ...formData.clientInfo, [e.target.name]: e.target.value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format textareas back into arrays, mapping body to description
      const payload = {
        ...formData,
        description: formData.body,
        images: formData.images.split("\n").filter(i => i.trim() !== ""),
        results: formData.results.split("\n").filter(i => i.trim() !== ""),
        deliverables: formData.deliverables.split("\n").filter(i => i.trim() !== ""),
      };
      
      const res = isEditing 
        ? await updateProject(id, payload)
        : await createProject(payload);

      if (res.success) {
        navigate("/admin/projects");
      } else {
        alert(res.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save project.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F3F4] p-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#8e1b31]">
            {isEditing ? "تعديل المشروع" : "إضافة مشروع جديد"}
          </h1>
          <Link to="/admin/projects" className="text-[#2b2b2e] hover:underline">العودة للمشاريع</Link>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-[#e6e6e8]">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Info Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#8e1b31] border-b pb-2">المعلومات الأساسية</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">عنوان المشروع</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">العنوان الفرعي (Subtitle)</label>
                  <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">الرابط الدائم (Slug)</label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2" />
                </div>
               <div>
  <label className="block text-sm font-bold mb-2">القسم / التصنيف (Category)</label>
  <select 
    name="category" 
    value={formData.category} 
    onChange={handleChange} 
    required 
    className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2"
  >
    <option value="" disabled>اختر التصنيف...</option>
    <option value="إعلانات">إعلانات</option>
    <option value="تصميم جرافيكي">تصميم جرافيكي</option>
    <option value="هوية بصرية">هوية بصرية</option>
    <option value="تصوير">تصوير</option>
    <option value="فيديو">فيديو</option>
    <option value="سوشيال ميديا">سوشيال ميديا</option>
    <option value="طباعة خارجية">طباعة خارجية</option>
    <option value="طباعة داخلية">طباعة داخلية</option>
    <option value="شاشات رقمية">شاشات رقمية</option>
    <option value="تغليف مركبات">تغليف مركبات</option>
  </select>
</div>
                <div>
                  <label className="block text-sm font-bold mb-2">السنة</label>
                  <input type="number" name="year" value={formData.year} onChange={handleChange} required className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">الأيقونة</label>
                  <select name="icon" value={formData.icon} onChange={handleChange} className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2">
                    <option value="billboard">لوحة (Billboard)</option>
                    <option value="van">مركبة (Van)</option>
                    <option value="storefront">متجر (Storefront)</option>
                    <option value="palette">ألوان (Palette)</option>
                    <option value="printer">طابعة (Printer)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">الوصف المختصر للبطاقة (Body)</label>
                <textarea name="body" value={formData.body} onChange={handleChange} rows="2" className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2"></textarea>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#8e1b31] border-b pb-2">تفاصيل صفحة المشروع</h2>
              
              <div>
                <label className="block text-sm font-bold mb-2">نظرة عامة (Overview)</label>
                <textarea name="overview" value={formData.overview} onChange={handleChange} rows="3" className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2"></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">قصة المشروع (Story)</label>
                <textarea name="story" value={formData.story} onChange={handleChange} rows="4" className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2"></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">نص توضيح الفيديو (Video Placeholder)</label>
                <input type="text" name="videoPlaceholder" value={formData.videoPlaceholder} onChange={handleChange} className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2" />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">روابط الصور (صورة واحدة في كل سطر)</label>
                  <textarea name="images" value={formData.images} onChange={handleChange} rows="4" className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2 placeholder-gray-400" placeholder="/images/1.jpg&#10;/images/2.jpg"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">النتائج (نتيجة واحدة في كل سطر)</label>
                  <textarea name="results" value={formData.results} onChange={handleChange} rows="4" className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2 placeholder-gray-400"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">المخرجات (مخرج واحد في كل سطر)</label>
                  <textarea name="deliverables" value={formData.deliverables} onChange={handleChange} rows="4" className="w-full bg-[#f3f3f4] border rounded-lg px-4 py-2 placeholder-gray-400"></textarea>
                </div>
              </div>
            </div>

            {/* Client Info Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#8e1b31] border-b pb-2">معلومات العميل</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">العميل</label>
                  <input type="text" name="client" value={formData.clientInfo.client} onChange={handleClientInfoChange} className="w-full bg-[#f3f3f4] border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">مدير العلامة</label>
                  <input type="text" name="brandManager" value={formData.clientInfo.brandManager} onChange={handleClientInfoChange} className="w-full bg-[#f3f3f4] border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">المنطقة</label>
                  <input type="text" name="region" value={formData.clientInfo.region} onChange={handleClientInfoChange} className="w-full bg-[#f3f3f4] border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">القطاع</label>
                  <input type="text" name="category" value={formData.clientInfo.category} onChange={handleClientInfoChange} className="w-full bg-[#f3f3f4] border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">تاريخ الإطلاق</label>
                  <input type="text" name="launchWindow" value={formData.clientInfo.launchWindow} onChange={handleClientInfoChange} className="w-full bg-[#f3f3f4] border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">المدة الزمنية</label>
                  <input type="text" name="duration" value={formData.clientInfo.duration} onChange={handleClientInfoChange} className="w-full bg-[#f3f3f4] border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">الهدف الرئيسي</label>
                  <input type="text" name="mainObjective" value={formData.clientInfo.mainObjective} onChange={handleClientInfoChange} className="w-full bg-[#f3f3f4] border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">القنوات</label>
                  <input type="text" name="channels" value={formData.clientInfo.channels} onChange={handleClientInfoChange} className="w-full bg-[#f3f3f4] border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#b3223f] hover:bg-[#8e1b31] text-white font-bold py-4 rounded-lg transition-colors mt-8">
              حفظ المشروع
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}