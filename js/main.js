let productos = [];

const productosFetch = async ()=>{
   const productosF = await fetch("./js/productos.json")
   .then(response => response.json())
   .then(data => {
       productos = data;
       cargarProductos(productos);
   })
}

productosFetch();

const contenedorProductos = document.querySelector("#contenedor-productos")

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";
    
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `   
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="prodcuto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar a carrito</button>
        </div> `

        contenedorProductos.append(div);
    });
    actualizarBotones();
}


const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) =>{

        botonesCategorias.forEach(boton => {boton.classList.remove("active")});
        e.currentTarget.classList.add("active");

      if (e.currentTarget.id != "todos") {
        const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)

        tituloPrincipal.innerText = productoCategoria.categoria.nombre;

        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);

        cargarProductos(productosBoton);
      }else{
        tituloPrincipal.innerText = "Todos los productos"
        cargarProductos(productos);
      }
    })
});

function actualizarBotones(botonesAgregar){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};


let productoAlCarrito;

const productoAlCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
if (productoAlCarritoLS) {
    productoAlCarrito = productoAlCarritoLS;
    actualizarNumero();
}else{
    productoAlCarrito = []
}



function agregarAlCarrito (e){
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        destination: "./carrito.html",
        newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, rgb(221, 0, 0), rgb(241, 138, 4))",
          borderRadius: "50px",
          textTransform: "uppercase",
          fontSize: "15px",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productoAlCarrito.some(producto => producto.id === idBoton)) {
       const index = productoAlCarrito.findIndex(producto => producto.id === idBoton);
        productoAlCarrito[index].cantidad++
    }else{
        productoAgregado.cantidad = 1;
        productoAlCarrito.push(productoAgregado);
    }  
    actualizarNumero();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productoAlCarrito))
}


function actualizarNumero (){
    let nuevoNumerito = productoAlCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
