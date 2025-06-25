# 🌌 Aurora Background Component

Componente de fondo animado que utiliza WebGL para crear efectos visuales similares a una aurora boreal.

## 📋 Características

- **WebGL Rendering**: Utiliza shaders para renderizado de alta performance
- **Animación Fluida**: Efectos suaves y orgánicos usando ruido Simplex
- **Responsive**: Se adapta automáticamente al tamaño de pantalla
- **Customizable**: Colores, velocidad y efectos configurables
- **Performance Optimized**: Optimizaciones para dispositivos móviles

## 🚀 Uso

### Básico
```jsx
import Aurora from './components/background/Aurora';

<Aurora />
```

### Con Configuración Personalizada
```jsx
<Aurora
  colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
  blend={0.6}
  amplitude={1.2}
  speed={0.3}
/>
```

## 🎛️ Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `colorStops` | `string[]` | `["#5227FF", "#7cff67", "#5227FF"]` | Array de 3 colores hex para el gradiente |
| `amplitude` | `number` | `1.0` | Intensidad de la animación (0.0 - 2.0) |
| `blend` | `number` | `0.5` | Suavidad del efecto (0.0 - 1.0) |
| `speed` | `number` | `0.5` | Velocidad de animación (0.1 - 2.0) |

### Detalles de Props

#### `colorStops`
- Define los colores del gradiente de la aurora
- Debe contener exactamente 3 colores en formato hexadecimal
- El primer color aparece a la izquierda, el tercero a la derecha
- El segundo color aparece en el centro

#### `amplitude`
- Controla la intensidad del movimiento vertical
- Valores más altos = movimiento más dramático
- Recomendado: 0.8 - 1.5 para uso normal

#### `blend`
- Controla la suavidad de los bordes del efecto
- 0.0 = bordes duros y definidos
- 1.0 = bordes muy suaves y difusos

#### `speed`
- Velocidad de la animación temporal
- Valores más bajos = animación más lenta y relajante
- Valores más altos = animación más dinámica

## 🎨 Configuraciones Recomendadas

### Ambiente Relajante
```jsx
<Aurora
  colorStops={["#667eea", "#764ba2", "#f093fb"]}
  blend={0.8}
  amplitude={0.8}
  speed={0.2}
/>
```

### Ambiente Energético
```jsx
<Aurora
  colorStops={["#ff6b6b", "#4ecdc4", "#45b7d1"]}
  blend={0.4}
  amplitude={1.5}
  speed={0.8}
/>
```

### Ambiente Profesional
```jsx
<Aurora
  colorStops={["#2c3e50", "#3498db", "#9b59b6"]}
  blend={0.6}
  amplitude={1.0}
  speed={0.3}
/>
```

## 🔧 Consideraciones Técnicas

### Performance
- Utiliza WebGL para renderizado acelerado por hardware
- Se optimiza automáticamente para dispositivos móviles
- Limpia recursos automáticamente al desmontar

### Compatibilidad
- Requiere soporte de WebGL 2.0
- Fallback transparente si WebGL no está disponible
- Compatible con navegadores modernos (Chrome 56+, Firefox 51+, Safari 15+)

### Accesibilidad
- Respeta la preferencia `prefers-reduced-motion`
- Se adapta automáticamente para `prefers-contrast: high`
- No interfiere con lectores de pantalla

## 🏗️ Arquitectura Interna

### Shaders
- **Vertex Shader**: Define la geometría de pantalla completa
- **Fragment Shader**: Calcula colores y efectos visuales

### Uniforms
- `uTime`: Tiempo para animación
- `uResolution`: Resolución de pantalla
- `uColorStops`: Colores del gradiente
- `uAmplitude`: Intensidad del efecto
- `uBlend`: Factor de mezcla

### Optimizaciones
- Reutilización de geometría (Triangle)
- Cleanup automático de recursos WebGL
- Responsive handling con debounce

## 🐛 Troubleshooting

### El fondo no aparece
- Verificar que OGL esté instalado: `npm install ogl`
- Comprobar soporte de WebGL en el navegador
- Verificar que no hay errores en la consola

### Performance lenta en móviles
- Reducir `amplitude` a 0.8 o menos
- Aumentar `blend` para efectos más suaves
- Considerar `speed` más lento (0.2-0.3)

### Colores no se ven bien
- Usar colores con suficiente contraste
- Probar diferentes combinaciones de `blend`
- Verificar que los colores estén en formato hex válido

## 📱 Responsive Behavior

El componente se adapta automáticamente:

```css
/* Móviles */
@media (max-width: 768px) {
  opacity: 0.8; /* Menos intensidad */
}

/* Preferencias de usuario */
@media (prefers-reduced-motion: reduce) {
  opacity: 0.5; /* Menos movimiento */
}
```

## 🔮 Futuras Mejoras

- [ ] Soporte para más de 3 colores
- [ ] Patrones de ruido alternativos
- [ ] Modos de blending adicionales
- [ ] Configuración de forma (no solo aurora)
- [ ] Integración con tema claro/oscuro
- [ ] Controles de usuario en tiempo real

## 📚 Referencias

- [OGL Documentation](https://github.com/oframe/ogl)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [Shader Reference](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)
