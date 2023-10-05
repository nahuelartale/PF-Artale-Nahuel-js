let cart = [];
        let total = 0;
        const cartIcon = document.getElementById('cart-icon');
        const cartCount = document.getElementById('cart-count');
        const cartDiv = document.getElementById('cart');
        const cartItemsList = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

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