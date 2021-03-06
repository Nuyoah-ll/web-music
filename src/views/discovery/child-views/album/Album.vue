<template>
  <div id="album">
    <div class="wrap3">
      <common-navbar>
        <template v-slot:left>
          <h1>热门新碟</h1>
        </template>
      </common-navbar>

      <div class="hot-new-album">
        <div v-for="item in $store.getters.newAlbum" :key="item.id">
          <music-display-frame2 :music-info="item" :show-shadow="false" />
        </div>
      </div>

      <common-navbar>
        <template v-slot:left>
          <h1>全部新碟</h1>
        </template>
        <template v-slot:center>
          <div class="center-wrap">
            <span
              v-for="item in mock"
              :key="item.name"
              @click="toArea(item.area)"
              >{{ item.name }}</span
            >
            <span style="color: red; border-right: none">
              （接口传入不同的类别参数，返回的都是全部新碟数据，目前只支持展示全部榜单）
            </span>
          </div>
        </template>
      </common-navbar>

      <div class="all-album" v-if="list.length !== 0">
        <div v-for="item in list" :key="item.id">
          <music-display-frame2 :music-info="item" :show-shadow="false" />
        </div>
      </div>

      <music-pagination
        :item-count="total"
        :item-per-page="35"
        @page-changed="changePage"
      />
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import CommonNavbar from "components/content/common-navbar/CommonNavbar";
import MusicDisplayFrame2 from "components/content/music-display-frame1/MusicDisplayFrame2";
import MusicPagination from "components/content/music-pagination/MusicPagination";
export default {
  name: "Album",
  components: {
    CommonNavbar,
    MusicDisplayFrame2,
    MusicPagination,
  },
  computed: {
    list() {
      return this.$store.getters.getAlbumListByAreaAndPage(
        this.currentArea,
        this.currentPage
      );
    },
    total() {
      return this.$store.getters.getAlbumTotalCountByArea(this.currentArea);
    },
  },
  data() {
    return {
      currentArea: "ALL",
      currentPage: 1,
      mock: [
        { area: "All", name: "全部" },
        { area: "ZH", name: "华语" },
        { area: "EA", name: "欧美" },
        { area: "KR", name: "韩国" },
        { area: "JP", name: "日本" },
      ],
    };
  },
  methods: {
    toArea(area) {
      const page = this.$route.query.page;
      if (!!page) {
        this.$router.push(`/discovery/album?area=${area}&page=${page}`);
      } else {
        this.$router.push(`/discovery/album?area=${area}`);
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.$store.dispatch(types.GET_ALBUM_BY_AREA_AND_PAGE_ACTION, {
        area: this.currentArea,
        page: this.currentPage,
      });
    },
  },
  activated() {
    this.currentPage = this.$route.query.page ? this.$route.query.page : 1;
    this.currentArea = this.$route.query.area ? this.$route.query.area : "ALL";
    this.$store.dispatch(types.GET_RECOMMEND_NEW_ALBUM_ACTION, 10);
    this.$store.dispatch(types.GET_ALBUM_BY_AREA_AND_PAGE_ACTION, {
      area: this.currentArea,
      page: this.currentPage,
    });
  },
  watch: {
    $route() {
      this.currentPage = this.$route.query.page ? this.$route.query.page : 1;
      this.currentArea = this.$route.query.area
        ? this.$route.query.area
        : "ALL";
      this.$store.dispatch(types.GET_ALBUM_BY_AREA_AND_PAGE_ACTION, {
        area: this.currentArea,
        page: this.currentPage,
      });
    },
  },
};
</script>

<style scoped lang="less">
#album {
  background-color: #f5f5f5;
  .wrap3 {
    padding: 40px;
    border: 1px solid #d8d8d8;
    margin: 0 auto;
    background-color: #fff;
    .hot-new-album,
    .all-album {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      place-items: center;
      div {
        margin: 20px 0;
        transform: scale(1.1);
      }
    }
    .center-wrap {
      height: 15px;
      margin-left: 20px;
      color: #666666;
      span {
        padding: 0 10px;
        border-right: 2px solid #666666;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>