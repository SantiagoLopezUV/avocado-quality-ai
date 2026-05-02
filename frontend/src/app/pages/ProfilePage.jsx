import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8001"}/api/v1`;

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, getToken, updateUserData } = useAuth();

  // ── Edición de perfil (HU-F10) ────────────────────────────────────────────
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError]   = useState("");
  const [editSuccess, setEditSuccess] = useState(false);

  // ── Cambio de contraseña (HU-F11) ─────────────────────────────────────────
  const [showPwdForm, setShowPwdForm] = useState(false);
  const [pwdForm, setPwdForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError,   setPwdError]   = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);

  // Redirigir si no está logueado
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => { logout(); navigate("/"); };

  // ── Abrir modo edición ─────────────────────────────────────────────────────
  const openEdit = () => {
    setEditForm({
      name:     user.name     || "",
      email:    user.email    || "",
      phone:    user.phone    || "",
      location: user.location || "",
    });
    setEditError("");
    setEditSuccess(false);
    setEditMode(true);
  };

  // ── Validar y guardar perfil ───────────────────────────────────────────────
  const handleSaveProfile = async () => {
    setEditError("");
    setEditSuccess(false);

    // Validaciones client-side
    if (!editForm.name.trim()) {
      setEditError("El nombre no puede estar vacío.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (editForm.email && !emailRegex.test(editForm.email)) {
      setEditError("El correo no tiene un formato válido.");
      return;
    }
    const phoneRegex = /^[0-9+\-\s()]*$/;
    if (editForm.phone && !phoneRegex.test(editForm.phone)) {
      setEditError("El teléfono solo puede contener números, +, - y espacios.");
      return;
    }

    setEditLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name:     editForm.name     || undefined,
          email:    editForm.email    || undefined,
          phone:    editForm.phone    || undefined,
          location: editForm.location || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEditError(data.detail || "Error al guardar los cambios.");
      } else {
        // Actualizar contexto y localStorage inmediatamente
        updateUserData({
          name:     data.name,
          email:    data.email,
          phone:    data.phone,
          location: data.location,
        });
        setEditSuccess(true);
        setEditMode(false);
      }
    } catch {
      setEditError("No se pudo conectar con el servidor.");
    } finally {
      setEditLoading(false);
    }
  };

  // ── Cambio de contraseña ───────────────────────────────────────────────────
  const handlePwdChange = async () => {
    setPwdError("");
    setPwdSuccess(false);

    if (!pwdForm.current_password || !pwdForm.new_password || !pwdForm.confirm_password) {
      setPwdError("Complete todos los campos.");
      return;
    }
    if (pwdForm.new_password.length < 8) {
      setPwdError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (pwdForm.new_password !== pwdForm.confirm_password) {
      setPwdError("La nueva contraseña y su confirmación no coinciden.");
      return;
    }

    setPwdLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(pwdForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setPwdError(data.detail || "Error al cambiar la contraseña.");
      } else {
        setPwdSuccess(true);
        setPwdForm({ current_password: "", new_password: "", confirm_password: "" });
      }
    } catch {
      setPwdError("No se pudo conectar con el servidor.");
    } finally {
      setPwdLoading(false);
    }
  };

  // ── Helpers de estilo ──────────────────────────────────────────────────────
  const inputCls = "w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-base focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors";
  const labelCls = "block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-1";

  return (
    <div className="bg-[#f6f8f6] dark:bg-gray-900 min-h-screen flex flex-col transition-colors">

      {/* Header */}
      <header className="bg-[#e8f5e9] dark:bg-gray-800 border-b-2 border-[#c5e1a5] dark:border-gray-700 px-6 py-6 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <Logo size="lg" showText={true} />
          </button>
          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              <button onClick={() => navigate("/dashboard")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Diagnóstico
              </button>
              <button onClick={() => navigate("/marketplace")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Mi Plaza
              </button>
              <button onClick={() => navigate("/help")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Ayuda
              </button>
              <button onClick={() => navigate("/history")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Mis Lotes
              </button>
              <button onClick={() => navigate("/profile")} className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold border-b-4 border-[#8bc34a] dark:border-[#9ccc65] pb-1 transition-colors">
                Mi Perfil
              </button>
            </nav>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
            >
              <span>🚪</span>Salir
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Título */}
          <div className="flex items-center gap-3">
            <span className="text-4xl">👨‍🌾</span>
            <div>
              <h2 className="text-4xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">Mi Perfil</h2>
              <p className="text-lg text-[#475569] dark:text-gray-400 transition-colors">Vea y edite su información personal</p>
            </div>
          </div>

          {/* Tarjeta principal del perfil */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 transition-colors">

            {/* Avatar + nombre */}
            <div className="flex items-center gap-5 mb-8">
              <div className="size-24 bg-gradient-to-br from-[#8bc34a] to-[#7cb342] rounded-full flex items-center justify-center text-5xl flex-shrink-0">
                👨‍🌾
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">
                  {user.name}
                </h3>
                {user.document_number && (
                  <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">
                    C.C. {user.document_number}
                  </p>
                )}
              </div>
            </div>

            {/* Mensaje de éxito tras guardar */}
            {editSuccess && !editMode && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-xl px-4 py-3 mb-6">
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">✅ Perfil actualizado correctamente.</p>
              </div>
            )}

            {/* Modo visualización */}
            {!editMode ? (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-4 transition-colors">
                    <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1 flex items-center gap-1"><span>👤</span> Nombre</p>
                    <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100">{user.name || "—"}</p>
                  </div>
                  <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-4 transition-colors">
                    <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1 flex items-center gap-1"><span>✉️</span> Correo</p>
                    <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100 break-all">{user.email || "—"}</p>
                  </div>
                  <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-4 transition-colors">
                    <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1 flex items-center gap-1"><span>📞</span> Teléfono</p>
                    <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100">{user.phone || "No registrado"}</p>
                  </div>
                  <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-4 transition-colors">
                    <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1 flex items-center gap-1"><span>📍</span> Ubicación</p>
                    <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100">{user.location || "No registrada"}</p>
                  </div>
                </div>

                <button
                  onClick={openEdit}
                  className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] dark:hover:bg-[#689f38] transition-colors mt-2"
                >
                  ✏️ Editar Perfil
                </button>
              </div>

            ) : (
              /* Modo edición */
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>👤 Nombre completo</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                      className={inputCls}
                      placeholder="Su nombre completo"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>✉️ Correo electrónico</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                      className={inputCls}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>📞 Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                      className={inputCls}
                      placeholder="+57 300 000 0000"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>📍 Ubicación</label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))}
                      className={inputCls}
                      placeholder="Municipio, Departamento"
                    />
                  </div>
                </div>

                {editError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">⚠️ {editError}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveProfile}
                    disabled={editLoading}
                    className="flex-1 bg-[#8bc34a] dark:bg-[#7cb342] text-white py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editLoading ? "Guardando..." : "💾 Guardar Cambios"}
                  </button>
                  <button
                    onClick={() => { setEditMode(false); setEditError(""); }}
                    disabled={editLoading}
                    className="px-6 py-4 rounded-2xl text-xl font-bold bg-gray-100 dark:bg-gray-700 text-[#475569] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cambiar contraseña (HU-F11) */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 transition-colors">
            <button
              onClick={() => { setShowPwdForm(v => !v); setPwdError(""); setPwdSuccess(false); }}
              className="w-full flex items-center justify-between text-xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors"
            >
              <span className="flex items-center gap-2"><span className="text-2xl">🔒</span> Cambiar contraseña</span>
              <span className={`text-[#8bc34a] transition-transform duration-200 ${showPwdForm ? "rotate-180" : ""}`}>▼</span>
            </button>

            {showPwdForm && (
              <div className="mt-5 space-y-4">
                <div>
                  <label className={labelCls}>Contraseña actual</label>
                  <input type="password" value={pwdForm.current_password}
                    onChange={e => setPwdForm(f => ({ ...f, current_password: e.target.value }))}
                    placeholder="••••••••" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Nueva contraseña</label>
                  <input type="password" value={pwdForm.new_password}
                    onChange={e => setPwdForm(f => ({ ...f, new_password: e.target.value }))}
                    placeholder="Mínimo 8 caracteres" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Confirmar nueva contraseña</label>
                  <input type="password" value={pwdForm.confirm_password}
                    onChange={e => setPwdForm(f => ({ ...f, confirm_password: e.target.value }))}
                    placeholder="Repita la nueva contraseña" className={inputCls} />
                </div>

                {pwdError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">⚠️ {pwdError}</p>
                  </div>
                )}
                {pwdSuccess && (
                  <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-xl px-4 py-3">
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400">✅ ¡Contraseña actualizada! Puede seguir navegando.</p>
                  </div>
                )}

                <button
                  onClick={handlePwdChange}
                  disabled={pwdLoading}
                  className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-3 rounded-xl text-lg font-bold hover:bg-[#7cb342] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {pwdLoading ? "Actualizando..." : "Actualizar contraseña"}
                </button>
              </div>
            )}
          </div>

          {/* Acciones */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 flex flex-col sm:flex-row gap-3 transition-colors">
            <button
              onClick={() => navigate("/history")}
              className="flex-1 bg-[#f3f7f3] dark:bg-gray-700 hover:bg-[#e4ede4] dark:hover:bg-gray-600 text-[#0d1b0d] dark:text-gray-200 py-4 rounded-2xl text-lg font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-2xl">📤</span> Publicar Lote Nuevo
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-2 border-red-200 dark:border-red-800 py-4 rounded-2xl text-lg font-bold hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-2xl">🚪</span> Cerrar Sesión
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
