import axios from 'axios';

// const host = http://localhost:3000';
const host = 'https://pizza.bartolomey.me';

const state = {
  learned: [],
  getLearnedStatus: null,
};

const getters = {
  learned: (state) => {
    return state.learned;
  },
};

const actions = {
  getLearned({commit}) {
    axios.get(`${host}/api/v2/learn`)
      .then(({data}) => {
        commit('setGetLearnedStatus', 'successful');
        commit('setLearned', { learned: data });
      }).catch(() => {
        commit('setGetLearnedStatus', 'failed');
        commit('setLearned', { learned: [] });
      });
  },
};

const mutations = {
  pushEntryToLearned (state, {ingredient}) {
    state.learned.push(ingredient);
  },

  setLearned (state, {learned}) {
    state.learned = learned;
  },

  setGetLearnedStatus (state, status){
    state.getLearnedStatus = status;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
