const axios = require('axios');
const Noty = require('noty');
const btnRemove = document.querySelectorAll('.btn-remove-product');
const qty = document.querySelectorAll('.qty');
const countProduct = document.querySelector('.count');
const totalPrice = document.getElementById('totalPrice');
const productInCart = document.querySelectorAll('.item-in-cart');


function reduceQty(dataProduct, qty, productInCart) {
    axios.post('reduce-qty', dataProduct)
        .then(res => {
            //console.log(res);
            countProduct.innerHTML = res.data.totalQuality;
            qty.innerHTML = res.data.qty;
            totalPrice.innerHTML = res.data.totalPrice;
            if (res.data.qty == 0) {
                productInCart.style.display = 'none';
            }
            if (res.data.totalPrice == 0) {
                window.location.replace('/cart');
            }
        })
        .catch(err => {
            console.log(err);
        })
};
for (let i = 0; i < btnRemove.length; i++) {
    btnRemove[i].addEventListener('click', function() {
        let dataProduct_OBJ = JSON.parse(btnRemove[i].dataset.product);
        reduceQty(dataProduct_OBJ, qty[i], productInCart[i]);
    })
}