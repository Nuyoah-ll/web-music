import * as types from "../../constant";
import { getCurrentDisplayMusic, getLyric, getSimiSong, getSimiPlaylist, getSongRecommend } from "network/music";

const musicModule = {
  state: {
    loadedMusic: []
  },
  actions: {
    [types.GET_DISPLAY_MUSIC_ACTIONS](context, payload) {
      let isLoaded = context.state.loadedMusic.some(item => {
        return item.id + '' === payload.id;
      })
      if (isLoaded) return;
      Promise.all([
        getCurrentDisplayMusic(payload.id),
        getLyric(payload.id),
        getSimiPlaylist(payload.id),
        getSimiSong(payload.id),
        getSongRecommend(payload.id, 1)
      ]).then(res => {
        let music = {
          comment: {
            hotComments: [],
            comments: [
              {
                page: 1,
                list: []
              }
            ]
          }
        };
        music.id = res[0].songs[0].id;
        music.musicInfo = res[0].songs[0];
        music.lyric = res[1].lrc.lyric;
        music.simiPlaylists = res[2].playlists;
        music.simiSongs = res[3].songs;
        music.comment.total = res[4].total;
        music.comment.hotComments = res[4].hotComments;
        music.comment.comments[0].list = res[4].comments;
        context.commit(types.GET_DISPLAY_MUSIC, music);
      })
    },
    [types.GET_NEW_COMMENT_BY_ID_AND_PAGE_ACTION](context, payload) {
      console.log(payload)
      const temp = context.state.loadedMusic.filter(item => {
        return item.id + '' === payload.id
      });
      let isLoaded = temp[0].comment.comments.some(item => {
        return item.page === payload.page;
      })
      console.log(isLoaded)
      if (isLoaded) return;
      getSongRecommend(payload.id, payload.page).then(res => {
        context.commit(types.GET_NEW_COMMENT_BY_ID_AND_PAGE, { id: payload.id, page: payload.page, list: res.comments });
      })
    }
  },
  mutations: {
    [types.GET_DISPLAY_MUSIC](state, payload) {
      state.loadedMusic.push(payload);
    },
    [types.GET_NEW_COMMENT_BY_ID_AND_PAGE](state, payload) {
      state.loadedMusic.forEach(item => {
        if (item.id + '' === payload.id) {
          item.comment.comments.push({
            page: payload.page,
            list: payload.list
          })
        }
      })
    }
  },
  getters: {
    getMusicDetailById(state) {
      return id => {
        let res = state.loadedMusic.filter(item => {
          return item.id + '' === id;
        });
        if (res.length === 0) return res;
        return res[0];
      }
    },
    getMusicCommentByIdAndPage(state) {
      return (id, page) => {
        const temp = state.loadedMusic.filter(item => {
          return item.id + '' === id;
        });
        const temp1 = temp[0].comment.comments.filter(item => {
          return item.page === page;
        });
        if(temp1.length === 0) return temp1;
        return temp1[0].list;
      }
    }
  }
}

export default musicModule;