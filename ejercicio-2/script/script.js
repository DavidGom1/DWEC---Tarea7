/*
*   VARIABLES Y OBJETOS DEL DOM
*/
var consulta = new XMLHttpRequest();
const contenedorBicis = document.getElementById('bicicletas');
const selectCategoria = document.getElementById('selectCategoria');
let urlBase = 'https://api.raulserranoweb.es/rest.php';


// CONSULTA Y PETICION
function pedirDatos(url){
    consulta.onreadystatechange = procesarRespuesta;
    consulta.open('GET', url, true);
    consulta.send(null);
}

// USO DE DATOS
function usoDatos(d){
    contenedorBicis.innerHTML = '';
    d.forEach(e => {
        console.log(e)
        const contenedorBici = document.createElement('div');
        contenedorBici.classList = 'bici';
        const imagen = document.createElement('img');
        const nombre = document.createElement('p');
        const desc = document.createElement('p');
        const cat = document.createElement('p');
        imagen.src = 'https://api.raulserranoweb.es/imagenes_art/' + e.cod;
        nombre.innerHTML = '<b>Nombre: </b>' + e.nom;
        desc.innerHTML = '<b>Descripción: </b>' + e.des;
        cat.innerHTML = '<b>Categoria: </b>' + e.cat;
        contenedorBici.append(imagen, nombre, desc, cat);
        contenedorBicis.appendChild(contenedorBici);
    });
}

// PROCESAMIENTO DE RESPUESTA
function procesarRespuesta(){
    if(consulta.readyState == 4 && consulta.status == 200){
        let data = JSON.parse(consulta.responseText);
        usoDatos(data);
    }
}


/*
*   PROCESAMIENTO
*/
pedirDatos(urlBase);

selectCategoria.addEventListener('change', (e) => {
    let cat = e.target.value;
    pedirDatos(cat != 'Todas' ? urlBase + '?cat=' + cat : urlBase);
});