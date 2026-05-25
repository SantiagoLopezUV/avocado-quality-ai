// import { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router";
// import Logo from "../components/Logo";
// import ThemeToggle from "../components/ThemeToggle";
// import ConfirmLogoutModal from "../components/ConfirmLogoutModal";
// import { useAuth } from "../contexts/AuthContext";
// import { getAnalysisHistory } from "../services/api";

// const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001";

// // ── Catálogos de etiquetas y colores ─────────────────────────────────────────
// const RIPENESS_LABEL = {
//   verde:       "Verde",
//   maduro:      "Maduro",
//   sobremaduro: "Sobremaduro",
// };
// const RIPENESS_BADGE = {
//   verde:       "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
//   maduro:      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
//   sobremaduro: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
// };
// const DAMAGE_LABEL = {
//   ninguno:  "Sin daños",
//   leve:     "Daño leve",
//   moderado: "Daño moderado",
//   severo:   "Daño severo",
// };
// const DAMAGE_BADGE = {
//   ninguno:  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
//   leve:     "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
//   moderado: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
//   severo:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
// };

// function formatDate(isoString) {
//   if (!isoString) return "-";
//   return new Date(isoString).toLocaleString("es-CO", {
//     day: "2-digit", month: "short", year: "numeric",
//     hour: "2-digit", minute: "2-digit",
//   });
// }

// const FILTERS_INITIAL = {
//   ripeness: "todos",
//   damage:   "todos",
//   dateFrom: "",
//   dateTo:   "",
//   minPrice: "",
//   maxPrice: "",
//   minConf:  "",
// };

// // ── Componente principal ──────────────────────────────────────────────────────
// export default function HistoryPage() {
//   const navigate    = useNavigate();
//   const { user, logout, getToken } = useAuth();

//   const [lotes,       setLotes]       = useState([]);
//   const [loading,     setLoading]     = useState(true);
//   const [error,       setError]       = useState(null);
//   const [expandedId,  setExpandedId]  = useState(null);
//   const [search,      setSearch]      = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters,     setFilters]     = useState(FILTERS_INITIAL);

//   // ── Carga de datos ──────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!user) { navigate("/"); return; }
//     getAnalysisHistory(getToken(), 100)
//       .then(data => setLotes(data.history || []))
//       .catch(err  => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [user, navigate, getToken]);

//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const handleLogout = () => { logout(); navigate("/"); };

//   // ── Limpiar filtros ─────────────────────────────────────────────────────────
//   const clearFilters = () => { setSearch(""); setFilters(FILTERS_INITIAL); };

//   const hasActiveFilters = search
//     || filters.ripeness !== "todos"
//     || filters.damage   !== "todos"
//     || filters.dateFrom || filters.dateTo
//     || filters.minPrice || filters.maxPrice
//     || filters.minConf;

//   // ── Filtrado en memoria (HU-B13) ────────────────────────────────────────────
//   const filtered = useMemo(() => {
//     return lotes.filter(item => {
//       // Búsqueda de texto
//       if (search) {
//         const s      = search.toLowerCase();
//         const rLabel = (RIPENESS_LABEL[item.ripeness_level] || item.ripeness_level || "").toLowerCase();
//         const dLabel = (DAMAGE_LABEL[item.damage_level]     || item.damage_level   || "").toLowerCase();
//         const fecha  = formatDate(item.created_at).toLowerCase();
//         if (!rLabel.includes(s) && !dLabel.includes(s) && !fecha.includes(s)) return false;
//       }
//       // Filtros de selección
//       if (filters.ripeness !== "todos" && item.ripeness_level !== filters.ripeness) return false;
//       if (filters.damage   !== "todos" && item.damage_level   !== filters.damage)   return false;
//       // Rango de fechas
//       if (filters.dateFrom && new Date(item.created_at) < new Date(filters.dateFrom)) return false;
//       if (filters.dateTo   && new Date(item.created_at) > new Date(filters.dateTo + "T23:59:59")) return false;
//       // Rango de precio
//       if (filters.minPrice && Number(item.price_sale) < Number(filters.minPrice)) return false;
//       if (filters.maxPrice && Number(item.price_sale) > Number(filters.maxPrice)) return false;
//       // Confianza mínima (BD guarda 0-1)
//       const conf = Math.round((item.confidence || 0) * 100);
//       if (filters.minConf && conf < Number(filters.minConf)) return false;
//       return true;
//     });
//   }, [lotes, search, filters]);

//   if (!user) return null;

//   const inputCls = "w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors";
//   const labelCls = "text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1 block";

//   return (
//     <div className="bg-[#f6f8f6] dark:bg-gray-900 min-h-screen flex flex-col transition-colors">

