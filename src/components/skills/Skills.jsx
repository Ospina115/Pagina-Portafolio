import React from 'react';
import { SkillGroup } from './SkillGroup';

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

export function Skills() {
  return (
    <div className="skills" id="habilidades">
      <h1>Habilidades</h1>
      {skillData.map(({ key, titleEs, titleEn, iconSrc, icons }) => (
        <SkillGroup
          key={key}
          titleEs={titleEs}
          titleEn={titleEn}
          iconSrc={iconSrc}
          icons={icons}
        />
      ))}
    </div>
  );
}
