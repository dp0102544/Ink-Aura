/* ===============================
   PARSE INITIALIZATION
================================ */

Parse.initialize(
"27zMStJR7gI1JFF1jmWo155suN1lvSNL0FXCOAT4",
"vTolzZWr2cyZBktTYGYc1fGeUoVZojBhpwzKHtz7"
);

Parse.serverURL = "https://parseapi.back4app.com/";

/* ===============================
   LOAD CART FROM LOCAL STORAGE
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

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCart();
    openCart();
}


/* ===============================
   INCREASE QUANTITY
================================ */

function increaseQty(index) {
    cart[index].quantity++;
    saveCart();
    updateCart();
}


/* ===============================
   DECREASE QUANTITY
================================ */

function decreaseQty(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}


/* ===============================
   REMOVE ITEM COMPLETELY
================================ */

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}


/* ===============================
   UPDATE CART UI
================================ */

function updateCart() {

    const cartList = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");

    if (!cartList || !cartCount) return;

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
        li.style.marginBottom = "15px";

        li.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <strong>${item.name}</strong><br>
                    ₹${item.price} × ${item.quantity} = ₹${itemTotal}
                </div>

                <div>
                    <button onclick="decreaseQty(${index})">−</button>
                    <button onclick="increaseQty(${index})">+</button>
                    <button onclick="removeItem(${index})">❌</button>
                </div>
            </div>
        `;

        cartList.appendChild(li);
    });

    const totalLi = document.createElement("li");
    totalLi.style.fontWeight = "bold";
    totalLi.style.marginTop = "15px";
    totalLi.textContent = `Total: ₹${total}`;

    cartList.appendChild(totalLi);

    cartCount.textContent = totalItems;
}


/* ===============================
   CATEGORY FILTER
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
   SEARCH PRODUCTS
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
   WISHLIST TOGGLE
================================ */

function toggleWishlist(button) {

    if (button.classList.contains("active")) {

        button.classList.remove("active");
        button.innerHTML = "♡ Wishlist";

    } else {

        button.classList.add("active");
        button.innerHTML = "❤️ Added";

    }

}


/* ===============================
   CART DRAWER CONTROL
================================ */

function openCart() {
    document.body.classList.add("cart-open");
}

function closeCart() {
    document.body.classList.remove("cart-open");
}


/* ===============================
   CHECKOUT SYSTEM (BACKEND SAVE)
================================ */

async function checkout(){

const user = Parse.User.current();

if(!user){
alert("Please login first");
return;
}

try{

for(let item of cart){

const Order = Parse.Object.extend("Orders");
const order = new Order();

order.set("user",user);
order.set("productName",item.name);
order.set("price",item.price);
order.set("quantity",item.quantity);
order.set("total",item.price * item.quantity);

await order.save();

}

alert("Order Placed Successfully!");

cart=[];
saveCart();
updateCart();

}catch(error){

alert("Order Failed: "+error.message);

}

}


/* ===============================
   LOGIN FUNCTION
================================ */

async function loginUser(username,password){

try{

const user = await Parse.User.logIn(username,password);

alert("Welcome "+user.get("username"));

}catch(error){

alert("Login Failed: "+error.message);

}

}


/* ===============================
   SIGNUP FUNCTION
================================ */

async function signupUser(username,password){

const user = new Parse.User();

user.set("username",username);
user.set("password",password);

try{

await user.signUp();

alert("Account created successfully");

}catch(error){

alert("Signup Error: "+error.message);

}

}


/* ===============================
   LOGOUT
================================ */

async function logout(){

await Parse.User.logOut();

alert("Logged Out");

location.reload();

}


/* ===============================
   LOAD ON PAGE START
================================ */

window.onload = function () {

updateCart();

const user = Parse.User.current();

if(user){
console.log("Logged in as:",user.get("username"));
}

};


