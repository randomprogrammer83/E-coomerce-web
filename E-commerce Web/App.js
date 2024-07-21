const bar = document.querySelector('#bar');
const nav = document.querySelector('#navbar');
const cut = document.querySelector('#cut');
const cartremove = document.querySelector('#lg-remove');
const cartopen=document.getElementById('cart');

if (bar) {
  bar.addEventListener('click', function() {
    nav.classList.add('active');
    cartremove.style.display = "none";
    bar.style.display = "none";
  });
}

if (cut) {
  cut.addEventListener('click', function() {
    nav.classList.remove('active');
    bar.style.display = "flex";
  });
}

// Cart section
const cartButtons = document.querySelectorAll('.cart .fa-solid.fa-cart-shopping');

cartButtons.forEach(msg=>{
  msg.addEventListener('click', function(){
    alert("Item Added To the Cart !")
    })
})
cartButtons.forEach(button => {
  const product = button.closest('.feature');

  button.addEventListener('click', function() {
    const producutname = product.querySelector('.desc h6')?.textContent;
    const productPrice = product.querySelector('.cart span')?.textContent;
    const productImage = product.querySelector('img')?.src;

    const cartItem = {
      name: producutname,
      price: productPrice,
      image: productImage,
      quantity: 1
    };

    console.log(cartItem);
    // calling to the add cart
    addToCartItem(cartItem);
  });
});

function addToCartItem(cartItem) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  console.log("addcart log", cartItems);
  const existingItem = cartItems.find(item => 
    item.name === cartItem.name && 
    item.price === cartItem.price && 
    item.image === cartItem.image
  );

  if (existingItem) {
    existingItem.quantity++;
    cartopen=quantity;
  } else {
    cartItems.push(cartItem);
  }

  // save to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

document.addEventListener('DOMContentLoaded', function() {
  const cartList = document.getElementById('cart-list');
  updateCartItem();
});

function updateCartItem() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartList = document.getElementById('cart-list');
  
  if (cartList) {
    cartList.innerHTML = '';

    cartItems.forEach((item) => {

      const itemHtml = `
        <li>
          <img src="${item.image}" alt="${item.name}">
          <span>${item.name}</span>
          <span>x ${item.quantity}</span>
          <span>${item.price}</span>
        </li>
      `;
      cartList.innerHTML += itemHtml;

     
     
    });

    const subtotal = cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace(/[^\d\.]/g, '')) || 0;// converted dollar to inr
      const quantity = parseInt(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);

    document.getElementById('cart-subtotal').textContent = `Subtotal: ${subtotal.toFixed(2)}`;
  } else {
    subtotal.textContent="Your Cart is Empty!"
    cartList.innerHTML = 'Cart is empty';
    console.error("Errooor");
  }
}


cartopen.addEventListener('click',function(){
  window.location.href='cart.html'
})

function toggle(event)
{
  const navItems=document.querySelectorAll('#navbar li')
  navItems.forEach(item => item.classList.remove('active'));
  event.target.parentElement.classList.add('active');
}