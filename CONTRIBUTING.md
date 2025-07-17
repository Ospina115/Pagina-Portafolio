# 🤝 Guía de Contribución - Portafolio Samuel Ospina

¡Gracias por tu interés en contribuir al proyecto! Esta guía te ayudará a participar de manera efectiva en el desarrollo del portafolio.

## 📋 Tabla de Contenidos

- [🚀 Primeros Pasos](#-primeros-pasos)
- [💻 Configuración del Entorno](#-configuración-del-entorno)
- [🔧 Proceso de Desarrollo](#-proceso-de-desarrollo)
- [📏 Estándares de Código](#-estándares-de-código)
- [🎨 Guidelines de UI/UX](#-guidelines-de-uiux)
- [✅ Testing y Validación](#-testing-y-validación)
- [📝 Convenciones de Commits](#-convenciones-de-commits)
- [🔄 Proceso de Pull Request](#-proceso-de-pull-request)
- [🐛 Reporte de Bugs](#-reporte-de-bugs)
- [💡 Sugerencias de Mejoras](#-sugerencias-de-mejoras)
- [📚 Recursos Útiles](#-recursos-útiles)

---

## 🚀 Primeros Pasos

### Prerequisitos
- **Node.js** 18+ 
- **npm** 9+
- **Git** configurado
- Editor de código (recomendado: VS Code)

### Fork y Clone
```bash
# 1. Haz fork del repositorio en GitHub
# 2. Clona tu fork localmente
git clone https://github.com/TU_USERNAME/Pagina-Portafolio.git
cd Pagina-Portafolio

# 3. Agrega el repositorio original como upstream
git remote add upstream https://github.com/Ospina115/Pagina-Portafolio.git
```

---

## 💻 Configuración del Entorno

### Instalación Inicial
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Verificar que todo funciona en http://localhost:5173
```

### Extensiones Recomendadas (VS Code)
- **ES7+ React/Redux/React-Native snippets**
- **ESLint**
- **Prettier**
- **Auto Rename Tag**
- **CSS Peek**
- **GitLens**

---

## 🔧 Proceso de Desarrollo

### 1. Crear Rama de Feature
```bash
# Mantener main actualizado
git checkout main
git pull upstream main

# Crear nueva rama
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
```

### 2. Tipos de Contribuciones

#### 🎨 **Nuevas Características**
- Nuevos componentes o secciones
- Mejoras en UX/UI
- Nuevas animaciones o efectos visuales
- Funcionalidades adicionales

#### 🐛 **Correcciones de Bugs**
- Problemas de responsividad
- Errores en animaciones
- Issues de rendimiento
- Problemas de compatibilidad

#### 📚 **Documentación**
- Mejoras en README.md
- Documentación de componentes
- Comentarios en código
- Guías de usuario

#### ⚡ **Optimizaciones**
- Mejoras de rendimiento
- Optimización de assets
- Refactoring de código
- Actualización de dependencias

---

## 📏 Estándares de Código

### Estructura de Archivos
```
src/
├── components/
│   └── NuevoComponente/
│       ├── NuevoComponente.jsx    # Componente principal
│       ├── NuevoComponente.css    # Estilos específicos
│       └── index.js               # Exportación (opcional)
├── hooks/
│   └── useNuevoHook.js            # Custom hooks
├── assets/
│   └── images/
│       └── categoria/             # Organizar por categorías
└── styles/
    └── componente-especifico.css  # Estilos globales si es necesario
```

### Nomenclatura
- **Componentes**: PascalCase (`NavBar`, `ProjectCard`)
- **Archivos**: PascalCase para componentes, camelCase para utils
- **Variables/Funciones**: camelCase (`isLoading`, `handleClick`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_ITEMS`, `DEFAULT_CONFIG`)
- **CSS Classes**: kebab-case (`navbar-container`, `project-card`)

### ESLint y Código Limpio
```bash
# Verificar linting antes de commit
npm run lint

# Algunas reglas importantes:
# - Usar const/let en lugar de var
# - PropTypes para todos los componentes
# - Funciones de flecha para componentes funcionales
# - Destructuring cuando sea apropiado
```

### Ejemplo de Componente Bien Estructurado
```jsx
/**
 * NuevoComponente - Descripción breve del componente
 * 
 * @param {Object} props - Props del componente
 * @param {string} props.titulo - Título a mostrar
 * @param {boolean} props.isVisible - Control de visibilidad
 * @returns {JSX.Element} Componente renderizado
 */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NuevoComponente.css';

function NuevoComponente({ titulo, isVisible = true }) {
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    // Lógica del efecto
  }, []);

  const handleClick = () => {
    setEstado(!estado);
  };

  if (!isVisible) return null;

  return (
    <div className="nuevo-componente">
      <h2>{titulo}</h2>
      <button onClick={handleClick}>
        {estado ? 'Activo' : 'Inactivo'}
      </button>
    </div>
  );
}

NuevoComponente.propTypes = {
  titulo: PropTypes.string.isRequired,
  isVisible: PropTypes.bool
};

export default NuevoComponente;
```

---

## 🎨 Guidelines de UI/UX

### Diseño Responsivo
- **Móvil First**: Diseñar primero para móvil
- **Breakpoints**: 480px, 768px, 1024px, 1440px
- **Usar `useResponsive` hook** para detección de dispositivos
- **Testing obligatorio** en diferentes tamaños de pantalla

### Paleta de Colores
```css
/* Tema Oscuro (Principal) */
--bg-primary: #0a0a0a;
--bg-secondary: #1a1a1a;
--text-primary: #ffffff;
--text-secondary: #a0a0a0;
--accent: #6366f1;

/* Tema Claro */
--bg-primary: #ffffff;
--bg-secondary: #f8fafc;
--text-primary: #1a1a1a;
--text-secondary: #6b7280;
--accent: #6366f1;
```

### Animaciones
- **Duración**: 0.3s para interacciones, 0.6s para transiciones de página
- **Easing**: `cubic-bezier(0.4, 0.0, 0.2, 1)` por defecto
- **Usar Framer Motion** para animaciones complejas
- **Considerar `prefers-reduced-motion`** para accesibilidad

### Accesibilidad
- **Contraste mínimo**: 4.5:1 para texto normal
- **ARIA labels** en elementos interactivos
- **Navegación por teclado** funcional
- **Alt text** en todas las imágenes

---

## ✅ Testing y Validación

### Checklist Pre-Commit
- [ ] Código pasa ESLint sin errores
- [ ] Componente es responsivo (móvil, tablet, desktop)
- [ ] Funciona en tema claro y oscuro
- [ ] No hay console.logs en producción
- [ ] PropTypes definidos y correctos
- [ ] Accesibilidad básica implementada

### Testing Manual
```bash
# Desarrollo
npm run dev

# Build de producción
npm run build
npm run preview

# Linting
npm run lint
```

### Navegadores Soportados
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Safari** iOS 14+
- **Chrome Mobile** 90+

---

## 📝 Convenciones de Commits

### Formato
```
<tipo>: <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos de Commit
- **feat**: Nueva funcionalidad
- **fix**: Corrección de bug
- **docs**: Cambios en documentación
- **style**: Cambios de formato (espacios, comas, etc.)
- **refactor**: Refactoring sin cambios funcionales
- **perf**: Mejoras de rendimiento
- **test**: Agregar o corregir tests
- **chore**: Cambios en build, configuración, etc.

### Ejemplos
```bash
feat: agregar galería de certificaciones en sección About

fix: corregir problema de scroll en dispositivos iOS

docs: actualizar guía de instalación en README

style: mejorar espaciado en componente ProjectCard

refactor: optimizar hook useResponsive para mejor rendimiento

perf: lazy load de imágenes en galería de proyectos
```

---

## 🔄 Proceso de Pull Request

### 1. Antes de Crear el PR
```bash
# Actualizar rama con cambios más recientes
git checkout main
git pull upstream main
git checkout tu-rama-feature
git rebase main

# Asegurar que todo funciona
npm run lint
npm run build
```

### 2. Crear Pull Request
- **Título descriptivo** siguiendo convenciones de commits
- **Descripción detallada** con:
  - Qué cambios se hicieron
  - Por qué se hicieron
  - Cómo testear los cambios
  - Screenshots si es relevante

### 3. Template de PR
```markdown
## 📝 Descripción
Breve descripción de los cambios realizados.

## 🔄 Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Cambio importante (breaking change)
- [ ] Documentación

## ✅ Checklist
- [ ] El código sigue las convenciones del proyecto
- [ ] Se realizó auto-review del código
- [ ] Los cambios son responsivos
- [ ] Funciona en tema claro y oscuro
- [ ] Se agregó documentación si es necesario

## 📱 Testing
Describe cómo se probaron los cambios:
- [ ] Desktop
- [ ] Tablet
- [ ] Móvil

## 📸 Screenshots (si aplica)
Agregar screenshots de los cambios visuales.
```

---

## 🐛 Reporte de Bugs

### Información Requerida
1. **Descripción clara** del problema
2. **Pasos para reproducir** el bug
3. **Comportamiento esperado** vs actual
4. **Screenshots/videos** si es relevante
5. **Información del entorno**:
   - Navegador y versión
   - Dispositivo/OS
   - Tamaño de pantalla

### Template de Issue
```markdown
## 🐛 Descripción del Bug
Descripción clara y concisa del problema.

## 🔄 Pasos para Reproducir
1. Ir a '...'
2. Hacer click en '...'
3. Scrollear hasta '...'
4. Ver error

## ✅ Comportamiento Esperado
Descripción clara de qué se esperaba que pasara.

## 📸 Screenshots
Si aplica, agregar screenshots del problema.

## 🖥️ Información del Entorno
- Navegador: [e.g. Chrome 100]
- Dispositivo: [e.g. iPhone 12, Desktop]
- OS: [e.g. iOS 15, Windows 11]
- Resolución: [e.g. 1920x1080]

## ➕ Información Adicional
Cualquier otro detalle relevante.
```

---

## 💡 Sugerencias de Mejoras

### Áreas de Contribución Prioritarias
1. **Nuevas Secciones**
   - Certificaciones/Educación
   - Blog/Artículos
   - Timeline de experiencia

2. **Mejoras Técnicas**
   - PWA (Progressive Web App)
   - SEO optimizations
   - Analytics integration

3. **Efectos Visuales**
   - Nuevas animaciones
   - Partículas interactivas
   - Micro-interacciones

4. **Accesibilidad**
   - Screen reader support mejorado
   - Navegación por teclado
   - Alto contraste

### Ideas de Features
- **Modo Oscuro Automático** basado en hora del día
- **Cursor Personalizado** con efectos de seguimiento
- **Easter Eggs** para usuarios curiosos
- **Formulario de Contacto** funcional
- **Integración con APIs** (GitHub, LinkedIn)

---

## 📚 Recursos Útiles

### Documentación Técnica
- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [GSAP Documentation](https://greensock.com/docs/)

### Herramientas de Desarrollo
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Wave Accessibility Checker](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Can I Use](https://caniuse.com/)

### Inspiración y Referencias
- [Awwwards](https://www.awwwards.com/)
- [Dribbble](https://dribbble.com/)
- [CodePen](https://codepen.io/)
- [Three.js Examples](https://threejs.org/examples/)

---

## 🌟 Reconocimientos

### Contribuidores
Todos los contribuidores serán reconocidos en el README principal del proyecto.

### Como Agradecer
- ⭐ **Star** al repositorio
- 🐛 **Reportar bugs** encontrados
- 💡 **Compartir ideas** de mejora
- 📱 **Compartir** el proyecto en redes sociales

---

## 📞 Contacto

Si tienes preguntas sobre el proceso de contribución:

- **GitHub Issues**: Para bugs y sugerencias
- **GitHub Discussions**: Para preguntas generales
- **Email**: Para temas más específicos

---

## 📄 Licencia

Al contribuir al proyecto, aceptas que tus contribuciones serán licenciadas bajo la misma licencia MIT del proyecto.

---

**¡Gracias por contribuir al proyecto! 🚀**

Cada contribución, por pequeña que sea, ayuda a mejorar el portafolio y beneficia a toda la comunidad de desarrolladores.
