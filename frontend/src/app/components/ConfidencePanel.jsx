 
 
 /**
 *Nivel de Confianza y Transparencia
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
  if (value >= 85) return { color: "#22c55e", bg: "#052e16", label: "Alta" };
  if (value >= 65) return { color: "#eab308", bg: "#1c1400", label: "Media" };
  return { color: "#ef4444", bg: "#2d0a0a", label: "Baja" };
}

// ─── Sub-componente: barra de un modelo ───────────────────────────────────────

function ConfidenceBar({ modelKey, data, animDelay = 0 }) {
  const [animated, setAnimated] = useState(false);
  const barRef = useRef(null);

  const value = data?.value ?? 0;
  const display = data?.display ?? `${value}% de certeza`;
  const label = data?.label ?? modelKey;
  const tier = getConfidenceTier(value);

  // Animación de entrada con IntersectionObserver (accesible, sin scroll-jank)
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
      style={{
        background: "#0f0f0f",
        border: `1px solid ${tier.color}22`,
        borderRadius: "12px",
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "border-color 0.3s",
      }}
    >
      {/* Encabezado */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#a3a3a3", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}>
          {label}
        </span>
        <span
          style={{
            color: tier.color,
            fontSize: "11px",
            fontFamily: "'DM Mono', monospace",
            background: tier.bg,
            padding: "2px 8px",
            borderRadius: "20px",
            border: `1px solid ${tier.color}44`,
          }}
        >
          {tier.label}
        </span>
      </div>

      {/* Porcentaje grande */}
      <div
        style={{
          fontSize: "36px",
          fontWeight: "700",
          fontFamily: "'DM Mono', monospace",
          color: tier.color,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {value.toFixed(1)}
        <span style={{ fontSize: "18px", color: "#6b7280", marginLeft: "2px" }}>%</span>
      </div>

      {/* Barra de progreso */}
      <div
        style={{
          height: "6px",
          background: "#1f1f1f",
          borderRadius: "99px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: animated ? `${value}%` : "0%",
            background: `linear-gradient(90deg, ${tier.color}88, ${tier.color})`,
            borderRadius: "99px",
            transition: `width 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${animDelay}ms`,
            boxShadow: `0 0 8px ${tier.color}66`,
          }}
        />
      </div>

      {/* Texto legible */}
      <p
        style={{
          margin: 0,
          color: "#6b7280",
          fontSize: "12px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
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
      <div style={panelWrapperStyle}>
        <SkeletonBar />
        <SkeletonBar />
      </div>
    );
  }

  const { damage_model, ripeness_model } = confidenceSummary;

  return (
    <>
      {/* Google Fonts — cargamos aquí para no tocar el index.html del proyecto */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap"
      />

      <section style={panelWrapperStyle}>
        {/* Título de sección */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <span style={{ fontSize: "18px" }}>🔬</span>
          <h3
            style={{
              margin: 0,
              color: "#e5e7eb",
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Nivel de Confianza del Análisis
          </h3>
        </div>

        <p
          style={{
            margin: "0 0 16px",
            color: "#6b7280",
            fontSize: "12px",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.5,
          }}
        >
          Porcentaje estadístico de certeza de cada modelo de IA utilizado en el análisis.
        </p>

        {/* Barras de los dos modelos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <ConfidenceBar modelKey="damage_model" data={damage_model} animDelay={0} />
          <ConfidenceBar modelKey="ripeness_model" data={ripeness_model} animDelay={150} />
        </div>

        {/* Nota técnica de transparencia */}
        <p
          style={{
            margin: "16px 0 0",
            color: "#4b5563",
            fontSize: "11px",
            fontFamily: "'DM Mono', monospace",
            borderTop: "1px solid #1f1f1f",
            paddingTop: "12px",
            lineHeight: 1.6,
          }}
        >
          ⓘ Los valores reflejan la certeza del modelo YOLOv8 entrenado sobre imágenes
          de aguacate Hass. Umbrales: ≥85% Alta · ≥65% Media · &lt;65% Baja.
        </p>
      </section>
    </>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const panelWrapperStyle = {
  background: "#0a0a0a",
  border: "1px solid #1f1f1f",
  borderRadius: "16px",
  padding: "20px",
  width: "100%",
  boxSizing: "border-box",
};

// ─── Skeleton mientras carga ──────────────────────────────────────────────────

function SkeletonBar() {
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #1f1f1f",
        borderRadius: "12px",
        padding: "18px 20px",
        height: "120px",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    >
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
