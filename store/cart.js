import Cookies from 'js-cookie';

export const state = () => ({
  items: []
});

export const mutations = {  
  setItems(state, items) {
    state.items = items;
  },
  addItem(state, item) {
    state.items.push(item);
    Cookies.set('cart', state.items);
  },
  removeItem(state, item) {
    const index = state.items.findIndex(i => i.id === item.id);
    state.items.splice(index, 1);
    Cookies.set('cart', state.items);
  },
  emptyCart(state) {
    state.items = [];
    console.log(1);
    Cookies.set('cart', []);
  },
  changeQuantity(state, payload) {
    const chosenItem = state.items[payload.index];
    if (payload.operation == 'add') {
      chosenItem.quantity++;
    } else if (payload.operation == 'subtract' && chosenItem.quantity != 0) {
      chosenItem.quantity--;
    }
    Cookies.set('cart', state.items);
  }
}

export const getters = {  
  items: state => {
    return state.items
  },
  programs: state => {
    return state.items.filter(item => {
      return item.type == 'program';
    });
  },
  products: state => {
    return state.items.filter(item => {
      return item.type == 'product';
    });
  },
  price: state => {
    const price = state.items.reduce((accumulator, item) => {
      return accumulator + item.price*item.quantity;
    }, 0);

    return price;
  },
}