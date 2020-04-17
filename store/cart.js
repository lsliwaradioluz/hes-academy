import Cookies from 'js-cookie'

export const state = () => ({
  cartBackup: [], 
  items: []
});

export const mutations = {  
  setItems(state, items) {
    state.items = items;
  },
  setCartBackup(state, backup) {
    state.cartBackup = backup;
  },
  resetItems(state) {
    state.items = state.deletedItems;
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
  emptyCart(state, backup) {
    if (backup) {
      state.itemsBackup = state.items;
      Cookies.set('cartBackup', state.itemsBackup);
    }
    state.items = [];
    Cookies.set('cart', state.items);
  }
}

export const getters = {  
  items: state => {
    return state.items
  },
  price: state => {
    const price = state.items.reduce((accumulator, item) => {
      return accumulator + item.cena
    });

    return state.items.length > 1 ? price : state.items[0].cena;
  },
}

// export const state = () => ({  
//   items: []
// });

// export const mutations = {  
//   setItems(state, items) {
//     state.items = items
//   },
//   add(state, item) {
//     const record = state.items.find(i => i.id === item.id)

//     if (!record) {
//       state.items.push({
//         quantity: 1,
//         ...item
//       })
//     } else {
//       record.quantity++
//     }
//     Cookies.set('cart', state.items)
//   },
//   remove(state, item) {
//     const record = state.items.find(i => i.id === item.id)

//     if (record.quantity > 1) {
//       record.quantity--
//     } else {
//       const index = state.items.findIndex(i => i.id === item.id)
//       state.items.splice(index, 1)
//     }
//     Cookies.set('cart', state.items)
//   },
//   emptyCart(state) {
//     state.items = []
//     Cookies.set('cart', state.items)
//   }
// }

// export const getters = {  
//   items: state => {
//     return state.items
//   },
//   price: state => {
//     return state.items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0)
//   },
//   numberOfItems: state => {
//     return state.items.reduce(
//       (accumulator, item) => accumulator + item.quantity,
//       0
//     )
//   }
// }