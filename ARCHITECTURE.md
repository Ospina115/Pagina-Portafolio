# 🏗️ Arquitectura del Proyecto

Esta documentación explica la arquitectura, patrones de diseño y decisiones técnicas del portafolio.

## 📋 Tabla de Contenidos

- [Visión General](#visión-general)
- [Arquitectura de Componentes](#arquitectura-de-componentes)
- [Gestión del Estado](#gestión-del-estado)
- [Patrones de Diseño](#patrones-de-diseño)
- [Optimizaciones de Rendimiento](#optimizaciones-de-rendimiento)
- [Estructura de Estilos](#estructura-de-estilos)
- [Internacionalización](#internacionalización)

## 🔍 Visión General

### Tecnologías Core
- **React 18.3.1**: UI library con Hooks API
- **Vite 5.4.8**: Build tool y dev server
- **Lenis**: Smooth scrolling
- **Framer Motion**: Animaciones
- **GSAP**: Animaciones avanzadas

### Principios Arquitectónicos
1. **Component-Based Architecture**: Todo es un componente reutilizable
2. **Separation of Concerns**: Cada componente tiene una responsabilidad específica
3. **Performance First**: Optimizaciones desde el diseño
4. **Accessibility**: Diseño inclusivo desde el principio

## 🧩 Arquitectura de Componentes

### Jerarquía de Componentes
```
App (Root Component)
├── NavBar (Navigation)
├── Home (Landing Section)
├── About (Personal Information)
├── Skills (Technical Abilities)
├── Projects (Portfolio Items)
├── Review (Testimonials)
└── Footer (Contact Information)
```

### Tipos de Componentes

#### 1. Layout Components
```javascript
// Componentes que definen la estructura general
- NavBar: Navegación principal
- Footer: Información de contacto
- Layout: Wrapper general (si existe)
```

#### 2. Feature Components
```javascript
// Componentes con funcionalidad específica
- Home: Sección de bienvenida con hero
- About: Información personal y profesional
- Skills: Visualización de habilidades técnicas
- Projects: Galería de proyectos
- Review: Sistema de testimonios
```

#### 3. UI Components
```javascript
// Componentes reutilizables de interfaz
- Loading: Pantalla de carga
- SkillIcon: Icono individual de habilidad
- ReviewCard: Tarjeta de testimonio
- ScrollReveal: Animaciones de scroll
```

### Composición de Componentes

#### Patrón Container/Presenter
```javascript
// Container (lógica)
function SkillsContainer({ isSpanish }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lógica de negocio aquí

  return (
    <SkillsPresenter 
      skills={skills} 
      loading={loading} 
      isSpanish={isSpanish} 
    />
  );
}

// Presenter (UI)
function SkillsPresenter({ skills, loading, isSpanish }) {
  if (loading) return <Loading />;
  
  return (
    <div className="skills-grid">
      {skills.map(skill => (
        <SkillIcon key={skill.id} {...skill} />
      ))}
    </div>
  );
}
```

## 🔄 Gestión del Estado

### Estado Local (useState)
```javascript
// Estado simple del componente
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [currentTheme, setCurrentTheme] = useState('light');
const [isSpanish, setIsSpanish] = useState(true);
```

### Prop Drilling Pattern
```javascript
// Estado se pasa desde App hacia componentes hijos
App (isSpanish, toggleLanguage)
├── NavBar (isSpanish, toggleLanguage)
├── Home (isSpanish)
├── About (isSpanish)
└── Skills (isSpanish)
```

### Custom Hooks (Potencial Mejora)
```javascript
// Hook personalizado para manejo de idioma
function useLanguage() {
  const [isSpanish, setIsSpanish] = useState(true);
  
  const toggleLanguage = useCallback(() => {
    setIsSpanish(prev => !prev);
    localStorage.setItem('language', !isSpanish ? 'es' : 'en');
  }, [isSpanish]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setIsSpanish(savedLanguage === 'es');
    }
  }, []);

  return { isSpanish, toggleLanguage };
}
```

## 🎨 Patrones de Diseño

### 1. Higher-Order Component (HOC)
```javascript
// HOC para animaciones de scroll
function withScrollReveal(WrappedComponent) {
  return function ScrollRevealWrapper(props) {
    const ref = useRef();
    
    useEffect(() => {
      // Lógica de scroll reveal
      const observer = new IntersectionObserver(/* ... */);
      if (ref.current) observer.observe(ref.current);
      
      return () => observer.disconnect();
    }, []);

    return (
      <div ref={ref}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}
```

### 2. Render Props Pattern
```javascript
// Componente que maneja lógica de animación
function AnimationProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  
  return children({ isVisible, setIsVisible });
}

// Uso del patrón
<AnimationProvider>
  {({ isVisible }) => (
    <div className={isVisible ? 'animate-in' : 'animate-out'}>
      Content
    </div>
  )}
</AnimationProvider>
```

### 3. Compound Components
```javascript
// Componente compuesto para navegación
function Navigation({ children }) {
  return <nav className="navigation">{children}</nav>;
}

Navigation.Brand = function Brand({ children }) {
  return <div className="nav-brand">{children}</div>;
};

Navigation.Menu = function Menu({ children }) {
  return <ul className="nav-menu">{children}</ul>;
};

Navigation.Item = function Item({ children, href }) {
  return <li><a href={href}>{children}</a></li>;
};

// Uso
<Navigation>
  <Navigation.Brand>Portfolio</Navigation.Brand>
  <Navigation.Menu>
    <Navigation.Item href="#home">Home</Navigation.Item>
    <Navigation.Item href="#about">About</Navigation.Item>
  </Navigation.Menu>
</Navigation>
```

## ⚡ Optimizaciones de Rendimiento

### 1. Lazy Loading
```javascript
// Carga diferida de componentes
const Projects = lazy(() => import('./components/projects/Projects'));
const Review = lazy(() => import('./components/review/Review'));

// Implementación en App
<Suspense fallback={<Loading />}>
  <Projects isSpanish={isSpanish} />
  <Review isSpanish={isSpanish} />
</Suspense>
```

### 2. Memoización
```javascript
// React.memo para componentes puros
const SkillIcon = memo(function SkillIcon({ icon, name, level }) {
  return (
    <div className="skill-icon">
      <img src={icon} alt={name} />
      <span>{name}</span>
      <div className="skill-level" data-level={level} />
    </div>
  );
});

// useMemo para cálculos costosos
const expensiveValue = useMemo(() => {
  return skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length;
}, [skills]);

// useCallback para funciones estables
const handleSkillClick = useCallback((skillId) => {
  setSelectedSkill(skills.find(s => s.id === skillId));
}, [skills]);
```

### 3. Image Optimization
```javascript
// Componente para imágenes optimizadas
function OptimizedImage({ src, alt, className, loading = "lazy" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`image-container ${className}`}>
      {!isLoaded && <div className="image-placeholder">Loading...</div>}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
    </div>
  );
}
```

## 🎨 Estructura de Estilos

### Arquitectura CSS
```
styles/
├── style.css          # Estilos base y reset
├── temaclaro.css      # Variables y estilos tema claro
├── temaoscuro.css     # Variables y estilos tema oscuro
└── prueba.css         # Estilos experimentales/temporales
```

### Sistema de Design Tokens
```css
/* temaclaro.css */
:root {
  /* Colores */
  --primary-color: #3b82f6;
  --secondary-color: #ef4444;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --background-primary: #ffffff;
  --background-secondary: #f9fafb;
  
  /* Tipografía */
  --font-family-primary: 'Inter', sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Espaciado */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Animaciones */
  --transition-fast: 0.15s ease-in-out;
  --transition-normal: 0.3s ease-in-out;
  --transition-slow: 0.5s ease-in-out;
}
```

### Metodología CSS
```css
/* BEM (Block Element Modifier) */
.navigation-bar {} /* Block */
.navigation-bar__item {} /* Element */
.navigation-bar__item--active {} /* Modifier */

/* Utility Classes */
.flex { display: flex; }
.justify-center { justify-content: center; }
.text-center { text-align: center; }
.mb-4 { margin-bottom: var(--spacing-lg); }

/* Component-specific styles */
.skill-icon {
  /* Base styles */
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* Interactive states */
  &:hover {
    transform: translateY(-2px);
    transition: var(--transition-normal);
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    scale: 0.9;
  }
}
```

## 🌐 Internacionalización

### Estructura de Contenido
```javascript
// Contenido bilingüe en cada componente
const content = {
  es: {
    title: "Bienvenido a mi portafolio",
    subtitle: "Desarrollador Frontend especializado en React",
    cta: "Ver mis proyectos"
  },
  en: {
    title: "Welcome to my portfolio",
    subtitle: "Frontend Developer specialized in React",
    cta: "View my projects"
  }
};

// Uso en componente
function Home({ isSpanish }) {
  const t = content[isSpanish ? 'es' : 'en'];
  
  return (
    <section>
      <h1>{t.title}</h1>
      <p>{t.subtitle}</p>
      <button>{t.cta}</button>
    </section>
  );
}
```

### Hook de Internacionalización (Futuro)
```javascript
// Hook personalizado para i18n
function useTranslation() {
  const [language, setLanguage] = useState('es');
  
  const t = useCallback((key) => {
    return translations[language][key] || key;
  }, [language]);
  
  const changeLanguage = useCallback((newLang) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  }, []);
  
  return { t, language, changeLanguage };
}
```

## 🔄 Flujo de Datos

### Unidirectional Data Flow
```
User Interaction → Event Handler → State Update → Component Re-render → UI Update
```

### Ejemplo de Flujo
```javascript
// 1. User clicks language toggle
<button onClick={toggleLanguage}>
  {isSpanish ? 'EN' : 'ES'}
</button>

// 2. Event handler updates state
const toggleLanguage = () => {
  setIsSpanish(prev => !prev); // State update
};

// 3. State change triggers re-render
// 4. All components receive new isSpanish prop
// 5. UI updates with new language content
```

## 🚀 Estrategias de Deploy

### Build Optimization
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion', 'gsap', 'lenis']
        }
      }
    }
  }
});
```

### Performance Monitoring
```javascript
// Performance metrics
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart);
  });
}
```

## 🔮 Próximas Mejoras

### Arquitectura
1. **State Management**: Implementar Context API o Zustand
2. **Component Library**: Crear biblioteca de componentes reutilizables
3. **Testing**: Añadir tests unitarios y de integración
4. **TypeScript**: Migración gradual para mayor type safety

### Performance
1. **Service Worker**: Implementar caching estratégico
2. **Image Optimization**: WebP, lazy loading avanzado
3. **Bundle Splitting**: Code splitting más granular
4. **Preloading**: Precargar recursos críticos

### UX/UI
1. **Micro-interactions**: Animaciones más refinadas
2. **Accessibility**: Mejoras en ARIA labels y navegación por teclado
3. **Dark Mode**: Sistema de temas más robusto
4. **PWA**: Convertir en Progressive Web App

---

Esta documentación debe actualizarse conforme el proyecto evoluciona. ¡Las contribuciones y sugerencias son bienvenidas!
