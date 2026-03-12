import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="bg-[#f6f8f6] dark:bg-gray-900 min-h-screen flex flex-col transition-colors">
      {/* Header */}
      <header className="bg-[#e8f5e9] dark:bg-gray-800 border-b-2 border-[#c5e1a5] dark:border-gray-700 px-6 py-6 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-[0px] py-[8px]">
          <Logo size="lg" showText={true} />
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8">
              <button onClick={() => navigate("/dashboard")} className="text-lg text-gray-900 dark:text-gray-100 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Diagnóstico
              </button>
              <button onClick={() => navigate("/marketplace")} className="text-lg text-gray-900 dark:text-gray-100 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Mi Plaza
              </button>
              <button onClick={() => navigate("/help")} className="text-lg text-gray-900 dark:text-gray-100 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Ayuda
              </button>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero */}
          <div className="space-y-6">
            <div className="bg-[#8bc34a20] dark:bg-[#8bc34a30] inline-block px-4 py-2 rounded-full transition-colors">
              <p className="text-[#8bc34a] dark:text-[#9ccc65] font-bold text-base uppercase tracking-wide">🌱 Tecnología pa' tu aguacatal</p>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-[#0d1b0d] dark:text-gray-100 leading-tight transition-colors">
              Súmele a su<br />
              <span className="text-[#8bc34a] dark:text-[#9ccc65]">Cultivo</span> con<br />
              Inteligencia<br />
              Artificial
            </h2>
            
            <p className="text-xl text-[#0d1b0d] dark:text-gray-300 opacity-70 leading-relaxed transition-colors">
              Revise cómo está su cosecha al toque y venda sus lotes de aguacate a lo bien. 
              Únase a los parceros que ya están mejorando sus cultivos.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                <div className="size-14 rounded-full bg-[#8bc34a] dark:bg-[#7cb342] border-4 border-white dark:border-gray-800 flex items-center justify-center text-white text-xl transition-colors">
                  👨‍🌾
                </div>
                <div className="size-14 rounded-full bg-[#689f38] dark:bg-[#558b2f] border-4 border-white dark:border-gray-800 flex items-center justify-center text-white text-xl transition-colors">
                  👩‍🌾
                </div>
                <div className="size-14 rounded-full bg-[#8bc34a] dark:bg-[#7cb342] border-4 border-white dark:border-gray-800 flex items-center justify-center text-white text-xl transition-colors">
                  👴
                </div>
              </div>
              <p className="text-lg font-medium text-[#1a2e1a] dark:text-gray-300 transition-colors">
                Más de 2,000 agricultores vallunos
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 transition-colors">
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-3 transition-colors">
                  {isLogin ? "Bienvenido de Nuevo" : "Regístrese Aquí"}
                </h3>
                <p className="text-lg text-[#1a2e1a] dark:text-gray-400 opacity-60 transition-colors">
                  {isLogin 
                    ? "Entre pa' revisar su cultivo" 
                    : "Súmele a los agricultores del Valle"
                  }
                </p>
              </div>

              {/* Toggle */}
              <div className="bg-[#f3f7f3] dark:bg-gray-700 p-2 rounded-2xl flex gap-2 transition-colors">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-xl text-lg font-semibold transition-all ${
                    isLogin 
                      ? "bg-white dark:bg-gray-600 shadow-md text-[#0d1b0d] dark:text-gray-100" 
                      : "text-[#1a2e1a] dark:text-gray-400 opacity-60"
                  }`}
                >
                  Entrar
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-xl text-lg font-semibold transition-all ${
                    !isLogin 
                      ? "bg-white dark:bg-gray-600 shadow-md text-[#0d1b0d] dark:text-gray-100" 
                      : "text-[#1a2e1a] dark:text-gray-400 opacity-60"
                  }`}
                >
                  Registrarse
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-base font-semibold text-[#0d1b0d] dark:text-gray-200 mb-2 transition-colors">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="ejemplo@correo.com"
                      className="w-full px-5 py-4 pl-14 text-lg border-2 border-[#e4ede4] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-2xl focus:border-[#8bc34a] dark:focus:border-[#9ccc65] focus:outline-none transition-colors"
                      required
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
                      📧
                    </span>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-base font-semibold text-[#0d1b0d] dark:text-gray-200 transition-colors">
                      Contraseña
                    </label>
                    {isLogin && (
                      <button type="button" className="text-sm font-semibold text-[#8bc34a] dark:text-[#9ccc65] hover:underline transition-colors">
                        ¿Olvidó su clave?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-5 py-4 pl-14 pr-14 text-lg border-2 border-[#e4ede4] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-2xl focus:border-[#8bc34a] dark:focus:border-[#9ccc65] focus:outline-none transition-colors"
                      required
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
                      🔒
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl hover:opacity-70"
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>

                {/* Certification Checkbox (only for signup) */}
                {!isLogin && (
                  <div className="bg-[#f3f7f3] dark:bg-gray-700 border-2 border-[#e4ede4] dark:border-gray-600 rounded-2xl p-5 transition-colors">
                    <label className="flex items-start gap-4 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 size-6 rounded border-2 border-[#8bc34a] text-[#8bc34a] focus:ring-[#8bc34a]"
                      />
                      <div>
                        <p className="text-base font-semibold text-[#0d1b0d] dark:text-gray-200 transition-colors">
                          Registrarme como Agricultor Certificado
                        </p>
                        <p className="text-sm text-[#1a2e1a] dark:text-gray-400 opacity-70 mt-1 transition-colors">
                          Acceso completo al diagnóstico IA y al marketplace
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-5 rounded-2xl text-xl font-bold hover:bg-[#7cb342] dark:hover:bg-[#689f38] transition-colors shadow-lg hover:shadow-xl"
                >
                  {isLogin ? "Entrar al Sistema" : "Crear Mi Cuenta"}
                </button>
              </form>

              {/* Divider */}
              <div className="relative py-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-[#e4ede4] dark:border-gray-600 transition-colors"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white dark:bg-gray-800 px-4 text-base text-[#94a3b8] dark:text-gray-400 uppercase transition-colors">
                    o continuar con
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 py-4 border-2 border-[#e4ede4] dark:border-gray-600 dark:bg-gray-700 rounded-2xl text-base font-semibold hover:bg-[#f3f7f3] dark:hover:bg-gray-600 transition-colors dark:text-gray-200">
                  <span className="text-xl">🔍</span>
                  Google
                </button>
                <button className="flex items-center justify-center gap-3 py-4 border-2 border-[#e4ede4] dark:border-gray-600 dark:bg-gray-700 rounded-2xl text-base font-semibold hover:bg-[#f3f7f3] dark:hover:bg-gray-600 transition-colors dark:text-gray-200">
                  <span className="text-xl">💼</span>
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t-2 border-[#e4ede4] dark:border-gray-700 px-6 py-6 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#94a3b8] dark:text-gray-400 transition-colors">
            © 2024 Avocado. Todos los derechos reservados. Agricultura de precisión para un futuro sostenible.
          </p>
          <div className="flex gap-6 text-sm text-[#94a3b8] dark:text-gray-400">
            <button className="hover:text-[#8bc34a] dark:hover:text-[#9ccc65] transition-colors">Privacidad</button>
            <button className="hover:text-[#8bc34a] dark:hover:text-[#9ccc65] transition-colors">Términos</button>
            <button onClick={() => navigate("/help")} className="hover:text-[#8bc34a] dark:hover:text-[#9ccc65] transition-colors">Centro de Ayuda</button>
          </div>
        </div>
      </footer>
    </div>
  );
}