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
  'devicon-angularjs-plain': 'https://angular.io/docs',
  'devicon-bootstrap-plain': 'https://getbootstrap.com/docs/',
  'devicon-django-plain': 'https://docs.djangoproject.com/',
  'devicon-fastapi-plain': 'https://fastapi.tiangolo.com/',
  'devicon-insomnia-plain': 'https://docs.insomnia.rest/',
  'devicon-jquery-plain': 'https://api.jquery.com/',
  'devicon-json-plain': 'https://www.json.org/',
  'devicon-npm-original-wordmark': 'https://docs.npmjs.com/',
  'devicon-tailwindcss-original': 'https://tailwindcss.com/docs',

  // Servidores
  'devicon-apache-plain': 'https://httpd.apache.org/docs/',
  'devicon-maven-plain': 'https://maven.apache.org/guides/',
  'devicon-tomcat-line': 'https://tomcat.apache.org/tomcat-9.0-doc/',

  // Diseño
  'devicon-aftereffects-plain': 'https://helpx.adobe.com/after-effects.html',
  'devicon-illustrator-plain': 'https://helpx.adobe.com/illustrator.html',
  'devicon-photoshop-plain': 'https://helpx.adobe.com/photoshop.html',
  'devicon-canva-original': 'https://www.canva.com/help/',

  // Control de Versiones
  'devicon-git-plain': 'https://git-scm.com/doc',
  'devicon-githubcodespaces-plain': 'https://docs.github.com/en/codespaces',

  // Bases de datos
  'devicon-mysql-original': 'https://dev.mysql.com/doc/',
  'devicon-postgresql-plain': 'https://www.postgresql.org/docs/',
  'devicon-mongodb-plain': 'https://docs.mongodb.com/',
  'devicon-hibernate-plain': 'https://hibernate.org/orm/documentation/',
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
    'powershell': 'PowerShell'
  };

  return specialCases[techName] || techName.charAt(0).toUpperCase() + techName.slice(1);
};

// Función para convertir iconos devicon a URLs de imágenes
export const getIconImageUrl = (iconClass) => {
  const techName = iconClass
    .replace('devicon-', '')
    .replace('-plain', '')
    .replace('-original', '')
    .replace('-line', '')
    .replace('-wordmark', '');
  
  // Casos especiales para algunos iconos que tienen URLs diferentes
  const specialCases = {
    'githubcodespaces': 'https://github.githubassets.com/images/modules/codespaces/illo-codespaces-simple.png',
    'aftereffects': 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg',
    'illustrator': 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg',
    'photoshop': 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
    'canva': 'https://cdn.worldvectorlogo.com/logos/canva-1.svg'
  };

  if (specialCases[techName]) {
    return specialCases[techName];
  }
  
  // Usamos el CDN de devicon para obtener las imágenes SVG
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techName}/${iconClass}.svg`;
};
