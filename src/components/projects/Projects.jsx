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

// Datos de proyectos de ejemplo
const projectsData = [
  {
    id: 1,
    title: {
      es: "E-Commerce Moderno",
      en: "Modern E-Commerce"
    },
    description: {
      es: "Plataforma de comercio electrónico con React, Node.js y MongoDB",
      en: "E-commerce platform built with React, Node.js and MongoDB"
    },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    alt: {
      es: "Captura de pantalla del e-commerce",
      en: "E-commerce screenshot"
    },
    technologies: [
      { name: "React", icon: "/src/assets/images/devicons/frameworks/react-original.svg" },
      { name: "Node.js", icon: "/src/assets/images/devicons/frameworks/nodejs-original.svg" },
      { name: "MongoDB", icon: "/src/assets/images/devicons/basesdedatos/mongodb-original.svg" },
      { name: "JavaScript", icon: "/src/assets/images/devicons/lenguajes/javascript-original.svg" }
    ],
    githubUrl: "https://github.com/tuusuario/ecommerce-project",
    liveUrl: "https://tu-ecommerce-demo.vercel.app",
    features: {
      es: [
        "Carrito de compras interactivo",
        "Sistema de autenticación",
        "Panel de administración",
        "Pagos con Stripe",
        "Responsive design"
      ],
      en: [
        "Interactive shopping cart",
        "Authentication system",
        "Admin dashboard",
        "Stripe payments",
        "Responsive design"
      ]
    }
  },
  {
    id: 2,
    title: {
      es: "Dashboard Analítico",
      en: "Analytics Dashboard"
    },
    description: {
      es: "Dashboard interactivo para visualización de datos con gráficos dinámicos",
      en: "Interactive dashboard for data visualization with dynamic charts"
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    alt: {
      es: "Captura del dashboard analítico",
      en: "Analytics dashboard screenshot"
    },
    technologies: [
      { name: "React", icon: "/src/assets/images/devicons/frameworks/react-original.svg" },
      { name: "JavaScript", icon: "/src/assets/images/devicons/lenguajes/javascript-original.svg" },
      { name: "HTML5", icon: "/src/assets/images/devicons/lenguajes/html5-original.svg" },
      { name: "CSS3", icon: "/src/assets/images/devicons/lenguajes/css3-original.svg" }
    ],
    githubUrl: "https://github.com/tuusuario/analytics-dashboard",
    liveUrl: "https://tu-dashboard-demo.vercel.app",
    features: {
      es: [
        "Gráficos interactivos",
        "Filtros en tiempo real",
        "Exportación a PDF",
        "Modo oscuro/claro",
        "API RESTful"
      ],
      en: [
        "Interactive charts",
        "Real-time filters",
        "PDF export",
        "Dark/light mode",
        "RESTful API"
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
      { name: "JavaScript", icon: "/src/assets/images/devicons/lenguajes/javascript-original.svg" },
      { name: "HTML5", icon: "/src/assets/images/devicons/lenguajes/html5-original.svg" },
      { name: "CSS3", icon: "/src/assets/images/devicons/lenguajes/css3-original.svg" },
      { name: "Bootstrap", icon: "/src/assets/images/devicons/frameworks/bootstrap-original.svg" }
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
      { name: "React", icon: "/src/assets/images/devicons/frameworks/react-original.svg" },
      { name: "JavaScript", icon: "/src/assets/images/devicons/lenguajes/javascript-original.svg" },
      { name: "Vite", icon: "/src/assets/images/devicons/frameworks/vitejs-original.svg" },
      { name: "CSS3", icon: "/src/assets/images/devicons/lenguajes/css3-original.svg" }
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

        <div className="projects-cta">
          <p className="cta-text">
            {isSpanish 
              ? "¿Te interesa colaborar en un proyecto?" 
              : "Interested in collaborating on a project?"
            }
          </p>
          <a 
            href="#contact" 
            className="cta-button"
            aria-label={isSpanish ? "Ir a la sección de contacto" : "Go to contact section"}
          >
            {isSpanish ? "Contáctame" : "Contact Me"}
          </a>
        </div>
      </div>
    </section>
  );
}

Projects.propTypes = {
  isSpanish: PropTypes.bool.isRequired,
};