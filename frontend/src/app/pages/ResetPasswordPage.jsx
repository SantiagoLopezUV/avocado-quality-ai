import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { resetPassword } from "../services/api";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Validar longitud mínima
    if (newPassword.length < 8) {
      setError("La contraseña debe tener mínimo 8 caracteres");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Error al restablecer contraseña. Verifique que el token sea válido y no haya expirado.");
    } finally {
      setLoading(false);
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
                    🔐
                  </div>
                  <h2 className="text-3xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-3 transition-colors">
                    Restablecer Contraseña
                  </h2>
                  <p className="text-lg text-[#1a2e1a] dark:text-gray-400 opacity-70 transition-colors">
                    Ingrese el código que recibió y su nueva contraseña
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
                      Código de Recuperación
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Pegue aquí el código que recibió"
                        className="w-full px-5 py-4 pl-14 text-lg border-2 border-[#e4ede4] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-2xl focus:border-[#8bc34a] dark:focus:border-[#9ccc65] focus:outline-none transition-colors font-mono"
                        required
                      />
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
                        🎫
                      </span>
                    </div>
                    <p className="text-sm text-[#475569] dark:text-gray-400 mt-2 transition-colors">
                      El código que recibió por correo (o que copió en la pantalla anterior)
                    </p>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-[#0d1b0d] dark:text-gray-200 mb-2 transition-colors">
                      Nueva Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Mínimo 8 caracteres"
                        minLength="8"
                        className="w-full px-5 py-4 pl-14 pr-14 text-lg border-2 border-[#e4ede4] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-2xl focus:border-[#8bc34a] dark:focus:border-[#9ccc65] focus:outline-none transition-colors"
                        required
                      />
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
                        🔒
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl hover:opacity-70 transition-opacity"
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-[#0d1b0d] dark:text-gray-200 mb-2 transition-colors">
                      Confirmar Nueva Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repita su nueva contraseña"
                        minLength="8"
                        className="w-full px-5 py-4 pl-14 text-lg border-2 border-[#e4ede4] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-2xl focus:border-[#8bc34a] dark:focus:border-[#9ccc65] focus:outline-none transition-colors"
                        required
                      />
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
                        🔒
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-5 rounded-2xl text-xl font-bold hover:bg-[#7cb342] dark:hover:bg-[#689f38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Cambiando Contraseña..." : "Cambiar Contraseña"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="w-full bg-[#f3f7f3] dark:bg-gray-700 text-[#0d1b0d] dark:text-gray-200 py-4 rounded-2xl text-lg font-semibold hover:bg-[#e4ede4] dark:hover:bg-gray-600 transition-colors"
                  >
                    Solicitar Nuevo Código
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full text-lg text-[#8bc34a] dark:text-[#9ccc65] font-semibold hover:underline transition-colors"
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
                  ¡Contraseña Cambiada!
                </h2>
                
                <div className="bg-[#e8f5e9] dark:bg-[#8bc34a20] border-2 border-[#8bc34a] rounded-2xl p-6 transition-colors">
                  <p className="text-lg text-[#0d1b0d] dark:text-gray-200 font-semibold mb-2 transition-colors">
                    <span className="text-3xl mr-2">🎉</span>
                    Su contraseña ha sido restablecida exitosamente
                  </p>
                  <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">
                    Ahora puede ingresar con su nueva contraseña
                  </p>
                </div>

                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-5 rounded-2xl text-xl font-bold hover:bg-[#7cb342] dark:hover:bg-[#689f38] transition-colors"
                >
                  Ir al Login
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
