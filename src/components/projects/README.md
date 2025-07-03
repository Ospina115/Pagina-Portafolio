# 📁 Sección de Proyectos - Portafolio

## 🚀 Descripción

La sección de proyectos ha sido completamente renovada con una galería circular interactiva 3D y tarjetas de proyecto con efecto flip. Esta implementación utiliza WebGL a través de la librería OGL para crear una experiencia visual inmersiva.

## ✨ Características

### 🎭 Galería Circular 3D
- **Navegación interactiva**: Scroll horizontal con mouse/touch
- **Efectos visuales**: Animaciones WebGL con shaders personalizados
- **Curva dinámica**: Efecto de perspectiva curva configurable
- **Responsive**: Adaptable a dispositivos móviles y desktop

### 🎴 Tarjetas de Proyecto
- **Efecto Flip**: Animación 3D al hacer clic
- **Diseño Terminal**: Inspirado en ventanas de aplicaciones macOS
- **Información Completa**: Tecnologías, enlaces y características
- **Bilingüe**: Soporte para español e inglés

## 🛠️ Tecnologías Utilizadas

- **React**: Framework principal
- **OGL**: Librería WebGL para efectos 3D
- **CSS3**: Animaciones y efectos visuales
- **PropTypes**: Validación de tipos

## 📦 Instalación y Configuración

1. **Instalar dependencias**:
```bash
npm install ogl prop-types
```

2. **Estructura de archivos**:
```
src/components/projects/
├── Projects.jsx              # Componente principal
├── Projects.css              # Estilos de la sección
├── CircularGallery.jsx       # Galería 3D
├── CircularGallery.css       # Estilos de la galería
├── ProjectCard.jsx           # Tarjetas de proyecto
└── ProjectCard.css           # Estilos de las tarjetas
```

## 🎨 Personalización

### Configurar Proyectos

Edita el array `projectsData` en `Projects.jsx`:

```javascript
const projectsData = [
  {
    id: 1,
    title: {
      es: "Tu Proyecto",
      en: "Your Project"
    },
    description: {
      es: "Descripción en español",
      en: "Description in English"
    },
    image: "https://tu-imagen.jpg",
    alt: {
      es: "Texto alternativo",
      en: "Alt text"
    },
    technologies: [
      { 
        name: "React", 
        icon: "/path/to/react-icon.svg" 
      }
    ],
    githubUrl: "https://github.com/tu-usuario/proyecto",
    liveUrl: "https://tu-proyecto.vercel.app",
    features: {
      es: ["Característica 1", "Característica 2"],
      en: ["Feature 1", "Feature 2"]
    }
  }
]
```

### Configurar Galería

Modifica las propiedades de `CircularGallery`:

```jsx
<CircularGallery
  items={galleryItems}
  bend={3}                    // Curvatura (0-5)
  textColor="#ffffff"         // Color del texto
  borderRadius={0.05}         // Radio de borde
  scrollEase={0.02}          // Suavidad del scroll
  scrollSpeed={2}            // Velocidad del scroll
/>
```

## 🎯 Uso

### Navegación en la Galería
- **Desktop**: Scroll con rueda del mouse o clic y arrastrar
- **Móvil**: Deslizar horizontalmente
- **Auto-alineación**: Se centra automáticamente en elementos

### Interacción con Tarjetas
- **Hover**: Efecto de elevación y overlay en imagen
- **Clic**: Voltea la tarjeta para mostrar detalles
- **Enlaces**: Abre repositorio o demo en nueva pestaña

## 🌐 Responsive Design

- **Desktop**: Galería completa con grid de 4 columnas
- **Tablet**: Grid de 2 columnas, galería adaptada
- **Móvil**: Lista vertical, galería optimizada

## 🎨 Temas y Colores

### Paleta Principal
- **Primario**: `#3b82f6` (Azul)
- **Secundario**: `#1e293b` (Gris oscuro)
- **Acentos**: Gradientes dinámicos
- **Transparencias**: Efectos glassmorphism

### Modo Oscuro
El componente incluye soporte automático para modo oscuro usando `prefers-color-scheme`.

## 🔧 Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview

# Lint del código
npm run lint
```

## 📱 Testing

### Dispositivos Recomendados
- **Desktop**: Chrome, Firefox, Safari
- **Móvil**: iOS Safari, Chrome Mobile
- **Tablet**: iPad, Android tablets

### Rendimiento
- **WebGL**: Detección automática de soporte
- **Fallbacks**: Degradación elegante sin WebGL
- **Optimización**: Lazy loading de imágenes

## 🚨 Troubleshooting

### Problemas Comunes

1. **Imágenes no cargan**:
   - Verificar rutas de iconos de tecnologías
   - Usar URLs absolutas para imágenes de proyectos

2. **Galería no funciona**:
   - Verificar que OGL esté instalado
   - Comprobar soporte WebGL del navegador

3. **Estilos incorrectos**:
   - Importar archivos CSS en el orden correcto
   - Verificar conflictos con otros estilos

## 🔗 Enlaces de Referencia

- [OGL Documentation](https://github.com/oframe/ogl)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [React Props Validation](https://react.dev/reference/react/Component#static-proptypes)

## 📄 Licencia

Este componente está diseñado específicamente para el portafolio de Samuel Ospina. Puedes adaptar el código para tu propio uso siguiendo las mejores prácticas de desarrollo.

---

¡Disfruta de tu nueva sección de proyectos interactiva! 🚀
