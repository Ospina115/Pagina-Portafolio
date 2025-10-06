# Guía de Estilo CSS - Mejores Prácticas

## 📋 Tabla de Contenidos
1. [Principios Generales](#principios-generales)
2. [Convenciones de Nombres](#convenciones-de-nombres)
3. [Organización de Archivos](#organización-de-archivos)
4. [Cómo Agregar Nuevos Estilos](#cómo-agregar-nuevos-estilos)
5. [Variables CSS Recomendadas](#variables-css-recomendadas)
6. [Ejemplos de Código](#ejemplos-de-código)

---

## Principios Generales

### 1. Mobile First
Siempre escribe los estilos base para dispositivos móviles y usa media queries para pantallas más grandes:

```css
/* ✅ CORRECTO - Mobile First */
.container {
    padding: 1rem;
}

@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
}

/* ❌ INCORRECTO - Desktop First */
.container {
    padding: 2rem;
}

@media (max-width: 767px) {
    .container {
        padding: 1rem;
    }
}
```

### 2. Especificidad Baja
Evita selectores demasiado específicos:

```css
/* ✅ CORRECTO */
.card-title {
    font-size: 1.5rem;
}

/* ❌ INCORRECTO */
div.container section.card div.header h2.card-title {
    font-size: 1.5rem;
}
```

### 3. Evitar !important
Solo usar en casos extremos:

```css
/* ✅ CORRECTO */
.button {
    background: blue;
}

.button--primary {
    background: green;
}

/* ❌ INCORRECTO */
.button {
    background: blue !important;
}
```

### 4. Usar Variables CSS
Centraliza valores repetidos:

```css
:root {
    --color-primary: #5227FF;
    --spacing-md: 1.5rem;
}

.button {
    background: var(--color-primary);
    padding: var(--spacing-md);
}
```

---

## Convenciones de Nombres

### BEM (Block Element Modifier)
Usa la metodología BEM para nombres de clases:

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier */
.card--featured { }
.card--large { }
```

### Nombres Descriptivos
```css
/* ✅ CORRECTO */
.navigation-menu { }
.product-card { }
.submit-button { }

/* ❌ INCORRECTO */
.nav { }
.pc { }
.btn { }
```

---

## Organización de Archivos

### Estructura de un Archivo CSS

```css
/**
 * component-name.css - Descripción del componente
 * 
 * Descripción detallada de lo que contiene este archivo
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */

/* =================================================================
   VARIABLES LOCALES (si aplica)
   ================================================================= */
.component {
    --local-color: #fff;
    --local-spacing: 1rem;
}

/* =================================================================
   ESTILOS BASE
   ================================================================= */
.component {
    /* Layout */
    display: flex;
    flex-direction: column;
    
    /* Box Model */
    padding: 1rem;
    margin: 0;
    
    /* Visual */
    background: #fff;
    border-radius: 8px;
    
    /* Typography */
    font-size: 1rem;
    
    /* Misc */
    transition: all 0.3s ease;
}

/* =================================================================
   ELEMENTOS HIJOS
   ================================================================= */
.component__header { }
.component__body { }
.component__footer { }

/* =================================================================
   MODIFICADORES
   ================================================================= */
.component--large { }
.component--featured { }

/* =================================================================
   ESTADOS
   ================================================================= */
.component:hover { }
.component:focus { }
.component:active { }
.component.is-active { }
.component.is-disabled { }

/* =================================================================
   MEDIA QUERIES
   ================================================================= */
@media (min-width: 768px) {
    .component {
        /* Tablet styles */
    }
}

@media (min-width: 1024px) {
    .component {
        /* Desktop styles */
    }
}

/* =================================================================
   ANIMACIONES
   ================================================================= */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

---

## Cómo Agregar Nuevos Estilos

### 1. Estilos de Componente Nuevo

Si estás creando un **nuevo componente** (ej: `Gallery.jsx`):

```
src/components/gallery/
├── Gallery.jsx
└── Gallery.css  ← Crear aquí
```

```css
/* Gallery.css */
/**
 * Gallery.css - Estilos para el componente Gallery
 * 
 * @author Tu Nombre
 */

.gallery {
    display: grid;
    gap: 1rem;
}
```

```jsx
// Gallery.jsx
import './Gallery.css';

export function Gallery() {
    return <div className="gallery">...</div>;
}
```

### 2. Animación Nueva

Si creas una **nueva animación** reutilizable:

1. Agrégala en `src/styles/animations/`
2. Nómbrala según su función: `card-animations.css`, `fade-animations.css`
3. Importa en `src/styles/index.css`

```css
/* src/styles/animations/card-animations.css */
@keyframes cardFlip {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(180deg); }
}

.card--animated {
    animation: cardFlip 0.6s ease;
}
```

```css
/* src/styles/index.css */
@import './animations/background-animations.css';
@import './animations/text-animations.css';
@import './animations/menu-animations.css';
@import './animations/card-animations.css'; /* ← Agregar aquí */
```

### 3. Variables Globales

Para agregar **variables CSS globales**:

```css
/* src/styles/base/variables.css - CREAR NUEVO */
:root {
    /* Colores */
    --color-primary: #5227FF;
    --color-secondary: #7B46FF;
    --color-accent: #9333EA;
    
    /* Espaciado */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    
    /* Tipografía */
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    
    /* Transiciones */
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
    
    /* Sombras */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    
    /* Border Radius */
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 1rem;
    --radius-full: 9999px;
}
```

Luego importar en `index.css`:

```css
/* src/styles/index.css */
@import './base/reset.css';
@import './base/variables.css'; /* ← Agregar aquí */
@import './base/background.css';
```

### 4. Tema Nuevo (ej: modo alto contraste)

Para agregar un **nuevo tema**:

```css
/* src/styles/themes/high-contrast.css */
@media (prefers-contrast: high) {
    :root {
        --color-background: #000;
        --color-text: #fff;
        --border-width: 2px;
    }
    
    .card {
        border: var(--border-width) solid var(--color-text);
    }
}
```

---

## Variables CSS Recomendadas

### Sistema de Diseño Completo

```css
:root {
    /* === COLORES === */
    
    /* Colores Primarios */
    --primary-50: #EEE9FF;
    --primary-100: #DDD3FF;
    --primary-200: #BBA7FF;
    --primary-300: #9977FF;
    --primary-400: #7B46FF;
    --primary-500: #5227FF; /* Principal */
    --primary-600: #4520CC;
    --primary-700: #3318A3;
    --primary-800: #22107A;
    --primary-900: #110852;
    
    /* Escala de Grises */
    --gray-50: #F9FAFB;
    --gray-100: #F3F4F6;
    --gray-200: #E5E7EB;
    --gray-300: #D1D5DB;
    --gray-400: #9CA3AF;
    --gray-500: #6B7280;
    --gray-600: #4B5563;
    --gray-700: #374151;
    --gray-800: #1F2937;
    --gray-900: #111827;
    
    /* === ESPACIADO === */
    --space-0: 0;
    --space-1: 0.25rem;  /* 4px */
    --space-2: 0.5rem;   /* 8px */
    --space-3: 0.75rem;  /* 12px */
    --space-4: 1rem;     /* 16px */
    --space-5: 1.25rem;  /* 20px */
    --space-6: 1.5rem;   /* 24px */
    --space-8: 2rem;     /* 32px */
    --space-10: 2.5rem;  /* 40px */
    --space-12: 3rem;    /* 48px */
    --space-16: 4rem;    /* 64px */
    --space-20: 5rem;    /* 80px */
    
    /* === TIPOGRAFÍA === */
    --font-sans: 'JetBrains Mono', monospace;
    --font-mono: 'JetBrains Mono', monospace;
    
    --text-xs: 0.75rem;   /* 12px */
    --text-sm: 0.875rem;  /* 14px */
    --text-base: 1rem;    /* 16px */
    --text-lg: 1.125rem;  /* 18px */
    --text-xl: 1.25rem;   /* 20px */
    --text-2xl: 1.5rem;   /* 24px */
    --text-3xl: 1.875rem; /* 30px */
    --text-4xl: 2.25rem;  /* 36px */
    --text-5xl: 3rem;     /* 48px */
    
    /* === ANIMACIONES === */
    --duration-fast: 150ms;
    --duration-normal: 300ms;
    --duration-slow: 500ms;
    
    --ease-linear: linear;
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    
    /* === BORDES === */
    --radius-none: 0;
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 1rem;
    --radius-xl: 1.5rem;
    --radius-2xl: 2rem;
    --radius-full: 9999px;
    
    /* === SOMBRAS === */
    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.075);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
    --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
    
    /* === Z-INDEX === */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
}
```

### Uso de Variables

```css
.button {
    padding: var(--space-4) var(--space-6);
    font-size: var(--text-base);
    background: var(--primary-500);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    transition: all var(--duration-normal) var(--ease-out);
}

.button:hover {
    background: var(--primary-600);
    box-shadow: var(--shadow-lg);
}
```

---

## Ejemplos de Código

### Componente con Glass Effect

```css
.glass-card {
    /* Layout */
    padding: var(--space-6);
    border-radius: var(--radius-xl);
    
    /* Glass Effect */
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.05) 100%
    );
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    
    /* Bordes y sombras */
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 
        0 8px 32px rgba(82, 39, 255, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    /* Transición */
    transition: all var(--duration-normal) var(--ease-out);
}

.glass-card:hover {
    box-shadow: 
        0 12px 40px rgba(82, 39, 255, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.3);
}
```

### Grid Responsivo

```css
.grid {
    display: grid;
    gap: var(--space-4);
    
    /* Mobile: 1 columna */
    grid-template-columns: 1fr;
}

@media (min-width: 640px) {
    .grid {
        /* Tablet: 2 columnas */
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-6);
    }
}

@media (min-width: 1024px) {
    .grid {
        /* Desktop: 3 columnas */
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-8);
    }
}
```

### Animación con Variables

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(var(--space-6));
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animated-element {
    animation: fadeInUp var(--duration-slow) var(--ease-out);
}
```

---

## 🎓 Recursos Adicionales

- [MDN CSS](https://developer.mozilla.org/es/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)
- [BEM Methodology](http://getbem.com/)
- [Can I Use](https://caniuse.com/)
- [CSS Variables Guide](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties)

---

**Mantén este documento actualizado cuando agregues nuevas convenciones o patrones.**
