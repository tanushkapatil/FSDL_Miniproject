let products = [
  { id: 1, price: 500, qty: 0 },
  { id: 2, price: 800, qty: 0 },
  { id: 3, price: 1200, qty: 0 }
];

function increase(productId) {
  let product = products.find(p => p.id === productId);
  if (product) {
    product.qty = product.qty + 1;
    update();
  }
}

function decrease(productId) {
  let product = products.find(p => p.id === productId);
  if (product && product.qty > 0) {
    product.qty = product.qty - 1;
    update();
  }
}

function update() {
  let grandTotal = 0;

  products.forEach(product => {
    let qtyElement = document.getElementById("qty" + product.id);
    let totalElement = document.getElementById("total" + product.id);
    
    let itemTotal = product.price * product.qty;
    
    qtyElement.innerText = product.qty;
    totalElement.innerText = itemTotal;
    
    grandTotal = grandTotal + itemTotal;
  });

  document.getElementById("grandTotal").innerText = grandTotal;
}