//       {/* ── Header ─────────────────────────────────────────────────────────── */}
//       <header className="bg-[#e8f5e9] dark:bg-gray-800 border-b-2 border-[#c5e1a5] dark:border-gray-700 px-6 py-6 sticky top-0 z-50 transition-colors">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <button onClick={() => !user && navigate("/")} className={`transition-opacity ${!user ? "hover:opacity-80 cursor-pointer" : "cursor-default"}`}>
//             <Logo size="lg" showText={true} />
//           </button>
//           <div className="flex items-center gap-6">
//             <nav className="flex gap-6">
//               <button onClick={() => navigate("/dashboard")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
//                 Diagnóstico
//               </button>
//               <button onClick={() => navigate("/marketplace")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
//                 Mi Plaza
//               </button>
//               <button onClick={() => navigate("/help")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
//                 Ayuda
//               </button>
//               <button onClick={() => navigate("/batches")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
//                 Mis Lotes
//               </button>
//               <button onClick={() => navigate("/profile")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
//                 Mi Perfil
//               </button>
//             </nav>
//             <ThemeToggle />
//             <button onClick={() => setShowLogoutModal(true)} className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
//               <span>🚪</span>Salir
//             </button>
//             {showLogoutModal && (
//               <ConfirmLogoutModal
//                 onConfirm={handleLogout}
//                 onCancel={() => setShowLogoutModal(false)}
//               />
//             )}
//           </div>
//         </div>
//       </header>

//       {/* ── Main ───────────────────────────────────────────────────────────── */}
//       <main className="flex-1 px-6 py-8">
//         <div className="max-w-4xl mx-auto">

//           {/* Título de sección */}
//           <div className="mb-8">
//             <div className="flex items-center gap-3 mb-3">
//               <span className="text-4xl">📦</span>
//               <h2 className="text-4xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">
//                 Mis Lotes
//               </h2>
//             </div>
//             <p className="text-xl text-[#475569] dark:text-gray-400 transition-colors">
//               Todos sus diagnósticos guardados, del más reciente al más antiguo.
//             </p>
//             {/* Chips de resumen */}
//             {lotes.length > 0 && (
//               <div className="flex flex-wrap gap-3 mt-4">
//                 <span className="bg-[#8bc34a20] dark:bg-[#8bc34a30] text-[#689f38] dark:text-[#9ccc65] px-4 py-1.5 rounded-full text-sm font-semibold">
//                   📊 {lotes.length} diagnóstico{lotes.length !== 1 ? "s" : ""} en total
//                 </span>
//                 {hasActiveFilters && (
//                   <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold">
//                     🔍 {filtered.length} mostrado{filtered.length !== 1 ? "s" : ""}
//                   </span>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* ── Barra de búsqueda + filtros — siempre visible (HU-B13) ───── */}
//           {!loading && !error && (
//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 mb-6 transition-colors">
//               <div className="flex gap-3">
//                 <input
//                   type="text"
//                   placeholder="Buscar por madurez, estado, fecha..."
//                   value={search}
//                   onChange={e => setSearch(e.target.value)}
//                   className="flex-1 border-2 border-[#e8f5e9] dark:border-gray-600 rounded-xl px-4 py-2.5 text-base focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors"
//                 />
//                 <button
//                   onClick={() => setShowFilters(v => !v)}
//                   className={`px-4 py-2 rounded-xl font-semibold text-sm border-2 transition-colors ${
//                     showFilters
//                       ? "bg-[#8bc34a] text-white border-[#8bc34a]"
//                       : "border-[#8bc34a] text-[#8bc34a] hover:bg-[#8bc34a10]"
//                   }`}
//                 >
//                   ⚙️ Filtros{hasActiveFilters && !search ? " ●" : ""}
//                 </button>
//                 {hasActiveFilters && (
//                   <button
//                     onClick={clearFilters}
//                     className="px-4 py-2 rounded-xl text-sm font-semibold text-red-500 border-2 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                   >
//                     ✕ Limpiar
//                   </button>
//                 )}
//               </div>

