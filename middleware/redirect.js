export default (context) => {

  if (context.route.name == 'cart-checkout' && context.store.getters['cart/items'].length == 0) {
    console.log(context.store.getters['cart/items']);
    context.redirect('/cart');
  } 
}
