import React from 'react';

const menuItems = [
  { id: 'Home', href: '#inicio', labelEs: 'Inicio', labelEn: 'Home' },
  { id: 'About', href: '#info', labelEs: 'Sobre Mi', labelEn: 'About' },
  { id: 'Menu', href: '#habilidades', labelEs: 'Habilidades', labelEn: 'Skills' },
  { id: 'Service', href: '#proyectos', labelEs: 'Proyectos', labelEn: 'Projects' },
  { id: 'Contact', href: '#contacto', labelEs: 'Contacto', labelEn: 'Contact' },
];

function MenuItem({ id, href, label, isSpanish }) {
  return (
    <li id={id}>
      <a href={href}>{label}</a>
    </li>
  );
}

function LanguageToggle({ isSpanish, toggleLanguage }) {
  const src = isSpanish
    ? 'src/assets/images/icons/spanish.png'
    : 'src/assets/images/icons/english.png';
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

export function HeaderInicio({ isSpanish, toggleLanguage }) {
  return (
    <header>
      <img src="" alt="logo" />
      <nav>
        <ul className="menu">
          {menuItems.map(({ id, href, labelEs, labelEn }) => (
            <MenuItem
              key={id}
              id={id}
              href={href}
              label={isSpanish ? labelEs : labelEn}
              isSpanish={isSpanish}
            />
          ))}
        </ul>
      </nav>
      <LanguageToggle isSpanish={isSpanish} toggleLanguage={toggleLanguage} />
    </header>
  );
}
