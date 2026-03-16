"""
Servicio de Cálculo de Precios para Aguacate Hass
Valle del Cauca, Colombia - Marzo 2026

Precios de referencia:
- Centroabastos: $6.000 - $6.500 COP/kg
- Exportación Premium: $8.000 - $9.000 COP/kg  
- Procesamiento Industrial: $4.000 - $5.000 COP/kg
"""

from typing import Dict, Any
from datetime import datetime


class PriceCalculator:
    """
    Calculadora de precios para aguacate Hass basada en:
    - Calidad detectada por IA (manchas/roña)
    - Estado de madurez
    - Destino del mercado
    """
    
    # PRECIOS BASE POR DESTINO (COP por kilogramo)
    PRICES = {
        "exportacion_premium": 8500,      # Calidad A1 para exportación
        "exportacion_standard": 7500,     # Calidad A2 para exportación
        "mercado_local_premium": 6500,    # Centroabastos precio alto
        "mercado_local_standard": 6000,   # Centroabastos precio base
        "supermercado": 7000,             # Cadenas de supermercados
        "industrial": 4500,               # Procesamiento (guacamole, aceite)
        "descarte": 3000,                 # Mínimo absoluto
    }
    
    # DESCUENTOS POR MANCHAS/ROÑA (COP por kilogramo)
    QUALITY_DISCOUNTS = {
        0: 0,           # Ninguna mancha: sin descuento
        1: 300,         # 1 mancha leve
        2: 600,         # 2 manchas
        3: 1000,        # 3 manchas
        4: 1500,        # 4 manchas
        5: 2000,        # 5+ manchas: descuento máximo
    }
    
    # AJUSTES POR MADUREZ (COP por kilogramo)
    RIPENESS_ADJUSTMENTS = {
        "Underripe": -400,      # Verde: descuento (necesita tiempo)
        "Ripening": +200,       # Pintón: premio pequeño (versátil)
        "Ripe": +500,           # Maduro: premio máximo (listo para consumo)
        "Overripe": -800,       # Pasado: descuento fuerte
        "Unknown": 0,           # No detectado: neutro
    }
    
    @staticmethod
    def calculate(analysis_results: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calcula el precio sugerido basándose en los resultados del análisis de IA
        
        Args:
            analysis_results: Diccionario con los resultados del análisis:
                - health_status: "Healthy" o "Diseased"
                - spots_found: cantidad de manchas detectadas (int)
                - ripeness_level: "Underripe", "Ripening", "Ripe", "Overripe", "Unknown"
                - ripeness_conf: confianza del modelo (0-100)
        
        Returns:
            Diccionario con el precio calculado y su desglose
        """
        
        # 1. DETERMINAR DESTINO DEL MERCADO
        health_status = analysis_results.get("health_status", "Unknown")
        spots_found = analysis_results.get("spots_found", 0)
        ripeness_level = analysis_results.get("ripeness_level", "Unknown")
        ripeness_conf = analysis_results.get("ripeness_conf", 0)
        
        # Lógica de clasificación de mercado
        if health_status == "Healthy" and spots_found == 0:
            if ripeness_level == "Ripe" and ripeness_conf >= 85:
                destination = "Exportación Premium"
                base_price = PriceCalculator.PRICES["exportacion_premium"]
            elif ripeness_level in ["Ripening", "Ripe"]:
                destination = "Exportación Standard"
                base_price = PriceCalculator.PRICES["exportacion_standard"]
            else:
                destination = "Mercado Local Premium"
                base_price = PriceCalculator.PRICES["mercado_local_premium"]
        
        elif health_status == "Healthy" and spots_found <= 2:
            destination = "Mercado Local"
            base_price = PriceCalculator.PRICES["mercado_local_standard"]
        
        elif spots_found <= 4:
            destination = "Supermercado (Categoría B)"
            base_price = PriceCalculator.PRICES["mercado_local_standard"]
        
        else:
            destination = "Procesamiento Industrial"
            base_price = PriceCalculator.PRICES["industrial"]
        
        # 2. CALCULAR DESCUENTO POR CALIDAD
        # Limitar a máximo 5 manchas para el descuento
        spots_capped = min(spots_found, 5)
        quality_discount = PriceCalculator.QUALITY_DISCOUNTS[spots_capped]
        
        # 3. CALCULAR AJUSTE POR MADUREZ
        ripeness_adjustment = PriceCalculator.RIPENESS_ADJUSTMENTS.get(
            ripeness_level, 
            0
        )
        
        # 4. CÁLCULO FINAL
        suggested_price = base_price - quality_discount + ripeness_adjustment
        
        # Aplicar precio mínimo (no puede bajar de $3.000)
        suggested_price = max(suggested_price, PriceCalculator.PRICES["descarte"])
        
        # 5. REDONDEAR A MÚLTIPLOS DE 50 (más comercial)
        suggested_price = round(suggested_price / 50) * 50
        
        # 6. GENERAR RECOMENDACIÓN EN TEXTO
        recommendation = PriceCalculator._generate_recommendation(
            destination, 
            health_status, 
            ripeness_level,
            spots_found
        )
        
        return {
            "suggested_price": suggested_price,
            "base_price": base_price,
            "quality_discount": quality_discount,
            "ripeness_adjustment": ripeness_adjustment,
            "market_destination": destination,
            "recommendation": recommendation,
            "calculation_details": {
                "health_quality": "Sano" if health_status == "Healthy" else "Con defectos",
                "spots_detected": spots_found,
                "maturity_state": ripeness_level,
                "confidence": ripeness_conf,
            }
        }
    
    @staticmethod
    def _generate_recommendation(
        destination: str, 
        health_status: str, 
        ripeness_level: str,
        spots_found: int
    ) -> str:
        """
        Genera una recomendación en lenguaje natural para el agricultor
        """
        recommendations = {
            "Exportación Premium": (
                "¡Qué aguacate tan chimba! Este es de exportación premium. "
                "Llévelo altiro a las comercializadoras internacionales pa' sacarle "
                "el mejor precio."
            ),
            "Exportación Standard": (
                "Este aguacate es calidad de exportación. Búsquese un buen comprador "
                "o llévelo a centroabastos que lo van a pagar bien."
            ),
            "Mercado Local Premium": (
                "Este aguacate está buenísimo pa' venderlo en centroabastos o "
                "supermercados del Valle. Va a tener buena salida."
            ),
            "Mercado Local": (
                "Este aguacate es perfecto pa' la plaza de mercado local. "
                "Precio justo y se vende rapidito."
            ),
            "Supermercado (Categoría B)": (
                "Este aguacate sirve pa' supermercados locales o tiendas de barrio. "
                "No es primera calidad pero igual tiene mercado."
            ),
            "Procesamiento Industrial": (
                "Este aguacate tiene manchitas pero no se preocupe. Es perfecto "
                "pa' hacer guacamole o aceite. Las procesadoras lo compran."
            ),
        }
        
        return recommendations.get(
            destination,
            "Consulte con su comercializadora de confianza pa' este lote."
        )
    
    @staticmethod
    def get_market_prices_info() -> Dict[str, Any]:
        """
        Devuelve información general de precios del mercado
        Útil para mostrar referencias en la app
        """
        return {
            "fecha_actualizacion": "2026-03-15",
            "region": "Valle del Cauca, Colombia",
            "precios_referencia": {
                "centroabastos_promedio": "$6.000 - $6.500 COP/kg",
                "exportacion": "$8.000 - $9.000 COP/kg",
                "industrial": "$4.000 - $5.000 COP/kg",
            },
            "fuente": "Centroabastos Cali y comercializadoras locales"
        }