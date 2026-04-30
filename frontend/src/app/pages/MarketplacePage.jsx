import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../contexts/AuthContext";

export default function MarketplacePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedLot, setSelectedLot] = useState(null);
  const [filter, setFilter] = useState("todos");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const lots = [
    {
      id: 1,
      name: "Hass Premium",
      farmer: "Don Roberto Pérez",
      location: "Caicedonia, Valle",
      quantity: "500 kg",
      price: "$4,500",
      quality: 95,
      image: "🥑",
      description: "Aguacates Hass de primera. Cosechados hace poquito, están quedando pa' exportar."
    },
    {
      id: 2,
      name: "Hass Exportación",
      farmer: "Doña María Gómez",
      location: "Alcalá, Valle",
      quantity: "1,000 kg",
      price: "$5,200",
      quality: 98,
      image: "🥑",
      description: "Lote de exportación. Certificado orgánico. Los mejores del valle."
    },
    {
      id: 3,
      name: "Hass Selecto",
      farmer: "Luis Torres",
      location: "Ulloa, Valle",
      quantity: "750 kg",
      price: "$4,800",
      quality: 92,
      image: "🥑",
      description: "Aguacates de tamaño parejo, bien cuidaditos. Ideales pa' mercado local."
    },
    {
      id: 4,
      name: "Lorena Grande",
      farmer: "Carmen Rodríguez",
      location: "Tuluá, Valle",
      quantity: "600 kg",
      price: "$3,800",
      quality: 90,
      image: "🥑",
      description: "Variedad Lorena, excelente pa' guacamole. Sabor único del Valle."
    },
    {
      id: 5,
      name: "Papelillo Criollo",
      farmer: "Jairo Muñoz",
      location: "Roldanillo, Valle",
      quantity: "400 kg",
      price: "$3,500",
      quality: 88,
      image: "🥑",
      description: "Papelillo tradicional, de los de antes. Cremositos y sabrosos."
    },
    {
      id: 6,
      name: "Hass Orgánico",
      farmer: "Rosa Quintero",
      location: "Zarzal, Valle",
      quantity: "850 kg",
      price: "$5,500",
      quality: 96,
      image: "🥑",
      description: "100% orgánico, sin químicos. Certificado por el ICA. Premium quality."
    },
  ];

  const filteredLots = filter === "todos" 
    ? lots 
    : lots.filter(lot => lot.quality >= 95);

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
              <button onClick={() => navigate("/marketplace")} className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold border-b-4 border-[#8bc34a] dark:border-[#9ccc65] pb-1 transition-colors">
                Mi Plaza
              </button>
              <button onClick={() => navigate("/help")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Ayuda
              </button>
              {user && (
                <button onClick={() => navigate("/history")} className="text-lg text-[#0d1b0d] dark:text-gray-200 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                  Mi Historial
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
                {filteredLots.length} {filteredLots.length === 1 ? "lote disponible" : "lotes disponibles"}
              </span>
            </div>
          </div>

          {/* Lots Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredLots.map((lot) => (
              <div
                key={lot.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => setSelectedLot(lot)}
              >
                <div className="bg-gradient-to-br from-[#11d411] to-[#0fd40f] h-48 flex items-center justify-center">
                  <span className="text-9xl">{lot.image}</span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-200">{lot.name}</h3>
                    <div className="bg-[#11d411] px-3 py-1 rounded-full">
                      <span className="text-base font-bold text-[#0d1b0d]">{lot.quality}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-lg text-[#0d1b0d] dark:text-gray-200 flex items-center gap-2">
                      <span>👨‍🌾</span>
                      <span className="font-semibold">{lot.farmer}</span>
                    </p>
                    <p className="text-lg text-[#475569] dark:text-gray-200 flex items-center gap-2">
                      <span>📍</span>
                      {lot.location}
                    </p>
                    <p className="text-lg text-[#475569] dark:text-gray-200 flex items-center gap-2">
                      <span>⚖️</span>
                      {lot.quantity}
                    </p>
                  </div>

                  <div className="pt-3 border-t-2 border-[#e4ede4] dark:border-gray-700 flex justify-between items-center">
                    <div>
                      <p className="text-base text-[#475569] dark:text-gray-200">Precio por kg</p>
                      <p className="text-2xl font-black text-[#11d411]">{lot.price}</p>
                    </div>
                    <button className="bg-[#0d1b0d] text-white px-5 py-3 rounded-xl text-lg font-bold hover:bg-[#1a2e1a] transition-colors">
                      Ver Más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#11d411] to-[#0fd40f] rounded-3xl p-8 md:p-12 text-center shadow-xl">
            <h3 className="text-3xl md:text-4xl font-black text-[#0d1b0d] mb-4">
              ¿Tiene Aguacates pa' Vender?
            </h3>
            <p className="text-xl text-[#0d1b0d] opacity-90 mb-6">
              Publique su lote en la plaza y llegue a más compradores. Es fácil y rapidito.
            </p>
            <button className="bg-[#0d1b0d] text-white px-8 py-5 rounded-2xl text-2xl font-bold hover:bg-[#1a2e1a] transition-colors shadow-lg">
              Publicar Mi Lote
            </button>
          </div>
        </div>
      </main>

      {/* Modal for lot details */}
      {selectedLot && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLot(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-[#11d411] to-[#0fd40f] h-64 flex items-center justify-center relative">
              <span className="text-[150px]">{selectedLot.image}</span>
              <button
                onClick={() => setSelectedLot(null)}
                className="absolute top-4 right-4 bg-white text-[#0d1b0d] size-12 rounded-full text-2xl font-bold hover:bg-[#f3f7f3]"
              >
                ✕
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-[#0d1b0d] dark:text-gray-200 mb-2">{selectedLot.name}</h2>
                  <p className="text-xl text-[#475569] dark:text-gray-200">Por {selectedLot.farmer}</p>
                </div>
                <div className="bg-[#11d411] px-4 py-2 rounded-full">
                  <span className="text-xl font-bold text-[#0d1b0d]">Calidad: {selectedLot.quality}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-4">
                  <p className="text-base text-[#475569] dark:text-gray-200 mb-1">Ubicación</p>
                  <p className="text-xl font-bold text-[#0d1b0d] dark:text-gray-200 flex items-center gap-2">
                    <span>📍</span>
                    {selectedLot.location}
                  </p>
                </div>
                <div className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-4">
                  <p className="text-base text-[#475569] dark:text-gray-200 mb-1">Cantidad</p>
                  <p className="text-xl font-bold text-[#0d1b0d] dark:text-gray-200 flex items-center gap-2">
                    <span>⚖️</span>
                    {selectedLot.quantity}
                  </p>
                </div>
              </div>

              <div className="bg-[#11d41110] rounded-2xl p-6">
                <p className="text-lg text-[#0d1b0d] dark:text-gray-200 font-semibold mb-3">Descripción:</p>
                <p className="text-xl text-[#0d1b0d] dark:text-gray-200 leading-relaxed">{selectedLot.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t-2 border-[#e4ede4] dark:border-gray-700">
                <div>
                  <p className="text-lg text-[#475569] dark:text-gray-200">Precio por kg</p>
                  <p className="text-4xl font-black text-[#11d411]">{selectedLot.price}</p>
                </div>
                <div className="space-y-3">
                  <button className="w-full bg-[#11d411] text-[#0d1b0d] px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#0fd40f] transition-colors">
                    Contactar al Vendedor
                  </button>
                  <button className="w-full bg-[#0d1b0d] text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#1a2e1a] transition-colors">
                    Hacer Oferta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}