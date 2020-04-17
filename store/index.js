import cookieparser from 'cookieparser';

export const state = () => ({
  dupa: null
});

export const mutations = {
  setDupa(state, payload) {
    state.dupa = payload;
  }
}

export const actions = {  
  nuxtServerInit({ commit }, { req }) {
    commit('setDupa', 'zbita');
    // let user = null;
    // let cart = null;
    // let cartBackup = null;
    // if (req && req.headers && req.headers.cookie) {
    //   const parsed = cookieparser.parse(req.headers.cookie);
    //   user = (parsed.user && JSON.parse(parsed.user)) || null;
    //   cart = (parsed.cart && JSON.parse(parsed.cart)) || null;
    //   cartBackup = (parsed.cartBackup && JSON.parse(parsed.cartBackup)) || null;
    // }
    
    // commit('auth/setUser', user);
    // commit('cart/setItems', cart);
    // commit('cart/setCartBackup', cartBackup);
  }
}

export const getters = {
  dupa(state) {
    return state.dupa;
  }
}