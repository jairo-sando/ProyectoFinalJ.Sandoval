
const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById ("unidades");
const precioElement = document.getElementById ("precio");
const carritoVacioElement = document.getElementById ("carrito-vacio");
const totalesElement = document.getElementById ("totales"); 
const reinicarCarritoElement = document.getElementById ("reiniciar-carrito");

function crearTarjetasProductos() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("vehiculos"));

  console.log(productos);

  if (productos && productos.length > 0) {
    productos.forEach(producto => {
      const nuevoVehiculo = document.createElement("div");
      nuevoVehiculo.classList = "tarjeta-producto";
      nuevoVehiculo.innerHTML = `
        <img src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <div>
          <button> - </button>
          <span class="cantidad"> ${producto.cantidad}</span>
          <button> + </button>
        </div>
      `;
      contenedorTarjetas.appendChild(nuevoVehiculo);
    //Sumar unidades al Carrito 
      nuevoVehiculo.
      getElementsByTagName("button")[1]
      .addEventListener("click", (e) => {
       
        const cuentaElement = e.target.parentElement.getElementsByTagName("span") [0];
        cuentaElement.innerHTML = sumarAlCarrito(producto);
        actualizaTotales ();

    });
    //Restar unidades del carrito
      nuevoVehiculo
      .getElementsByTagName("button")[0]
      .addEventListener("click", (e) => {
       restarAlCarrito(producto);
       crearTarjetasProductos();
       actualizaTotales ();

            

    });

    });
  }
}


crearTarjetasProductos();
actualizaTotales (); 


function actualizaTotales (){

  const productos = JSON.parse(localStorage.getItem("vehiculos"));
  let unidades = 0 ;
  let precio = 0 ; 


  if ( productos && productos.length > 0 ) {
   
    productos.forEach( producto =>{
      unidades += producto.cantidad; 
      precio += producto.precio * producto.cantidad ;

    })  

    unidadesElement.innerText = unidades;
    precioElement.innerText = precio; 
  }

   MensajeVacio(); 
}

function MensajeVacio() {
   const productos = JSON.parse(localStorage.getItem("vehiculos"));
   carritoVacioElement.classList.toggle("unidadesvacias",productos && productos.length>0);
   totalesElement.classList.toggle("unidadesvacias",!(productos && productos.length>0));


}

MensajeVacio();


reinicarCarritoElement.addEventListener("click", reiniciarCarrito);

function reiniciarCarrito(){

  localStorage.removeItem("vehiculos");
  actualizaTotales ();
  crearTarjetasProductos();
}