# 📝 Mejores Prácticas de Desarrollo

Este documento contiene las mejores prácticas, estándares y convenciones para el desarrollo del portafolio.

## 📋 Tabla de Contenidos

- [Estándares de Código](#estándares-de-código)
- [Convenciones de Nomenclatura](#convenciones-de-nomenclatura)
- [Estructura de Componentes](#estructura-de-componentes)
- [Gestión de Estilos](#gestión-de-estilos)
- [Performance](#performance)
- [Accesibilidad](#accesibilidad)
- [SEO](#seo)

## 💻 Estándares de Código

### JavaScript/JSX

#### ✅ Buenas Prácticas
```javascript
// Usar const por defecto, let cuando sea necesario reasignar
const userName = "Samuel";
let currentPage = 1;

// Destructuring para props y estado
function NavBar({ isSpanish, toggleLanguage, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  // ...
}

// Arrow functions para componentes simples
const LoadingSpinner = () => (
  <div className="spinner" aria-label="Cargando contenido">
    <div className="spinner-circle"></div>
  </div>
);

// Function declarations para componentes complejos
function ComplexComponent({ data, onUpdate }) {
  // Lógica compleja aquí
  return <div>...</div>;
}
```

#### ❌ Prácticas a Evitar
```javascript
// No usar var
var oldWay = "avoid this";

// No mutar props directamente
function BadComponent({ items }) {
  items.push(newItem); // ❌ No hacer esto
  return <ul>...</ul>;
}

// No usar índices como keys en listas dinámicas
{items.map((item, index) => (
  <li key={index}>{item}</li> // ❌ Evitar
))}

// Mejor práctica
{items.map((item) => (
  <li key={item.id}>{item}</li> // ✅ Usar IDs únicos
))}
```

### Documentación con JSDoc

#### Componentes
```javascript
/**
 * Componente de navegación principal con soporte multiidioma
 * 
 * @component
 * @param {Object} props - Las propiedades del componente
 * @param {boolean} props.isSpanish - Determina si el contenido está en español
 * @param {Function} props.toggleLanguage - Función para cambiar el idioma
 * @param {string} [props.className=""] - Clases CSS adicionales
 * @returns {JSX.Element} Barra de navegación renderizada
 * 
 * @example
 * <NavBar 
 *   isSpanish={true}
 *   toggleLanguage={() => setLanguage(!language)}
 *   className="custom-nav"
 * />
 */
function NavBar({ isSpanish, toggleLanguage, className = "" }) {
  // Implementación
}
```

#### Funciones Utilitarias
```javascript
/**
 * Formatea una fecha según el idioma seleccionado
 * 
 * @param {Date} date - La fecha a formatear
 * @param {boolean} isSpanish - Si debe formatear en español
 * @returns {string} Fecha formateada
 * 
 * @example
 * formatDate(new Date(), true) // "25 de junio de 2025"
 * formatDate(new Date(), false) // "June 25, 2025"
 */
function formatDate(date, isSpanish) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const locale = isSpanish ? 'es-ES' : 'en-US';
  return date.toLocaleDateString(locale, options);
}
```

## 🏷️ Convenciones de Nomenclatura

### Archivos y Carpetas
```
✅ Correcto
components/
├── NavBar.jsx              // PascalCase para componentes
├── nav-bar.css             // kebab-case para estilos
├── user-profile/           // kebab-case para carpetas
│   ├── UserProfile.jsx
│   └── user-profile.css
└── utils/
    └── formatDate.js       // camelCase para utilities

❌ Incorrecto
components/
├── navbar.jsx              // minúsculas
├── NavBar.CSS              // mayúsculas en extensión
├── UserProfile/            // PascalCase en carpeta
└── format_date.js          // snake_case
```

### Variables y Funciones
```javascript
// ✅ Descriptivo y claro
const [isMenuVisible, setIsMenuVisible] = useState(false);
const [userPreferences, setUserPreferences] = useState({});
const [currentAnimationFrame, setCurrentAnimationFrame] = useState(null);

// ❌ Poco descriptivo
const [visible, setVisible] = useState(false);
const [prefs, setPrefs] = useState({});
const [frame, setFrame] = useState(null);

// ✅ Funciones descriptivas
const handleMenuToggle = () => setIsMenuVisible(!isMenuVisible);
const handleLanguageChange = (newLanguage) => setLanguage(newLanguage);
const calculateSkillPercentage = (skill) => (skill.level / 10) * 100;

// ❌ Funciones poco descriptivas
const toggle = () => setIsMenuVisible(!isMenuVisible);
const change = (lang) => setLanguage(lang);
const calc = (skill) => (skill.level / 10) * 100;
```

### Constantes
```javascript
// ✅ UPPER_SNAKE_CASE para constantes
const API_ENDPOINTS = {
  SKILLS: '/api/skills',
  PROJECTS: '/api/projects'
};

const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
};

const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200
};
```

## 🧩 Estructura de Componentes

### Orden de Elementos en Componentes
```javascript
function MyComponent({ prop1, prop2 }) {
  // 1. Hooks de estado
  const [localState, setLocalState] = useState();
  
  // 2. Hooks de efecto
  useEffect(() => {
    // Lógica de efecto
  }, []);
  
  // 3. Funciones auxiliares
  const handleClick = () => {
    // Lógica del evento
  };
  
  // 4. Variables computadas
  const computedValue = useMemo(() => {
    return prop1 + prop2;
  }, [prop1, prop2]);
  
  // 5. Early returns
  if (!prop1) {
    return <div>Loading...</div>;
  }
  
  // 6. Render principal
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Separación de Lógica y Presentación
```javascript
// ✅ Hook personalizado para lógica
function useSkillsData() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Lógica de carga de datos
  }, []);
  
  return { skills, loading, error };
}

// ✅ Componente enfocado en presentación
function SkillsList({ isSpanish }) {
  const { skills, loading, error } = useSkillsData();
  
  if (loading) return <SkillsLoader />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div className="skills-grid">
      {skills.map(skill => (
        <SkillCard 
          key={skill.id} 
          skill={skill} 
          isSpanish={isSpanish} 
        />
      ))}
    </div>
  );
}
```

## 🎨 Gestión de Estilos

### Organización CSS
```css
/* ==========================================================================
   Component: Navigation Bar
   Description: Main navigation component styles
   ========================================================================== */

.nav-bar {
  /* == Layout == */
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  
  /* == Spacing == */
  padding: var(--spacing-md) var(--spacing-lg);
  
  /* == Visual == */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  /* == Animation == */
  transition: all var(--transition-normal);
}

/* == States == */
.nav-bar:hover {
  background: rgba(255, 255, 255, 0.15);
}

.nav-bar--scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
}

/* == Responsive == */
@media (max-width: 768px) {
  .nav-bar {
    padding: var(--spacing-sm) var(--spacing-md);
  }
}
```

### Variables CSS Semánticas
```css
:root {
  /* == Colors == */
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-primary-light: #60a5fa;
  
  --color-secondary: #ef4444;
  --color-secondary-dark: #dc2626;
  --color-secondary-light: #f87171;
  
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* == Text Colors == */
  --text-primary: var(--color-gray-900);
  --text-secondary: var(--color-gray-600);
  --text-tertiary: var(--color-gray-500);
  --text-inverse: var(--color-white);
  
  /* == Background Colors == */
  --bg-primary: var(--color-white);
  --bg-secondary: var(--color-gray-50);
  --bg-tertiary: var(--color-gray-100);
  
  /* == Shadows == */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* == Border Radius == */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 1rem;
}
```

## ⚡ Performance

### Lazy Loading de Imágenes
```javascript
// ✅ Componente de imagen optimizada
function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  loading = "lazy",
  sizes = "100vw"
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  return (
    <div className={`image-container ${className}`}>
      {!isLoaded && !hasError && (
        <div className="image-placeholder">
          <div className="loading-skeleton" />
        </div>
      )}
      
      {hasError ? (
        <div className="image-error">
          <span>Error cargando imagen</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{ 
            display: isLoaded ? 'block' : 'none' 
          }}
        />
      )}
    </div>
  );
}
```

### Memoización Estratégica
```javascript
// ✅ Memoizar componentes costosos
const ExpensiveSkillChart = memo(function SkillChart({ skills, theme }) {
  const chartData = useMemo(() => {
    // Cálculo costoso de datos del gráfico
    return skills.map(skill => ({
      name: skill.name,
      value: skill.level,
      color: getSkillColor(skill.category)
    }));
  }, [skills]);
  
  return <Chart data={chartData} theme={theme} />;
});

