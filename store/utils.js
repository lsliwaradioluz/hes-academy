export const state = () => ({
  notification: null, 
});

export const mutations = {  
  setNotification(state, content) {
    state.notification = content;
  }
}

export const getters = {  
  notification: state => {
    return state.notification;
  }
}