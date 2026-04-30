import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../contexts/AuthContext";
import { getAnalysisHistory } from "../services/api";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001";

const RIPENESS_LABEL = {
  verde:       "Verde",
  maduro:      "Maduro",
  sobremaduro: "Sobremaduro",
};

const DAMAGE_LABEL = {
  ninguno:  "Sin daños",
  leve:     "Daño leve",
  moderado: "Daño moderado",
  severo:   "Daño severo",
};

const DAMAGE_COLOR = {
  ninguno:  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  leve:     "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  moderado: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  severo:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

function formatDate(isoString) {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const { user, logout, getToken } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    const token = getToken();
    getAnalysisHistory(token, 50)
      .then((data) => setHistory(data.history || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user, navigate, getToken]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

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
              <button onClick={() => navigate("/history")} className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold border-b-4 border-[#8bc34a] dark:border-[#9ccc65] pb-1 transition-colors">
                Mi Historial
              </button>
              <button onClick={() => navigate("/profile")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Mi Perfil
              </button>
            </nav>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
            >
              <span>🚪</span>
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">📋</span>
              <h2 className="text-4xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">
                Mi Historial
              </h2>
            </div>
            <p className="text-xl text-[#475569] dark:text-gray-400 transition-colors">
              Todos sus diagnósticos anteriores, del más reciente al más antiguo.
            </p>
          </div>

          {loading && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
              <span className="text-6xl animate-spin inline-block">⏳</span>
              <p className="text-2xl font-semibold text-[#475569] dark:text-gray-400 mt-4 transition-colors">
                Cargando historial...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-3xl p-8 border-2 border-red-200 dark:border-red-800 text-center transition-colors">
              <span className="text-5xl">⚠️</span>
              <p className="text-xl font-semibold text-red-600 dark:text-red-400 mt-3">{error}</p>
            </div>
          )}

          {!loading && !error && history.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
              <span className="text-8xl">🔍</span>
              <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mt-4 mb-2 transition-colors">
                Aún no tiene diagnósticos
              </h3>
              <p className="text-xl text-[#475569] dark:text-gray-400 mb-6 transition-colors">
                Cuando analice sus aguacates con sesión iniciada, aparecerán aquí.
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-[#8bc34a] dark:bg-[#7cb342] text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] transition-colors"
              >
                Ir a Diagnóstico
              </button>
            </div>
          )}

          {!loading && !error && history.length > 0 && (
            <div className="space-y-4">
              <p className="text-lg text-[#475569] dark:text-gray-400 transition-colors">
                {history.length} diagnóstico{history.length !== 1 ? "s" : ""} encontrado{history.length !== 1 ? "s" : ""}
              </p>

              {history.map((item, index) => (
                <div
                  key={item.analysis_id || index}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-colors hover:shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Imagen */}
                    <div className="sm:w-40 h-40 flex-shrink-0 bg-[#e8f5e9] dark:bg-gray-700">
                      {item.file_path ? (
                        <img
                          src={`${API_BASE}/${item.file_path}`}
                          alt="Aguacate analizado"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="w-full h-full items-center justify-center text-5xl"
                        style={{ display: item.file_path ? "none" : "flex" }}
                      >
                        🥑
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col sm:flex-row flex-1 gap-4 p-6">
                      <div className="flex-1">
                        <p className="text-sm text-[#475569] dark:text-gray-400 mb-2 transition-colors">
                          📅 {formatDate(item.created_at)}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="bg-[#8bc34a20] dark:bg-[#8bc34a30] text-[#689f38] dark:text-[#9ccc65] px-3 py-1 rounded-full text-sm font-semibold">
                            {RIPENESS_LABEL[item.ripeness_level] || item.ripeness_level}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${DAMAGE_COLOR[item.damage_level] || "bg-gray-100 text-gray-600"}`}>
                            {DAMAGE_LABEL[item.damage_level] || item.damage_level}
                          </span>
                        </div>
                        {item.message && (
                          <p className="text-sm text-[#475569] dark:text-gray-400 transition-colors line-clamp-2">
                            {item.message}
                          </p>
                        )}
                      </div>

                      {/* Precio */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm text-[#475569] dark:text-gray-400 mb-1 transition-colors">
                          Precio sugerido
                        </p>
                        <p className="text-3xl font-black text-[#8bc34a] dark:text-[#9ccc65] transition-colors">
                          ${Number(item.price_sale || 0).toLocaleString("es-CO")}
                        </p>
                        <p className="text-sm text-[#475569] dark:text-gray-400 transition-colors">COP/kg</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
