import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8001"}/api/v1`;
const STATIC_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001";

// ── Notificaciones mock (HU-F12) ──────────────────────────────────────────────
// Cuando el backend implemente el endpoint se reemplaza este array por fetch().
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "rating",
    icon: "⭐",
    title: "Nueva calificación",
    message: "Don Carlos Ramírez calificó tu lote Hass Premium con 5 estrellas",
    time: "Hace 2 horas",
    isNew: true,
  },
  {
    id: 2,
    type: "visit",
    icon: "👁️",
    title: "Visitas al perfil",
    message: "12 personas visitaron tu perfil esta semana",
    time: "Hace 5 horas",
    isNew: true,
  },
  {
    id: 3,
    type: "lot",
    icon: "📦",
    title: "Lote publicado",
    message: "Tu lote Hass Exportación fue publicado exitosamente en la plaza",
    time: "Ayer",
    isNew: true,
  },
  {
    id: 4,
    type: "interest",
    icon: "💬",
    title: "Interés en tu lote",
    message: "3 compradores están interesados en tu lote Hass Selecto",
    time: "Hace 2 días",
    isNew: false,
  },
  {
    id: 5,
    type: "rating",
    icon: "⭐",
    title: "Nueva calificación",
    message: "Doña Ana López calificó tu perfil con 4 estrellas",
    time: "Hace 3 días",
    isNew: false,
  },
  {
    id: 6,
    type: "visit",
    icon: "👁️",
    title: "Visitas al perfil",
    message: "Tu perfil fue visto 28 veces este mes",
    time: "Hace 4 días",
    isNew: false,
  },
];

