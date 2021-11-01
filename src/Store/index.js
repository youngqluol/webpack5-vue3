import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      num: 1
    };
  },
  mutations: {
    increment(state) {
      state.num++;
    }
  },
  actions: {
    incrementAction({ commit }) {
      commit('increment');
    }
  }
});

export default store;
