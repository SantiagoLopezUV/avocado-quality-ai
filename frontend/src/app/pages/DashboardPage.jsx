import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import ConfidencePanel from "../components/ConfidencePanel";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal";
import { useAuth } from "../contexts/AuthContext";
import { listBatches, createBatch, assignAnalysisToBatch } from "../services/api";

const API_BASE = `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8001"}/api/v1`;
const DIAGNOSIS_KEY = "avocado_active_diagnosis";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout, getToken } = useAuth();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Estados
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Estados para el panel de guardado en lote
  const [batches, setBatches] = useState([]);
  const [showSavePanel, setShowSavePanel] = useState(false);
  const [saveTarget, setSaveTarget] = useState("individual");
  const [newBatchName, setNewBatchName] = useState("");
  const [savingBatch, setSavingBatch] = useState(false);
  const [savedBatchName, setSavedBatchName] = useState(null);

  // HU-F08: restaurar diagnóstico activo desde sessionStorage al montar
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DIAGNOSIS_KEY);
      if (saved) {
        const { result: savedResult, selectedImage: savedImage } = JSON.parse(saved);
        if (savedResult && savedImage) {
          setResult(savedResult);
          setSelectedImage(savedImage);
        }
      }
    } catch {
      sessionStorage.removeItem(DIAGNOSIS_KEY);
    }
  }, []);

  // Cargar lotes cuando el usuario está autenticado
  useEffect(() => {
    if (user) {
      listBatches(getToken()).then(setBatches).catch(() => {});
    }
  }, [user]);

  // HU-F08: limpiar diagnóstico activo (imagen + resultados + sesión)
  const clearDiagnosis = () => {
    setSelectedImage(null);
    setImageFile(null);
    setResult(null);
    setShowSavePanel(false);
    setSaveTarget("individual");
    setNewBatchName("");
    setSavedBatchName(null);
    sessionStorage.removeItem(DIAGNOSIS_KEY);
  };

  // Guardar análisis en el lote seleccionado
  const handleSaveToTarget = async () => {
    if (!result?.analysis_id) return;
    if (saveTarget === "individual") {
      setSavedBatchName("análisis individuales");
      setShowSavePanel(false);
      return;
    }
    setSavingBatch(true);
    try {
      let targetBatchId = saveTarget;
      let targetBatchName = "";
      if (saveTarget === "new") {
        if (!newBatchName.trim()) return;
        const newBatch = await createBatch(getToken(), newBatchName.trim());
        targetBatchId = newBatch.id;
        targetBatchName = newBatch.name;
        setBatches(prev => [...prev, newBatch]);
      } else {
        targetBatchName = batches.find(b => b.id === saveTarget)?.name || "";
      }
      await assignAnalysisToBatch(getToken(), targetBatchId, result.analysis_id);
      setSavedBatchName(targetBatchName);
      setShowSavePanel(false);
    } catch (err) {
      alert("Error al guardar en lote: " + err.message);
    } finally {
      setSavingBatch(false);
    }
  };

  // Traducir niveles de madurez
  const ripinnesLevel = (level) => {
    const niveles = {
      "Underripe": "Verde",
      "Ripening": "Pintón",
      "Ripe": "Maduro",
      "Overripe": "Pasado",
      "Unknown": "No identificado"
    };
    return niveles[level] || level;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      alert("Primero debe subir una foto");
      return;
    }

    setAnalyzing(true);
    setShowSavePanel(false);
    setSaveTarget("individual");
    setNewBatchName("");
    setSavedBatchName(null);
    const formData = new FormData();
    formData.append("file", imageFile);

    const token = getToken();
    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers,
        body: formData,
      });
      
      // Verificar si la respuesta es un error 422 para mostrar un mensaje amigable al usuario, si el servidor rechazo la imagen por no detectar un aguacate o por baja confianza, se muestra un mensaje específico en lugar de una alerta genérica
      if (response.status === 422) {
        const errorData = await response.json();
        setResult({
          esError: true,
          mensajeError: errorData.detail?.mensaje || "No se detectó ningún aguacate en la imagen."
        });
        return; // salir sin procesar más
      }

      if (!response.ok) {
        throw new Error("Error en el servidor de IA");
      }

      const data = await response.json();
      console.log("🥑 DATOS DE LA IA:", data);

      // HU-I03: construir confidence_summary desde la nueva estructura plana del backend v2
      const confidenceSummary = {
        damage_model: {
          label: "Detección de Roña",
          value: data.damage_confidence || 0,
          display: `${(data.damage_confidence || 0).toFixed(1)}% de certeza`,
        },
        ripeness_model: {
          label: "Nivel de Madurez",
          value: data.ripeness_confidence || 0,
          display: `${(data.ripeness_confidence || 0).toFixed(1)}% de certeza`,
        },
      };

      const newResult = {
        // Estado de salud
        health: data.damage_level === "Healthy" ? "Sano y Limpio" : "Afectado (Con Roña)",
        healthPercent: Math.round(data.damage_confidence || 0),
        disease: data.detections?.length > 0
          ? `Se detectaron ${data.detections.length} mancha(s)`
          : "Ninguna detectada",

        // Madurez
        ripeness: ripinnesLevel(data.ripeness_level),
        ripenessConf: Math.round(data.ripeness_confidence || 0),

        // Precio — el backend v2 retorna price_sale y price_purchase
        suggestedPrice: data.price_sale || 0,
        basePrice: data.price_purchase || 0,
        qualityDiscount: 0,
        ripenessAdjustment: 0,
        destination: data.market_destination || "Calculando...",
        recommendation: `Según el análisis, este aguacate es ideal para: ${data.market_destination}.`,

        // HU-I03
        confidenceSummary: confidenceSummary,

        // Indica si el lote quedó guardado en BD
        savedToHistory: data.saved_to_history || false,
        analysis_id: data.analysis_id || null,
      };

      // HU-F08: imagen anotada con bounding boxes o la original subida
      const newSelectedImage = data.image_base64
        ? `data:image/jpeg;base64,${data.image_base64}`
        : selectedImage;

      setResult(newResult);

      if (data.image_base64) {
        setSelectedImage(newSelectedImage);
      }

      // Mostrar panel de guardado solo si el análisis fue persistido
      if (newResult.analysis_id || data.analysis_id) {
        // Refrescar lotes para tenerlos actualizados
        listBatches(getToken()).then(setBatches).catch(() => {});
        setShowSavePanel(true);
      }

      // HU-F08: persistir diagnóstico activo en sessionStorage
      try {
        sessionStorage.setItem(DIAGNOSIS_KEY, JSON.stringify({
          result: newResult,
          selectedImage: newSelectedImage,
        }));
      } catch {
        // sessionStorage no disponible o lleno, continuar sin persistir
      }



    } catch (error) {
      console.error("Error conectando con la API:", error);
  
      if(error.status === 422 || (error.message && error.message.includes("422"))){
        setResult({
          esError: true,
          mensajeError: "No se detectó ningún aguacate en la foto. Asegúrese de que la imagen muestre claramente un aguacate y vuelva a intentarlo."
        });
      }else{
          alert("Hubo un error: " + error.message);
      }
    } finally {
      setAnalyzing(false);
    }
  };

  // HU-F09: compartir resultado por WhatsApp
  const handleShare = () => {
    if (!result) return;
    const mensaje =
      `🥑 *Resultado del Diagnóstico - Avocado Quality AI*\n\n` +
      `📊 *Madurez:* ${result.ripeness}\n` +
      `❤️ *Estado de salud:* ${result.health} (${result.healthPercent}%)\n` +
      `🦠 *Enfermedades:* ${result.disease}\n` +
      `💰 *Precio sugerido:* $${result.suggestedPrice?.toLocaleString("es-CO")} COP/kg\n` +
      `📍 *Destino de mercado:* ${result.destination}\n\n` +
      `_Analizado con Avocado Quality AI_ 🤖`;

    const phone = user?.phone?.replace(/\D/g, "");
    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`
      : `https://wa.me/?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  };

  const handleCopyResult = () => {
    if (!result) return;
    const texto =
      `Resultado del Diagnóstico - Avocado Quality AI\n\n` +
      `Madurez: ${result.ripeness}\n` +
      `Estado de salud: ${result.health} (${result.healthPercent}%)\n` +
      `Enfermedades: ${result.disease}\n` +
      `Precio sugerido: $${result.suggestedPrice?.toLocaleString("es-CO")} COP/kg\n` +
      `Destino de mercado: ${result.destination}`;

    navigator.clipboard?.writeText(texto).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

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
              <button onClick={() => navigate("/dashboard")} className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold border-b-4 border-[#8bc34a] dark:border-[#9ccc65] pb-1 transition-colors">
                Diagnóstico
              </button>
              <button onClick={() => navigate("/marketplace")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
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
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">🔍</span>
              <h2 className="text-4xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">Revise Su Cosecha</h2>
            </div>
            <p className="text-xl text-[#475569] dark:text-gray-400 leading-relaxed transition-colors">
              Súbale una foto a sus aguacates y la inteligencia artificial le dice cómo están.
              Es facilito y rapidito.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Upload */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 transition-colors">
                <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-6 flex items-center gap-3 transition-colors">
                  <span className="text-3xl">📸</span>
                  Suba la Foto
                </h3>

                {!selectedImage ? (
                  <label className="block">
                    <div className="border-4 border-dashed border-[#8bc34a] dark:border-[#9ccc65] rounded-2xl p-12 text-center cursor-pointer hover:bg-[#f3f7f3] dark:hover:bg-gray-700 transition-colors">
                      <div className="text-6xl mb-4"></div>
                      <p className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-2 transition-colors">
                        Toque aquí pa' subir
                      </p>
                      <p className="text-lg text-[#475569] dark:text-gray-400 transition-colors">
                        O arrastre su foto acá
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src={selectedImage}
                        alt="Aguacate pa' analizar"
                        className="w-full h-auto"
                      />
                      <button
                        onClick={clearDiagnosis}
                        className="absolute top-4 right-4 bg-red-500 text-white size-12 rounded-full text-2xl hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>

                    <button
                      onClick={handleAnalyze}
                      disabled={analyzing}
                      className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-5 rounded-2xl text-2xl font-bold hover:bg-[#7cb342] dark:hover:bg-[#689f38] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {analyzing ? (
                        <span className="flex items-center justify-center gap-3">
                          <span className="animate-spin">⏳</span>
                          Analizando...
                        </span>
                      ) : (
                        "🔬 Analizar Ahora"
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-[#8bc34a10] dark:bg-[#8bc34a20] rounded-2xl p-6 border-2 border-[#8bc34a] dark:border-[#9ccc65] transition-colors">
                <h4 className="text-xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-4 flex items-center gap-2 transition-colors">
                  <span className="text-2xl">💡</span>
                  Consejos pa' mejor resultado:
                </h4>
                <ul className="space-y-3 text-lg text-[#0d1b0d] dark:text-gray-300 transition-colors">
                  <li className="flex items-start gap-3">
                    <span className="text-[#8bc34a] dark:text-[#9ccc65] font-bold">✓</span>
                    <span>Tome la foto con buena luz</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8bc34a] dark:text-[#9ccc65] font-bold">✓</span>
                    <span>Que se vea bien el aguacate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8bc34a] dark:text-[#9ccc65] font-bold">✓</span>
                    <span>Evite fotos borrosas</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Results */}
            <div>
              {result?.esError ? (
                // HU-I07: pantalla de error cuando la imagen no es un aguacate
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 transition-colors">
                  <div className="flex flex-col items-center text-center gap-6">
                    <span className="text-8xl">🚫</span>
                    <h3 className="text-2xl font-bold text-red-500 dark:text-red-400">
                      Imagen no válida
                    </h3>
                    <p className="text-xl text-[#475569] dark:text-gray-300 leading-relaxed">
                      {result.mensajeError}
                    </p>
                    <div className="bg-[#fff4e6] dark:bg-orange-900/30 rounded-2xl p-5 border-2 border-[#ffb020] dark:border-orange-700 w-full">
                      <p className="text-lg font-semibold text-[#0d1b0d] dark:text-gray-200 mb-3">
                        💡 Consejos para una buena foto:
                      </p>
                      <ul className="space-y-2 text-left text-lg text-[#475569] dark:text-gray-300">
                        <li className="flex items-center gap-2">
                          <span className="text-[#8bc34a]">✓</span>
                          Que se vea claramente el aguacate completo
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#8bc34a]">✓</span>
                          Fondo limpio sin otros objetos
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#8bc34a]">✓</span>
                          Buena iluminación sin reflejos directos
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={clearDiagnosis}
                      className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-4 rounded-2xl text-xl font-bold hover:bg-[#7cb342] transition-colors"
                    >
                      Intentar con otra foto
                    </button>
                  </div>
                </div>

              ) : result ? (
                // Resultados normales del análisis
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 space-y-6 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">✅</span>
                    <h3 className="text-3xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">Resultados</h3>
                  </div>

                  {/* Health Status */}
                  <div className="bg-[#8bc34a10] dark:bg-[#8bc34a20] rounded-2xl p-6 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xl font-semibold text-[#0d1b0d] dark:text-gray-200 transition-colors">Estado de Salud</span>
                      <span className="text-3xl font-black text-[#8bc34a] dark:text-[#9ccc65] transition-colors">{result.healthPercent}%</span>
                    </div>
                    <div className="w-full bg-[#e4ede4] dark:bg-gray-700 rounded-full h-6 overflow-hidden transition-colors">
                      <div
                        className="bg-[#8bc34a] dark:bg-[#9ccc65] h-full rounded-full transition-all duration-1000"
                        style={{ width: `${result.healthPercent}%` }}
                      />
                    </div>
                    <p className="text-2xl font-bold text-[#8bc34a] dark:text-[#9ccc65] mt-3 transition-colors">{result.health}</p>
                  </div>

                  {/* Disease Detection */}
                  <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-6 transition-colors">
                    <p className="text-lg font-semibold text-[#0d1b0d] dark:text-gray-200 mb-2 transition-colors">Enfermedades:</p>
                    <p className="text-xl font-bold text-[#8bc34a] dark:text-[#9ccc65] transition-colors">{result.disease}</p>
                  </div>

                  {/* Ripeness */}
                  <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-6 transition-colors">
                    <p className="text-lg font-semibold text-[#0d1b0d] dark:text-gray-200 mb-2 transition-colors">Madurez:</p>
                    <p className="text-xl font-bold text-[#0d1b0d] dark:text-gray-100 transition-colors">{result.ripeness}</p>
                  </div>

                  {/* HU-I03: Panel de confianza */}
                  {result.confidenceSummary && (
                    <ConfidencePanel confidenceSummary={result.confidenceSummary} />
                  )}

                  {/* Recommendations */}
                  <div className="bg-[#fff4e6] dark:bg-orange-900/30 rounded-2xl p-6 border-2 border-[#ffb020] dark:border-orange-700 transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">👨‍🌾</span>
                      <div>
                        <p className="text-lg font-semibold text-[#0d1b0d] dark:text-gray-200 mb-2 transition-colors">Recomendación:</p>
                        <p className="text-xl text-[#0d1b0d] dark:text-gray-300 leading-relaxed transition-colors">{result.recommendation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Cálculo de Precio */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-6 border-2 border-[#8bc34a] dark:border-[#9ccc65] shadow-lg transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-4xl">💰</span>
                      <h4 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100">Cálculo del Precio</h4>
                    </div>

                    {/* Precio Final Destacado */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-6 text-center border-2 border-[#8bc34a] dark:border-[#9ccc65]">
                      <p className="text-sm font-bold text-[#689f38] dark:text-[#9ccc65] uppercase tracking-wider mb-2">
                        💵 Precio Sugerido por Kilogramo
                      </p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-5xl font-black text-[#8bc34a] dark:text-[#9ccc65]">
                          ${result.suggestedPrice?.toLocaleString('es-CO')}
                        </span>
                        <span className="text-xl font-bold text-[#475569] dark:text-gray-400">COP</span>
                      </div>
                      <p className="text-sm text-[#475569] dark:text-gray-400 mt-2">
                        📍 Destino: <span className="font-bold text-[#0d1b0d] dark:text-gray-200">{result.destination}</span>
                      </p>
                    </div>

                    {/* Desglose */}
                    <div className="space-y-3">
                      <p className="text-lg font-bold text-[#0d1b0d] dark:text-gray-100 mb-3 flex items-center gap-2">
                        <span>📊</span>
                        ¿Cómo se calculó este precio?
                      </p>

                      {/* Precio Base */}
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🏪</span>
                          <div>
                            <p className="font-semibold text-[#0d1b0d] dark:text-gray-200">Precio Base del Mercado</p>
                            <p className="text-sm text-[#475569] dark:text-gray-400">Precio referencia hoy</p>
                          </div>
                        </div>
                        <span className="text-xl font-bold text-[#0d1b0d] dark:text-gray-100">
                          ${result.basePrice?.toLocaleString('es-CO')}
                        </span>
                      </div>

                      {/* Descuento por Calidad */}
                      {result.qualityDiscount !== 0 && (
                        <div className={`rounded-xl p-4 flex justify-between items-center ${
                          result.qualityDiscount > 0
                            ? 'bg-red-50 dark:bg-red-900/20'
                            : 'bg-green-50 dark:bg-green-900/20'
                        }`}>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{result.qualityDiscount > 0 ? '⚠️' : '✅'}</span>
                            <div>
                              <p className="font-semibold text-[#0d1b0d] dark:text-gray-200">
                                {result.qualityDiscount > 0 ? 'Descuento por Daños' : 'Sin Descuentos'}
                              </p>
                              <p className="text-sm text-[#475569] dark:text-gray-400">
                                {result.qualityDiscount > 0
                                  ? 'Manchas o roña detectada'
                                  : 'Aguacate en perfecto estado'}
                              </p>
                            </div>
                          </div>
                          <span className={`text-xl font-bold ${
                            result.qualityDiscount > 0
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-green-600 dark:text-green-400'
                          }`}>
                            {result.qualityDiscount > 0 ? '-' : ''}${Math.abs(result.qualityDiscount)?.toLocaleString('es-CO')}
                          </span>
                        </div>
                      )}

                      {/* Ajuste por Madurez */}
                      {result.ripenessAdjustment !== 0 && (
                        <div className={`rounded-xl p-4 flex justify-between items-center ${
                          result.ripenessAdjustment < 0
                            ? 'bg-orange-50 dark:bg-orange-900/20'
                            : 'bg-blue-50 dark:bg-blue-900/20'
                        }`}>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🥑</span>
                            <div>
                              <p className="font-semibold text-[#0d1b0d] dark:text-gray-200">Ajuste por Madurez</p>
                              <p className="text-sm text-[#475569] dark:text-gray-400">
                                Estado: {result.ripeness}
                              </p>
                            </div>
                          </div>
                          <span className={`text-xl font-bold ${
                            result.ripenessAdjustment > 0
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-orange-600 dark:text-orange-400'
                          }`}>
                            {result.ripenessAdjustment > 0 ? '+' : ''}${result.ripenessAdjustment?.toLocaleString('es-CO')}
                          </span>
                        </div>
                      )}

                      {/* Total */}
                      <div className="border-t-2 border-[#8bc34a] dark:border-[#9ccc65] pt-4 mt-4">
                        <div className="bg-[#8bc34a] dark:bg-[#7cb342] rounded-xl p-4 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">✅</span>
                            <p className="text-xl font-bold text-white">Precio Final Calculado</p>
                          </div>
                          <span className="text-2xl font-black text-white">
                            ${result.suggestedPrice?.toLocaleString('es-CO')}
                          </span>
                        </div>
                      </div>

                      {/* Nota */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mt-4">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">ℹ️</span>
                          <div>
                            <p className="text-sm font-semibold text-[#0d1b0d] dark:text-gray-200 mb-1">¿Por qué este precio?</p>
                            <p className="text-sm text-[#475569] dark:text-gray-400 leading-relaxed">
                              Este precio se calculó automáticamente según la calidad detectada por la IA,
                              el estado de madurez y el precio actual del mercado. Es justo, competitivo y
                              refleja el valor real de su cosecha.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HU-F09: Compartir resultado */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleShare}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-2xl text-lg font-bold hover:bg-[#1ebe5d] transition-colors shadow"
                    >
                      <span className="text-2xl">💬</span>
                      Compartir por WhatsApp
                    </button>
                    <button
                      onClick={handleCopyResult}
                      className="flex items-center justify-center gap-2 bg-[#f3f7f3] dark:bg-gray-700 text-[#0d1b0d] dark:text-gray-100 px-5 py-4 rounded-2xl text-lg font-bold hover:bg-[#e8f5e9] dark:hover:bg-gray-600 transition-colors border-2 border-[#c5e1a5] dark:border-gray-600"
                      title="Copiar al portapapeles"
                    >
                      {copied ? "✅" : "📋"}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-center text-sm text-[#689f38] dark:text-[#9ccc65] font-semibold -mt-2">
                      ¡Resultado copiado al portapapeles!
                    </p>
                  )}

                  {/* ── Panel de guardado en lote ── */}
                  {user && showSavePanel && !savedBatchName && (
                    <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-5 border-2 border-[#c5e1a5] dark:border-gray-600">
                      <p className="text-base font-bold text-[#0d1b0d] dark:text-gray-100 mb-3 flex items-center gap-2">
                        <span>📂</span> ¿A qué lote deseas asignarlo?
                      </p>
                      <div className="flex flex-col gap-3">
                        <select
                          value={saveTarget}
                          onChange={e => { setSaveTarget(e.target.value); setNewBatchName(""); }}
                          className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-[#8bc34a] outline-none dark:bg-gray-800 dark:text-white text-base"
                        >
                          <option value="individual">📄 Dejar como análisis individual</option>
                          {batches.map(b => (
                            <option key={b.id} value={b.id}>📦 {b.name}</option>
                          ))}
                          <option value="new">➕ Crear nuevo lote...</option>
                        </select>

                        {saveTarget === "new" && (
                          <input
                            autoFocus
                            type="text"
                            placeholder="Nombre del nuevo lote..."
                            value={newBatchName}
                            onChange={e => setNewBatchName(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSaveToTarget()}
                            className="w-full border-2 border-[#8bc34a] rounded-xl px-4 py-2.5 focus:outline-none dark:bg-gray-800 dark:text-white"
                          />
                        )}

                        <button
                          onClick={handleSaveToTarget}
                          disabled={savingBatch || (saveTarget === "new" && !newBatchName.trim())}
                          className="w-full bg-[#8bc34a] dark:bg-[#7cb342] text-white py-3 rounded-xl font-bold hover:bg-[#7cb342] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {savingBatch
                            ? "Guardando..."
                            : saveTarget === "individual"
                              ? "✓ Guardar como análisis individual"
                              : "📂 Guardar en lote"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Confirmación de guardado */}
                  {user && savedBatchName && (
                    <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-2xl p-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">✅</span>
                        <p className="text-base font-semibold text-green-700 dark:text-green-400">
                          Guardado en: <strong>{savedBatchName}</strong>
                        </p>
                      </div>
                      <button
                        onClick={() => navigate("/batches")}
                        className="flex-shrink-0 bg-[#8bc34a] dark:bg-[#7cb342] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#7cb342] transition-colors"
                      >
                        Ver Mis Lotes →
                      </button>
                    </div>
                  )}

                  {/* Sin sesión — invitar a iniciar sesión */}
                  {!user && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">💾</span>
                        <p className="text-base font-semibold text-blue-700 dark:text-blue-400">
                          Inicia sesión para guardar este análisis
                        </p>
                      </div>
                      <button
                        onClick={() => navigate("/")}
                        className="flex-shrink-0 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
                      >
                        Iniciar sesión
                      </button>
                    </div>
                  )}

                  <button
                    onClick={clearDiagnosis}
                    className="w-full bg-[#0d1b0d] dark:bg-gray-700 text-white py-4 rounded-2xl text-xl font-bold hover:bg-[#1a2e1a] dark:hover:bg-gray-600 transition-colors"
                  >
                    Cerrar diagnóstico
                  </button>
                </div>

              ) : (
                // Estado inicial — esperando que suban una foto
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center h-full flex items-center justify-center transition-colors">
                  <div>
                    <div className="text-8xl mb-6">🔬</div>
                    <p className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-3 transition-colors">
                      {selectedImage ? "Dele al botón de analizar" : "Suba una foto pa' empezar"}
                    </p>
                    <p className="text-lg text-[#475569] dark:text-gray-400 transition-colors">
                      Los resultados salen aquí altiro
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}