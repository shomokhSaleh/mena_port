import { useState } from "react";
import {
  Building2,
  Anchor,
  Warehouse,
  Zap,
  Thermometer,
  Shield,
  Camera,
  Wifi,
  CheckCircle2,
  AlertCircle,
  Activity,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../app/component/figma/ImageWithFallback";
export function FacilitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "الكل" },
    { id: "terminals", label: "الأرصفة" },
    { id: "storage", label: "المخازن" },
    { id: "equipment", label: "المعدات" },
    { id: "security", label: "الأمن" },
  ];

  const facilities = [
    {
      id: 1,
      name: "الرصيف الشمالي",
      category: "terminals",
      status: "نشط",
      capacity: "85%",
      icon: Anchor,
      image:
        "https://images.unsplash.com/photo-1765100215279-7761a9657ddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXJnbyUyMHBvcnQlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3NDk4MTY0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "رصيف بطول 500 متر لاستقبال السفن الكبيرة",
      features: [
        "عمق 18 متر",
        "4 رافعات عملاقة",
        "نظام إضاءة LED",
        "نظام مراقبة متقدم",
      ],
    },
    {
      id: 2,
      name: "مخزن التبريد رقم 1",
      category: "storage",
      status: "نشط",
      capacity: "65%",
      icon: Warehouse,
      image:
        "https://images.unsplash.com/photo-1770305775781-883a8cd5b0ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lcnMlMjBwb3J0JTIwbmlnaHR8ZW58MXx8fHwxNzc0OTgxNjQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "مخزن مبرد بمساحة 10,000 متر مربع",
      features: [
        "درجة حرارة -25°م",
        "سعة 5000 حاوية",
        "نظام تحكم آلي",
        "مولدات احتياطية",
      ],
    },
    {
      id: 3,
      name: "مركز التحكم الذكي",
      category: "equipment",
      status: "نشط",
      capacity: "100%",
      icon: Building2,
      image:
        "https://images.unsplash.com/photo-1772171386057-63e3fef73b77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHRlY2hub2xvZ3klMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzc0OTgxNjQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "مركز مراقبة وتحكم بجميع العمليات",
      features: [
        "شاشات عرض متعددة",
        "نظام إنذار متقدم",
        "غرفة تحكم مركزية",
        "AI للتحليلات",
      ],
    },
    {
      id: 4,
      name: "نظام الأمن والمراقبة",
      category: "security",
      status: "نشط",
      capacity: "98%",
      icon: Shield,
      image:
        "https://images.unsplash.com/photo-1623944156546-ddd5bf10796e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXAlMjBsb2FkaW5nJTIwY29udGFpbmVyc3xlbnwxfHx8fDE3NzQ5ODE2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "نظام أمني متكامل لحماية المنشآت",
      features: [
        "250 كاميرا مراقبة",
        "تعرف على الوجه",
        "نظام إنذار ذكي",
        "مراقبة 24/7",
      ],
    },
    {
      id: 5,
      name: "الرصيف الجنوبي",
      category: "terminals",
      status: "صيانة",
      capacity: "0%",
      icon: Anchor,
      image:
        "https://images.unsplash.com/photo-1765100215279-7761a9657ddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXJnbyUyMHBvcnQlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3NDk4MTY0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "رصيف بطول 400 متر قيد الصيانة الدورية",
      features: [
        "عمق 15 متر",
        "3 رافعات",
        "قيد التطوير",
        "متاح قريباً",
      ],
    },
    {
      id: 6,
      name: "المخزن المركزي",
      category: "storage",
      status: "نشط",
      capacity: "72%",
      icon: Warehouse,
      image:
        "https://images.unsplash.com/photo-1770305775781-883a8cd5b0ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lcnMlMjBwb3J0JTIwbmlnaHR8ZW58MXx8fHwxNzc0OTgxNjQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "مخزن رئيسي بمساحة 15,000 متر مربع",
      features: [
        "تخزين جاف",
        "سعة 8000 حاوية",
        "نظام رفوف آلي",
        "تتبع RFID",
      ],
    },
  ];

  const systemStatus = [
    { name: "نظام الطاقة", status: "ممتاز", icon: Zap, value: 98 },
    { name: "التبريد", status: "جيد", icon: Thermometer, value: 85 },
    { name: "الاتصال", status: "ممتاز", icon: Wifi, value: 99 },
    { name: "الأمن", status: "ممتاز", icon: Shield, value: 100 },
  ];

  const filteredFacilities =
    selectedCategory === "all"
      ? facilities
      : facilities.filter((f) => f.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط":
        return "text-[#00ff87] bg-[#00ff87]/20";
      case "صيانة":
        return "text-amber-400 bg-amber-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case "ممتاز":
        return "text-[#00ff87]";
      case "جيد":
        return "text-[#00d9ff]";
      default:
        return "text-amber-400";
    }
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            المنشآت والخدمات
          </h1>
          <p className="text-gray-400">
            نظرة شاملة على جميع المنشآت والخدمات المتاحة
          </p>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {systemStatus.map((system, index) => {
            const Icon = system.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border border-[#00ff87]/20 rounded-xl p-4 hover:border-[#00ff87]/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#00ff87]/10 rounded-lg">
                    <Icon className="w-5 h-5 text-[#00ff87]" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">
                    {system.name}
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-semibold ${getSystemStatusColor(
                        system.status
                      )}`}
                    >
                      {system.status}
                    </span>
                    <span className="text-sm text-gray-400">
                      {system.value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-[#00ff87] to-[#00d9ff] h-1.5 rounded-full"
                      style={{ width: `${system.value}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-[#00ff87]/20 rounded-xl p-4 mb-8"
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? "bg-[#00ff87] text-black"
                    : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-[#00ff87]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-[#00ff87]/20 rounded-xl overflow-hidden hover:border-[#00ff87]/50 transition-all"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        facility.status
                      )}`}
                    >
                      {facility.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-[#00ff87]/10 rounded-lg">
                      <Icon className="w-5 h-5 text-[#00ff87]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg mb-1">
                        {facility.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {facility.description}
                      </p>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">
                        نسبة الاستخدام
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {facility.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          parseInt(facility.capacity) > 80
                            ? "bg-amber-500"
                            : "bg-gradient-to-r from-[#00ff87] to-[#00d9ff]"
                        }`}
                        style={{ width: facility.capacity }}
                      ></div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {facility.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00ff87] flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-4 bg-[#00ff87]/10 hover:bg-[#00ff87]/20 text-[#00ff87] font-medium py-2 rounded-lg transition-all border border-[#00ff87]/20">
                    عرض التفاصيل
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-l from-[#00ff87] to-[#00d9ff] rounded-2xl p-8 text-black relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">منشآتنا بالأرقام</h2>
              <p className="text-black/80">إحصائيات شاملة عن البنية التحتية</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">6</div>
                <div className="text-black/80">منشآت رئيسية</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">25,000</div>
                <div className="text-black/80">متر مربع</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">13,000</div>
                <div className="text-black/80">سعة الحاويات</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.5%</div>
                <div className="text-black/80">وقت التشغيل</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}