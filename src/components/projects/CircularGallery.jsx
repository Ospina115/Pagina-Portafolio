/**
 * CircularGallery.jsx - Componente de galería circular para proyectos
 * 
 * Galería circular que muestra tarjetas de proyecto con navegación manual
 * por arrastre únicamente.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.items - Array de proyectos a mostrar
 * @param {number} props.bend - Curvatura de la galería (no utilizada en versión actual)
 * @param {Object} props.CardComponent - Componente de tarjeta a renderizar
 * @returns {JSX.Element} Galería circular renderizada
 * 
 * @author Samuel Ospina
 * @version 4.0.0
 */

import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import "./CircularGallery.css";

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

export default function CircularGallery({
  items = [],
  bend = 3,
  CardComponent,
  isSpanish = true,
  scrollSpeed = 2,
  scrollEase = 0.05,
}) {
  const containerRef = useRef(null);
  const scrollRef = useRef({ current: 0, target: 0, last: 0 });
  const isDownRef = useRef(false);
  const startRef = useRef(0);
  const positionRef = useRef(0);
  const animationRef = useRef();
  
  const [containerWidth, setContainerWidth] = useState(0);
  const [itemWidth] = useState(350); // Ancho fijo para las tarjetas

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      setContainerWidth(container.clientWidth);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      const scroll = scrollRef.current;
      
      // Solo interpolación suave, sin scroll automático
      scroll.current = lerp(scroll.current, scroll.target, scrollEase);
      
      const container = containerRef.current;
      if (container) {
        const cards = container.querySelectorAll('.gallery-card');
        const cardWidth = itemWidth + 40;
        
        cards.forEach((card, index) => {
          const x = (cardWidth * index) - scroll.current;
          
          // Solo movimiento horizontal, sin elevación ni curvatura
          const y = 0;
          
          card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          
          // Mantener todas las tarjetas con opacidad y escala completas
          card.style.opacity = 1;
          card.style.setProperty('--scale', 1);
        });
      }
      
      scroll.last = scroll.current;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [containerWidth, itemWidth, scrollEase, bend, items.length]);

  const handleMouseDown = (e) => {
    isDownRef.current = true;
    positionRef.current = scrollRef.current.current;
    startRef.current = e.clientX;
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDownRef.current) return;
    const distance = (startRef.current - e.clientX) * (scrollSpeed * 0.5);
    scrollRef.current.target = positionRef.current + distance;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
    containerRef.current.style.cursor = 'grab';
    snapToNearestCard();
  };

  // Función eliminada: handleWheel - ya no se permite scroll con rueda del mouse

  const snapToNearestCard = () => {
    const cardWidth = itemWidth + 40;
    const cardIndex = Math.round(scrollRef.current.target / cardWidth);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, cardIndex));
    scrollRef.current.target = clampedIndex * cardWidth;
  };

  const handleTouchStart = (e) => {
    isDownRef.current = true;
    positionRef.current = scrollRef.current.current;
    startRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDownRef.current) return;
    const distance = (startRef.current - e.touches[0].clientX) * (scrollSpeed * 0.3);
    scrollRef.current.target = positionRef.current + distance;
  };

  const handleTouchEnd = () => {
    isDownRef.current = false;
    snapToNearestCard();
  };

  return (
    <div 
      className="circular-gallery-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="gallery-track">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="gallery-card"
            style={{
              transform: `scale(var(--scale, 1))`,
            }}
          >
            <CardComponent
              project={item.projectData || item}
              isSpanish={isSpanish}
            />
          </div>
        ))}
      </div>
      
      <div className="gallery-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            className="gallery-indicator"
            onClick={() => {
              const cardWidth = itemWidth + 40;
              scrollRef.current.target = index * cardWidth;
            }}
            aria-label={`Ir a proyecto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

CircularGallery.propTypes = {
  items: PropTypes.array,
  bend: PropTypes.number,
  CardComponent: PropTypes.elementType.isRequired,
  isSpanish: PropTypes.bool,
  scrollSpeed: PropTypes.number,
  scrollEase: PropTypes.number,
};
