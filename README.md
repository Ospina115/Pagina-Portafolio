# 🌟 Portafolio Samuel Ospina

![Vista previa del portafolio](preview.png)

Un portafolio web moderno y responsivo desarrollado con React y Vite, que presenta información personal, habilidades y proyectos de manera interactiva con efectos visuales avanzados y una experiencia de usuario optimizada.

[![Netlify Status](https://api.netlify.com/api/v1/badges/f5fb3284-1822-462d-8bbd-48611eacadff/deploy-status)](https://app.netlify.com/sites/portafoliosamuel115/deploys)

## 📋 Tabla de Contenidos

- [🚧 Tecnologías](#-tecnologías)
- [🚀 Instalación](#-instalación)
- [💻 Scripts Disponibles](#-scripts-disponibles)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🎨 Características Principales](#-características-principales)
- [� Diseño Responsivo](#-diseño-responsivo)
- [� Sección de Proyectos](#-sección-de-proyectos)
- [🌐 Despliegue](#-despliegue)
- [🤝 Contribución](#-contribución)

---

## 🚧 Tecnologías

### Frontend Core
- **React 18.3.1**: Biblioteca para construir interfaces de usuario
- **Vite 5.4.8**: Herramienta de construcción y servidor de desarrollo rápido
- **JavaScript ES2022**: Lenguaje de programación principal

### Animaciones y UX
- **Lenis 1.1.14**: Smooth scrolling avanzado y navegación fluida
- **Framer Motion 12.14.0**: Animaciones fluidas y transiciones elegantes
- **GSAP 3.13.0**: Animaciones avanzadas y efectos visuales

### Efectos Visuales y UI
- **OGL 1.0.11**: Renderizado WebGL para efectos de aurora boreal
- **gl-matrix 3.4.3**: Matemáticas optimizadas para WebGL
- **Devicon 2.16.0**: Iconos de tecnologías profesionales

### Herramientas de Desarrollo
- **ESLint 9.11.1**: Linter para calidad de código
- **PropTypes 15.8.1**: Validación de tipos en componentes

---

## 🚀 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm 9+

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Ospina115/Pagina-Portafolio.git
cd Pagina-Portafolio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

---

## 💻 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Construye la aplicación optimizada para producción |
| `npm run preview` | Vista previa de la build de producción |
| `npm run lint` | Ejecuta ESLint para análisis de código |

---

## 📁 Estructura del Proyecto

```
Pagina-Portafolio/
├── public/                     # Archivos estáticos
│   └── favicon.ico
├── src/
│   ├── components/            # Componentes React modulares
│   │   ├── about/            # Sección "Acerca de"
│   │   ├── background/       # Efectos Aurora con WebGL
│   │   ├── contact/          # Formulario de contacto
│   │   ├── home/            # Página principal/landing
│   │   ├── loading/         # Pantalla de carga animada
│   │   ├── navbar/          # Navegación responsiva con dock
│   │   ├── navigation/      # Indicadores de scroll
│   │   ├── projects/        # Galería circular de proyectos
│   │   ├── review/          # Testimonios y recomendaciones
│   │   └── skills/          # Habilidades técnicas con iconos
│   ├── hooks/               # Custom hooks reutilizables
│   │   ├── index.js         # Exportaciones centralizadas de hooks
│   │   ├── useLenisScroll.js # Hook para navegación suave y scroll
│   │   ├── useResponsive.js  # Hook unificado para diseño responsivo
│   │   └── useAurora.js     # Hooks especializados para efectos Aurora
│   ├── assets/              # Recursos estáticos organizados
│   │   └── images/          # Imágenes, iconos y devicons
│   ├── styles/              # Estilos CSS globales
│   │   ├── style.css        # Estilos base del proyecto
│   │   ├── temaclaro.css    # Variables para tema claro
│   │   └── temaoscuro.css   # Variables para tema oscuro
│   ├── App.jsx              # Componente raíz de la aplicación
│   └── main.jsx             # Punto de entrada principal
├── eslint.config.js         # Configuración de ESLint
├── vite.config.js          # Configuración de Vite
└── package.json            # Dependencias y scripts npm
```

---

## 🎨 Características Principales

### ✨ Experiencia Visual Avanzada
- **Aurora Boreal Interactiva**: Fondo animado con WebGL y shaders personalizados
- **Smooth Scrolling**: Navegación fluida entre secciones usando Lenis
- **Animaciones Fluidas**: Transiciones elegantes con Framer Motion y GSAP
- **Temas Dinámicos**: Modo claro/oscuro con transiciones suaves

### 🌐 Navegación y UX
- **Dock Animado**: Barra de navegación tipo macOS con efectos de magnificación
- **Multiidioma**: Soporte completo para español e inglés
- **Navegación Intuitiva**: Scroll suave entre secciones con offsets optimizados
- **Indicadores Visuales**: Indicador de progreso de scroll

### 🎭 Secciones Interactivas
- **Home**: Presentación con efectos tipográficos y llamada a la acción
- **About**: Información personal con animaciones de reveal
- **Skills**: Grid infinito de tecnologías con iconos de Devicon
- **Projects**: Galería circular con navegación manual (Ver sección dedicada)
- **Reviews**: Testimonios con efectos de transición
- **Contact**: Información de contacto organizada

---

## 📱 Diseño Responsivo

### 🔧 Sistema Responsivo Inteligente
- **Hook Personalizado**: `useResponsive` para detección precisa de dispositivos
- **Breakpoints Optimizados**: Móvil (480px), Tablet (768px), Laptop (1024px), Desktop (1440px+)
- **Orientación Adaptativa**: Manejo especial para landscape en móviles

### 📋 Navegación Adaptativa
| Dispositivo | Navegación | Características |
|-------------|------------|-----------------|
| **Desktop/Laptop** | Dock animado | Efecto magnificación, iconos 32px |
| **Tablet** | Dock reducido | Tamaños optimizados para touch |
| **Móvil Portrait** | Menú hamburguesa | Overlay full-screen vertical |
| **Móvil Landscape** | Menú horizontal | Distribución horizontal optimizada |

### 🎯 Características Móviles
- **Menú Hamburguesa Animado**: Transformación suave de líneas
- **Overlay Full-Screen**: Prevención de scroll del body
- **Touch Optimizado**: Navegación táctil fluida
- **Accesibilidad**: ARIA labels y soporte para lectores de pantalla

---

## 🎭 Sección de Proyectos

### 🚀 Galería Circular v4.0 - Manual Navigation
La galería de proyectos utiliza una implementación completamente renovada con las siguientes características:

#### ✨ Funcionalidades Principales
- **Navegación Manual**: Solo por arrastre de mouse/touch, sin scroll automático
- **Tarjetas Reales**: Renderiza componentes `ProjectCard` directamente en la galería
- **Efecto Curvatura**: Simulación 3D usando CSS transforms (sin WebGL)
- **Snap Inteligente**: Ajuste automático a la tarjeta más cercana

#### 🎨 Características Visuales
- **Curvatura Configurable**: Nivel de bend ajustable (0-5)
- **Centrado Perfecto**: Tarjetas perfectamente alineadas en todos los dispositivos
- **Colores Consistentes**: Sin efectos de oscurecimiento o desenfoque
- **Indicadores**: Navegación directa por puntos

#### 🔧 Implementación Técnica
```jsx
<CircularGallery
  items={projectsData}           // Array de proyectos
  bend={3}                       // Intensidad de curvatura
  CardComponent={ProjectCard}    // Componente de tarjeta
  isSpanish={isSpanish}         // Control de idioma
  scrollSpeed={2}               // Velocidad de navegación
  scrollEase={0.05}             // Suavidad del movimiento
/>
```

#### 📊 Beneficios de la v4.0
- ✅ **Experiencia Predecible**: Sin movimientos automáticos inesperados
- ✅ **Rendimiento Optimizado**: Menos cálculos, más eficiencia
- ✅ **Control Total**: Usuario decide cuándo y cómo navegar
- ✅ **Compatibilidad Universal**: Funciona en todos los navegadores
- ✅ **Código Mantenible**: Lógica simplificada y clara

---

## 🌐 Despliegue

### 🚀 Estado Actual
- **Plataforma**: Netlify con deploy automático
- **URL**: [portafoliosamuel115.netlify.app](https://portafoliosamuel115.netlify.app)
- **Integración**: Conectado al repositorio de GitHub
- **Build**: Automático en cada push a main

### ⚙️ Configuración de Producción
```bash
# Build de producción
npm run build

# Vista previa local
npm run preview
```

### 🌍 Otras Opciones de Deploy
- **Vercel**: Optimizado para proyectos React
- **GitHub Pages**: Con configuración para SPA
- **Heroku**: Con buildpack de Node.js

---

## 🤝 Contribución

### 📋 Cómo Contribuir
1. **Fork** del repositorio
2. **Crear rama feature**: `git checkout -b feature/nueva-funcionalidad`
3. **Commit cambios**: `git commit -m 'Add: nueva funcionalidad'`
4. **Push a la rama**: `git push origin feature/nueva-funcionalidad`
5. **Crear Pull Request**

### 📏 Estándares de Desarrollo
- **ESLint**: Seguir las reglas de linting configuradas
- **JSDoc**: Documentar componentes y funciones complejas
- **Responsive**: Asegurar compatibilidad en todos los dispositivos
- **Accesibilidad**: Mantener ARIA labels y contraste adecuado

### 🏷️ Convenciones de Commits
```bash
Add: nueva funcionalidad
Fix: corrección de bug
Update: actualización de dependencia
Refactor: refactorización de código
Docs: actualización de documentación
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👤 Autor

**Samuel Ospina**
- GitHub: [@Ospina115](https://github.com/Ospina115)
- Portafolio: [portafoliosamuel115.netlify.app](https://portafoliosamuel115.netlify.app)
- LinkedIn: [Samuel Ospina](https://linkedin.com/in/samuel-ospina)

---

## 🏆 Tecnologías Destacadas

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

---

⭐ **¡Dale una estrella al proyecto si te gusta!**
