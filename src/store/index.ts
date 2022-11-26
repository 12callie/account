import Vue from 'vue';
import Vuex from 'vuex';
import { defaultTags } from "@/constants/defaultTagList";
import clone from "@/lib/clone";

Vue.use(Vuex);

type RootState = {
  tagList: Tag[],
  recordList: RecordItem[];
};

const store = new Vuex.Store({
  state: {
    tagList: [],
    recordList: [],
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecords(state, record: RecordItem) {
      const record2 = clone(record);
      state.recordList.push(record2);
      store.commit('saveRecords');
    },

    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        state.tagList = defaultTags;
        store.commit('saveTags');
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
  },
  actions: {
  },
  modules: {
  }
});
export default store;   