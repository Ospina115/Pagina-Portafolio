# 🌟 Portafolio Samuel Ospina

![Vista previa del portafolio](preview.png)

Un portafolio web moderno y responsivo desarrollado con React y Vite, que presenta información personal, habilidades y proyectos de manera interactiva y atractiva con efectos visuales avanzados.

## 📋 Tabla de Contenidos

- [🚧 Tecnologías](#-tecnologías)
- [🚀 Instalación](#-instalación)
- [💻 Uso](#-uso)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🎨 Características](#-características)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [🏗️ Arquitectura](#️-arquitectura)
- [📝 Mejores Prácticas](#-mejores-prácticas)
- [🌐 Despliegue](#-despliegue)
- [🤝 Contribución](#-contribución)

---

## 🚧 Tecnologías

### Frontend Core
- **React 18.3.1**: Biblioteca para construir interfaces de usuario
- **Vite 5.4.8**: Herramienta de construcción y servidor de desarrollo
- **JavaScript ES2022**: Lenguaje de programación principal

### Animaciones y UX
- **Lenis 1.1.14**: Smooth scrolling avanzado y efectos de desplazamiento
- **Framer Motion 12.14.0**: Animaciones fluidas y transiciones
- **GSAP 3.13.0**: Animaciones avanzadas y timeline management

### Efectos Visuales
- **OGL 1.0.11**: Renderizado WebGL para efectos de fondo dinámicos
- **gl-matrix 3.4.3**: Operaciones matemáticas para WebGL
- **Devicon 2.16.0**: Iconos de tecnologías a color

### Herramientas de Desarrollo
- **ESLint 9.11.1**: Linter para mantener calidad del código
- **Vite Plugin React SWC**: Compilador rápido para React

---

## 🚀 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm 9+

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/Pagina-Portafolio.git
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

## 💻 Uso

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run preview      # Vista previa de build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

### Configuración de Desarrollo

El proyecto utiliza Vite con configuración optimizada para desarrollo:

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

---

## 📁 Estructura del Proyecto

```
Pagina-Portafolio/
├── public/                     # Archivos estáticos
│   └── favicon.ico
├── src/
│   ├── components/            # Componentes React
│   │   ├── about/            # Sección Acerca de
│   │   ├── background/       # Efectos de fondo Aurora
│   │   ├── contact/          # Formulario de contacto
│   │   ├── home/            # Página principal
│   │   ├── loading/         # Pantalla de carga
│   │   ├── navbar/          # Navegación
│   │   ├── navigation/      # Indicadores de scroll
│   │   ├── projects/        # Galería de proyectos
│   │   ├── review/          # Testimonios
│   │   └── skills/          # Habilidades técnicas
│   ├── hooks/               # Custom hooks
│   │   └── useLenisScroll.js
│   ├── styles/              # Estilos globales
│   │   ├── style.css        # Estilos base
│   │   ├── temaclaro.css    # Tema claro
│   │   └── temaoscuro.css   # Tema oscuro
│   ├── assets/              # Recursos estáticos
│   │   └── images/          # Imágenes del proyecto
│   ├── App.jsx              # Componente raíz
│   └── main.jsx             # Punto de entrada
├── eslint.config.js         # Configuración ESLint
├── vite.config.js          # Configuración Vite
└── package.json            # Dependencias y scripts
```

---

## 🎨 Características

### ✨ Interfaz de Usuario
- **Diseño Responsive**: Adaptable a todos los dispositivos
- **Tema Dual**: Soporte para modo claro y oscuro
- **Navegación Fluida**: Smooth scrolling con Lenis
- **Efectos Visuales**: Fondo animado con shaders WebGL

### 🌐 Multiidioma
- **Español/Inglés**: Cambio dinámico de idioma
- **Persistencia**: Preferencia guardada en localStorage

### 🎯 Secciones
1. **Home**: Presentación con efectos tipográficos
2. **About**: Información personal y profesional
3. **Skills**: Habilidades técnicas con iconos interactivos
4. **Projects**: Portafolio de proyectos
5. **Reviews**: Testimonios y recomendaciones
6. **Contact**: Información de contacto

### 🔧 Tecnología Avanzada
- **WebGL Aurora**: Fondo animado con efectos de aurora
- **Skills Grid**: Iconos de tecnologías con Devicon
- **Smooth Scrolling**: Navegación fluida entre secciones
- **Performance**: Optimizado para carga rápida

---

## 🏗️ Arquitectura

### Patrones de Diseño
- **Component-Based**: Arquitectura basada en componentes reutilizables
- **Custom Hooks**: Lógica compartida encapsulada
- **Container/Presenter**: Separación de lógica y presentación

### Gestión del Estado
```javascript
// Estado global mínimo
const [isSpanish, setIsSpanish] = useState(true);
const [currentTheme, setCurrentTheme] = useState('dark');

// Custom hooks para funcionalidad específica
const { scrollToSection, scrollToTop } = useLenisScroll();
```

### Estructura de Componentes
```
App
├── NavBar (Navegación)
├── Home (Landing)
├── About (Información personal)
├── Skills (Habilidades técnicas)
├── Projects (Portafolio)
├── Review (Testimonios)
└── Contact (Contacto)
```

---

## 📝 Mejores Prácticas

### Código
- **ESLint**: Linting automático con reglas estrictas
- **JSDoc**: Documentación de componentes y funciones
- **Naming Conventions**: CamelCase para componentes, kebab-case para archivos CSS

### Performance
- **Lazy Loading**: Componentes cargados bajo demanda
- **Image Optimization**: Imágenes optimizadas para web
- **Bundle Splitting**: División inteligente del código

### Accesibilidad
- **ARIA Labels**: Etiquetas semánticas para lectores de pantalla
- **Keyboard Navigation**: Navegación completa por teclado
- **Color Contrast**: Contraste adecuado en ambos temas

### Ejemplo de Componente
```javascript
/**
 * Componente de habilidades con iconos interactivos
 * @param {boolean} isSpanish - Idioma actual
 * @returns {JSX.Element} Grid de habilidades
 */
function Skills({ isSpanish }) {
  const skills = useMemo(() => getSkillsData(isSpanish), [isSpanish]);
  
  return (
    <section className="skills" aria-label={isSpanish ? "Habilidades" : "Skills"}>
      <SimpleSkillsGrid items={skills} />
    </section>
  );
}
```

---

## 🌐 Despliegue

### Build de Producción
```bash
npm run build
```

### Plataformas Recomendadas
- **Netlify**: Despliegue automático desde Git
- **Vercel**: Optimizado para proyectos React
- **GitHub Pages**: Hosting gratuito

### Variables de Entorno
```bash
# .env.production
VITE_APP_TITLE="Portafolio Samuel Ospina"
VITE_APP_URL="https://tu-dominio.com"
```

---

## 🤝 Contribución

### Cómo Contribuir

1. **Fork del repositorio**
2. **Crear rama feature**: `git checkout -b feature/nueva-funcionalidad`
3. **Commit cambios**: `git commit -m 'Add: nueva funcionalidad'`
4. **Push a la rama**: `git push origin feature/nueva-funcionalidad`
5. **Crear Pull Request**

### Estándares
- Seguir las convenciones de nomenclatura existentes
- Documentar nuevos componentes con JSDoc
- Asegurar responsividad en todos los dispositivos
- Mantener accesibilidad (ARIA labels, contraste)

### Estructura de Commits
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
- GitHub: [@ospina115](https://github.com/ospina115)
- LinkedIn: [Samuel Ospina](https://linkedin.com/in/samuel-ospina)
- Email: samuel.ospina@email.com

---

⭐ ¡Dale una estrella al proyecto si te gusta!

## 🏗️ Arquitectura del Proyecto

### Patrón de Diseño
- **Componentes Funcionales**: Uso exclusivo de React Hooks
- **Composición sobre Herencia**: Componentes reutilizables y modulares
- **Estado Local**: Manejo de estado con useState y useEffect
- **Lazy Loading**: Carga diferida para optimizar rendimiento

### Principios de Desarrollo
- **Separación de Responsabilidades**: Cada componente tiene una función específica
- **Código Limpio**: Comentarios JSDoc para documentación
- **Responsive Design**: Adaptable a diferentes dispositivos
- **Internacionalización**: Soporte para español e inglés

---

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 16.0 o superior)
- NPM (versión 8.0 o superior)
- Git para clonar el repositorio

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

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
El proyecto estará disponible en `http://localhost:5173`

---

## 💻 Uso

### Desarrollo Local
- El proyecto incluye hot-reload automático
- Los cambios se reflejan instantáneamente en el navegador
- Utiliza el puerto 5173 por defecto (configurable)

### Construcción para Producción
```bash
npm run build
```

### Vista Previa de Producción
```bash
npm run preview
```

---

## 📁 Estructura del Proyecto

```
src/
├── main.jsx                 # Punto de entrada principal
├── App.jsx                  # Componente raíz de la aplicación
├── assets/                  # Recursos estáticos
│   ├── images/             # Imágenes del proyecto
│   └── icons/              # Iconografía SVG y PNG
├── components/             # Componentes reutilizables
│   ├── about/             # Sección "Acerca de"
│   ├── background/        # Componentes de fondo animado
│   │   ├── Aurora.jsx     # Fondo aurora boreal con WebGL
│   │   └── Aurora.css     # Estilos del componente Aurora
│   ├── footer/            # Pie de página
│   ├── home/              # Página de inicio
│   ├── loading/           # Componente de carga
│   ├── navbar/            # Barra de navegación
│   ├── projects/          # Sección de proyectos
│   ├── review/            # Testimonios/reseñas
│   └── skills/            # Sección de habilidades
└── styles/                # Estilos CSS globales
    ├── style.css          # Estilos base
    ├── temaclaro.css      # Tema claro
    └── temaoscuro.css     # Tema oscuro
```

### Convenciones de Nomenclatura
- **Componentes**: PascalCase (ej: `NavBar.jsx`)
- **Archivos CSS**: kebab-case (ej: `loading.css`)
- **Variables**: camelCase (ej: `isSpanish`)
- **Constantes**: UPPER_SNAKE_CASE

---

## 🎨 Características

### ✨ Funcionalidades Principales
- **Fondo Aurora Animado**: Efecto de aurora boreal dinámico con WebGL
- **Diseño Responsivo**: Adaptable a móviles, tablets y desktop
- **Modo Oscuro/Claro**: Temas intercambiables para mejor experiencia
- **Multiidioma**: Soporte para español e inglés
- **Smooth Scrolling**: Navegación fluida entre secciones
- **Animaciones Avanzadas**: Transiciones y efectos visuales con Framer Motion y GSAP
- **Loading Screen**: Pantalla de carga con animación personalizada
- **Glassmorphism**: Efectos de cristal esmerilado en la UI

### 🔧 Optimizaciones
- **WebGL Acceleration**: Renderizado acelerado por hardware para efectos visuales
- **Lazy Loading**: Carga diferida de componentes
- **Code Splitting**: División automática del código
- **Tree Shaking**: Eliminación de código no utilizado
- **Minificación**: Compresión automática en producción
- **Performance Monitoring**: Optimizaciones específicas para dispositivos móviles

---

## 🔧 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Vista previa de la build de producción |
| `npm run lint` | Ejecuta ESLint para análisis de código |

---

## 🌐 Despliegue

### Netlify (Actual)
El proyecto está desplegado automáticamente en Netlify con:
- **Deploy automático**: Conectado al repositorio de GitHub
- **Preview deploys**: Para pull requests
- **Custom domain**: Configuración de dominio personalizado

[![Netlify Status](https://api.netlify.com/api/v1/badges/f5fb3284-1822-462d-8bbd-48611eacadff/deploy-status)](https://app.netlify.com/sites/portafoliosamuel115/deploys)

### Otras Opciones de Despliegue
- **Vercel**: Compatible con configuración automática
- **GitHub Pages**: Requiere configuración adicional para SPA
- **Heroku**: Con buildpack de Node.js

---

## 🤝 Contribución

### Guías para Contribuir
1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

### Estándares de Código
- Usar ESLint para mantener consistencia
- Añadir comentarios JSDoc para funciones complejas
- Seguir las convenciones de nomenclatura del proyecto
- Incluir pruebas para nuevas funcionalidades

---
## 🖥 Herramientas de Desarrollo

### Editor de Código
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Hosting y Despliegue
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

### Diseño y Prototipado
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

### Control de Versiones
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

---

## 📈 Estado del Proyecto

### Deploy Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/f5fb3284-1822-462d-8bbd-48611eacadff/deploy-status)](https://app.netlify.com/sites/portafoliosamuel115/deploys)

### Información del Proyecto
- **Estado**: 🟢 Activo y en desarrollo
- **Última actualización**: Junio 2025
- **Versión**: 1.0.0
- **Mantenimiento**: Activo

---

## 📝 Notas Adicionales

### Performance
- **Lighthouse Score**: 90+ en todas las métricas
- **Bundle Size**: Optimizado para carga rápida
- **SEO**: Configurado para motores de búsqueda

### Compatibilidad
- **Navegadores**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Dispositivos**: Mobile-first, responsive design
- **Accesibilidad**: WCAG 2.1 AA compliance

---

## 📞 Contacto

Para consultas sobre el proyecto:
- **GitHub**: [@Ospina115](https://github.com/Ospina115)
- **Portafolio**: [portafoliosamuel115.netlify.app](https://portafoliosamuel115.netlify.app)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**⭐ Si te gusta este proyecto, no olvides darle una estrella en GitHub!**

<!-- REPO DE DONDE SAQUÉ LOS ICONOS -->
<!-- https://github.com/Ileriayo/markdown-badges -->
