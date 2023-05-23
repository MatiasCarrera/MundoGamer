
class Productos {
    constructor(titulo, imagen, id, precio,categoria) {
        this.titulo = titulo;
        this.imagen = imagen;
        this.id = id;
        this.precio = precio;
        this.categoria = categoria;
    }
}
const productoCargado = [];
// productoCargado.push(new Productos())
productoCargado.push(new Productos("FIFA23", './img/juegos/Fifa23.jpeg' , 'fifa23', 12000, 'Juegos PS5'));
productoCargado.push(new Productos("Assasin's Creed Valhalla", './img/juegos/acvalhalla.jpeg','acvalhalla',9000,'Juegos PS5'))
productoCargado.push(new Productos("Gran Turismo 7", "./img/juegos/gt7.jpeg",'gt7', 10000, 'Juegos PS5'));
productoCargado.push(new Productos("Hogwarts Legacy", "./img/juegos/hogwarts.jpeg","hogwarts legacy",11500,'Juegos PS5' ));
productoCargado.push(new Productos("NBA2k23","./img/juegos/nba2k.jpeg","nba2k23",11000, "juegos PS5"));
productoCargado.push(new Productos("Resident Evil 4","./img/juegos/re4.jpeg","residente evil 4",8000,"Juegos PS5"));
productoCargado.push(new Productos('PS4','./img/consolas/ps4.jpg','ps4',150000,'Consolas'));
productoCargado.push(new Productos('PS5','./img/consolas/ps5.jpg','ps5',30000,'Consolas'))
productoCargado.push(new Productos('Nintendo Switch','./img/consolas/nintendoswitch.jpeg','nintendo switch',150000))
productoCargado.push(new Productos('XBOX Serie S','./img/consolas/xboxseries.jpeg','xboxseries',200000,'Consolas'))
productoCargado.push(new Productos('XBOX Serie X','./img/consolas/xboxseriex.jpg','xboxseriex',300000,'Consolas'))
productoCargado.push(new Productos('Nvidia RTX 3080',"./img/juegos/Fifa23.jpeg",'rtx3080',300000,'Componentes PC'))

const contenedorProductos  = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
let numerito = document.querySelector('#numerito')

function cargarProductos(productosElegidos){
    contenedorProductos.innerHTML="";
    productosElegidos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto')
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
<div class="producto-detalles">
    <h3 class="producto-titulo">${producto.titulo}</h3>
    <p class="producto-precio">$${producto.precio}</p>
    <button class="producto-agregar" id="${producto.id}">Agregar</button>
</div>
        `;
        contenedorProductos.append(div)
    })
    actualizarBotonAgregar()
}
 
cargarProductos(productoCargado)


botonesCategorias.forEach(boton=>{
    boton.addEventListener("click", (e)=>
    {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !="todos"){
            const productoCategoria= productoCargado.find(producto=>producto.categoria === e.currentTarget.id)
        
            tituloPrincipal.innerHTML = productoCategoria.categoria
        const productosBoton=productoCargado.filter(producto=>producto.categoria === e.currentTarget.id);
        cargarProductos(productosBoton);
    }else {
        tituloPrincipal.innerHTML = 'Todos los productos'
        cargarProductos(productoCargado);
    }
    })
})

function actualizarBotonAgregar(){
    botonesAgregar = document.querySelectorAll('.producto-agregar');

    botonesAgregar.forEach(boton=>{
        boton.addEventListener('click',agregarCarrito)
    })
}


let productosCarrito = []
 let productosCarritoLS = localStorage.getItem('productos-en-carrito');

if(productosCarritoLS)
{
    productosCarrito= JSON.parse(productosCarritoLS);
    actualizarNumero();
}else
{
      productosCarrito=[]
}


function agregarCarrito(e){
const idBoton=e.currentTarget.id;
const productoAgregado= productoCargado.find(producto=>producto.id === idBoton);
if(productosCarrito.some(producto=>producto.id===idBoton))
{
    const index = productosCarrito.findIndex(producto=>producto.id===idBoton);
    productosCarrito[index].cantidad++
}else
{
    productoAgregado.cantidad=1;
    productosCarrito.push(productoAgregado);
}
actualizarNumero()
localStorage.setItem('productos-en-carrito',JSON.stringify(productosCarrito))
}

function actualizarNumero(){
    let nuevoNumerito=productosCarrito.reduce((acc, producto)=>acc + producto.cantidad,0);
    numerito.innerText  = nuevoNumerito;
}