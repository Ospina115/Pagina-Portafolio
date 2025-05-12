// LIBRERIAS //
import { ReactLenis, useLenis } from "lenis/react";

// COMPONENTES //
import { HeaderInicio } from "./components/headerInicio/HeaderInicio.jsx";
import { Home } from "./components/home/Home.jsx";
import { About } from "./components/about/About.jsx";
import { Skills } from "./components/skills/Skills.jsx";
import { Review } from "./components/review/Review.jsx";


// ESTILOS //
import "../src/styles/style.css";
import "../src/styles/temaclaro.css";
import "../src/styles/temaoscuro.css";
import "../src/styles/animaciones.css";

function App() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  // // **** CAMBIAR IDIOMA ****
  // const button = document.getElementById('boton-cambiar-idioma');
  // let isSpanish = true; // Estado inicial, español

  // button.addEventListener('click', () => {
  //     // Cambiar el estado del idioma
  //     isSpanish = !isSpanish;

  //     const images = document.querySelectorAll('[data-lang-image]');
  //     images.forEach(image => {
  //         const newImage = isSpanish ? image.getAttribute('data-lang-es') : image.getAttribute('data-lang-en');
  //         image.src = newImage; // Cambia la fuente de la imagen
  //     });

  //     // Alternar el contenido
  //     document.querySelectorAll('[data-lang-en], [data-lang-es]').forEach(element => {
  //         element.textContent = isSpanish ? element.getAttribute('data-lang-es') : element.getAttribute('data-lang-en');
  //     });
  // });




  
  return (
    <ReactLenis root>

      <HeaderInicio />
      <Home />
      <About />
      <Skills />

    </ReactLenis>
  );
}

export default App;
