
/**
 * App.jsx - Componente principal de la aplicación
 * 
 * Componente raíz que maneja el estado global del idioma y renderiza
 * todas las secciones principales del portafolio, incluyendo el fondo animado
 * y smooth scrolling con Lenis.
 * 
 * @component
 * @returns {JSX.Element} Aplicación completa con todas las secciones
 * 
 * Estructura:
 * - Aurora: Fondo animado fijo
 * - ReactLenis: Wrapper para smooth scrolling
 * - NavBar: Navegación principal
 * - Home: Sección de bienvenida
 * - About: Información personal
 * - Skills: Habilidades técnicas
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

import { ReactLenis } from "lenis/react";
import { useState } from "react";

// COMPONENTES //
import { About } from "./components/about/About.jsx";
import { Contact } from "./components/contact/Contact.jsx";
import { Home } from "./components/home/Home.jsx";
import { NavBar } from "./components/navbar/NavBar.jsx";
import { ScrollIndicator } from "./components/navigation/ScrollIndicator.jsx";
import { Projects } from "./components/projects/Projects.jsx";
import { Skills } from "./components/skills/Skills.jsx";

// COMPONENTE DE FONDO //
import Aurora from "./components/background/Aurora.jsx";

// ESTILOS //
import "../src/styles/style.css";
import "../src/styles/temaclaro.css";
import "../src/styles/temaoscuro.css";

function App() {
  /**
   * Estado para el control del idioma de la aplicación
   * @type {boolean} isSpanish - true para español, false para inglés
   */
  const [isSpanish, setIsSpanish] = useState(true);

  /**
   * Función para alternar entre español e inglés
   * Se pasa como prop a los componentes que necesitan cambiar idioma
   */
  const toggleLanguage = () => {
    setIsSpanish(!isSpanish);
  };

  return (
    <>
      {/* 
        Fondo animado Aurora - Se mantiene fijo detrás de todo el contenido
        Configuración de colores y efectos optimizada para el portafolio
      */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} // Gradiente azul-rosa-rojo
        blend={0.6}                                     // Suavidad del efecto
        amplitude={1.2}                                 // Intensidad de la animación
        speed={0.3}                                     // Velocidad de animación suave
      />
      
      {/* 
        ReactLenis Wrapper - Proporciona smooth scrolling a toda la aplicación
        Configuración optimizada para mejor experiencia de usuario
      */}
      <ReactLenis 
        root 
        options={{
          lerp: 0.1,          // Suavidad del scroll (0.02 - 0.2)
          duration: 1.2,      // Duración de las animaciones de scroll
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing suave
          direction: 'vertical', // Dirección del scroll
          gestureDirection: 'vertical', // Dirección de gestos
          smooth: true,       // Activar smooth scroll
          mouseMultiplier: 1, // Sensibilidad del mouse
          smoothTouch: false, // Desactivar en touch para mejor rendimiento móvil
          touchMultiplier: 2, // Sensibilidad en dispositivos táctiles
          infinite: false,    // Scroll infinito desactivado
        }}
      >
        {/* Indicador de scroll y navegación */}
        <ScrollIndicator isSpanish={isSpanish} />
        
        {/* Contenido principal de la aplicación */}
        <NavBar isSpanish={isSpanish} toggleLanguage={toggleLanguage} />
        <Home isSpanish={isSpanish} />
        <About isSpanish={isSpanish} />
        <Skills isSpanish={isSpanish} />
        <Projects isSpanish={isSpanish} />
        <Contact isSpanish={isSpanish} />
      </ReactLenis>
    </>
  );
}

export default App;