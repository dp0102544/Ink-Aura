let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = document.getElementById("cart-count");
let cartItems = document.getElementById("cart-items");

function updateCartUI() {
    cartCount.innerText = cart.length;
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button onclick="removeFromCart(${index})">❌</button>
        `;
        cartItems.appendChild(li);
    });

    let totalLi = document.createElement("li");
    totalLi.style.fontWeight = "bold";
    totalLi.innerText = `Total: ₹${total}`;
    cartItems.appendChild(totalLi);

    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

updateCartUI();
