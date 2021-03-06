import * as types from "../../constant";
import { getTopBanner, getHotRecommend, getNewAlbum, getRanking } from "network/recommend"


const discoveryModule = {
  state: {
    banners: [],
    hotRecommend: [],
    newAlbum: [],
    originalMusicRanking: {},
    cloudNewMusicRanking: {},
    cloudSoaringMusicRanking: {}
  },
  actions: {
    [types.GET_RECOMMEND_TOP_BANNER_ACTION](context) {
      getTopBanner().then(res => {
        context.commit(types.GET_RECOMMEND_TOP_BANNER, res.banners)
      })
    },
    [types.GET_RECOMMEND_HOT_RECOMMEND_ACTION](context, limit) {
      getHotRecommend(limit).then(res => {
        context.commit(types.GET_RECOMMEND_HOT_RECOMMEND, res.result)
      })
    },
    [types.GET_RECOMMEND_NEW_ALBUM_ACTION](context, limit) {
      if (context.state.newAlbum.length === 0) {
        getNewAlbum(limit).then(res => {
          context.commit(types.GET_RECOMMEND_NEW_ALBUM, res.albums)
        })
      }
    },
    [types.GET_RECOMMEND_RANKING_LIST_ACTION](context, idx) {
      // 0：新歌榜  2：原创榜 3：飙升榜
      getRanking(idx).then(res => {
        switch (idx) {
          case 3:
            context.commit(types.GET_CLOUD_SOARING_MUSIC_RANKING, res.playlist);
            break;
          case 0:
            context.commit(types.GET_CLOUD_NEW_MUSIC_RANKING, res.playlist);
            break;
          case 2:
            console.log("111111111111111111111111111111111111111111111-----------------------------------------")
            context.commit(types.GET_ORIGINAL_MUSIC_RANKING, res.playlist);
            break;
          default:
            return 1;
        }
      })
    }
  },
  mutations: {
    [types.GET_RECOMMEND_TOP_BANNER](state, banners) {
      state.banners = banners
    },
    [types.GET_RECOMMEND_HOT_RECOMMEND](state, hotRecommend) {
      state.hotRecommend = hotRecommend;
    },
    [types.GET_RECOMMEND_NEW_ALBUM](state, newAlbum) {
      state.newAlbum = newAlbum;
    },
    [types.GET_CLOUD_SOARING_MUSIC_RANKING](state, playlist) {
      state.cloudSoaringMusicRanking = playlist;
    },
    [types.GET_CLOUD_NEW_MUSIC_RANKING](state, playlist) {
      state.cloudNewMusicRanking = playlist;
    },
    [types.GET_ORIGINAL_MUSIC_RANKING](state, playlist) {
      state.originalMusicRanking = playlist;
    }
  },
  getters: {
    banners(state) {
      return state.banners
    },
    hotRecommend(state) {
      return state.hotRecommend
    },
    newAlbum(state) {
      return state.newAlbum;
    }
  }
}

export default discoveryModule;