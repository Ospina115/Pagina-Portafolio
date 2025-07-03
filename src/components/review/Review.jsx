/**
 * Review.jsx - Sección de reseñas de clientes
 * 
 * Componente que muestra las reseñas de clientes en un formato de marquee
 * con dos filas que se desplazan en direcciones opuestas.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isSpanish - Determina si el contenido está en español
 * @returns {JSX.Element} Sección de reseñas renderizada
 */

import { ReviewCard } from './ReviewCard';
import { Marquee } from './Marquee';
import { motion } from 'framer-motion';
import './review.css';

// Datos de las reseñas de clientes
const reviews = [
    {
        name: "Ana García",
        username: "@ana_garcia",
        body: "Increíble trabajo, superó todas mis expectativas. El diseño es moderno y funcional.",
        img: "https://avatar.vercel.sh/ana"
    },
    {
        name: "Carlos Rodríguez",
        username: "@carlos_dev",
        body: "Excelente desarrollador, muy profesional y entrega en tiempo. Lo recomiendo al 100%.",
        img: "https://avatar.vercel.sh/carlos"
    },
    {
        name: "María López",
        username: "@maria_lopez",
        body: "El proyecto quedó espectacular, justo lo que necesitaba para mi negocio.",
        img: "https://avatar.vercel.sh/maria"
    },
    {
        name: "David Chen",
        username: "@david_chen",
        body: "Amazing work! Very talented developer with great attention to detail.",
        img: "https://avatar.vercel.sh/david"
    },
    {
        name: "Sofia Martínez",
        username: "@sofia_dev",
        body: "Trabajar con Samuel fue una experiencia fantástica. Muy comunicativo y eficiente.",
        img: "https://avatar.vercel.sh/sofia"
    },
    {
        name: "Alessandro Rossi",
        username: "@alex_rossi",
        body: "Ottimo lavoro! Il sito web è perfetto e funziona alla perfezione.",
        img: "https://avatar.vercel.sh/alessandro"
    }
];

// Dividir las reseñas en dos filas
const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

export function Review({ isSpanish = true }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const sectionVariants = {
        hidden: { 
            opacity: 0, 
            y: 50 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8
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
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div className="review-header" variants={sectionVariants}>
                <h2 className="review-title">
                    {isSpanish ? "Lo que dicen mis clientes" : "What my clients say"}
                </h2>
                <p className="review-subtitle">
                    {isSpanish 
                        ? "Testimonios reales de proyectos exitosos" 
                        : "Real testimonials from successful projects"
                    }
                </p>
            </motion.div>

            <motion.div className="review-marquee-container" variants={sectionVariants}>
                <Marquee pauseOnHover className="review-marquee">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                
                <Marquee reverse pauseOnHover className="review-marquee">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>

                {/* Gradientes laterales para efecto de desvanecimiento */}
                <div className="review-gradient-left"></div>
                <div className="review-gradient-right"></div>
            </motion.div>
        </motion.section>
    );
}