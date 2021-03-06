import * as types from "../../constant";
import { getAllCategory, getCategoryList } from "network/playlist";


const topListModule = {
  state: {
    allCategory: {},
    categoryList: []
  },
  actions: {
    [types.GET_ALL_CATEGORY_ACTION](context) {
      if (context.state.allCategory.categories) return;
      getAllCategory().then(res => {
        context.commit(types.GET_ALL_CATEGORY, res);
      })
    },
    [types.GET_CATEGORY_LIST_BY_CAT_ACTION](context, payload) {
      let index, currentCatIsLoaded, currentPageIsLoaded;
      currentCatIsLoaded = context.state.categoryList.some((item, indez) => {
        if (item.cat === payload.cat) {
          index = indez;
          return true;
        }
      });
      if (currentCatIsLoaded) {
        currentPageIsLoaded = context.state.categoryList[index].pageList.some((item, indez) => {
          return item.page === payload.page;
        });
        if (currentPageIsLoaded) return;

        getCategoryList(payload.cat, payload.offset).then(res => {
          context.commit(types.ADD_NEW_PAGE_LIST, { index, list: { page: payload.page, list: res.playlists } });
        })

      }
      else {
        getCategoryList(payload.cat, payload.offset).then(res => {
          context.commit(types.GET_CATEGORY_LIST_BY_CAT, { cat: payload.cat, total: res.total, pageList: [{ page: payload.page, list: res.playlists }] });
        })
      }
    }
  },
  mutations: {
    [types.GET_ALL_CATEGORY](state, categories) {
      state.allCategory = categories;
    },
    [types.GET_CATEGORY_LIST_BY_CAT](state, payload) {
      state.categoryList.push(payload);
    },
    [types.ADD_NEW_PAGE_LIST](state, payload) {
      state.categoryList[payload.index].pageList.push(payload.list);
    }
  },
  getters: {
    getPlaylistsByCatAndPage(state) {
      return (cat, page) => {
        const someCatList = state.categoryList.filter(item => {
          return item.cat === cat;
        });
        if (!someCatList.length) return [];
        const res = someCatList[0].pageList.filter(item => {
          return item.page === page;
        });
        if (!res.length) return [];
        return res[0].list;
      }
    },
    getPlayListTotalCount(state) {
      return cat => {
        const someCatList = state.categoryList.filter(item => {
          return item.cat === cat;
        });
        if (!someCatList.length) return 0;
        return someCatList[0].total;
      }
    }
  }
}

export default topListModule;