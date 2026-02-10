/* ===============================
   GLOBAL VARIABLES
================================ */
let cart = [];
let totalPrice = 0;

/* ===============================
   ADD TO CART
================================ */
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

/* ===============================
   REMOVE FROM CART
================================ */
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

/* ===============================
   UPDATE CART UI
================================ */
function updateCart() {
    const cartList = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");

    cartList.innerHTML = "";
    totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price;

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.marginBottom = "8px";

        li.innerHTML = `
            <span>${item.name} – ₹${item.price}</span>
            <button onclick="removeFromCart(${index})"
                style="
                    background:red;
                    color:white;
                    border:none;
                    padding:4px 8px;
                    border-radius:4px;
                    cursor:pointer;
                ">❌</button>
        `;

        cartList.appendChild(li);
    });

    // TOTAL PRICE
    const totalLi = document.createElement("li");
    totalLi.style.marginTop = "10px";
    totalLi.style.fontWeight = "bold";
    totalLi.textContent = `Total: ₹${totalPrice}`;
    cartList.appendChild(totalLi);

    cartCount.textContent = cart.length;
}

/* ===============================
   CATEGORY FILTER
================================ */
function filterCategory(category) {
    const products = document.querySelectorAll(".product");
    const buttons = document.querySelectorAll(".filters button");

    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    products.forEach(product => {
        const productCategory = product.getAttribute("data-category");

        if (category === "all" || productCategory === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

/* ===============================
   SEARCH PRODUCTS
================================ */
function searchProducts() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const title = product.querySelector("h3").innerText.toLowerCase();

        if (title.includes(searchValue)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
