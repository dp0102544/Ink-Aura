<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Art Store</title>
  <style>
    body { font-family: Arial, sans-serif; margin:0; padding:0; background:#f9f9f9; }
    header { background:#333; color:#fff; padding:10px 20px; display:flex; justify-content:space-between; align-items:center; }
    header h1 { margin:0; font-size:1.5rem; }
    header input { padding:5px; width:200px; border-radius:4px; border:none; }
    .filters button { margin:5px; padding:5px 10px; border:none; border-radius:4px; cursor:pointer; background:#555; color:#fff; }
    #product-list { display:grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap:20px; padding:20px; }
    .product { background:#fff; padding:15px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); text-align:center; }
    .product img { width:100%; height:180px; object-fit:cover; border-radius:6px; }
    .price { font-weight:bold; margin:10px 0; }
    .old-price { text-decoration: line-through; color:#999; margin-left:5px; font-weight:normal; }
    .discount { color: #e74c3c; margin-left:5px; font-weight:bold; }
    .badge { background:#f39c12; color:#fff; padding:2px 6px; border-radius:4px; font-size:0.8rem; position:absolute; top:10px; left:10px; }
    button { background:#27ae60; color:#fff; border:none; padding:8px 12px; border-radius:4px; cursor:pointer; }
    button:hover { background:#219150; }
    
    /* Cart Drawer */
    .cart-drawer { position:fixed; right:-300px; top:0; width:300px; height:100%; background:#fff; box-shadow:-2px 0 6px rgba(0,0,0,0.2); transition:0.3s; padding:20px; z-index:1000; overflow-y:auto; }
    .cart-drawer.active { right:0; }
    .cart-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); opacity:0; transition:0.3s; pointer-events:none; z-index:900; }
    .cart-overlay.active { opacity:1; pointer-events:auto; }
    #cart-items li { margin:8px 0; }
  </style>
</head>
<body>

<header>
  <h1>Art Store</h1>
  <input type="text" id="search" placeholder="Search products..." oninput="searchProducts()">
  <button onclick="openCart()">🛒 Cart (<span id="cart-count">0</span>)</button>
</header>

<div class="filters" style="padding:0 20px;">
  <button onclick="filterCategory('all')">All</button>
  <button onclick="filterCategory('book')">Books</button>
  <button onclick="filterCategory('color')">Colors</button>
  <button onclick="filterCategory('brush')">Brushes</button>
  <button onclick="filterCategory('tool')">Tools</button>
</div>

<div id="product-list"></div>

<!-- Cart Drawer -->
<div class="cart-drawer">
  <h2>Your Cart</h2>
  <ul id="cart-items"></ul>
  <p id="cart-total">Total: ₹0</p>
  <button onclick="checkout()">Checkout</button>
  <button onclick="closeCart()">Close</button>
</div>
<div class="cart-overlay" onclick="closeCart()"></div>

<script>
const products = [
  {name:"Sketch Book", price:4168, category:"book", image:"https://i.pinimg.com/736x/7a/44/55/7a4455115fbf5d63d10c0dc021aee328.jpg", rating:"★★★★☆", badge:"Popular"},
  {name:"Doms Colour Pencil", price:90, category:"color", image:"https://storage.googleapis.com/shy-pub/303834/1701666310690_SKU-0367_0.jpg", rating:"★★★★☆"},
  {name:"Crayon", price:50, category:"color", image:"https://domsindia.com/wp-content/uploads/2022/08/DOMS-Long-Wax-Crayons-12-Shades.jpg", rating:"★★★★☆"},
  {name:"Paint Brush", price:95, category:"brush", image:"https://m.media-amazon.com/images/I/815M6utnCVL._AC_SL1500_.jpg", rating:"★★★★☆"},
  {name:"Ink Brush", price:399, category:"brush", image:"https://i.pinimg.com/1200x/94/43/27/944327ccfc0b48f83905f17885d8720c.jpg", rating:"★★★★☆"},
  {name:"Calligraphy Ink Brush", price:417, category:"brush", image:"https://i.pinimg.com/1200x/e9/42/3f/e9423fe7377fbde8f0a6e6c9b071377f.jpg", rating:"★★★★★", badge:"Popular"},
  {name:"Paint Gloves", price:120, category:"tool", image:"https://www.xencelabs.com/store/Uploads/goods/20211222/0fbd34c96b9e458090ab8e09528bb772.jpg", rating:"★★★★☆", badge:"Popular"},
  {name:"Acrylic Paint Set", price:4867, category:"color", image:"https://images.meesho.com/images/products/784983508/cerht_512.avif", rating:"★★★★★", badge:"Popular"},
  {name:"Watercolor Paint Kit", price:450, category:"color", image:"https://m.media-amazon.com/images/I/81NP2cfWLmL._AC_.jpg", rating:"★★★★☆"},
  {name:"Canvas Board Pack", price:180, category:"tool", image:"https://m.media-amazon.com/images/I/81W8z9Q0YUL._SL1500_.jpg", rating:"★★★★☆"},
  {name:"Drawing Pencil Set", price:120, category:"tool", image:"https://m.media-amazon.com/images/I/71cJ0b5q4kL._SL1500_.jpg", rating:"★★★★★", badge:"Best Seller"},
  {name:"Charcoal Pencil Set", price:150, category:"tool", image:"https://m.media-amazon.com/images/I/61oS9WcF7dL._SL1500_.jpg", rating:"★★★★☆"},
  {name:"Oil Pastels", price:90, category:"color", image:"https://m.media-amazon.com/images/I/71y9Q9gk9LL._SL1500_.jpg", rating:"★★★★☆"},
  {name:"Sketching Kit Combo", price:350, category:"book", image:"https://m.media-amazon.com/images/I/81vpsIs58WL._SL1500_.jpg", rating:"★★★★★", badge:"Popular"},
  {name:"Calligraphy Ink Set", price:270, category:"brush", image:"https://m.media-amazon.com/images/I/71pZ2F8JHLL._SL1500_.jpg", rating:"★★★★★"},
  {name:"Brush Cleaner Cup", price:80, category:"tool", image:"https://m.media-amazon.com/images/I/71IMXPJdLKL._AC_SL1500_.jpg", rating:"★★★★☆"}
];

// CART
let cart = [];

function addToCart(name, price) {
  cart.push({name, price});
  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  const count = document.getElementById("cart-count");

  list.innerHTML = "";
  let sum = 0;
  cart.forEach((item, i) => {
    sum += item.price;
    list.innerHTML += `<li>${item.name} - ₹${item.price} <button onclick="removeItem(${i})">❌</button></li>`;
  });

  total.innerText = "Total: ₹" + sum;
  count.innerText = cart.length;
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

function openCart() {
  document.querySelector(".cart-drawer").classList.add("active");
  document.querySelector(".cart-overlay").classList.add("active");
}

function closeCart() {
  document.querySelector(".cart-drawer").classList.remove("active");
  document.querySelector(".cart-overlay").classList.remove("active");
}

function checkout() {
  if(cart.length === 0) { alert("Cart is empty!"); return; }
  alert("Order placed successfully!");
  cart = [];
  updateCart();
  closeCart();
}

function displayProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  list.forEach(p => {
    const oldPrice = p.price + 100;
    container.innerHTML += `
      <div class="product">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <img src="${p.image}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p class="price">
          ₹${p.price} <span class="old-price">₹${oldPrice}</span> <span class="discount">50% OFF</span>
        </p>
        <div>${p.rating}</div>
        <button onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
      </div>
    `;
  });
}

function searchProducts() {
  const val = document.getElementById("search").value.toLowerCase();
  displayProducts(products.filter(p => p.name.toLowerCase().includes(val)));
}

function filterCategory(cat) {
  if(cat === "all") displayProducts(products);
  else displayProducts(products.filter(p => p.category === cat));
}

// Initial load
displayProducts(products);
</script>

</body>
</html>
