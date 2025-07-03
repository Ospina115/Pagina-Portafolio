/**
 * Contact.jsx - Componente de la sección de contacto
 * 
 * Sección que proporciona información de contacto y formas de comunicación
 * con el desarrollador. Incluye enlaces a redes sociales y email.
 * Dividido en dos secciones con efectos de liquid glass.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isSpanish - Determina si el contenido está en español
 * @returns {JSX.Element} Sección Contact renderizada
 * 
 * @author Samuel Ospina
 * @version 2.0.0
 */

import { motion } from 'framer-motion';
import './contact.css';

export function Contact({ isSpanish }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.95
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            x: -20 
        },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario
        console.log('Formulario enviado');
    };

    return (
        <section className="contact" id="contact" aria-label={isSpanish ? "Sección de contacto" : "Contact section"}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {isSpanish ? "Contacto" : "Contact"}
                </motion.h2>
                
                <motion.div 
                    className="contact-content"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Sección de información de contacto */}
                    <motion.div 
                        className="contact-info-card"
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="glass-effect">
                            <motion.h3
                                variants={itemVariants}
                            >
                                {isSpanish ? "¡Hablemos!" : "Let's talk!"}
                            </motion.h3>
                            
                            <motion.p
                                variants={itemVariants}
                            >
                                {isSpanish 
                                    ? "¿Tienes un proyecto en mente? ¡Me encantaría saber de ti! No dudes en contactarme para discutir oportunidades de colaboración."
                                    : "Got a project in mind? I'd love to hear from you! Feel free to reach out to discuss collaboration opportunities."
                                }
                            </motion.p>
                            
                            <motion.div 
                                className="contact-methods"
                                variants={itemVariants}
                            >
                                <motion.div 
                                    className="contact-method"
                                    whileHover={{ 
                                        scale: 1.02,
                                        x: 5
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <span className="icon">📧</span>
                                    <div>
                                        <h4>Email</h4>
                                        <a href="mailto:Ospina31@icloud.com">Ospina31@iCloud.com</a>
                                    </div>
                                </motion.div>
                                
                                <motion.div 
                                    className="contact-method"
                                    whileHover={{ 
                                        scale: 1.02,
                                        x: 5
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <span className="icon">💼</span>
                                    <div>
                                        <h4>LinkedIn</h4>
                                        <a href="https://www.linkedin.com/in/samuelospina15/" target="_blank" rel="noopener noreferrer">
                                            Samuel Ospina
                                        </a>
                                    </div>
                                </motion.div>
                                
                                <motion.div 
                                    className="contact-method"
                                    whileHover={{ 
                                        scale: 1.02,
                                        x: 5
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <span className="icon">💻</span>
                                    <div>
                                        <h4>GitHub</h4>
                                        <a href="https://github.com/Ospina115" target="_blank" rel="noopener noreferrer">
                                            @Ospina115
                                        </a>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                    
                    {/* Sección del formulario */}
                    <motion.div 
                        className="contact-form-card"
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="glass-effect">
                            <motion.h3
                                variants={itemVariants}
                            >
                                {isSpanish ? "Envíame un mensaje" : "Send me a message"}
                            </motion.h3>
                            
                            <motion.form 
                                onSubmit={handleSubmit}
                                variants={itemVariants}
                            >
                                <motion.div 
                                    className="form-group"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <label htmlFor="name">
                                        {isSpanish ? "Nombre" : "Name"}
                                    </label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        placeholder={isSpanish ? "Tu nombre" : "Your name"} 
                                        required 
                                    />
                                </motion.div>
                                
                                <motion.div 
                                    className="form-group"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        placeholder={isSpanish ? "tu@email.com" : "your@email.com"} 
                                        required 
                                    />
                                </motion.div>
                                
                                <motion.div 
                                    className="form-group"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <label htmlFor="message">
                                        {isSpanish ? "Mensaje" : "Message"}
                                    </label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        rows="5" 
                                        placeholder={isSpanish ? "Cuéntame sobre tu proyecto..." : "Tell me about your project..."} 
                                        required
                                    ></textarea>
                                </motion.div>
                                
                                <motion.button 
                                    type="submit" 
                                    className="submit-btn"
                                    whileHover={{ 
                                        scale: 1.05,
                                        boxShadow: "0 10px 30px rgba(82, 39, 255, 0.3)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span>{isSpanish ? "Enviar mensaje" : "Send message"}</span>
                                    <span className="btn-icon">🚀</span>
                                </motion.button>
                            </motion.form>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
