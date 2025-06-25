/**
 * NavBar.jsx - Componente de navegación principal
 * 
 * Barra de navegación con dock animado y soporte para smooth scrolling
 * mediante Lenis. Incluye toggle de idioma y navegación fluida entre secciones.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isSpanish - Determina si el contenido está en español
 * @param {Function} props.toggleLanguage - Función para cambiar el idioma
 * @returns {JSX.Element} Barra de navegación renderizada
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

import { useLenisScroll } from '../../hooks/useLenisScroll.js';
import './NavBar.css';

// ICONOS //
import logo from '/src/assets/images/icons/coding.png';
import englishIcon from '/src/assets/images/icons/english.png';
import spanishIcon from '/src/assets/images/icons/spanish.png';

// SVG //
import BrainIcon from '/src/assets/images/icons/brain.svg';
import FolderIcon from '/src/assets/images/icons/folder.svg';
import HomeIcon from '/src/assets/images/icons/home.svg';
import SmileIcon from '/src/assets/images/icons/smile.svg';
import UserIcon from '/src/assets/images/icons/user.svg';

import Dock from './Dock.jsx';

/**
 * Configuración de items del menú principal
 * Cada item incluye información de navegación y iconografía
 */
const menuItems = [
  { 
    id: 'Home', 
    sectionId: 'home',
    labelEs: 'Inicio', 
    labelEn: 'Home', 
    iconPath: HomeIcon 
  },
  { 
    id: 'About', 
    sectionId: 'about',
    labelEs: 'Sobre Mi', 
    labelEn: 'About', 
    iconPath: SmileIcon 
  },
  { 
    id: 'Skills', 
    sectionId: 'skills',
    labelEs: 'Habilidades', 
    labelEn: 'Skills', 
    iconPath: BrainIcon 
  },
  { 
    id: 'Projects', 
    sectionId: 'projects',
    labelEs: 'Proyectos', 
    labelEn: 'Projects', 
    iconPath: FolderIcon 
  },
  { 
    id: 'Contact', 
    sectionId: 'contact',
    labelEs: 'Contacto', 
    labelEn: 'Contact', 
    iconPath: UserIcon 
  },
];

/**
 * Componente para toggle de idioma
 * Permite alternar entre español e inglés
 */
function LanguageToggle({ isSpanish, toggleLanguage }) {
  const src = isSpanish ? spanishIcon : englishIcon;
  const altText = isSpanish ? 'Cambiar a inglés' : 'Switch to Spanish';
  
  return (
    <img
      id="boton-cambiar-idioma"
      data-lang-image
      src={src}
      alt={altText}
      onClick={toggleLanguage}
      style={{ 
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
    />
  );
}

export function NavBar({ isSpanish, toggleLanguage }) {
  // Hook para navegación con scroll suave
  const { scrollToSection } = useLenisScroll();

  /**
   * Adaptar los items del menú para el componente Dock
   * Incluye navegación con scroll suave usando Lenis
   */
  const dockItems = menuItems.map(({ id, sectionId, labelEs, labelEn, iconPath }) => ({
    icon: (
      <img 
        src={iconPath} 
        alt={isSpanish ? labelEs : labelEn} 
        style={{ 
          width: 32, 
          height: 32, 
          filter: 'invert(1)',
          transition: 'filter 0.2s ease'
        }} 
      />
    ),
    label: isSpanish ? labelEs : labelEn,
    onClick: () => {
      // Usar scroll suave de Lenis en lugar de cambiar hash
      scrollToSection(sectionId, {
        offset: -80,  // Compensar altura del navbar
        duration: 1.2, // Duración suave
        easing: (t) => 1 - Math.pow(1 - t, 3) // Easing cúbico suave
      });
    },
    className: id,
    'data-section': sectionId // Para identificación en CSS
  }));

  return (
    <header className="navbar-header">
      {/* Logo del portafolio */}
      <img 
        className="logo" 
        src={logo} 
        alt="Samuel Ospina Portfolio Logo"
        onClick={() => scrollToSection('home')} // Logo navega al inicio
        style={{ cursor: 'pointer' }}
      />
      
      {/* Navegación principal con Dock */}
      <nav className="main-navigation" role="navigation" aria-label="Navegación principal">
        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </nav>
      
      {/* Toggle de idioma */}
      <LanguageToggle isSpanish={isSpanish} toggleLanguage={toggleLanguage} />
    </header>
  );
}