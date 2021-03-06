<template>
  <div id="djradio-category">
    <common-navbar>
      <template v-slot:left>
        <h1>优秀新电台</h1>
      </template>
    </common-navbar>

    <div
      class="new-dj-list"
      v-if="newDjRadioOfId($route.query.id).length !== 0"
    >
      <div
        class="list-item"
        v-for="item in newDjRadioOfId($route.query.id).slice(0, 5)"
        :key="item.id"
      >
        <img v-lazy="item.picUrl + '?param=150y150'" :alt="item.name" />
        <span class="radio-name">{{ item.name }}</span>
        <span class="radio-desc">{{ item.desc }}</span>
      </div>
    </div>

    <common-navbar>
      <template v-slot:left>
        <h1>电台排行榜</h1>
      </template>
      <template v-slot:right>
        <span style="color: #e0e0e0"
          >【以“上升最快”的方式排序的接口没找到<br />这里仅展示“最热电台”】</span
        >
      </template>
    </common-navbar>

    <div
      v-if="hotDjRadioOfIdAndPage($route.query.id, currentPage)"
      class="hot-dj-list"
    >
      <dj-radio-box
        v-for="item in hotDjRadioOfIdAndPage($route.query.id, currentPage)"
        :key="item.id"
        :dj-radio-info="item"
      />
    </div>

    <music-pagination
      :item-count="1000"
      :item-per-page="22"
      @page-changed="changePage"
    />
  </div>
</template>

<script>
import * as types from "store/constant";
import CommonNavbar from "components/content/common-navbar/CommonNavbar";
import MusicPagination from "components/content/music-pagination/MusicPagination";
import DjRadioBox from "../child-components/DjRadioBox";
import { mapGetters } from "vuex";
export default {
  name: "DjradioCategory",
  components: {
    CommonNavbar,
    MusicPagination,
    DjRadioBox,
  },
  data() {
    return {
      currentPage: "1",
    };
  },
  computed: {
    ...mapGetters(["newDjRadioOfId", "hotDjRadioOfIdAndPage"]),
  },
  activated() {
    this.$store.dispatch(types.GET_NEW_DJ_RADIO_ACTION, this.$route.query.id);
    this.$store.dispatch(types.GET_HOT_DJ_RADIO_ACTION, {
      id: this.$route.query.id,
      page: this.currentPage,
    });
  },
  watch: {
    $route() {
      this.currentPage = "1";
      this.$store.dispatch(types.GET_NEW_DJ_RADIO_ACTION, this.$route.query.id);
      this.$store.dispatch(types.GET_HOT_DJ_RADIO_ACTION, {
        id: this.$route.query.id,
        page: this.currentPage,
      });
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
      this.$store.dispatch(types.GET_HOT_DJ_RADIO_ACTION, {
        id: this.$route.query.id,
        page: this.currentPage,
      });
    },
  },
};
</script>

<style scoped lang="less">
.new-dj-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 30px;
  .list-item {
    width: 150px;
    display: flex;
    flex-direction: column;
    span {
      padding: 10px 0 2px 0;
    }
    .radio-desc {
      color: #999;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; //块元素显示的文本行数
      -webkit-box-orient: vertical;
    }
    .radio-name {
      color: #333;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.hot-dj-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>