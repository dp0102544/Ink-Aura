/* ===============================
   LOAD CART
================================ */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ===============================
   SAVE CART
================================ */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===============================
   ADD TO CART
================================ */
function addToCart(name, price) {

    // Check if product already exists
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCart();
}

/* ===============================
   INCREASE QUANTITY
================================ */
function increaseQty(index) {
    cart[index].quantity += 1;
    saveCart();
    updateCart();
}

/* ===============================
   DECREASE QUANTITY
================================ */
function decreaseQty(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}

/* ===============================
   UPDATE CART UI
================================ */
function updateCart() {
    const cartList = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");

    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = "<li>Your cart is empty 🛒</li>";
        cartCount.textContent = 0;
        return;
    }

    let total = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        totalItems += item.quantity;

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.marginBottom = "10px";

        li.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                ₹${item.price} × ${item.quantity} = ₹${itemTotal}
            </div>

            <div>
                <button onclick="decreaseQty(${index})"
                    style="padding:4px 8px;">−</button>

                <button onclick="increaseQty(${index})"
                    style="padding:4px 8px;">+</button>
            </div>
        `;

        cartList.appendChild(li);
    });

    const totalLi = document.createElement("li");
    totalLi.style.fontWeight = "bold";
    totalLi.style.marginTop = "10px";
    totalLi.textContent = `Total: ₹${total}`;

    cartList.appendChild(totalLi);

    cartCount.textContent = totalItems;
}

/* ===============================
   FILTER
================================ */
function filterCategory(category) {
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const productCategory = product.dataset.category;

        if (category === "all" || productCategory === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

/* ===============================
   SEARCH
================================ */
function searchProducts() {
    const value = document.getElementById("search").value.toLowerCase();
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const name = product.querySelector("h3").innerText.toLowerCase();

        if (name.includes(value)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

/* ===============================
   LOAD ON START
================================ */
window.onload = function () {
    updateCart();
};
