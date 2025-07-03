/**
 * useResponsive.js - Hook personalizado para detección responsiva
 * 
 * Hook consolidado que detecta el tamaño de pantalla, tipo de dispositivo
 * y proporciona utilidades para una experiencia responsiva mejorada.
 * Unifica funcionalidades previamente duplicadas en múltiples archivos.
 * 
 * @author Samuel Ospina
 * @version 2.0.0
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Breakpoints definidos para diferentes tamaños de pantalla
 */
const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1440
};

/**
 * Hook personalizado para detección responsiva avanzada
 * @param {Object} options - Opciones de configuración
 * @param {number} options.debounceMs - Tiempo de debounce para resize (default: 150ms)
 * @param {boolean} options.enableOrientationDetection - Detectar cambios de orientación
 * @returns {Object} Información completa sobre el dispositivo y viewport
 */
export const useResponsive = (options = {}) => {
  const {
    debounceMs = 150,
    enableOrientationDetection = true
  } = options;

  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const [deviceType, setDeviceType] = useState('desktop');
  const [orientation, setOrientation] = useState('portrait');

  /**
   * Función optimizada para actualizar el tamaño de pantalla
   */
  const updateScreenSize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setScreenSize({ width, height });
    
    // Determinar el tipo de dispositivo basado en el ancho
    if (width <= BREAKPOINTS.mobile) {
      setDeviceType('mobile');
    } else if (width <= BREAKPOINTS.tablet) {
      setDeviceType('tablet');
    } else if (width <= BREAKPOINTS.laptop) {
      setDeviceType('laptop');
    } else {
      setDeviceType('desktop');
    }

    // Detectar orientación
    if (enableOrientationDetection) {
      setOrientation(width > height ? 'landscape' : 'portrait');
    }
  }, [enableOrientationDetection]);

  /**
   * Hook para manejar resize con debounce optimizado
   */
  useEffect(() => {
    // Ejecutar al montar el componente
    updateScreenSize();

    // Crear función con debounce optimizado
    let timeoutId;
    let lastSize = { width: 0, height: 0 };

    const debouncedResize = () => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const newSize = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        
        // Solo ejecuta si realmente cambió el tamaño (optimización)
        if (
          newSize.width !== lastSize.width ||
          newSize.height !== lastSize.height
        ) {
          lastSize = newSize;
          updateScreenSize();
        }
      }, debounceMs);
    };

    // Múltiples eventos para mejor compatibilidad
    window.addEventListener('resize', debouncedResize);
    
    if (enableOrientationDetection) {
      window.addEventListener('orientationchange', debouncedResize);
      
      // Para dispositivos que soportan Screen Orientation API
      if (screen?.orientation) {
        screen.orientation.addEventListener('change', debouncedResize);
      }
      
      // Para dispositivos con Visual Viewport API
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', debouncedResize);
      }
    }
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize);
      
      if (enableOrientationDetection) {
        window.removeEventListener('orientationchange', debouncedResize);
        
        if (screen?.orientation) {
          screen.orientation.removeEventListener('change', debouncedResize);
        }
        
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', debouncedResize);
        }
      }
    };
  }, [updateScreenSize, debounceMs, enableOrientationDetection]);

  // Funciones de utilidad para tipos de dispositivo
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isLaptop = deviceType === 'laptop';
  const isDesktop = deviceType === 'desktop';
  
  // Combinaciones útiles
  const isMobileOrTablet = isMobile || isTablet;
  const isTabletOrLaptop = isTablet || isLaptop;
  const isLaptopOrDesktop = isLaptop || isDesktop;
  
  // Orientación
  const isLandscape = orientation === 'landscape';
  const isPortrait = orientation === 'portrait';
  
  // Detección de pantalla pequeña en landscape (útil para móviles)
  const isSmallLandscape = isLandscape && screenSize.height <= 500;

  // Información adicional del dispositivo
  const aspectRatio = screenSize.width / screenSize.height;
  const devicePixelRatio = window.devicePixelRatio || 1;

  return {
    // Información básica
    screenSize,
    deviceType,
    orientation,
    
    // Tipos de dispositivo
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    
    // Combinaciones
    isMobileOrTablet,
    isTabletOrLaptop,
    isLaptopOrDesktop,
    
    // Orientación
    isLandscape,
    isPortrait,
    isSmallLandscape,
    
    // Información adicional
    aspectRatio,
    devicePixelRatio,
    
    // Breakpoints para uso directo
    breakpoints: BREAKPOINTS,
    
    // Función para forzar actualización
    updateScreenSize
  };
};

/**
 * Hook simplificado solo para detección de dispositivo móvil/tablet
 * @returns {Object} Información básica de dispositivo
 */
export const useDeviceType = () => {
  const { isMobile, isTablet, isMobileOrTablet, deviceType } = useResponsive({
    debounceMs: 100,
    enableOrientationDetection: false
  });

  return {
    isMobile,
    isTablet,
    isMobileOrTablet,
    deviceType
  };
};

/**
 * Hook para crear un resize handler personalizado con throttle
 * @param {Function} callback - Función a ejecutar en resize
 * @param {number} delay - Delay en milisegundos (default: 100ms)
 */
export const useResizeHandler = (callback, delay = 100) => {
  useEffect(() => {
    if (!callback) return;

    let timeout;
    let lastTime = 0;
    
    const throttledCallback = function() {
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

    window.addEventListener('resize', throttledCallback);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', throttledCallback);
    };
  }, [callback, delay]);
};

export default useResponsive;
