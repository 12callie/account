import Vue from 'vue';
import Vuex from 'vuex';
import { defaultTags } from "@/constants/defaultTagList";
import clone from "@/lib/clone";

Vue.use(Vuex);

type RootState = {
  tagList: Tag[],
  recordList: RecordItem[],
  currentTag: undefined | Tag,
};

const store = new Vuex.Store({
  state: {
    tagList: [],
    recordList: [],
    currentTag: undefined,
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
    removeTag(state, tag: Tag) {
      const id = tag.id;
      if (window.confirm("确定删除此标签吗？")) {
        let index = -1;
        for (let i = 0; i < state.tagList.length; i++) {
          if (state.tagList[i].id === id) {
            index = i;
            break;
          }
        }
        if (index >= 0) {
          state.tagList.splice(index, 1);
          store.commit('saveTags');
        } else {
          window.alert("删除失败");
        }
      }
    },
    setCurrentTag(state, id: number) {
      state.currentTag = state.tagList.filter((tag) => tag.id === id)[0];
    },
  },

});
export default store;   