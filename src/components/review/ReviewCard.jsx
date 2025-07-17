/**
 * ReviewCard.jsx - Tarjeta de reseña de cliente
 * 
 * Componente que muestra una tarjeta con la información y reseña de un cliente.
 * Incluye avatar, nombre, usuario y el texto de la reseña.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.img - URL de la imagen del avatar
 * @param {string} props.name - Nombre del cliente
 * @param {string} props.username - Nombre de usuario
 * @param {string} props.body - Texto de la reseña
 * @returns {JSX.Element} Tarjeta de reseña renderizada
 */

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export function ReviewCard({ img, name, username, body, rating = 5, compact = false }) {
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span 
                key={index} 
                className={`review-star ${index < rating ? 'review-star-filled' : 'review-star-empty'}`}
                aria-hidden="true"
            >
                ★
            </span>
        ));
    };

    return (
        <motion.figure
            className={`review-card ${compact ? 'review-card-compact' : ''}`}
            whileHover={{ 
                scale: compact ? 1.01 : 1.02,
                y: compact ? -2 : -4,
                transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: compact ? 10 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                delay: Math.random() * 0.2 
            }}
            role="article"
            aria-label={`Testimonio de ${name}`}
        >
            <div className="review-card-header">
                <img 
                    className="review-card-avatar" 
                    src={img} 
                    alt=""
                    width={compact ? "32" : "40"} 
                    height={compact ? "32" : "40"}
                    loading="lazy"
                />
                <div className="review-card-info">
                    <figcaption className="review-card-name">
                        {name}
                    </figcaption>
                    <p className="review-card-username">{username}</p>
                </div>
                <div className="review-card-rating" aria-label={`Calificación: ${rating} de 5 estrellas`}>
                    {renderStars(rating)}
                </div>
            </div>
            <blockquote className="review-card-body">
                &ldquo;{body}&rdquo;
            </blockquote>
        </motion.figure>
    );
}

// Validación de PropTypes
ReviewCard.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    rating: PropTypes.number,
    compact: PropTypes.bool
};