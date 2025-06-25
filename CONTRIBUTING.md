# 🤝 Guía de Contribución

¡Gracias por considerar contribuir a este proyecto! Esta guía te ayudará a entender cómo puedes participar en el desarrollo del portafolio.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Estándares de Código](#estándares-de-código)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Convenciones de Nomenclatura](#convenciones-de-nomenclatura)
- [Documentación](#documentación)
- [Testing](#testing)

## 📜 Código de Conducta

Este proyecto adhiere a un código de conducta. Al participar, se espera que mantengas este código.

## 🛠️ Cómo Contribuir

### 1. Fork del Repositorio
```bash
# Clona tu fork
git clone https://github.com/tu-usuario/Pagina-Portafolio.git
cd Pagina-Portafolio
```

### 2. Configurar el Entorno de Desarrollo
```bash
# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

### 3. Crear una Rama
```bash
# Crea una nueva rama para tu feature
git checkout -b feature/nombre-descriptivo
# o para un bugfix
git checkout -b fix/descripcion-del-bug
```

### 4. Realizar Cambios
- Escribe código limpio y bien documentado
- Sigue las convenciones de nomenclatura del proyecto
- Añade comentarios JSDoc cuando sea necesario
- Asegúrate de que tu código es responsivo

### 5. Commit y Push
```bash
# Añade tus cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: añade nueva funcionalidad de tema oscuro"

# Push a tu rama
git push origin feature/nombre-descriptivo
```

### 6. Crear Pull Request
- Describe claramente qué cambios realizaste
- Incluye capturas de pantalla si hay cambios visuales
- Referencia cualquier issue relacionado

## 📝 Estándares de Código

### JavaScript/JSX
```javascript
/**
 * Ejemplo de función bien documentada
 * @param {boolean} isSpanish - Indica si el idioma es español
 * @param {Function} toggleLanguage - Función para cambiar idioma
 * @returns {JSX.Element} Componente renderizado
 */
function ExampleComponent({ isSpanish, toggleLanguage }) {
  // Lógica del componente
  return <div>Content</div>;
}
```

### CSS
```css
/* Usa nombres de clase descriptivos */
.navigation-bar {
  display: flex;
  justify-content: space-between;
  /* Comenta propiedades complejas */
  backdrop-filter: blur(10px); /* Efecto de desenfoque para glassmorphism */
}

/* Usa variables CSS para consistencia */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #ef4444;
}
```

## 🏗️ Estructura del Proyecto

### Componentes
```
components/
├── ComponentName/
│   ├── ComponentName.jsx    # Componente principal
│   ├── componentname.css    # Estilos específicos
│   └── index.js            # Archivo de exportación (opcional)
```

### Organización de Archivos
- **Un componente por archivo**
- **Estilos CSS en archivos separados**
- **Imports organizados**: React hooks primero, luego componentes, luego estilos

```javascript
// ✅ Orden correcto de imports
import { useState, useEffect } from 'react';
import { ComponenteHijo } from './ComponenteHijo';
import './component.css';

// ❌ Orden incorrecto
import './component.css';
import { ComponenteHijo } from './ComponenteHijo';
import { useState, useEffect } from 'react';
```

## 🔤 Convenciones de Nomenclatura

### Archivos y Carpetas
- **Componentes**: `PascalCase.jsx` (ej: `NavBar.jsx`)
- **Estilos**: `kebab-case.css` (ej: `nav-bar.css`)
- **Carpetas**: `kebab-case` (ej: `user-profile/`)

### Variables y Funciones
```javascript
// ✅ Nombres descriptivos
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [userLanguagePreference, setUserLanguagePreference] = useState('es');

// ❌ Nombres poco descriptivos
const [open, setOpen] = useState(false);
const [lang, setLang] = useState('es');
```

### Constantes
```javascript
// ✅ UPPER_SNAKE_CASE para constantes
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

// ✅ Objetos de configuración
const THEME_CONFIG = {
  LIGHT: 'light',
  DARK: 'dark'
};
```

## 📚 Documentación

### JSDoc para Componentes
```javascript
/**
 * Componente de navegación principal de la aplicación
 * 
 * @component
 * @param {Object} props - Props del componente
 * @param {boolean} props.isSpanish - Determina si el idioma es español
 * @param {Function} props.toggleLanguage - Función para cambiar el idioma
 * @returns {JSX.Element} Barra de navegación renderizada
 * 
 * @example
 * <NavBar 
 *   isSpanish={true} 
 *   toggleLanguage={() => setLanguage(!language)} 
 * />
 */
function NavBar({ isSpanish, toggleLanguage }) {
  // Implementación del componente
}
```

### Comentarios en CSS
```css
/* ==========================================================================
   Componente: Navigation Bar
   Descripción: Estilos para la barra de navegación principal
   ========================================================================== */

.nav-bar {
  /* Layout */
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  /* Spacing */
  padding: 1rem 2rem;
  
  /* Visual */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px); /* Efecto glassmorphism */
  border-radius: 8px;
}
```

## 🧪 Testing

### Antes de Hacer Commit
```bash
# Ejecuta el linter
npm run lint

# Construye el proyecto para verificar que no hay errores
npm run build

# Verifica que el proyecto funciona en modo producción
npm run preview
```

### Checklist de Testing Manual
- [ ] ✅ El componente se renderiza correctamente
- [ ] ✅ Funciona en modo claro y oscuro
- [ ] ✅ Responsive en móvil, tablet y desktop
- [ ] ✅ Funciona en ambos idiomas (español/inglés)
- [ ] ✅ No hay errores en la consola
- [ ] ✅ Las animaciones se ejecutan suavemente

## 🐛 Reportar Bugs

### Información Necesaria
1. **Descripción del bug**
2. **Pasos para reproducir**
3. **Comportamiento esperado**
4. **Comportamiento actual**
5. **Capturas de pantalla** (si aplica)
6. **Información del navegador/dispositivo**

### Template de Issue
```markdown
## 🐛 Descripción del Bug
Una descripción clara y concisa del bug.

## 🔄 Pasos para Reproducir
1. Ve a '...'
2. Haz click en '...'
3. Scrollea hasta '...'
4. Ve el error

## ✅ Comportamiento Esperado
Descripción de lo que esperabas que pasara.

## ❌ Comportamiento Actual
Descripción de lo que realmente pasó.

## 📱 Información del Entorno
- OS: [ej: Windows 11]
- Navegador: [ej: Chrome 91.0]
- Versión: [ej: 1.0.0]

## 📸 Capturas de Pantalla
Si aplica, añade capturas de pantalla.
```

## 💡 Sugerir Mejoras

Las ideas para nuevas funcionalidades son bienvenidas. Antes de implementar:

1. **Abre un Issue** describiendo la funcionalidad
2. **Discute la implementación** con el equipo
3. **Espera aprobación** antes de comenzar a codificar

## 🏆 Reconocimientos

Todos los contribuyentes serán reconocidos en el README del proyecto. ¡Gracias por hacer este proyecto mejor!

---

**¿Tienes preguntas?** No dudes en abrir un issue o contactar al equipo de desarrollo.
