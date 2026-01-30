/*
*   VARIABLES Y OBJETOS DEL DOM
*/
const contenedorBicis = document.getElementById('bicicletas');  // guardo el contenedor de bicis
const selectCategoria = document.getElementById('selectCategoria');  // guardo el select de categorias
const urlBase = 'https://api.raulserranoweb.es/rest.php';  // guardo la url base de la API
const urlImg = 'https://api.raulserranoweb.es/imagenes_art/';  // guardo la url de las imagenes


// CONSULTA Y PETICION
async function pedirDatos(url){ // funcion asincrona que podré llamar en cualquier momento
    const response = await fetch(url); // guardo la respuesta de la consulta a la API

    if(!response.ok) throw new Error('Error recibiendo datos'); // si la respuesta no es correcta, lanzo un error

    const datos = await response.json(); // guardo los datos de la respuesta
    return datos;   // devuelvo los datos
}

// USO DE DATOS
function usoDatos(d){
    contenedorBicis.innerHTML = ''; // vacio el contenedor de bicis
    d.forEach(e => {    // recorro el array de datos
        const contenedorBici = document.createElement('div'); // creo un div para cada bici
        contenedorBici.classList = 'bici'; // le doy la clase bici
        const imagen = document.createElement('img'); // creo un img para la imagen
        const nombre = document.createElement('p'); // creo un p para el nombre
        const desc = document.createElement('p'); // creo un p para la descripcion
        const cat = document.createElement('p'); // creo un p para la categoria
        imagen.src = urlImg + e.cod; // le doy la ruta de la imagen
        nombre.innerHTML = '<b>Nombre: </b>' + e.nom; // le doy el nombre
        desc.innerHTML = '<b>Descripción: </b>' + e.des; // le doy la descripcion
        cat.innerHTML = '<b>Categoria: </b>' + e.cat; // le doy la categoria
        contenedorBici.append(imagen, nombre, desc, cat); // añado los elementos al contenedor
        contenedorBicis.appendChild(contenedorBici); // añado el contenedor al contenedor principal
    });
}

/*
*   PROCESAMIENTO
*/
(async () => {  // funcion asincrona que podré llamar en cualquier momento
    usoDatos( await pedirDatos(urlBase) ); // uso los datos
})();

selectCategoria.addEventListener('change', async (e) => { // evento change para el select
    let cat = e.target.value; // guardo el valor del select
    usoDatos( await pedirDatos(cat != 'Todas' ? urlBase + '?cat=' + cat : urlBase) ); // uso los datos
})