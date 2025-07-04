/**
 * Projects.jsx - Componente de la sección de proyectos
 * 
 * Sección que muestra los proyectos destacados del portafolio
 * con galería circular interactiva y tarjetas detalladas.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isSpanish - Determina si el contenido está en español
 * @returns {JSX.Element} Sección Projects renderizada
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

import PropTypes from 'prop-types';
import CircularGallery from './CircularGallery';
import { ProjectCard } from './ProjectCard';
import './Projects.css';

// Importar iconos de tecnologías
import reactIcon from '../../assets/images/devicons/frameworks/react-original.svg';
import html5Icon from '../../assets/images/devicons/lenguajes/html5-original.svg';
import css3Icon from '../../assets/images/devicons/lenguajes/css3-original.svg';
import javascriptIcon from '../../assets/images/devicons/lenguajes/javascript-original.svg';
import viteIcon from '../../assets/images/devicons/frameworks/vitejs-original.svg';
import javaIcon from '../../assets/images/devicons/lenguajes/java-original.svg';
import mavenIcon from '../../assets/images/devicons/servidores/maven-original.svg';
import postmanIcon from '../../assets/images/devicons/frameworks/postman-original.svg';
import gitIcon from '../../assets/images/devicons/controlversiones/git-original.svg';
import bootstrapIcon from '../../assets/images/devicons/frameworks/bootstrap-original.svg';

// Datos de proyectos de ejemplo
const projectsData = [
  {
    id: 1,
    title: {
      es: "TCN Pagina Web",
      en: "TCN Website"
    },
    description: {
      es: "Pagina web de territorio centro de negocios, responsiva y compatible para todos los ordenadores",
      en: "Territorio Centro de Negocios website, responsive and compatible for all computers"
    },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    alt: {
      es: "Captura de pantalla de la pagina web TCN",
      en: "TCN webppage screenshot"
    },
    technologies: [
      { name: "React", icon: reactIcon },
      { name: "HTML", icon: html5Icon },
      { name: "CSS", icon: css3Icon },
      { name: "JavaScript", icon: javascriptIcon },
      { name: "Vite", icon: viteIcon }
    ],
    githubUrl: "https://github.com/Ospina115/Territorio-centro-de-negocios",
    liveUrl: "https://territoriocentrodenegocios.netlify.app/",
    features: {
      es: [
        "Pagina interactiva",
        "Diseño responsivo",
        "Optimización",
        "Arquitectura escalable",
        "Diseño moderno"
      ],
      en: [
        "Interactive page",
        "Responsive design",
        "Optimization",
        "Scalable architecture",
        "Modern design"
      ]
    }
  },
  {
    id: 2,
    title: {
      es: "API REST con JWT",
      en: "API REST with JWT"
    },
    description: {
      es: "API REST desarrollada con Spring Boot que implementa autenticación mediante JSON Web Tokens con expiración configurable",
      en: "REST API developed with Spring Boot that implements authentication using JSON Web Tokens with configurable expiration."
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    alt: {
      es: "Captura del resultado de la consulta",
      en: "Screenshot of the query result"
    },
    technologies: [
      { name: "Java", icon: javaIcon },
      { name: "Maven", icon: mavenIcon },
      { name: "Postman", icon: postmanIcon },
      { name: "Git", icon: gitIcon}
    ],
    githubUrl: "https://github.com/Ospina115/JWT-SpringBoot",
    features: {
      es: [
        "Autenticación JWT",
        "Autorización por Roles",
        "Configuración Externa",
        "API RESTful",
        "Seguridad Stateless",
        "Documentación Completa"
      ],
      en: [
        "JWT Authentication",
        "Role-based Authorization",
        "External Configuration",
        "RESTful API",
        "Stateless Security",
        "Complete Documentation"
      ]
    }
  },
  {
    id: 3,
    title: {
      es: "App de Tareas",
      en: "Task Management App"
    },
    description: {
      es: "Aplicación de gestión de tareas con colaboración en tiempo real",
      en: "Task management application with real-time collaboration"
    },
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    alt: {
      es: "Interfaz de la app de tareas",
      en: "Task app interface"
    },
    technologies: [
      { name: "JavaScript", icon: javascriptIcon },
      { name: "HTML5", icon: html5Icon },
      { name: "CSS3", icon: css3Icon },
      { name: "Bootstrap", icon: bootstrapIcon }
    ],
    githubUrl: "https://github.com/tuusuario/task-manager",
    liveUrl: "https://tu-tasks-demo.vercel.app",
    features: {
      es: [
        "Colaboración en tiempo real",
        "Notificaciones push",
        "Drag & drop",
        "Sincronización offline",
        "Equipos y permisos"
      ],
      en: [
        "Real-time collaboration",
        "Push notifications",
        "Drag & drop",
        "Offline sync",
        "Teams and permissions"
      ]
    }
  },
  {
    id: 4,
    title: {
      es: "Portafolio Interactivo",
      en: "Interactive Portfolio"
    },
    description: {
      es: "Portafolio personal con animaciones 3D y efectos visuales",
      en: "Personal portfolio with 3D animations and visual effects"
    },
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    alt: {
      es: "Vista del portafolio interactivo",
      en: "Interactive portfolio view"
    },
    technologies: [
      { name: "React", icon: reactIcon },
      { name: "JavaScript", icon: javascriptIcon },
      { name: "Vite", icon: viteIcon },
      { name: "CSS3", icon: css3Icon }
    ],
    githubUrl: "https://github.com/tuusuario/portfolio-3d",
    liveUrl: "https://tu-portfolio-demo.vercel.app",
    features: {
      es: [
        "Animaciones 3D",
        "Efectos de partículas",
        "Scroll parallax",
        "Transiciones suaves",
        "Optimización de rendimiento"
      ],
      en: [
        "3D animations",
        "Particle effects",
        "Parallax scrolling",
        "Smooth transitions",
        "Performance optimization"
      ]
    }
  }
];

export function Projects({ isSpanish }) {
  return (
    <section className="projects" id="projects" aria-label={isSpanish ? "Sección de proyectos" : "Projects section"}>
      <div className="projects-container">
        <header className="projects-header">
          <h2 className="projects-title">
            {isSpanish ? "Mis Proyectos" : "My Projects"}
          </h2>
          <p className="projects-subtitle">
            {isSpanish 
              ? "Explora mi trabajo y las tecnologías que utilizo" 
              : "Explore my work and the technologies I use"
            }
          </p>
        </header>

        <div className="gallery-section">
          <div className="gallery-container">
            <CircularGallery
              items={projectsData}
              bend={3}
              CardComponent={ProjectCard}
              isSpanish={isSpanish}
              scrollSpeed={2}
              scrollEase={0.05}
            />
          </div>
        </div>


      </div>
    </section>
  );
}

Projects.propTypes = {
  isSpanish: PropTypes.bool.isRequired,
};