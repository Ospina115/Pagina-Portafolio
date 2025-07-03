/**
 * Aurora Background Component
 * 
 * Componente de fondo animado que utiliza WebGL y shaders para crear
 * un efecto de aurora boreal dinámico. Usa la librería OGL para renderizado.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string[]} props.colorStops - Array de colores hex para el gradiente
 * @param {number} props.amplitude - Amplitud de la animación (0.0 - 2.0)
 * @param {number} props.blend - Factor de mezcla para suavidad (0.0 - 1.0)
 * @param {number} props.speed - Velocidad de la animación (0.1 - 2.0)
 * @returns {JSX.Element} Contenedor del fondo Aurora
 * 
 * @example
 * <Aurora
 *   colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
 *   blend={0.5}
 *   amplitude={1.0}
 *   speed={0.5}
 * />
 */

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import './Aurora.css';
import { 
  getDeviceCapabilities, 
  createThrottledResize, 
  setupOrientationHandler,
  getOptimalWebGLConfig,
  getOptimalPixelRatio,
  optimizeShaderParams,
  setupVisibilityHandler
} from './responsiveUtils.js';
import { 
  useAuroraInitialization, 
  useAuroraConfig, 
  usePageVisibility 
} from '../../hooks/useAurora.js';

// Vertex Shader - Define las posiciones de los vértices
const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Fragment Shader - Define los colores y efectos visuales
const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uPixelRatio;

out vec4 fragColor;

// Función de permutación para noise
vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

// Función de ruido Simplex para crear patrones orgánicos
float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Estructura para manejar paradas de color en el gradiente
struct ColorStop {
  vec3 color;
  float position;
};

