/**
 * useLenisScroll - Hook personalizado para gestionar Lenis Smooth Scrolling
 * 
 * Proporciona funciones y métodos para controlar el comportamiento del scroll
 * suave en toda la aplicación, incluyendo navegación programática y configuración
 * dinámica.
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

import { useLenis } from 'lenis/react';
import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook principal para gestionar Lenis Smooth Scrolling
 * 
 * @param {Object} options - Opciones de configuración
 * @param {boolean} options.enableScrollSpy - Activar detección de sección actual
 * @param {Array} options.sections - Array de IDs de secciones para scroll spy
 * @returns {Object} Métodos y estado del scroll
 */
export function useLenisScroll(options = {}) {
  const {
    enableScrollSpy = false,
    sections = ['home', 'about', 'skills', 'projects']
  } = options;

  // Obtener instancia de Lenis del contexto
  const lenis = useLenis();
  
  // Referencias para el estado del scroll
  const currentSection = useRef('home');
  const isScrolling = useRef(false);

  /**
   * Navegar suavemente a una sección específica
   * 
   * @param {string} sectionId - ID de la sección destino
   * @param {Object} scrollOptions - Opciones adicionales de scroll
   */
  const scrollToSection = useCallback((sectionId, scrollOptions = {}) => {
    if (!lenis) return;

    const target = document.getElementById(sectionId);
    if (!target) {
      console.warn(`Section with id "${sectionId}" not found`);
      return;
    }

    const defaultOptions = {
      offset: -80,     // Offset para navbar fijo
      duration: 1.5,   // Duración del scroll
      easing: (t) => 1 - Math.pow(1 - t, 3), // Easing cúbico
      immediate: false, // No instantáneo
      lock: true,      // Bloquear scroll durante animación
      force: false,    // No forzar si ya está en la posición
      ...scrollOptions
    };

    // Marcar como scrolling
    isScrolling.current = true;

    // Realizar el scroll
    lenis.scrollTo(target, {
      ...defaultOptions,
      onComplete: () => {
        isScrolling.current = false;
        currentSection.current = sectionId;
      }
    });
  }, [lenis]);

  /**
   * Scroll al inicio de la página
   */
  const scrollToTop = useCallback(() => {
    if (!lenis) return;
    
    lenis.scrollTo(0, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4)
    });
  }, [lenis]);

  /**
   * Scroll al final de la página
   */
  const scrollToBottom = useCallback(() => {
    if (!lenis) return;
    
    lenis.scrollTo(document.body.scrollHeight, {
      duration: 2,
      easing: (t) => 1 - Math.pow(1 - t, 3)
    });
  }, [lenis]);

  /**
   * Detener el scroll actual
   */
  const stopScroll = useCallback(() => {
    if (!lenis) return;
    lenis.stop();
  }, [lenis]);

  /**
   * Reanudar el scroll
   */
  const startScroll = useCallback(() => {
    if (!lenis) return;
    lenis.start();
  }, [lenis]);

  /**
   * Obtener información del scroll actual
   */
  const getScrollInfo = useCallback(() => {
    if (!lenis) return null;
    
    return {
      scroll: lenis.scroll,           // Posición actual
      limit: lenis.limit,             // Límite máximo de scroll
      velocity: lenis.velocity,       // Velocidad actual
      direction: lenis.direction,     // Dirección (1 = abajo, -1 = arriba)
      progress: lenis.progress,       // Progreso (0-1)
      isScrolling: isScrolling.current,
      currentSection: currentSection.current
    };
  }, [lenis]);

  /**
   * Configurar eventos de scroll spy
   */
  useEffect(() => {
    if (!enableScrollSpy || !lenis) return;

    const handleScroll = ({ scroll }) => {
      if (isScrolling.current) return; // No actualizar durante scroll programático

      // Detectar sección actual basada en la posición del scroll
      const windowHeight = window.innerHeight;
      const scrollPosition = scroll + windowHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const elementTop = scroll + rect.top;
        const elementBottom = elementTop + element.offsetHeight;

        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          if (currentSection.current !== sectionId) {
            currentSection.current = sectionId;
            
            // Disparar evento personalizado para componentes que lo necesiten
            window.dispatchEvent(new CustomEvent('sectionChange', {
              detail: { section: sectionId, scrollInfo: getScrollInfo() }
            }));
          }
          break;
        }
      }
    };

    // Suscribirse a eventos de scroll
    lenis.on('scroll', handleScroll);

    // Cleanup
    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [enableScrollSpy, lenis, sections, getScrollInfo]);

  /**
   * Configurar navegación con teclado
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!lenis) return;

      switch (event.key) {
        case 'Home':
          event.preventDefault();
          scrollToTop();
          break;
        case 'End':
          event.preventDefault();
          scrollToBottom();
          break;
        case 'PageUp':
          event.preventDefault();
          lenis.scrollTo(lenis.scroll - window.innerHeight * 0.8, {
            duration: 0.8
          });
          break;
        case 'PageDown':
          event.preventDefault();
          lenis.scrollTo(lenis.scroll + window.innerHeight * 0.8, {
            duration: 0.8
          });
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [lenis, scrollToTop, scrollToBottom]);

  return {
    // Métodos de navegación
    scrollToSection,
    scrollToTop,
    scrollToBottom,
    
    // Control del scroll
    stopScroll,
    startScroll,
    
    // Información del estado
    getScrollInfo,
    lenis,
    
    // Estado actual
    currentSection: currentSection.current,
    isScrolling: isScrolling.current
  };
}

/**
 * Hook simplificado para navegación básica
 * 
 * @returns {Object} Métodos básicos de navegación
 */
export function useScrollNavigation() {
  const { scrollToSection, scrollToTop } = useLenisScroll();
  
  return {
    goToHome: () => scrollToSection('home'),
    goToAbout: () => scrollToSection('about'),
    goToSkills: () => scrollToSection('skills'),
    goToProjects: () => scrollToSection('projects'),
    goToTop: scrollToTop
  };
}

/**
 * Hook para detectar la dirección del scroll
 * 
 * @param {Function} callback - Callback que recibe la dirección del scroll
 */
export function useScrollDirection(callback) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !callback) return;

    const handleScroll = ({ direction, velocity }) => {
      callback({
        direction: direction > 0 ? 'down' : 'up',
        velocity: Math.abs(velocity),
        isScrollingDown: direction > 0,
        isScrollingUp: direction < 0
      });
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenis, callback]);
}

/**
 * Hook para parallax basado en Lenis
 * 
 * @param {React.RefObject} ref - Referencia al elemento
 * @param {Object} options - Opciones del parallax
 * @returns {Object} Valores del parallax
 */
export function useParallax(ref, options = {}) {
  const { speed = 0.5, direction = 'vertical' } = options;
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !ref.current) return;

    const element = ref.current;
    let animationFrame;

    const handleScroll = ({ scroll }) => {
      if (animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const elementTop = scroll + rect.top;
        const windowHeight = window.innerHeight;
        
        // Calcular offset del parallax
        const offset = (scroll - elementTop + windowHeight) * speed;
        
        if (direction === 'vertical') {
          element.style.transform = `translateY(${offset}px)`;
        } else {
          element.style.transform = `translateX(${offset}px)`;
        }
        
        animationFrame = null;
      });
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [lenis, ref, speed, direction]);
}
