import InfiniteMenu from './InfiniteMenu';
import './SkillsInfiniteMenu.css';
import { getIconImageUrl, getTechName, techDocumentationLinks } from './skillsUtils';

const skillData = [
  {
    key: 'lenguajes',
    titleEs: 'Lenguajes de Programacion',
    titleEn: 'Programming languages',
    iconSrc: 'src/assets/images/skills/laptop.png',
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
    iconSrc: 'src/assets/images/skills/satelite.png',
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
    iconSrc: 'src/assets/images/skills/libros.png',
    icons: [
      'devicon-react-original',
      'devicon-nodejs-plain',
      'devicon-vitejs-plain',
      'devicon-angularjs-plain',
      'devicon-bootstrap-plain',
      'devicon-django-plain',
      'devicon-fastapi-plain',
      'devicon-insomnia-plain',
      'devicon-jquery-plain',
      'devicon-json-plain',
      'devicon-npm-original-wordmark',
      'devicon-tailwindcss-original',
    ],
  },
  {
    key: 'servers',
    titleEs: 'Servidores',
    titleEn: 'Servers',
    iconSrc: 'src/assets/images/skills/señal.png',
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
    iconSrc: 'src/assets/images/skills/brocha.png',
    icons: [
      'devicon-aftereffects-plain',
      'devicon-illustrator-plain',
      'devicon-photoshop-plain',
      'devicon-canva-original',
    ],
  },
  {
    key: 'versions',
    titleEs: 'Control de Versiones',
    titleEn: 'CI/CD VCS',
    iconSrc: 'src/assets/images/skills/disquete.png',
    icons: [
      'devicon-github-original',
      'devicon-git-plain',
      'devicon-githubcodespaces-plain',
    ],
  },
  {
    key: 'bases-de-datos',
    titleEs: 'Bases de datos',
    titleEn: 'Databases',
    iconSrc: 'src/assets/images/skills/archivos.png',
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
      <h1 className="skills-main-title">{isSpanish ? "Habilidades" : "Skills"}</h1>
      
      <div className="skills-grid">
        {skillData.map((group, index) => (
          <div 
            key={group.key} 
            className={`skill-group-container ${index === 0 ? 'skill-group-featured' : ''}`}
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
