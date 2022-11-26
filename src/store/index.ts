import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

type RootState = {
  tagList: Tag[],
  recordList: RecordItem[];
};

const store = new Vuex.Store({
  state: {
    tagList: [],
    recordList: []
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecords(state, record: RecordItem) {
      if (record) {
        const record2 = JSON.parse(JSON.stringify(record));
        state.recordList.push(record2);
        console.log('here');
        store.commit('saveRecords');
      }
    }
  },
  actions: {
  },
  modules: {
  }
});
export default store;   