export default (context) => {
  if (!context.store.getters['auth/user']) {
    context.redirect('/');
  }
}
