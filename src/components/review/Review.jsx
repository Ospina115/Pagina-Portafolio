/**
 * Review.jsx - Sección de reseñas de clientes (Versión Responsiva)
 * 
 * Componente que muestra las reseñas de clientes en un formato de marquee
 * con dos filas que se desplazan en direcciones opuestas.
 * 
 * CARACTERÍSTICAS RESPONSIVAS:
 * - Móvil: Una sola fila de marquee, tarjetas compactas, velocidad más lenta
 * - Tablet: Dos filas, tarjetas compactas, velocidad normal
 * - Laptop/Desktop: Dos filas, tarjetas normales, pauseOnHover habilitado
 * - Animaciones adaptativas según el tipo de dispositivo
 * - Gradientes laterales ajustables por tamaño de pantalla
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isSpanish - Determina si el contenido está en español
 * @returns {JSX.Element} Sección de reseñas renderizada responsivamente
 */

import { ReviewCard } from './ReviewCard';
import { Marquee } from './Marquee';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useResponsive } from '../../hooks/useResponsive';
import './review.css';

// Datos de las reseñas de clientes con mejor diversidad
const reviews = [
    {
        name: "Ana García",
        username: "@ana_garcia",
        body: "Increíble trabajo, superó todas mis expectativas. El diseño es moderno y funcional.",
        img: "https://avatar.vercel.sh/ana",
        rating: 5
    },
    {
        name: "Carlos Rodríguez",
        username: "@carlos_dev",
        body: "Excelente desarrollador, muy profesional y entrega en tiempo. Lo recomiendo al 100%.",
        img: "https://avatar.vercel.sh/carlos",
        rating: 5
    },
    {
        name: "María López",
        username: "@maria_lopez",
        body: "El proyecto quedó espectacular, justo lo que necesitaba para mi negocio.",
        img: "https://avatar.vercel.sh/maria",
        rating: 5
    },
    {
        name: "David Chen",
        username: "@david_chen",
        body: "Amazing work! Very talented developer with great attention to detail.",
        img: "https://avatar.vercel.sh/david",
        rating: 5
    },
    {
        name: "Sofia Martínez",
        username: "@sofia_dev",
        body: "Trabajar con Samuel fue una experiencia fantástica. Muy comunicativo y eficiente.",
        img: "https://avatar.vercel.sh/sofia",
        rating: 5
    },
    {
        name: "Alessandro Rossi",
        username: "@alex_rossi",
        body: "Ottimo lavoro! Il sito web è perfetto e funziona alla perfezione.",
        img: "https://avatar.vercel.sh/alessandro",
        rating: 5
    },
    {
        name: "Jennifer Smith",
        username: "@jennifer_smith",
        body: "Outstanding quality and great communication throughout the project. Highly recommended!",
        img: "https://avatar.vercel.sh/jennifer",
        rating: 5
    },
    {
        name: "Luis Mendoza",
        username: "@luis_mendoza",
        body: "Un trabajo excepcional. La atención al detalle y la rapidez fueron impresionantes.",
        img: "https://avatar.vercel.sh/luis",
        rating: 5
    }
];

export function Review({ isSpanish = true }) {
    // Hook responsivo para adaptar el comportamiento según el dispositivo
    const { 
        isMobile, 
        isTablet, 
        isMobileOrTablet, 
        isLaptop
    } = useResponsive();

    // Adaptar la velocidad del marquee según el dispositivo
    const getMarqueeSpeed = () => {
        if (isMobile) return "slower";
        if (isTablet) return "slow";
        if (isLaptop) return "normal";
        return "slow"; // desktop
    };

    // Ajustar el número de reseñas por fila según el tamaño de pantalla
    const getReviewsPerRow = () => {
        if (isMobile) return Math.ceil(reviews.length / 1); // Una sola fila en móvil
        if (isTablet) return Math.ceil(reviews.length / 2);
        return Math.ceil(reviews.length / 2); // Dos filas para laptop y desktop
    };

    // Dividir las reseñas según el dispositivo
    const reviewsPerRow = getReviewsPerRow();
    const firstRow = isMobile ? reviews : reviews.slice(0, reviewsPerRow);
    const secondRow = isMobile ? [] : reviews.slice(reviewsPerRow);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: isMobileOrTablet ? 0.1 : 0.2,
                delayChildren: isMobileOrTablet ? 0.05 : 0.1
            }
        }
    };

    const sectionVariants = {
        hidden: { 
            opacity: 0, 
            y: isMobileOrTablet ? 20 : 30 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: isMobileOrTablet ? 100 : 80,
                damping: isMobileOrTablet ? 25 : 20,
                duration: isMobileOrTablet ? 0.4 : 0.6
            }
        }
    };

    return (
        <motion.section 
            id="review"
            className="review-section"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            role="region"
            aria-labelledby="review-title"
        >
            <motion.div className="review-header" variants={sectionVariants}>
                <h2 id="review-title" className="review-title">
                    {isSpanish ? "Lo que dicen mis clientes" : "What my clients say"}
                </h2>
                <p className="review-subtitle">
                    {isSpanish 
                        ? "Testimonios reales de proyectos exitosos" 
                        : "Real testimonials from successful projects"
                    }
                </p>
            </motion.div>

            <motion.div 
                className={`review-marquee-container ${isMobileOrTablet ? 'mobile-layout' : 'desktop-layout'}`}
                variants={sectionVariants}
                role="complementary"
                aria-label={isSpanish ? "Carrusel de testimonios de clientes" : "Client testimonials carousel"}
            >
                {/* Primera fila - se mueve hacia la DERECHA */}
                <Marquee 
                    reverse
                    pauseOnHover={!isMobile} // Deshabilitar pauseOnHover en móvil para mejor rendimiento
                    className="review-marquee"
                    speed={getMarqueeSpeed()}
                    aria-label={isSpanish ? "Primera fila de testimonios" : "First row of testimonials"}
                >
                    {firstRow.map((review) => (
                        <ReviewCard 
                            key={review.username} 
                            {...review} 
                            compact={isMobileOrTablet} // Pasar prop para diseño compacto
                        />
                    ))}
                </Marquee>
                
                {/* Segunda fila - se mueve hacia la IZQUIERDA (solo en tablets, laptops y desktop) */}
                {!isMobile && secondRow.length > 0 && (
                    <Marquee 
                        pauseOnHover={!isMobile}
                        className="review-marquee"
                        speed={getMarqueeSpeed()}
                        aria-label={isSpanish ? "Segunda fila de testimonios" : "Second row of testimonials"}
                    >
                        {secondRow.map((review) => (
                            <ReviewCard 
                                key={review.username} 
                                {...review} 
                                compact={isMobileOrTablet}
                            />
                        ))}
                    </Marquee>
                )}


            </motion.div>
        </motion.section>
    );
}

// Validación de PropTypes
Review.propTypes = {
    isSpanish: PropTypes.bool
};