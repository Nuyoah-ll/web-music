import * as types from "../../constant";
import { gerTopArtists, getArtistsRankingByIdAndInitial } from "network/artists";


// export const GET_TOP_ARTISTS_ACTION = "artists/GET_TOP_ARTISTS_ACTION";
// export const GET_TOP_ARTISTS = "artists/GET_TOP_ARTISTS";

// export const GET_ARTISTS_RANKING_BY_ID_AND_INITIAL_ACTION = "artists/GET_ARTISTS_RANKING_BY_ID_AND_INITIAL_ACTION";
// export const GET_ARTISTS_RANKING_BY_ID_AND_INITIAL = "artists/GET_ARTISTS_RANKING_BY_ID_AND_INITIAL";
// export const ADD_ARTISTS_INITIAL_LIST = "artists/ADD_ARTISTS_INITIAL_LIST";


const artistsModule = {
  state: {
    topArtists: [],
    artistsRankingList: []
  },
  actions: {
    [types.GET_TOP_ARTISTS_ACTION](context) {
      if (context.state.topArtists.length) return;
      gerTopArtists().then(res => {
        context.commit(types.GET_TOP_ARTISTS, res.artists);
      })
    },
    [types.GET_ARTISTS_RANKING_BY_ID_AND_INITIAL_ACTION](context, payload) {
      let index, isLoaded = false, correspondingInitialIsLoaded = false;
      context.state.artistsRankingList.forEach((item, indey) => {
        if (item.id === payload.id) {
          index = indey;
          isLoaded = true;
        }
      });
      console.log(isLoaded, payload)
      if (isLoaded) {
        context.state.artistsRankingList[index].rankingList.forEach(item => {
          if (item.initial === payload.initial) {
            correspondingInitialIsLoaded = true;
          }
        })
        if (correspondingInitialIsLoaded) return;
        getArtistsRankingByIdAndInitial(payload.id, payload.initial).then(res => {
          context.commit(types.ADD_ARTISTS_INITIAL_LIST, { index, list: { initial: payload.initial, list: res.artists } });
        })
      }
      else {
        getArtistsRankingByIdAndInitial(payload.id, payload.initial).then(res => {
          context.commit(types.GET_ARTISTS_RANKING_BY_ID_AND_INITIAL, {
            id: payload.id,
            rankingList: [
              { initial: payload.initial, list: res.artists }
            ]
          })
        })
      }
    }
  },
  mutations: {
    [types.GET_TOP_ARTISTS](state, list) {
      state.topArtists = list;
    },
    [types.GET_ARTISTS_RANKING_BY_ID_AND_INITIAL](state, list) {
      state.artistsRankingList.push(list);
    },
    [types.ADD_ARTISTS_INITIAL_LIST](state, payload) {
      state.artistsRankingList[payload.index].rankingList.push(payload.list);
    }
  },
  getters: {
    getArtistsRankingListByIdAndInitial(state) {
      return (id, initial) => {
        console.log(initial,"欺负我")
        let list = state.artistsRankingList.filter(item => {
          return item.id === id;
        });
        if (list.length !== 0) {
          list = list[0].rankingList.filter(item => {
            return item.initial === initial;
          });

          return list[0] ? list[0].list : [];
        }
        return list;
      }
    }
  }
}

export default artistsModule;