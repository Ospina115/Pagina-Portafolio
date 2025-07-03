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
import { useState } from 'react';

export function Marquee({ 
    children, 
    reverse = false, 
    pauseOnHover = false, 
    className = "" 
}) {
    const [isPaused, setIsPaused] = useState(false);

    const duplicatedChildren = [
        ...children,
        ...children // Duplicamos los elementos para crear el efecto infinito
    ];

    return (
        <div 
            className={`overflow-hidden whitespace-nowrap ${className}`}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
            <motion.div
                animate={{
                    x: reverse ? ['0%', '50%'] : ['0%', '-50%']
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    ...(isPaused && { duration: 0 })
                }}
                className="flex gap-4"
                style={{ width: '200%' }}
            >
                {duplicatedChildren.map((child, index) => (
                    <div key={index} className="flex-shrink-0">
                        {child}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
