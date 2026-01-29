/*
*   VARIABLES Y OBJETOS DEL DOM
*/
const contenedorBicis = document.getElementById('bicicletas');
const selectCategoria = document.getElementById('selectCategoria');
const urlBase = 'https://api.raulserranoweb.es/rest.php';
const urlImg = 'https://api.raulserranoweb.es/imagenes_art/';


// CONSULTA Y PETICION
async function pedirDatos(url){ // funcion asincrona que podré llamar en cualquier momento
    const response = await fetch(url); //

    if(!response.ok) throw new Error('Error recibiendo datos');

    const datos = await response.json();
    return datos;
}

// USO DE DATOS
function usoDatos(d){
    contenedorBicis.innerHTML = '';
    d.forEach(e => {
        const contenedorBici = document.createElement('div');
        contenedorBici.classList = 'bici';
        const imagen = document.createElement('img');
        const nombre = document.createElement('p');
        const desc = document.createElement('p');
        const cat = document.createElement('p');
        imagen.src = urlImg + e.cod;
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
(async () => {
    usoDatos( await pedirDatos(urlBase) );
})();

selectCategoria.addEventListener('change', async (e) => {
    let cat = e.target.value;
    usoDatos( await pedirDatos(cat != 'Todas' ? urlBase + '?cat=' + cat : urlBase));
})