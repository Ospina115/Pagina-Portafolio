export function HeaderInicio() {

    return (
        <header>
                <img src="" alt="logo"/>
                <nav>
                    <ul class="menu">
                        <li id="Home"><a href="#inicio" data-lang-en="Home" data-lang-es="Inicio">Inicio</a></li>
                        <li id="About"><a href="#info" data-lang-en="About" data-lang-es="Sobre Mi">Sobre Mi</a></li>
                        <li id="Menu"><a href="#habilidades" data-lang-en="Skills" data-lang-es="Habilidades">Habilidades</a></li>
                        <li id="Service"><a href="#proyectos" data-lang-en="Projects" data-lang-es="Proyectos">Proyectos</a></li>
                        <li id="Contant"><a href="#contacto" data-lang-en="Contact" data-lang-es="Contacto">Contacto</a></li>
                    </ul>
                </nav>
                <img id="boton-cambiar-idioma" data-lang-image src="src/assets/images/icons/english.png" data-lang-es="src/assets/images/icons/spanish.png" data-lang-en="src/assets/images/icons/english.png" alt="Idioma"/>
        </header>
    );
}