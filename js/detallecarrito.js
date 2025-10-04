
const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById ("unidades");
const precioElement = document.getElementById ("precio");
const carritoVacioElement = document.getElementById ("carrito-vacio");
const totalesElement = document.getElementById ("totales"); 
const reinicarCarritoElement = document.getElementById ("reiniciar-carrito");
const confirmarCompraElement = document.getElementById ("confirmar-compra");

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

  } else {

    unidadesElement.innerText = 0;
    precioElement.innerText = 0;

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
  
  Swal.fire({
  title: "Confirmas que quieres eliminar los vehiculos elegidos ?",
  icon: "warning",
  showCancelButton: true,
  confirmarButtonText: "Confirmar",
  cancelButtonText: "Cancelar"
  }).then ((result)=> {
   if (result.isConfirmed) {
     localStorage.removeItem("vehiculos");
     actualizaTotales();
     crearTarjetasProductos();
     Swal.fire("Eliminado", "Tu carrito esta vacio", "success");
    } 
  });
}

confirmarCompraElement.addEventListener ("click", ()=> {
  Swal.fire({
    title: "Completa tus datos de reserva",
    html: `
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre y Apellido">
      <label style="display:block; text-align:left; margin-top:10px;">Fecha de Reserva:</label>
      <input id="swal-fecha-desde" type="date" class="swal2-input" placeholder="Desde">
      <input id="swal-fecha-hasta" type="date" class="swal2-input" placeholder="Hasta">
      <input id="swal-contacto" type="tel" class="swal2-input" placeholder="Número de contacto">
      <input id="swal-mail" type="email" class="swal2-input" placeholder="Correo electrónico">
    `,
    confirmButtonText: "Enviar Reserva",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nombre = document.getElementById("swal-nombre").value;
      const fechaDesde = document.getElementById("swal-fecha-desde").value;
      const fechaHasta = document.getElementById("swal-fecha-hasta").value;
      const contacto = document.getElementById("swal-contacto").value;
      const mail = document.getElementById("swal-mail").value;

      if (!nombre || !fechaDesde || !fechaHasta || !contacto || !mail) {
        Swal.showValidationMessage("Por favor completa todos los campos");
        return false;
      }

      if (new Date(fechaHasta) < new Date(fechaDesde)) {
        Swal.showValidationMessage("La fecha 'hasta' no puede ser menor que la fecha 'desde'");
        return false;
      }

      return { nombre, fechaDesde, fechaHasta, contacto, mail };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("Datos de reserva:", result.value);
      Swal.fire(
        "¡Reserva realizada, en breve nos contactaremos para confirmar la misma!",
        `Desde: ${result.value.fechaDesde} <br> Hasta: ${result.value.fechaHasta}`,
        "success"
      );
    }
  });
});
