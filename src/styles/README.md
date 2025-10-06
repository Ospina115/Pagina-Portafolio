# Estructura de Estilos del Proyecto

Esta carpeta contiene todos los estilos CSS del proyecto, organizados de manera modular y mantenible.

## 📁 Estructura de Carpetas

```
styles/
├── base/              # Estilos base y configuración inicial
│   ├── reset.css      # Reset CSS y configuración global
│   └── background.css # Estilos para elementos de fondo
│
├── themes/            # Temas de color (claro/oscuro)
│   ├── light.css      # Tema claro
│   └── dark.css       # Tema oscuro
│
├── animations/        # Animaciones reutilizables
│   ├── background-animations.css  # Animaciones de fondo (estrellas)
│   ├── text-animations.css        # Animaciones de texto
│   └── menu-animations.css        # Animaciones de menú y navegación
│
├── components/        # Estilos de componentes (mantenidos en src/components)
│   └── (Los archivos CSS permanecen junto a sus componentes JSX)
│
└── index.css          # Punto de entrada principal
```

## 🎯 Filosofía de Organización

### 1. **Base** (`base/`)
Contiene los estilos fundamentales del proyecto:
- **reset.css**: Reset CSS, configuración de fuentes, variables globales
- **background.css**: Estilos para elementos decorativos de fondo

### 2. **Themes** (`themes/`)
Maneja los temas de color usando `prefers-color-scheme`:
- **light.css**: Colores y estilos para tema claro
- **dark.css**: Colores y estilos para tema oscuro

### 3. **Animations** (`animations/`)
Animaciones reutilizables organizadas por función:
- **background-animations.css**: Rotación de estrellas y efectos de fondo
- **text-animations.css**: Animaciones tipográficas (typing effects, etc.)
- **menu-animations.css**: Animaciones de menú móvil, dock y navegación

### 4. **Components** (en `src/components/`)
Los estilos de componentes permanecen junto a sus archivos JSX para mantener la cohesión:
```
src/components/
├── about/
│   ├── About.jsx
│   └── about.css
├── home/
│   ├── Home.jsx
│   └── home.css
└── ...
```

## 📝 Guía de Uso

### Importación Principal
El archivo `index.css` es el punto de entrada que importa todos los estilos base:

```jsx
// En main.jsx o App.jsx
import './styles/index.css';
```

### Estilos de Componentes
Los componentes importan sus propios estilos localmente:

```jsx
// En src/components/home/Home.jsx
import './home.css';
```

## 🔧 Convenciones

### Nombres de Archivos
- Usar kebab-case para archivos de utilidades: `background-animations.css`
- Usar PascalCase para componentes específicos: `ProjectCard.css`

### Organización de CSS
1. **Comentarios de sección**: Usar comentarios descriptivos
2. **Mobile First**: Estilos base para móvil, luego media queries
3. **Especificidad baja**: Evitar !important y selectores muy específicos

### Media Queries
Breakpoints estándar:
```css
/* Mobile: por defecto */
@media (min-width: 481px) { /* Tablets pequeñas */ }
@media (min-width: 769px) { /* Tablets y laptops */ }
@media (min-width: 1025px) { /* Laptops grandes */ }
@media (min-width: 1441px) { /* Pantallas grandes */ }
```

## 🎨 Variables CSS (Futuro)
Se recomienda migrar a variables CSS para mejor mantenibilidad:

```css
:root {
  /* Colores primarios */
  --color-primary: #5227FF;
  --color-secondary: #7B46FF;
  
  /* Espaciado */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  
  /* Animaciones */
  --transition-fast: 0.2s;
  --transition-normal: 0.3s;
  --transition-slow: 0.5s;
}
```

## 🚀 Mejoras Futuras

1. **Variables CSS**: Centralizar colores, espaciados y transiciones
2. **Mixins/Utilities**: Crear clases utilitarias reutilizables
3. **CSS Modules**: Considerar CSS Modules para mejor encapsulación
4. **PostCSS**: Añadir autoprefixer y optimizaciones
5. **Sass/SCSS**: Para mejor organización con nesting y mixins

## 📚 Recursos

- [MDN - CSS](https://developer.mozilla.org/es/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/)

---

**Autor**: Samuel Ospina  
**Versión**: 2.0.0  
**Última actualización**: Octubre 2025
