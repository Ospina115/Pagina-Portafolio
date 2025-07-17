/**
 * Marquee.jsx - Componente de desplazamiento infinito
 * 
 * Componente que crea un efecto de marquesina con desplazamiento infinito
 * para mostrar elementos en movimiento continuo.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Elementos a mostrar en el marquee
 * @param {boolean} props.reverse - Si true, invierte la dirección del desplazamiento
 * @param {boolean} props.pauseOnHover - Si true, pausa el movimiento al hacer hover
 * @param {string} props.className - Clases CSS adicionales
 * @returns {JSX.Element} Componente Marquee renderizado
 */

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function Marquee({ 
    children, 
    reverse = false, 
    pauseOnHover = false, 
    className = "",
    speed = "normal"
}) {
    const [isPaused, setIsPaused] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    // Detectar preferencia de movimiento reducido
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(mediaQuery.matches);
        
        const handleChange = (e) => setIsReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handleChange);
        
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const getDuration = () => {
        if (isReducedMotion) return 60; // Muy lento para accesibilidad
        
        const speeds = {
            slow: 30,
            normal: 20,
            fast: 10
        };
        return speeds[speed] || speeds.normal;
    };

    const duplicatedChildren = [
        ...children,
        ...children // Duplicamos los elementos para crear el efecto infinito
    ];

    return (
        <div 
            className={`marquee-container ${className}`}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
            role="region"
            aria-live="polite"
        >
            <motion.div
                animate={!isReducedMotion ? {
                    x: reverse ? ['0%', '50%'] : ['0%', '-50%']
                } : {}}
                transition={{
                    duration: getDuration(),
                    repeat: isReducedMotion ? 0 : Infinity,
                    ease: "linear",
                    ...(isPaused && { duration: 0 })
                }}
                className="marquee-content"
                style={{ width: '200%' }}
            >
                {duplicatedChildren.map((child, index) => (
                    <div key={index} className="marquee-item">
                        {child}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

// Validación de PropTypes
Marquee.propTypes = {
    children: PropTypes.node.isRequired,
    reverse: PropTypes.bool,
    pauseOnHover: PropTypes.bool,
    className: PropTypes.string,
    speed: PropTypes.oneOf(['slow', 'normal', 'fast'])
};
