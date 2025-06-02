
import { useState } from "react";

// COMPONENTES //
import { NavBar } from "./components/navbar/NavBar.jsx";
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
    <>
      <NavBar isSpanish={isSpanish} toggleLanguage={toggleLanguage} />
      <Home isSpanish={isSpanish} />
      <About isSpanish={isSpanish} />
      <Skills isSpanish={isSpanish} />
    </>
  );
}

export default App;