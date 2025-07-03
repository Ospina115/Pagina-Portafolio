/**
 * Hook personalizado para manejar la inicialización del componente Aurora
 * Soluciona problemas de renderizado inicial asegurando que el canvas
 * se renderice correctamente desde el primer frame.
 */

import { useEffect, useRef } from 'react';

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
 * Hook para manejar el redimensionamiento con mejor precisión
 * @param {Function} onResize - Función a ejecutar en resize
 * @param {number} delay - Delay para throttling (default: 100ms)
 */
export const useResponsiveResize = (onResize, delay = 100) => {
  const timeoutRef = useRef();
  const lastSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        const newSize = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        
        // Solo ejecuta si realmente cambió el tamaño
        if (
          newSize.width !== lastSizeRef.current.width ||
          newSize.height !== lastSizeRef.current.height
        ) {
          lastSizeRef.current = newSize;
          onResize?.(newSize);
        }
      }, delay);
    };

    // Ejecuta inmediatamente
    handleResize();

    // Listeners para diferentes eventos de cambio de tamaño
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Para dispositivos con soporte para visualViewport
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, [onResize, delay]);
};

/**
 * Hook para detectar la visibilidad del elemento
 * @param {RefObject} elementRef - Referencia al elemento a observar
 * @param {Function} onVisible - Callback cuando el elemento es visible
 * @param {Function} onHidden - Callback cuando el elemento está oculto
 */
export const useVisibilityObserver = (elementRef, onVisible, onHidden) => {
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
      {
        threshold: 0.1,
        rootMargin: '10px'
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [elementRef, onVisible, onHidden]);
};

/**
 * Hook que combina múltiples estrategias para asegurar el renderizado inicial
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

  // Hook para resize responsivo
  useResponsiveResize(onResize);

  // Hook para visibilidad
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
