import * as types from "../../constant";
import { getAllToplist, getToplistDetailById, getSongDetailById, getLatestComment } from "network/toplist";


const topListModule = {
  state: {
    allToplist: [],
    topListDetail: [],
    latestComment: [],
  },
  actions: {
    [types.GET_ALL_TOPLIST_ACTION](context) {
      getAllToplist().then(res => {
        context.commit(types.GET_ALL_TOPLIST, res.list);
      })
    },
    [types.GET_TOPLIST_DETAIL_BY_ID_ACTION](context, id) {
      let isLoaded = context.state.topListDetail.some((item) => {
        return item.id + '' === id;
      });
      if (!isLoaded) {
        getToplistDetailById(id).then(res => {
          // 没有登录状态下，获取到的榜单里的歌曲只有前三首，也就是tracks长度为3。但是tracksId是完整的，我们需要通过tracksId请求song/detail接口
          let ids = "";
          res.playlist.trackIds.forEach(item => {
            ids += `${item.id},`;

          })
          ids = ids.substring(0, ids.length - 1);
          getSongDetailById(ids).then(res1 => {
            res.playlist.tracks = res1.songs;
          })
          context.commit(types.GET_TOPLIST_DETAIL_BY_ID, { id, list: res.playlist });

          // 获取当前歌单最新评论的第一页数据
          getLatestComment(id, 1).then(res => {
            context.commit(types.GET_LATEST_COMMENT_BY_ID, { id: parseInt(id), total: res.total, comment: [{ page: 1, list: res.comments }] });
          })
        })
      }
    },
    [types.GET_LATEST_COMMENT_BY_PAGE_ACTION](context, payload) {
      let isLoaded, index;
      for (let i = 0; i < context.state.latestComment.length; i++) {
        if (context.state.latestComment[i].id + '' === payload.id) {
          isLoaded = context.state.latestComment[i].comment.some(item => {
            return item.page === payload.page;
          })
          index = i;
        }
      }
      if (!isLoaded) {
        getLatestComment(payload.id, payload.page).then(res => {
          context.commit(types.GET_LATEST_COMMENT_BY_PAGE, { index, pageList: { page: payload.page, list: res.comments } })
        })
      }
    }
  },
  mutations: {
    [types.GET_ALL_TOPLIST](state, list) {
      state.allToplist = list;
    },
    [types.GET_TOPLIST_DETAIL_BY_ID](state, payload) {
      state.topListDetail.push(payload);
    },
    [types.GET_LATEST_COMMENT_BY_ID](state, payload) {
      state.latestComment.push(payload);
    },
    [types.GET_LATEST_COMMENT_BY_PAGE](state, payload) {
      state.latestComment[payload.index].comment.push(payload.pageList);
    }
  },
  getters: {
    specialToplist(state) {
      return state.allToplist.length === 0 ? [] : state.allToplist.slice(0, 4);
    },
    globalToplist(state) {
      return state.allToplist.length === 0 ? [] : state.allToplist.slice(4);
    },
    toplistDetailById(state) {
      return function (id) {
        let list = state.topListDetail;
        if (id) {
          list = state.topListDetail.filter(item => {
            return item.id + '' === id;
          })
        }
        return list[0];
      }
    },
    latestCommentByIdAndPage(state) {
      return function (id, page) {
        let list = state.latestComment.filter(item => {
          return (item.id + "") === id;
        });
        if (list.length !== 0) {
          let comment = list[0].comment.filter(item => {
            return item.page === page;
          })
          return comment[0];
        } else {
          return list[0];
        }
      }
    },
    totalCommentById(state) {
      return function (id) {
        let list = state.latestComment.filter(item => {
          return (item.id + "") === id;
        });
        return list[0];
      }
    }
  }
}

export default topListModule;