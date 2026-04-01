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
// 🛍️ PRODUCT DATA
const products = [
{
name: "Sketch Book",
price: 100,
category: "book",
image: "https://i.pinimg.com/736x/7a/44/55/7a4455115fbf5d63d10c0dc021aee328.jpg",
rating: "★★★★☆",
badge: "Popular"
},
{
name: "Doms Colour Pencil",
price: 90,
category: "color",
image: "https://storage.googleapis.com/shy-pub/303834/1701666310690_SKU-0367_0.jpg",
rating: "★★★★☆"
},
{
name: "Crayon",
price: 50,
category: "color",
image: "https://domsindia.com/wp-content/uploads/2022/08/DOMS-Long-Wax-Crayons-12-Shades.jpg",
rating: "★★★★☆"
},
{
name: "Paint Brush",
price: 95,
category: "brush",
image: "https://m.media-amazon.com/images/I/815M6utnCVL._AC_SL1500_.jpg",
rating: "★★★★☆"
},
{
name: "Ink Brush",
price: 399,
category: "brush",
image: "https://i.pinimg.com/1200x/94/43/27/944327ccfc0b48f83905f17885d8720c.jpg",
rating: "★★★★☆"
},
{
name: "Calligraphy Ink Brush",
price: 417,
category: "brush",
image: "https://i.pinimg.com/1200x/e9/42/3f/e9423fe7377fbde8f0a6e6c9b071377f.jpg",
rating: "★★★★★",
badge: "Popular"
},
{
name: "Paint Gloves",
price: 120,
category: "tool",
image: "https://www.xencelabs.com/store/Uploads/goods/20211222/0fbd34c96b9e458090ab8e09528bb772.jpg",
rating: "★★★★☆",
badge: "Popular"
}
];


// 📦 LOAD PRODUCTS
function displayProducts(list){
const container = document.getElementById("product-list");
container.innerHTML = "";

list.forEach(p => {
container.innerHTML += `
<div class="product" data-category="${p.category}">
${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
<h3>${p.name}</h3>
<img src="${p.image}">
<p>₹${p.price}</p>
<div>${p.rating}</div>
<button onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
</div>
`;
});
}


// 🔍 SEARCH
function searchProducts(){
const value = document.getElementById("search").value.toLowerCase();
const filtered = products.filter(p => p.name.toLowerCase().includes(value));
displayProducts(filtered);
}


// 📂 FILTER
function filterCategory(cat){
if(cat === "all"){
displayProducts(products);
}else{
const filtered = products.filter(p => p.category === cat);
displayProducts(filtered);
}
}


// 🚀 INITIAL LOAD
displayProducts(products);
