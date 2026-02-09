let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = document.getElementById("cart-count");
let cartItems = document.getElementById("cart-items");

function updateCartUI() {
    cartCount.innerText = cart.length;
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${item}
            <button onclick="removeFromCart(${index})" style="margin-left:10px;">❌</button>
        `;
        cartItems.appendChild(li);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productName) {
    cart.push(productName);
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Load cart on page refresh
updateCartUI();
function goToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html";
}

