import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import ImagePreviewModal from "../components/ImagePreviewModal";
import { useAuth } from "../contexts/AuthContext";
import {
  listBatches,
  createBatch,
  getBatchDetail,
  deleteBatch,
  deleteAnalysisFromBatch,
  publishToMarketplace,
} from "../services/api";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001";

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

// function formatDate(iso) {
//   if (!iso) return "-";
//   return new Date(iso).toLocaleString("es-CO", {
//     timeZone: "America/Bogota",
//     day: "2-digit", month: "short", year: "numeric",
//     hour: "2-digit", minute: "2-digit",
//   });
// }
function formatDate(isoString) {
  if (!isoString) return "-";
  // UTC-5 Colombia: restar 5 horas manualmente
  const date = new Date(new Date(isoString).getTime() - 5 * 60 * 60 * 1000);
  return date.toLocaleString("es-CO", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function BatchesPage() {
  const navigate = useNavigate();
  const { user, logout, getToken } = useAuth();

  const [batches,      setBatches]      = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  // Vista detalle de un lote seleccionado
  const [activeBatch,    setActiveBatch]    = useState(null);
  const [detailLoading,  setDetailLoading]  = useState(false);

  // Modal "Crear lote"
  const [showCreate,   setShowCreate]   = useState(false);
  const [newName,      setNewName]      = useState("");
  const [creating,     setCreating]     = useState(false);
  const [createError,  setCreateError]  = useState("");

  // Modal "Eliminar lote"
  const [batchToDelete,  setBatchToDelete]  = useState(null);
  const [deleting,       setDeleting]       = useState(false);

  // Modal "Eliminar análisis"
  const [analysisToDelete,  setAnalysisToDelete]  = useState(null);
  const [deletingAnalysis,  setDeletingAnalysis]  = useState(false);

  // Preview de imagen
  const [previewSrc, setPreviewSrc] = useState(null);

  // Modal "Publicar en La Plaza"
  const [batchToPublish,  setBatchToPublish]  = useState(null);
  const [publishForm,     setPublishForm]     = useState({ title: "", quantity_kg: "", price_per_kg: "", description: "" });
  const [publishing,      setPublishing]      = useState(false);
  const [publishDone,     setPublishDone]     = useState(false);

  useEffect(() => {
    if (!user) { navigate("/"); return; }
    loadBatches();
  }, [user]);

  async function loadBatches() {
    setLoading(true);
    setError(null);
    try {
      const data = await listBatches(getToken());
      setBatches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function openBatch(batch) {
    setDetailLoading(true);
    setActiveBatch({ ...batch, analyses: [] });
    setError(null);
    try {
      const detail = await getBatchDetail(getToken(), batch.id);
      setActiveBatch(detail);
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailLoading(false);
    }
  }

  function goBack() {
    setActiveBatch(null);
    loadBatches();
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) { setCreateError("El nombre es obligatorio."); return; }
    setCreating(true);
    setCreateError("");
    try {
      await createBatch(getToken(), newName.trim());
      setShowCreate(false);
      setNewName("");
      loadBatches();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreating(false);
    }
  }

  async function handleDeleteBatch() {
    if (!batchToDelete) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteBatch(getToken(), batchToDelete.id);
      setBatchToDelete(null);
      if (activeBatch?.id === batchToDelete.id) setActiveBatch(null);
      loadBatches();
    } catch (err) {
      setError(err.message);
      setBatchToDelete(null);
    } finally {
      setDeleting(false);
    }
  }

  async function handleDeleteAnalysis() {
    if (!analysisToDelete) return;
    setDeletingAnalysis(true);
    setError(null);
    try {
      await deleteAnalysisFromBatch(
        getToken(),
        analysisToDelete.batchId,
        analysisToDelete.analysisId,
      );
      setAnalysisToDelete(null);
      const detail = await getBatchDetail(getToken(), activeBatch.id);
      setActiveBatch(detail);
    } catch (err) {
      setError(err.message);
      setAnalysisToDelete(null);
    } finally {
      setDeletingAnalysis(false);
    }
  }

  async function handlePublishBatch(e) {
    e.preventDefault();
    if (!publishForm.title || !publishForm.quantity_kg || !publishForm.price_per_kg) return;
    setPublishing(true);
    try {
      const analyses = batchToPublish.analyses || [];
      const best = analyses.length > 0
        ? analyses.reduce((a, b) => ((b.confidence || 0) > (a.confidence || 0) ? b : a))
        : null;
      await publishToMarketplace(getToken(), {
        analysis_id: best?.analysis_id || null,
        batch_id: batchToPublish.id,
        title: publishForm.title,
        quantity_kg: parseFloat(publishForm.quantity_kg),
        price_per_kg: parseFloat(publishForm.price_per_kg),
        quality_score: best ? Math.round((best.confidence || 0) * 100) : null,
        ripeness_level: best ? (RIPENESS_LABEL[best.ripeness_level] || best.ripeness_level || null) : null,
        damage_level: best ? (DAMAGE_LABEL[best.damage_level] || best.damage_level || null) : null,
        description: publishForm.description || null,
      });
      setPublishDone(true);
    } catch (err) {
      alert("Error al publicar: " + err.message);
    } finally {
      setPublishing(false);
    }
  }

  const handleLogout = () => { logout(); navigate("/"); };

  if (!user) return null;

  const navBtn = (path, label, active) =>
    active
      ? `text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold border-b-4 border-[#8bc34a] dark:border-[#9ccc65] pb-1 transition-colors`
      : `text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors`;

  return (
    <div className="bg-[#f6f8f6] dark:bg-gray-900 min-h-screen flex flex-col transition-colors">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="bg-[#e8f5e9] dark:bg-gray-800 border-b-2 border-[#c5e1a5] dark:border-gray-700 px-6 py-6 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate("/dashboard")} className="hover:opacity-80 cursor-pointer transition-opacity">
            <Logo size="lg" showText={true} />
          </button>
          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              <button onClick={() => navigate("/dashboard")} className={navBtn("/dashboard", "Diagnóstico", false)}>
                Diagnóstico
              </button>
              <button onClick={() => navigate("/marketplace")} className={navBtn("/marketplace", "Mi Plaza", false)}>
                Mi Plaza
              </button>
              <button onClick={() => navigate("/help")} className={navBtn("/help", "Ayuda", false)}>
                Ayuda
              </button>
              <button onClick={() => navigate("/batches")} className={navBtn("/batches", "Mis Lotes", true)}>
                Mis Lotes
              </button>
              <button onClick={() => navigate("/profile")} className={navBtn("/profile", "Mi Perfil", false)}>
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

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">

          {activeBatch ? (
            <BatchDetail
              batch={activeBatch}
              loading={detailLoading}
              onBack={goBack}
              onDeleteBatch={() => setBatchToDelete({ id: activeBatch.id, name: activeBatch.name })}
              onDeleteAnalysis={(analysisId) =>
                setAnalysisToDelete({ batchId: activeBatch.id, analysisId })
              }
              onPublishBatch={() => {
                setBatchToPublish(activeBatch);
                setPublishForm({ title: activeBatch.name, quantity_kg: "", price_per_kg: "", description: "" });
                setPublishDone(false);
              }}
              onPreviewImage={setPreviewSrc}
            />
          ) : (
            <BatchList
              batches={batches}
              loading={loading}
              error={error}
              onCreateClick={() => { setShowCreate(true); setNewName(""); setCreateError(""); }}
              onOpenBatch={openBatch}
              onDeleteBatch={(b) => setBatchToDelete(b)}
            />
          )}

        </div>
      </main>

      {/* ── Modal: Crear lote ────────────────────────────────────────────────── */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md p-8">
            <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-6">
              📦 Crear nuevo lote
            </h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-1">
                  Nombre del lote *
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej: Cosecha Abril 2026"
                  maxLength={100}
                  autoFocus
                  className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-base focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors"
                />
                {createError && (
                  <p className="text-red-500 text-sm mt-1">{createError}</p>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-[#475569] dark:text-gray-400 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 py-3 rounded-xl bg-[#8bc34a] hover:bg-[#7cb342] text-white font-bold transition-colors disabled:opacity-60"
                >
                  {creating ? "Creando..." : "Crear lote"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Confirmar eliminar lote ───────────────────────────────────── */}
      {batchToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">⚠️</span>
              <h3 className="text-xl font-bold text-[#0d1b0d] dark:text-gray-100">
                ¿Eliminar lote?
              </h3>
            </div>
            <p className="text-[#475569] dark:text-gray-400 mb-2">
              Estás por eliminar el lote <strong className="text-[#0d1b0d] dark:text-gray-100">&ldquo;{batchToDelete.name}&rdquo;</strong>.
            </p>
            <p className="text-red-600 dark:text-red-400 font-semibold text-sm mb-6">
              Todos los análisis guardados dentro de este lote también serán eliminados permanentemente. Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setBatchToDelete(null)}
                disabled={deleting}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-[#475569] dark:text-gray-400 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteBatch}
                disabled={deleting}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors disabled:opacity-60"
              >
                {deleting ? "Eliminando..." : "Sí, eliminar lote"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Publicar en La Plaza ─────────────────────────────────────── */}
      {batchToPublish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md p-8">
            {publishDone ? (
              <div className="text-center">
                <span className="text-6xl">🛒</span>
                <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mt-4 mb-2">
                  ¡Lote publicado en La Plaza!
                </h3>
                <p className="text-[#475569] dark:text-gray-400 mb-6">
                  Su lote ya está visible para los compradores.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setBatchToPublish(null)}
                    className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-[#475569] dark:text-gray-400 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => navigate("/marketplace")}
                    className="flex-1 py-3 rounded-xl bg-[#11d411] text-[#0d1b0d] font-bold hover:bg-[#0fd40f] transition-colors"
                  >
                    Ver La Plaza →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePublishBatch} className="space-y-4">
                <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100">
                  🛒 Publicar en La Plaza
                </h3>
                <p className="text-sm text-[#475569] dark:text-gray-400">
                  Lote: <strong className="text-[#0d1b0d] dark:text-gray-200">{batchToPublish.name}</strong>
                </p>
                <div>
                  <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-1">
                    Título del anuncio *
                  </label>
                  <input
                    type="text"
                    value={publishForm.title}
                    onChange={(e) => setPublishForm(f => ({ ...f, title: e.target.value }))}
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
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={publishForm.quantity_kg}
                      onChange={(e) => setPublishForm(f => ({ ...f, quantity_kg: e.target.value }))}
                      placeholder="Ej: 200"
                      className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-base focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#475569] dark:text-gray-400 mb-1">
                      Precio por kg (COP) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="100"
                      value={publishForm.price_per_kg}
                      onChange={(e) => setPublishForm(f => ({ ...f, price_per_kg: e.target.value }))}
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
                    onChange={(e) => setPublishForm(f => ({ ...f, description: e.target.value }))}
                    rows={3}
                    placeholder="Cuéntele al comprador sobre su cosecha..."
                    className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-base focus:border-[#8bc34a] focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-colors resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBatchToPublish(null)}
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
                    {publishing ? "Publicando..." : "✅ Publicar lote"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── Preview de imagen ───────────────────────────────────────────────── */}
      {previewSrc && (
        <ImagePreviewModal src={previewSrc} onClose={() => setPreviewSrc(null)} />
      )}

      {/* ── Modal: Confirmar eliminar análisis ───────────────────────────────── */}
      {analysisToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🗑️</span>
              <h3 className="text-xl font-bold text-[#0d1b0d] dark:text-gray-100">
                ¿Eliminar análisis?
              </h3>
            </div>
            <p className="text-[#475569] dark:text-gray-400 mb-6">
              Este diagnóstico será eliminado permanentemente del lote y del historial. Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setAnalysisToDelete(null)}
                disabled={deletingAnalysis}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-[#475569] dark:text-gray-400 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAnalysis}
                disabled={deletingAnalysis}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors disabled:opacity-60"
              >
                {deletingAnalysis ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ── Componente: lista de lotes ─────────────────────────────────────────────────
function BatchList({ batches, loading, error, onCreateClick, onOpenBatch, onDeleteBatch }) {
  return (
    <>
      {/* Encabezado */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📦</span>
            <h2 className="text-4xl font-bold text-[#0d1b0d] dark:text-gray-100">Mis Lotes</h2>
          </div>
          <p className="text-xl text-[#475569] dark:text-gray-400">
            Organiza tus diagnósticos en lotes por cosecha o grupo.
          </p>
        </div>
        <button
          onClick={onCreateClick}
          className="flex-shrink-0 flex items-center gap-2 bg-[#8bc34a] hover:bg-[#7cb342] text-white font-bold px-6 py-3 rounded-2xl text-base transition-colors shadow-md"
        >
          <span className="text-xl">+</span> Crear lote
        </button>
      </div>

      {/* Cargando */}
      {loading && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
          <span className="text-6xl animate-spin inline-block">⏳</span>
          <p className="text-2xl font-semibold text-[#475569] dark:text-gray-400 mt-4">
            Cargando lotes...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-3xl p-8 border-2 border-red-200 dark:border-red-800 text-center">
          <span className="text-5xl">⚠️</span>
          <p className="text-xl font-semibold text-red-600 dark:text-red-400 mt-3">{error}</p>
        </div>
      )}

      {/* Sin lotes */}
      {!loading && !error && batches.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center transition-colors">
          <span className="text-8xl">📦</span>
          <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mt-4 mb-2">
            Aún no tiene lotes creados
          </h3>
          <p className="text-xl text-[#475569] dark:text-gray-400 mb-6">
            Cree un lote para organizar sus diagnósticos por cosecha o grupo.
          </p>
          <button
            onClick={onCreateClick}
            className="bg-[#8bc34a] hover:bg-[#7cb342] text-white px-8 py-4 rounded-2xl text-xl font-bold transition-colors"
          >
            Crear mi primer lote
          </button>
        </div>
      )}

      {/* Lista de lotes */}
      {!loading && !error && batches.length > 0 && (
        <div className="space-y-4">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
            >
              <div className="flex items-center gap-5 p-6">
                {/* Icono */}
                <div className="flex-shrink-0 w-16 h-16 bg-[#8bc34a20] dark:bg-[#8bc34a30] rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">📦</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-[#0d1b0d] dark:text-gray-100 truncate">
                    {batch.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="text-sm text-[#475569] dark:text-gray-400">
                      📅 Creado {formatDate(batch.created_at)}
                    </span>
                    <span className="bg-[#8bc34a20] dark:bg-[#8bc34a30] text-[#689f38] dark:text-[#9ccc65] px-3 py-0.5 rounded-full text-sm font-semibold">
                      {batch.total_count} diagnóstico{batch.total_count !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex-shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => onOpenBatch(batch)}
                    className="px-5 py-2.5 rounded-xl bg-[#8bc34a] hover:bg-[#7cb342] text-white font-semibold text-sm transition-colors"
                  >
                    Ver lote →
                  </button>
                  <button
                    onClick={() => onDeleteBatch(batch)}
                    className="px-4 py-2.5 rounded-xl border-2 border-red-200 dark:border-red-800 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold text-sm transition-colors"
                    title="Eliminar lote"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ── Componente: detalle de un lote ─────────────────────────────────────────────
function BatchDetail({ batch, loading, onBack, onDeleteBatch, onDeleteAnalysis, onPublishBatch, onPreviewImage }) {
  return (
    <>
      {/* Encabezado del detalle */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#8bc34a] dark:text-[#9ccc65] font-semibold mb-4 hover:underline transition-colors"
        >
          ← Volver a Mis Lotes
        </button>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl">📦</span>
              <h2 className="text-3xl font-bold text-[#0d1b0d] dark:text-gray-100">
                {batch.name}
              </h2>
            </div>
            <p className="text-[#475569] dark:text-gray-400 text-sm">
              Creado el {formatDate(batch.created_at)} · {batch.total_count} diagnóstico{batch.total_count !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onPublishBatch}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0d1b0d] dark:bg-gray-700 text-[#11d411] border-2 border-[#11d411] hover:bg-[#11d41115] font-semibold text-sm transition-colors"
            >
              🛒 Publicar en La Plaza
            </button>
            <button
              onClick={onDeleteBatch}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-red-300 dark:border-red-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold text-sm transition-colors"
            >
              🗑️ Eliminar lote
            </button>
          </div>
        </div>
      </div>

      {/* Cargando detalle */}
      {loading && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center">
          <span className="text-6xl animate-spin inline-block">⏳</span>
          <p className="text-xl font-semibold text-[#475569] dark:text-gray-400 mt-4">
            Cargando análisis...
          </p>
        </div>
      )}

      {/* Sin análisis en el lote */}
      {!loading && batch.analyses?.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center">
          <span className="text-8xl">🔬</span>
          <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mt-4 mb-2">
            Este lote no tiene análisis
          </h3>
          <p className="text-xl text-[#475569] dark:text-gray-400">
            Los diagnósticos guardados en este lote aparecerán aquí, ordenados por fecha.
          </p>
        </div>
      )}

      {/* Lista de análisis */}
      {!loading && batch.analyses?.length > 0 && (
        <div className="space-y-4">
          {batch.analyses.map((item) => {
            const conf = Math.round((item.confidence || 0) * 100);
            return (
              <div
                key={item.analysis_id}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
              >
                <div className="flex items-start gap-5 p-6">
                  {/* Imagen (clickeable para preview) */}
                  <div
                    className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-[#e8f5e9] dark:bg-gray-700 flex items-center justify-center cursor-pointer hover:opacity-80 hover:scale-105 transition-all"
                    title="Click para ver en grande"
                    onClick={() => item.file_path && onPreviewImage(`${API_BASE}/${item.file_path}`)}
                  >
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
                    <span
                      className="text-3xl"
                      style={{ display: item.file_path ? "none" : "flex" }}
                    >
                      🥑
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          RIPENESS_BADGE[item.ripeness_level] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {RIPENESS_LABEL[item.ripeness_level] || item.ripeness_level}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          DAMAGE_BADGE[item.damage_level] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {DAMAGE_LABEL[item.damage_level] || item.damage_level}
                      </span>
                      <span className="text-sm text-[#8bc34a] dark:text-[#9ccc65] font-semibold">
                        🤖 {conf}% confianza
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <p className="text-sm text-[#475569] dark:text-gray-400">
                        📅 {formatDate(item.created_at)}
                      </p>
                      <p className="text-base font-bold text-[#8bc34a] dark:text-[#9ccc65]">
                        ${Number(item.price_sale || 0).toLocaleString("es-CO")}
                        <span className="text-xs font-normal text-[#475569] dark:text-gray-400 ml-1">
                          COP/kg
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => onDeleteAnalysis(item.analysis_id)}
                    className="flex-shrink-0 px-4 py-2.5 rounded-xl border-2 border-red-200 dark:border-red-800 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold text-sm transition-colors"
                    title="Eliminar análisis"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
