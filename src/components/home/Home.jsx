/**
 * Home.jsx - Componente de la sección principal (landing)
 * 
 * Sección de bienvenida con información personal y presentación inicial.
 * Incluye animaciones y contenido bilingüe.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isSpanish - Determina si el contenido está en español
 * @returns {JSX.Element} Sección Home renderizada
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

import './home.css';

export function Home({ isSpanish }) {
    return (
        <section className="start" id="home" aria-label={isSpanish ? "Sección de inicio" : "Home section"}>
            <div className="titulo">
                <h1 className='animacioninicio' aria-label={isSpanish ? "Nombre del desarrollador" : "Developer name"}></h1>
                <h3>{isSpanish ? "Desarrollador FullStack" : "FullStack Developer"}</h3>
                
                <div className="container">
                    <p className="code">
                        &lt;<span className="etiqueta">{isSpanish ? "Detalles" : "Details"}</span>
                        <span className="propiedad">[{isSpanish ? "estado-dato" : "data-status"}]</span>=
                        <span className="string">"{isSpanish ? "disponibleAhora" : "availableNow"}"</span>&gt;
                    </p>
                    
                    <p className="text">
                        {isSpanish 
                            ? "Desarrollador de software y entusiasta de la tecnología" 
                            : "I'm a Software Developer & Tech enthusiast"
                        }
                    </p>
                    
                    <p className="text">
                        {isSpanish 
                            ? "Más de 2 años de experiencia. Evolucionando y aprendiendo continuamente." 
                            : "2+ years experience. Continuously evolving and learning new stuff."
                        }
                    </p>
                    
                    <p className="text">
                        {isSpanish 
                            ? "Si puedes imaginarlo, yo puedo programarlo" 
                            : "If you can imagine it, you can program it"
                        }
                    </p>
                    
                    <p className="code">
                        &lt;/<span className="etiqueta">{isSpanish ? "Detalles" : "Details"}</span>&gt;
                    </p>
                </div>
            </div>
            
            <img 
                src="src/assets/images/icon.png" 
                alt={isSpanish ? "Icono de Samuel Ospina" : "Samuel Ospina icon"} 
                className="sam" 
            />
        </section>
    );
}
