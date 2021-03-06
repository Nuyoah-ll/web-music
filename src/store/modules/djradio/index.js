import * as types from "../../constant";
import { getDjRadioCateList, getNewDjRadio, getHotDjRadioByIdAndPage } from "network/djradio";


const djRadioModule = {
  state: {
    cateList: [],
    newDjRadio: [],
    hotDjRadio: [],
  },
  actions: {
    [types.GET_DJRADIO_CATELIST_ACTION](context) {
      if (context.state.cateList.length) return;
      getDjRadioCateList().then(res => {
        context.commit(types.GET_DJRADIO_CATELIST, res.categories)
      })
    },
    [types.GET_NEW_DJ_RADIO_ACTION](context, id) {
      let isLoaded = false;
      context.state.newDjRadio.forEach(item => {
        if (item.id === id) isLoaded = true;
      })
      if (isLoaded) return;
      getNewDjRadio(id).then(res => {
        context.commit(types.GET_NEW_DJ_RADIO, { id, list: res.djRadios })
      })
    },
    [types.GET_HOT_DJ_RADIO_ACTION](context, payload) {
      console.log("触发了几次", payload)
      let index, currentIdIsLoaded, currentPageIsLoaded;
      currentIdIsLoaded = context.state.hotDjRadio.some((item, indez) => {
        if (item.id === payload.id) {
          index = indez;
          return true;
        }
      });
      if (currentIdIsLoaded) {
        currentPageIsLoaded = context.state.hotDjRadio[index].pageList.some((item, indez) => {
          return item.page === payload.page;
        });
        if (currentPageIsLoaded) return;

        getHotDjRadioByIdAndPage(payload.id, payload.page).then(res => {
          context.commit(types.ADD_DJ_RADIO_PAGE_LIST, { index, list: { page: payload.page, list: res.djRadios } });
        })

      }
      else {
        getHotDjRadioByIdAndPage(payload.id, payload.page).then(res => {
          context.commit(types.GET_HOT_DJ_RADIO, { id: payload.id, count: res.count, pageList: [{ page: payload.page, list: res.djRadios }] });
        })
      }
    }
  },
  mutations: {
    [types.GET_DJRADIO_CATELIST](state, list) {
      state.cateList = list;
    },
    [types.GET_NEW_DJ_RADIO](state, payload) {
      state.newDjRadio.push(payload);
    },
    [types.GET_HOT_DJ_RADIO](state, payload) {
      state.hotDjRadio.push(payload);
    },
    [types.ADD_DJ_RADIO_PAGE_LIST](state, payload) {
      state.hotDjRadio[payload.index].pageList.push(payload.list);
    }
  },
  getters: {
    categoryList(state) {
      return state.cateList;
    },
    newDjRadioOfId(state) {
      return id => {
        let res = state.newDjRadio.filter(item => {
          return item.id === id;
        })
        if (res.length) return res[0].list;
        return res;
      }
    },
    hotDjRadioOfIdAndPage(state) {
      return (id, page) => {
        const someIdList = state.hotDjRadio.filter(item => {
          return item.id === id;
        });
        if (someIdList.length === 0) return someIdList;
        const res = someIdList[0].pageList.filter(item => {
          return item.page === page;
        });
        if (res.length === 0) return [];
        return res[0].list;
      }
    }
  }
}

export default djRadioModule;