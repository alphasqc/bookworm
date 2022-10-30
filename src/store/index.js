import { createStore } from 'vuex'

export default createStore({
  state: {
    found: ''
  },
  getters: {
  },
  mutations: {
    loginOut(state) {
      state.userInfo = {
        username: '',
        password: '',
        isLogin: false
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
