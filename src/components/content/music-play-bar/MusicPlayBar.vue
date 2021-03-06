<template>
  <div
    id="music-play-bar"
    class="playbar_sprite"
    :class="{ hide: !isLocked && !isShow }"
  >
    <div class="music-lock playbar_sprite">
      <span
        class="lock playbar_sprite"
        :class="{ locking: isLocked }"
        @click="lock"
      ></span>
    </div>
    <div class="wrap3">
      <music-bar-core
        @list-clicked="showList"
        @current-time-changed="changeCurrentTime"
      />
      <list-and-lyric-display-box v-show="isShow" :current-time="currentTime"/>
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import MusicBarCore from "./c-cpn/MusicBarCore";
import ListAndLyricDisplayBox from "./c-cpn/ListAndLyricDisplayBox";
import { mapGetters } from "vuex";
export default {
  name: "MusicPlayBar",
  components: {
    MusicBarCore,
    ListAndLyricDisplayBox,
  },
  computed: {
    ...mapGetters(["getCurrentList", "getCurrentMusic"]),
  },
  data() {
    return {
      isShow: false,
      isLocked: true,
      currentTime: 0,
    };
  },
  methods: {
    showList() {
      this.isShow = !this.isShow;
    },
    lock() {
      this.isLocked = !this.isLocked;
    },
    changeCurrentTime(newTime) {
      this.currentTime = newTime;
    },
  },
  watch: {
    "$store.state.h.currentMusic": function (newV, oldV) {
      // 为什么要重新加载，是为了能够使得单曲循环的时候，播放完毕之后再次重新播放
      this.$children[0].$refs.audioRef.load();
      this.$store.dispatch(types.GET_LYRIC_ACTION, newV.id);
    },
  },
};
</script>

<style scoped lang="less">
#music-play-bar {
  position: fixed;
  z-index: 99;
  bottom: 0;
  width: 100%;
  height: 53px;
  background-position: 0 0;
  transition: bottom 500ms;
  &.hide {
    bottom: -45px;
  }
  &:hover {
    bottom: 0;
  }
  .music-lock {
    width: 67px;
    height: 83px;
    position: absolute;
    top: -9px;
    right: 0;
    background-position: 0 -385px;
    .lock {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-position: -82px -383px;
      transform: translate(18px, 2px);
      cursor: pointer;
      &:hover {
        background-position: -82px -403px;
      }
    }

    .locking {
      background-position: -102px -383px;
      &:hover {
        background-position: -102px -403px;
      }
    }
  }
  .wrap3 {
    color: white;
    height: 100%;
    margin: 0 auto;
  }
}
</style>





 