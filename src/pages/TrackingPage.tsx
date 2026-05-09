import { useState } from "react";
import { Search, Package, MapPin, Clock, CheckCircle2, Truck, Ship, Plane } from "lucide-react";
import { motion } from "motion/react";

export function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);

  // Mock shipments data
  const shipments = [
    {
      id: "SH-2024-001",
      type: "بحري",
      origin: "شنغهاي، الصين",
      destination: "جدة، السعودية",
      status: "قيد النقل",
      progress: 65,
      containers: 15,
      estimatedArrival: "2026-04-05",
      currentLocation: "قناة السويس",
      icon: Ship,
    },
    {
      id: "SH-2024-002",
      type: "جوي",
      origin: "دبي، الإمارات",
      destination: "الرياض، السعودية",
      status: "وصل",
      progress: 100,
      containers: 5,
      estimatedArrival: "2026-03-30",
      currentLocation: "مطار الرياض",
      icon: Plane,
    },
    {
      id: "SH-2024-003",
      type: "بري",
      origin: "الدمام، السعودية",
      destination: "الرياض، السعودية",
      status: "قيد التوصيل",
      progress: 80,
      containers: 8,
      estimatedArrival: "2026-04-01",
      currentLocation: "على بعد 50 كم",
      icon: Truck,
    },
    {
      id: "SH-2024-004",
      type: "بحري",
      origin: "روتردام، هولندا",
      destination: "جدة، السعودية",
      status: "في الميناء",
      progress: 90,
      containers: 25,
      estimatedArrival: "2026-04-02",
      currentLocation: "ميناء جدة",
      icon: Ship,
    },
  ];

  const timeline = [
    {
      status: "تم الشحن",
      location: "شنغهاي، الصين",
      date: "2026-03-15",
      time: "10:30 ص",
      completed: true,
    },
    {
      status: "في الطريق",
      location: "المحيط الهندي",
      date: "2026-03-22",
      time: "02:15 م",
      completed: true,
    },
    {
      status: "عبور قناة السويس",
      location: "قناة السويس",
      date: "2026-03-28",
      time: "08:45 ص",
      completed: true,
    },
    {
      status: "الوصول المتوقع",
      location: "ميناء جدة",
      date: "2026-04-05",
      time: "04:00 م",
      completed: false,
    },
  ];

  const filteredShipments = shipments.filter((shipment) =>
    shipment.id.toLowerCase().includes(trackingNumber.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "وصل":
        return "bg-[#00ff87]/20 text-[#00ff87] border-[#00ff87]/30";
      case "قيد النقل":
        return "bg-[#00d9ff]/20 text-[#00d9ff] border-[#00d9ff]/30";
      case "قيد التوصيل":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "في الميناء":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "بحري":
        return "bg-[#00d9ff]/20 text-[#00d9ff]";
      case "جوي":
        return "bg-sky-500/20 text-sky-400";
      case "بري":
        return "bg-emerald-500/20 text-emerald-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            تتبع الشحنات
          </h1>
          <p className="text-gray-400">
            تتبع شحناتك في الوقت الفعلي من أي مكان
          </p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-[#00ff87]/20 rounded-xl p-6 mb-8"
        >
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00ff87]" />
            <input
              type="text"
              placeholder="ابحث برقم الشحنة..."
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-black border border-[#00ff87]/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff87] focus:border-transparent placeholder:text-gray-500"
            />
          </div>
        </motion.div>

        {/* Shipments Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredShipments.map((shipment, index) => {
            const Icon = shipment.icon;
            return (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedShipment(shipment.id)}
                className={`bg-gradient-to-br from-gray-900 to-black border rounded-xl p-6 cursor-pointer hover:border-[#00ff87]/50 transition-all ${
                  selectedShipment === shipment.id
                    ? "border-[#00ff87]"
                    : "border-[#00ff87]/20"
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#00ff87]/10 rounded-lg">
                      <Icon className="w-6 h-6 text-[#00ff87]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {shipment.id}
                      </h3>
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded-full ${getTypeColor(
                          shipment.type
                        )}`}
                      >
                        {shipment.type}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      shipment.status
                    )}`}
                  >
                    {shipment.status}
                  </span>
                </div>

                {/* Route */}
                <div className="flex items-center gap-3 mb-4 text-sm">
                  <div className="flex-1">
                    <p className="text-gray-500 mb-1">من</p>
                    <p className="font-medium text-white">
                      {shipment.origin}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[#00ff87]">
                    <div className="w-2 h-2 rounded-full bg-[#00ff87]"></div>
                    <div className="w-8 h-0.5 bg-[#00ff87]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#00ff87]"></div>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-500 mb-1">إلى</p>
                    <p className="font-medium text-white">
                      {shipment.destination}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">التقدم</span>
                    <span className="text-sm font-semibold text-white">
                      {shipment.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#00ff87] to-[#00d9ff] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${shipment.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#00ff87]/10">
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Package className="w-4 h-4" />
                      <span className="text-xs">الحاويات</span>
                    </div>
                    <p className="font-semibold text-white">
                      {shipment.containers}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs">الموقع</span>
                    </div>
                    <p className="font-semibold text-white text-sm">
                      {shipment.currentLocation}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">الوصول</span>
                    </div>
                    <p className="font-semibold text-white text-sm">
                      {shipment.estimatedArrival}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Section */}
        {selectedShipment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-[#00ff87]/20 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              تفاصيل الشحنة {selectedShipment}
            </h2>

            <div className="relative">
              {timeline.map((event, index) => (
                <div key={index} className="flex gap-4 pb-8 last:pb-0">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        event.completed
                          ? "bg-[#00ff87]/20 text-[#00ff87]"
                          : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {event.completed ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    {index < timeline.length - 1 && (
                      <div
                        className={`w-0.5 h-full mt-2 ${
                          event.completed ? "bg-[#00ff87]/30" : "bg-gray-800"
                        }`}
                      ></div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`font-semibold ${
                          event.completed ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {event.status}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredShipments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-[#00ff87]/20 rounded-xl p-12 text-center"
          >
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              لم يتم العثور على شحنات
            </h3>
            <p className="text-gray-400">
              حاول البحث برقم شحنة مختلف
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}