import './headerInicio.css'; // Assuming you have a CSS file for styles

const menuItems = [
  { id: 'Home', href: '#inicio', labelEs: 'Inicio', labelEn: 'Home' },
  { id: 'About', href: '#info', labelEs: 'Sobre Mi', labelEn: 'About' },
  { id: 'Menu', href: '#habilidades', labelEs: 'Habilidades', labelEn: 'Skills' },
  { id: 'Service', href: '#proyectos', labelEs: 'Proyectos', labelEn: 'Projects' },
  { id: 'Contact', href: '#contacto', labelEs: 'Contacto', labelEn: 'Contact' },
];

function MenuItem({ id, href, label, iconClass }) {
  return (
    <li id={id}>
      <a href={href}>
        <span>{label}</span>
        <span>
          <i className={iconClass} aria-hidden="true"></i>
        </span>
      </a>
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
      <img className="logo" src="src/assets/images/icons/coding.png" alt="logo" />
      <nav>
        <ul className="menu" data-animation="to-top">
          {menuItems.map(({ id, href, labelEs, labelEn }, index) => (
            <MenuItem
              key={id}
              id={id}
              href={href}
              label={isSpanish ? labelEs : labelEn}
              iconClass={`fas ${['fa-address-card', 'fa-tasks', 'fa-users', 'fa-envelope-open-text'][index]}`}
            />
          ))}
        </ul>
      </nav>
      <LanguageToggle isSpanish={isSpanish} toggleLanguage={toggleLanguage} />
    </header>
  );
}