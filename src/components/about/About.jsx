import './about.css';

export function About({ isSpanish }) {
    return (
        <div class="about" id="info">
            <div class="container">
                <div>
                    <h2>{isSpanish? "Permíteme presentarme":"Allow me to introduce myself"}</h2>
                    <p>{isSpanish? "Como estudiante de Ingenieria de sistemas, he pasado incontables noches programando, depurando y consumiendo cantidades poco saludables de cafeína. Uno de mis momentos más orgullosos fue desarrollar una aplicación y bases de datos para una empresa local, que aumentó su eficiencia en un 70%. En mi camino estudiantil, he estado contribuyendo en muchos proyectos de software basados en situaciones empresariales, ayudándome a mejorar mis habilidades como desarrollador de software.":"As a student in Computer Science, I've spent countless nights coding, debugging, and consuming unhealthy amounts of caffeine. One of my proudest moments was developing an application and databases for a local enterprise, which increased their efficiency by 70%. On my student path, I've been contributing in a lot of software projects based on business situations, helping me to improve my skills as a software developer."}</p>
                </div>
                    <img class="sobremii" src="/public/images/sobremi.jpg" alt="about"/>
            </div>
        </div>
    );
}