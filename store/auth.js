import Cookies from 'js-cookie';

export const state = () => ({
  user: null,
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
    Cookies.set('user', user);
  },
  async logout(state) {
    state.user = null;
    Cookies.set('user', null);
    await this.$apolloHelpers.onLogout();
  },
  pushOrder(state, order) {
    state.user.orders.push(order);
    Cookies.set('user', state.user);
  }
}

export const getters = {  
  user: state => {
    return state.user
  }, 
  programs: state => {
    const programs = [];
    state.user.orders.forEach(order => {
      programs.push(...order.products);
    });
    return programs;
  }
}
