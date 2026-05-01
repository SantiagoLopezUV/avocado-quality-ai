import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../contexts/AuthContext";
import { getAnalysisHistory } from "../services/api";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001";

// ── Catálogos de etiquetas y colores ─────────────────────────────────────────
const RIPENESS_LABEL = {
  verde:       "Verde",
  maduro:      "Maduro",
  sobremaduro: "Sobremaduro",
};
const RIPENESS_BADGE = {
  verde:       "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  maduro:      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  sobremaduro: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};
const DAMAGE_LABEL = {
  ninguno:  "Sin daños",
  leve:     "Daño leve",
  moderado: "Daño moderado",
  severo:   "Daño severo",
};
const DAMAGE_BADGE = {
  ninguno:  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  leve:     "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  moderado: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  severo:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

function formatDate(isoString) {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleString("es-CO", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

const FILTERS_INITIAL = {
  ripeness: "todos",
  damage:   "todos",
  dateFrom: "",
  dateTo:   "",
  minPrice: "",
  maxPrice: "",
  minConf:  "",
};

// ── Componente principal ──────────────────────────────────────────────────────
export default function HistoryPage() {
  const navigate    = useNavigate();
  const { user, logout, getToken } = useAuth();

  const [lotes,       setLotes]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [expandedId,  setExpandedId]  = useState(null);
  const [search,      setSearch]      = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters,     setFilters]     = useState(FILTERS_INITIAL);

  // ── Carga de datos ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) { navigate("/"); return; }
    getAnalysisHistory(getToken(), 100)
      .then(data => setLotes(data.history || []))
      .catch(err  => setError(err.message))
      .finally(() => setLoading(false));
  }, [user, navigate, getToken]);

  const handleLogout = () => { logout(); navigate("/"); };

  // ── Limpiar filtros ─────────────────────────────────────────────────────────
  const clearFilters = () => { setSearch(""); setFilters(FILTERS_INITIAL); };

  const hasActiveFilters = search
    || filters.ripeness !== "todos"
    || filters.damage   !== "todos"
    || filters.dateFrom || filters.dateTo
    || filters.minPrice || filters.maxPrice
    || filters.minConf;

  // ── Filtrado en memoria (HU-B13) ────────────────────────────────────────────
  const filtered = useMemo(() => {
    return lotes.filter(item => {
      // Búsqueda de texto
      if (search) {
        const s      = search.toLowerCase();
        const rLabel = (RIPENESS_LABEL[item.ripeness_level] || item.ripeness_level || "").toLowerCase();
        const dLabel = (DAMAGE_LABEL[item.damage_level]     || item.damage_level   || "").toLowerCase();
        const fecha  = formatDate(item.created_at).toLowerCase();
        if (!rLabel.includes(s) && !dLabel.includes(s) && !fecha.includes(s)) return false;
      }
      // Filtros de selección
      if (filters.ripeness !== "todos" && item.ripeness_level !== filters.ripeness) return false;
      if (filters.damage   !== "todos" && item.damage_level   !== filters.damage)   return false;
      // Rango de fechas
      if (filters.dateFrom && new Date(item.created_at) < new Date(filters.dateFrom)) return false;
      if (filters.dateTo   && new Date(item.created_at) > new Date(filters.dateTo + "T23:59:59")) return false;
      // Rango de precio
      if (filters.minPrice && Number(item.price_sale) < Number(filters.minPrice)) return false;
      if (filters.maxPrice && Number(item.price_sale) > Number(filters.maxPrice)) return false;
      // Confianza mínima (BD guarda 0-1)
      const conf = Math.round((item.confidence || 0) * 100);
      if (filters.minConf && conf < Number(filters.minConf)) return false;
      return true;
    });
  }, [lotes, search, filters]);

  if (!user) return null;

  const inputCls = "w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors";
  const labelCls = "text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1 block";

  return (
    <div className="bg-[#f6f8f6] dark:bg-gray-900 min-h-screen flex flex-col transition-colors">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
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
                Mis Lotes
              </button>
              <button onClick={() => navigate("/profile")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Mi Perfil
              </button>
            </nav>
            <ThemeToggle />
            <button onClick={handleLogout} className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
              <span>🚪</span>Salir
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Título de sección */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">📦</span>
              <h2 className="text-4xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">
                Mis Lotes
              </h2>
            </div>
            <p className="text-xl text-[#475569] dark:text-gray-400 transition-colors">
              Todos sus diagnósticos guardados, del más reciente al más antiguo.
            </p>
            {/* Chips de resumen */}
            {lotes.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-[#8bc34a20] dark:bg-[#8bc34a30] text-[#689f38] dark:text-[#9ccc65] px-4 py-1.5 rounded-full text-sm font-semibold">
                  📊 {lotes.length} diagnóstico{lotes.length !== 1 ? "s" : ""} en total
                </span>
                {hasActiveFilters && (
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold">
                    🔍 {filtered.length} mostrado{filtered.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ── Barra de búsqueda + filtros (HU-B13) ──────────────────────── */}
          {!loading && !error && lotes.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 mb-6 transition-colors">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Buscar por madurez, estado, fecha..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 border-2 border-[#e8f5e9] dark:border-gray-600 rounded-xl px-4 py-2.5 text-base focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors"
                />
                <button
                  onClick={() => setShowFilters(v => !v)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm border-2 transition-colors ${
                    showFilters
                      ? "bg-[#8bc34a] text-white border-[#8bc34a]"
                      : "border-[#8bc34a] text-[#8bc34a] hover:bg-[#8bc34a10]"
                  }`}
                >
                  ⚙️ Filtros{hasActiveFilters && !search ? " ●" : ""}
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-red-500 border-2 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    ✕ Limpiar
                  </button>
                )}
              </div>

              {/* Panel de filtros */}
              {showFilters && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t-2 border-[#e8f5e9] dark:border-gray-700">
                  <div>
                    <label className={labelCls}>Madurez</label>
                    <select value={filters.ripeness} onChange={e => setFilters(f => ({ ...f, ripeness: e.target.value }))} className={inputCls}>
                      <option value="todos">Todas</option>
                      <option value="verde">Verde</option>
                      <option value="maduro">Maduro</option>
                      <option value="sobremaduro">Sobremaduro</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Estado de salud</label>
                    <select value={filters.damage} onChange={e => setFilters(f => ({ ...f, damage: e.target.value }))} className={inputCls}>
                      <option value="todos">Todos</option>
                      <option value="ninguno">Sin daños</option>
                      <option value="leve">Daño leve</option>
                      <option value="moderado">Daño moderado</option>
                      <option value="severo">Daño severo</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Confianza IA mínima (%)</label>
                    <input type="number" min="0" max="100" value={filters.minConf} placeholder="Ej: 70"
                      onChange={e => setFilters(f => ({ ...f, minConf: e.target.value }))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Desde</label>
                    <input type="date" value={filters.dateFrom}
                      onChange={e => setFilters(f => ({ ...f, dateFrom: e.target.value }))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Hasta</label>
                    <input type="date" value={filters.dateTo}
                      onChange={e => setFilters(f => ({ ...f, dateTo: e.target.value }))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Precio mínimo (COP/kg)</label>
                    <input type="number" value={filters.minPrice} placeholder="Ej: 4000"
                      onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Precio máximo (COP/kg)</label>
                    <input type="number" value={filters.maxPrice} placeholder="Ej: 8000"
                      onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))} className={inputCls} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Estados de carga / error ────────────────────────────────────── */}
          {loading && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
              <span className="text-6xl animate-spin inline-block">⏳</span>
              <p className="text-2xl font-semibold text-[#475569] dark:text-gray-400 mt-4 transition-colors">
                Cargando sus lotes...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-3xl p-8 border-2 border-red-200 dark:border-red-800 text-center transition-colors">
              <span className="text-5xl">⚠️</span>
              <p className="text-xl font-semibold text-red-600 dark:text-red-400 mt-3">{error}</p>
            </div>
          )}

          {/* ── Estado vacío: sin diagnósticos (HU-B12) ────────────────────── */}
          {!loading && !error && lotes.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
              <span className="text-8xl">📦</span>
              <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mt-4 mb-2 transition-colors">
                Aún no tiene lotes guardados
              </h3>
              <p className="text-xl text-[#475569] dark:text-gray-400 mb-6 transition-colors">
                Cuando analice sus aguacates con sesión iniciada, el diagnóstico se guardará aquí como un lote.
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-[#8bc34a] dark:bg-[#7cb342] text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] transition-colors"
              >
                Hacer mi primer diagnóstico
              </button>
            </div>
          )}

          {/* ── Estado vacío: filtros sin resultados ────────────────────────── */}
          {!loading && !error && lotes.length > 0 && filtered.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
              <span className="text-8xl">🔍</span>
              <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mt-4 mb-2 transition-colors">
                Sin resultados
              </h3>
              <p className="text-xl text-[#475569] dark:text-gray-400 mb-6 transition-colors">
                Ningún lote coincide con los criterios aplicados.
              </p>
              <button
                onClick={clearFilters}
                className="bg-[#8bc34a] dark:bg-[#7cb342] text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] transition-colors"
              >
                Quitar filtros
              </button>
            </div>
          )}

          {/* ── Lista de lotes (HU-B12) ─────────────────────────────────────── */}
          {!loading && !error && filtered.length > 0 && (
            <div className="space-y-4">
              {filtered.map((item) => {
                const loteNum  = lotes.length - lotes.indexOf(item);
                const isExpanded = expandedId === item.analysis_id;
                const conf       = Math.round((item.confidence || 0) * 100);

                return (
                  <div
                    key={item.analysis_id}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
                  >
                    {/* Cabecera del lote — siempre visible, clic para expandir */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.analysis_id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center gap-4 p-6">
                        {/* Número de lote */}
                        <div className="flex-shrink-0 w-14 h-14 bg-[#8bc34a20] dark:bg-[#8bc34a30] rounded-2xl flex items-center justify-center">
                          <span className="text-[#689f38] dark:text-[#9ccc65] font-black text-lg">#{loteNum}</span>
                        </div>

                        {/* Badges + fecha */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${RIPENESS_BADGE[item.ripeness_level] || "bg-gray-100 text-gray-600"}`}>
                              {RIPENESS_LABEL[item.ripeness_level] || item.ripeness_level}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${DAMAGE_BADGE[item.damage_level] || "bg-gray-100 text-gray-600"}`}>
                              {DAMAGE_LABEL[item.damage_level] || item.damage_level}
                            </span>
                            <span className="text-sm text-[#8bc34a] dark:text-[#9ccc65] font-semibold">
                              🤖 {conf}% confianza
                            </span>
                          </div>
                          <p className="text-sm text-[#475569] dark:text-gray-400">
                            📅 {formatDate(item.created_at)}
                          </p>
                        </div>

                        {/* Precio */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-2xl font-black text-[#8bc34a] dark:text-[#9ccc65]">
                            ${Number(item.price_sale || 0).toLocaleString("es-CO")}
                          </p>
                          <p className="text-xs text-[#475569] dark:text-gray-400">COP/kg</p>
                        </div>

                        {/* Flecha */}
                        <span className={`text-[#8bc34a] dark:text-[#9ccc65] text-xl transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                          ▼
                        </span>
                      </div>
                    </button>

                    {/* Detalle expandido del lote (HU-B12) */}
                    {isExpanded && (
                      <div className="border-t-2 border-[#e8f5e9] dark:border-gray-700 px-6 pb-6 pt-5">
                        <div className="flex flex-col sm:flex-row gap-6">
                          {/* Imagen del análisis */}
                          <div className="sm:w-44 h-44 flex-shrink-0 rounded-2xl overflow-hidden bg-[#e8f5e9] dark:bg-gray-700 flex items-center justify-center">
                            {item.file_path ? (
                              <img
                                src={`${API_BASE}/${item.file_path}`}
                                alt="Aguacate analizado"
                                className="w-full h-full object-cover"
                                onError={e => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <span className="text-5xl" style={{ display: item.file_path ? "none" : "block" }}>🥑</span>
                          </div>

                          {/* Grid de detalles */}
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-xl p-4 transition-colors">
                              <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1">Madurez</p>
                              <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100">
                                {RIPENESS_LABEL[item.ripeness_level] || item.ripeness_level}
                              </p>
                            </div>
                            <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-xl p-4 transition-colors">
                              <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1">Estado de salud</p>
                              <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100">
                                {DAMAGE_LABEL[item.damage_level] || item.damage_level}
                              </p>
                            </div>
                            <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-xl p-4 col-span-2 transition-colors">
                              <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-2">Confianza de la IA</p>
                              <div className="flex items-center gap-3">
                                <p className="text-xl font-black text-[#8bc34a] dark:text-[#9ccc65] w-12">{conf}%</p>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                                  <div
                                    className="bg-[#8bc34a] dark:bg-[#9ccc65] h-full rounded-full transition-all"
                                    style={{ width: `${conf}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-xl p-4 transition-colors">
                              <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1">Precio de compra</p>
                              <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100">
                                ${Number(item.price_purchase || 0).toLocaleString("es-CO")}
                                <span className="text-xs font-normal text-[#475569] dark:text-gray-400 ml-1">COP/kg</span>
                              </p>
                            </div>
                            <div className="bg-[#8bc34a10] dark:bg-[#8bc34a20] rounded-xl p-4 border border-[#8bc34a30] transition-colors">
                              <p className="text-xs font-semibold text-[#689f38] dark:text-[#9ccc65] mb-1">Precio sugerido de venta</p>
                              <p className="text-xl font-black text-[#8bc34a] dark:text-[#9ccc65]">
                                ${Number(item.price_sale || 0).toLocaleString("es-CO")}
                                <span className="text-xs font-normal text-[#689f38] dark:text-[#9ccc65] ml-1">COP/kg</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
