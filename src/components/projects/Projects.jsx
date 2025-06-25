/**
 * Projects.jsx - Componente de la sección de proyectos
 * 
 * Sección que muestra los proyectos destacados del portafolio
 * con información bilingüe y imágenes de demostración.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isSpanish - Determina si el contenido está en español
 * @returns {JSX.Element} Sección Projects renderizada
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

export function Projects({ isSpanish }) {
    return (
        <section className="projects" id="projects" aria-label={isSpanish ? "Sección de proyectos" : "Projects section"}>
            <h2>{isSpanish ? "Proyectos" : "Projects"}</h2>
            
            <div className="project">
                <h3>{isSpanish ? "Proyecto 1" : "Project 1"}</h3>
                <p>{isSpanish ? "Descripción del proyecto 1" : "Description of project 1"}</p>
                <img 
                    src="/public/proyecto1.jpg" 
                    alt={isSpanish ? "Imagen del proyecto 1" : "Project 1 image"}
                />
            </div>
            
            <div className="project">
                <h3>{isSpanish ? "Proyecto 2" : "Project 2"}</h3>
                <p>{isSpanish ? "Descripción del proyecto 2" : "Description of project 2"}</p>
                <img 
                    src="/public/proyecto2.jpg" 
                    alt={isSpanish ? "Imagen del proyecto 2" : "Project 2 image"}
                />
            </div>
        </section>
    );
}