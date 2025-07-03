/**
 * index.js - Punto de entrada para todos los hooks personalizados
 * 
 * Archivo de barril que exporta todos los hooks del proyecto
 * para facilitar las importaciones y mantener un código más limpio.
 * 
 * @author Samuel Ospina
 * @version 2.0.0
 */

// Hooks de navegación suave con Lenis
export {
  useLenisScroll,
  useScrollNavigation,
  useScrollDirection,
  useParallax
} from './useLenisScroll.js';

// Hooks responsivos consolidados
export {
  useResponsive,
  useDeviceType,
  useResizeHandler
} from './useResponsive.js';

// Hooks específicos para Aurora
export {
  useInitialRender,
  useDOMReady,
  useVisibilityObserver,
  usePageVisibility,
  useAuroraInitialization,
  useAuroraConfig
} from './useAurora.js';

// Exports por defecto más comunes
export { default as useResponsive } from './useResponsive.js';
