import React from "react";
import { IconPin, IconPhone, IconMail, IconClock, IconSend } from "../icons.jsx";
import { CLOSING } from "../../data/about.js";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";


export default function ContactSection() {
  const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  message: "",
});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const response = await fetch(
  "http://localhost:9000/api/contact",      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("تم إرسال الرسالة بنجاح");

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    }
  } catch (error) {
    console.error(error);
    alert("حدث خطأ أثناء الإرسال");
  } finally {
    setLoading(false);
  }
};
  return (
    <section id="contact" className="bg-ink py-20 font-sans" dir="rtl" lang="ar">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header - Left exactly as is from your code */}
        <div className="text-right mb-16">
          <p className="text-gild-bright text-sm mb-3">نسعد بتواصلكم</p>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-parchment"> بيانات التواصل</h2>
          <div className="hairline w-24 my-7 mr-0 ml-auto" />
          <p className="text-stone max-w-xl mr-0 ml-auto leading-7">
            {CLOSING}
          </p>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          
          {/* Right Column: Contact Information & Map */}
          <div className="flex flex-col gap-10">
            
            {/* Address */}
            <div className="flex items-start gap-5">
              <div className="p-0 text-oxblood shrink-0 mt-1">
                <IconPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-parchment font-bold text-lg mb-1">العنوان</h4>
                <p className="text-stone text-sm">المملكة العربية السعودية - تبوك</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-5">
              <div className="p-0 text-oxblood shrink-0 mt-1">
                <IconPhone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-parchment font-bold text-lg mb-1">الهاتف</h4>
                <p className="text-stone text-sm" dir="ltr">+966 59 501 4299</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-5">
              <div className="p-0 text-oxblood shrink-0 mt-1">
                <IconMail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-parchment font-bold text-lg mb-1">البريد الإلكتروني</h4>
                <p className="text-stone text-sm">info@babajyad.com</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-5">
              <div className="p-0 text-oxblood shrink-0 mt-1">
                <IconClock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-parchment font-bold text-lg mb-1">ساعات العمل</h4>
                <p className="text-stone text-sm">السبت - الخميس: 9 صباحاً - 10 مساءً</p>
              </div>
            </div>

            {/* Interactive Google Maps Iframe */}
     <div className="mt-4 lg:pl-10">
  <iframe
    title="موقعنا على الخريطة"
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0821811813335!2d36.5783854!3d28.4004016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15a9ad004e9cb3b1%3A0x32bc00dd97dd3c4f!2z2YjZg9in2YTYqSDYqNin2Kgg2KfYrNmK2KfYryDZhNmE2K_Yudin2YrYqSDZiNin2YTYp9i52YTYp9mG!5e1!3m2!1sen!2seg!4v1790838137678!5m2!1sen!2seg"    width="100%"
    height="220"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="strict-origin-when-cross-origin"
    className="rounded-2xl opacity-90 transition-opacity hover:opacity-100 border border-ink-line shadow-lg"
  />

  <div className="mt-4 flex justify-center lg:justify-start">
    <a
href="https://maps.google.com/?q=CH2H+596+وكالة+باب+اجياد+للدعاية+والاعلان+Assulimaniyah+Tabuk+Saudi+Arabia"      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
    >
      <FaMapMarkerAlt />
     
    </a>
  </div>
</div>
          </div>

          {/* Left Column: Contact Form */}
          <div className="bg-ink-soft p-8 md:p-10 rounded-2xl border border-ink-line shadow-xl">
            <h3 className="text-2xl text-parchment font-bold mb-8 text-right">أرسل لنا رسالة</h3>
            
           <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-stone text-sm mb-2 text-right">الاسم الكامل</label>
                <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="ادخل اسمك"
  className="w-full bg-ink border border-ink-line rounded-lg px-4 py-3.5 text-parchment placeholder-stone/50 focus:outline-none focus:border-oxblood transition-colors"
/>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-stone text-sm mb-2 text-right">رقم الهاتف</label>
                 <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="رقم هاتفك"
  className="w-full bg-ink border border-ink-line rounded-lg px-4 py-3.5 text-parchment placeholder-stone/50 focus:outline-none focus:border-oxblood transition-colors text-right"
/>
                </div>
                <div>
                  <label className="block text-stone text-sm mb-2 text-right">البريد الإلكتروني</label>
                 <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="بريدك الإلكتروني"
  className="w-full bg-ink border border-ink-line rounded-lg px-4 py-3.5 text-parchment placeholder-stone/50 focus:outline-none focus:border-oxblood transition-colors"
/>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-stone text-sm mb-2 text-right">الرسالة</label>
                <textarea
  rows="5"
  name="message"
  value={formData.message}
  onChange={handleChange}
  placeholder="اكتب رسالتك هنا..."
  className="w-full bg-ink border border-ink-line rounded-lg px-4 py-3.5 text-parchment placeholder-stone/50 focus:outline-none focus:border-oxblood resize-none transition-colors"
/>
              </div>

              {/* Submit Button */}
             <button
  type="submit"
  disabled={loading}
  className="w-full bg-oxblood hover:bg-oxblood-deep text-white font-medium py-4 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2 disabled:opacity-50"
>
  <IconSend className="w-5 h-5" />
  {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
</button>
              
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}