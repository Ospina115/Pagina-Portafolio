/**
 * ScrollIndicator.jsx - Componente indicador de scroll
 * 
 * Proporciona indicadores visuales del progreso de scroll y la sección actual.
 * Se integra con Lenis para mostrar información en tiempo real.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isSpanish - Determina el idioma de las etiquetas
 * @returns {JSX.Element} Indicador de scroll renderizado
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

import { useEffect, useState } from 'react';
import { useLenisScroll } from '../../hooks/useLenisScroll.js';
import './ScrollIndicator.css';

export function ScrollIndicator({ isSpanish }) {
  const [currentSection, setCurrentSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { lenis } = useLenisScroll({ enableScrollSpy: true });

  const sections = [
    { id: 'home', labelEs: 'Inicio', labelEn: 'Home' },
    { id: 'about', labelEs: 'Acerca', labelEn: 'About' },
    { id: 'skills', labelEs: 'Habilidades', labelEn: 'Skills' },
    { id: 'projects', labelEs: 'Proyectos', labelEn: 'Projects' },
    { id: 'contact', labelEs: 'Contacto', labelEn: 'Contact' }
  ];

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = ({ scroll, limit }) => {
      // Actualizar progreso de scroll
      const progress = Math.min(scroll / limit, 1);
      setScrollProgress(progress);

      // Detectar sección actual
      const windowHeight = window.innerHeight;
      const scrollPosition = scroll + windowHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const elementTop = scroll + rect.top;
        const elementBottom = elementTop + element.offsetHeight;

        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          setCurrentSection(section.id);
          break;
        }
      }
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenis]);

  // Manejar cambios de sección por eventos personalizados
  useEffect(() => {
    const handleSectionChange = (event) => {
      setCurrentSection(event.detail.section);
    };

    window.addEventListener('sectionChange', handleSectionChange);

    return () => {
      window.removeEventListener('sectionChange', handleSectionChange);
    };
  }, []);

  return (
    <div className="scroll-indicator" aria-label={isSpanish ? "Indicador de navegación" : "Navigation indicator"}>
      {/* Progreso de scroll */}
      <div className="scroll-progress">
        <div 
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress * 100}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress * 100)}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={isSpanish ? "Progreso de scroll" : "Scroll progress"}
        />
      </div>
    </div>
  );
}
