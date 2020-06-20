import Cookies from 'js-cookie';

export const state = () => ({
  user: null,
  showAuthentication: false,
  showRegister: false,
});

export const mutations = {
  toggleShowAuthentication(state) {
    state.showAuthentication = !state.showAuthentication;
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
}

export const getters = {  
  user: (state) => {
    return state.user
  }, 
  showAuthentication: (state) => {
    return state.showAuthentication;
  },
}
