function filter(category) {

  let items = document.getElementsByClassName("item");

  for (let i = 0; i < items.length; i++) {

    if (category === "all") {
      items[i].style.display = "inline-block";
    } 
    
    else if (items[i].classList.contains(category)) {
      items[i].style.display = "inline-block";
    } 
    
    else {
      items[i].style.display = "none";
    }

  }
}
