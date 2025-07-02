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
  // Mapeo de iconos a sus rutas de archivos reales (solo iconos que existen)
  const iconMappings = {
    // Lenguajes de Programación
    'devicon-java-plain': 'lenguajes/java-original.svg',
    'devicon-javascript-plain': 'lenguajes/javascript-original.svg',
    'devicon-html5-plain': 'lenguajes/html5-original.svg',
    'devicon-css3-plain': 'lenguajes/css3-original.svg',
    'devicon-python-plain': 'lenguajes/python-original.svg',
    'devicon-powershell-plain': 'lenguajes/powershell-original.svg',

    // Hosting / SaaS
    'devicon-azure-plain': 'hosting/azure-original.svg',
    'devicon-netlify-plain': 'hosting/netlify-original.svg',
    'devicon-github-original': 'hosting/github-original.svg',
    'devicon-vercel-original': 'hosting/vercel-original.svg',
    'devicon-googlecloud-plain': 'hosting/googlecloud-original.svg',

    // Frameworks, Plataformas y Librerías (solo los que existen)
    'devicon-react-original': 'frameworks/react-original.svg',
    'devicon-nodejs-plain': 'frameworks/nodejs-original.svg',
    'devicon-vitejs-plain': 'frameworks/vitejs-original.svg',
    'devicon-bootstrap-plain': 'frameworks/bootstrap-original.svg',
    'devicon-fastapi-plain': 'frameworks/fastapi-original.svg',
    'devicon-insomnia-plain': 'frameworks/insomnia-original.svg',
    'devicon-json-plain': 'frameworks/json-original.svg',
    'devicon-npm-original-wordmark': 'frameworks/npm-original-wordmark.svg',
    'devicon-tailwindcss-original': 'frameworks/tailwindcss-original.svg',
    'devicon-postman-plain': 'frameworks/postman-original.svg', // Icono adicional encontrado

    // Servidores
    'devicon-apache-plain': 'servidores/apache-original.svg',
    'devicon-maven-plain': 'servidores/maven-original.svg',
    'devicon-tomcat-line': 'servidores/tomcat-original.svg',

    // Diseño
    'devicon-aftereffects-plain': 'diseño/aftereffects-original.svg',
    'devicon-illustrator-plain': 'diseño/illustrator-line.svg',
    'devicon-photoshop-plain': 'diseño/photoshop-original.svg',
    'devicon-canva-original': 'diseño/canva-original.svg',
    'devicon-figma-plain': 'diseño/figma-original.svg', // Icono adicional encontrado

    // Control de Versiones
    'devicon-git-plain': 'controlversiones/git-original.svg',
    'devicon-github-original': 'controlversiones/github-original.svg', // También está en control de versiones
    'devicon-githubcodespaces-plain': 'controlversiones/githubcodespaces-original.svg',
    'devicon-gitlab-plain': 'controlversiones/gitlab-original.svg', // Icono adicional encontrado

    // Bases de datos
    'devicon-mysql-original': 'basesdedatos/mysql-original.svg',
    'devicon-postgresql-plain': 'basesdedatos/postgresql-original.svg',
    'devicon-mongodb-plain': 'basesdedatos/mongodb-original.svg',
    'devicon-hibernate-plain': 'basesdedatos/hibernate-original.svg',
    'devicon-oracle-plain': 'basesdedatos/oracle-original.svg', // Icono adicional encontrado
  };

  const filePath = iconMappings[iconClass];
  if (filePath) {
    return `/src/assets/images/devicons/${filePath}`;
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
