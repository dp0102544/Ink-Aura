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


// 🛒 CART SYSTEM
let cart = [];

// ADD TO CART
function addToCart(name, price){
cart.push({name, price});
updateCart();
}

// UPDATE CART
function updateCart(){
const list = document.getElementById("cart-items");
const total = document.getElementById("cart-total");
const count = document.getElementById("cart-count");

list.innerHTML = "";

let sum = 0;

cart.forEach((item, index) => {
sum += item.price;

list.innerHTML += `
<li>
${item.name} - ₹${item.price}
<button onclick="removeItem(${index})">❌</button>
</li>
`;
});

total.innerText = "Total: ₹" + sum;
count.innerText = cart.length;
}

// REMOVE ITEM
function removeItem(index){
cart.splice(index,1);
updateCart();
}

// OPEN CART
function openCart(){
document.querySelector(".cart-drawer").classList.add("active");
document.querySelector(".cart-overlay").classList.add("active");
}

// CLOSE CART
function closeCart(){
document.querySelector(".cart-drawer").classList.remove("active");
document.querySelector(".cart-overlay").classList.remove("active");
}

// CHECKOUT
function checkout(){
alert("Order placed successfully!");
cart = [];
updateCart();
closeCart();
}


// 📦 DISPLAY PRODUCTS (FIXED)
function displayProducts(list){
const container = document.getElementById("product-list");
container.innerHTML = "";

list.forEach(p => {
container.innerHTML += `
<div class="product" data-category="${p.category}">

${p.badge ? `<span class="badge">${p.badge}</span>` : ""}

<img src="${p.image}">

<h4>${p.name}</h4>

<p class="price">
₹${p.price}
<span class="old-price">₹${p.price + 100}</span>
<span class="discount">50% OFF</span>
</p>

<div class="rating">${p.rating}</div>

<button onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>

<button class="wishlist-btn" onclick="toggleWishlist(this)">♡</button>

</div>
`;
});
}


// 🔍 SEARCH
function searchProducts(){
const value = document.getElementById("search").value.toLowerCase();
const filtered = products.filter(p =>
p.name.toLowerCase().includes(value)
);
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


// ❤️ WISHLIST
function toggleWishlist(btn){
btn.classList.toggle("active");

if(btn.classList.contains("active")){
btn.innerText = "♥";
}else{
btn.innerText = "♡";
}
}


// 🚀 INITIAL LOAD
displayProducts(products);
