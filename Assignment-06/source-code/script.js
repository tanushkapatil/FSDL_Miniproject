// Step 1: Product data (JSON format)
let products = [
  {
    name: "Shoes",
    price: 1999,
    image: "https://via.placeholder.com/200"
  },
  {
    name: "Watch",
    price: 2999,
    image: "https://via.placeholder.com/200"
  },
  {
    name: "Headphones",
    price: 1499,
    image: "https://via.placeholder.com/200"
  }
];

// Step 2: Get container
let container = document.getElementById("productContainer");

// Step 3: Function to create card
function createCard(product) {

  let card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${product.image}">
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <button>Buy Now</button>
  `;

  // Step 4: Add button action
  let button = card.querySelector("button");

  button.onclick = function () {
    alert("You bought " + product.name);
  };

  return card;
}

// Step 5: Loop through products
products.forEach(function (item) {
  container.appendChild(createCard(item));
});
