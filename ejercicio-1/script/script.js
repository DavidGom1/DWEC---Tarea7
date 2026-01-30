/*
*   VARIABLES Y OBJETOS DEL DOM
*/
const url = 'https://jsonplaceholder.typicode.com/user';
var consulta = new XMLHttpRequest();
const cuerpoTabla = document.getElementById('cuerpoTabla');
const botonBuscar = document.getElementById('btnBuscar');
const inputBuscar = document.getElementById('inputBuscar');
let datos = [];


// CONSULTA Y PETICION
function pedirDatos() {
    fetch(url)
        .then(response => {
            console.log(response)
            if (response.status == 200) {
                return response.text();
            } else {
                throw "Respuesta incorrecta del servidor.";
            }
        })
        .then(responseText => {
            let users = JSON.parse(responseText).results;
            console.log('Este es el objeto de usuarios', users);
        })
        .catch(err => {
            console.log(err);
        })
}

// USO DE DATOS
function usoDatos(d) {
    d.forEach(e => {
        const datos = [e.name, e.address.street, e.address.city]
        const filaTabla = document.createElement('tr');
        for (i = 0; i < 3; i++) {
            const celdaTabla = document.createElement('td');
            celdaTabla.innerText = datos[i];
            filaTabla.appendChild(celdaTabla);
        }
        cuerpoTabla.appendChild(filaTabla);

    });
}

// PROCESAMIENTO DE RESPUESTA
function procesarRespuesta() {
    if (consulta.readyState == 4 && consulta.status == 200) {
        data = JSON.parse(consulta.responseText);
        usoDatos(data);
    }
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