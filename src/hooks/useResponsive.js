/**
 * useResponsive.js - Hook personalizado para detección responsiva
 * 
 * Hook que detecta el tamaño de pantalla y proporciona información
 * sobre el tipo de dispositivo para una experiencia responsiva mejorada.
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';

/**
 * Breakpoints definidos para diferentes tamaños de pantalla
 */
const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1440
};

/**
 * Hook personalizado para detección responsiva
 * @returns {Object} Información sobre el dispositivo y tamaño de pantalla
 */
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      
      // Determinar el tipo de dispositivo basado en el ancho
      if (width <= BREAKPOINTS.mobile) {
        setDeviceType('mobile');
      } else if (width <= BREAKPOINTS.tablet) {
        setDeviceType('tablet');
      } else if (width <= BREAKPOINTS.laptop) {
        setDeviceType('laptop');
      } else {
        setDeviceType('desktop');
      }
    };

    // Ejecutar al montar el componente
    updateScreenSize();

    // Debounce para optimizar el rendimiento
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScreenSize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  // Funciones de utilidad para tipos de dispositivo
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isLaptop = deviceType === 'laptop';
  const isDesktop = deviceType === 'desktop';
  
  // Combinaciones útiles
  const isMobileOrTablet = isMobile || isTablet;
  const isTabletOrLaptop = isTablet || isLaptop;
  const isLaptopOrDesktop = isLaptop || isDesktop;
  
  // Orientación
  const isLandscape = screenSize.width > screenSize.height;
  const isPortrait = screenSize.height > screenSize.width;
  
  // Detección de pantalla pequeña en landscape (útil para móviles)
  const isSmallLandscape = isLandscape && screenSize.height <= 500;

  return {
    // Información básica
    screenSize,
    deviceType,
    
    // Tipos de dispositivo
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    
    // Combinaciones
    isMobileOrTablet,
    isTabletOrLaptop,
    isLaptopOrDesktop,
    
    // Orientación
    isLandscape,
    isPortrait,
    isSmallLandscape,
    
    // Breakpoints para uso directo
    breakpoints: BREAKPOINTS
  };
};

export default useResponsive;
