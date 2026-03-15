// -----------------------------
// PARSE CONFIGURATION
// -----------------------------
Parse.initialize("YOUR_APP_ID", "YOUR_JS_KEY");
Parse.serverURL = "https://parseapi.back4app.com/";


// -----------------------------
// SIGNUP FUNCTION
// -----------------------------
async function signUpUser(username, password) {

const user = new Parse.User();

user.set("username", username);
user.set("password", password);

try {

await user.signUp();

alert("Signup Successful");
window.location.href = "login.html";

} catch (error) {

alert("Signup Error: " + error.message);

}

}


// -----------------------------
// LOGIN FUNCTION (POPUP LOGIN)
// -----------------------------
async function loginUser() {

const username = document.getElementById("loginUsername").value;
const password = document.getElementById("loginPassword").value;

try {

await Parse.User.logIn(username, password);

alert("Login Successful");

closeLogin();

} catch (error) {

alert("Login Error: " + error.message);

}

}


// -----------------------------
// LOGIN POPUP OPEN / CLOSE
// -----------------------------
function openLogin() {

document.getElementById("loginModal").style.display = "flex";

}

function closeLogin() {

document.getElementById("loginModal").style.display = "none";

}


// -----------------------------
// CART SYSTEM
// -----------------------------
let cart = [];
let total = 0;

function addToCart(name, price) {

cart.push({ name, price });

total += price;

document.getElementById("cart-count").innerText = cart.length;

const cartItems = document.getElementById("cart-items");

const li = document.createElement("li");
li.innerText = name + " - ₹" + price;

cartItems.appendChild(li);

document.getElementById("cart-total").innerText = "Total: ₹" + total;

}


// -----------------------------
// CART OPEN / CLOSE
// -----------------------------
function openCart() {

document.body.classList.add("cart-open");

}

function closeCart() {

document.body.classList.remove("cart-open");

}


// -----------------------------
// CATEGORY FILTER
// -----------------------------
function filterCategory(category) {

const products = document.querySelectorAll(".product");

products.forEach(product => {

if (category === "all" || product.dataset.category === category) {

product.style.display = "block";

} else {

product.style.display = "none";

}

});

}


// -----------------------------
// PRODUCT SEARCH
// -----------------------------
function searchProducts() {

const input = document.getElementById("search").value.toLowerCase();

const products = document.querySelectorAll(".product");

products.forEach(product => {

const name = product.querySelector("h3").innerText.toLowerCase();

if (name.includes(input)) {

product.style.display = "block";

} else {

product.style.display = "none";

}

});

}


// -----------------------------
// WISHLIST BUTTON
// -----------------------------
function toggleWishlist(button) {

if (button.innerText === "♡ Wishlist") {

button.innerText = "❤️ Added";

} else {

button.innerText = "♡ Wishlist";

}

}


// -----------------------------
// CHECKOUT
// -----------------------------
function checkout() {

if (cart.length === 0) {

alert("Cart is empty!");
return;

}

alert("Order placed successfully!");

cart = [];
total = 0;

document.getElementById("cart-items").innerHTML = "";
document.getElementById("cart-count").innerText = "0";
document.getElementById("cart-total").innerText = "";

closeCart();

}
