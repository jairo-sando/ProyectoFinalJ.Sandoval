
function sumarAlCarrito(producto) {
  const memory = JSON.parse(localStorage.getItem("vehiculos"));
  console.log(memory);

  let cuenta = 0; 

  if (!memory) {
    const nuevoProducto = getNuevoProductoMemory(producto);
    localStorage.setItem("vehiculos", JSON.stringify([nuevoProducto]));
    cuenta = 1
  } else {
    const indiceProducto = memory.findIndex(
      vehiculo => vehiculo.id === producto.id
    );
    console.log(indiceProducto);

   
    const nuevaMemory = [...memory];

    if (indiceProducto === -1) {
      nuevaMemory.push(getNuevoProductoMemory(producto));
      cuenta = 1 ;
    } else {
      nuevaMemory[indiceProducto].cantidad++;
      cuenta = nuevaMemory[indiceProducto].cantidad;
    }

    localStorage.setItem("vehiculos", JSON.stringify(nuevaMemory));
    
  }

  actualizarNumeroCarrito();
  return cuenta;
}


function restarAlCarrito (producto){
  const memory = JSON.parse(localStorage.getItem("vehiculos"));
  const indiceProducto = memory.findIndex(
      vehiculo => vehiculo.id === producto.id
    );
  if(memory[indiceProducto].cantidad === 1) {

    memory.splice(indiceProducto, 1);
    
  } else {

    memory [indiceProducto].cantidad --;
  }
  localStorage.setItem("vehiculos", JSON.stringify(memory));

  actualizarNumeroCarrito();
}


function getNuevoProductoMemory(producto) {
  const nuevoProducto = { ...producto, cantidad: 1 }; 
  return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("contador-carrito"); 
function actualizarNumeroCarrito(){
  const memory = JSON.parse(localStorage.getItem("vehiculos"));
  if(memory && memory.length >0){
  
  const cuenta = memory.reduce((acum, current) => acum+current.cantidad,0 );
  cuentaCarritoElement.innerText = cuenta; 
  } else {
  cuentaCarritoElement.innerText = 0; 
  }
}



actualizarNumeroCarrito();


