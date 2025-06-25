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
  // Normaliza las coordenadas del fragmento
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  // Define las paradas de color para el gradiente
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  // Calcula el color del gradiente horizontal
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  // Crea el patrón de altura usando ruido Simplex
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  // Calcula la transparencia del efecto aurora
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
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

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    // Configuración del renderer WebGL
    const renderer = new Renderer({
      alpha: true,              // Permite transparencia
      premultipliedAlpha: true, // Optimización para alpha blending
      antialias: true          // Suaviza los bordes
    });
    
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);           // Fondo transparente
    gl.enable(gl.BLEND);                 // Habilita blending
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // Configuración de blending
    gl.canvas.style.backgroundColor = 'transparent';

    let program;

    // Función para redimensionar el canvas
    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      
      // Actualiza la resolución en el shader
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    
    // Listener para cambios de tamaño de ventana
    window.addEventListener("resize", resize);

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

    // Crea el programa de shaders con uniforms
    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },                                    // Tiempo para animación
        uAmplitude: { value: amplitude },                       // Amplitud del efecto
        uColorStops: { value: colorStopsArray },               // Colores del gradiente
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] }, // Resolución
        uBlend: { value: blend }                               // Factor de mezcla
      }
    });

    // Crea el mesh combinando geometría y programa
    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    
    // Loop de animación
    const update = (t) => {
      animateId = requestAnimationFrame(update);
      
      // Obtiene propiedades actuales
      const { time = t * 0.01, speed: currentSpeed = speed } = propsRef.current;
      
      // Actualiza uniforms con valores actuales
      program.uniforms.uTime.value = time * currentSpeed * 0.1;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? amplitude;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
      
      // Actualiza colores si cambiaron
      const stops = propsRef.current.colorStops ?? colorStops;
      program.uniforms.uColorStops.value = stops.map((hex) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      
      // Renderiza la escena
      renderer.render({ scene: mesh });
    };
    
    // Inicia el loop de animación
    animateId = requestAnimationFrame(update);

    // Ajusta el tamaño inicial
    resize();

    // Función de limpieza
    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      
      // Limpia el canvas del DOM
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      
      // Libera el contexto WebGL
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [amplitude, blend, speed, colorStops]); // Dependencies para re-crear el efecto

  return <div ref={ctnDom} className="aurora-container" />;
}