// ✅ useCallback para funciones estables
function SkillsSection({ skills, onSkillClick }) {
  const handleSkillSelect = useCallback((skillId) => {
    const skill = skills.find(s => s.id === skillId);
    onSkillClick(skill);
  }, [skills, onSkillClick]);
  
  return (
    <div>
      {skills.map(skill => (
        <SkillCard
          key={skill.id}
          skill={skill}
          onClick={() => handleSkillSelect(skill.id)}
        />
      ))}
    </div>
  );
}
```

## ♿ Accesibilidad

### ARIA Labels y Roles
```javascript
// ✅ Navegación accesible
function NavBar({ isMenuOpen, toggleMenu }) {
  return (
    <nav role="navigation" aria-label="Navegación principal">
      <button
        aria-expanded={isMenuOpen}
        aria-controls="main-menu"
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={toggleMenu}
      >
        <MenuIcon />
      </button>
      
      <ul
        id="main-menu"
        role="menubar"
        aria-hidden={!isMenuOpen}
      >
        <li role="none">
          <a 
            href="#home" 
            role="menuitem"
            aria-current="page"
          >
            Inicio
          </a>
        </li>
      </ul>
    </nav>
  );
}
```

### Skip Links
```javascript
// ✅ Enlaces de salto para navegación por teclado
function SkipLinks() {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <a href="#navigation" className="skip-link">
        Saltar a la navegación
      </a>
    </div>
  );
}
```

### Focus Management
```javascript
// ✅ Gestión de foco en modales
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef();
  const previousFocusRef = useRef();
  
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);
  
  return isOpen ? (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      {children}
    </div>
  ) : null;
}
```

## 🔍 SEO

### Meta Tags Dinámicos
```javascript
// ✅ Hook para gestión de meta tags
function useMetaTags({ title, description, image, url }) {
  useEffect(() => {
    // Título de la página
    document.title = title;
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Open Graph tags
    const updateMetaProperty = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:image', image);
    updateMetaProperty('og:url', url);
    
  }, [title, description, image, url]);
}
```

### Estructura Semántica
```javascript
// ✅ HTML semántico
function HomePage() {
  return (
    <main role="main">
      <header>
        <h1>Samuel Ospina - Desarrollador Frontend</h1>
        <p>Especialista en React y tecnologías web modernas</p>
      </header>
      
      <section aria-labelledby="about-heading">
        <h2 id="about-heading">Acerca de mí</h2>
        <article>
          <p>Contenido sobre mí...</p>
        </article>
      </section>
      
      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading">Habilidades técnicas</h2>
        <ul role="list">
          <li>React</li>
          <li>JavaScript</li>
          <li>CSS</li>
        </ul>
      </section>
    </main>
  );
}
```

## 📱 Responsive Design

### Breakpoints Consistentes
```css
/* Mobile First Approach */
.component {
  /* Estilos base para móvil */
  padding: var(--spacing-sm);
  font-size: var(--font-size-sm);
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    padding: var(--spacing-md);
    font-size: var(--font-size-base);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    padding: var(--spacing-lg);
    font-size: var(--font-size-lg);
  }
}

