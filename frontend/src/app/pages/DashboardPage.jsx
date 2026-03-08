import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        health: "Bueno",
        healthPercent: 92,
        disease: "Ninguna detectada",
        recommendation: "Su aguacatal está de lo mejor. Siga echándole ganas con el riego y el abono.",
        ripeness: "Listo pa' cosechar en 5-7 días",
      });
    }, 2000);
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
                      <div className="text-6xl mb-4">����</div>
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
                        className="w-full h-80 object-cover"
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
              {result ? (
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

                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setResult(null);
                    }}
                    className="w-full bg-[#0d1b0d] dark:bg-gray-700 text-white py-4 rounded-2xl text-xl font-bold hover:bg-[#1a2e1a] dark:hover:bg-gray-600 transition-colors"
                  >
                    Analizar Otra Foto
                  </button>
                </div>
              ) : (
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