import { CircleUserRound, Lock, ArrowRight } from "lucide-react";
import { replace, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(
      login({
        username,
        password,
      })
    );

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Hoş Geldiniz 👋
          </h1>
          <p className="text-slate-500">
            Devam etmek için giriş yapın
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">
              Kullanıcı Adı
            </label>
            <div className="relative flex items-center">
              <CircleUserRound className="absolute left-3 text-slate-400" size={18} />
              <input
                type="text"
                required
                placeholder="Kullanıcı Adınız"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">
              Şifre
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-slate-400" size={18} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
              <input type="checkbox" className="w-4 h-4 accent-indigo-600 rounded border-slate-300" />
              Beni hatırla
            </label>
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-700 transition hover:underline cursor-pointer"
            >
              Şifremi Unuttum?
            </button>
          </div>

          <button
            type="submit"
            className="h-12 rounded-xl bg-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition active:scale-[0.98] shadow-lg shadow-indigo-200"
          >
            Giriş Yap <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Hesabınız yok mu?{" "}
          <button className="font-semibold text-indigo-600 cursor-pointer hover:underline">
            Kayıt Ol
          </button>
        </p>

      </div>
    </div>
  );
}