// *****************************
// **** LENIS SMOOTH SCROLL ****
// *****************************

import Lenis from 'lenis'
// Initialize Lenis
const lenis = new Lenis();

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
    console.log(e);
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ************************
// **** CAMBIAR IDIOMA ****
// ************************

const button = document.getElementById('boton-cambiar-idioma');
let isSpanish = true; // Estado inicial, español

button.addEventListener('click', () => {
    // Cambiar el estado del idioma
    isSpanish = !isSpanish;

    const images = document.querySelectorAll('[data-lang-image]');
    images.forEach(image => {
        const newImage = isSpanish ? image.getAttribute('data-lang-es') : image.getAttribute('data-lang-en');
        image.src = newImage; // Cambia la fuente de la imagen
    });

    // Alternar el contenido
    document.querySelectorAll('[data-lang-en], [data-lang-es]').forEach(element => {
        element.textContent = isSpanish ? element.getAttribute('data-lang-es') : element.getAttribute('data-lang-en');
    });
});


// ************************
// **** CAMBIAR ICONOS ****
// ************************

const skillIcons = document.querySelectorAll('.slide i');

function addColoredClass(event) {
    event.target.classList.add('colored');
}

function removeColoredClass(event) {
    event.target.classList.remove('colored');
}

skillIcons.forEach(icon => {
    icon.addEventListener('mouseover', addColoredClass);
    icon.addEventListener('mouseout', removeColoredClass);
});


