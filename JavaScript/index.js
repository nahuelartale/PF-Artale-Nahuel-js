// Variables
let carrito = [];
let total = 0;
let productos = []; // Variable para almacenar los productos cargados desde el JSON

// Función para cargar productos mediante AJAX
function cargarProductos() {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      productos = JSON.parse(xhr.responseText);
      mostrarProductos(productos);
    }
  };

  xhr.open('GET', 'productos.json', true);
  xhr.send();
}

// Función para mostrar los productos en la página
function mostrarProductos(productos) {
  const contenedorProductos = document.getElementById('productos');
  contenedorProductos.innerHTML = '';

  productos.forEach(producto => {
    const divProducto = document.createElement('div');
    divProducto.className = 'producto';

    divProducto.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="producto-info">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Comprar</button>
      </div>
    `;

    contenedorProductos.appendChild(divProducto);
  });
}

// Función para buscar productos por nombre
function buscarProducto(termino) {
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(termino.toLowerCase())
  );

  mostrarProductos(productosFiltrados);
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
  const productoSeleccionado = productos.find(producto => producto.id === id);

  if (productoSeleccionado) {
    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.id === id);

    if (productoEnCarrito) {
      // Incrementar la cantidad en lugar de agregar uno nuevo
      productoEnCarrito.cantidad++;
    } else {
      // Agregar el producto al carrito con cantidad 1
      carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }

    total += productoSeleccionado.precio;

    actualizarCarrito(); // Llamamos a la función para actualizar el carrito
  }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
  const index = carrito.findIndex(item => item.id === id);

  if (index !== -1) {
    const productoEliminado = carrito.splice(index, 1)[0];
    total -= productoEliminado.precio * productoEliminado.cantidad;
    actualizarCarrito(); // Llamamos a la función para actualizar el carrito
  }
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total');

  listaCarrito.innerHTML = '';
  totalElemento.textContent = total.toFixed(2);

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <span class="eliminar-producto" onclick="eliminarDelCarrito(${item.id})">Eliminar</span>
      <img src="${item.imagen}" alt="${item.nombre}" style="max-width: 50px; max-height: 50px; object-fit: cover; margin-left: 10px;">
    `;
    listaCarrito.appendChild(li);
  });
}

// Función para mostrar el carrito al hacer clic en el ícono
function mostrarCarrito() {
  const carritoPopup = document.getElementById('carrito-popup');
  carritoPopup.style.display = (carritoPopup.style.display === 'block') ? 'none' : 'block';
}

// Cargar productos al cargar la página
cargarProductos();