const NOTIF_COLORS = {
  rating:   { bg: "bg-yellow-50 dark:bg-yellow-900/20",  border: "border-yellow-200 dark:border-yellow-700",  dot: "bg-yellow-400" },
  visit:    { bg: "bg-blue-50 dark:bg-blue-900/20",      border: "border-blue-200 dark:border-blue-700",      dot: "bg-blue-400"   },
  lot:      { bg: "bg-green-50 dark:bg-green-900/20",    border: "border-green-200 dark:border-green-700",    dot: "bg-green-500"  },
  interest: { bg: "bg-purple-50 dark:bg-purple-900/20",  border: "border-purple-200 dark:border-purple-700",  dot: "bg-purple-400" },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, getToken, updateUserData } = useAuth();
  const photoInputRef = useRef(null);

  // ── Foto de perfil ────────────────────────────────────────────────────────
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoError, setPhotoError]   = useState("");
  const [photoSuccess, setPhotoSuccess] = useState(false);

  // ── Edición de perfil (HU-F10) ────────────────────────────────────────────
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", location: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError]     = useState("");
  const [editSuccess, setEditSuccess] = useState(false);

  // ── Cambio de contraseña (HU-F11) ─────────────────────────────────────────
  const [showPwdForm, setShowPwdForm] = useState(false);
  const [pwdForm, setPwdForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError,   setPwdError]   = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);

  // ── Logout modal — DEBE ir antes del early return ─────────────────────────
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogout = () => { logout(); navigate("/"); };

  // ── Notificaciones (HU-F12) ───────────────────────────────────────────────
  // readIds: IDs que el usuario ya vio, persistidos en localStorage por userId
  const storageKey = user ? `avocado_notif_read_${user.id}` : null;
  const [readIds, setReadIds] = useState(() => {
    if (!storageKey) return [];
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  });

  const notifications = useMemo(
    () =>
      MOCK_NOTIFICATIONS.map((n) => ({
        ...n,
        isNew: n.isNew && !readIds.includes(n.id),
      })),
    [readIds]
  );

  const unreadCount = useMemo(() => notifications.filter((n) => n.isNew).length, [notifications]);

  const markAllRead = () => {
    const allIds = MOCK_NOTIFICATIONS.map((n) => n.id);
    setReadIds(allIds);
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(allIds));
  };

  // ── Redirigir si no está logueado ─────────────────────────────────────────
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError("");
    setPhotoSuccess(false);
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setPhotoError("Solo se permiten imágenes JPEG, PNG o WEBP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("La imagen supera los 5 MB. Usa una imagen más pequeña.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
    setPhotoUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res  = await fetch(`${API_BASE}/users/me/photo`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setPhotoError(data.detail || "Error al subir la foto.");
        setPhotoPreview(null);
      } else {
        updateUserData({ profile_picture: data.profile_picture });
        setPhotoSuccess(true);
      }
    } catch {
      setPhotoError("No se pudo conectar con el servidor.");
      setPhotoPreview(null);
    } finally {
      setPhotoUploading(false);
      if (photoInputRef.current) photoInputRef.current.value = "";
    }
  };

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

  const handleSaveProfile = async () => {
    setEditError("");
    setEditSuccess(false);
    if (!editForm.name.trim()) { setEditError("El nombre no puede estar vacío."); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (editForm.email && !emailRegex.test(editForm.email)) { setEditError("El correo no tiene un formato válido."); return; }
    const phoneRegex = /^[0-9+\-\s()]*$/;
    if (editForm.phone && !phoneRegex.test(editForm.phone)) { setEditError("El teléfono solo puede contener números, +, - y espacios."); return; }
    setEditLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
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
        updateUserData({ name: data.name, email: data.email, phone: data.phone, location: data.location });
        setEditSuccess(true);
        setEditMode(false);
      }
    } catch {
      setEditError("No se pudo conectar con el servidor.");
    } finally {
      setEditLoading(false);
    }
  };

  const handlePwdChange = async () => {
    setPwdError("");
    setPwdSuccess(false);
    if (!pwdForm.current_password || !pwdForm.new_password || !pwdForm.confirm_password) { setPwdError("Complete todos los campos."); return; }
    if (pwdForm.new_password.length < 8) { setPwdError("La nueva contraseña debe tener al menos 8 caracteres."); return; }
    if (pwdForm.new_password !== pwdForm.confirm_password) { setPwdError("La nueva contraseña y su confirmación no coinciden."); return; }
    setPwdLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
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

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#f6f8f6] dark:bg-gray-900 min-h-screen flex flex-col transition-colors">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="bg-[#e8f5e9] dark:bg-gray-800 border-b-2 border-[#c5e1a5] dark:border-gray-700 px-6 py-6 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => !user && navigate("/")} className={`transition-opacity ${!user ? "hover:opacity-80 cursor-pointer" : "cursor-default"}`}>
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
              <button onClick={() => navigate("/batches")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Mis Lotes
              </button>
              {/* Mi Perfil con badge de notificaciones no leídas */}
              <button
                onClick={() => navigate("/profile")}
                className="relative text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold border-b-4 border-[#8bc34a] dark:border-[#9ccc65] pb-1 transition-colors"
              >
                Mi Perfil
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
                    {unreadCount}
                  </span>
                )}
              </button>
            </nav>
            <ThemeToggle />
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
            >
              <span>🚪</span>Salir
            </button>
            {showLogoutModal && (
              <ConfirmLogoutModal onConfirm={handleLogout} onCancel={() => setShowLogoutModal(false)} />
            )}
          </div>
        </div>
      </header>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
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

          {/* ── Tarjeta principal ──────────────────────────────────────────── */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 transition-colors">

            {/* Avatar + nombre */}
            <div className="flex items-center gap-5 mb-8">
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => photoInputRef.current?.click()}
                  disabled={photoUploading}
                  className="group relative size-24 rounded-full overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#8bc34a] focus:ring-offset-2 disabled:opacity-60"
                  title="Cambiar foto de perfil"
                >
                  {photoPreview || user.profile_picture ? (
                    <img
                      src={photoPreview || `${STATIC_BASE}/uploads/${user.profile_picture}`}
                      alt="Foto de perfil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#8bc34a] to-[#7cb342] flex items-center justify-center text-5xl">
                      👨‍🌾
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {photoUploading
                      ? <span className="text-white text-2xl animate-spin">⏳</span>
                      : <span className="text-white text-2xl">📷</span>
                    }
                  </div>
                </button>
                <input ref={photoInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoSelect} className="hidden" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">{user.name}</h3>
                {user.document_number && (
                  <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">C.C. {user.document_number}</p>
                )}
                <p className="text-sm text-[#8bc34a] dark:text-[#9ccc65] mt-1 font-medium">Toca la foto para cambiarla</p>
              </div>
            </div>

            {/* Mensajes de foto */}
            {photoError && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl px-4 py-3 mb-4">
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">⚠️ {photoError}</p>
              </div>
            )}
            {photoSuccess && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-xl px-4 py-3 mb-4">
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">✅ ¡Foto de perfil actualizada!</p>
              </div>
            )}
            {editSuccess && !editMode && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-xl px-4 py-3 mb-6">
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">✅ Perfil actualizado correctamente.</p>
              </div>
            )}

            {/* Modo visualización / edición */}
            {!editMode ? (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <InfoCard icon="👤" label="Nombre"    value={user.name     || "—"} />
                  <InfoCard icon="✉️" label="Correo"    value={user.email    || "—"} />
                  <InfoCard icon="📞" label="Teléfono"  value={user.phone    || "No registrado"} />
                  <InfoCard icon="📍" label="Ubicación" value={user.location || "No registrada"} />
                </div>
                <button
                  onClick={openEdit}
                  className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] dark:hover:bg-[#689f38] transition-colors mt-2"
                >
                  ✏️ Editar Perfil
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>👤 Nombre completo</label>
                    <input type="text"  value={editForm.name}     onChange={e => setEditForm(f => ({ ...f, name:     e.target.value }))} className={inputCls} placeholder="Su nombre completo" />
                  </div>
                  <div>
                    <label className={labelCls}>✉️ Correo electrónico</label>
                    <input type="email" value={editForm.email}    onChange={e => setEditForm(f => ({ ...f, email:    e.target.value }))} className={inputCls} placeholder="correo@ejemplo.com" />
                  </div>
                  <div>
                    <label className={labelCls}>📞 Teléfono / WhatsApp</label>
                    <input type="tel"   value={editForm.phone}    onChange={e => setEditForm(f => ({ ...f, phone:    e.target.value }))} className={inputCls} placeholder="+57 300 000 0000" />
                  </div>
                  <div>
                    <label className={labelCls}>📍 Ubicación</label>
                    <input type="text"  value={editForm.location} onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))} className={inputCls} placeholder="Municipio, Departamento" />
                  </div>
                </div>
                {editError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">⚠️ {editError}</p>
                  </div>
                )}
                <div className="flex gap-3">
                  <button onClick={handleSaveProfile} disabled={editLoading} className="flex-1 bg-[#8bc34a] dark:bg-[#7cb342] text-white py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {editLoading ? "Guardando..." : "💾 Guardar Cambios"}
                  </button>
                  <button onClick={() => { setEditMode(false); setEditError(""); }} disabled={editLoading} className="px-6 py-4 rounded-2xl text-xl font-bold bg-gray-100 dark:bg-gray-700 text-[#475569] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Panel de notificaciones (HU-F12) ─────────────────────────── */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 transition-colors">

            {/* Encabezado de sección */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔔</span>
                <h3 className="text-xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">
                  Actividad Reciente
                </h3>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-black rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-1.5 leading-none">
                    {unreadCount}
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-sm font-semibold text-[#8bc34a] dark:text-[#9ccc65] hover:underline transition-colors"
                >
                  Marcar todas como leídas
                </button>
              )}
            </div>

            {/* Lista de notificaciones o estado vacío */}
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <span className="text-5xl opacity-30">🔕</span>
                <p className="text-lg font-semibold text-[#475569] dark:text-gray-400 transition-colors">
                  No hay actividad reciente
                </p>
                <p className="text-sm text-[#94a3b8] dark:text-gray-500 transition-colors">
                  Aquí aparecerán calificaciones, visitas y novedades de sus lotes.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {notifications.map((notif) => {
                  const colors = NOTIF_COLORS[notif.type] || NOTIF_COLORS.visit;
                  return (
                    <li
                      key={notif.id}
                      className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-colors ${
                        notif.isNew
                          ? `${colors.bg} ${colors.border}`
                          : "bg-[#f9fafb] dark:bg-gray-700/50 border-transparent"
                      }`}
                    >
                      {/* Icono + punto de "no leído" */}
                      <div className="relative flex-shrink-0">
                        <span className="text-2xl">{notif.icon}</span>
                        {notif.isNew && (
                          <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${colors.dot} border-2 border-white dark:border-gray-800`} />
                        )}
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className={`text-sm font-bold ${notif.isNew ? "text-[#0d1b0d] dark:text-gray-100" : "text-[#475569] dark:text-gray-300"} transition-colors`}>
                            {notif.title}
                            {notif.isNew && (
                              <span className="ml-2 bg-[#8bc34a] text-[#0d1b0d] text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full">
                                Nuevo
                              </span>
                            )}
                          </p>
                          <span className="text-xs text-[#94a3b8] dark:text-gray-500 flex-shrink-0 transition-colors">
                            {notif.time}
                          </span>
                        </div>
                        <p className={`text-sm mt-0.5 ${notif.isNew ? "text-[#334155] dark:text-gray-200" : "text-[#64748b] dark:text-gray-400"} transition-colors`}>
                          {notif.message}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* ── Cambiar contraseña (HU-F11) ───────────────────────────────── */}
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
                  <input type="password" value={pwdForm.current_password} onChange={e => setPwdForm(f => ({ ...f, current_password: e.target.value }))} placeholder="••••••••" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Nueva contraseña</label>
                  <input type="password" value={pwdForm.new_password}      onChange={e => setPwdForm(f => ({ ...f, new_password:       e.target.value }))} placeholder="Mínimo 8 caracteres"     className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Confirmar nueva contraseña</label>
                  <input type="password" value={pwdForm.confirm_password}  onChange={e => setPwdForm(f => ({ ...f, confirm_password:   e.target.value }))} placeholder="Repita la nueva contraseña" className={inputCls} />
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
                <button onClick={handlePwdChange} disabled={pwdLoading} className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-3 rounded-xl text-lg font-bold hover:bg-[#7cb342] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {pwdLoading ? "Actualizando..." : "Actualizar contraseña"}
                </button>
              </div>
            )}
          </div>

          {/* ── Acciones ──────────────────────────────────────────────────── */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 flex flex-col sm:flex-row gap-3 transition-colors">
            <button
              onClick={() => navigate("/batches")}
              className="flex-1 bg-[#f3f7f3] dark:bg-gray-700 hover:bg-[#e4ede4] dark:hover:bg-gray-600 text-[#0d1b0d] dark:text-gray-200 py-4 rounded-2xl text-lg font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-2xl">📤</span> Publicar Lote Nuevo
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
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

// ── Sub-componente para tarjetas de info (modo lectura) ────────────────────────
function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-4 transition-colors">
      <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1 flex items-center gap-1">
        <span>{icon}</span> {label}
      </p>
      <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100 break-all">{value}</p>
    </div>
  );
}
