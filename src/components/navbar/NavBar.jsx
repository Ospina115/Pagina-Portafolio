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

const menuItems = [
  { id: 'Home', href: '#inicio', labelEs: 'Inicio', labelEn: 'Home', iconPath: HomeIcon },
  { id: 'About', href: '#info', labelEs: 'Sobre Mi', labelEn: 'About', iconPath: SmileIcon },
  { id: 'Menu', href: '#habilidades', labelEs: 'Habilidades', labelEn: 'Skills', iconPath: BrainIcon },
  { id: 'Service', href: '#proyectos', labelEs: 'Proyectos', labelEn: 'Projects', iconPath: FolderIcon },
  { id: 'Contact', href: '#contacto', labelEs: 'Contacto', labelEn: 'Contact', iconPath: UserIcon },
];



function LanguageToggle({ isSpanish, toggleLanguage }) {
  const src = isSpanish ? spanishIcon : englishIcon;
  return (
    <img
      id="boton-cambiar-idioma"
      data-lang-image
      src={src}
      alt="Idioma"
      onClick={toggleLanguage}
      style={{ cursor: 'pointer' }}
    />
  );
}

export function NavBar({ isSpanish, toggleLanguage }) {
  // Adaptar los items para Dock
  const dockItems = menuItems.map(({ id, href, labelEs, labelEn, iconPath }) => ({
    icon: <img src={iconPath} alt={isSpanish ? labelEs : labelEn} style={{ width: 32, height: 32, filter: 'invert(1)' }} />, // SVG como img
    label: isSpanish ? labelEs : labelEn,
    onClick: () => { window.location.hash = href; },
    className: id
  }));
  return (
    <header>
      <img className="logo" src={logo} alt="logo" />
      <nav>
        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </nav>
      <LanguageToggle isSpanish={isSpanish} toggleLanguage={toggleLanguage} />
    </header>
  );
}