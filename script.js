let cartCount = 0;
let totalPrice = 0;

function addToCart(productName) {
    const prices = {
        "Sketch Book": 100,
        "Doms Colour Pencil": 90,
        "Crayon": 50,
        "Paint Brush": 95,
        "Paint Gloves": 120,
        "Ink Brush": 399,
        "Calligraphy Ink Brush": 417
    };

    cartCount++;
    totalPrice += prices[productName];

    document.getElementById("cart-count").innerText = cartCount;
    document.getElementById("total-price").innerText = totalPrice;

    const li = document.createElement("li");
    li.innerHTML = `
        ${productName} - ₹${prices[productName]}
        <button onclick="removeItem(this, ${prices[productName]})"
        style="margin-left:10px; background:red; color:white; border:none; cursor:pointer;">
        ❌
        </button>
    `;

    document.getElementById("cart-items").appendChild(li);
}

function removeItem(button, price) {
    button.parentElement.remove();
    cartCount--;
    totalPrice -= price;

    document.getElementById("cart-count").innerText = cartCount;
    document.getElementById("total-price").innerText = totalPrice;
}
