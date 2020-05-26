const state = {
  name: null,
  prediction: null,
  category: null,
};

const getters = {
  getUserName(state) {
    return state.name;
  },
  getUserPrediction(state) {
    return state.prediction;
  },
  getUserCategory(state) {
    return state.category;
  },
};

const actions = {
  async setUserInput(context, userInfo) {
    context.commit('setUserName', userInfo.name);
    context.commit('setUserPrediction', userInfo.prediction);
    context.commit('setUserCategory', userInfo.category);
  },
};

const mutations = {
  setUserName(state, value) {
    state.name = value;
  },
  setUserPrediction(state, value) {
    state.prediction = value;
  },
  setUserCategory(state, value) {
    state.category = value;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
