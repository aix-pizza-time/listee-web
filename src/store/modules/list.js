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
  getListStatus: null,
  addStatus: null,
  deleteStatus: null,
  renameStatus: null,
  commitStatus: null,
  resetStatus: null,
  nextStatus: null,
};

const getters = {
  list: (state) => {
    return state.list;
  },
};

const actions = {
  getList({commit}) {
    commit('setGetListStatus', 'pending');
    axios.get(`${host}/api/v2/list`)
      .then(({data}) => {
        commit('setGetListStatus', 'successful');
        commit('setList', { list: data });
      }).catch(() => {
        commit('setGetListStatus', 'failed');
        commit('setList', { list: [] });
      });
  },

  addEntry({commit}, {entry, creator = 'anonymous', price = 0}) {
    commit('setAddStatus', 'pending');
    axios.post(`${host}/api/v2/list/item`, {
      'entry': entry,
      'creator': creator,
      'price': price
    })
      .then(({data}) => {
        commit('setAddStatus', 'successful');
        commit('pushEntryToList', data);
      }).catch(() => {
        commit('setAddStatus', 'failed');
      });
  },

  changeEntry({state, commit}, {id, entry, creator, price}) {
    const prevList = [...state.list];
    commit('setRenameStatus', 'pending');
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
      }).catch(() => {
        commit('setRenameStatus', 'failed');
        // Roll back
        commit('setList', { 'list': prevList });
      });
  },

  deleteEntry({commit}, {id}) {
    commit('setDeleteStatus', 'pending');
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
    commit('setResetStatus', 'pending');
    axios.delete(`${host}/api/v2/list`)
      .then(() => {
        commit('setResetStatus', 'successful');
      }).catch(() => {
        commit('setResetStatus', 'failed');
        // Roll back
        commit('setList', { list: prevList });
      });
  },

  nextList({state, commit}) {
    const prevList = [...state.list];
    // commit('pending', 'successful');
    commit('setList', { list: [] });
    axios.post(`${host}/api/v2/next`)
      .then(() => {
        commit('setNextStatus', 'successful');
      }).catch(() => {
        commit('setNextStatus', 'failed');
        // Roll back
        commit('setList', { list: prevList });
      });
  },
};

const mutations = {
  pushEntryToList (state, {id, entry, creator, price}) {
    state.list.push({'id': id, 'entry': entry, 'creator': creator, 'price': price});
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
  setNextStatus (state, status){
    state.nextStatus = status;
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
