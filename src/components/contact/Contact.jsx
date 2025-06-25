/**
 * Contact.jsx - Componente de la sección de contacto
 * 
 * Sección que proporciona información de contacto y formas de comunicación
 * con el desarrollador. Incluye enlaces a redes sociales y email.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isSpanish - Determina si el contenido está en español
 * @returns {JSX.Element} Sección Contact renderizada
 * 
 * @author Samuel Ospina
 * @version 1.0.0
 */

import './contact.css';

export function Contact({ isSpanish }) {
    return (
        <section className="contact" id="contact" aria-label={isSpanish ? "Sección de contacto" : "Contact section"}>
            <div className="container">
                <h2>{isSpanish ? "Contacto" : "Contact"}</h2>
                
                <div className="contact-content">
                    <div className="contact-info">
                        <h3>{isSpanish ? "¡Hablemos!" : "Let's talk!"}</h3>
                        <p>
                            {isSpanish 
                                ? "¿Tienes un proyecto en mente? ¡Me encantaría saber de ti! No dudes en contactarme para discutir oportunidades de colaboración."
                                : "Got a project in mind? I'd love to hear from you! Feel free to reach out to discuss collaboration opportunities."
                            }
                        </p>
                        
                        <div className="contact-methods">
                            <div className="contact-method">
                                <span className="icon">📧</span>
                                <div>
                                    <h4>Email</h4>
                                    <a href="mailto:tu-email@ejemplo.com">tu-email@ejemplo.com</a>
                                </div>
                            </div>
                            
                            <div className="contact-method">
                                <span className="icon">💼</span>
                                <div>
                                    <h4>LinkedIn</h4>
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        Samuel Ospina
                                    </a>
                                </div>
                            </div>
                            
                            <div className="contact-method">
                                <span className="icon">💻</span>
                                <div>
                                    <h4>GitHub</h4>
                                    <a href="https://github.com/Ospina115" target="_blank" rel="noopener noreferrer">
                                        @Ospina115
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="contact-form">
                        <h3>{isSpanish ? "Envíame un mensaje" : "Send me a message"}</h3>
                        <form>
                            <div className="form-group">
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
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder={isSpanish ? "tu@email.com" : "your@email.com"} 
                                    required 
                                />
                            </div>
                            
                            <div className="form-group">
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
                            </div>
                            
                            <button type="submit" className="submit-btn">
                                {isSpanish ? "Enviar mensaje" : "Send message"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
