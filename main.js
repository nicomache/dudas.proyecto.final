const carrito = []
let lista = document.getElementById("listaProductos");
let usuario = document.getElementById("usuario");
let btnBuscador = document.getElementById("buscador");
let carritos 
let divNft = document.getElementById('divNfts');

function agregarAlCarrito(item) {

    carrito.push(item)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const comprar = (item) => {
    let total = carrito.reduce((acum, producto) => acum + producto.precio, 0);
    //let compraDefinitiva = prompt(`¿Desea comprar ${item.nombre} a ${item.precio}?`)
    //let compraCerrada = compraDefinitiva == "si" ? "Su compra ha sido exitosa" : "";
    Swal.fire({
        text: `¿Desea comprar ${item.nombre}, ${item.marca} a ${item.precio}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Felicitaciones',
            'Su compra a sido éxitosa.',
            'success'
          )
        }
      })
}


const pedirProductos = async () => {
    try{
        const response = await fetch("dataserver.json")
        const data = await response.json();
        const productos = data.results;

        data.forEach(item => {
            const li = document.createElement ("li");
            li.innerHTML = `
            <h2>${item.nombre}</h2>
            <img src=${item.imagen} class="ajuste-imagen" alt=${item.nombre}></img>
            <h3>${item.marca}</h3>
            <h3>$${item.precio}</h3>
            <button id="${item.id}-buy">Comprar</button>
            <button id="${item.id}-add">Agregar al carrito</button>`;
            
    
            lista.append(li)

            document.getElementById(`${item.id}-add`).addEventListener("click", ()=>{
                agregarAlCarrito(item)
            })
            document.getElementById(`${item.id}-buy`).addEventListener("click", ()=>{
                console.log(item)
                comprar(item);
            })
        });
    }
     catch (error) {
        console.log(error)
    }

};

const buscador = async () => {
    try{
        const response = await fetch("dataserver.json")
        const data = await response.json();
        btnBuscador.addEventListener("change", () =>{
           let inputBuscador = btnBuscador.value;
             let productosEncontrados = data.filter((item) => {
				return item.nombre.toLowerCase().includes(inputBuscador);
			});
           console.log(productosEncontrados)
           // divNft linea 117
           productosEncontrados.forEach((item) => {
             const li = document.createElement ("li");
             li.innerHTML = `
             <h2>${item.nombre}</h2>
             <img src=${item.imagen} class="ajuste-imagen" alt=${item.nombre}></img>
             <h3>${item.marca}</h3>
             <h3>$${item.precio}</h3>
             <button id="${item.id}-buy">Comprar</button>
             <button id="${item.id}-add">Agregar al carrito</button>`;
            
              let {id, nombre, precio} = item

              divNft.append(li)
              console.log(productosEncontrados)
              document.getElementById(`${item.id}-add`).addEventListener("click", ()=>{
                 agregarAlCarrito(item)
              })
              document.getElementById(`${item.id}-buy`).addEventListener("click", ()=>{
                 console.log(item)
                 comprar(item);
            })
        });
           
        }
    )}
     catch (error) {
        console.log(error)
    }

};


pedirProductos();


buscador();
  
