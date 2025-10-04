let vehiculos= [];

fetch ("./js/vehiculos.json")
   .then(response => response.json())
   .then(data => {
     vehiculos = data; 
     crearTarjetasProductos(vehiculos);

   })

const contenedorTarjetas = document.getElementById("productos-container");



function crearTarjetasProductos(productos){
  contenedorTarjetas.innerHTML = "";
  productos.forEach( producto => {
   const nuevoVehiculo = document.createElement ("div");
   nuevoVehiculo.classList = "tarjeta-producto"; 
   nuevoVehiculo.innerHTML = 
   ` <img src= "${producto.img}" alt="${producto.nombre}">
     <h3>${producto.nombre} </h3>
     <p> $${producto.precio} (Por día) </p>
     <p> ${producto.descripcion} </p>
     <button> Agregar al Carrito </button>
    `;
   contenedorTarjetas.appendChild(nuevoVehiculo);
   
   nuevoVehiculo.querySelector("button")
  .addEventListener("click", () => sumarAlCarrito(producto));

   
  });

}

//crearTarjetasProductos(vehiculos);

const linkAutos = document.querySelector('a[href="#autos"]');
const linkMotos = document.querySelector('a[href="#motos"]');

linkAutos.addEventListener("click", (e) => {
  e.preventDefault();
  const autos = vehiculos.filter(v => v.categoria === "Autos");
  crearTarjetasProductos(autos);
});

linkMotos.addEventListener("click", (e) => {
  e.preventDefault();
  const motos = vehiculos.filter(v => v.categoria === "Motocicletas");
  crearTarjetasProductos(motos);
});
