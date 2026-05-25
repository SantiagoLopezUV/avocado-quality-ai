import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal";
import ImagePreviewModal from "../components/ImagePreviewModal";
import { useAuth } from "../contexts/AuthContext";
import {
  getMarketplaceListings,
  publishToMarketplace,
  deleteMarketplaceListing,
  listBatches,
  getListingAnalyses,
  rateListing,
  getMyListingRating,
} from "../services/api";

function StarDisplay({ avg, count, size = "sm" }) {
  const filled = Math.round(avg || 0);
  const starSize = size === "lg" ? "text-2xl" : "text-base";
  return (
    <span className={`flex items-center gap-1 ${starSize}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= filled ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}>
          ★
        </span>
      ))}
      {count > 0 && (
        <span className="text-sm text-[#475569] dark:text-gray-400 ml-1">
          {avg?.toFixed(1)} ({count})
        </span>
      )}
    </span>
  );
}

function StarPicker({ value, onChange, disabled }) {
  const [hover, setHover] = useState(0);
  return (
    <span className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={disabled}
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          className={`text-3xl transition-colors disabled:cursor-not-allowed ${
            s <= (hover || value) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
          } hover:scale-110`}
        >
          ★
        </button>
      ))}
    </span>
  );
}

export default function MarketplacePage() {
  const navigate = useNavigate();
  const { user, logout, getToken } = useAuth();
  const [selectedLot, setSelectedLot] = useState(null);
  const [selectedLotAnalyses, setSelectedLotAnalyses] = useState([]);
  const [loadingAnalyses, setLoadingAnalyses] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [filter, setFilter] = useState("todos");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [myRating, setMyRating] = useState(null);
  const [submittingRating, setSubmittingRating] = useState(false);
  const [ratingDone, setRatingDone] = useState(false);

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mis publicaciones / publicar lote
  const [batches, setBatches] = useState([]);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishForm, setPublishForm] = useState({ batchId: "", title: "", quantity_kg: "", price_per_kg: "", description: "" });
  const [publishing, setPublishing] = useState(false);
  const [publishDone, setPublishDone] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleLogout = () => { logout(); navigate("/"); };

  function loadListings() {
    setLoading(true);
    setError(null);
    getMarketplaceListings()
      .then(setListings)
      .catch(() => setError("No se pudo cargar La Plaza. Intente de nuevo."))
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadListings(); }, []);

  useEffect(() => {
    if (!user) return;
    listBatches(getToken()).then(setBatches).catch(() => {});
  }, [user]);

  const myListings = listings.filter(l => l.user_id === user?.id);

  async function handleDeleteListing(id) {
    setDeletingId(id);
    try {
      await deleteMarketplaceListing(getToken(), id);
      setListings(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    } finally {
      setDeletingId(null);
    }
  }

  function openPublishModal() {
    setPublishForm({ batchId: batches[0]?.id || "", title: batches[0]?.name || "", quantity_kg: "", price_per_kg: "", description: "" });
    setPublishDone(false);
    setShowPublishModal(true);
  }

  async function handlePublish(e) {
    e.preventDefault();
    if (!publishForm.title || !publishForm.quantity_kg || !publishForm.price_per_kg) return;
    setPublishing(true);
    try {
      await publishToMarketplace(getToken(), {
        title: publishForm.title,
        quantity_kg: parseFloat(publishForm.quantity_kg),
        price_per_kg: parseFloat(publishForm.price_per_kg),
        description: publishForm.description || null,
      });
      setPublishDone(true);
      loadListings();
    } catch (err) {
      alert("Error al publicar: " + err.message);
    } finally {
      setPublishing(false);
    }
  }

  const filteredLots = filter === "todos"
    ? listings
    : listings.filter((l) => (l.quality_score || 0) >= 95);

  const handleContact = (lot) => {
    const phone = lot.contact_phone?.replace(/\D/g, "");
    if (!phone) return;
    window.open(`https://wa.me/57${phone}`, "_blank");
  };

  async function openListing(lot) {
    setSelectedLot(lot);
    setSelectedLotAnalyses([]);
    setMyRating(null);
    setRatingDone(false);

    const fetchAnalyses = lot.batch_id
      ? getListingAnalyses(lot.id).catch(() => [])
      : Promise.resolve([]);

    const fetchMyRating = user
      ? getMyListingRating(getToken(), lot.id).catch(() => ({ stars: null }))
      : Promise.resolve({ stars: null });

    setLoadingAnalyses(true);
    try {
      const [analyses, ratingRes] = await Promise.all([fetchAnalyses, fetchMyRating]);
      setSelectedLotAnalyses(analyses);
      setMyRating(ratingRes.stars ?? null);
    } finally {
      setLoadingAnalyses(false);
    }
  }

  async function handleRate(stars) {
    if (!user || submittingRating) return;
    setSubmittingRating(true);
    try {
      const result = await rateListing(getToken(), selectedLot.id, stars);
      setMyRating(stars);
      setRatingDone(true);
      setSelectedLot(prev => ({
        ...prev,
        avg_rating: result.avg_rating,
        rating_count: result.rating_count,
      }));
      setListings(prev =>
        prev.map(l =>
          l.id === selectedLot.id
            ? { ...l, avg_rating: result.avg_rating, rating_count: result.rating_count }
            : l
        )
      );
    } catch {
      // no bloquea el modal
    } finally {
      setSubmittingRating(false);
    }
  }

  return (
    <div className="bg-[#f6f8f6] dark:bg-gray-900 min-h-screen flex flex-col transition-colors">
      {/* Header */}
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
              <button onClick={() => navigate("/marketplace")} className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold border-b-4 border-[#8bc34a] dark:border-[#9ccc65] pb-1 transition-colors">
                Mi Plaza
              </button>
              <button onClick={() => navigate("/help")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Ayuda
              </button>
              {user && (
                <button onClick={() => navigate("/batches")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                  Mis Lotes
                </button>
              )}
              {user ? (
                <button onClick={() => navigate("/profile")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                  Mi Perfil
                </button>
              ) : (
                <button onClick={() => navigate("/")} className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-semibold hover:underline transition-colors">
                  Ingresar
                </button>
              )}
            </nav>
            <ThemeToggle />
            {user && (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              >
                <span>🚪</span>
                Salir
              </button>
            )}
            {showLogoutModal && (
              <ConfirmLogoutModal
                onConfirm={handleLogout}
                onCancel={() => setShowLogoutModal(false)}
              />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-lg mb-6">
            <button onClick={() => navigate("/")} className="text-[#64748b] dark:text-gray-400 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] transition-colors">
              Inicio
            </button>
            <span className="text-[#64748b] dark:text-gray-400">›</span>
            <span className="text-[#8bc34a] dark:text-[#9ccc65] font-semibold">La Plaza de Aguacates</span>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">🛒</span>
              <h2 className="text-4xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">La Plaza de Aguacates</h2>
            </div>
            <p className="text-xl text-[#475569] dark:text-gray-400 leading-relaxed transition-colors">
              Mire los mejores lotes de aguacate verificados con nuestra tecnología.
              Todos vienen con su reporte de calidad pa' que compre confiado.
            </p>
          </div>

          {/* Panel de usuario logueado */}
          {user && (
            <div className="mb-8 space-y-4">
              {/* Mis publicaciones activas */}
              {myListings.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100 mb-4 flex items-center gap-2">
                    <span>📋</span> Mis publicaciones activas
                  </h3>
                  <div className="space-y-3">
                    {myListings.map(l => (
                      <div key={l.id} className="flex items-center justify-between gap-4 bg-[#f3f7f3] dark:bg-gray-700 rounded-xl px-4 py-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#0d1b0d] dark:text-gray-100 truncate">{l.title}</p>
                          <p className="text-sm text-[#475569] dark:text-gray-400">
                            {l.quantity_kg} kg · ${l.price_per_kg.toLocaleString("es-CO")} COP/kg
                            {l.quality_score != null && ` · ${Math.round(l.quality_score)}% calidad`}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteListing(l.id)}
                          disabled={deletingId === l.id}
                          className="flex-shrink-0 px-3 py-1.5 rounded-lg border-2 border-red-200 dark:border-red-800 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-semibold transition-colors disabled:opacity-50"
                        >
                          {deletingId === l.id ? "..." : "🗑️ Retirar"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón publicar */}
              <button
                onClick={openPublishModal}
                className="w-full flex items-center justify-center gap-3 bg-[#0d1b0d] dark:bg-gray-800 text-[#11d411] border-2 border-[#11d411] py-4 rounded-2xl text-lg font-bold hover:bg-[#11d41115] transition-colors"
              >
                <span className="text-2xl">🛒</span>
                Publicar un lote en La Plaza
              </button>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-xl font-bold text-[#0d1b0d] dark:text-gray-200">Filtrar por:</span>
              <button
                onClick={() => setFilter("todos")}
                className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
                  filter === "todos"
                    ? "bg-[#11d411] text-[#0d1b0d] shadow-lg"
                    : "bg-[#f3f7f3] dark:bg-gray-700 text-[#0d1b0d] dark:text-gray-200 hover:bg-[#e4ede4] dark:hover:bg-gray-600"
                }`}
              >
                Todos los Lotes
              </button>
              <button
                onClick={() => setFilter("premium")}
                className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
                  filter === "premium"
                    ? "bg-[#11d411] text-[#0d1b0d] shadow-lg"
                    : "bg-[#f3f7f3] dark:bg-gray-700 text-[#0d1b0d] dark:text-gray-200 hover:bg-[#e4ede4] dark:hover:bg-gray-600"
                }`}
              >
                ⭐ Solo Premium (95%+)
              </button>
              <div className="flex-1"></div>
              <span className="text-lg text-[#475569] dark:text-gray-200">
                {loading ? "Cargando..." : `${filteredLots.length} ${filteredLots.length === 1 ? "lote disponible" : "lotes disponibles"}`}
              </span>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-20">
              <span className="text-6xl animate-spin inline-block">⏳</span>
              <p className="text-xl text-[#475569] dark:text-gray-400 mt-4">Cargando la plaza...</p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-20">
              <span className="text-6xl">😕</span>
              <p className="text-xl text-[#475569] dark:text-gray-400 mt-4">{error}</p>
              <button
                onClick={loadListings}
                className="mt-4 bg-[#8bc34a] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#7cb342] transition-colors"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredLots.length === 0 && (
            <div className="text-center py-20">
              <span className="text-8xl">🥑</span>
              <p className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mt-4">Aún no hay lotes publicados</p>
              <p className="text-lg text-[#475569] dark:text-gray-400 mt-2">
                {user ? "¡Sé el primero! Analiza un aguacate y publícalo acá." : "Inicia sesión para publicar tu cosecha."}
              </p>
              <button
                onClick={() => navigate(user ? "/dashboard" : "/")}
                className="mt-6 bg-[#11d411] text-[#0d1b0d] px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#0fd40f] transition-colors"
              >
                {user ? "Ir a Diagnosticar" : "Iniciar Sesión"}
              </button>
            </div>
          )}

          {/* Lots Grid */}
          {!loading && !error && filteredLots.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredLots.map((lot) => (
                <div
                  key={lot.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                  onClick={() => openListing(lot)}
                >
                  <div className="bg-gradient-to-br from-[#11d411] to-[#0fd40f] h-48 flex items-center justify-center">
                    <span className="text-9xl">🥑</span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-[#0d1b0d] dark:text-gray-200 leading-tight">{lot.title}</h3>
                      {lot.quality_score != null && (
                        <div className="bg-[#11d411] px-3 py-1 rounded-full flex-shrink-0 ml-2">
                          <span className="text-base font-bold text-[#0d1b0d]">{Math.round(lot.quality_score)}%</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="text-lg text-[#0d1b0d] dark:text-gray-200 flex items-center gap-2">
                        <span>👨‍🌾</span>
                        <span className="font-semibold">{lot.farmer_name}</span>
                      </p>
                      {lot.location && (
                        <p className="text-lg text-[#475569] dark:text-gray-200 flex items-center gap-2">
                          <span>📍</span>
                          {lot.location}
                        </p>
                      )}
                      <p className="text-lg text-[#475569] dark:text-gray-200 flex items-center gap-2">
                        <span>⚖️</span>
                        {lot.quantity_kg} kg disponibles
                      </p>
                      {lot.rating_count > 0 ? (
                        <StarDisplay avg={lot.avg_rating} count={lot.rating_count} />
                      ) : (
                        <span className="text-sm text-[#94a3b8] dark:text-gray-500">Sin calificaciones aún</span>
                      )}
                    </div>

                    <div className="pt-3 border-t-2 border-[#e4ede4] dark:border-gray-700 flex justify-between items-center">
                      <div>
                        <p className="text-base text-[#475569] dark:text-gray-200">Precio por kg</p>
                        <p className="text-2xl font-black text-[#11d411]">
                          ${lot.price_per_kg.toLocaleString("es-CO")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {user?.id === lot.user_id && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteListing(lot.id); }}
                            disabled={deletingId === lot.id}
                            className="px-3 py-3 rounded-xl border-2 border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 text-sm"
                            title="Retirar publicación"
                          >
                            {deletingId === lot.id ? "..." : "🗑️"}
                          </button>
                        )}
                        <button className="bg-[#0d1b0d] text-white px-5 py-3 rounded-xl text-lg font-bold hover:bg-[#1a2e1a] transition-colors">
                          Ver Más
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#11d411] to-[#0fd40f] rounded-3xl p-8 md:p-12 text-center shadow-xl">
            <h3 className="text-3xl md:text-4xl font-black text-[#0d1b0d] mb-4">
              ¿Tiene Aguacates pa' Vender?
            </h3>
            <p className="text-xl text-[#0d1b0d] opacity-90 mb-6">
              Analice su cosecha con IA y publique su lote en la plaza. Es fácil y rapidito.
            </p>
            <button
              onClick={() => navigate(user ? "/dashboard" : "/")}
              className="bg-[#0d1b0d] text-white px-8 py-5 rounded-2xl text-2xl font-bold hover:bg-[#1a2e1a] transition-colors shadow-lg"
            >
              {user ? "Ir a Diagnosticar y Publicar" : "Ingresar pa' Publicar"}
            </button>
          </div>
        </div>
      </main>

      {/* Modal: Publicar lote desde La Plaza */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => !publishing && setShowPublishModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
            {publishDone ? (
              <div className="text-center">
                <span className="text-6xl">🛒</span>
                <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mt-4 mb-2">
                  ¡Publicado en La Plaza!
                </h3>
                <p className="text-[#475569] dark:text-gray-400 mb-6">
                  Su lote ya está visible para los compradores.
                </p>
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="w-full py-3 rounded-2xl bg-[#11d411] text-[#0d1b0d] font-bold hover:bg-[#0fd40f] transition-colors"
                >
                  Listo
                </button>
              </div>
            ) : (
              <form onSubmit={handlePublish} className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100">
                    🛒 Publicar un lote
                  </h3>
                  <button type="button" onClick={() => setShowPublishModal(false)} className="text-[#475569] hover:text-[#0d1b0d] dark:hover:text-white text-2xl font-bold">✕</button>
                </div>

                {batches.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-1">
                      Seleccione un lote registrado
                    </label>
                    <select
                      value={publishForm.batchId}
                      onChange={(e) => {
                        const b = batches.find(b => b.id === e.target.value);
                        setPublishForm(f => ({ ...f, batchId: e.target.value, title: b?.name || f.title }));
                      }}
                      className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-base focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    >
                      {batches.map(b => (
                        <option key={b.id} value={b.id}>📦 {b.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-1">
                    Título del anuncio *
                  </label>
                  <input
                    type="text"
                    value={publishForm.title}
                    onChange={e => setPublishForm(f => ({ ...f, title: e.target.value }))}
                    maxLength={200}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-base focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-1">
                      Cantidad (kg) *
                    </label>
                    <input
                      type="number" min="0.1" step="0.1"
                      value={publishForm.quantity_kg}
                      onChange={e => setPublishForm(f => ({ ...f, quantity_kg: e.target.value }))}
                      placeholder="Ej: 200"
                      className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-base focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-1">
                      Precio/kg (COP) *
                    </label>
                    <input
                      type="number" min="1" step="100"
                      value={publishForm.price_per_kg}
                      onChange={e => setPublishForm(f => ({ ...f, price_per_kg: e.target.value }))}
                      placeholder="Ej: 4500"
                      className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-base focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-1">
                    Descripción (opcional)
                  </label>
                  <textarea
                    value={publishForm.description}
                    onChange={e => setPublishForm(f => ({ ...f, description: e.target.value }))}
                    rows={3}
                    placeholder="Cuéntele al comprador sobre su cosecha..."
                    className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-base focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPublishModal(false)}
                    disabled={publishing}
                    className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-[#475569] dark:text-gray-400 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-60"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={publishing || !publishForm.title || !publishForm.quantity_kg || !publishForm.price_per_kg}
                    className="flex-1 py-3 rounded-xl bg-[#11d411] text-[#0d1b0d] font-bold hover:bg-[#0fd40f] transition-colors disabled:opacity-50"
                  >
                    {publishing ? "Publicando..." : "✅ Publicar"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal detalle del lote */}
      {selectedLot && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLot(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header verde */}
            <div className="bg-gradient-to-br from-[#11d411] to-[#0fd40f] h-48 flex items-center justify-center relative">
              <span className="text-[120px]">🥑</span>
              <button
                onClick={() => setSelectedLot(null)}
                className="absolute top-4 right-4 bg-white text-[#0d1b0d] size-12 rounded-full text-2xl font-bold hover:bg-[#f3f7f3]"
              >
                ✕
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Título y calidad */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-[#0d1b0d] dark:text-gray-200 mb-2">{selectedLot.title}</h2>
                  <p className="text-xl text-[#475569] dark:text-gray-200">Por {selectedLot.farmer_name}</p>
                </div>
                {selectedLot.quality_score != null && (
                  <div className="bg-[#11d411] px-4 py-2 rounded-full">
                    <span className="text-xl font-bold text-[#0d1b0d]">Calidad: {Math.round(selectedLot.quality_score)}%</span>
                  </div>
                )}
              </div>

              {/* Info del lote */}
              <div className="grid grid-cols-2 gap-4">
                {selectedLot.location && (
                  <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-4">
                    <p className="text-base text-[#475569] dark:text-gray-400 mb-1">Ubicación</p>
                    <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-200 flex items-center gap-2">
                      <span>📍</span>{selectedLot.location}
                    </p>
                  </div>
                )}
                <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-4">
                  <p className="text-base text-[#475569] dark:text-gray-400 mb-1">Cantidad</p>
                  <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-200 flex items-center gap-2">
                    <span>⚖️</span>{selectedLot.quantity_kg} kg
                  </p>
                </div>
                {selectedLot.ripeness_level && (
                  <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-4">
                    <p className="text-base text-[#475569] dark:text-gray-400 mb-1">Madurez</p>
                    <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-200">🥑 {selectedLot.ripeness_level}</p>
                  </div>
                )}
                {selectedLot.damage_level && (
                  <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-4">
                    <p className="text-base text-[#475569] dark:text-gray-400 mb-1">Estado</p>
                    <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-200">🔬 {selectedLot.damage_level}</p>
                  </div>
                )}
              </div>

              {selectedLot.description && (
                <div className="bg-[#11d41110] rounded-2xl p-5">
                  <p className="text-base font-semibold text-[#0d1b0d] dark:text-gray-200 mb-2">Descripción:</p>
                  <p className="text-lg text-[#0d1b0d] dark:text-gray-200 leading-relaxed">{selectedLot.description}</p>
                </div>
              )}

              {/* Análisis del lote */}
              {selectedLot.batch_id && (
                <div>
                  <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100 mb-3 flex items-center gap-2">
                    <span>🔬</span> Diagnósticos del lote
                  </h3>

                  {loadingAnalyses && (
                    <div className="text-center py-6">
                      <span className="text-4xl animate-spin inline-block">⏳</span>
                    </div>
                  )}

                  {!loadingAnalyses && selectedLotAnalyses.length === 0 && (
                    <p className="text-base text-[#475569] dark:text-gray-400 text-center py-4">
                      No hay diagnósticos registrados en este lote.
                    </p>
                  )}

                  {!loadingAnalyses && selectedLotAnalyses.length > 0 && (
                    <div className="space-y-3">
                      {selectedLotAnalyses.map((item) => {
                        const conf = Math.round((item.confidence || 0) * 100);
                        const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001";
                        const RIPENESS = { verde: "Verde", maduro: "Maduro", sobremaduro: "Sobremaduro" };
                        const DAMAGE = { ninguno: "Sin daños", leve: "Daño leve", moderado: "Daño moderado", severo: "Daño severo" };
                        return (
                          <div key={item.analysis_id} className="flex items-start gap-4 bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-4">
                            {/* Imagen */}
                            <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-[#e8f5e9] dark:bg-gray-600 flex items-center justify-center">
                              {item.file_path ? (
                                <img
                                  src={`${API_BASE}/${item.file_path}`}
                                  alt="Aguacate analizado"
                                  className="w-full h-full object-cover"
                                  onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                                />
                              ) : null}
                              <span className="text-3xl" style={{ display: item.file_path ? "none" : "flex" }}>🥑</span>
                            </div>

                            {/* Datos */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap gap-2 mb-2">
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-0.5 rounded-full text-sm font-semibold">
                                  {RIPENESS[item.ripeness_level] || item.ripeness_level}
                                </span>
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-0.5 rounded-full text-sm font-semibold">
                                  {DAMAGE[item.damage_level] || item.damage_level}
                                </span>
                                <span className="bg-[#8bc34a20] text-[#689f38] dark:text-[#9ccc65] px-3 py-0.5 rounded-full text-sm font-semibold">
                                  🤖 {conf}% confianza
                                </span>
                              </div>
                              {item.price_sale != null && (
                                <p className="text-base font-bold text-[#8bc34a] dark:text-[#9ccc65]">
                                  ${Number(item.price_sale).toLocaleString("es-CO")} COP/kg
                                </p>
                              )}
                              {item.message && (
                                <p className="text-sm text-[#475569] dark:text-gray-400 mt-1 line-clamp-2">{item.message}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Calificaciones */}
              <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100 flex items-center gap-2">
                    <span>⭐</span> Calificaciones
                  </h3>
                  {selectedLot.rating_count > 0 ? (
                    <StarDisplay avg={selectedLot.avg_rating} count={selectedLot.rating_count} size="lg" />
                  ) : (
                    <span className="text-sm text-[#94a3b8] dark:text-gray-400">Sin calificaciones aún</span>
                  )}
                </div>

                {user && user.id !== selectedLot.user_id && (
                  <div>
                    <p className="text-sm font-semibold text-[#475569] dark:text-gray-400 mb-2">
                      {myRating ? "Tu calificación (toca para cambiar):" : "Califica este lote:"}
                    </p>
                    <StarPicker
                      value={myRating || 0}
                      onChange={handleRate}
                      disabled={submittingRating}
                    />
                    {ratingDone && (
                      <p className="text-sm text-[#8bc34a] dark:text-[#9ccc65] mt-1 font-semibold">
                        {myRating === myRating ? "¡Calificación guardada!" : ""}
                      </p>
                    )}
                    {submittingRating && (
                      <p className="text-sm text-[#475569] dark:text-gray-400 mt-1">Guardando...</p>
                    )}
                  </div>
                )}

                {!user && (
                  <p className="text-sm text-[#475569] dark:text-gray-400">
                    <button onClick={() => navigate("/")} className="text-[#8bc34a] dark:text-[#9ccc65] font-semibold hover:underline">
                      Inicia sesión
                    </button>{" "}
                    para calificar este lote.
                  </p>
                )}

                {user && user.id === selectedLot.user_id && (
                  <p className="text-sm text-[#94a3b8] dark:text-gray-500">No puedes calificar tu propio lote.</p>
                )}
              </div>

              {/* Precio y contacto */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-[#e4ede4] dark:border-gray-700">
                <div>
                  <p className="text-base text-[#475569] dark:text-gray-400">Precio por kg</p>
                  <p className="text-4xl font-black text-[#11d411]">
                    ${selectedLot.price_per_kg.toLocaleString("es-CO")} COP
                  </p>
                </div>
                {selectedLot.contact_phone ? (
                  <button
                    onClick={() => handleContact(selectedLot)}
                    className="bg-[#25D366] text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#1ebe5d] transition-colors flex items-center gap-2"
                  >
                    <span>💬</span> Contactar por WhatsApp
                  </button>
                ) : (
                  <p className="text-base text-[#475569] dark:text-gray-400">Contacto no disponible</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
