<template>
  <div id="recommend-hot-recommend">
    <common-navbar width="688px" height="35px">
      <template v-slot:left>
        <div class="left-insert">
          <div class="icon sprite_02"></div>
          <p class="hot-recommend">热门推荐</p>
        </div>
      </template>
      <template v-slot:center>
        <div class="center-inset">
          <span v-for="item in availableLink" :key="item.title">
            <span class="title" @click="toPage(item.url)">{{ item.title }}</span>
            <span class="line">|</span>
          </span>
        </div>
      </template>
      <template v-slot:right>
        <div>
          <p @click="toPage('/discovery/playlist')" class="more">更多></p>
        </div>
      </template>
    </common-navbar>

    <div class="music-display">
      <music-display-frame1 v-for="(item, index) in hotRecommend" :key="index" :musicInfo="item"/>
    </div>
  </div>
</template>

<script>
import CommonNavbar from "components/content/common-navbar/CommonNavbar";
import MusicDisplayFrame1 from "components/content/music-display-frame1/MusicDisplayFrame1";

import { mapGetters } from "vuex";
export default {
  name: "RecommendHotRecommend",
  data() {
    return {
      availableLink: [
        { title: "华语", url: "/discovery/playlist?cat=华语" },
        { title: "流行", url: "/discovery/playlist?cat=流行" },
        { title: "摇滚", url: "/discovery/playlist?cat=摇滚" },
        { title: "民谣", url: "/discovery/playlist?cat=民谣" },
        { title: "电子", url: "/discovery/playlist?cat=电子" },
      ],
    };
  },
  components: {
    CommonNavbar,
    MusicDisplayFrame1,
  },
  computed: {
    ...mapGetters(["hotRecommend"]),
  },
  methods:{
    toPage(url){
      this.$router.push(url);
    }
  }
};
</script>

<style scoped lang="less">
#recommend-hot-recommend {
  .icon {
    width: 15px;
    height: 15px;
    margin: 0 15px;
    background-position: -235px -164px;
  }
  .hot-recommend {
    font-size: 20px;
    color: #333333;
  }
  .left-insert {
    display: flex;
    align-items: center;
  }
  .center-inset {
    margin-left: 15px;
    color: #666;
    .title {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .line {
    margin: 0 15px;
  }
}

.more{
  &:hover{
    text-decoration: underline;
    cursor: pointer;
  }
}

.music-display{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
}
</style>