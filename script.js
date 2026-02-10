// ===== CART =====
let cart = [];
let cartCount = document.getElementById("cart-count");
let cartItems = document.getElementById("cart-items");

function addToCart(name, price) {
    cart.push({ name, price });
    cartCount.textContent = cart.length;

    cartItems.innerHTML = "";
    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(li);
    });
}

// ===== CATEGORY FILTER =====
function filterCategory(category) {
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });

    // active button highlight
    document.querySelectorAll(".filters button").forEach(btn => {
        btn.classList.remove("active");
    });
}

// ===== SEARCH =====
function searchProducts() {
    const input = document.getElementById("search").value.toLowerCase();
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const name = product.querySelector("h3").textContent.toLowerCase();
        product.style.display = name.includes(input) ? "block" : "none";
    });
}
