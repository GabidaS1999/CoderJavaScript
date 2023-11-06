const productoAlCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"))

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector(".carrito-acciones-vaciar")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector(".carrito-acciones-comprar")

function cargarProductosCarrito() {
    if (productoAlCarrito && productoAlCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productoAlCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-imagen"
            src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carrito-producto-titulo">
            <small>Titulo</small>
            <h3>${producto.titulo}</h3>
         </div>
            <div class="carrito-producto-cantidad">
            <p>Cantidad</p>
            <small>${producto.cantidad}</small>
            
        </div>
        <div class="carrito-producto-precio">
        <p>Precio</p>
            <small>${producto.precio}</small>
            
        </div>
        <div class="carrito-producto-subtotal">
        <p>Sub Total</p>
            <small>${producto.precio * producto.cantidad}</small>
           
        </div>
        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
            `;
            contenedorCarritoProductos.append(div)
        });

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");

    }
    actualizarBotonesEliminar();
    actualizarTotal()
}
cargarProductosCarrito();


function actualizarBotonesEliminar(botonesEliminar) {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
};

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
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
        onClick: function () { } // Callback after click
    }).showToast();
    const idBoton = e.currentTarget.id;
    const productoEliminado = productoAlCarrito.find(producto => producto.id === idBoton);
    const index = productoAlCarrito.findIndex(producto => producto.id === idBoton);
    productoAlCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productoAlCarrito))
}

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {
    Swal.fire({
        title: "¿Estas seguro?",
        text: `Se van a borrar ${productoAlCarrito.reduce((acc, productos) => acc + productos.cantidad , 0)} productos`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No",
        confirmButtonText: "Si, estoy seguro"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Vaciado!",
                text: "Su carrito ha sido vaciado",
                icon: "success",
            });
            productoAlCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productoAlCarrito));
            cargarProductosCarrito();
        };
    });


}

function actualizarTotal() {
    const totalCalculado = productoAlCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$ ${totalCalculado}`
}

botonComprar.addEventListener("click", comprarCarrito)

function comprarCarrito() {
    Swal.fire({
        title: "¿Confirmar compra?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText:"No, quiero seguir comprando",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Compra exitosa!",
            text: "Su compra fue confirmada",
            icon: "success"
          });
          productoAlCarrito.length = 0;
          localStorage.setItem("productos-en-carrito", JSON.stringify(productoAlCarrito));
          cargarProductosCarrito();
          contenedorCarritoVacio.classList.add("disabled");
          contenedorCarritoAcciones.classList.add("disabled");
          contenedorCarritoProductos.classList.add("disabled");
          contenedorCarritoAcciones.classList.add("disabled");
          contenedorCarritoComprado.classList.remove("disabled");
        }
      });
   
}