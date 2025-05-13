export function Home({ isSpanish }) {
    return (
        <div className="start" id="inicio">
            <div className="titulo">

                <h1></h1>
                <h3>{isSpanish ? "Desarrollador FullStack" : "FullStack Developer"}</h3>
                
                <div className="container">

                    <p className="code">&lt;<span className="etiqueta">Details </span><span className="propiedad">[data-status]</span>=<span className="string">"availableNow"</span>&gt;</p>
                    <p className="text">{isSpanish? "Desarrollador de software y entusiasta de la tecnología": "I'm a Software Developer & Tech enthusiast"}</p>
                    <p className="text">{isSpanish? "Mas de 2 años de experiencia. Evolucionando y aprendiendo continuamente.": "2+ years experience. Continuously evolving and learning new stuff."}</p>
                    <p className="text">{isSpanish? "Si puedes imaginarlo, yo puedo programarlo": "If you can imagine it, you can program it"}</p>
                    <p className="code">&lt;/<span className="etiqueta">Details</span>&gt;</p>
                </div>
                
            </div>
            <img src="src/assets/images/AÑA.png" alt="icon" className="sam" />
        </div>
    );
}