//               {/* Panel de filtros */}
//               {showFilters && (
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t-2 border-[#e8f5e9] dark:border-gray-700">
//                   <div>
//                     <label className={labelCls}>Madurez</label>
//                     <select value={filters.ripeness} onChange={e => setFilters(f => ({ ...f, ripeness: e.target.value }))} className={inputCls}>
//                       <option value="todos">Todas</option>
//                       <option value="verde">Verde</option>
//                       <option value="maduro">Maduro</option>
//                       <option value="sobremaduro">Sobremaduro</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelCls}>Estado de salud</label>
//                     <select value={filters.damage} onChange={e => setFilters(f => ({ ...f, damage: e.target.value }))} className={inputCls}>
//                       <option value="todos">Todos</option>
//                       <option value="ninguno">Sin daños</option>
//                       <option value="leve">Daño leve</option>
//                       <option value="moderado">Daño moderado</option>
//                       <option value="severo">Daño severo</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelCls}>Confianza IA mínima (%)</label>
//                     <input type="number" min="0" max="100" value={filters.minConf} placeholder="Ej: 70"
//                       onChange={e => setFilters(f => ({ ...f, minConf: e.target.value }))} className={inputCls} />
//                   </div>
//                   <div>
//                     <label className={labelCls}>Desde</label>
//                     <input type="date" value={filters.dateFrom}
//                       onChange={e => setFilters(f => ({ ...f, dateFrom: e.target.value }))} className={inputCls} />
//                   </div>
//                   <div>
//                     <label className={labelCls}>Hasta</label>
//                     <input type="date" value={filters.dateTo}
//                       onChange={e => setFilters(f => ({ ...f, dateTo: e.target.value }))} className={inputCls} />
//                   </div>
//                   <div>
//                     <label className={labelCls}>Precio mínimo (COP/kg)</label>
//                     <input type="number" value={filters.minPrice} placeholder="Ej: 4000"
//                       onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))} className={inputCls} />
//                   </div>
//                   <div>
//                     <label className={labelCls}>Precio máximo (COP/kg)</label>
//                     <input type="number" value={filters.maxPrice} placeholder="Ej: 8000"
//                       onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))} className={inputCls} />
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── Estado de carga ─────────────────────────────────────────────── */}
//           {loading && (
//             <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
//               <span className="text-6xl animate-spin inline-block">⏳</span>
//               <p className="text-2xl font-semibold text-[#475569] dark:text-gray-400 mt-4 transition-colors">
//                 Cargando sus lotes...
//               </p>
//             </div>
//           )}

//           {/* ── Error de carga ──────────────────────────────────────────────── */}
//           {error && (
//             <div className="bg-red-50 dark:bg-red-900/20 rounded-3xl p-8 border-2 border-red-200 dark:border-red-800 text-center transition-colors">
//               <span className="text-5xl">⚠️</span>
//               <p className="text-xl font-semibold text-red-600 dark:text-red-400 mt-3">{error}</p>
//             </div>
//           )}

//           {/* ── Sin lotes aún ──────────────────────────────────────────────── */}
//           {!loading && !error && lotes.length === 0 && (
//             <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
//               <span className="text-8xl">📦</span>
//               <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mt-4 mb-2 transition-colors">
//                 Aún no tiene lotes guardados
//               </h3>
//               <p className="text-xl text-[#475569] dark:text-gray-400 mb-6 transition-colors">
//                 Haga un diagnóstico y guarde el resultado para verlo aquí.
//               </p>
//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="bg-[#8bc34a] dark:bg-[#7cb342] text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] transition-colors"
//               >
//                 Hacer mi primer diagnóstico
//               </button>
//             </div>
//           )}

//           {/* ── Estado vacío: filtros sin resultados ────────────────────────── */}
//           {!loading && !error && lotes.length > 0 && filtered.length === 0 && (
//             <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
//               <span className="text-8xl">🔍</span>
//               <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mt-4 mb-2 transition-colors">
//                 Sin resultados
//               </h3>
//               <p className="text-xl text-[#475569] dark:text-gray-400 mb-6 transition-colors">
//                 Ningún lote coincide con los criterios aplicados.
//               </p>
//               <button
//                 onClick={clearFilters}
//                 className="bg-[#8bc34a] dark:bg-[#7cb342] text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] transition-colors"
//               >
//                 Quitar filtros
//               </button>
//             </div>
//           )}

//           {/* ── Lista de lotes (HU-B12) ─────────────────────────────────────── */}
//           {!loading && !error && filtered.length > 0 && (
//             <div className="space-y-4">
//               {filtered.map((item) => {
//                 const loteNum  = lotes.length - lotes.indexOf(item);
//                 const isExpanded = expandedId === item.analysis_id;
//                 const conf       = Math.round((item.confidence || 0) * 100);

//                 return (
//                   <div
//                     key={item.analysis_id}
//                     className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
//                   >
//                     {/* Cabecera del lote — siempre visible, clic para expandir */}
//                     <button
//                       onClick={() => setExpandedId(isExpanded ? null : item.analysis_id)}
//                       className="w-full text-left"
//                     >
//                       <div className="flex items-center gap-4 p-6">
//                         {/* Número de lote */}
//                         <div className="flex-shrink-0 w-14 h-14 bg-[#8bc34a20] dark:bg-[#8bc34a30] rounded-2xl flex items-center justify-center">
//                           <span className="text-[#689f38] dark:text-[#9ccc65] font-black text-lg">#{loteNum}</span>
//                         </div>

