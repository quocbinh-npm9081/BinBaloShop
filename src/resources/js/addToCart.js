const addToCart = document.querySelector('.add-to-cart');
const countProduct = document.querySelector('.count');
const axios = require('axios');
const Noty = require('noty');

function updateCart(backPack) {
    axios.post('/update-cart', backPack)
        .then(res => {
            //console.log(res)
            countProduct.innerHTML = res.data.totalQuality
            new Noty({
                type: 'success',
                timeout: 345,
                text: 'Product added to your cart !',
            }).show();
        })
        .catch(function(error) {
            console.log(error);
            new Noty({
                type: 'error',
                timeout: 345,
                text: 'Something went wrong !!!',

            }).show();
        })
}
addToCart.addEventListener('click', function() {
    let backPack_OBJ = JSON.parse(addToCart.dataset.backpack);
    //console.log(backPack_OBJ);
    updateCart(backPack_OBJ);

});