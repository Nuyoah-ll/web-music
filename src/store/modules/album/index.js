import * as types from "../../constant";
import { getAlbumListByAreaAndPage } from "network/album";

const albumModule = {
  state: {
    album: []
  },
  actions: {
    [types.GET_ALBUM_BY_AREA_AND_PAGE_ACTION](context, payload) {
      let index, currentAreaIsLoaded, currentPageIsLoaded;
      currentAreaIsLoaded = context.state.album.some((item, indez) => {
        if (item.area === payload.area) {
          index = indez;
          return true;
        }
      });
      if (currentAreaIsLoaded) {
        currentPageIsLoaded = context.state.album[index].allAlbum.some((item, indez) => {
          return item.page === payload.page;
        });
        if (currentPageIsLoaded) return;

        getAlbumListByAreaAndPage(payload.area, payload.page).then(res => {
          context.commit(types.ADD_ALBUM_PAGE_LIST, { index, list: { page: payload.page, list: res.albums } });
        })

      }
      else {
        getAlbumListByAreaAndPage(payload.area, payload.page).then(res => {
          context.commit(types.GET_ALBUM_BY_AREA_AND_PAGE, { area: payload.area, total: res.total, allAlbum: [{ page: payload.page, list: res.albums }] });
        })
      }

    }
  },
  mutations: {
    [types.GET_ALBUM_BY_AREA_AND_PAGE](state, payload) {
      state.album.push(payload);
    },
    [types.ADD_ALBUM_PAGE_LIST](state, payload) {
      state.album[payload.index].allAlbum.push(payload.list);
    }
  },
  getters: {
    getAlbumTotalCountByArea(state) {
      return (area) => {
        const someAreaList = state.album.filter(item => {
          return item.area === area;
        });
        if (!someAreaList.length) return 0;
        return someAreaList[0].total;
      }
    },
    getAlbumListByAreaAndPage(state) {
      return (area, page) => {
        const someAreaList = state.album.filter(item => {
          return item.area === area;
        });
        if (!someAreaList.length) return [];
        const res = someAreaList[0].allAlbum.filter(item => {
          return item.page === page;
        });
        if (!res.length) return [];
        return res[0].list;
      }
    }
  }
}

export default albumModule;