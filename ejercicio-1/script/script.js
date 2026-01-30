/*
*   VARIABLES Y OBJETOS DEL DOM
*/
const url = 'https://jsonplaceholder.typicode.com/users';   // guardo la url de la API
const cuerpoTabla = document.getElementById('cuerpoTabla');  // guardo el cuerpo de la tabla
const botonBuscar = document.getElementById('btnBuscar');    // guardo el boton de buscar
const inputBuscar = document.getElementById('inputBuscar');  // guardo el input de buscar
let datos = [];


// CONSULTA Y PETICION
function pedirDatos() {  // funcion que pedira los datos, lo voy a probar aqui como dice el contenido, y en el 2 lo haré a mi manera
    fetch(url)  // pido los datos
        .then(response => {  // proceso la respuesta
            if (response.status == 200) {  // si la respuesta es correcta
                return response.json();  // devuelvo los datos
            } else {
                throw "Respuesta incorrecta del servidor.";  // si no es correcta, lanzo un error
            }
        })
        .then(data => {  // proceso los datos   
            datos = data;   // guardo los datos en la global para luego usarlos en el filtro
            usoDatos(data);  // uso los datos
        })
        .catch(err => {  // proceso el error
            console.log(err);  // muestro el error
        })
}

// USO DE DATOS
function usoDatos(d) {  // funcion que usara los datos
    d.forEach(e => {  // recorro el array de datos
        cuerpoTabla.innerHTML +=    // voy añadiendo filas a la tabla
        `<tr>   
            <td>${e.name}</td>
            <td>${e.address.street}</td>
            <td>${e.address.city}</td>
        </tr>`;
    });
}


// PROCESAMIENTO
(async () => {  // funcion asincrona que podré llamar en cualquier momento
    const usuarios = await pedirDatos();  // pido los datos
    if(usuarios) usoDatos(usuarios);  // uso los datos
})();

botonBuscar.addEventListener('click', (e) => {  // evento click para el boton de buscar
    e.preventDefault();  // evito el comportamiento por defecto
    let texto = inputBuscar.value.trim();  // guardo el texto del input
    let datosFiltrados = datos.filter(e => e.name.toLowerCase().includes(texto.toLowerCase()));  // filtro los datos
    cuerpoTabla.innerHTML = '';  // vacio la tabla
    usoDatos(datosFiltrados);  // uso los datos filtrados
});