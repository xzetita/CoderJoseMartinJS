const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
     listaProductos.addEventListener('click', agregarProducto);

     carrito.addEventListener('click', eliminarProducto);


     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}




function agregarProducto(e) {
     if (e.target.classList.contains('agregar-carrito')) {
          const producto = e.target.parentElement.parentElement;
          leerDatosProductos(producto);
     }
}

function leerDatosProductos(producto) {
     const infoProducto = {
          titulo: producto.querySelector('h4').textContent,
          precio: producto.querySelector('.precio span').textContent,
          id: producto.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     }


     if (articulosCarrito.some(producto => producto.id === infoProducto.id)) {
          const productos = articulosCarrito.map(producto => {
               if (producto.id === infoProducto.id) {
                    producto.cantidad++;
                    return producto;
               } else {
                    return producto;
               }
          })
          articulosCarrito = [...productos];
     } else {
          articulosCarrito = [...articulosCarrito, infoProducto];
     }

     carritoHTML();
}

function eliminarProducto(e) {
     if (e.target.classList.contains('borrar-producto')) {
          const productoId = e.target.getAttribute('data-id')
          articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
          carritoHTML();
     }
}

function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(Producto => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
               <td>${Producto.titulo}</td>
               <td>${Producto.precio}</td>
               <td>${Producto.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${Producto.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

}

function vaciarCarrito() {
     while (contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}
