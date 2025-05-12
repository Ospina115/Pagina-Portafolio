// LIBRERIAS //
import { ReactLenis, useLenis } from "lenis/react";

// COMPONENTES //
import { HeaderInicio } from "./components/headerInicio/HeaderInicio.jsx";
import { Home } from "./components/home/Home.jsx";


// ESTILOS //

function App() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  return (
    <ReactLenis root>
      <HeaderInicio />
      <Home />
    </ReactLenis>
  );
}

export default App;
