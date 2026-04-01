// 🛍️ PRODUCT DATA (ALL FIXED)
const products = [

{name:"Sketch Book",price:100,category:"book",image:"https://i.pinimg.com/736x/7a/44/55/7a4455115fbf5d63d10c0dc021aee328.jpg",rating:"★★★★☆",badge:"Popular"},
{name:"Doms Colour Pencil",price:90,category:"color",image:"https://storage.googleapis.com/shy-pub/303834/1701666310690_SKU-0367_0.jpg",rating:"★★★★☆"},
{name:"Crayon",price:50,category:"color",image:"https://domsindia.com/wp-content/uploads/2022/08/DOMS-Long-Wax-Crayons-12-Shades.jpg",rating:"★★★★☆"},
{name:"Paint Brush",price:95,category:"brush",image:"https://m.media-amazon.com/images/I/815M6utnCVL._AC_SL1500_.jpg",rating:"★★★★☆"},
{name:"Ink Brush",price:399,category:"brush",image:"https://i.pinimg.com/1200x/94/43/27/944327ccfc0b48f83905f17885d8720c.jpg",rating:"★★★★☆"},
{name:"Calligraphy Ink Brush",price:417,category:"brush",image:"https://i.pinimg.com/1200x/e9/42/3f/e9423fe7377fbde8f0a6e6c9b071377f.jpg",rating:"★★★★★",badge:"Popular"},
{name:"Paint Gloves",price:120,category:"tool",image:"https://www.xencelabs.com/store/Uploads/goods/20211222/0fbd34c96b9e458090ab8e09528bb772.jpg",rating:"★★★★☆",badge:"Popular"},

// EXTRA PRODUCTS (FIXED)
// EXTRA PRODUCTS (WORKING IMAGES)
{name:"Acrylic Paint Set",price:299,category:"color",image:"https://i.pinimg.com/736x/9b/5e/4a/9b5e4a2b7c7e3f2d8a1f5b7c4e3c2a1.jpg",rating:"★★★★★",badge:"Popular"},
{name:"Watercolor Paint Kit",price:250,category:"color",image:"https://i.pinimg.com/736x/3c/2d/1f/3c2d1f7e8f9a6b5c4d3e2f1a9b8c7d6.jpg",rating:"★★★★☆"},
{name:"Canvas Board Pack",price:180,category:"tool",image:"https://i.pinimg.com/736x/5a/7c/3d/5a7c3d2b1e9f8a6b5c4d3e2f1a9b8c7.jpg",rating:"★★★★☆"},
{name:"Drawing Pencil Set",price:120,category:"tool",image:"https://i.pinimg.com/736x/2f/8c/4b/2f8c4b1e9a7c6d5b4a3e2f1c9b8a7d6.jpg",rating:"★★★★★",badge:"Best Seller"},
{name:"Charcoal Pencil Set",price:150,category:"tool",image:"https://i.pinimg.com/736x/8a/3b/5c/8a3b5c2d1e9f7a6b5c4d3e2f1a9b8c7.jpg",rating:"★★★★☆"},
{name:"Oil Pastels",price:90,category:"color",image:"https://i.pinimg.com/736x/7d/6c/5b/7d6c5b4a3e2f1c9b8a7d6c5b4a3e2f1.jpg",rating:"★★★★☆"},
{name:"Sketching Kit Combo",price:350,category:"book",image:"https://i.pinimg.com/736x/4c/3b/2a/4c3b2a1e9f8d7c6b5a4e3d2c1b9a8f7.jpg",rating:"★★★★★",badge:"Popular"},
{name:"Mini Easel Stand",price:220,category:"tool",image:"https://i.pinimg.com/736x/6e/5d/4c/6e5d4c3b2a1f9e8d7c6b5a4e3d2c1b9.jpg",rating:"★★★★☆"},
{name:"Calligraphy Ink Set",price:270,category:"brush",image:"https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6.jpg",rating:"★★★★★"},
{name:"Brush Cleaner Cup",price:80,category:"tool",image:"https://i.pinimg.com/736x/9c/8b/7a/9c8b7a6d5c4b3a2f1e9d8c7b6a5f4e3.jpg",rating:"★★★★☆"}
]; // ✅ IMPORTANT (THIS WAS MISSING)

// 🛒 CART
let cart = [];

// ADD TO CART
function addToCart(name,price){
cart.push({name,price});
updateCart();
}

// UPDATE CART
function updateCart(){
let list=document.getElementById("cart-items");
let total=document.getElementById("cart-total");
let count=document.getElementById("cart-count");

list.innerHTML="";
let sum=0;

cart.forEach((item,i)=>{
sum+=item.price;
list.innerHTML+=`<li>${item.name} - ₹${item.price} <button onclick="removeItem(${i})">❌</button></li>`;
});

total.innerText="Total: ₹"+sum;
count.innerText=cart.length;
}

// REMOVE
function removeItem(i){
cart.splice(i,1);
updateCart();
}

// CART
function openCart(){
document.querySelector(".cart-drawer").classList.add("active");
document.querySelector(".cart-overlay").classList.add("active");
}

function closeCart(){
document.querySelector(".cart-drawer").classList.remove("active");
document.querySelector(".cart-overlay").classList.remove("active");
}

// CHECKOUT
function checkout(){
alert("Order placed!");
cart=[];
updateCart();
closeCart();
}

// DISPLAY PRODUCTS
function displayProducts(list){
let container=document.getElementById("product-list");
container.innerHTML="";

list.forEach(p=>{
let oldPrice=p.price+100;

container.innerHTML+=`
<div class="product">

${p.badge?`<span class="badge">${p.badge}</span>`:""}

<img src="${p.image}">
<h4>${p.name}</h4>

<p class="price">
₹${p.price}
<span class="old-price">₹${oldPrice}</span>
<span class="discount">50% OFF</span>
</p>

<div>${p.rating}</div>

<button onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>

</div>
`;
});
}

// SEARCH
function searchProducts(){
let val=document.getElementById("search").value.toLowerCase();
displayProducts(products.filter(p=>p.name.toLowerCase().includes(val)));
}

// FILTER
function filterCategory(cat){
if(cat==="all") displayProducts(products);
else displayProducts(products.filter(p=>p.category===cat));
}

// LOAD
displayProducts(products);
