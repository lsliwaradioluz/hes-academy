import Cookies from 'js-cookie';

export const state = () => ({
  user: null,
  showAuthentication: false,
  showRegister: false,
});

export const mutations = {
  toggleShowAuthentication(state, payload) {
    state.showAuthentication = payload;
  },
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
  }, 
}

export const getters = {  
  user: (state) => {
    return state.user
  }, 
  programs: (state) => {
    let programs = [];
    if (state.user) {
      programs = state.user.programs;
    }
    return programs;
  },
  showAuthentication: (state) => {
    return state.showAuthentication;
  },
}
