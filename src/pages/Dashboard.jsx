import React from "react";
import { User, Lock } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAuthSummary, selectLanguageSummary } from "../store/selector";
import { translations } from "../translation/translation";

export function Dashboard() {
  const { username } = useSelector(selectAuthSummary);
  const { lang } = useSelector(selectLanguageSummary);

  const t = translations[lang]?.dashboard ?? translations.tr.dashboard;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-3xl font-bold theme-text">{t.title}</h2>
        <p className="theme-text-muted">{t.subtitle}</p>
      </div>

      <div className="theme-surface theme-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full theme-bg-soft theme-border flex items-center justify-center">
            <User className="theme-primary" size={28} />
          </div>

          <div className="flex flex-col">
            <p className="text-sm theme-text-muted">{t.usernameLabel}</p>
            <p className="text-lg font-semibold theme-text">
              {username || (lang === "en" ? "Not set" : "Belirtilmedi")}
            </p>
          </div>
        </div>

        <div className="h-px theme-border-bg" />

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full theme-bg-soft theme-border flex items-center justify-center">
            <Lock className="theme-primary" size={26} />
          </div>

          <div className="flex-1 flex flex-col">
            <p className="text-sm theme-text-muted">{t.passwordLabel}</p>
            <p className="text-lg font-semibold tracking-widest theme-text">
              {t.passwordMasked}
            </p>
          </div>

          <button className="px-4 py-2 rounded-xl text-sm font-medium theme-bg-soft theme-border theme-text hover:opacity-80 transition">
            {t.changeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
