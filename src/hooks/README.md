# 🪝 Hooks Personalizados

Esta carpeta contiene todos los hooks personalizados del proyecto, organizados y consolidados para eliminar duplicaciones y mejorar la mantenibilidad.

## 📁 Estructura de Hooks

### `useLenisScroll.js` - Navegación Suave
Hook principal para gestionar Lenis Smooth Scrolling con múltiples funcionalidades:

- **`useLenisScroll()`**: Hook principal con opciones avanzadas
- **`useScrollNavigation()`**: Navegación simplificada a secciones
- **`useScrollDirection()`**: Detección de dirección del scroll
- **`useParallax()`**: Efectos de parallax basados en Lenis

```jsx
import { useLenisScroll, useScrollNavigation } from '../hooks';

// Hook completo con scroll spy
const { scrollToSection, currentSection, isScrolling } = useLenisScroll({
  enableScrollSpy: true,
  sections: ['home', 'about', 'skills', 'projects']
});

// Hook simplificado
const { goToHome, goToAbout, goToProjects } = useScrollNavigation();
```

### `useResponsive.js` - Diseño Responsivo Consolidado
Hook unificado que combina toda la funcionalidad responsiva previamente duplicada:

- **`useResponsive()`**: Hook principal con detección completa
- **`useDeviceType()`**: Versión simplificada solo para tipo de dispositivo
- **`useResizeHandler()`**: Manejador personalizado de resize con throttle

```jsx
import { useResponsive, useDeviceType } from '../hooks';

// Hook completo
const { 
  isMobile, 
  isTablet, 
  screenSize, 
  orientation,
  isSmallLandscape 
} = useResponsive({
  debounceMs: 150,
  enableOrientationDetection: true
});

// Hook simplificado
const { isMobile, isTablet } = useDeviceType();
```

### `useAurora.js` - Hooks Especializados para Aurora
Hooks específicos para el componente Aurora que requiere inicialización compleja:

- **`useInitialRender()`**: Asegura renderizado correcto al montar
- **`useDOMReady()`**: Detección de DOM completamente cargado
- **`useVisibilityObserver()`**: Intersection Observer para visibilidad
- **`usePageVisibility()`**: Page Visibility API
- **`useAuroraInitialization()`**: Inicialización completa con múltiples estrategias
- **`useAuroraConfig()`**: Configuración optimizada según dispositivo

```jsx
import { useAuroraInitialization, useAuroraConfig } from '../hooks';

const config = useAuroraConfig();
const { isInitialized, forceInitialization } = useAuroraInitialization({
  containerRef,
  onInitialize: initializeWebGL,
  onResize: handleResize,
  onVisibilityChange: handleVisibilityChange
});
```

## 🔧 Consolidación Realizada

### ✅ Funcionalidades Unificadas

#### **Detección Responsiva**
**Antes (Duplicado):**
- `useResponsive.js` - detección básica
- `auroraHooks.js` - `useResponsiveResize`
- `responsiveUtils.js` - `createThrottledResize`

**Ahora (Consolidado):**
- `useResponsive.js` - hook unificado con todas las funcionalidades
- `useResizeHandler()` - función personalizable
- Optimización con debounce inteligente

#### **Observadores de Visibilidad**
**Antes (Duplicado):**
- `auroraHooks.js` - `useVisibilityObserver`
- `responsiveUtils.js` - `setupVisibilityHandler`

**Ahora (Consolidado):**
- `useVisibilityObserver()` - Intersection Observer
- `usePageVisibility()` - Page Visibility API
- Configuración unificada y optimizada

### ❌ Archivos Eliminados
- `src/components/background/auroraHooks.js` ➡️ Movido a `src/hooks/useAurora.js`

### 🏗️ Mejoras Implementadas

1. **Centralización**: Todos los hooks en una carpeta dedicada
2. **Eliminación de Duplicaciones**: Funcionalidades consolidadas
3. **Mejor Performance**: Debounce optimizado y menos re-renders
4. **Exportaciones Centralizadas**: Archivo `index.js` para importaciones limpias
5. **Documentación Mejorada**: JSDoc completo en todos los hooks
6. **Configuración Flexible**: Opciones personalizables en cada hook

## 📚 Guía de Importación

### Importación Individual
```jsx
import { useLenisScroll } from '../hooks/useLenisScroll';
import { useResponsive } from '../hooks/useResponsive';
import { useAuroraConfig } from '../hooks/useAurora';
```

### Importación Centralizada (Recomendado)
```jsx
import { 
  useLenisScroll, 
  useResponsive, 
  useAuroraConfig 
} from '../hooks';
```

## 🚀 Beneficios de la Reorganización

- ✅ **Código más limpio**: Sin duplicaciones
- ✅ **Mejor rendimiento**: Optimizaciones consolidadas
- ✅ **Fácil mantenimiento**: Lógica centralizada
- ✅ **Reutilización mejorada**: Hooks más versátiles
- ✅ **Importaciones limpias**: Estructura organizada
- ✅ **Documentación consistente**: JSDoc estandarizado

---

*Esta reorganización mantiene toda la funcionalidad existente mientras elimina duplicaciones y mejora la estructura del código.*
