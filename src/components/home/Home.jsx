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
import iconImage from '../../assets/images/icon.png';
import { useResponsive } from '../../hooks/useResponsive';
import PropTypes from 'prop-types';

export function Home({ isSpanish }) {
    const { isMobile, isTablet, isPortrait } = useResponsive();
    
    // Solo usar layout vertical para móviles en orientación portrait
    const useVerticalLayout = (isMobile || isTablet) && isPortrait;

    return (
        <section 
            className={`start ${useVerticalLayout ? 'start--mobile' : 'start--desktop'}`} 
            id="home" 
            aria-label={isSpanish ? "Sección de inicio" : "Home section"}
        >
            {useVerticalLayout ? (
                // Layout móvil vertical: texto arriba, imagen abajo (solo portrait)
                <>
                    <div className="titulo titulo--mobile">
                        <h1 className='animacioninicio' aria-label={isSpanish ? "Nombre del desarrollador" : "Developer name"}></h1>
                        <h3>{isSpanish ? "Desarrollador FullStack" : "FullStack Developer"}</h3>
                        
                        <div className="container container--mobile">
                            <p className="code">
                                &lt;<span className="etiqueta">{isSpanish ? "Detalles" : "Details"}</span>
                                <span className="propiedad">[{isSpanish ? "estado-dato" : "data-status"}]</span>=
                                <span className="string">&quot;{isSpanish ? "disponibleAhora" : "availableNow"}&quot;</span>&gt;
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
                        src={iconImage} 
                        alt={isSpanish ? "Icono de Samuel Ospina" : "Samuel Ospina icon"} 
                        className="sam sam--mobile" 
                    />
                </>
            ) : (
                // Layout horizontal: diseño lado a lado (desktop, tablets y móviles en landscape)
                <>
                    <div className="titulo titulo--desktop">
                        <h1 className='animacioninicio' aria-label={isSpanish ? "Nombre del desarrollador" : "Developer name"}></h1>
                        <h3>{isSpanish ? "Desarrollador FullStack" : "FullStack Developer"}</h3>
                        
                        <div className="container container--desktop">
                            <p className="code">
                                &lt;<span className="etiqueta">{isSpanish ? "Detalles" : "Details"}</span>
                                <span className="propiedad">[{isSpanish ? "estado-dato" : "data-status"}]</span>=
                                <span className="string">&quot;{isSpanish ? "disponibleAhora" : "availableNow"}&quot;</span>&gt;
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
                        src={iconImage} 
                        alt={isSpanish ? "Icono de Samuel Ospina" : "Samuel Ospina icon"} 
                        className="sam sam--desktop" 
                    />
                </>
            )}
        </section>
    );
}

// PropTypes para validación de props
Home.propTypes = {
    isSpanish: PropTypes.bool.isRequired
};
