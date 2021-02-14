// product-item.js

class ProductItem extends HTMLElement {

  // TODO
  constructor(para){
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});

    const products = document.createElement('li');
    products.setAttribute('class', 'products');

    const img = document.createElement('img');
    img.setAttribute('src', para.image);
    img.setAttribute('alt', para.title);

    const title = document.createElement('p');
    title.setAttribute('class', 'title');
    title.textContent = para.title;

    const price = document.createElement('p');
    price.setAttribute('class', 'price');
    price.textContent = para.price;

    const btn = document.createElement('button');
    btn.setAttribute('class', 'button');
    
    if (localStorage.getItem(para.id) != null) {
      btn.textContent = 'Remove from Cart';
      document.getElementById('cart-count').textContent = localStorage.getItem('counter');
    } else {
      btn.textContent = 'Add to Cart';
    }
    
    btn.onclick = () => {
      var counter = document.getElementById('cart-count');
      if (btn.textContent == 'Removed from Cart') {
        if (!(localStorage.getItem('counter'))) {
          localStorage.setItem('counter', 0)
        } 
        var temp = localStorage.getItem('counter');
        localStorage.setItem('counter', --temp);
        counter.textContent = temp;
        btn.textContent = 'Add to Cart';
        localStorage.removeItem(para.id);
        alert('Removed from Cart');
      }
      else {
        if (!(localStorage.getItem('counter'))) {
          localStorage.setItem('counter', 0)
        } 
        var temp = localStorage.getItem('counter');
        localStorage.setItem('counter', ++temp);
        counter.textContent = temp;
        btn.textContent = 'Remove from Cart';
        localStorage.setItem(para.id, para.title);
        alert('Added to Cart');
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
    shadowRoot.appendChild(products);
    products.appendChild(img);
    products.appendChild(title);
    products.appendChild(price);
    products.appendChild(btn);
  }
}

customElements.define('product-item', ProductItem);