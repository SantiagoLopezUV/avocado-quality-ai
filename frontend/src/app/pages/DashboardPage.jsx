import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import ConfidencePanel from "../components/ConfidencePanel";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Estados
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

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
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/analyze", {
        method: "POST",
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

      const fuenteDatos = data.analysis_report || data;
      const { analysis_results, business_logic, visuals } = fuenteDatos;
      
      // Extraer confidence_summary del response (si existe) para pasarlo al componente de confianza
      const confidenceSummary = data.analysis_report?.confidence_summary || data.confidence_summary || null;

      setResult({
        // Resultados de análisis
        health: analysis_results.health_status === "Healthy" ? "Sano y Limpio" : "Afectado (Con Roña)",
        healthPercent: Math.round(analysis_results.ripeness_conf || 0),
        disease: analysis_results.spots_found > 0 
          ? `Se detectaron ${analysis_results.spots_found} mancha(s)` 
          : "Ninguna detectada",
        ripeness: ripinnesLevel(analysis_results.ripeness_level),
        ripenessConf: Math.round(analysis_results.ripeness_conf),
        
        // Lógica de negocio
        suggestedPrice: business_logic.suggested_price || 0,
        basePrice: business_logic.base_price || 0,
        qualityDiscount: business_logic.quality_discount || 0,
        ripenessAdjustment: business_logic.ripeness_adjustment || 0,
        destination: business_logic.market_destination || "Calculando...",
        recommendation: `Según el análisis, este aguacate es ideal para: ${business_logic.market_destination}.`,
        confidenceSummary: confidenceSummary, // Incluir confidence_summary en el resultado para pasarlo al componente de confianza
      });

      // Actualizar imagen con detecciones
      if (visuals && visuals.image_base64) {
        setSelectedImage(`data:image/jpeg;base64,${visuals.image_base64}`);
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
              <button onClick={() => navigate("/dashboard")} className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold border-b-4 border-[#8bc34a] dark:border-[#9ccc65] pb-1 transition-colors">
                Diagnóstico
              </button>
              <button onClick={() => navigate("/marketplace")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Mi Plaza
              </button>
              <button onClick={() => navigate("/profile")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Mi Perfil
              </button>
            </nav>
            <ThemeToggle />
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              >
                <span>🚪</span>
                Salir
              </button>
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
                        onClick={() => {
                          setSelectedImage(null);
                          setResult(null);
                        }}
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
                      onClick={() => {
                        setSelectedImage(null);
                        setImageFile(null);
                        setResult(null);
                      }}
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

                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setImageFile(null);
                      setResult(null);
                    }}
                    className="w-full bg-[#0d1b0d] dark:bg-gray-700 text-white py-4 rounded-2xl text-xl font-bold hover:bg-[#1a2e1a] dark:hover:bg-gray-600 transition-colors"
                  >
                    Analizar Otra Foto
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