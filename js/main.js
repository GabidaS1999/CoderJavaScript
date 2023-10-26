const productos = [
    //PERFUMES HOMBRE
    {
        id: "bad-boy",
        titulo: "Perfume Bad Boy",
        imagen: "./multimedia/perfumes/perfumesHombres/bad-boy-100ml-removebg-preview.png",
        categoria: {
            nombre: "Perfumes Hombres",
            id: "perfumes-hombres"
        },
        precio: 6300,
    },
    {
        id: "hugo-boss",
        titulo: "Perfume Hugo Boss",
        imagen: "./multimedia/perfumes/perfumesHombres/hugo-boss-removebg-preview.png",
        categoria: {
            nombre: "Perfumes Hombres",
            id: "perfumes-hombres"
        },
        precio: 6087,
    },
    {
        id: "polo-black",
        titulo: "Perfume Polo Black",
        imagen: "./multimedia/perfumes/perfumesHombres/polo-black-125ml-removebg-preview.png",
        categoria: {
            nombre: "Perfumes Hombres",
            id: "perfumes-hombres"
        },
        precio: 6400,
    },

    //PERFUMES MUJERES
    {
        id: "212",
        titulo: "Perfume 212",
        imagen: "./multimedia/perfumes/perfumesMujer/212-carolinaHerrera-removebg-preview.png",
        categoria: {
            nombre: "Perfumes Mujeres",
            id: "perfumes-mujeres"
        },
        precio: 3500,
    },
    {
        id: "good-girl",
        titulo: "Perfume Good Girl",
        imagen: "./multimedia/perfumes/perfumesMujer/good-girl-removebg-preview.png",
        categoria: {
            nombre: "Perfumes Mujeres",
            id: "perfumes-mujeres"
        },
        precio: 6000,
    },
    {
        id: "my-way",
        titulo: "Perfume My Way",
        imagen: "./multimedia/perfumes/perfumesMujer/my-way-removebg-preview.png",
        categoria: {
            nombre: "Perfumes Mujeres",
            id: "perfumes-mujeres"
        },
        precio: 3500,
    },
];

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
cargarProductos(productos);

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
