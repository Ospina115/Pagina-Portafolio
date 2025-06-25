# 🚀 Lenis Smooth Scrolling - Guía de Implementación

Esta guía explica cómo está implementado Lenis en el portafolio y cómo utilizarlo efectivamente.

## 📋 Tabla de Contenidos

- [Configuración Básica](#configuración-básica)
- [Hooks Personalizados](#hooks-personalizados)
- [Navegación con Scroll Suave](#navegación-con-scroll-suave)
- [Indicadores de Scroll](#indicadores-de-scroll)
- [Optimizaciones](#optimizaciones)
- [Troubleshooting](#troubleshooting)

## ⚙️ Configuración Básica

### ReactLenis Wrapper

```jsx
import { ReactLenis } from "lenis/react";

<ReactLenis 
  root 
  options={{
    lerp: 0.1,              // Suavidad (0.02 - 0.2)
    duration: 1.2,          // Duración de animaciones
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',   // Dirección del scroll
    gestureDirection: 'vertical',
    smooth: true,           // Activar smooth scroll
    mouseMultiplier: 1,     // Sensibilidad del mouse
    smoothTouch: false,     // Desactivar en touch para mejor rendimiento
    touchMultiplier: 2,     // Sensibilidad en dispositivos táctiles
    infinite: false,        // Scroll infinito desactivado
  }}
>
  {/* Tu contenido aquí */}
</ReactLenis>
```

### Parámetros Importantes

| Parámetro | Descripción | Valores Recomendados |
|-----------|-------------|---------------------|
| `lerp` | Suavidad del scroll | 0.1 (normal), 0.05 (muy suave), 0.2 (rápido) |
| `duration` | Duración de animaciones programáticas | 1.0 - 1.5 segundos |
| `smoothTouch` | Scroll suave en dispositivos táctiles | `false` (mejor rendimiento) |
| `mouseMultiplier` | Sensibilidad del scroll con mouse | 1.0 - 1.5 |

## 🎣 Hooks Personalizados

### useLenisScroll

Hook principal para controlar Lenis:

```jsx
import { useLenisScroll } from '../hooks/useLenisScroll';

function MyComponent() {
  const { 
    scrollToSection, 
    scrollToTop, 
    getScrollInfo,
    lenis 
  } = useLenisScroll({
    enableScrollSpy: true,
    sections: ['home', 'about', 'skills', 'projects', 'contact']
  });

  // Navegar a una sección
  const goToAbout = () => {
    scrollToSection('about', {
      offset: -80,    // Compensar navbar
      duration: 1.2,  // Duración personalizada
      easing: (t) => 1 - Math.pow(1 - t, 3)
    });
  };

  return (
    <button onClick={goToAbout}>
      Ir a About
    </button>
  );
}
```

### useScrollNavigation

Hook simplificado para navegación básica:

```jsx
import { useScrollNavigation } from '../hooks/useLenisScroll';

function NavButton() {
  const { goToHome, goToAbout, goToSkills } = useScrollNavigation();

  return (
    <div>
      <button onClick={goToHome}>Home</button>
      <button onClick={goToAbout}>About</button>
      <button onClick={goToSkills}>Skills</button>
    </div>
  );
}
```

### useScrollDirection

Hook para detectar dirección del scroll:

```jsx
import { useScrollDirection } from '../hooks/useLenisScroll';

function ScrollDetector() {
  useScrollDirection(({ direction, velocity, isScrollingDown }) => {
    console.log(`Scrolling ${direction} with velocity ${velocity}`);
    
    if (isScrollingDown) {
      // Ocultar navbar al bajar
      setNavbarVisible(false);
    } else {
      // Mostrar navbar al subir
      setNavbarVisible(true);
    }
  });

  return <div>Content</div>;
}
```

## 🧭 Navegación con Scroll Suave

### Configuración en NavBar

```jsx
import { useLenisScroll } from '../../hooks/useLenisScroll';

export function NavBar() {
  const { scrollToSection } = useLenisScroll();

  const menuItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Acerca' },
    { id: 'skills', label: 'Habilidades' }
  ];

  return (
    <nav>
      {menuItems.map(item => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id, {
            offset: -80,    // Altura del navbar
            duration: 1.2,  // Duración suave
            easing: (t) => 1 - Math.pow(1 - t, 3)
          })}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
```

### IDs de Secciones

Asegúrate de que cada sección tenga el ID correcto:

```jsx
// ✅ Correcto
<section id="home">Contenido Home</section>
<section id="about">Contenido About</section>
<section id="skills">Contenido Skills</section>

// ❌ Incorrecto
<div id="inicio">Contenido Home</div>  // ID no coincide
<section>Contenido sin ID</section>     // Falta ID
```

## 📊 Indicadores de Scroll

### ScrollIndicator Component

```jsx
import { ScrollIndicator } from './components/navigation/ScrollIndicator';

function App() {
  return (
    <>
      <ScrollIndicator isSpanish={isSpanish} />
      {/* Resto del contenido */}
    </>
  );
}
```

### Características del ScrollIndicator

- **Barra de progreso**: Muestra el progreso del scroll
- **Navegación por puntos**: Acceso rápido a secciones
- **Sección actual**: Indica dónde está el usuario
- **Responsive**: Se adapta a dispositivos móviles

## 🔧 Optimizaciones

### Performance en Móviles

```jsx
// Configuración optimizada para móviles
const mobileOptions = {
  lerp: 0.15,          // Más rápido en móvil
  smoothTouch: false,   // Mejor rendimiento
  touchMultiplier: 1.5, // Sensibilidad ajustada
};

// Configuración para desktop
const desktopOptions = {
  lerp: 0.1,
  smoothTouch: true,
  mouseMultiplier: 1,
};

const isMobile = window.innerWidth <= 768;
const options = isMobile ? mobileOptions : desktopOptions;
```

### Scroll Spy Optimizado

```jsx
// Usar throttling para mejor rendimiento
import { throttle } from 'lodash';

const throttledScrollHandler = throttle((scrollInfo) => {
  updateCurrentSection(scrollInfo);
}, 16); // 60fps

lenis.on('scroll', throttledScrollHandler);
```

### Preload de Secciones

```jsx
// Precargar secciones al hacer hover en navegación
const preloadSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    // Preparar animaciones o contenido
    element.style.willChange = 'transform';
  }
};
```

## 🎨 Animaciones Personalizadas

### Parallax con Lenis

```jsx
import { useParallax } from '../hooks/useLenisScroll';

function ParallaxElement() {
  const ref = useRef();
  
  useParallax(ref, {
    speed: 0.5,        // Velocidad del parallax
    direction: 'vertical'
  });

  return (
    <div ref={ref} className="parallax-element">
      Contenido con parallax
    </div>
  );
}
```

### Animaciones de Entrada

```jsx
// Animar elementos cuando entran en viewport
function AnimatedSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`animated-section ${isVisible ? 'visible' : ''}`}
    >
      Contenido animado
    </section>
  );
}
```

## 🐛 Troubleshooting

### Problemas Comunes

#### 1. El scroll no es suave
```jsx
// Verificar que ReactLenis esté envolviendo el contenido
// y que smooth esté habilitado
<ReactLenis root options={{ smooth: true }}>
  {content}
</ReactLenis>
```

#### 2. Navegación no funciona
```jsx
// Verificar IDs de secciones
console.log(document.getElementById('home')); // Debe existir

// Verificar que lenis esté disponible
const { lenis } = useLenisScroll();
console.log(lenis); // No debe ser null
```

#### 3. Performance lenta en móviles
```jsx
// Usar configuración optimizada para móviles
const options = {
  smoothTouch: false,  // Importante para móviles
  lerp: 0.15,         // Más rápido
  touchMultiplier: 1.5
};
```

#### 4. Conflictos con otras librerías
```jsx
// Asegurar que Lenis se inicialice después de otros scripts
useEffect(() => {
  // Inicializar Lenis después de que todo esté listo
  const timer = setTimeout(() => {
    // Lógica de inicialización
  }, 100);
  
  return () => clearTimeout(timer);
}, []);
```

### Debug Mode

```jsx
// Activar logs de debug
const options = {
  // ... otras opciones
  onScroll: (e) => console.log('Scroll:', e),
  onStart: () => console.log('Scroll started'),
  onStop: () => console.log('Scroll stopped')
};
```

## 📱 Responsive Considerations

### Diferentes configuraciones por dispositivo

```jsx
function useResponsiveLenis() {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const updateOptions = () => {
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth <= 1024;

      if (isMobile) {
        setOptions({
          lerp: 0.15,
          smoothTouch: false,
          touchMultiplier: 1.5
        });
      } else if (isTablet) {
        setOptions({
          lerp: 0.12,
          smoothTouch: true,
          touchMultiplier: 2
        });
      } else {
        setOptions({
          lerp: 0.1,
          smoothTouch: true,
          mouseMultiplier: 1
        });
      }
    };

    updateOptions();
    window.addEventListener('resize', updateOptions);
    return () => window.removeEventListener('resize', updateOptions);
  }, []);

  return options;
}
```

## 🚀 Mejores Prácticas

1. **Siempre usar offset**: Compensar altura del navbar fijo
2. **Duración apropiada**: 1.0-1.5s para navegación entre secciones
3. **Easing suave**: Usar funciones cúbicas para transiciones naturales
4. **Optimizar para móviles**: Desactivar smoothTouch en dispositivos táctiles
5. **Cleanup adecuado**: Remover event listeners en componentWillUnmount
6. **Testing**: Probar en diferentes dispositivos y navegadores

## 📚 Recursos Adicionales

- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [React Lenis Docs](https://github.com/studio-freight/lenis/tree/main/packages/react)
- [Easing Functions](https://easings.net/)
- [Performance Tips](https://web.dev/optimize-lcp/)
