import Cookies from 'js-cookie';

export default (context) => {
  
  if (context.store.state.auth.user == null) {
    return context.redirect('/login?to=/cart/checkout');
  }

  return
}