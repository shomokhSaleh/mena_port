import { useState } from "react";
import {
  Ship,
  Package,
  TrendingUp,
  AlertTriangle,
  Activity,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "motion/react";

export function DashboardPage() {
  const [timeRange, setTimeRange] = useState("week");

  // Mock Data
  const stats = [
    {
      icon: Ship,
      label: "السفن النشطة",
      value: "42",
      change: "+5%",
      trend: "up",
      color: "blue",
    },
    {
      icon: Package,
      label: "الحاويات",
      value: "1,234",
      change: "+12%",
      trend: "up",
      color: "green",
    },
    {
      icon: Clock,
      label: "متوسط الوقت",
      value: "2.5 ساعة",
      change: "-8%",
      trend: "down",
      color: "purple",
    },
    {
      icon: DollarSign,
      label: "الإيرادات",
      value: "2.4M$",
      change: "+18%",
      trend: "up",
      color: "amber",
    },
  ];

  const monthlyData = [
    { month: "يناير", containers: 4000, ships: 240, revenue: 2100 },
    { month: "فبراير", containers: 3000, ships: 198, revenue: 2000 },
    { month: "مارس", containers: 5000, ships: 300, revenue: 2400 },
    { month: "أبريل", containers: 4500, ships: 270, revenue: 2300 },
    { month: "مايو", containers: 6000, ships: 360, revenue: 2800 },
    { month: "يونيو", containers: 5500, ships: 330, revenue: 2600 },
  ];

  const cargoTypes = [
    { id: "dry", name: "حاويات جافة", value: 45, color: "#26739A" },
    { id: "refrigerated", name: "حاويات مبردة", value: 25, color: "#214B2F" },
    { id: "bulk", name: "سائبة", value: 20, color: "#B89535" },
    { id: "other", name: "أخرى", value: 10, color: "#5c9bb5" },
  ];

  const recentShipments = [
    {
      id: "SH-2001",
      ship: "Ocean Glory",
      status: "وصل",
      containers: 150,
      time: "منذ ساعة",
    },
    {
      id: "SH-2002",
      ship: "Sea Master",
      status: "قيد التفريغ",
      containers: 200,
      time: "منذ 3 ساعات",
    },
    {
      id: "SH-2003",
      ship: "Pacific Star",
      status: "قيد التحميل",
      containers: 180,
      time: "منذ 5 ساعات",
    },
    {
      id: "SH-2004",
      ship: "Atlantic Queen",
      status: "في الانتظار",
      containers: 220,
      time: "منذ 8 ساعات",
    },
  ];

  const alerts = [
    {
      type: "تحذير",
      message: "تأخير متوقع في وصول السفينة SH-2010",
      time: "منذ 15 دقيقة",
    },
    {
      type: "هام",
      message: "تحديث أحوال الطقس - رياح قوية متوقعة",
      time: "منذ ساعة",
    },
    {
      type: "إشعار",
      message: "صيانة دورية مجدولة للرصيف رقم 3",
      time: "منذ 3 ساعات",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "وصل":
        return "bg-[#214B2F]/20 text-[#214B2F] border border-[#214B2F]/30";
      case "قيد التفريغ":
        return "bg-[#26739A]/20 text-[#26739A] border border-[#26739A]/30";
      case "قيد التحميل":
        return "bg-[#B89535]/20 text-[#B89535] border border-[#B89535]/30";
      case "في الانتظار":
        return "bg-gray-400/20 text-gray-400 border border-gray-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border border-gray-400/30";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "تحذير":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/20";
      case "هام":
        return "bg-red-500/20 text-red-400 border border-red-500/20";
      default:
        return "bg-[#26739A]/20 text-[#26739A] border border-[#26739A]/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#1D1F22] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            لوحة التحكم
          </h1>
          <p className="text-gray-400">نظرة عامة على عمليات الميناء</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#232529] to-[#1D1F22] border border-[#26739A]/20 rounded-xl p-6 hover:border-[#26739A]/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-[#26739A]/10">
                    <Icon className="w-6 h-6 text-[#26739A]" />
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      stat.trend === "up" ? "text-[#214B2F]" : "text-[#26739A]"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-gradient-to-br from-[#232529] to-[#1D1F22] border border-[#26739A]/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                الأداء الشهري
              </h2>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-[#2a2c30] border border-[#26739A]/20 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#26739A]"
              >
                <option value="week">آخر أسبوع</option>
                <option value="month">آخر شهر</option>
                <option value="year">آخر سنة</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorContainers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#26739A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#26739A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2c30" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1D1F22",
                    border: "1px solid rgba(38, 115, 154, 0.2)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="containers"
                  stroke="#26739A"
                  strokeWidth={2}
                  fill="url(#colorContainers)"
                  name="الحاويات"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Cargo Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-[#232529] to-[#1D1F22] border border-[#26739A]/20 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              توزيع الشحنات
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={cargoTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {cargoTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1D1F22",
                    border: "1px solid rgba(38, 115, 154, 0.2)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {cargoTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: type.color }}
                    />
                    <span className="text-sm text-gray-400">{type.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {type.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Shipments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-[#232529] to-[#1D1F22] border border-[#26739A]/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                الشحنات الأخيرة
              </h2>
              <button className="text-[#26739A] text-sm font-semibold hover:text-[#26739A]/80">
                عرض الكل
              </button>
            </div>
            <div className="space-y-4">
              {recentShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="flex items-center justify-between p-4 bg-[#1D1F22]/50 border border-[#26739A]/10 rounded-lg hover:border-[#26739A]/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#26739A]/10 rounded-lg">
                      <Ship className="w-5 h-5 text-[#26739A]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {shipment.ship}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {shipment.id} • {shipment.containers} حاوية
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        shipment.status
                      )}`}
                    >
                      {shipment.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {shipment.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-[#232529] to-[#1D1F22] border border-[#26739A]/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                التنبيهات
              </h2>
              <Activity className="w-5 h-5 text-[#26739A]" />
            </div>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-[#1D1F22]/50 border border-[#26739A]/10 rounded-lg"
                >
                  <div
                    className={`p-2 rounded-lg h-fit ${getAlertIcon(
                      alert.type
                    )}`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white">
                        {alert.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}