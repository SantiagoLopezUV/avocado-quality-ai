import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { forgotPassword } from "../services/api";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenData, setTokenData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await forgotPassword(email);
      
      // El backend devuelve el token (esto normalmente se enviaría por email)
      setTokenData(result);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Error al solicitar recuperación de contraseña");
    } finally {
      setLoading(false);
    }
  };

  const copyToken = () => {
    if (tokenData?.token) {
      navigator.clipboard.writeText(tokenData.token);
      alert("¡Token copiado! Ahora puede usarlo para restablecer su contraseña.");
    }
  };

  return (
    <div className="bg-[#f6f8f6] dark:bg-gray-900 min-h-screen flex flex-col transition-colors">
      {/* Header */}
      <header className="bg-[#e8f5e9] dark:bg-gray-800 border-b-2 border-[#c5e1a5] dark:border-gray-700 px-6 py-6 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-[0px] py-[8px]">
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <Logo size="lg" showText={true} />
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 transition-colors">
            {!success ? (
              <>
                <div className="text-center mb-8">
                  <div className="size-20 bg-gradient-to-br from-[#8bc34a] to-[#7cb342] rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
                    🔑
                  </div>
                  <h2 className="text-3xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-3 transition-colors">
                    ¿Olvidó su Contraseña?
                  </h2>
                  <p className="text-lg text-[#1a2e1a] dark:text-gray-400 opacity-70 transition-colors">
                    No se preocupe, le ayudamos a recuperarla de una
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6 transition-colors">
                    <p className="text-red-800 dark:text-red-200 text-base font-semibold flex items-center gap-2">
                      <span className="text-2xl">⚠️</span>
                      {error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-base font-semibold text-[#0d1b0d] dark:text-gray-200 mb-2 transition-colors">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ej: juanperez@gmail.com"
                        className="w-full px-5 py-4 pl-14 text-lg border-2 border-[#e4ede4] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-2xl focus:border-[#8bc34a] dark:focus:border-[#9ccc65] focus:outline-none transition-colors"
                        required
                      />
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
                        ✉️
                      </span>
                    </div>
                    <p className="text-sm text-[#475569] dark:text-gray-400 mt-2 transition-colors">
                      Ingrese el correo que usó para registrarse
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-5 rounded-2xl text-xl font-bold hover:bg-[#7cb342] dark:hover:bg-[#689f38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Enviando..." : "Enviar Código de Recuperación"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full bg-[#f3f7f3] dark:bg-gray-700 text-[#0d1b0d] dark:text-gray-200 py-4 rounded-2xl text-lg font-semibold hover:bg-[#e4ede4] dark:hover:bg-gray-600 transition-colors"
                  >
                    Volver al Login
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-6">
                <div className="size-24 bg-gradient-to-br from-[#8bc34a] to-[#7cb342] rounded-full mx-auto flex items-center justify-center text-6xl">
                  ✅
                </div>
                
                <h2 className="text-3xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">
                  ¡Código Generado!
                </h2>
                
                <div className="bg-[#fff4e6] dark:bg-orange-900/30 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-6 transition-colors">
                  <p className="text-base text-orange-800 dark:text-orange-200 mb-4 font-semibold">
                    <span className="text-2xl mr-2">📧</span>
                    Normalmente este código se enviaría a su correo, pero para esta demostración se lo mostramos aquí:
                  </p>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 transition-colors">
                    <p className="text-xs text-[#475569] dark:text-gray-400 mb-2 transition-colors">Token de Recuperación:</p>
                    <p className="text-sm font-mono text-[#0d1b0d] dark:text-gray-100 break-all transition-colors">
                      {tokenData?.token}
                    </p>
                  </div>

                  <button
                    onClick={copyToken}
                    className="w-full bg-orange-500 dark:bg-orange-600 text-white py-3 rounded-xl text-base font-bold hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors mb-3"
                  >
                    📋 Copiar Token
                  </button>

                  <p className="text-sm text-orange-700 dark:text-orange-300 transition-colors">
                    ⏰ Este código expira en 5 minutos
                  </p>
                </div>

                <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-6 transition-colors">
                  <p className="text-base text-[#475569] dark:text-gray-400 mb-4 transition-colors">
                    Ahora puede usar este código para restablecer su contraseña:
                  </p>
                  
                  <button
                    onClick={() => navigate("/reset-password")}
                    className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-5 rounded-2xl text-xl font-bold hover:bg-[#7cb342] dark:hover:bg-[#689f38] transition-colors"
                  >
                    Continuar al Restablecimiento
                  </button>
                </div>

                <button
                  onClick={() => navigate("/")}
                  className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-semibold hover:underline transition-colors"
                >
                  Volver al Login
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
