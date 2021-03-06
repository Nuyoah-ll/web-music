<template>
  <div id="playlist">
    <div class="wrap3">
      <common-navbar width="900px" height="42px">
        <template v-slot:left>
          <h1>{{ $route.query.cat ? $route.query.cat : "全部" }}</h1>
        </template>
        <template v-slot:center>
          <div class="category-btn" @click="showCategory">
            <div class="left sprite_button">选择分类 ∨</div>
            <div class="right sprite_button"></div>
          </div>
        </template>
      </common-navbar>
      <category
        :is-show="isShow"
        :category-info="$store.state.c.allCategory"
        :sub-categories="
          $store.state.c.allCategory.sub ? $store.state.c.allCategory.sub : []
        "
      />
      <div class="play-list" v-if="list.length !== 0">
        <music-display-frame1
          v-for="item in list"
          :key="item.id"
          :show-author="true"
          :music-info="item"
        />
      </div>
      <!-- 下面这个盒子是为了防止歌单没加载之前，页面高度塌陷的问题 -->
      <div class="pad-box" v-else></div>
      <music-pagination
        :item-per-page="35"
        :item-count="total"
        @page-changed="changePage"
      />
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import CommonNavbar from "components/content/common-navbar/CommonNavbar";
import Category from "./child-components/Category";
import MusicDisplayFrame1 from "components/content/music-display-frame1/MusicDisplayFrame1";
import MusicPagination from "components/content/music-pagination/MusicPagination";
export default {
  name: "Playlist",
  components: {
    CommonNavbar,
    Category,
    MusicDisplayFrame1,
    MusicPagination,
  },
  data() {
    return {
      currentCat: "全部",
      currentPage: 1,
      isShow: false,
    };
  },
  activated() {
    this.currentCat = this.$route.query.cat ? this.$route.query.cat : "全部";
    this.$store.dispatch(types.GET_ALL_CATEGORY_ACTION);
    this.$store.dispatch(types.GET_CATEGORY_LIST_BY_CAT_ACTION, {
      cat: this.currentCat,
      offset: (this.currentPage - 1) * 35,
      page: this.currentPage,
    });
  },
  mounted() {
    this.$bus.$on("close-category", (_) => {
      this.isShow = false;
    });
  },
  computed: {
    list() {
      return this.$store.getters.getPlaylistsByCatAndPage(
        this.currentCat,
        this.currentPage
      );
    },
    total() {
      return this.$store.getters.getPlayListTotalCount(this.currentCat);
    },
  },
  methods: {
    showCategory() {
      this.isShow = !this.isShow;
    },
    changePage(page) {
      this.currentPage = page;
      this.$store.dispatch(types.GET_CATEGORY_LIST_BY_CAT_ACTION, {
        cat: this.currentCat,
        offset: (this.currentPage - 1) * 35,
        page: this.currentPage,
      });
    },
  },
  watch: {
    $route() {
      this.currentCat = this.$route.query.cat ? this.$route.query.cat : "全部";
      this.$store.dispatch(types.GET_CATEGORY_LIST_BY_CAT_ACTION, {
        cat: this.currentCat,
        offset: (this.currentPage - 1) * 35,
        page: this.currentPage,
      });
    },
  },
};
</script>

<style scoped lang="less">
#playlist {
  background-color: #f5f5f5;
  .wrap3 {
    background-color: #fff;
    border: 1px solid rgb(216, 216, 216);
    padding: 40px;
    margin: 0 auto;
    .category-btn {
      display: flex;
      margin-left: 20px;
      cursor: pointer;
      .left {
        width: 85px;
        height: 31px;
        color: #0c73c2;
        line-height: 31px;
        text-align: center;
        background-position: 0px -141px;
      }
      .right {
        width: 5px;
        height: 31px;
        background-position: -245px -182px;
      }
    }
    .category-btn:hover .left {
      background-position: 0px -223px;
    }
    .category-btn:hover .right {
      background-position: -245px -264px;
    }

    .play-list {
      // height: 902px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      place-items: center;
      margin-top: 30px;
    }
    .pad-box{
      height: 902px;
    }
  }
}
</style>