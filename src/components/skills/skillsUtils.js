// Importar todos los iconos de tecnologías
// Lenguajes
import javaIcon from '../../assets/images/devicons/lenguajes/java-original.svg';
import javascriptIcon from '../../assets/images/devicons/lenguajes/javascript-original.svg';
import html5Icon from '../../assets/images/devicons/lenguajes/html5-original.svg';
import css3Icon from '../../assets/images/devicons/lenguajes/css3-original.svg';
import pythonIcon from '../../assets/images/devicons/lenguajes/python-original.svg';
import powershellIcon from '../../assets/images/devicons/lenguajes/powershell-original.svg';

// Hosting
import azureIcon from '../../assets/images/devicons/hosting/azure-original.svg';
import netlifyIcon from '../../assets/images/devicons/hosting/netlify-original.svg';
import githubIcon from '../../assets/images/devicons/hosting/github-original.svg';
import vercelIcon from '../../assets/images/devicons/hosting/vercel-original.svg';
import googlecloudIcon from '../../assets/images/devicons/hosting/googlecloud-original.svg';

// Frameworks
import reactIcon from '../../assets/images/devicons/frameworks/react-original.svg';
import nodejsIcon from '../../assets/images/devicons/frameworks/nodejs-original.svg';
import vitejsIcon from '../../assets/images/devicons/frameworks/vitejs-original.svg';
import bootstrapIcon from '../../assets/images/devicons/frameworks/bootstrap-original.svg';
import fastapiIcon from '../../assets/images/devicons/frameworks/fastapi-original.svg';
import insomniaIcon from '../../assets/images/devicons/frameworks/insomnia-original.svg';
import jsonIcon from '../../assets/images/devicons/frameworks/json-original.svg';
import npmIcon from '../../assets/images/devicons/frameworks/npm-original-wordmark.svg';
import tailwindcssIcon from '../../assets/images/devicons/frameworks/tailwindcss-original.svg';
import postmanIcon from '../../assets/images/devicons/frameworks/postman-original.svg';

// Servidores
import apacheIcon from '../../assets/images/devicons/servidores/apache-original.svg';
import mavenIcon from '../../assets/images/devicons/servidores/maven-original.svg';
import tomcatIcon from '../../assets/images/devicons/servidores/tomcat-original.svg';

// Diseño
import aftereffectsIcon from '../../assets/images/devicons/diseño/aftereffects-original.svg';
import illustratorIcon from '../../assets/images/devicons/diseño/illustrator-line.svg';
import photoshopIcon from '../../assets/images/devicons/diseño/photoshop-original.svg';
import canvaIcon from '../../assets/images/devicons/diseño/canva-original.svg';
import figmaIcon from '../../assets/images/devicons/diseño/figma-original.svg';

// Control de versiones
import gitIcon from '../../assets/images/devicons/controlversiones/git-original.svg';
import githubVcsIcon from '../../assets/images/devicons/controlversiones/github-original.svg';
import githubcodespacesIcon from '../../assets/images/devicons/controlversiones/githubcodespaces-original.svg';
import gitlabIcon from '../../assets/images/devicons/controlversiones/gitlab-original.svg';

// Bases de datos
import mysqlIcon from '../../assets/images/devicons/basesdedatos/mysql-original.svg';
import postgresqlIcon from '../../assets/images/devicons/basesdedatos/postgresql-original.svg';
import mongodbIcon from '../../assets/images/devicons/basesdedatos/mongodb-original.svg';
import hibernateIcon from '../../assets/images/devicons/basesdedatos/hibernate-original.svg';
import oracleIcon from '../../assets/images/devicons/basesdedatos/oracle-original.svg';

// Mapeo de tecnologías a sus documentaciones oficiales
export const techDocumentationLinks = {
  // Lenguajes de Programación
  'devicon-java-plain': 'https://docs.oracle.com/en/java/',
  'devicon-javascript-plain': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'devicon-html5-plain': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  'devicon-css3-plain': 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  'devicon-python-plain': 'https://docs.python.org/3/',
  'devicon-powershell-plain': 'https://docs.microsoft.com/en-us/powershell/',

  // Hosting / SaaS
  'devicon-azure-plain': 'https://docs.microsoft.com/en-us/azure/',
  'devicon-netlify-plain': 'https://docs.netlify.com/',
  'devicon-github-original': 'https://docs.github.com/',
  'devicon-vercel-original': 'https://vercel.com/docs',
  'devicon-googlecloud-plain': 'https://cloud.google.com/docs',

  // Frameworks, Plataformas y Librerías
  'devicon-react-original': 'https://react.dev/',
  'devicon-nodejs-plain': 'https://nodejs.org/en/docs/',
  'devicon-vitejs-plain': 'https://vitejs.dev/',
  'devicon-bootstrap-plain': 'https://getbootstrap.com/docs/',
  'devicon-fastapi-plain': 'https://fastapi.tiangolo.com/',
  'devicon-insomnia-plain': 'https://docs.insomnia.rest/',
  'devicon-json-plain': 'https://www.json.org/',
  'devicon-npm-original-wordmark': 'https://docs.npmjs.com/',
  'devicon-tailwindcss-original': 'https://tailwindcss.com/docs',
  'devicon-postman-plain': 'https://learning.postman.com/docs/',

  // Servidores
  'devicon-apache-plain': 'https://httpd.apache.org/docs/',
  'devicon-maven-plain': 'https://maven.apache.org/guides/',
  'devicon-tomcat-line': 'https://tomcat.apache.org/tomcat-9.0-doc/',

  // Diseño
  'devicon-aftereffects-plain': 'https://helpx.adobe.com/after-effects.html',
  'devicon-illustrator-plain': 'https://helpx.adobe.com/illustrator.html',
  'devicon-photoshop-plain': 'https://helpx.adobe.com/photoshop.html',
  'devicon-canva-original': 'https://www.canva.com/help/',
  'devicon-figma-plain': 'https://help.figma.com/',

  // Control de Versiones
  'devicon-git-plain': 'https://git-scm.com/doc',
  'devicon-githubcodespaces-plain': 'https://docs.github.com/en/codespaces',
  'devicon-gitlab-plain': 'https://docs.gitlab.com/',

  // Bases de datos
  'devicon-mysql-original': 'https://dev.mysql.com/doc/',
  'devicon-postgresql-plain': 'https://www.postgresql.org/docs/',
  'devicon-mongodb-plain': 'https://docs.mongodb.com/',
  'devicon-hibernate-plain': 'https://hibernate.org/orm/documentation/',
  'devicon-oracle-plain': 'https://docs.oracle.com/en/database/',
};

