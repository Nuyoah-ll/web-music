<template>
  <div id="artists-ranking">
    <common-navbar>
      <template v-slot:left>
        <h1>华语男歌手</h1>
      </template>
    </common-navbar>

    <div class="initail-range">
      <span
        v-for="item in initial"
        :key="item"
        :class="{ active: isActive(item) }"
        @click="changeInitail(item)"
      >
        {{ char(item) }}
      </span>
    </div>

    <div class="ranking-top10">
      <artist-display-frame
        v-for="item in list.slice(0, 10)"
        :key="item.id"
        :artist-info="item"
      />
    </div>
    <div class="ranking-other">
      <artist-display-frame
        v-for="item in list.slice(10)"
        :key="item.id"
        :artist-info="item"
        :show-img="false"
      />
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import CommonNavbar from "components/content/common-navbar/CommonNavbar";
import ArtistDisplayFrame from "components/content/artist-display-frame/ArtistDisplayFrame";
export default {
  name: "ArtistsRanking",
  components: {
    CommonNavbar,
    ArtistDisplayFrame,
  },
  data() {
    return {
      currentId: "",
      currentInitial: undefined,
    };
  },
  computed: {
    // 生成 热门、A-Z、其他对应的initial值
    initial() {
      let arr = [];
      for (let i = 65; i < 91; i++) {
        arr.push(i);
      }
      arr.push(0);
      arr.unshift(-1);
      return arr;
    },
    // 根据initail值返回字符
    char() {
      return (initial) => {
        if (initial === 0) {
          return "其他";
        } else if (initial === -1) {
          return "热门";
        } else {
          return String.fromCharCode(initial);
        }
      };
    },
    isActive() {
      return (item) => {
        if (item === -1) {
          return (
            this.$route.query.initial === item + "" ||
            this.$route.query.initial === undefined
          );
        }
        return this.$route.query.initial === item + "";
      };
    },
    list() {
      return this.$store.getters.getArtistsRankingListByIdAndInitial(
        this.currentId,
        this.currentInitial ? this.currentInitial : "-1"
      );
    },
  },
  activated() {
    this.currentId = this.$route.query.id;
    this.currentInitial = this.$route.query.initial;
    this.$store.dispatch(types.GET_ARTISTS_RANKING_BY_ID_AND_INITIAL_ACTION, {
      id: this.currentId,
      initial: this.currentInitial ? this.currentInitial : "-1",
    });
  },
  methods: {
    changeInitail(initial) {
      let id = this.currentId;
      this.$router.push(`/discovery/artist/cat?id=${id}&initial=${initial}`);
    },
  },
  watch: {
    $route() {
      this.currentId = this.$route.query.id;
      this.currentInitial = this.$route.query.initial;
      console.log(this.currentInitial) ? this.$route.query.initail : undefined;
      this.$store.dispatch(types.GET_ARTISTS_RANKING_BY_ID_AND_INITIAL_ACTION, {
        id: this.currentId,
        initial: this.currentInitial ? this.currentInitial : "-1",
      });
    },
  },
};
</script>

<style scoped lang="less">
.initail-range {
  font-size: 14px;
  color: #333;
  margin: 20px 0;
  display: flex;
  justify-content: space-evenly;
  span {
    padding: 3px 5px;
  }
  .active {
    color: #fff;
    background-color: #c20c0c;
  }
}

.ranking-top10,
.ranking-other {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
}
.ranking-top10{
  padding-bottom: 20px;
  border-bottom: 1px dotted #ccc;
}
.ranking-other{
  padding-top: 10px;
}
</style>