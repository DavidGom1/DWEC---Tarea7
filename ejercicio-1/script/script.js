/*
*   VARIABLES Y OBJETOS DEL DOM
*/
const url = 'https://jsonplaceholder.typicode.com/users';
var consulta = new XMLHttpRequest();
const cuerpoTabla = document.getElementById('cuerpoTabla');
const botonBuscar = document.getElementById('btnBuscar');
const inputBuscar = document.getElementById('inputBuscar');
let datos = [];


// CONSULTA Y PETICION
function pedirDatos() {
    fetch(url)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw "Respuesta incorrecta del servidor.";
            }
        })
        .then(data => {
            datos = data;
            usoDatos(data);
        })
        .catch(err => {
            console.log(err);
        })
}

// USO DE DATOS
function usoDatos(d) {
    d.forEach(e => {
        cuerpoTabla.innerHTML += 
        `<tr>
            <td>${e.name}</td>
            <td>${e.address.street}</td>
            <td>${e.address.city}</td>
        </tr>`;
    });
}


// PROCESAMIENTO
(async () => {
    const usuarios = await pedirDatos();
    if(usuarios) usoDatos(usuarios);
})();

botonBuscar.addEventListener('click', (e) => {
    e.preventDefault();
    let texto = inputBuscar.value.trim();
    let datosFiltrados = datos.filter(e => e.name.toLowerCase().includes(texto.toLowerCase()));
    cuerpoTabla.innerHTML = '';
    usoDatos(datosFiltrados);
});