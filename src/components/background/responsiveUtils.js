/**
 * Utilidades responsivas para el componente Aurora
 * 
 * Funciones helper para detectar capacidades del dispositivo
 * y ajustar la configuración del efecto Aurora automáticamente.
 */

/**
 * Detecta las características y capacidades del dispositivo actual
 * @returns {Object} Objeto con información del dispositivo y configuraciones optimizadas
 */
export const getDeviceCapabilities = () => {
  // Detección básica del dispositivo
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android/i.test(userAgent) && window.innerWidth > 768;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  
  // Detección de características del navegador
  const hasWebGL = (() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  })();
  
  // Detección de rendimiento del hardware
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = navigator.deviceMemory || 4; // GB estimados
  const isLowEndDevice = hardwareConcurrency <= 2 || deviceMemory <= 2;
  
  // Detección de preferencias del usuario
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Información de la pantalla
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const devicePixelRatio = window.devicePixelRatio || 1;
  
  // Determina el factor de calidad basado en las capacidades
  let qualityFactor = 1.0;
  
  if (isMobile) qualityFactor *= 0.6;
  else if (isTablet) qualityFactor *= 0.8;
  
  if (isLowEndDevice) qualityFactor *= 0.7;
  if (devicePixelRatio > 2) qualityFactor *= 0.9;
  if (prefersReducedMotion) qualityFactor *= 0.4;
  
  // Determina la configuración óptima
  const config = {
    // Información del dispositivo
    isMobile,
    isTablet,
    isIOS,
    isAndroid,
    isLowEndDevice,
    hasWebGL,
    
    // Características de la pantalla
    screenWidth,
    screenHeight,
    viewportWidth,
    viewportHeight,
    devicePixelRatio,
    aspectRatio: viewportWidth / viewportHeight,
    
    // Preferencias del usuario
    prefersReducedMotion,
    prefersHighContrast,
    prefersDarkMode,
    
    // Hardware
    hardwareConcurrency,
    deviceMemory,
    
    // Configuración optimizada
    qualityFactor: Math.max(0.2, Math.min(1.0, qualityFactor)),
    maxFPS: isMobile ? 30 : isLowEndDevice ? 45 : 60,
    enableAntialiasing: !isMobile && !isLowEndDevice,
    enableHighQuality: !isMobile && !isLowEndDevice && hardwareConcurrency > 4,
    
    // Ajustes específicos del shader
    noiseScale: isMobile ? 1.2 : isTablet ? 1.5 : 2.0,
    animationSpeed: prefersReducedMotion ? 0.2 : isMobile ? 0.7 : 1.0,
    blendFactor: prefersHighContrast ? 0.3 : isMobile ? 0.6 : 0.5,
    
    // Configuración de resolución
    pixelRatioLimit: isMobile ? 2 : isTablet ? 2.5 : 3,
    resolutionScale: qualityFactor
  };
  
  return config;
};

/**
 * Crea un throttled resize handler para mejor rendimiento
 * @param {Function} callback Función a ejecutar cuando cambie el tamaño
 * @param {number} delay Delay en milisegundos (default: 100)
 * @returns {Function} Función throttled
 */
export const createThrottledResize = (callback, delay = 100) => {
  let timeout;
  let lastTime = 0;
  
  return function() {
    const currentTime = Date.now();
    
    clearTimeout(timeout);
    
    if (currentTime - lastTime > delay) {
      callback.apply(this, arguments);
      lastTime = currentTime;
    } else {
      timeout = setTimeout(() => {
        callback.apply(this, arguments);
        lastTime = Date.now();
      }, delay);
    }
  };
};

/**
 * Detecta cambios de orientación con mejor precisión
 * @param {Function} callback Función a ejecutar cuando cambie la orientación
 * @returns {Function} Función de cleanup
 */
export const setupOrientationHandler = (callback) => {
  let currentOrientation = window.screen?.orientation?.angle ?? 0;
  
  const handleOrientationChange = () => {
    const newOrientation = window.screen?.orientation?.angle ?? 0;
    
    if (newOrientation !== currentOrientation) {
      currentOrientation = newOrientation;
      
      // Delay para que la orientación se complete
      setTimeout(() => {
        callback();
      }, 150);
    }
  };
  
  // Múltiples eventos para mejor compatibilidad
  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener('resize', handleOrientationChange);
  
  // Para dispositivos que soportan Screen Orientation API
  if (screen?.orientation) {
    screen.orientation.addEventListener('change', handleOrientationChange);
  }
  
  return () => {
    window.removeEventListener('orientationchange', handleOrientationChange);
    window.removeEventListener('resize', handleOrientationChange);
    
    if (screen?.orientation) {
      screen.orientation.removeEventListener('change', handleOrientationChange);
    }
  };
};

/**
 * Optimiza la configuración de WebGL basada en el dispositivo
 * @param {Object} deviceConfig Configuración del dispositivo
 * @returns {Object} Configuración optimizada de WebGL
 */
export const getOptimalWebGLConfig = (deviceConfig) => {
  const {
    isMobile,
    isLowEndDevice,
    enableAntialiasing,
    enableHighQuality,
    devicePixelRatio
  } = deviceConfig;
  
  return {
    alpha: true,
    premultipliedAlpha: true,
    antialias: enableAntialiasing,
    powerPreference: isMobile || isLowEndDevice ? 'low-power' : 'high-performance',
    preserveDrawingBuffer: false,
    depth: false,
    stencil: false,
    failIfMajorPerformanceCaveat: false,
    desynchronized: enableHighQuality
  };
};

/**
 * Calcula el pixel ratio óptimo para el renderizado
 * @param {Object} deviceConfig Configuración del dispositivo
 * @returns {number} Pixel ratio optimizado
 */
export const getOptimalPixelRatio = (deviceConfig) => {
  const { devicePixelRatio, pixelRatioLimit, resolutionScale } = deviceConfig;
  
  const baseRatio = Math.min(devicePixelRatio, pixelRatioLimit);
  return Math.max(1, baseRatio * resolutionScale);
};

/**
 * Ajusta los parámetros del shader según el dispositivo
 * @param {Object} baseParams Parámetros base del shader
 * @param {Object} deviceConfig Configuración del dispositivo
 * @returns {Object} Parámetros optimizados
 */
export const optimizeShaderParams = (baseParams, deviceConfig) => {
  const {
    qualityFactor,
    animationSpeed,
    blendFactor,
    noiseScale,
    prefersReducedMotion
  } = deviceConfig;
  
  return {
    amplitude: baseParams.amplitude * qualityFactor,
    speed: prefersReducedMotion ? 
      baseParams.speed * 0.3 : 
      baseParams.speed * animationSpeed,
    blend: Math.max(0.1, Math.min(1.0, baseParams.blend * blendFactor)),
    noiseScale: noiseScale,
    qualityMultiplier: qualityFactor
  };
};

/**
 * Maneja la visibilidad de la página para pausar/reanudar animaciones
 * @param {Function} onVisible Callback cuando la página es visible
 * @param {Function} onHidden Callback cuando la página está oculta
 * @returns {Function} Función de cleanup
 */
export const setupVisibilityHandler = (onVisible, onHidden) => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      onVisible?.();
    } else {
      onHidden?.();
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};
