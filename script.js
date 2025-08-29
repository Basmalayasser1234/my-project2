const menu = [
  { name: "Pizza", price: 50, img: "images/food10.jpeg" },
  { name: "Burger", price: 40, img: "images/food9.jpeg" },
  { name: "Pasta", price: 35, img: "images/food11.jpeg" },
  { name: "Salad", price: 25, img: "images/photo-51.jpg" },
  { name: "Sushi", price: 70, img: "images/photo_15.jpg" },
  { name: "Steak", price: 90, img: "images/photo_6.jpg" },
  { name: "Tacos", price: 30, img: "images/photo_26.jpg" },
  { name: "Sandwich", price: 20, img: "images/food13.jpeg" },
  { name: "Soup", price: 15, img: "images/photo_201.jpg" },
  { name: "Fries", price: 10, img: "images/offer4.jpeg" },
  { name: "Chicken" ,price:40 , img:"images/food8.jpeg"},
  { name: "Rice",price:17 , img: "images/offer5.jpeg"},
  { name: "Coffee", price: 12, img: "images/photo_40.jpg" },
 { name: "Cake", price:30 ,img:"images/photo214.jpg"},
 { name: "Ice Cream", price: 18, img: "images/offer13.jpeg" },
 { name: "juice" , price: 35 ,img:"images/photo2325.jpg"}
];


let cart = {};

const menuDiv = document.getElementById("menu");
menu.forEach(item => {
  const div = document.createElement("div");
  div.classList.add("menu-item");
  div.innerHTML = `
    <img src="${item.img}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>Price: $${item.price}</p>
    <div class="controls">
      <button onclick="updateCart('${item.name}', ${item.price}, -1)">-</button>
      <button onclick="updateCart('${item.name}', ${item.price}, 1)">+</button>
    </div>
  `;
  menuDiv.appendChild(div);
});

function updateCart(name, price, change) {
  if (!cart[name]) {
    cart[name] = { qty: 0, price: price };
  }
  cart[name].qty += change;

  if (cart[name].qty <= 0) {
    delete cart[name];
  }
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;

  for (let name in cart) {
    const data = cart[name];
    const li = document.createElement("li");
    li.textContent =` ${name} x${data.qty}`;
    const priceSpan = document.createElement("span");
    priceSpan.textContent = `$${data.price * data.qty}`;
    li.appendChild(priceSpan);
    cartItems.appendChild(li);
    total += data.price * data.qty;
  }

  cartTotal.textContent =`Total: $${total}`;
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("Cart is empty!");
    return;
  }
  alert("Thanks for your order! 😊");
  cart = {};
  renderCart();
});