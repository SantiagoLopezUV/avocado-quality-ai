import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "Don Roberto Pérez",
    farm: "Finca La Esperanza",
    location: "Caicedonia, Valle del Cauca",
    phone: "320 456 7890",
    email: "roberto.perez@ejemplo.com",
    experience: "25 años cultivando aguacate",
    area: "15 hectáreas",
    certification: "Certificado ICA",
  });

  const stats = {
    totalSales: 45,
    activeListings: 3,
    rating: 4.8,
    totalRevenue: "$125,450,000",
  };

  const recentActivity = [
    { id: 1, action: "Vendió lote Hass Premium", date: "Hace 2 días", amount: "$2,250,000" },
    { id: 2, action: "Publicó nuevo lote", date: "Hace 5 días", amount: "-" },
    { id: 3, action: "Recibió calificación 5⭐", date: "Hace 1 semana", amount: "-" },
    { id: 4, action: "Vendió lote Exportación", date: "Hace 2 semanas", amount: "$5,200,000" },
  ];

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
              <button onClick={() => navigate("/profile")} className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold border-b-4 border-[#8bc34a] dark:border-[#9ccc65] pb-1 transition-colors">
                Mi Perfil
              </button>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">👨‍🌾</span>
              <h2 className="text-4xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">Mi Perfil</h2>
            </div>
            <p className="text-xl text-[#475569] dark:text-gray-400 leading-relaxed transition-colors">
              Aquí puede ver y editar su información, revisar sus ventas y manejar su cuenta.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 transition-colors">
                <div className="text-center mb-6">
                  <div className="size-32 bg-gradient-to-br from-[#8bc34a] to-[#7cb342] rounded-full mx-auto mb-4 flex items-center justify-center text-7xl">
                    👨‍🌾
                  </div>
                  <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-2 transition-colors">{profile.name}</h3>
                  <p className="text-lg text-[#475569] dark:text-gray-400 transition-colors">{profile.farm}</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <span className="text-3xl">⭐</span>
                    <span className="text-2xl font-bold text-[#8bc34a] dark:text-[#9ccc65] transition-colors">{stats.rating}</span>
                    <span className="text-lg text-[#475569] dark:text-gray-400 transition-colors">(45 ventas)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">Ubicación</p>
                      <p className="text-lg font-semibold text-[#0d1b0d] dark:text-gray-200 transition-colors">{profile.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">Teléfono</p>
                      <p className="text-lg font-semibold text-[#0d1b0d] dark:text-gray-200 transition-colors">{profile.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">Correo</p>
                      <p className="text-lg font-semibold text-[#0d1b0d] dark:text-gray-200 break-all transition-colors">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌳</span>
                    <div>
                      <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">Experiencia</p>
                      <p className="text-lg font-semibold text-[#0d1b0d] dark:text-gray-200 transition-colors">{profile.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📐</span>
                    <div>
                      <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">Área cultivada</p>
                      <p className="text-lg font-semibold text-[#0d1b0d] dark:text-gray-200 transition-colors">{profile.area}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">Certificación</p>
                      <p className="text-lg font-semibold text-[#8bc34a] dark:text-[#9ccc65] transition-colors">{profile.certification}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setEditMode(!editMode)}
                  className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] dark:hover:bg-[#689f38] transition-colors mt-6"
                >
                  {editMode ? "Guardar Cambios" : "Editar Perfil"}
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 space-y-3 transition-colors">
                <h3 className="text-xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-4 transition-colors">Acciones Rápidas</h3>
                <button className="w-full bg-[#f3f7f3] dark:bg-gray-700 hover:bg-[#e4ede4] dark:hover:bg-gray-600 text-[#0d1b0d] dark:text-gray-200 py-3 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <span className="text-2xl">📤</span>
                  Publicar Lote Nuevo
                </button>
                <button className="w-full bg-[#f3f7f3] dark:bg-gray-700 hover:bg-[#e4ede4] dark:hover:bg-gray-600 text-[#0d1b0d] dark:text-gray-200 py-3 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <span className="text-2xl">💬</span>
                  Mis Mensajes
                </button>
                <button className="w-full bg-[#f3f7f3] dark:bg-gray-700 hover:bg-[#e4ede4] dark:hover:bg-gray-600 text-[#0d1b0d] dark:text-gray-200 py-3 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <span className="text-2xl">⚙️</span>
                  Configuración
                </button>
              </div>
            </div>

            {/* Right Column - Stats and Activity */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-lg text-[#475569] dark:text-gray-400 mb-2 transition-colors">Total Ventas</p>
                      <p className="text-4xl font-black text-[#0d1b0d] dark:text-gray-100 transition-colors">{stats.totalSales}</p>
                    </div>
                    <span className="text-5xl">💰</span>
                  </div>
                  <div className="bg-[#8bc34a10] dark:bg-[#8bc34a20] rounded-xl px-3 py-2 inline-block transition-colors">
                    <p className="text-sm font-semibold text-[#8bc34a] dark:text-[#9ccc65] transition-colors">+5 este mes</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-lg text-[#475569] dark:text-gray-400 mb-2 transition-colors">Lotes Activos</p>
                      <p className="text-4xl font-black text-[#0d1b0d] dark:text-gray-100 transition-colors">{stats.activeListings}</p>
                    </div>
                    <span className="text-5xl">📦</span>
                  </div>
                  <div className="bg-[#fff4e6] dark:bg-orange-900/30 rounded-xl px-3 py-2 inline-block transition-colors">
                    <p className="text-sm font-semibold text-[#ff8c00] dark:text-orange-400 transition-colors">2 pendientes de revisar</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#8bc34a] to-[#7cb342] rounded-2xl shadow-lg p-6 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl text-white opacity-90 mb-2">Ingresos Totales</p>
                      <p className="text-5xl font-black text-white">{stats.totalRevenue}</p>
                    </div>
                    <span className="text-7xl">💵</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 flex items-center gap-3 transition-colors">
                    <span className="text-3xl">📊</span>
                    Actividad Reciente
                  </h3>
                  <button className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-semibold hover:underline transition-colors">
                    Ver todo
                  </button>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-5 flex items-center justify-between hover:bg-[#e4ede4] dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-xl font-semibold text-[#0d1b0d] dark:text-gray-100 mb-1 transition-colors">
                          {activity.action}
                        </p>
                        <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">{activity.date}</p>
                      </div>
                      {activity.amount !== "-" && (
                        <p className="text-2xl font-bold text-[#8bc34a] dark:text-[#9ccc65] transition-colors">{activity.amount}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* My Listings */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 transition-colors">
                <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-6 flex items-center gap-3 transition-colors">
                  <span className="text-3xl">🥑</span>
                  Mis Lotes Publicados
                </h3>

                <div className="space-y-4">
                  <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-5 flex items-center gap-4 transition-colors">
                    <div className="size-20 bg-gradient-to-br from-[#8bc34a] to-[#7cb342] rounded-xl flex items-center justify-center text-5xl">
                      🥑
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-1 transition-colors">Hass Premium</h4>
                      <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">500 kg • $4,500/kg</p>
                      <div className="flex gap-2 mt-2">
                        <span className="bg-[#8bc34a] dark:bg-[#7cb342] text-white px-3 py-1 rounded-full text-sm font-bold">
                          Activo
                        </span>
                        <span className="bg-white dark:bg-gray-600 text-[#475569] dark:text-gray-300 px-3 py-1 rounded-full text-sm font-semibold transition-colors">
                          12 visitas
                        </span>
                      </div>
                    </div>
                    <button className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold hover:underline transition-colors">
                      Editar
                    </button>
                  </div>

                  <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-5 flex items-center gap-4 transition-colors">
                    <div className="size-20 bg-gradient-to-br from-[#8bc34a] to-[#7cb342] rounded-xl flex items-center justify-center text-5xl">
                      🥑
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-1 transition-colors">Hass Exportación</h4>
                      <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">1,000 kg • $5,200/kg</p>
                      <div className="flex gap-2 mt-2">
                        <span className="bg-[#8bc34a] dark:bg-[#7cb342] text-white px-3 py-1 rounded-full text-sm font-bold">
                          Activo
                        </span>
                        <span className="bg-white dark:bg-gray-600 text-[#475569] dark:text-gray-300 px-3 py-1 rounded-full text-sm font-semibold transition-colors">
                          28 visitas
                        </span>
                      </div>
                    </div>
                    <button className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold hover:underline transition-colors">
                      Editar
                    </button>
                  </div>

                  <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-5 flex items-center gap-4 opacity-60 transition-colors">
                    <div className="size-20 bg-[#e4ede4] dark:bg-gray-600 rounded-xl flex items-center justify-center text-5xl transition-colors">
                      🥑
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-[#0d1b0d] dark:text-gray-300 mb-1 transition-colors">Hass Selecto</h4>
                      <p className="text-base text-[#475569] dark:text-gray-400 transition-colors">750 kg • $4,800/kg</p>
                      <div className="flex gap-2 mt-2">
                        <span className="bg-[#94a3b8] text-white px-3 py-1 rounded-full text-sm font-bold">
                          Vendido
                        </span>
                        <span className="bg-white dark:bg-gray-600 text-[#475569] dark:text-gray-300 px-3 py-1 rounded-full text-sm font-semibold transition-colors">
                          Hace 2 días
                        </span>
                      </div>
                    </div>
                    <button className="text-lg text-[#475569] dark:text-gray-400 font-bold transition-colors">
                      Ver
                    </button>
                  </div>
                </div>

                <button className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] dark:hover:bg-[#689f38] transition-colors mt-6">
                  + Publicar Nuevo Lote
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
