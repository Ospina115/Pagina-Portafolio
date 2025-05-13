import { ReactLenis, useLenis } from "lenis/react";
import { useState } from "react";

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

function App() {

  // Global language state: true for Spanish, false for English
  const [isSpanish, setIsSpanish] = useState(true);

  // Toggle language handler
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