//                         {/* Badges + fecha */}
//                         <div className="flex-1 min-w-0">
//                           <div className="flex flex-wrap items-center gap-2 mb-1">
//                             <span className={`px-3 py-1 rounded-full text-sm font-semibold ${RIPENESS_BADGE[item.ripeness_level] || "bg-gray-100 text-gray-600"}`}>
//                               {RIPENESS_LABEL[item.ripeness_level] || item.ripeness_level}
//                             </span>
//                             <span className={`px-3 py-1 rounded-full text-sm font-semibold ${DAMAGE_BADGE[item.damage_level] || "bg-gray-100 text-gray-600"}`}>
//                               {DAMAGE_LABEL[item.damage_level] || item.damage_level}
//                             </span>
//                             <span className="text-sm text-[#8bc34a] dark:text-[#9ccc65] font-semibold">
//                               🤖 {conf}% confianza
//                             </span>
//                           </div>
//                           <p className="text-sm text-[#475569] dark:text-gray-400">
//                             📅 {formatDate(item.created_at)}
//                           </p>
//                         </div>

//                         {/* Precio */}
//                         <div className="text-right flex-shrink-0">
//                           <p className="text-2xl font-black text-[#8bc34a] dark:text-[#9ccc65]">
//                             ${Number(item.price_sale || 0).toLocaleString("es-CO")}
//                           </p>
//                           <p className="text-xs text-[#475569] dark:text-gray-400">COP/kg</p>
//                         </div>

//                         {/* Flecha */}
//                         <span className={`text-[#8bc34a] dark:text-[#9ccc65] text-xl transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
//                           ▼
//                         </span>
//                       </div>
//                     </button>

//                     {/* Detalle expandido del lote (HU-B12) */}
//                     {isExpanded && (
//                       <div className="border-t-2 border-[#e8f5e9] dark:border-gray-700 px-6 pb-6 pt-5">
//                         <div className="flex flex-col sm:flex-row gap-6">
//                           {/* Imagen del análisis */}
//                           <div className="sm:w-44 h-44 flex-shrink-0 rounded-2xl overflow-hidden bg-[#e8f5e9] dark:bg-gray-700 flex items-center justify-center">
//                             {item.file_path ? (
//                               <img
//                                 src={`${API_BASE}/${item.file_path}`}
//                                 alt="Aguacate analizado"
//                                 className="w-full h-full object-cover"
//                                 onError={e => {
//                                   e.target.style.display = "none";
//                                   e.target.nextSibling.style.display = "flex";
//                                 }}
//                               />
//                             ) : null}
//                             <span className="text-5xl" style={{ display: item.file_path ? "none" : "block" }}>🥑</span>
//                           </div>

//                           {/* Grid de detalles */}
//                           <div className="flex-1 grid grid-cols-2 gap-3">
//                             <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-xl p-4 transition-colors">
//                               <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1">Madurez</p>
//                               <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100">
//                                 {RIPENESS_LABEL[item.ripeness_level] || item.ripeness_level}
//                               </p>
//                             </div>
//                             <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-xl p-4 transition-colors">
//                               <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1">Estado de salud</p>
//                               <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100">
//                                 {DAMAGE_LABEL[item.damage_level] || item.damage_level}
//                               </p>
//                             </div>
//                             <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-xl p-4 col-span-2 transition-colors">
//                               <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-2">Confianza de la IA</p>
//                               <div className="flex items-center gap-3">
//                                 <p className="text-xl font-black text-[#8bc34a] dark:text-[#9ccc65] w-12">{conf}%</p>
//                                 <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
//                                   <div
//                                     className="bg-[#8bc34a] dark:bg-[#9ccc65] h-full rounded-full transition-all"
//                                     style={{ width: `${conf}%` }}
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-xl p-4 transition-colors">
//                               <p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1">Precio de compra</p>
//                               <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100">
//                                 ${Number(item.price_purchase || 0).toLocaleString("es-CO")}
//                                 <span className="text-xs font-normal text-[#475569] dark:text-gray-400 ml-1">COP/kg</span>
//                               </p>
//                             </div>
//                             <div className="bg-[#8bc34a10] dark:bg-[#8bc34a20] rounded-xl p-4 border border-[#8bc34a30] transition-colors">
//                               <p className="text-xs font-semibold text-[#689f38] dark:text-[#9ccc65] mb-1">Precio sugerido de venta</p>
//                               <p className="text-xl font-black text-[#8bc34a] dark:text-[#9ccc65]">
//                                 ${Number(item.price_sale || 0).toLocaleString("es-CO")}
//                                 <span className="text-xs font-normal text-[#689f38] dark:text-[#9ccc65] ml-1">COP/kg</span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }


