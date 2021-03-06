import * as types from "../../constant";
import { getCurrentPlayedMusic, getLyric } from "network/music";
import { getToplistDetailById } from "network/toplist";
import { getAlbumMusicListById } from "network/album";
import { uniqueList, splitLyric, getRndInteger } from "utils/format";


const audioPlayListModule = {
  state: {
    loadedPlayList: [],
    loadedAlbumList: [],
    singleMusicList: [],
    currentList: [],
    currentMusic: {},
    loadedLyric: [],
  },
  actions: {

    /**
     * 加载歌单歌曲的actions
     */
    [types.GET_PLAYLIST_MUSIC_LIST_BY_ID_ACTION](context, payload) {
      // 首先判断这个歌单是否加载过
      let index, isLoaded;
      isLoaded = context.state.loadedPlayList.some((item, indey) => {
        if (item.id === payload.id) {
          index = indey;
          return true;
        }
      })

      // 如果当前歌单已经加载成功，那么就直接将这个歌单的歌曲放进currentList
      if (isLoaded) return context.commit(types.CHANGE_CURRENT_MUSIC_LIST, { index, type: 0 });

      // 如果没有加载成功，则开始加载这个歌单的歌曲信息以及其歌词
      let ids = "";
      // 1.通过歌单id获取这个歌单前10首歌的id，再拼接成ids
      getToplistDetailById(payload.id).then((res) => {
        // 判断是否限制10首歌，在首页点击歌单会有限制，不传noslice，在榜单路由中点击歌单没有限制，传递一个noslice：true
        let temp = payload.noslice ? res.playlist.trackIds : res.playlist.trackIds.slice(0, 10)
        temp.forEach((item) => {
          ids += `${item.id},`;
        });
        ids = ids.substring(0, ids.length - 1);

        // 2.根据ids获取当前歌单所有的歌曲信息，并push进loadedPlayList，然后修改currentList
        getCurrentPlayedMusic(ids).then((res) => {
          context.commit(types.GET_PLAYLIST_MUSIC_LIST_BY_ID, { id: payload.id, list: res.songs });
          context.commit(types.CHANGE_CURRENT_MUSIC_LIST, { index: context.state.loadedPlayList.length - 1, type: 0 });
        });
      });
    },


    /**
     * 加载专辑歌曲的action
     */
    [types.GET_ALBUM_MUSIC_LIST_BY_ID_ACTION](context, payload) {
      let index, isLoaded;
      isLoaded = context.state.loadedAlbumList.some((item, indey) => {
        if (item.id === payload.id) {
          index = indey;
          return true;
        }
      });
      if (isLoaded) return context.commit(types.CHANGE_CURRENT_MUSIC_LIST, { index, type: 1 });
      getAlbumMusicListById(payload.id).then(res => {
        context.commit(types.GET_ALBUM_MUSIC_LIST_BY_ID, { id: payload.id, list: res.songs });
        context.commit(types.CHANGE_CURRENT_MUSIC_LIST, { index: context.state.loadedAlbumList.length - 1, type: 1 });
      })
    },

    /**
     * 加载单曲的action
     */
    [types.GET_SINGLE_MUSIC_BY_ID_ACTION](context, payload) {
      let index, isLoaded;
      isLoaded = context.state.singleMusicList.some((item, indey) => {
        if (item.id === payload.id) {
          index = indey;
          return true;
        }
      })
      if (isLoaded) return context.commit(types.CHANGE_CURRENT_MUSIC_LIST, { id: payload.id, index, type: 2 });
      getCurrentPlayedMusic(payload.id).then(res => {
        context.commit(types.GET_SINGLE_MUSIC_BY_ID, { id: payload.id, song: res.songs[0] });
        context.commit(types.CHANGE_CURRENT_MUSIC_LIST, { id: payload.id, index: context.state.singleMusicList.length - 1, type: 2 });
      })
    },

    /**
     * 加载歌词的action
     */
    [types.GET_LYRIC_ACTION](context, id) {
      let isLoaded;
      isLoaded = context.state.loadedLyric.some(item => {
        return item.id === id;
      })
      if (isLoaded) return;
      getLyric(id).then(res => {
        context.commit(types.GET_LYRIC, { id, lyric: res });
      })
    }
  },
  mutations: {

    // 修改currentList
    [types.CHANGE_CURRENT_MUSIC_LIST](state, payload) {
      if (payload.type === 0) {
        state.currentList = state.loadedPlayList[payload.index].list;
        state.currentMusic = state.currentList[0];
      }
      else if (payload.type === 1) {
        state.currentList = state.loadedAlbumList[payload.index].list;
        state.currentMusic = state.currentList[0];
      }
      else if (payload.type === 2) {
        state.currentList.push(state.singleMusicList[payload.index].song);
        // 对currentList进行一次去重
        state.currentList = uniqueList(state.currentList);
        // 然后将点击的单曲赋给currentMusic
        state.currentMusic = state.currentList.filter(item => {
          return item.id === payload.id;
        })[0];
      }


    },

    // 添加对应id的歌单
    [types.GET_PLAYLIST_MUSIC_LIST_BY_ID](state, payload) {
      state.loadedPlayList.push(payload);
    },

    // 添加对应id的专辑
    [types.GET_ALBUM_MUSIC_LIST_BY_ID](state, payload) {
      state.loadedAlbumList.push(payload);
    },

    // 添加对应id的歌曲
    [types.GET_SINGLE_MUSIC_BY_ID](state, payload) {
      state.singleMusicList.push(payload);
    },

    [types.CHANGE_CURRENT_MUSIC_BY_ID](state, payload) {
      state.currentMusic = state.currentList.filter(item => {
        return item.id === payload.id;
      })[0];
    },


    // payload应该包含两个字段：mode（播放模式）、type（上一首/下一首）
    // 其中mode：0 随机播放  1 循环播放  2 单曲循环
    // 其中type：1 下一首 -1 上一首
    [types.CHANGE_CURRENT_MUSIC_BY_MODE](state, payload) {
      if (state.currentList.length === 0) return;
      if (payload.mode === 2) {
        state.currentMusic = { ...state.currentMusic };
      }
      else if (payload.mode === 0) {
        let index, historyIndex;
        if (state.currentList.length === 1) {
          index = 0;
        }
        else {
          state.currentList.forEach((item, indey) => {
            if (item.id === state.currentMusic.id) historyIndex = indey;
          });
          index = historyIndex;
          while (index === historyIndex) {
            index = getRndInteger(0, state.currentList.length - 1)
          }
        }
        state.currentMusic = state.currentList[index];
      }
      else if (payload.mode === 1) {
        let index;
        state.currentList.forEach((item, indey) => {
          if (item.id === state.currentMusic.id) index = indey;
        });
        if (payload.type === 1) {
          index = index === state.currentList.length - 1 ? 0 : index + 1;
        }
        else {
          index = index === 0 ? state.currentList.length - 1 : index - 1;
        }
        state.currentMusic = state.currentList[index];
      }
    },



    [types.DELETE_CURRENT_MUSIC](state, payload) {
      // 记录被删除的歌曲的索引
      let index;
      state.currentList = state.currentList.filter((item, indey) => {
        if (item.id === payload.id) {
          index = indey;
          return false;
        }
        return true;
      });
      // 然后让当前播放的歌曲为之前那个被删除的歌曲的下一首歌，如果不存在下一首歌，则赋一个空对象
      if (state.currentMusic.id === payload.id) {
        state.currentMusic = state.currentList[index] || state.currentList[index - 1] || {};
      }
    },



    [types.GET_LYRIC](state, payload) {
      state.loadedLyric.push(payload);
    },



    [types.CLEAR_MUSIC_LIST](state) {
      state.currentList = [];
    }

  },
  getters: {
    getCurrentList(state) {
      return state.currentList;
    },
    getCurrentMusic(state) {
      return state.currentMusic;
    },
    getCurrentLyric(state) {
      return id => {
        let tlyric;
        tlyric = state.loadedLyric.filter(item => {
          return item.id === id;
        })[0];
        // 这个时候对应id的lyric还没有加载成功
        if (!tlyric) return [""];
        // 表示当前歌曲还没有任何歌词
        else if (tlyric.lyric.nolyric) return [[0, "当前歌曲暂无歌词"]];
        // 既没有nolyric字段，也没有lrc，则表明是纯音乐
        else if (!tlyric.lyric.lrc) return [[0, "纯音乐，无歌词"]];
        else {
          return splitLyric(tlyric.lyric.lrc.lyric);
        }
      }
    }
  }
}

export default audioPlayListModule;