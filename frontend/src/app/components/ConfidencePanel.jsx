/**
 * Nivel de Confianza y Transparencia
 *
 * Componente: ConfidencePanel
 *
 * Recibe el objeto `confidence_summary` que devuelve el endpoint /analyze:
 *
 *   confidence_summary: {
 *     damage_model:   { label, value, display },   // modelo de roña
 *     ripeness_model: { label, value, display },   // modelo de madurez
 *   }
 *
 * Uso:
 *   import ConfidencePanel from "@/components/ConfidencePanel";
 *   <ConfidencePanel confidenceSummary={response.confidence_summary} />
 */

import { useEffect, useRef, useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Devuelve color y etiqueta según el valor de confianza.
 * Umbrales calibrados para el contexto agrícola:
 *   ≥ 85 → Alta confianza   (verde)
 *   ≥ 65 → Media confianza  (amarillo)
 *   <  65 → Baja confianza  (rojo)
 */
function getConfidenceTier(value) {
  if (value >= 85) return { color: "#22c55e", label: "Alta", badge: "tier-alta" };
  if (value >= 65) return { color: "#eab308", label: "Media", badge: "tier-media" };
  return { color: "#ef4444", label: "Baja", badge: "tier-baja" };
}

// ─── Sub-componente: barra de un modelo ───────────────────────────────────────

function ConfidenceBar({ modelKey, data, animDelay = 0 }) {
  const [animated, setAnimated] = useState(false);
  const barRef = useRef(null);

  const value = data?.value ?? 0;
  const display = data?.display ?? `${value}% de certeza`;
  const label = data?.label ?? modelKey;
  const tier = getConfidenceTier(value);

  // Animación de entrada con IntersectionObserver
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={barRef}
      className="bg-[#f3f7f3] dark:bg-gray-700 rounded-2xl p-5 flex flex-col gap-3 transition-colors"
      style={{ border: `1px solid ${tier.color}33` }}
    >
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <span className="text-[#475569] dark:text-gray-400 text-sm font-medium transition-colors">
          {label}
        </span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full border transition-colors"
          style={{
            color: tier.color,
            borderColor: `${tier.color}55`,
            backgroundColor: `${tier.color}15`,
          }}
        >
          {tier.label}
        </span>
      </div>

      {/* Porcentaje grande */}
      <div
        className="leading-none font-black"
        style={{ color: tier.color, fontSize: "36px", letterSpacing: "-0.02em" }}
      >
        {value.toFixed(1)}
        <span className="text-lg text-[#94a3b8] dark:text-gray-500 ml-1 font-semibold">%</span>
      </div>

      {/* Barra de progreso */}
      <div className="h-1.5 bg-[#e4ede4] dark:bg-gray-600 rounded-full overflow-hidden transition-colors">
        <div
          style={{
            height: "100%",
            width: animated ? `${value}%` : "0%",
            background: `linear-gradient(90deg, ${tier.color}88, ${tier.color})`,
            borderRadius: "99px",
            transition: `width 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${animDelay}ms`,
            boxShadow: `0 0 6px ${tier.color}55`,
          }}
        />
      </div>

      {/* Texto legible */}
      <p className="m-0 text-[#475569] dark:text-gray-400 text-xs transition-colors">
        {display}
      </p>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ConfidencePanel({ confidenceSummary }) {
  // Fallback: si el padre aún no tiene datos, mostrar esqueleto
  if (!confidenceSummary) {
    return (
      <div className="bg-[#f3f7f3] dark:bg-gray-700 border border-[#c5e1a5] dark:border-gray-600 rounded-2xl p-5 w-full transition-colors">
        <SkeletonBar />
        <SkeletonBar />
      </div>
    );
  }

  const { damage_model, ripeness_model } = confidenceSummary;

  return (
    <section className="bg-[#f3f7f3] dark:bg-gray-700 border border-[#c5e1a5] dark:border-gray-600 rounded-2xl p-5 w-full transition-colors">
      {/* Título de sección */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">🔬</span>
        <h3 className="m-0 text-[#0d1b0d] dark:text-gray-100 text-sm font-bold uppercase tracking-wider transition-colors">
          Nivel de Confianza del Análisis
        </h3>
      </div>

      <p className="mt-0 mb-4 text-[#475569] dark:text-gray-400 text-xs leading-relaxed transition-colors">
        Porcentaje estadístico de certeza de cada modelo de IA utilizado en el análisis.
      </p>

      {/* Barras de los dos modelos */}
      <div className="flex flex-col gap-3">
        <ConfidenceBar modelKey="damage_model" data={damage_model} animDelay={0} />
        <ConfidenceBar modelKey="ripeness_model" data={ripeness_model} animDelay={150} />
      </div>

      {/* Nota técnica de transparencia */}
      <p className="mt-4 mb-0 text-[#94a3b8] dark:text-gray-500 text-xs border-t border-[#c5e1a5] dark:border-gray-600 pt-3 leading-relaxed transition-colors">
        ⓘ Los valores reflejan la certeza del modelo YOLOv8 entrenado sobre imágenes
        de aguacate Hass. Umbrales: ≥85% Alta · ≥65% Media · &lt;65% Baja.
      </p>
    </section>
  );
}

// ─── Skeleton mientras carga ──────────────────────────────────────────────────

function SkeletonBar() {
  return (
    <div className="bg-[#e4ede4] dark:bg-gray-600 rounded-2xl p-5 h-28 mb-3 animate-pulse transition-colors" />
  );
}
