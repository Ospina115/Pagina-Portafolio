import { ReactLenis, useLenis } from "lenis/react";
import { useState } from "react";

// COMPONENTES //
import { HeaderInicio } from "./components/navbar/HeaderInicio.jsx";
import { Home } from "./components/home/Home.jsx";
import { About } from "./components/about/About.jsx";
import { Skills } from "./components/skills/Skills.jsx";
import { Review } from "./components/review/Review.jsx";

// ESTILOS //
import "../src/styles/style.css";
import "../src/styles/temaclaro.css";
import "../src/styles/temaoscuro.css";

function App() {

  // Establece el idioma predeterminado como español
  const [isSpanish, setIsSpanish] = useState(true);

  // cambia el lenguaje entre español e inglés
  const toggleLanguage = () => {
    setIsSpanish(!isSpanish);
  };

  return (
    <ReactLenis root>
      <HeaderInicio isSpanish={isSpanish} toggleLanguage={toggleLanguage} />
      <Home isSpanish={isSpanish} />
      <About isSpanish={isSpanish} />
      <Skills isSpanish={isSpanish} />
    </ReactLenis>
  );
}

export default App;
