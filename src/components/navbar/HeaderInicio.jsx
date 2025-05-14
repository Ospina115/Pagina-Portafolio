import './headerInicio.css';
import englishIcon from '/src/assets/images/icons/english.png';
import spanishIcon from '/src/assets/images/icons/spanish.png';
import logo from '/src/assets/images/icons/coding.png';

const menuItems = [
  { id: 'Home', href: '#inicio', labelEs: 'Inicio', labelEn: 'Home', iconPath: '/src/assets/images/icons/home.svg' },
  { id: 'About', href: '#info', labelEs: 'Sobre Mi', labelEn: 'About', iconPath: '/src/assets/images/icons/smile.svg' },
  { id: 'Menu', href: '#habilidades', labelEs: 'Habilidades', labelEn: 'Skills', iconPath: '/src/assets/images/icons/english.svg' },
  { id: 'Service', href: '#proyectos', labelEs: 'Proyectos', labelEn: 'Projects', iconPath: '/src/assets/images/icons/folder.svg' },
  { id: 'Contact', href: '#contacto', labelEs: 'Contacto', labelEn: 'Contact', iconPath: '/src/assets/images/icons/user.svg' },
];

function MenuItem({ id, href, label, iconPath }) {
  return (
    <li id={id}>
      <a href={href}>
        <span>{label}</span>
        <span>
          <img
            src={iconPath}
            alt={label}
            aria-hidden="true"
            style={{ width: '20px', height: '20px', filter: 'invert(1)' }}
          />
        </span>
      </a>
    </li>
  );
}

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

export function HeaderInicio({ isSpanish, toggleLanguage }) {
  return (
    <header>
      <img className="logo" src={logo} alt="logo" />
      <nav>
        <ul className="menu" data-animation="to-top">
          {menuItems.map(({ id, href, labelEs, labelEn, iconPath }) => (
            <MenuItem
              key={id}
              id={id}
              href={href}
              label={isSpanish ? labelEs : labelEn}
              iconPath={iconPath}
            />
          ))}
        </ul>
      </nav>
      <LanguageToggle isSpanish={isSpanish} toggleLanguage={toggleLanguage} />
    </header>
  );
}