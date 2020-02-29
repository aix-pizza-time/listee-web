import axios from 'axios';

// const host = http://localhost:3000';
const host = 'https://pizza.bartolomey.me';

Array.prototype.findIndexById = function (id) {
  if (typeof id !== 'string') {
    return null;
  } else {
    return this.findIndex((v) => v.id === id);
  }
};

const state = {
  list: [],
  learned: [],
  getListStatus: null,
  getLearnedStatus: null,
  addStatus: null,
  deleteStatus: null,
  renameStatus: null,
  commitStatus: null,
  resetStatus: null,
};

const getters = {
  list: (state) => {
    return state.list;
  },
  learned: (state) => {
    return state.learned;
  },
};

const actions = {
  getList({commit}) {
    axios.get(`${host}/api/v2/list`)
      .then(({data}) => {
        commit('setGetListStatus', 'successful');
        commit('setList', { list: data });
      }).catch(() => {
        commit('setGetListStatus', 'failed');
        commit('setList', { list: [] });
      });
  },

  getLearned({commit}) {
    axios.get(`${host}/api/v2/learn`)
      .then(({data}) => {
        commit('setGetLearnedStatus', 'successful');
        commit('setList', { learned: data });
      }).catch(() => {
        commit('setGetLearnedStatus', 'failed');
        commit('setList', { learned: [] });
      });
  },

  addEntry({commit}, {item, creator = 'anonymous', price = -1}) {
    axios.post(`${host}/api/v2/list/item`, {
      'entry': item,
      'creator': creator,
      'price': price
    })
      .then(({data}) => {
        commit('setAddStatus', 'successful');
        commit('pushEntryToList', data);
        commit('pushEntryToLearned', {
          'ingredient': item
        });
      }).catch(() => {
        commit('setAddStatus', 'failed');
      });
  },

  changeEntry({state, commit}, {id, entry, creator, price}) {
    const prevList = [...state.list];
    commit('setEntry', {
      'id': id,
      'entry': entry,
      'creator': creator,
      'price': price,
    });
    axios.put(`${host}/api/v2/list/item/${id}`, {
      'entry': entry,
      'creator': creator,
      'price': price
    })
      .then(() => {
        commit('setRenameStatus', 'successful');
        commit('pushEntryToLearned', {
          'ingredient': entry
        });
      }).catch(() => {
        commit('setRenameStatus', 'failed');
        // Roll back
        commit('setList', { 'list': prevList });
      });
  },

  deleteEntry({commit}, {id}) {
    axios.delete(`${host}/api/v2/list/item/${id}`)
      .then(() => {
        commit('setDeleteStatus', 'successful');
        commit('removeEntry', {id});
      }).catch(() => {
        commit('setDeleteStatus', 'failed');
      });
  },

  resetList({state, commit}) {
    const prevList = [...state.list];
    commit('setList', { list: [] });
    axios.delete(`${host}/api/v2/list`)
      .then(() => {
        commit('setResetStatus', 'successful');
      }).catch(() => {
        commit('setResetStatus', 'failed');
        // Roll back
        commit('setList', { list: prevList });
      });
  },
};

const mutations = {
  pushEntryToList (state, {id, entry, creator, price}) {
    state.list.push({'id': id, 'entry': entry, 'creator': creator, 'price': price});
  },

  pushEntryToLearned (state, {ingredient}) {
    state.learned.push(ingredient);
  },

  setEntry (state, {id, entry, creator, price}) {
    let _id = state.list.findIndexById(id);
    state.list.splice(_id, 1, {'id': id, 'entry': entry, 'creator': creator, 'price': price});
  },

  removeEntry (state, {id}){
    let i = state.list.findIndexById(id);
    state.list.splice(i, 1);
  },

  setList (state, {list}) {
    state.list = list;
  },
  setLearned (state, {learned}) {
    state.list = learned;
  },
  setGetListStatus (state, status){
    state.getListStatus = status;
  },
  setGetLearnedStatus (state, status){
    state.getLearnedStatus = status;
  },
  setAddStatus (state, status){
    state.addStatus = status;
  },
  setRenameStatus (state, status){
    state.renameStatus = status;
  },
  setDeleteStatus (state, status){
    state.deleteStatus = status;
  },
  setResetStatus (state, status){
    state.resetStatus = status;
  },

  // setCommitted (state, {committed}){
  //   state.committed = committed;
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
