/**
 * About.jsx - Componente de la sección "Acerca de"
 * 
 * Sección que presenta información personal y profesional del desarrollador
 * con animaciones de scroll reveal y contenido bilingüe.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isSpanish - Determina si el contenido está en español
 * @returns {JSX.Element} Sección About renderizada
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

import './about.css';
import ScrollReveal from './ScrollReveal.jsx';

export function About({ isSpanish }) {
    return (
        <section className="about" id="about" aria-label={isSpanish ? "Sección acerca de" : "About section"}>
            <div className="container">
                <div>
                    <h2 className='titulo'>
                        {isSpanish ? "Permíteme presentarme" : "Allow me to introduce myself"}
                    </h2>
                    
                    <ScrollReveal 
                        baseOpacity={0} 
                        enableBlur={true} 
                        baseRotation={5} 
                        blurStrength={10}
                    >
                        {isSpanish 
                            ? "Como estudiante de Ingeniería de sistemas, he pasado incontables noches programando, depurando y consumiendo cantidades poco saludables de cafeína. Uno de mis momentos más orgullosos fue desarrollar una aplicación y bases de datos para una empresa local, que aumentó su eficiencia en un 70%. En mi camino estudiantil, he estado contribuyendo en muchos proyectos de software basados en situaciones empresariales, ayudándome a mejorar mis habilidades como desarrollador de software."
                            : "As a student in Computer Science, I've spent countless nights coding, debugging, and consuming unhealthy amounts of caffeine. One of my proudest moments was developing an application and databases for a local enterprise, which increased their efficiency by 70%. On my student path, I've been contributing in a lot of software projects based on business situations, helping me to improve my skills as a software developer."
                        }
                    </ScrollReveal>
                </div>
                
                <img 
                    className="sobremi" 
                    src="/public/images/sobremi.jpg" 
                    alt={isSpanish ? "Imagen de Samuel Ospina" : "Samuel Ospina image"}
                />
            </div>
        </section>
    );
}