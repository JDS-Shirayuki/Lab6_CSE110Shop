// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('products', JSON.stringify(data));
  });

  if (localStorage.getItem('products') != null) {
    var products = JSON.parse(localStorage.getItem('products'));
    for (var i = 0; i < products.length; ++i) {
      document.getElementById('product-list').appendChild(new ProductItem(products[i]));
    }
  }
});