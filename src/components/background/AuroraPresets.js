/**
 * Aurora Presets Configuration
 * 
 * Configuraciones predefinidas para el componente Aurora
 * que se adaptan a diferentes ambientes y estilos del portafolio.
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

/**
 * Preset por defecto del portafolio
 * Colores vibrantes que complementan el diseño principal
 */
export const DEFAULT_PRESET = {
  colorStops: ["#3A29FF", "#FF94B4", "#FF3232"],
  blend: 0.6,
  amplitude: 1.2,
  speed: 0.3
};

/**
 * Preset para ambiente profesional
 * Colores más sobrios y elegantes
 */
export const PROFESSIONAL_PRESET = {
  colorStops: ["#2c3e50", "#3498db", "#9b59b6"],
  blend: 0.6,
  amplitude: 1.0,
  speed: 0.3
};

/**
 * Preset para ambiente relajante
 * Colores suaves y movimiento tranquilo
 */
export const RELAXED_PRESET = {
  colorStops: ["#667eea", "#764ba2", "#f093fb"],
  blend: 0.8,
  amplitude: 0.8,
  speed: 0.2
};

/**
 * Preset para ambiente energético
 * Colores vibrantes y movimiento dinámico
 */
export const ENERGETIC_PRESET = {
  colorStops: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  blend: 0.4,
  amplitude: 1.5,
  speed: 0.8
};

/**
 * Preset para modo nocturno
 * Colores oscuros y azules profundos
 */
export const NIGHT_PRESET = {
  colorStops: ["#1a237e", "#3f51b5", "#7986cb"],
  blend: 0.7,
  amplitude: 1.1,
  speed: 0.25
};

/**
 * Preset para modo sunset
 * Colores cálidos de atardecer
 */
export const SUNSET_PRESET = {
  colorStops: ["#ff7043", "#ff5722", "#e91e63"],
  blend: 0.6,
  amplitude: 1.0,
  speed: 0.4
};

/**
 * Preset para modo minimalista
 * Efectos sutiles y discretos
 */
export const MINIMAL_PRESET = {
  colorStops: ["#e0e0e0", "#bdbdbd", "#9e9e9e"],
  blend: 0.9,
  amplitude: 0.6,
  speed: 0.15
};

/**
 * Preset optimizado para dispositivos móviles
 * Configuración con mejor rendimiento
 */
export const MOBILE_OPTIMIZED_PRESET = {
  colorStops: ["#3A29FF", "#FF94B4", "#FF3232"],
  blend: 0.7,
  amplitude: 0.8,
  speed: 0.2
};

/**
 * Mapa de todos los presets disponibles
 * Facilita la selección dinámica de configuraciones
 */
export const AURORA_PRESETS = {
  default: DEFAULT_PRESET,
  professional: PROFESSIONAL_PRESET,
  relaxed: RELAXED_PRESET,
  energetic: ENERGETIC_PRESET,
  night: NIGHT_PRESET,
  sunset: SUNSET_PRESET,
  minimal: MINIMAL_PRESET,
  mobile: MOBILE_OPTIMIZED_PRESET
};

/**
 * Hook personalizado para seleccionar preset basado en condiciones
 * @param {string} theme - Tema actual ('light' o 'dark')
 * @param {boolean} isMobile - Si es dispositivo móvil
 * @param {string} section - Sección actual del portafolio
 * @returns {Object} Configuración del preset seleccionado
 */
export function useAuroraPreset(theme = 'light', isMobile = false, section = 'home') {
  if (isMobile) {
    return AURORA_PRESETS.mobile;
  }
  
  if (theme === 'dark') {
    return AURORA_PRESETS.night;
  }
  
  // Selección basada en la sección actual
  switch (section) {
    case 'home':
      return AURORA_PRESETS.default;
    case 'about':
      return AURORA_PRESETS.professional;
    case 'skills':
      return AURORA_PRESETS.energetic;
    case 'projects':
      return AURORA_PRESETS.sunset;
    default:
      return AURORA_PRESETS.default;
  }
}

/**
 * Función para interpolar entre dos presets
 * Útil para transiciones suaves entre configuraciones
 * 
 * @param {Object} preset1 - Primer preset
 * @param {Object} preset2 - Segundo preset
 * @param {number} factor - Factor de interpolación (0-1)
 * @returns {Object} Preset interpolado
 */
export function interpolatePresets(preset1, preset2, factor) {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  factor = clamp(factor, 0, 1);
  
  return {
    colorStops: preset1.colorStops, // Los colores no se interpolan por simplicidad
    blend: preset1.blend + (preset2.blend - preset1.blend) * factor,
    amplitude: preset1.amplitude + (preset2.amplitude - preset1.amplitude) * factor,
    speed: preset1.speed + (preset2.speed - preset1.speed) * factor
  };
}
