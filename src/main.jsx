import { StrictMode, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Loading } from "./components/loading/Loading.jsx";
import "../src/styles/prueba.css";

function DelayedApp() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <Loading />;
  }

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <DelayedApp />
    </Suspense>
  </StrictMode>
);
