let carrito = JSON.parse(localStorage.getItem("carrito") || [])


carrito.forEach(item => {
    const div = document.createElement("div");

    div.innerHTML +=   `
    <h2>${item.nombre}</h2>
    <img class="ajuste-imagen" src="${item.imagen}" alt="${item.nombre}"</img>
    <p>$${item.precio}</p>
    <p>${item.marca}</p>
    <button id="${item.id}-delete">Eliminar de la lista</button>
   `
   document.body.append(div)
   
   document.getElementById(`${item.id}-delete`).addEventListener
   ("click", ()=> {eliminarDelCarrito()
   });

});

const comprar = () => {
    let total = carrito.reduce((acum, producto) => acum + producto.precio, 0);
    let compraDefinitiva = prompt(`¿Desea comprar por un total de $${total}?`)
    let compradefinitiva = "si" || compraDefinitiva == "Si" ? "Su compra ha sido exitosa" : "";
        alert(compradefinitiva)
}

document.getElementById("compra").addEventListener 
("click", ()=>{ comprar()
});



function eliminarDelCarrito(item) {
    
    let productoBorrar = `${item}`;
    let productoABorrar = carrito.indexOf(productoBorrar);    
    carrito.splice(productoABorrar, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito))
}


/*
COMPRA EXITOSA
Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
})
*/