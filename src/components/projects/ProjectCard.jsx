/**
 * ProjectCard.jsx - Componente de tarjeta de proyecto
 * 
 * Tarjeta que muestra información detallada de un proyecto individual
 * con diseño tipo ventana de terminal.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.project - Datos del proyecto
 * @param {boolean} props.isSpanish - Determina si el contenido está en español
 * @returns {JSX.Element} Tarjeta de proyecto renderizada
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import './ProjectCard.css';

export function ProjectCard({ project, isSpanish }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`project-card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className="card-inner">
        {/* Frente de la tarjeta */}
        <div className="card-front">
          <div className="card-header">
            <div className="window-controls">
              <span className="control red"></span>
              <span className="control yellow"></span>
              <span className="control green"></span>
            </div>
            <div className="window-title">
              {isSpanish ? project.title.es : project.title.en}
            </div>
          </div>
          <div className="card-content">
            <div className="project-image">
              <img 
                src={project.image} 
                alt={isSpanish ? project.alt.es : project.alt.en}
                loading="lazy"
              />
              <div className="image-overlay">
                <span className="view-details">
                  {isSpanish ? 'Ver detalles' : 'View details'}
                </span>
              </div>
            </div>
            <div className="project-info">
              <h3 className="project-title">
                {isSpanish ? project.title.es : project.title.en}
              </h3>
              <p className="project-description">
                {isSpanish ? project.description.es : project.description.en}
              </p>
            </div>
          </div>
        </div>

        {/* Reverso de la tarjeta */}
        <div className="card-back">
          <div className="card-header">
            <div className="window-controls">
              <span className="control red"></span>
              <span className="control yellow"></span>
              <span className="control green"></span>
            </div>
            <div className="window-title">
              {isSpanish ? 'Detalles del Proyecto' : 'Project Details'}
            </div>
          </div>
          <div className="card-content">
            <div className="tech-stack">
              <h4>{isSpanish ? 'Tecnologías' : 'Technologies'}</h4>
              <div className="tech-icons">
                {project.technologies.map((tech, index) => (
                  <div key={index} className="tech-item" title={tech.name}>
                    <img src={tech.icon} alt={tech.name} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="project-links">
              <h4>{isSpanish ? 'Enlaces' : 'Links'}</h4>
              <div className="links-container">
                {project.githubUrl && (
                  <button 
                    className="project-link github"
                    onClick={(e) => handleLinkClick(e, project.githubUrl)}
                    aria-label={isSpanish ? 'Ver código en GitHub' : 'View code on GitHub'}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>{isSpanish ? 'Código' : 'Code'}</span>
                  </button>
                )}
                
                {project.liveUrl && (
                  <button 
                    className="project-link live"
                    onClick={(e) => handleLinkClick(e, project.liveUrl)}
                    aria-label={isSpanish ? 'Ver proyecto en vivo' : 'View live project'}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                    </svg>
                    <span>{isSpanish ? 'Demo' : 'Live'}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="project-features">
              <h4>{isSpanish ? 'Características' : 'Features'}</h4>
              <ul>
                {(isSpanish ? project.features.es : project.features.en).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.shape({
      es: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.shape({
      es: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.shape({
      es: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired,
    }).isRequired,
    technologies: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    githubUrl: PropTypes.string,
    liveUrl: PropTypes.string,
    features: PropTypes.shape({
      es: PropTypes.arrayOf(PropTypes.string).isRequired,
      en: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
  isSpanish: PropTypes.bool.isRequired,
};
