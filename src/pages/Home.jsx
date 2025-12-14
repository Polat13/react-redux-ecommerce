import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Globe } from "lucide-react";
import { setLanguage } from "../store/slices/languageSlice";
import { selectLanguageSummary } from "../store/selector";
import { translations } from "../translation/translation";

export function Home() {
  const dispatch = useDispatch();
  const { lang, isTR } = useSelector(selectLanguageSummary);
  const t = translations[lang]?.home ?? translations.tr.home;

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-12">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 transition-colors duration-300">
          {t.title}
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed transition-colors duration-300">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-3xl p-8 border shadow-xl shadow-slate-200/50 transition-all duration-300
          bg-white border-slate-200 
          dark:bg-slate-800 dark:border-slate-700 dark:shadow-none">
          
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300
              bg-indigo-50 text-indigo-600 
              dark:bg-indigo-900/30 dark:text-indigo-400">
              <Globe size={32} />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 transition-colors duration-300">
                {t.boxTitle}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                {t.boxDesc}
              </p>

              <div className="mt-8 inline-flex p-1.5 rounded-xl border transition-colors duration-300
                bg-slate-100 border-slate-200 
                dark:bg-slate-900 dark:border-slate-700">
                
                <button
                  type="button"
                  onClick={() => dispatch(setLanguage("tr"))}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                    isTR
                      ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400 dark:shadow-none"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  TR
                </button>
                
                <button
                  type="button"
                  onClick={() => dispatch(setLanguage("en"))}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                    !isTR
                      ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400 dark:shadow-none"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  EN
                </button>
              </div>

              <div className="mt-4 text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500 transition-colors duration-300">
                {t.selectedLanguage}: <span className="text-indigo-600 dark:text-indigo-400 ml-1">{lang.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;