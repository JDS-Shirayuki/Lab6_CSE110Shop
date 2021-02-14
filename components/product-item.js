// product-item.js

class ProductItem extends HTMLElement {

  // TODO
  constructor(input){
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    const product = document.createElement('li');
    product.setAttribute('class', 'product');
    const title = document.createElement('p');
    title.setAttribute('class', 'title');
    title.textContent = input.title;
    const price = document.createElement('p');
    price.setAttribute('class', 'price');
    price.textContent = input.price;
    const image = document.createElement('img');
    image.setAttribute('src', input.image);
    image.setAttribute('alt', input.title);
    image.setAttribute('width', 200);
    const button = document.createElement('button');
    button.setAttribute('class', 'button');
    
    if (localStorage.getItem(input.id)) {
      button.textContent = 'Remove from Cart';
      document.getElementById('cart-count').textContent = localStorage.getItem('cart_count');
    }
    else {
      button.textContent = 'Add to Cart';
    }
    
    button.onclick = () => {
      var counter = document.getElementById('cart-count');
      if (button.textContent == 'Remove from Cart') {
        if (!(localStorage.getItem('cart_count'))) {
          localStorage.setItem('cart_count', 0)
        } 
        var temp = localStorage.getItem('cart_count');
        localStorage.setItem('cart_count', --temp);
        counter.textContent = temp;
        button.textContent = 'Add to Cart';
        localStorage.removeItem(input.id);
        alert('Removed from Cart!');
      }
      else {
        if (!(localStorage.getItem('cart_count'))) {
          localStorage.setItem('cart_count', 0)
        } 
        var temp = localStorage.getItem('cart_count');
        localStorage.setItem('cart_count', ++temp);
        counter.textContent = temp;
        button.textContent = 'Remove from Cart';
        localStorage.setItem(input.id, input.title);
        alert('Added to Cart!');
      }
    }

    let style = document.createElement('style');

    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
      max-height: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(product);
    product.appendChild(title);
    product.appendChild(price);
    product.appendChild(image);
    product.appendChild(button);
  }
}

customElements.define('product-item', ProductItem);
