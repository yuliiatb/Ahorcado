/* 
Juego "Ahorcado"

Para empezar, hay que pulsar "Empezar". El programa generará un sustantivo y los usuarios tendrán 
12 intentos para adivinarlo. Hay que pulsar los botones con las letras para intentar resolver la palabra.
El programa muestra cuántas letras tiene la palabra generada.
Para la comodidad, los botones cambian el color: verde - si la letra es correcta; rojo - incorrecta. 
Cuando los usuarios ganan o pierden, se muestra el correspondiente mensaje, y se puede reiniciar el juego. 
El programa mostrará cuántos intentos quedan y avisará al usuario si le quedó el último intento. Si durante la
partida los usuarios pulsan el botón "Adivina la palabra", el juego se reinicia.

Mejoras para el futuro: 
- añadir la funcionalidad que reconoce las tildes;
- no permitir que las letras aparezcan en el textarea si los usuarios ponen cursor y teclean ahí;
- alternativamente, permitir usar el teclado junto con los botones de la aplicación; 
- varios temas: añadir botomes o un menú para poder elegir el tema de las palabras para adivinar.
*/

const listaPalabras = ['semaforo', 'ordenador', 'jardin', 'biblioteca', 'estacion', 'telefono', 'congelador', 'arbol', 
    'camiseta', 'guitarra', 'atardecer', 'mariposa', 'ventana', 'cuaderno', 'bicicleta', 'carpintero', 'ventilador', 'almohada', 
    'espejo', 'botella', 'crucero', 'margarita', 'paraguas', 'almacen', 'estrella', 'filosofia', 'pantalon', 'cuchara', 'armario', 
    'cafeteria', 'sombrero', 'concierto', 'pelicula', 'camara', 'dinosaurio', 'murcielago', 'estudiante', 'zapatilla', 'ordenador', 'piscina', 
    'ardilla', 'atletismo', 'escritorio', 'almuerzo', 'fiesta', 'gaviota', 'baloncesto', 'pintura', 'abogado', 'oficina', 'toalla', 'serpiente'];

const guia = document.querySelector("#guia");
const texto = document.querySelector("#texto");
const campo = document.querySelector("#campo");
const botonLetra = document.querySelectorAll(".letra");

let palabraGenerada = "";
let palabraEscondida = "";
let palabraModificada = "";
let letraPulsada;

guia.onclick = empezarJuego;
let contador = 12;

//empezar el juego y generar una palabra
function empezarJuego() {
    campo.style.backgroundColor = "";
    contador = 12;
    let indiceDePalabra = Math.floor(Math.random()* listaPalabras.length);
    palabraGenerada = listaPalabras[indiceDePalabra];
    
    palabraEscondida = "_ ".repeat(palabraGenerada.length).trim(); 
    
    texto.innerText = "Se ha generado una palabra que consiste de " + palabraGenerada.length + " letras.";
    guia.innerText = "¡Adivina la palabra!";

    palabraModificada = palabraEscondida;
    
    botonLetra.forEach(boton => {
        boton.style.backgroundColor = "";
        boton.disabled = false;
    });

    campo.value = palabraEscondida; 
} //empezarJuego

//eventos - todos los botones de las letras; cada botón, cuando lo pulsan, se pasa a la función
botonLetra.forEach(boton => {
    boton.addEventListener('click', function() {
        comprobarLetra(this); 
    });
});

//comprobr si la letra existe y cambiar el color del botón
function comprobarLetra(boton) {
    
    letraPulsada = boton.getAttribute("data-letra").toLowerCase();
    
    let letraAdivinada = false;
       
        for (let j = 0; j < palabraGenerada.length; j++) {
            if (palabraGenerada[j] === letraPulsada) {
                letraAdivinada = true;
                break; 
            }
        }

        if (letraAdivinada) {
            boton.style.backgroundColor = "green";
            mostrarLetraAdivinada(letraPulsada);
        } else {
            boton.style.backgroundColor = "red";
        }

    boton.disabled = true;

    contador--;
    texto.innerText = "Te quedan " + contador + " intentos."  

    //condiciones para ganar o perder el juego
    if (contador === 1) {
        texto.innerHTML = "<b>¡Te queda 1 intento!</b>";
    }
    if (contador === 0 && palabraGenerada !== palabraModificada.replace(/ /g, '')) {
        perdiste();   
    }
    else if (contador >= 0 && palabraGenerada === palabraModificada.replace(/ /g, '')) {
        ganaste();
    }
}
 
function mostrarLetraAdivinada (letraPulsada) {
    palabraModificada = ""; 
    
    for (let k = 0; k < palabraGenerada.length; k++) {
        if (palabraGenerada[k] === letraPulsada) {
            palabraModificada += letraPulsada + " ";
        } else {
            palabraModificada += palabraEscondida[k*2] + " "; //si borro este espcio - undefined
        }
    }
    
    palabraEscondida = palabraModificada;
    
    campo.value = palabraModificada.trim();
} 

function perdiste() {
    texto.innerHTML = "¡Lo siento, perdiste! La palabra era " + "<b>" + palabraGenerada.toUpperCase() + "</b>";
    campo.style.backgroundColor = "red";
    reiniciar();
}

function ganaste() {
    texto.innerHTML = "<b>¡Enhorabuena, ganaste!</b>"
    campo.style.backgroundColor = "green";
    reiniciar();
}

function reiniciar() {
    contador = 12;
    
    botonLetra.forEach(boton => {
        boton.style.backgroundColor = "";
        boton.disabled = false;
    });

    guia.innerText = "Jugar de nuevo";
}