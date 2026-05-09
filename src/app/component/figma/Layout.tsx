import { Outlet, Link, useLocation } from "react-router-dom";
import { Anchor, BarChart3, Package, MapPin, Menu, X, Calendar } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "الرئيسية", icon: Anchor },
    { path: "/dashboard", label: "لوحة التحكم", icon: BarChart3 },
    { path: "/berth-scheduling", label: "جدولة الأرصفة", icon: Calendar },
    { path: "/tracking", label: "تتبع الشحنات", icon: Package },
    { path: "/facilities", label: "المنشآت", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-[#1D1F22]" dir="rtl">
      {/* Header */}
      <header className="bg-[#1D1F22] border-b border-[#26739A]/20 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#26739A] to-[#214B2F] p-2 rounded-lg">
                <Anchor className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-white">MENAPORT</h1>
                <p className="text-xs text-[#B89535]">Smart Port System</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-[#26739A] text-white"
                        : "text-gray-300 hover:bg-[#232529] hover:text-[#26739A]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-[#26739A]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[#26739A]/20 overflow-hidden bg-[#1D1F22]"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-[#26739A] text-white"
                          : "text-gray-300 hover:bg-[#232529] hover:text-[#26739A]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#1D1F22] border-t border-[#26739A]/20 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-[#26739A] to-[#214B2F] p-2 rounded-lg">
                  <Anchor className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">MENAPORT</h3>
              </div>
              <p className="text-gray-400 text-sm">
                نظام متطور لإدارة العمليات البحرية والموانئ بكفاءة عالية
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#B89535]">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-[#26739A] transition-colors">الرئيسية</Link></li>
                <li><Link to="/dashboard" className="hover:text-[#26739A] transition-colors">لوحة التحكم</Link></li>
                <li><Link to="/tracking" className="hover:text-[#26739A] transition-colors">تتبع الشحنات</Link></li>
                <li><Link to="/facilities" className="hover:text-[#26739A] transition-colors">المنشآت</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#B89535]">تواصل معنا</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>البريد: info@menaport.com</li>
                <li>الهاتف: 0123456789+</li>
                <li>العنوان: الميناء الرئيسي، المنطقة البحرية</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#26739A]/20 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 MENAPORT. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}