let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
document.getElementById('cart-count').innerText = cartCount;

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const productId = parseInt(product.dataset.id); 
        const productName = product.dataset.name;
        const productPrice = parseFloat(product.dataset.price);

        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity++; 
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        cartCount++;
        localStorage.setItem('cartCount', cartCount);
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cart-count').innerText = cartCount;

        alert(`${productName} has been added to your cart!`);
        displayCart(); 
    });
});

function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = cart.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
        </tr>
    `).join("");

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    document.getElementById("total-items").innerText = totalItems;
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
    document.getElementById("cart-count").innerText = totalItems; 
}

function updateQuantity(productId, newQuantity) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = Math.max(1, parseInt(newQuantity)); 
        localStorage.setItem('cart', JSON.stringify(cart)); 
        displayCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart)); 
    displayCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Proceeding to checkout...");
}
window.onload = displayCart;