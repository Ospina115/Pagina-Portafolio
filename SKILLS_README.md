# Skills InfiniteMenu Component

## Descripción
Componente interactivo que reemplaza el carrusel infinito anterior con un sistema de menús 3D basado en WebGL. Cada grupo de habilidades se presenta en su propio cuadrado con un menú infinito 3D interactivo.

## Características

### 🎯 Organización
- **7 cuadrados organizados en grid responsivo**
- Cada cuadrado representa un grupo de habilidades:
  1. Lenguajes de Programación
  2. Hosting / SaaS
  3. Frameworks, Plataformas y Librerías
  4. Servidores
  5. Diseño
  6. Control de Versiones
  7. Bases de datos

### 🎮 Interactividad 3D
- **InfiniteMenu con WebGL**: Cada cuadrado contiene un menú 3D interactivo
- **Controles intuitivos**: Arrastra para rotar, suelta para enfocar automáticamente
- **Animaciones fluidas**: Transiciones suaves y efectos visuales

### 🔗 Enlaces Inteligentes
- **Documentación oficial**: Cada tecnología enlaza a su documentación oficial
- **Iconos dinámicos**: Iconos SVG de alta calidad desde CDN
- **Información contextual**: Títulos y descripciones dinámicas

## Archivos del Sistema

### Componentes Principales
```
src/components/skills/
├── Skills.jsx                 # Componente principal (modificado)
├── SkillsInfiniteMenu.jsx    # Wrapper que organiza los cuadrados
├── InfiniteMenu.jsx          # Componente WebGL del menú 3D
├── skillsUtils.js            # Utilidades y mapeo de enlaces
├── SkillsInfiniteMenu.css    # Estilos para la grid de cuadrados
└── InfiniteMenu.css          # Estilos para el menú 3D
```

### Dependencias
- **gl-matrix**: Para operaciones matemáticas de WebGL

## Tecnologías Incluidas

### 💻 Lenguajes de Programación
- Java → [Oracle Java Docs](https://docs.oracle.com/en/java/)
- JavaScript → [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- HTML5 → [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- CSS3 → [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- Python → [Python Docs](https://docs.python.org/3/)
- PowerShell → [Microsoft PowerShell](https://docs.microsoft.com/en-us/powershell/)

### ☁️ Hosting / SaaS
- Azure → [Azure Docs](https://docs.microsoft.com/en-us/azure/)
- Netlify → [Netlify Docs](https://docs.netlify.com/)
- GitHub → [GitHub Docs](https://docs.github.com/)
- Vercel → [Vercel Docs](https://vercel.com/docs)
- Google Cloud → [GCP Docs](https://cloud.google.com/docs)

### 🚀 Frameworks, Plataformas y Librerías
- React → [React Docs](https://react.dev/)
- Node.js → [Node.js Docs](https://nodejs.org/en/docs/)
- Vite → [Vite Docs](https://vitejs.dev/)
- Angular → [Angular Docs](https://angular.io/docs)
- Bootstrap → [Bootstrap Docs](https://getbootstrap.com/docs/)
- Django → [Django Docs](https://docs.djangoproject.com/)
- FastAPI → [FastAPI Docs](https://fastapi.tiangolo.com/)
- Y más...

### 🖥️ Servidores
- Apache → [Apache Docs](https://httpd.apache.org/docs/)
- Maven → [Maven Docs](https://maven.apache.org/guides/)
- Tomcat → [Tomcat Docs](https://tomcat.apache.org/tomcat-9.0-doc/)

### 🎨 Diseño
- After Effects → [Adobe AE Help](https://helpx.adobe.com/after-effects.html)
- Illustrator → [Adobe AI Help](https://helpx.adobe.com/illustrator.html)
- Photoshop → [Adobe PS Help](https://helpx.adobe.com/photoshop.html)
- Canva → [Canva Help](https://www.canva.com/help/)

### 📚 Control de Versiones
- Git → [Git Docs](https://git-scm.com/doc)
- GitHub → [GitHub Docs](https://docs.github.com/)
- GitHub Codespaces → [Codespaces Docs](https://docs.github.com/en/codespaces)

### 🗄️ Bases de datos
- MySQL → [MySQL Docs](https://dev.mysql.com/doc/)
- PostgreSQL → [PostgreSQL Docs](https://www.postgresql.org/docs/)
- MongoDB → [MongoDB Docs](https://docs.mongodb.com/)
- Hibernate → [Hibernate Docs](https://hibernate.org/orm/documentation/)

## Responsive Design

### Desktop (1200px+)
- Grid de 3-4 columnas
- Cuadrados de 400px mínimo
- Menús 3D de 400px de altura

### Tablet (768px - 1200px)
- Grid de 2-3 columnas
- Cuadrados de 350px mínimo
- Menús 3D de 350px de altura

### Mobile (< 768px)
- Grid de 1 columna
- Cuadrados de ancho completo
- Menús 3D de 300px de altura

## Temas
- **Tema claro**: Fondo blanco con transparencias
- **Tema oscuro**: Fondo oscuro con efectos de cristal
- **Transiciones suaves** entre temas

## Uso

```jsx
import { Skills } from './components/skills/Skills';

function App() {
  const [isSpanish, setIsSpanish] = useState(true);
  
  return (
    <div>
      <Skills isSpanish={isSpanish} />
    </div>
  );
}
```

## Personalización

### Agregar nueva tecnología
1. Añadir el icono a `skillData` en `SkillsInfiniteMenu.jsx`
2. Agregar el enlace a documentación en `skillsUtils.js`
3. Opcional: agregar caso especial para el nombre en `getTechName()`

### Modificar estilos
- `SkillsInfiniteMenu.css`: Para la grid y cuadrados
- `InfiniteMenu.css`: Para el menú 3D y overlays

## Rendimiento
- **WebGL optimizado**: Shaders eficientes para 60fps
- **Texturas en atlas**: Todas las imágenes en una sola textura
- **Instancing**: Renderizado eficiente de múltiples objetos
- **Lazy loading**: Imágenes se cargan bajo demanda
