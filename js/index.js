
const contenedorTarjetas = document.getElementById("productos-container");



function crearTarjetasProductos(productos){
  productos.forEach( producto => {
   const nuevoVehiculo = document.createElement ("div");
   nuevoVehiculo.classList = "tarjeta-producto"; 
   nuevoVehiculo.innerHTML = 
   ` <img src= "${producto.img}" alt="${producto.nombre}">
     <h3>${producto.nombre} </h3>
     <p> $${producto.precio} </p>
     <p> ${producto.descripcion} </p>
     <button> Agregar al Carrito </button>
    `
   contenedorTarjetas.appendChild(nuevoVehiculo);
   
   nuevoVehiculo.querySelector("button")
  .addEventListener("click", () => sumarAlCarrito(producto));

   
  });

}

crearTarjetasProductos(vehiculos);
