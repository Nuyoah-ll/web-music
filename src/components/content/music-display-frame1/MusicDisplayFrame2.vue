<template>
  <div id="music-display-frame2">
    <div class="image-info">
      <img v-lazy="musicInfo.picUrl + '?param=100x0'" class="pic-img" />
      <div
        class="sprite_cover cover-image"
        @mouseenter="setDisplayIconShow(true)"
        @mouseleave="setDisplayIconShow(false)"
      ></div>
      <div
        class="display-icon sprite_icon"
        :class="{ isShow: isShow }"
        @mouseenter="setDisplayIconShow(true)"
        @mouseleave="setDisplayIconShow(false)"
        @click="playAlbum(musicInfo.id)"
      ></div>
    </div>
    <img
      src="~assets/img/new-album-shadow.png"
      class="shadow"
      v-if="showShadow"
    />
    <div class="pad" v-else></div>
    <p class="music-name">{{ musicInfo.name }}</p>
    <p class="artist-name">{{ musicInfo.artist.name }}</p>
  </div>
</template>

<script>
import * as types from "store/constant";
export default {
  name: "MusicDisplayFrame2",
  props: {
    musicInfo: {
      type: Object,
      required: true,
    },
    showShadow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  components: {},
  methods: {
    setDisplayIconShow(bool) {
      this.isShow = bool;
    },
    playAlbum(id) {
      this.$store.dispatch(types.GET_ALBUM_MUSIC_LIST_BY_ID_ACTION, { id });
    },
  },
};
</script>

<style scoped lang="less">
#music-display-frame2 {
  margin-top: 10px;
  width: 115px;
  .image-info {
    width: 100px;
    height: 100px;
    position: relative;
  }
  .pic-img {
    width: 100px;
    height: 100px;
  }
  .cover-image {
    width: 115px;
    height: 100px;
    background-position: 0 -570px;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }
  .display-icon {
    width: 22px;
    height: 22px;
    display: none;
    background-position: 0 -85px;
    position: absolute;
    right: 10px;
    bottom: 5px;
    cursor: pointer;
    &:hover {
      background-position: 0 -110px;
    }
  }
  p {
    margin-top: -15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .artist-name {
    font-size: 12px;
    margin-top: 5px;
    color: rgb(102, 102, 102);
  }

  .isShow {
    display: block;
  }

  .pad {
    width: 1;
    height: 22px;
  }
}
</style>