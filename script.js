const products = [
{ name:"Sketch Book", price:100, oldPrice:200, category:"book", image:"https://i.pinimg.com/736x/7a/44/55/7a4455115fbf5d63d10c0dc021aee328.jpg", rating:"★★★★☆" },
{ name:"Doms Colour Pencil", price:90, oldPrice:190, category:"color", image:"https://storage.googleapis.com/shy-pub/303834/1701666310690_SKU-0367_0.jpg", rating:"★★★★☆" },
{ name:"Crayon", price:50, oldPrice:150, category:"color", image:"https://domsindia.com/wp-content/uploads/2022/08/DOMS-Long-Wax-Crayons-12-Shades.jpg", rating:"★★★★☆" },
{ name:"Paint Brush", price:95, oldPrice:195, category:"brush", image:"https://m.media-amazon.com/images/I/815M6utnCVL._AC_SL1500_.jpg", rating:"★★★★☆" },
{ name:"Ink Brush", price:399, oldPrice:499, category:"brush", image:"https://i.pinimg.com/1200x/94/43/27/944327ccfc0b48f83905f17885d8720c.jpg", rating:"★★★★☆" },
{ name:"Calligraphy Ink Brush", price:417, oldPrice:517, category:"brush", image:"https://i.pinimg.com/1200x/e9/42/3f/e9423fe7377fbde8f0a6e6c9b071377f.jpg", rating:"★★★★★" },
{ name:"Paint Gloves", price:120, oldPrice:220, category:"tool", image:"https://www.xencelabs.com/store/Uploads/goods/20211222/0fbd34c96b9e458090ab8e09528bb772.jpg", rating:"★★★★☆" }
];

let cart = [];

function addToCart(name, price){
  cart.push({name, price});
  updateCart();
}

function updateCart(){
  const list = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  const count = document.getElementById("cart-count");

  list.innerHTML="";
  let sum=0;

  cart.forEach((item,i)=>{
    sum+=item.price;
    list.innerHTML+=`<li>${item.name} - ₹${item.price} <button onclick="removeItem(${i})">❌</button></li>`;
  });

  total.innerText="Total: ₹"+sum;
  count.innerText=cart.length;
}

function removeItem(i){
  cart.splice(i,1);
  updateCart();
}

function openCart(){
  document.querySelector(".cart-drawer").classList.add("active");
  document.querySelector(".cart-overlay").classList.add("active");
}

function closeCart(){
  document.querySelector(".cart-drawer").classList.remove("active");
  document.querySelector(".cart-overlay").classList.remove("active");
}

function checkout(){
  alert("Order placed!");
  cart=[];
  updateCart();
  closeCart();
}

function displayProducts(list){
  const container=document.getElementById("product-list");
  container.innerHTML="";

  list.forEach(p=>{
    container.innerHTML+=`
    <div class="product">
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <p>
        ₹${p.price}
        <span class="old-price">₹${p.oldPrice}</span>
        <span class="discount">${Math.round((1 - p.price/p.oldPrice)*100)}% OFF</span>
      </p>
      <div>${p.rating}</div>
      <button onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
    </div>
    `;
  });
}

function searchProducts(){
  const val=document.getElementById("search").value.toLowerCase();
  displayProducts(products.filter(p=>p.name.toLowerCase().includes(val)));
}

function filterCategory(cat){
  displayProducts(cat==="all"?products:products.filter(p=>p.category===cat));
}

displayProducts(products);
