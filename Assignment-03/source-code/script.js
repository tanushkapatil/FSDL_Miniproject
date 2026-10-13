// Step 1: Track current mode
let isMonthly = true;

// Step 2: Get elements
let button = document.getElementById("toggleBtn");
let basic = document.getElementById("basicPrice");
let pro = document.getElementById("proPrice");
let premium = document.getElementById("premiumPrice");

// Step 3: Add click event
button.onclick = function () {

  // If currently monthly → switch to yearly
  if (isMonthly) {
    basic.innerText = "₹5000 / year";
    pro.innerText = "₹10000 / year";
    premium.innerText = "₹15000 / year";

    button.innerText = "Switch to Monthly";
    isMonthly = false;
  } 
  
  // Otherwise → switch to monthly
  else {
    basic.innerText = "₹500 / month";
    pro.innerText = "₹1000 / month";
    premium.innerText = "₹1500 / month";

    button.innerText = "Switch to Yearly";
    isMonthly = true;
  }
};
