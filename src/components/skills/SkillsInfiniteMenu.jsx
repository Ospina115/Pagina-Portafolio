import InfiniteMenu from './InfiniteMenu';
import './SkillsInfiniteMenu.css';
import { getIconImageUrl, getTechName, techDocumentationLinks } from './skillsUtils';

// Importar todas las imágenes de skills
import laptopIcon from '../../assets/images/skills/laptop.png';
import sateliteIcon from '../../assets/images/skills/satelite.png';
import librosIcon from '../../assets/images/skills/libros.png';
import senalIcon from '../../assets/images/skills/señal.png';
import brochaIcon from '../../assets/images/skills/brocha.png';
import disqueteIcon from '../../assets/images/skills/disquete.png';
import archivosIcon from '../../assets/images/skills/archivos.png';

const skillData = [
  {
    key: 'lenguajes',
    titleEs: 'Lenguajes de Programacion',
    titleEn: 'Programming languages',
    iconSrc: laptopIcon,
    icons: [
      'devicon-java-plain',
      'devicon-javascript-plain',
      'devicon-html5-plain',
      'devicon-css3-plain',
      'devicon-python-plain',
      'devicon-powershell-plain',
    ],
  },
  {
    key: 'hosting',
    titleEs: 'Hosting / SaaS',
    titleEn: 'Hosting / SaaS',
    iconSrc: sateliteIcon,
    icons: [
      'devicon-azure-plain',
      'devicon-netlify-plain',
      'devicon-github-original',
      'devicon-vercel-original',
      'devicon-googlecloud-plain',
    ],
  },
  {
    key: 'frameworks',
    titleEs: 'Frameworks, Plataformas y Librerias',
    titleEn: 'Frameworks, Platforms & Libraries',
    iconSrc: librosIcon,
    icons: [
      'devicon-react-original',
      'devicon-nodejs-plain',
      'devicon-vitejs-plain',
      'devicon-bootstrap-plain',
      'devicon-fastapi-plain',
      'devicon-insomnia-plain',
      'devicon-json-plain',
      'devicon-npm-original-wordmark',
      'devicon-tailwindcss-original',
    ],
  },
  {
    key: 'servers',
    titleEs: 'Servidores',
    titleEn: 'Servers',
    iconSrc: senalIcon,
    icons: [
      'devicon-apache-plain',
      'devicon-maven-plain',
      'devicon-tomcat-line',
    ],
  },
  {
    key: 'design',
    titleEs: 'Diseño',
    titleEn: 'Design',
    iconSrc: brochaIcon,
    icons: [
      'devicon-aftereffects-plain',
      'devicon-illustrator-plain',
      'devicon-photoshop-plain',
      'devicon-canva-original',
      'devicon-figma-plain',
    ],
  },
  {
    key: 'versions',
    titleEs: 'Control de Versiones',
    titleEn: 'CI/CD VCS',
    iconSrc: disqueteIcon,
    icons: [
      'devicon-git-plain',
      'devicon-github-original',
      'devicon-githubcodespaces-plain',
      'devicon-gitlab-plain',
    ],
  },
  {
    key: 'bases-de-datos',
    titleEs: 'Bases de datos',
    titleEn: 'Databases',
    iconSrc: archivosIcon,
    icons: [
      'devicon-mysql-original',
      'devicon-postgresql-plain',
      'devicon-mongodb-plain',
      'devicon-hibernate-plain',
    ],
  },
];

// Función para preparar los items para el InfiniteMenu
const prepareMenuItems = (group) => {
  return group.icons.map(iconClass => ({
    image: getIconImageUrl(iconClass),
    link: techDocumentationLinks[iconClass] || '#',
    title: getTechName(iconClass),
    description: `Documentación oficial de ${getTechName(iconClass)}`
  }));
};

export function SkillsInfiniteMenu({ isSpanish }) {
  return (
    <section className="skills-infinite-menu" id="skills" aria-label={isSpanish ? "Sección de habilidades" : "Skills section"}>
      <div className="skills-grid">
        {/* Título y descripción - ocupan las primeras 2 columnas de la primera fila */}
        <div className="skills-header">
          <h1 className="skills-main-title">{isSpanish ? "Habilidades" : "Skills"}</h1>
          <p className="skills-description">
            {isSpanish 
              ? "Estas son las tecnologías y herramientas con las que trabajo para crear soluciones digitales innovadoras." 
              : "These are the technologies and tools I work with to create innovative digital solutions."
            }
          </p>
        </div>
        
        {/* Lenguajes de programación - tercera columna de la primera fila */}
        <div className="skill-group-container skill-group-featured">
          <div className="skill-group-header">
            <img src={skillData[0].iconSrc} alt="" className="skill-group-icon" />
            <h2 className="skill-group-title">
              {isSpanish ? skillData[0].titleEs : skillData[0].titleEn}
            </h2>
          </div>
          <div className="infinite-menu-container">
            <InfiniteMenu items={prepareMenuItems(skillData[0])} />
          </div>
        </div>

        {/* Resto de grupos de tecnologías - una columna cada uno */}
        {skillData.slice(1).map((group) => (
          <div 
            key={group.key} 
            className="skill-group-container"
          >
            <div className="skill-group-header">
              <img src={group.iconSrc} alt="" className="skill-group-icon" />
              <h2 className="skill-group-title">
                {isSpanish ? group.titleEs : group.titleEn}
              </h2>
            </div>
            
            <div className="infinite-menu-container">
              <InfiniteMenu items={prepareMenuItems(group)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
