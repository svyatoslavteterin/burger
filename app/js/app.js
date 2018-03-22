/*
 * Third party
 */
//= ../../node_modules/jquery/dist/jquery.js

/*
 * Bootstrap
 */
//= ../../node_modules/bootstrap/dist/js/bootstrap.js


/*
 * Lodash
 */

//= lodash.js




document.querySelector('.basket-btn').addEventListener('click',function(e){
    e.preventDefault();
    document.getElementById('mini-cart').style.display="block";

});