// Función para obtener el nombre limpio de la tecnología
export const getTechName = (iconClass) => {
  const techName = iconClass
    .replace('devicon-', '')
    .replace('-plain', '')
    .replace('-original', '')
    .replace('-line', '')
    .replace('-wordmark', '');
  
  // Casos especiales para nombres más descriptivos
  const specialCases = {
    'html5': 'HTML5',
    'css3': 'CSS3',
    'javascript': 'JavaScript',
    'nodejs': 'Node.js',
    'vitejs': 'Vite',
    'angularjs': 'Angular',
    'fastapi': 'FastAPI',
    'jquery': 'jQuery',
    'json': 'JSON',
    'npm': 'NPM',
    'tailwindcss': 'Tailwind CSS',
    'aftereffects': 'After Effects',
    'googlecloud': 'Google Cloud',
    'githubcodespaces': 'GitHub Codespaces',
    'postgresql': 'PostgreSQL',
    'mongodb': 'MongoDB',
    'powershell': 'PowerShell',
    'postman': 'Postman',
    'figma': 'Figma',
    'gitlab': 'GitLab',
    'oracle': 'Oracle'
  };

  return specialCases[techName] || techName.charAt(0).toUpperCase() + techName.slice(1);
};

// Función para convertir iconos devicon a URLs de imágenes
export const getIconImageUrl = (iconClass) => {
  // Mapeo de iconos a sus importaciones (solo iconos que existen)
  const iconMappings = {
    // Lenguajes de Programación
    'devicon-java-plain': javaIcon,
    'devicon-javascript-plain': javascriptIcon,
    'devicon-html5-plain': html5Icon,
    'devicon-css3-plain': css3Icon,
    'devicon-python-plain': pythonIcon,
    'devicon-powershell-plain': powershellIcon,

    // Hosting / SaaS
    'devicon-azure-plain': azureIcon,
    'devicon-netlify-plain': netlifyIcon,
    'devicon-github-original': githubIcon,
    'devicon-vercel-original': vercelIcon,
    'devicon-googlecloud-plain': googlecloudIcon,

    // Frameworks, Plataformas y Librerías
    'devicon-react-original': reactIcon,
    'devicon-nodejs-plain': nodejsIcon,
    'devicon-vitejs-plain': vitejsIcon,
    'devicon-bootstrap-plain': bootstrapIcon,
    'devicon-fastapi-plain': fastapiIcon,
    'devicon-insomnia-plain': insomniaIcon,
    'devicon-json-plain': jsonIcon,
    'devicon-npm-original-wordmark': npmIcon,
    'devicon-tailwindcss-original': tailwindcssIcon,
    'devicon-postman-plain': postmanIcon,

    // Servidores
    'devicon-apache-plain': apacheIcon,
    'devicon-maven-plain': mavenIcon,
    'devicon-tomcat-line': tomcatIcon,

    // Diseño
    'devicon-aftereffects-plain': aftereffectsIcon,
    'devicon-illustrator-plain': illustratorIcon,
    'devicon-photoshop-plain': photoshopIcon,
    'devicon-canva-original': canvaIcon,
    'devicon-figma-plain': figmaIcon,

    // Control de Versiones
    'devicon-git-plain': gitIcon,
    'devicon-githubcodespaces-plain': githubcodespacesIcon,
    'devicon-gitlab-plain': gitlabIcon,

    // Bases de datos
    'devicon-mysql-original': mysqlIcon,
    'devicon-postgresql-plain': postgresqlIcon,
    'devicon-mongodb-plain': mongodbIcon,
    'devicon-hibernate-plain': hibernateIcon,
    'devicon-oracle-plain': oracleIcon,
  };

  const iconSrc = iconMappings[iconClass];
  if (iconSrc) {
    return iconSrc;
  }
  
  // Fallback al CDN si no se encuentra el archivo local
  const techName = iconClass
    .replace('devicon-', '')
    .replace('-plain', '')
    .replace('-original', '')
    .replace('-line', '')
    .replace('-wordmark', '');
  
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techName}/${iconClass}.svg`;
};
