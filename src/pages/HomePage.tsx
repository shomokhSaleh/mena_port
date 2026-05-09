import { Link } from "react-router-dom";
import { ArrowLeft, Ship, Shield, Zap, TrendingUp, Package, Clock } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../app/component/figma/ImageWithFallback.tsx";
export function HomePage() {
  const features = [
    {
      icon: Ship,
      title: "إدارة الشحنات",
      description: "تتبع ومراقبة جميع الشحنات في الوقت الفعلي",
    },
    {
      icon: Shield,
      title: "أمان متقدم",
      description: "نظام أمني متكامل لحماية البضائع والمنشآت",
    },
    {
      icon: Zap,
      title: "أتمتة ذكية",
      description: "عمليات آلية لتسريع الإجراءات وتقليل الأخطاء",
    },
    {
      icon: TrendingUp,
      title: "تحليلات متقدمة",
      description: "رؤى وتقارير شاملة لاتخاذ قرارات مستنيرة",
    },
  ];

  const stats = [
    { value: "5,000+", label: "حاوية شهرياً", icon: Package },
    { value: "99.8%", label: "دقة التتبع", icon: TrendingUp },
    { value: "24/7", label: "مراقبة مستمرة", icon: Clock },
    { value: "50+", label: "سفينة يومياً", icon: Ship },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[#1D1F22]/90 to-[#1D1F22]/70 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1765100215279-7761a9657ddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXJnbyUyMHBvcnQlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3NDk4MTY0Mnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="ميناء ذكي"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            مرحباً بكم في <span className="text-[#26739A]">MENAPORT</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            نظام متكامل لإدارة العمليات اللوجستية والموانئ بتقنيات متطورة
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              to="/dashboard"
              className="bg-[#26739A] hover:bg-[#26739A]/80 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg shadow-[#26739A]/20"
            >
              لوحة التحكم
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link
              to="/tracking"
              className="bg-[#232529] hover:bg-[#2a2c30] border border-[#26739A]/30 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              تتبع الشحنات
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#1D1F22] py-12 -mt-20 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#232529] to-[#1D1F22] border border-[#26739A]/20 p-6 rounded-xl text-center hover:border-[#26739A]/50 transition-all"
                >
                  <Icon className="w-8 h-8 text-[#26739A] mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1D1F22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              لماذا نحن <span className="text-[#B89535]">الأفضل</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              نوفر حلولاً متطورة لإدارة الموانئ بكفاءة وفعالية عالية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#232529] to-[#1D1F22] border border-[#26739A]/10 p-6 rounded-xl hover:border-[#26739A]/50 transition-all group"
                >
                  <div className="bg-[#26739A]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#26739A]/20 transition-all">
                    <Icon className="w-7 h-7 text-[#26739A]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-[#1D1F22] text-white py-20 border-t border-[#26739A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">منشآتنا</h2>
            <p className="text-xl text-gray-400">
              أحدث التقنيات والمعدات لخدمة أفضل
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-64 rounded-xl overflow-hidden group border border-[#26739A]/10"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1770305775781-883a8cd5b0ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lcnMlMjBwb3J0JTIwbmlnaHR8ZW58MXx8fHwxNzc0OTgxNjQzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="ميناء ليلي"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1F22] via-[#1D1F22]/50 to-transparent flex items-end p-6">
                <h3 className="text-xl font-semibold">العمليات الليلية</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative h-64 rounded-xl overflow-hidden group border border-[#26739A]/10"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1623944156546-ddd5bf10796e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXAlMjBsb2FkaW5nJTIwY29udGFpbmVyc3xlbnwxfHx8fDE3NzQ5ODE2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="تحميل السفن"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1F22] via-[#1D1F22]/50 to-transparent flex items-end p-6">
                <h3 className="text-xl font-semibold">تحميل الشحنات</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative h-64 rounded-xl overflow-hidden group border border-[#26739A]/10"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1772171386057-63e3fef73b77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHRlY2hub2xvZ3klMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzc0OTgxNjQzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="مركز التحكم"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1F22] via-[#1D1F22]/50 to-transparent flex items-end p-6">
                <h3 className="text-xl font-semibold">مركز التحكم الذكي</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1D1F22]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-l from-[#26739A] to-[#214B2F] rounded-2xl p-12 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#1D1F22]/5"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                هل أنت مستعد للبدء؟
              </h2>
              <p className="text-xl mb-8 text-white/80">
                انضم إلى آلاف العملاء الذين يثقون في خدماتنا
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#26739A] px-8 py-3 rounded-lg font-semibold transition-all"
              >
                ابدأ الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}