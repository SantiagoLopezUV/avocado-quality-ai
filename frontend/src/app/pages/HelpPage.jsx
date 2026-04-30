import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  Smartphone,
  TrendingUp,
  ShoppingBag,
  User,
  Camera,
  Upload,
  DollarSign,
  CheckCircle
} from "lucide-react";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function HelpPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = () => { logout(); navigate("/"); };
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Cómo hago pa' empezar con Avocado?",
      answer: "¡Bien pueda! Primero registrate con tu correo o teléfono, luego completá tu perfil con la info de tu finca y listo. Ya podés usar el diagnóstico con IA y vender tus aguacates en Mi Plaza."
    },
    {
      question: "¿Qué es eso del diagnóstico con IA?",
      answer: "Es una chimba, parcero. Le tomás una foto a tu planta de aguacate y nuestra inteligencia artificial te dice qué tiene: si está enferma, qué plaga tiene, o si está sanita. También te da consejos pa' cuidarla mejor."
    },
    {
      question: "¿Cómo vendo mis aguacates en Mi Plaza?",
      answer: "Súper fácil: entrás a Mi Plaza, le das a 'Publicar', ponés cuántos kilos tenés, el precio, y unas fotos. Los compradores te contactan directo por WhatsApp o teléfono."
    },
    {
      question: "¿Avocado cobra algo por vender?",
      answer: "¡No mi hermano! La app es gratarola para todos los agricultores del Valle. Queremos ayudarles a vender mejor sin cobrarles nada."
    },
    {
      question: "¿Cómo cambio mi información de contacto?",
      answer: "Anda a tu perfil (el botoncito arriba a la derecha), dale a 'Editar Perfil' y ahí cambiás lo que quieras: teléfono, WhatsApp, dirección de la finca, todo."
    },
    {
      question: "¿Funciona sin internet?",
      answer: "Pa' usar el diagnóstico y Mi Plaza sí necesitás internet, pero no mucho. Con señal celular normal ya sirve. Las fotos que tomaste se guardan en tu teléfono."
    },
    {
      question: "¿Es seguro poner mi número de teléfono?",
      answer: "Sí parce, solo los compradores interesados en tu producto pueden verlo. No compartimos tu info con nadie más."
    },
    {
      question: "¿Qué hago si la app no me funciona?",
      answer: "Primero intentá cerrarla y abrirla de nuevo. Si sigue mala, escribinos por WhatsApp o llamános. Te ayudamos en un dos por tres."
    }
  ];

  const guides = [
    {
      title: "Usar el Diagnóstico IA",
      icon: Camera,
      color: "bg-blue-500",
      steps: [
        "Abrí la app y dale al botón 'Diagnóstico'",
        "Tocá el botón de la cámara bien grande",
        "Tomale una foto clarita a tu planta enferma",
        "Esperá unos segunditos mientras la IA la revisa",
        "Leé el diagnóstico y los consejos que te da"
      ],
      image: "https://images.unsplash.com/photo-1758524053970-9c78f1c2680c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwYWdyaWN1bHR1cmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3Mjk5NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Vender en Mi Plaza",
      icon: ShoppingBag,
      color: "bg-green-500",
      steps: [
        "Andá a 'Mi Plaza' en el menú principal",
        "Dale al botón verde '+Publicar Aguacates'",
        "Poné cuántos kilos tenés pa' vender",
        "Escribí el precio por kilo",
        "Subí 2 o 3 fotos bonitas de tus aguacates",
        "Dale 'Publicar' y listo, ¡a vender!"
      ],
      image: "https://images.unsplash.com/photo-1562147529-1f05d6533ceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRwbGFjZSUyMGZyZXNoJTIwcHJvZHVjZSUyMHNlbGxpbmd8ZW58MXx8fHwxNzcyOTk0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Actualizar tu Perfil",
      icon: User,
      color: "bg-purple-500",
      steps: [
        "Tocá tu foto arriba a la derecha",
        "Dale a 'Editar Perfil'",
        "Cambiá lo que necesitás: nombre, finca, teléfono",
        "Si querés, poné una foto tuya o de tu finca",
        "Dale 'Guardar' y ya quedó"
      ],
      image: "https://images.unsplash.com/photo-1588497502684-f47b2437367f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYW4lMjBmYXJtZXIlMjBhdm9jYWRvJTIwaGFydmVzdHxlbnwxfHx8fDE3NzI5OTQ3NTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="bg-[#f6f8f6] dark:bg-gray-900 min-h-screen flex flex-col transition-colors">
      {/* Header */}
      <header className="bg-[#e8f5e9] dark:bg-gray-800 border-b-2 border-[#c5e1a5] dark:border-gray-700 px-6 py-6 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-[0px] py-[8px]">
          <Logo size="lg" showText={true} />
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8">
              <button onClick={() => navigate("/dashboard")} className="text-lg text-gray-900 dark:text-gray-100 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Diagnóstico
              </button>
              <button onClick={() => navigate("/marketplace")} className="text-lg text-gray-900 dark:text-gray-100 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                Mi Plaza
              </button>
              <button onClick={() => navigate("/help")} className="text-lg text-[#8bc34a] dark:text-[#9ccc65] font-bold border-b-4 border-[#8bc34a] dark:border-[#9ccc65] pb-1 transition-colors">
                Ayuda
              </button>
              {user && (
                <button onClick={() => navigate("/history")} className="text-lg text-gray-900 dark:text-gray-100 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
                  Mi Historial
                </button>
              )}
              {user ? (
                <button onClick={() => navigate("/profile")} className="text-lg text-gray-900 dark:text-gray-100 hover:text-[#8bc34a] dark:hover:text-[#9ccc65] font-medium transition-colors">
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
              <button onClick={handleLogout} className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                <span>🚪</span>
                Salir
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#8bc34a] dark:bg-[#9ccc65] rounded-full mb-6">
              <HelpCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[#0d1b0d] dark:text-gray-100 mb-4">
              Centro de <span className="text-[#8bc34a] dark:text-[#9ccc65]">Ayuda</span>
            </h1>
            <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              ¡Estamos aquí pa' ayudarte, parce! Todo lo que necesitás saber sobre Avocado.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 md:p-12 mb-16 transition-colors">
            <h2 className="text-4xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-8 text-center">
              ¿Necesitás ayuda? ¡Contactanos!
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/573001234567" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20BA5B] rounded-2xl p-8 text-center transition-all hover:scale-105 cursor-pointer"
              >
                <MessageCircle className="w-16 h-16 text-white mx-auto mb-4" strokeWidth={2} />
                <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-xl text-white">+57 300 123 4567</p>
                <p className="text-lg text-white/80 mt-2">Respuesta rápida</p>
              </a>

              {/* Phone */}
              <a 
                href="tel:+573001234567"
                className="bg-[#8bc34a] hover:bg-[#7cb342] dark:bg-[#9ccc65] dark:hover:bg-[#8bc34a] rounded-2xl p-8 text-center transition-all hover:scale-105 cursor-pointer"
              >
                <Phone className="w-16 h-16 text-white mx-auto mb-4" strokeWidth={2} />
                <h3 className="text-2xl font-bold text-white mb-2">Teléfono</h3>
                <p className="text-xl text-white">+57 300 123 4567</p>
                <p className="text-lg text-white/90 mt-2">Lun-Vie 8am-6pm</p>
              </a>

              {/* Email */}
              <a 
                href="mailto:ayuda@avocado.com.co"
                className="bg-[#4285F4] hover:bg-[#3367D6] rounded-2xl p-8 text-center transition-all hover:scale-105 cursor-pointer"
              >
                <Mail className="w-16 h-16 text-white mx-auto mb-4" strokeWidth={2} />
                <h3 className="text-2xl font-bold text-white mb-2">Email</h3>
                <p className="text-xl text-white">ayuda@avocado.com.co</p>
                <p className="text-lg text-white/80 mt-2">Respuesta en 24hrs</p>
              </a>
            </div>
          </div>

          {/* Step by Step Guides */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-8 text-center">
              Guías Paso a Paso
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {guides.map((guide, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-all hover:shadow-2xl hover:scale-105"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback 
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover"
                      fallbackSrc="https://via.placeholder.com/600x400?text=Avocado"
                    />
                  </div>
                  <div className="p-6">
                    <div className={`inline-flex items-center gap-3 ${guide.color} rounded-xl px-4 py-2 mb-4`}>
                      <guide.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                      <h3 className="text-xl font-bold text-white">{guide.title}</h3>
                    </div>
                    <ol className="space-y-3">
                      {guide.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex gap-3">
                          <span className="flex-shrink-0 w-7 h-7 bg-[#8bc34a] dark:bg-[#9ccc65] text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {stepIndex + 1}
                          </span>
                          <span className="text-lg text-gray-700 dark:text-gray-300">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 md:p-12 transition-colors">
            <h2 className="text-4xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-8 text-center">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-xl font-bold text-[#0d1b0d] dark:text-gray-100 pr-4">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-8 h-8 text-[#8bc34a] dark:text-[#9ccc65] flex-shrink-0" strokeWidth={3} />
                    ) : (
                      <ChevronDown className="w-8 h-8 text-[#8bc34a] dark:text-[#9ccc65] flex-shrink-0" strokeWidth={3} />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="p-6 pt-0 bg-gray-50 dark:bg-gray-700/50">
                      <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#8bc34a] to-[#689f38] dark:from-[#9ccc65] dark:to-[#8bc34a] rounded-3xl p-12 text-white">
              <CheckCircle className="w-20 h-20 mx-auto mb-6" strokeWidth={2} />
              <h3 className="text-4xl font-bold mb-4">¿Ya te solucionamos la duda?</h3>
              <p className="text-2xl mb-8 opacity-90">Si todavía tenés preguntas, escribinos por WhatsApp. ¡Estamos pa' ayudarte!</p>
              <a 
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-[#8bc34a] hover:bg-gray-100 px-8 py-4 rounded-xl text-2xl font-bold transition-colors"
              >
                <MessageCircle className="w-8 h-8" strokeWidth={2.5} />
                Chatear con Nosotros
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#e8f5e9] dark:bg-gray-800 border-t-2 border-[#c5e1a5] dark:border-gray-700 px-6 py-8 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              © 2026 Avocado - Tecnología pa' tu aguacatal 🥑
            </p>
            <div className="flex gap-6">
              <button className="text-lg hover:text-[#8bc34a] dark:hover:text-[#9ccc65] transition-colors text-gray-700 dark:text-gray-300">
                Privacidad
              </button>
              <button className="text-lg hover:text-[#8bc34a] dark:hover:text-[#9ccc65] transition-colors text-gray-700 dark:text-gray-300">
                Términos
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
