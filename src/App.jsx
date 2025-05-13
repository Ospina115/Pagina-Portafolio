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