/* Large Desktop */
@media (min-width: 1200px) {
  .component {
    padding: var(--spacing-xl);
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Testing de Responsive
```javascript
// ✅ Hook para detectar breakpoints
function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('mobile');
  
  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1200) setBreakpoint('xl');
      else if (width >= 1024) setBreakpoint('lg');
      else if (width >= 768) setBreakpoint('md');
      else setBreakpoint('sm');
    };
    
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);
  
  return breakpoint;
}
```

---

## 🔄 Checklist de Revisión de Código

Antes de hacer commit, verificar:

### ✅ Funcionalidad
- [ ] El componente funciona correctamente
- [ ] No hay errores en consola
- [ ] Maneja correctamente los edge cases
- [ ] Estados de loading y error implementados

### ✅ Performance
- [ ] Uso apropiado de memo/useMemo/useCallback
- [ ] Imágenes optimizadas
- [ ] No hay re-renders innecesarios

### ✅ Accesibilidad
- [ ] ARIA labels apropiados
- [ ] Navegable por teclado
- [ ] Contraste de colores adecuado
- [ ] Screen reader friendly

### ✅ Responsive
- [ ] Funciona en móvil, tablet y desktop
- [ ] Texto legible en todos los tamaños
- [ ] Interacciones apropiadas para touch

### ✅ Código
- [ ] Nombres descriptivos
- [ ] Comentarios donde sea necesario
- [ ] Estructura consistente
- [ ] ESLint sin errores

---

**Recuerda**: Estas prácticas evolucionan con el proyecto. ¡Mantén este documento actualizado!
