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

export function ReviewCard({ img, name, username, body }) {
    return (
        <motion.figure
            className="review-card"
            whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="review-card-header">
                <img 
                    className="review-card-avatar" 
                    src={img} 
                    alt={`Avatar de ${name}`}
                    width="32" 
                    height="32"
                />
                <div className="review-card-info">
                    <figcaption className="review-card-name">
                        {name}
                    </figcaption>
                    <p className="review-card-username">{username}</p>
                </div>
            </div>
            <blockquote className="review-card-body">{body}</blockquote>
        </motion.figure>
    );
}