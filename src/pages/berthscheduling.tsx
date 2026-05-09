import { useState } from "react";
import {
  Calendar,
  Ship,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  Anchor,
} from "lucide-react";
import { motion } from "motion/react";

export function BerthSchedulingPage() {
  const [selectedBerth, setSelectedBerth] = useState<
    string | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  // Mock Data - Berth Information
  const berths = [
    {
      id: "B1",
      name: "رصيف 1",
      capacity: "كبير",
      status: "occupied",
      depth: "15م",
      length: "300م",
    },
    {
      id: "B2",
      name: "رصيف 2",
      capacity: "متوسط",
      status: "available",
      depth: "12م",
      length: "250م",
    },
    {
      id: "B3",
      name: "رصيف 3",
      capacity: "كبير",
      status: "occupied",
      depth: "15م",
      length: "300م",
    },
    {
      id: "B4",
      name: "رصيف 4",
      capacity: "صغير",
      status: "maintenance",
      depth: "10م",
      length: "200م",
    },
    {
      id: "B5",
      name: "رصيف 5",
      capacity: "متوسط",
      status: "available",
      depth: "12م",
      length: "250م",
    },
    {
      id: "B6",
      name: "رصيف 6",
      capacity: "كبير",
      status: "reserved",
      depth: "15م",
      length: "300م",
    },
  ];

  // Mock Data - Scheduled Ships
  const scheduledShips = [
    {
      id: "SH-2045",
      name: "Pacific Queen",
      berth: "B1",
      arrival: "08:00",
      departure: "14:00",
      status: "docked",
      cargo: "حاويات",
      conflicts: [],
    },
    {
      id: "SH-2046",
      name: "Atlantic Star",
      berth: "B3",
      arrival: "10:00",
      departure: "16:00",
      status: "docked",
      cargo: "سائبة",
      conflicts: [],
    },
    {
      id: "SH-2047",
      name: "Mediterranean Wave",
      berth: "B6",
      arrival: "15:00",
      departure: "20:00",
      status: "scheduled",
      cargo: "حاويات مبردة",
      conflicts: [],
    },
    {
      id: "SH-2048",
      name: "Red Sea Pioneer",
      berth: "B2",
      arrival: "12:00",
      departure: "18:00",
      status: "scheduled",
      cargo: "حاويات",
      conflicts: ["تعارض محتمل مع SH-2046"],
    },
  ];

  // Mock Data - Workforce Assignments
  const workforceAssignments = [
    {
      berth: "B1",
      crew: "فريق A",
      personnel: 12,
      supervisor: "أحمد محمد",
      specialization: "حاويات",
    },
    {
      berth: "B3",
      crew: "فريق B",
      personnel: 10,
      supervisor: "محمد علي",
      specialization: "سائبة",
    },
    {
      berth: "B6",
      crew: "فريق C",
      personnel: 8,
      supervisor: "خالد حسن",
      specialization: "مبردات",
    },
  ];

  const getBerthStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-[#214B2F] text-white border-[#214B2F]";
      case "occupied":
        return "bg-[#26739A] text-white border-[#26739A]";
      case "reserved":
        return "bg-[#B89535] text-white border-[#B89535]";
      case "maintenance":
        return "bg-red-600 text-white border-red-600";
      default:
        return "bg-gray-600 text-white border-gray-600";
    }
  };

  const getBerthStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "متاح";
      case "occupied":
        return "مشغول";
      case "reserved":
        return "محجوز";
      case "maintenance":
        return "صيانة";
      default:
        return "غير معروف";
    }
  };

  const getShipStatusColor = (status: string) => {
    switch (status) {
      case "docked":
        return "bg-[#26739A]/20 text-[#26739A] border-[#26739A]/30";
      case "scheduled":
        return "bg-[#214B2F]/20 text-[#214B2F] border-[#214B2F]/30";
      case "delayed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getShipStatusText = (status: string) => {
    switch (status) {
      case "docked":
        return "راسية";
      case "scheduled":
        return "مجدولة";
      case "delayed":
        return "متأخرة";
      default:
        return "غير معروف";
    }
  };

  return (
    <div className="min-h-screen bg-[#1D1F22] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            جدولة الأرصفة
          </h1>
          <p className="text-gray-400">
            إدارة وتنظيم جدول رسو السفن وتخصيص الموارد
          </p>
        </div>

        {/* Date Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#232529] to-[#1D1F22] border border-[#26739A]/20 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <Calendar className="w-6 h-6 text-[#26739A]" />
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">
                اختر التاريخ
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) =>
                  setSelectedDate(e.target.value)
                }
                className="px-4 py-2 bg-[#2a2c30] border border-[#26739A]/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26739A]"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-6 py-2 bg-[#26739A] hover:bg-[#26739A]/80 text-white rounded-lg transition-all">
                عرض الجدول
              </button>
              <button className="px-6 py-2 bg-[#214B2F] hover:bg-[#214B2F]/80 text-white rounded-lg transition-all">
                جدولة جديدة
              </button>
            </div>
          </div>
        </motion.div>

        {/* Berth Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            حالة الأرصفة
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {berths.map((berth, index) => (
              <motion.div
                key={berth.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedBerth(berth.id)}
                className={`bg-gradient-to-br from-[#232529] to-[#1D1F22] border rounded-xl p-5 cursor-pointer transition-all ${
                  selectedBerth === berth.id
                    ? "border-[#26739A] shadow-lg"
                    : "border-[#26739A]/20 hover:border-[#26739A]/50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#26739A]/10 rounded-lg">
                      <Anchor className="w-5 h-5 text-[#26739A]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {berth.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {berth.id}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBerthStatusColor(berth.status)}`}
                  >
                    {getBerthStatusText(berth.status)}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>السعة:</span>
                    <span className="text-white">
                      {berth.capacity}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>العمق:</span>
                    <span className="text-white">
                      {berth.depth}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>الطول:</span>
                    <span className="text-white">
                      {berth.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scheduled Ships */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            السفن المجدولة
          </h2>
          <div className="bg-gradient-to-br from-[#232529] to-[#1D1F22] border border-[#26739A]/20 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#26739A]/10 border-b border-[#26739A]/20">
                    <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                      السفينة
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                      الرصيف
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                      الوصول
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                      المغادرة
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                      الشحنة
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                      الحالة
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                      التحذيرات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledShips.map((ship, index) => (
                    <tr
                      key={ship.id}
                      className="border-b border-[#26739A]/10 hover:bg-[#26739A]/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Ship className="w-5 h-5 text-[#26739A]" />
                          <div>
                            <p className="font-medium text-white">
                              {ship.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {ship.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">
                          {ship.berth}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{ship.arrival}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{ship.departure}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {ship.cargo}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getShipStatusColor(ship.status)}`}
                        >
                          {getShipStatusText(ship.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {ship.conflicts.length > 0 ? (
                          <div className="flex items-center gap-2 text-amber-400">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-xs">
                              {ship.conflicts.length}
                            </span>
                          </div>
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-[#214B2F]" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Workforce Assignments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            تعيين القوى العاملة
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workforceAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.berth}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gradient-to-br from-[#232529] to-[#1D1F22] border border-[#26739A]/20 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#214B2F]/20 rounded-lg">
                    <Users className="w-6 h-6 text-[#214B2F]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {assignment.crew}
                    </h3>
                    <p className="text-sm text-gray-400">
                      رصيف {assignment.berth}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      عدد الأفراد:
                    </span>
                    <span className="text-white font-semibold">
                      {assignment.personnel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      المشرف:
                    </span>
                    <span className="text-white">
                      {assignment.supervisor}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      التخصص:
                    </span>
                    <span className="px-3 py-1 bg-[#B89535]/20 text-[#B89535] rounded-full text-xs font-semibold">
                      {assignment.specialization}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}