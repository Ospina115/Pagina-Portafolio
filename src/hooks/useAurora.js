/**
 * useAurora.js - Hooks especializados para el componente Aurora
 * 
 * Contiene hooks específicos para manejar la inicialización y renderizado
 * del efecto Aurora con WebGL, consolidando la funcionalidad previamente
 * distribuida en múltiples archivos.
 * 
 * @author Samuel Ospina
 * @version 2.0.0
 */

import { useEffect, useRef } from 'react';
import { useResponsive } from './useResponsive.js';

/**
 * Hook que asegura que el componente se renderice correctamente al montarse
 * @param {Function} forceUpdate - Función para forzar actualización
 * @param {Array} dependencies - Dependencias para re-ejecutar el efecto
 */
export const useInitialRender = (forceUpdate, dependencies = []) => {
  const mountedRef = useRef(false);
  const timeoutRefs = useRef([]);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      
      // Múltiples intentos de renderizado con diferentes delays
      const delays = [0, 16, 50, 100, 200];
      
      delays.forEach((delay, index) => {
        const timeout = setTimeout(() => {
          forceUpdate?.();
        }, delay);
        
        timeoutRefs.current.push(timeout);
      });
    }

    return () => {
      // Limpia todos los timeouts al desmontar
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, dependencies);

  return mountedRef.current;
};

/**
 * Hook para detectar cuando el DOM está completamente cargado
 * @param {Function} callback - Función a ejecutar cuando esté listo
 */
export const useDOMReady = (callback) => {
  useEffect(() => {
    if (document.readyState === 'complete') {
      callback?.();
    } else {
      const handleLoad = () => callback?.();
      window.addEventListener('load', handleLoad);
      
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [callback]);
};

/**
 * Hook para detectar la visibilidad del elemento usando Intersection Observer
 * @param {RefObject} elementRef - Referencia al elemento a observar
 * @param {Function} onVisible - Callback cuando el elemento es visible
 * @param {Function} onHidden - Callback cuando el elemento está oculto
 * @param {Object} options - Opciones del Intersection Observer
 */
export const useVisibilityObserver = (elementRef, onVisible, onHidden, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '10px',
    ...options
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !IntersectionObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onVisible?.();
          } else {
            onHidden?.();
          }
        });
      },
      defaultOptions
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [elementRef, onVisible, onHidden]);
};

/**
 * Hook para manejar la visibilidad de la página (Page Visibility API)
 * @param {Function} onVisible - Callback cuando la página es visible
 * @param {Function} onHidden - Callback cuando la página está oculta
 */
export const usePageVisibility = (onVisible, onHidden) => {
  useEffect(() => {
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
  }, [onVisible, onHidden]);
};

/**
 * Hook que combina múltiples estrategias para asegurar el renderizado inicial de Aurora
 * @param {Object} options - Opciones de configuración
 */
export const useAuroraInitialization = ({
  containerRef,
  onInitialize,
  onResize,
  onVisibilityChange
}) => {
  const isInitialized = useRef(false);
  const forceUpdateCount = useRef(0);
  const { screenSize } = useResponsive();

  // Función para forzar inicialización
  const forceInitialization = () => {
    if (forceUpdateCount.current < 10) { // Límite de intentos
      forceUpdateCount.current++;
      onInitialize?.();
    }
  };

  // Hook para renderizado inicial
  useInitialRender(forceInitialization);

  // Hook para DOM listo
  useDOMReady(forceInitialization);

  // Manejar cambios de tamaño usando el hook responsivo unificado
  useEffect(() => {
    onResize?.(screenSize);
  }, [screenSize, onResize]);

  // Hook para visibilidad del elemento
  useVisibilityObserver(
    containerRef,
    () => {
      if (!isInitialized.current) {
        isInitialized.current = true;
        forceInitialization();
      }
      onVisibilityChange?.(true);
    },
    () => onVisibilityChange?.(false)
  );

  // Hook para visibilidad de la página
  usePageVisibility(
    () => onVisibilityChange?.(true),
    () => onVisibilityChange?.(false)
  );

  // Efecto adicional con MutationObserver para detectar cambios en el DOM
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !MutationObserver) return;

    const observer = new MutationObserver(() => {
      if (!isInitialized.current) {
        forceInitialization();
      }
    });

    observer.observe(container, {
      attributes: true,
      childList: true,
      subtree: false
    });

    return () => observer.disconnect();
  }, [containerRef]);

  return {
    isInitialized: isInitialized.current,
    forceInitialization
  };
};

/**
 * Hook para optimizar la configuración de Aurora según el dispositivo
 */
export const useAuroraConfig = () => {
  const { 
    isMobile, 
    isTablet, 
    screenSize, 
    deviceType 
  } = useResponsive();

  // Detecta las características y capacidades del dispositivo actual
  const deviceCapabilities = {
    // Detección básica del dispositivo
    userAgent: navigator.userAgent || navigator.vendor || window.opera,
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
    isAndroid: /Android/.test(navigator.userAgent),
    
    // Detección de características del navegador
    hasWebGL: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch (e) {
        return false;
      }
    })(),
    
    // Detección de rendimiento del hardware
    hardwareConcurrency: navigator.hardwareConcurrency || 4,
    deviceMemory: navigator.deviceMemory || 4,
    isLowEndDevice: (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2,
    
    // Detección de preferencias del usuario
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches,
    prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    
    // Información de la pantalla
    devicePixelRatio: window.devicePixelRatio || 1
  };

  // Determina el factor de calidad basado en las capacidades
  let qualityFactor = 1.0;
  
  if (isMobile) qualityFactor *= 0.6;
  else if (isTablet) qualityFactor *= 0.8;
  
  if (deviceCapabilities.isLowEndDevice) qualityFactor *= 0.7;
  if (deviceCapabilities.devicePixelRatio > 2) qualityFactor *= 0.9;
  if (deviceCapabilities.prefersReducedMotion) qualityFactor *= 0.4;

  // Configuración optimizada para Aurora
  const config = {
    // Información del dispositivo
    ...deviceCapabilities,
    isMobile,
    isTablet,
    deviceType,
    screenSize,
    
    // Configuración optimizada
    qualityFactor: Math.max(0.2, Math.min(1.0, qualityFactor)),
    maxFPS: isMobile ? 30 : deviceCapabilities.isLowEndDevice ? 45 : 60,
    enableAntialiasing: !isMobile && !deviceCapabilities.isLowEndDevice,
    enableHighQuality: !isMobile && !deviceCapabilities.isLowEndDevice && deviceCapabilities.hardwareConcurrency > 4,
    
    // Ajustes específicos del shader
    noiseScale: isMobile ? 1.2 : isTablet ? 1.5 : 2.0,
    animationSpeed: deviceCapabilities.prefersReducedMotion ? 0.2 : isMobile ? 0.7 : 1.0,
    blendFactor: deviceCapabilities.prefersHighContrast ? 0.3 : isMobile ? 0.6 : 0.5,
    
    // Configuración de resolución
    pixelRatioLimit: isMobile ? 2 : isTablet ? 2.5 : 3,
    resolutionScale: qualityFactor
  };

  return config;
};
