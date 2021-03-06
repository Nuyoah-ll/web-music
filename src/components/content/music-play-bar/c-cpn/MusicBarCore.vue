<template>
  <div id="music-bar-core">
    <!-- 右侧操作按钮 -->
    <div id="music-ctr-icon">
      <span class="playbar_sprite pre" @click="changeMusic(-1)"></span>
      <span
        class="playbar_sprite play-and-pause"
        :class="{ playing: isPlaying }"
        @click="playOrPause"
      ></span>
      <span class="playbar_sprite next" @click="changeMusic(1)"></span>
    </div>

    <!-- 歌曲播放信息 -->
    <div id="music-play-progress">
      <!-- audio标签未设置control属性，不显示原生audio控件 -->
      <audio
        :src="musicUrl(getCurrentMusic.id)"
        ref="audioRef"
        @timeupdate="changeTime"
        @ended="changeMusic(1)"
        autoplay
      >
        您当前所用浏览器暂不支持音频标签，请更换高版本浏览器
      </audio>

      <!-- 歌曲作者头像信息 -->
      <!-- 注意：下面的getTargetSize是一个全局过滤器，将图片的url进行尺寸的过滤。传入字符串是过滤后的大小 -->
      <!-- 下面这个变形缩小主要是因为我没找到网易云默认图片，所以上阿里库找了一个，但是有点偏大，所以我给它缩小一点 -->
      <a href="#" class="avatar">
        <img
          src="~assets/img/default-music-img.png"
          alt="头像"
          style="transform: scale(0.7)"
          v-if="!getCurrentMusic.id"
        />
        <img
          :src="getCurrentMusic.al.picUrl | getTargetSize('34')"
          alt="头像"
          v-else
        />
        <!-- 下面这个div是滤镜图片，需要定位到与a对齐，且大小也一样 -->
        <div class="playbar_sprite cover-img"></div>
      </a>

      <!-- 歌曲名称、歌曲作者以及播放进度 -->
      <div class="other-info">
        <div class="music-name-author" v-if="getCurrentMusic.id">
          <span class="music-name" @click="toMusicDetail(getCurrentMusic.id)">{{
            getCurrentMusic.name
          }}</span>
          <span
            class="playbar_sprite mv"
            v-if="getCurrentMusic.mv !== 0"
          ></span>
          <span
            class="music-author"
            v-for="(item, index) in getCurrentMusic.ar"
            :key="item.id"
          >
            {{ index === 0 ? item.name : "/ " + item.name }}</span
          >
        </div>
        <div class="music-name-author" v-else></div>

        <div class="progress">
          <beautiful-slider
            :value="playProgress"
            @change-current-time="changeCurrentTime"
            @change-show-time="changeShowTime"
          />
          <div class="time" v-if="!getCurrentMusic.id">
            <span class="current-time">00:00</span>
            <span class="total-time">/00:00</span>
          </div>
          <div class="time" v-else>
            <span class="current-time">{{ toMinuteSecond(currentTime) }}</span>
            <span class="total-time">/{{ toMinuteSecond(totalTime) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 左侧操作按钮 -->
    <div id="music-other-control-icon">
      <div class="music-share">
        <span class="playbar_sprite collect"></span>
        <span class="playbar_sprite share"></span>
      </div>
      <span class="playbar_sprite line"></span>
      <div class="list-ctr">
        <span class="playbar_sprite volume"></span>
        <span
          class="playbar_sprite mode"
          :class="{
            loop: mode === 2,
            random: mode === 0,
            listloop: mode === 1,
          }"
          @click="changeMode(mode)"
        ></span>
        <span class="playbar_sprite list" @click="showList">
          <span>{{ getCurrentList.length }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import BeautifulSlider from "./BeautifulSlider";
import { formatMinuteSecond, getMusicSource } from "utils/format";
import { mapGetters } from "vuex";
export default {
  name: "MusicBarCore",
  components: {
    BeautifulSlider,
  },
  props: {
    // currentMusic: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      currentTime: 0,
      isPlaying: false,
      isSlide: false,
      //mode：0 随机播放  1 循环播放  2 单曲循环
      mode: 0,
    };
  },
  computed: {
    ...mapGetters(["getCurrentList", "getCurrentMusic"]),
    // ms
    totalTime() {
      return this.getCurrentMusic.id ? this.getCurrentMusic.dt : 0;
    },
    playProgress() {
      if (this.totalTime === 0) return 0;
      return (this.currentTime / this.totalTime) * 100;
    },
  },
  methods: {
    toMinuteSecond(time) {
      return formatMinuteSecond(time);
    },
    musicUrl(id) {
      return getMusicSource(id);
    },
    playOrPause() {
      if (this.isPlaying) {
        this.$refs.audioRef.pause();
        this.isPlaying = false;
      } else {
        this.$refs.audioRef.play();
        this.isPlaying = true;
      }
    },
    changeTime(e) {
      // ms
      if (!this.isSlide) {
        this.currentTime = e.target.currentTime * 1000;
      }
    },
    changeCurrentTime(progress) {
      this.currentTime = (progress / 100) * this.totalTime;
      this.$refs.audioRef.currentTime = this.currentTime / 1000;
      if (!this.isPlaying) {
        this.$refs.audioRef.play();
        this.isPlaying = true;
      }
    },
    changeShowTime(progress) {
      this.currentTime = (progress / 100) * this.totalTime;
    },
    changeSlide(bool) {
      this.isSlide = bool;
    },
    showList() {
      this.$emit("list-clicked");
    },
    toMusicDetail(id) {
      this.$router.push("/song?id=" + id);
    },
    changeMusic(type) {
      this.$store.commit(types.CHANGE_CURRENT_MUSIC_BY_MODE, {
        mode: this.mode,
        type,
      });
    },
    changeMode(mode) {
      if (mode === 0) this.mode = 1;
      else if (mode === 1) this.mode = 2;
      else this.mode = 0;
    },
  },
  mounted() {
    document
      .querySelector(".el-slider__button")
      .addEventListener("mousedown", (e) => {
        this.changeSlide(true);
      });
    document
      .querySelector(".el-slider__button")
      .addEventListener("mouseup", (e) => {
        this.changeSlide(false);
      });
  },
  watch: {
    getCurrentMusic() {
      this.isPlaying = true;
    },
    currentTime(newV) {
      this.$emit("current-time-changed", newV);
      this.$bus.$emit("change-lyric-position");
    },
  },
};
</script>

<style scoped lang="less">
#music-bar-core {
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > * {
    height: 100%;
  }
}
@import url("./music-ctr-icon.less");
@import url("./music-play-progress.less");
@import url("./music-other-ctr-icon.less");
</style>