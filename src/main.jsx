/**
 * main.jsx - Punto de entrada principal de la aplicación React
 * 
 * Este archivo configura el renderizado inicial de la aplicación con:
 * - Un componente de carga retardada para mejorar la experiencia del usuario
 * - Configuración de React con StrictMode y Suspense
 * - Manejo de estados de carga y renderizado
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

import { StrictMode, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/prueba.css";
import App from "./App.jsx";
import { Loading } from "./components/loading/Loading.jsx";

/**
 * DelayedApp - Componente que maneja la carga inicial de la aplicación
 * 
 * Implementa un retraso de 3 segundos antes de mostrar la aplicación principal,
 * durante el cual se muestra un componente de carga. Esto mejora la percepción
 * de rendimiento y proporciona una mejor experiencia de usuario.
 * 
 * @returns {JSX.Element} Loading component durante la carga, App component cuando está listo
 */
function DelayedApp() {
  // Estado que controla si la aplicación está lista para ser mostrada
  const [isReady, setIsReady] = useState(false);

  /**
   * Effect Hook que maneja el temporizador de carga
   * Se ejecuta una sola vez al montar el componente y establece
   * isReady en true después de 3 segundos
   */
  useEffect(() => {
    // Configura un temporizador de 3 segundos antes de mostrar la app
    const timer = setTimeout(() => setIsReady(true), 3000);
    
    // Función de limpieza que se ejecuta al desmontar el componente
    // Previene memory leaks limpiando el temporizador
    return () => clearTimeout(timer);
  }, []); // Array de dependencias vacío = se ejecuta solo al montar

  // Renderizado condicional: muestra Loading mientras no esté listo
  if (!isReady) {
    return <Loading />;
  }

  // Una vez que isReady es true, renderiza la aplicación principal
  return <App />;
}

/**
 * Renderizado principal de la aplicación
 * 
 * Configuración del root de React con:
 * - StrictMode: Activa verificaciones adicionales y advertencias en desarrollo
 * - Suspense: Maneja la carga asíncrona de componentes con un fallback
 * - DelayedApp: Componente principal con carga retardada
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 
      Suspense proporciona un fallback mientras se cargan componentes lazy
      En este caso, muestra Loading si hay algún componente cargándose de forma asíncrona
    */}
    <Suspense fallback={<Loading />}>
      <DelayedApp />
    </Suspense>
  </StrictMode>
);
