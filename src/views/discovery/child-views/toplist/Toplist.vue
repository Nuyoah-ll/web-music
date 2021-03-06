<template>
  <div id="toplist">
    <div class="left">
      <h2>云音乐特色榜</h2>
      <div class="special" v-if="$store.getters.specialToplist.length !== 0">
        <list-box
          v-for="item in $store.getters.specialToplist"
          :key="item.id"
          :list-info="item"
        />
      </div>
      <h2>全球媒体榜</h2>
      <div class="global" v-if="$store.getters.globalToplist.length !== 0">
        <list-box
          v-for="item in $store.getters.globalToplist"
          :key="item.id"
          :list-info="item"
        />
      </div>
    </div>
    <div class="right">
      <!-- 榜单摘要信息 -->
      <list-abstract
        :list-info="$store.getters.toplistDetailById(currentId).list"
        v-if="$store.getters.toplistDetailById(currentId)"
      />

      <!-- 歌曲列表的头部导航 -->
      <common-navbar width="670px" height="35px">
        <template v-slot:left>
          <span :style="{ fontSize: '20px', marginRight: '20px' }"
            >歌曲列表</span
          >
        </template>
        <template v-slot:center> 100首歌 </template>
        <template v-slot:right>
          <span
            >播放：<span
              :style="{
                color: '#C20C0C',
                fontWeight: 'bold',
              }"
              >40203558689</span
            >次</span
          >
        </template>
      </common-navbar>

      <!-- 歌曲列表 -->
      <music-list :current-id="currentId" />

      <!-- 评论头部导航 -->
      <common-navbar width="670px" height="35px">
        <template v-slot:left>
          <span :style="{ fontSize: '20px', marginRight: '20px' }">评论</span>
        </template>
      </common-navbar>

      <h5>
        最新评论（{{
          $store.getters.totalCommentById(currentId)
            ? $store.getters.totalCommentById(currentId).total
            : 0
        }}）
      </h5>
      <div
        v-if="$store.getters.latestCommentByIdAndPage(currentId, currentPage)"
      >
        <comment-box
          v-for="item in $store.getters.latestCommentByIdAndPage(
            currentId,
            currentPage
          ).list"
          :key="item.commentId"
          :comment-info="item"
        />
      </div>
      <music-pagination
        @page-changed="getCommentByPage"
        :item-count="
          $store.getters.totalCommentById(currentId)
            ? $store.getters.totalCommentById(currentId).total
            : 0
        "
      />
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import ListBox from "./child-components/ListBox";
import ListAbstract from "./child-components/ListAbstract";
import CommonNavbar from "components/content/common-navbar/CommonNavbar";
import MusicList from "./child-components/MusicList";
import CommentBox from "components/content/comment/CommentBox";
import MusicPagination from "components/content/music-pagination/MusicPagination";
export default {
  name: "Toplist",
  components: {
    ListBox,
    ListAbstract,
    CommonNavbar,
    MusicList,
    CommentBox,
    MusicPagination,
  },
  data() {
    return {
      currentId: "19723756",
      currentPage: 1,
    };
  },
  mounted() {
    this.$store.dispatch(types.GET_ALL_TOPLIST_ACTION);
  },
  activated() {
    // 无论是从其他路由跳转过来，还是说在/discovery/toplist刷新页面，都会触发这个生命周期函数。
    // 当从其他页面跳转过来时，路由里没有id，所以我们得先请求飙升榜，因为他是默认值
    // 如果在当前页面某个榜单下刷新页面，那么这是会有id，那么我们得首先请求当前id对应的数据
    if (this.$route.query.id) {
      this.$store.dispatch(
        types.GET_TOPLIST_DETAIL_BY_ID_ACTION,
        this.$route.query.id
      );
      this.currentId = this.$route.query.id;
    } else {
      this.currentId = "19723756";
      this.$store.dispatch(
        types.GET_TOPLIST_DETAIL_BY_ID_ACTION,
        this.currentId
      );
    }
  },
  // 由于仅仅只是查询字符串改变，所以没法监听路由的变化，只能在watch里监听
  watch: {
    $route() {
      this.$store.dispatch(
        types.GET_TOPLIST_DETAIL_BY_ID_ACTION,
        this.$route.query.id
      );
      this.currentId = this.$route.query.id;
    },
  },
  methods: {
    getCommentByPage(page) {
      this.currentPage = page;
      this.$store.dispatch(types.GET_LATEST_COMMENT_BY_PAGE_ACTION, {
        id: this.currentId,
        page,
      });
    },
  },
};
</script>

<style scoped lang="less">
#toplist {
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  .left {
    width: 240px;
    border: 1px solid rgb(216, 216, 216);
    background-color: #f9f9f9;
    h2 {
      margin-top: 20px;
      padding: 0 10px 12px 15px;
      font-size: 15px;
    }
  }
  .right {
    width: 740px;
    border: 1px solid rgb(216, 216, 216);
    border-left: none;
    padding: 0 30px 40px 40px;
    background-color: #fff;
    h5 {
      margin-top: 10px;
      padding-bottom: 5px;
    }
  }
}
</style>