// Macro para interpolación de colores en el gradiente
#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  // Normaliza las coordenadas del fragmento con pixel ratio
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  // Ajuste para diferentes ratios de aspecto
  float aspectRatio = uResolution.x / uResolution.y;
  vec2 adjustedUv = uv;
  
  // Mantiene proporciones correctas en diferentes pantallas
  if (aspectRatio > 1.0) {
    // Pantalla más ancha que alta (landscape)
    adjustedUv.x = (uv.x - 0.5) * aspectRatio + 0.5;
  } else {
    // Pantalla más alta que ancha (portrait)
    adjustedUv.y = (uv.y - 0.5) / aspectRatio + 0.5;
  }
  
  // Define las paradas de color para el gradiente
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  // Calcula el color del gradiente horizontal con UV ajustado
  vec3 rampColor;
  COLOR_RAMP(colors, adjustedUv.x, rampColor);
  
  // Crea el patrón de altura usando ruido Simplex con escalado responsivo
  float noiseScale = mix(1.5, 3.0, smoothstep(0.5, 2.0, aspectRatio));
  float height = snoise(vec2(adjustedUv.x * noiseScale + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (adjustedUv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  // Calcula la transparencia del efecto aurora
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  // Ajusta la intensidad según el pixel ratio para mantener consistencia visual
  float pixelRatioAdjustment = mix(1.0, 0.8, smoothstep(1.0, 3.0, uPixelRatio));
  auroraAlpha *= pixelRatioAdjustment;
  
  // Combina intensidad y color
  vec3 auroraColor = intensity * rampColor;
  
  // Salida final con alpha blending
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

export default function Aurora(props) {
  // Destructuring de props con valores por defecto
  const {
    colorStops = ["#5227FF", "#7cff67", "#5227FF"],
    amplitude = 1.0,
    blend = 0.5,
    speed = 0.5
  } = props;
  
  // Referencias para mantener props actuales y el contenedor DOM
  const propsRef = useRef(props);
  propsRef.current = props;
  const ctnDom = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const programRef = useRef(null);
  
  // Función para detectar tipo de dispositivo y capacidades
  const getDeviceSpecs = () => {
    return getDeviceCapabilities();
  };

  // Función para forzar renderizado
  const forceRender = () => {
    if (rendererRef.current && meshRef.current) {
      rendererRef.current.render({ scene: meshRef.current });
    }
  };

  // Hook especializado para inicialización de Aurora
  const { forceInitialization } = useAuroraInitialization({
    containerRef: ctnDom,
    onInitialize: forceRender,
    onResize: forceRender,
    onVisibilityChange: (isVisible) => {
      if (isVisible) {
        forceRender();
      }
    }
  });

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const deviceSpecs = getDeviceSpecs();
    
    // Fallback si WebGL no está disponible
    if (!deviceSpecs.hasWebGL) {
      ctn.classList.add('fallback');
      console.warn('WebGL no disponible, usando fallback CSS');
      return;
    }
    
    // Configuración del renderer WebGL con ajustes responsivos
    const webglConfig = getOptimalWebGLConfig(deviceSpecs);
    const renderer = new Renderer(webglConfig);
    
    rendererRef.current = renderer;
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);           // Fondo transparente
    gl.enable(gl.BLEND);                 // Habilita blending
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // Configuración de blending
    gl.canvas.style.backgroundColor = 'transparent';

    let program;
    let frameCount = 0;
    const targetFrameTime = 1000 / deviceSpecs.maxFPS;
    let lastFrameTime = 0;

    // Función para redimensionar el canvas de forma responsiva
    function resize() {
      if (!ctn) return;
      
      // Espera un frame para asegurar que las dimensiones están disponibles
      requestAnimationFrame(() => {
        const rect = ctn.getBoundingClientRect();
        let width = rect.width;
        let height = rect.height;
        
        // Fallback a las dimensiones del viewport si el contenedor no tiene dimensiones
        if (width === 0 || height === 0) {
          width = window.innerWidth;
          height = window.innerHeight;
        }
        
        // Calcula el pixel ratio óptimo
        const pixelRatio = getOptimalPixelRatio(deviceSpecs);
        const canvasWidth = Math.floor(width * pixelRatio);
        const canvasHeight = Math.floor(height * pixelRatio);
        
        // Configura el tamaño del canvas
        gl.canvas.width = canvasWidth;
        gl.canvas.height = canvasHeight;
        gl.canvas.style.width = width + 'px';
        gl.canvas.style.height = height + 'px';
        
        // Actualiza el viewport
        gl.viewport(0, 0, canvasWidth, canvasHeight);
        
        // Actualiza la resolución en el shader
        if (program) {
          program.uniforms.uResolution.value = [canvasWidth, canvasHeight];
          program.uniforms.uPixelRatio.value = pixelRatio;
        }
        
        // Fuerza un renderizado inmediato después del resize
        if (program && mesh) {
          renderer.render({ scene: mesh });
        }
      });
    }
    
    // Configuración de event listeners responsivos
    const throttledResize = createThrottledResize(resize, 100);
    window.addEventListener("resize", throttledResize);
    
    // Setup para cambios de orientación
    const cleanupOrientation = setupOrientationHandler(resize);

    // Crea la geometría (triángulo que cubre toda la pantalla)
    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv; // Elimina UV coordinates no necesarias
    }

    // Convierte colores hex a arrays RGB
    const colorStopsArray = colorStops.map((hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    // Optimiza parámetros según el dispositivo
    const optimizedParams = optimizeShaderParams(
      { amplitude, blend, speed }, 
      deviceSpecs
    );

    // Crea el programa de shaders con uniforms responsivos
    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: optimizedParams.amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [0, 0] },
        uBlend: { value: optimizedParams.blend },
        uPixelRatio: { value: 1.0 }
      }
    });

    let animateId = 0;
    let isAnimating = true;
    let mesh; // Declarar mesh aquí para acceso global
    
    // Función de inicialización que se ejecuta después de agregar el canvas al DOM
    const initialize = () => {
      // Crea el mesh combinando geometría y programa
      mesh = new Mesh(gl, { geometry, program });
      
      // Múltiples intentos de renderizado para asegurar que se muestre
      const forceRender = (attempts = 0) => {
        if (attempts > 5) return; // Máximo 5 intentos
        
        // Ajusta el tamaño y renderiza
        resize();
        
        // Renderizado inicial inmediato
        if (program && mesh) {
          renderer.render({ scene: mesh });
        }
        
        // Si es el primer intento, programa más intentos
        if (attempts === 0) {
          setTimeout(() => forceRender(1), 50);
          setTimeout(() => forceRender(2), 100);
          setTimeout(() => forceRender(3), 200);
        }
      };
      
      forceRender();
      
      // Inicia el loop de animación
      animateId = requestAnimationFrame(update);
    };
    
    // Agrega el canvas al DOM y luego inicializa
    ctn.appendChild(gl.canvas);
    
    // Usa setTimeout para asegurar que el DOM esté completamente actualizado
    setTimeout(initialize, 0);
    
    // Loop de animación optimizado para diferentes dispositivos
    const update = (currentTime) => {
      if (!isAnimating || !mesh) return;
      
      // Control de FPS para dispositivos menos potentes
      if (currentTime - lastFrameTime < targetFrameTime) {
        animateId = requestAnimationFrame(update);
        return;
      }
      
      lastFrameTime = currentTime;
      frameCount++;
      
      // Obtiene propiedades actuales
      const { time = currentTime * 0.01, speed: currentSpeed = speed } = propsRef.current;
      
      // Actualiza uniforms con valores optimizados
      program.uniforms.uTime.value = time * optimizedParams.speed * 0.1;
      program.uniforms.uAmplitude.value = 
        (propsRef.current.amplitude ?? amplitude) * deviceSpecs.qualityFactor;
      program.uniforms.uBlend.value = 
        (propsRef.current.blend ?? blend) * deviceSpecs.blendFactor;
      
      // Actualiza colores si cambiaron
      const stops = propsRef.current.colorStops ?? colorStops;
      program.uniforms.uColorStops.value = stops.map((hex) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      
      // Renderiza la escena
      renderer.render({ scene: mesh });
      
      animateId = requestAnimationFrame(update);
    };
    
    // Inicia el loop de animación - se movió a la función initialize
    // animateId = requestAnimationFrame(update);

    // Ajusta el tamaño inicial - se movió a la función initialize
    // resize();

    // Setup para manejo de visibilidad de página
    const cleanupVisibility = setupVisibilityHandler(
      () => {
        isAnimating = true;
        animateId = requestAnimationFrame(update);
      },
      () => {
        isAnimating = false;
        cancelAnimationFrame(animateId);
      }
    );

    // Función de limpieza
    return () => {
      isAnimating = false;
      cancelAnimationFrame(animateId);
      
      // Limpia event listeners
      window.removeEventListener("resize", throttledResize);
      cleanupOrientation();
      cleanupVisibility();
      
      // Limpia el canvas del DOM
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      
      // Libera el contexto WebGL
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      rendererRef.current = null;
    };
  }, [amplitude, blend, speed, colorStops]); // Dependencies para re-crear el efecto

  // useEffect adicional para forzar renderizado inicial
  useEffect(() => {
    // Fuerza una actualización después del montaje
    const timer = setTimeout(() => {
      if (rendererRef.current && ctnDom.current) {
        // Dispara un evento resize para forzar la actualización
        window.dispatchEvent(new Event('resize'));
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []); // Solo ejecutar una vez al montar

  return <div ref={ctnDom} className="aurora-container" />;
}