import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal";
import { useAuth } from "../contexts/AuthContext";
import { 
  getAnalysisHistory, 
  listBatches, 
  createBatch, 
  getBatchDetail, 
  deleteBatch, 
  deleteAnalysisFromBatch,
  assignAnalysisToBatch,
  deleteAnalysis
} from "../services/api";

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
    timezone: "America/Bogota",
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

  // ── Estados combinados ──
  const [analyses,    setAnalyses]    = useState([]); 
  const [batches,     setBatches]     = useState([]);
  const [activeBatch, setActiveBatch] = useState(null);
  
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [expandedId,  setExpandedId]  = useState(null);
  const [search,      setSearch]      = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters,     setFilters]     = useState(FILTERS_INITIAL);
  
  const [showCreate,  setShowCreate]  = useState(false);
  const [newBatchName,setNewBatchName]= useState("");
  const [selectedBatchForAnalysis, setSelectedBatchForAnalysis] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // ── Carga de datos ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) { navigate("/"); return; }
    loadInitialData();
  }, [user, navigate, getToken]);

  async function loadInitialData() {
    setLoading(true);
    try {
      const [historyData, batchesData] = await Promise.all([
        getAnalysisHistory(getToken(), 100),
        listBatches(getToken())
      ]);
      setAnalyses(historyData.history || []);
      setBatches(batchesData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── Funciones de Lotes ──────────────────────────────────────────────────────
  async function handleCreateBatch(e) {
    e.preventDefault();
    if (!newBatchName.trim()) return;
    try {
      await createBatch(getToken(), newBatchName.trim());
      setNewBatchName("");
      setShowCreate(false);
      const updatedBatches = await listBatches(getToken());
      setBatches(updatedBatches);
    } catch (err) {
      alert("Error al crear lote: " + err.message);
    }
  }

  async function openBatch(batch) {
    setLoading(true);
    try {
      const detail = await getBatchDetail(getToken(), batch.id);
      setActiveBatch(detail);
      setExpandedId(null);
    } catch (err) {
      alert("Error al abrir el lote");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteBatch(batchId) {
    if (!window.confirm("¿Está seguro? Se eliminarán todos los análisis dentro de este lote.")) return;
    try {
      await deleteBatch(getToken(), batchId);
      setActiveBatch(null);
      loadInitialData();
    } catch (err) {
      alert("Error al eliminar lote");
    }
  }


  async function handleDeleteAnalysis(analysisId) {
    try {
      await deleteAnalysis(getToken(), analysisId);
      setConfirmDeleteId(null);
      if (activeBatch) {
        setActiveBatch(prev => ({
          ...prev,
          analyses: prev.analyses.filter(item => item.analysis_id !== analysisId),
        }));
      } else {
        setAnalyses(prev => prev.filter(item => item.analysis_id !== analysisId));
      }
    } catch (err) {
      setConfirmDeleteId(null);
      alert("Error al eliminar el análisis: " + err.message);
    }
  }

  async function handleAssignToBatch(analysisId) {
    const batchId = selectedBatchForAnalysis[analysisId];
    if (!batchId) return alert("Selecciona un lote primero.");
    try {
      await assignAnalysisToBatch(getToken(), batchId, analysisId);
      alert("✅ Análisis agregado al lote con éxito");
      setAnalyses(prevAnalyses => // Actualizar estado local eliminando el análisis asignado
        prevAnalyses.filter(item => item.analysis_id !== analysisId)
      );
      setSelectedBatchForAnalysis(prev => { // Limpiar selección del lote para este análisis
        const newState = { ...prev };
        delete newState[analysisId];
        return newState;
      });
    } catch (err) {
      alert("Error al asignar al lote: " + err.message);
    }
  }

  async function handleRemoveFromBatch(analysisId) {
    if (!window.confirm("¿Quitar este análisis del lote?")) return;
    try {
      await deleteAnalysisFromBatch(getToken(), activeBatch.id, analysisId);
      await openBatch(activeBatch);
      loadInitialData();
    } catch (err) {
      alert("Error al quitar el análisis");
    }
  }

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogout = () => { logout(); navigate("/"); };

  // ── Limpiar filtros ─────────────────────────────────────────────────────────
  const clearFilters = () => { setSearch(""); setFilters(FILTERS_INITIAL); };

  const hasActiveFilters = search
    || filters.ripeness !== "todos"
    || filters.damage   !== "todos"
    || filters.dateFrom || filters.dateTo
    || filters.minPrice || filters.maxPrice
    || filters.minConf;

  // ── Filtrado en memoria ─────────────────────────────────────────────────────
  const currentListToFilter = activeBatch ? activeBatch.analyses : analyses;

  const filtered = useMemo(() => {
    return currentListToFilter.filter(item => {
      if (search) {
        const s      = search.toLowerCase();
        const rLabel = (RIPENESS_LABEL[item.ripeness_level] || item.ripeness_level || "").toLowerCase();
        const dLabel = (DAMAGE_LABEL[item.damage_level]    || item.damage_level   || "").toLowerCase();
        const fecha  = formatDate(item.created_at).toLowerCase();
        if (!rLabel.includes(s) && !dLabel.includes(s) && !fecha.includes(s)) return false;
      }
      if (filters.ripeness !== "todos" && item.ripeness_level !== filters.ripeness) return false;
      if (filters.damage   !== "todos" && item.damage_level   !== filters.damage)   return false;
      // if (filters.dateFrom && new Date(item.created_at).getTime() < new Date(filters.dateFrom + "T05:00:00Z").getTime()) return false;
      // if (filters.dateTo   && new Date(item.created_at).getTime() > new Date(filters.dateTo   + "T04:59:59Z").getTime()) return false;
      if (filters.dateFrom && new Date(item.created_at) < new Date(filters.dateFrom)) return false;
      if (filters.dateTo   && new Date(item.created_at) > new Date(filters.dateTo + "T23:59:59")) return false;
      if (filters.minPrice && Number(item.price_sale) < Number(filters.minPrice)) return false;
      if (filters.maxPrice && Number(item.price_sale) > Number(filters.maxPrice)) return false;
      const conf = Math.round((item.confidence || 0) * 100);
      if (filters.minConf && conf < Number(filters.minConf)) return false;
      return true;
    });
  }, [currentListToFilter, search, filters]);

  if (!user) return null;

  // Clases CSS originales preservadas
  const inputCls = "w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors";
  const labelCls = "text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1 block";

  return (
    <div className="bg-[#f6f8f6] dark:bg-gray-900 min-h-screen flex flex-col transition-colors">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="bg-[#e8f5e9] dark:bg-gray-800 border-b-2 border-[#c5e1a5] dark:border-gray-700 px-6 py-6 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => !user && navigate("/")} className={`transition-opacity ${!user ? "hover:opacity-80 cursor-pointer" : "cursor-default"}`}>
            <Logo size="lg" showText={true} />
          </button>
          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              <button onClick={() => navigate("/dashboard")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">Diagnóstico</button>
              <button onClick={() => navigate("/marketplace")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">Mi Plaza</button>
              <button onClick={() => navigate("/help")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">Ayuda</button>
              <button onClick={() => navigate("/batches")} className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold border-b-2 border-[#8bc34a]">Mis Lotes</button>
              <button onClick={() => navigate("/profile")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">Mi Perfil</button>
            </nav>
            <ThemeToggle />
            <button onClick={() => setShowLogoutModal(true)} className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
              <span>🚪</span>Salir
            </button>
            {showLogoutModal && <ConfirmLogoutModal onConfirm={handleLogout} onCancel={() => setShowLogoutModal(false)} />}
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">

          {/* ── GESTIÓN DE LOTES (Se oculta al entrar a un lote) ── */}
          {!activeBatch && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">📦</span>
                  <h2 className="text-4xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">Mis Lotes</h2>
                </div>
                <button 
                  onClick={() => setShowCreate(!showCreate)}
                  className="bg-[#8bc34a] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#7cb342] transition-colors"
                >
                  {showCreate ? "✕ Cancelar" : "+ Crear lote"}
                </button>
              </div>
              <p className="text-xl text-[#475569] dark:text-gray-400 transition-colors mb-6">
                Organiza tus diagnósticos en lotes por cosecha o grupo.
              </p>

              {showCreate && (
                <form onSubmit={handleCreateBatch} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md mb-6 flex gap-3">
                  <input autoFocus type="text" placeholder="Nombre del nuevo lote..." value={newBatchName} onChange={(e) => setNewBatchName(e.target.value)} className="flex-1 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 focus:border-[#8bc34a] outline-none dark:bg-gray-700 dark:text-white" />
                  <button type="submit" className="bg-[#8bc34a] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#7cb342]">Guardar</button>
                </form>
              )}


              {/* Lista de carpetas de lotes */}
              {batches.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {batches.map(batch => (
                    <div key={batch.id} className="bg-white dark:bg-gray-800 border-2 border-[#e8f5e9] dark:border-gray-700 rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">📦</span>
                        <div>
                          <p className="font-bold text-[#0d1b0d] dark:text-gray-100 text-lg">{batch.name}</p>
                          <p className="text-xs text-gray-500">📅 {formatDate(batch.created_at)}</p>
                        </div>
                      </div>
                      <button onClick={() => openBatch(batch)} className="bg-[#8bc34a] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#7cb342]">Ver lote →</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── ENCABEZADO DE LOTE ACTIVO ── */}
          {activeBatch && (
            <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between border-l-8 border-[#8bc34a] gap-4">
              <div>
                <button onClick={() => setActiveBatch(null)} className="text-sm font-bold text-[#8bc34a] hover:underline mb-2 block">← Volver a todos los lotes</button>
                <h2 className="text-3xl font-bold text-[#0d1b0d] dark:text-gray-100 flex items-center gap-2">
                  <span>📂</span> {activeBatch.name}
                </h2>
                <p className="text-[#475569] dark:text-gray-400 mt-1">Viendo los análisis dentro de este lote.</p>
              </div>
              <button onClick={() => handleDeleteBatch(activeBatch.id)} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-100 border border-red-200">
                🗑️ Eliminar Lote Completo
              </button>
            </div>
          )}

          {/* Chips de resumen */}
          {!loading && !error && (
            <div className="flex flex-wrap gap-3 mt-4 mb-6">
              <span className="bg-[#8bc34a20] dark:bg-[#8bc34a30] text-[#689f38] dark:text-[#9ccc65] px-4 py-1.5 rounded-full text-sm font-semibold">
                📊 {currentListToFilter.length} diagnóstico{currentListToFilter.length !== 1 ? "s" : ""} en total
              </span>
              {hasActiveFilters && (
                <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold">
                  🔍 {filtered.length} mostrado{filtered.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          )}

          {/* ── Barra de búsqueda + filtros — (Original restaurada) ── */}
          {!loading && !error && (
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

              {/* Panel de filtros (Exactamente igual a tu código) */}
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

          {/* ── Estado de carga ─────────────────────────────────────────────── */}
          {loading && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
              <span className="text-6xl animate-spin inline-block">⏳</span>
              <p className="text-2xl font-semibold text-[#475569] dark:text-gray-400 mt-4 transition-colors">Cargando...</p>
            </div>
          )}

          {/* ── Error de carga ──────────────────────────────────────────────── */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-3xl p-8 border-2 border-red-200 dark:border-red-800 text-center transition-colors">
              <span className="text-5xl">⚠️</span>
              <p className="text-xl font-semibold text-red-600 dark:text-red-400 mt-3">{error}</p>
            </div>
          )}

          {/* ── Sin análisis ──────────────────────────────────────────────── */}
          {!loading && !error && currentListToFilter.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
              <span className="text-8xl">🥑</span>
              <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mt-4 mb-2 transition-colors">
                No hay diagnósticos aquí
              </h3>
              <p className="text-xl text-[#475569] dark:text-gray-400 mb-6 transition-colors">
                {activeBatch ? "Este lote está vacío." : "Haga un diagnóstico y guarde el resultado para verlo aquí."}
              </p>
              {!activeBatch && (
                <button onClick={() => navigate("/dashboard")} className="bg-[#8bc34a] dark:bg-[#7cb342] text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] transition-colors">
                  Hacer mi primer diagnóstico
                </button>
              )}
            </div>
          )}

          {/* ── Estado vacío: filtros sin resultados ────────────────────────── */}
          {!loading && !error && currentListToFilter.length > 0 && filtered.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
              <span className="text-8xl">🔍</span>
              <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mt-4 mb-2 transition-colors">Sin resultados</h3>
              <p className="text-xl text-[#475569] dark:text-gray-400 mb-6 transition-colors">Ningún análisis coincide con los criterios aplicados.</p>
              <button onClick={clearFilters} className="bg-[#8bc34a] dark:bg-[#7cb342] text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] transition-colors">
                Quitar filtros
              </button>
            </div>
          )}

          {/* ── Lista de Análisis ─────────────────────────────────────── */}
          {!loading && !error && filtered.length > 0 && (
            <div className="space-y-4">
              {filtered.map((item, index) => {
                const loteNum  = currentListToFilter.length - index;
                const isExpanded = expandedId === item.analysis_id;
                const conf       = Math.round((item.confidence || 0) * 100);

                return (
                  <div key={item.analysis_id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
                    <button onClick={() => setExpandedId(isExpanded ? null : item.analysis_id)} className="w-full text-left">
                      <div className="flex items-center gap-4 p-6">
                        <div className="flex-shrink-0 w-14 h-14 bg-[#8bc34a20] dark:bg-[#8bc34a30] rounded-2xl flex items-center justify-center">
                          <span className="text-[#689f38] dark:text-[#9ccc65] font-black text-lg">#{loteNum}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${RIPENESS_BADGE[item.ripeness_level] || "bg-gray-100 text-gray-600"}`}>
                              {RIPENESS_LABEL[item.ripeness_level] || item.ripeness_level}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${DAMAGE_BADGE[item.damage_level] || "bg-gray-100 text-gray-600"}`}>
                              {DAMAGE_LABEL[item.damage_level] || item.damage_level}
                            </span>
                            <span className="text-sm text-[#8bc34a] dark:text-[#9ccc65] font-semibold">🤖 {conf}% confianza</span>
                          </div>
                          <p className="text-sm text-[#475569] dark:text-gray-400">📅 {formatDate(item.created_at)}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-2xl font-black text-[#8bc34a] dark:text-[#9ccc65]">
                            ${Number(item.price_sale || 0).toLocaleString("es-CO")}
                          </p>
                          <p className="text-xs text-[#475569] dark:text-gray-400">COP/kg</p>
                        </div>
                        <span className={`text-[#8bc34a] dark:text-[#9ccc65] text-xl transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>▼</span>
                      </div>
                    </button>

                    {/* Detalle expandido */}
                    {isExpanded && (
                      <div className="border-t-2 border-[#e8f5e9] dark:border-gray-700 px-6 pb-6 pt-5">
                        <div className="flex flex-col sm:flex-row gap-6">
                          <div className="sm:w-44 h-44 flex-shrink-0 rounded-2xl overflow-hidden bg-[#e8f5e9] dark:bg-gray-700 flex items-center justify-center">
                            {item.file_path ? (
                              <img src={`${API_BASE}/${item.file_path}`} alt="Aguacate analizado" className="w-full h-full object-cover" onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                            ) : null}
                            <span className="text-5xl" style={{ display: item.file_path ? "none" : "block" }}>🥑</span>
                          </div>
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-xl p-4 transition-colors"><p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1">Madurez</p><p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100">{RIPENESS_LABEL[item.ripeness_level] || item.ripeness_level}</p></div>
                            <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-xl p-4 transition-colors"><p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1">Estado de salud</p><p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100">{DAMAGE_LABEL[item.damage_level] || item.damage_level}</p></div>
                            <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-xl p-4 col-span-2 transition-colors"><p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-2">Confianza de la IA</p><div className="flex items-center gap-3"><p className="text-xl font-black text-[#8bc34a] dark:text-[#9ccc65] w-12">{conf}%</p><div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden"><div className="bg-[#8bc34a] dark:bg-[#9ccc65] h-full rounded-full transition-all" style={{ width: `${conf}%` }} /></div></div></div>
                            <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-xl p-4 transition-colors"><p className="text-xs font-semibold text-[#475569] dark:text-gray-400 mb-1">Precio de compra</p><p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100">${Number(item.price_purchase || 0).toLocaleString("es-CO")} <span className="text-xs font-normal text-[#475569] dark:text-gray-400 ml-1">COP/kg</span></p></div>
                            <div className="bg-[#8bc34a10] dark:bg-[#8bc34a20] rounded-xl p-4 border border-[#8bc34a30] transition-colors"><p className="text-xs font-semibold text-[#689f38] dark:text-[#9ccc65] mb-1">Precio sugerido de venta</p><p className="text-xl font-black text-[#8bc34a] dark:text-[#9ccc65]">${Number(item.price_sale || 0).toLocaleString("es-CO")} <span className="text-xs font-normal text-[#689f38] dark:text-[#9ccc65] ml-1">COP/kg</span></p></div>
                          </div>
                        </div>

                        {/* ── BOTONERA PARA AGREGAR/QUITAR DE UN LOTE + ELIMINAR ── */}
                        <div className="mt-4 pt-4 border-t-2 border-[#e8f5e9] dark:border-gray-700">
                          {confirmDeleteId === item.analysis_id ? (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                              <p className="text-sm font-semibold text-red-700 dark:text-red-400 text-center sm:text-left">
                                ¿Eliminar permanentemente este análisis? Esta acción no se puede deshacer.
                              </p>
                              <div className="flex gap-2 flex-shrink-0">
                                <button
                                  onClick={() => handleDeleteAnalysis(item.analysis_id)}
                                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors"
                                >
                                  Sí, eliminar
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-4 py-1.5 rounded-lg text-sm font-bold transition-colors"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          ) : !activeBatch ? (
                            <div className="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                              <span className="text-[#475569] dark:text-gray-300 font-semibold text-sm whitespace-nowrap">📁 Asignar a lote:</span>
                              <select
                                value={selectedBatchForAnalysis[item.analysis_id] || ""}
                                onChange={(e) => setSelectedBatchForAnalysis({...selectedBatchForAnalysis, [item.analysis_id]: e.target.value})}
                                className="flex-1 w-full border-2 border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-[#8bc34a] outline-none dark:bg-gray-800 dark:text-white"
                              >
                                <option value="" disabled>Seleccione un lote...</option>
                                {batches.map(b => (
                                  <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleAssignToBatch(item.analysis_id)}
                                className="w-full sm:w-auto bg-[#8bc34a] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#7cb342] transition-colors"
                              >
                                Mover a lote
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(item.analysis_id)}
                                className="w-full sm:w-auto bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                              >
                                🗑️ Eliminar
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() => handleRemoveFromBatch(item.analysis_id)}
                                className="text-orange-500 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition-colors"
                              >
                                ✕ Quitar del lote
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(item.analysis_id)}
                                className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition-colors"
                              >
                                🗑️ Eliminar análisis
                              </button>
                            </div>
                          )}
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

