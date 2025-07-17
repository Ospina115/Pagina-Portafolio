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
import App from "./App.jsx";
import { Loading } from "./components/loading/Loading.jsx";

/**
 * SuspenseWrapper - Componente que maneja el estado de carga inteligente
 * 
 * Este componente controla cuando mostrar la aplicación considerando:
 * 1. Un tiempo mínimo de 3 segundos de carga
 * 2. El estado real de carga de los componentes (via Suspense)
 * 3. Mantiene el loading hasta que ambas condiciones se cumplan
 * 
 * @returns {JSX.Element} App component cuando está completamente listo
 */
function SuspenseWrapper() {
  // Estado que controla si han pasado los 3 segundos mínimos
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  // Estado que controla si los componentes han terminado de cargar
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  /**
   * Effect Hook que maneja el temporizador de tiempo mínimo
   * Establece minTimeElapsed en true después de 3 segundos
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  /**
   * Effect Hook que simula la carga de componentes
   * En una aplicación real, esto se activaría cuando todos los
   * componentes lazy y recursos hayan terminado de cargar
   */
  useEffect(() => {
    // Simula el tiempo de carga de componentes
    const loadTimer = setTimeout(() => {
      setComponentsLoaded(true);
    }, 1000); // Tiempo base de carga
    
    return () => clearTimeout(loadTimer);
  }, []);

  // Solo muestra la app cuando ambas condiciones se cumplen:
  // 1. Han pasado los 3 segundos mínimos
  // 2. Los componentes han terminado de cargar
  const isAppReady = minTimeElapsed && componentsLoaded;

  if (!isAppReady) {
    return <Loading />;
  }

  return <App />;
}

/**
 * DelayedApp - Componente que integra Suspense con tiempo mínimo de carga
 * 
 * Envuelve la aplicación en Suspense para manejar componentes lazy,
 * mientras mantiene el control del tiempo mínimo de visualización del loading
 * 
 * @returns {JSX.Element} SuspenseWrapper con manejo de Suspense
 */
function DelayedApp() {
  return (
    <Suspense fallback={<Loading />}>
      <SuspenseWrapper />
    </Suspense>
  );
}

/**
 * Renderizado principal de la aplicación
 * 
 * Configuración del root de React con:
 * - StrictMode: Activa verificaciones adicionales y advertencias en desarrollo
 * - DelayedApp: Componente que integra Suspense con tiempo mínimo de carga
 * 
 * El flujo de carga funciona así:
 * 1. Suspense maneja la carga asíncrona de componentes lazy
 * 2. SuspenseWrapper controla que se muestren al menos 3 segundos de loading
 * 3. Solo se muestra la app cuando ambas condiciones se cumplen
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DelayedApp />
  </StrictMode>
);
