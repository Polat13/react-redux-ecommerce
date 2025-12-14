import React, { useState } from "react";
import {
  Home,
  ShoppingCart,
  BarChart2,
  LogOut,
  Menu,
  X,
  Store,
  Sun,
  Moon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./store/slices/themeSlice";
import { selectThemeSummary, selectCardSummary, selectLanguageSummary } from "./store/selector";
import { translations } from "./translation/translation";
import { persistor } from "./store";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isDarkMode } = useSelector(selectThemeSummary);
  const { totalQuantity } = useSelector(selectCardSummary);
  const { lang } = useSelector(selectLanguageSummary); 

  const t = translations[lang]?.navbar ?? translations.tr.navbar;
  

  const navItems = [
    { name: t.home, icon: Home, path: "/home" },
    { name: t.dashboard, icon: BarChart2, path: "/dashboard" },
    { name: t.card, icon: ShoppingCart, path: "/card", badge: totalQuantity },
  ];

const handleLogout = async () => {
    await persistor.purge(); 
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-300 
      bg-white/80 border-slate-200 
      dark:bg-slate-900/80 dark:border-slate-800">
      
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
            <Store size={22} />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100 transition-colors">
            Pol<span className="text-indigo-600 dark:text-indigo-400">App</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center gap-2 font-medium transition-colors duration-200 
                ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                }`
              }
            >
              <item.icon size={20} />
              {item.name}

              {!!item.badge && item.badge > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200
            bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100
            dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
            <span>{isDarkMode ? t.darkMode : t.lightMode}</span>
          </button>

          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200
            bg-slate-50 border-slate-200 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200
            dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-900/30"
          >
            <LogOut size={18} />
            {t.logout}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border transition-colors
            bg-slate-50 border-slate-200 text-slate-700
            dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col gap-2 mt-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between p-4 rounded-xl transition-colors
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                      : "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  {item.name}
                </div>
                {!!item.badge && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-3 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2
                bg-slate-50 border-slate-200 text-slate-700
                dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
              >
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                {isDarkMode ? t.darkMode : t.lightMode}
              </button>

              <button
                onClick={handleLogout}
                className="p-3 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2
                bg-slate-50 border-slate-200 text-slate-700
                dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
              >
                <LogOut size={18} />
                {t.logout}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;