let cart = [];
let total = 0;
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartDiv = document.getElementById('cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const searchInput = document.getElementById("search-input");
const productosContainer = document.getElementById("productos-container");

// Verificar si hay datos en el localStorage al cargar la página
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    actualizarCarrito();
}

// Agregar event listener para los botones
const buttons = document.querySelectorAll('button[data-product-name]');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product-name');
        const productPrice = parseFloat(button.getAttribute('data-product-price'));
        const productImage = button.getAttribute('data-product-image');
        agregarAlCarrito(productName, productPrice, productImage);
    });
});

function agregarAlCarrito(nombre, precio, imagen) {
    cart.push({ nombre, precio, imagen });
    total += precio;

    // Actualizar el contador del carrito
    cartCount.textContent = cart.length;

    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function eliminarDelCarrito(index) {
    total -= cart[index].precio;
    cart.splice(index, 1);

    cartCount.textContent = cart.length;

    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function actualizarCarrito() {
    cartItemsList.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            ${item.nombre} - $${item.precio}
            <button class="remove-button" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        cartItemsList.appendChild(li);
    });

    cartTotal.textContent = total;
}

function mostrarCarrito() {
    if (cartDiv.style.display === 'block') {
        cartDiv.style.display = 'none';
    } else {
        cartDiv.style.display = 'block';
    }
}

// Evento para mostrar/ocultar el carrito cuando se hace clic en el icono
cartIcon.addEventListener('click', () => {
    mostrarCarrito();
    actualizarCarrito();
});

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para buscar productos
function buscarProducto() {
    const searchText = searchInput.value.toLowerCase();
    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(searchText));

    // Limpiar los productos anteriores
    productosContainer.innerHTML = '';

    // Mostrar los productos coincidentes
    productosFiltrados.forEach(producto => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";

        productDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button data-product-name="${producto.nombre}" data-product-price="${producto.precio}" data-product-image="${producto.imagen}">Agregar al Carrito</button>
        `;

        productosContainer.appendChild(productDiv);
    });
}


// Agrega un evento para la barra de búsqueda
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filtrarProductos(searchTerm);
});

// Función para filtrar los productos
function filtrarProductos(termino) {
    const productos = document.querySelectorAll('.product');
    productos.forEach(producto => {
        const titulo = producto.querySelector('h3').textContent.toLowerCase();
        if (titulo.includes(termino)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}