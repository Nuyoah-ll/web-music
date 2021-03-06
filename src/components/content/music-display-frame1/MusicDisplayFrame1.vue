<template>
  <div id="music-display-frame1" :style="{ width }">
    <div class="image-info">
      <img :src="musicInfo.picUrl || musicInfo.coverImgUrl" />
      <div class="sprite_cover cover-image"></div>
      <div class="cover-info sprite_cover">
        <div>
          <span class="handset-icon sprite_icon"></span>
          <span class="display-num">{{ musicInfo.playCount }}</span>
        </div>
        <div
          class="display-icon sprite_icon"
          @click="playPlaylist(musicInfo.id)"
        ></div>
      </div>
    </div>
    <p :class="{ warp: showAuthor }">{{ musicInfo.name }}</p>
    <div v-if="showAuthor" class="author-info">
      <span>by</span>
      <a href="#">{{ musicInfo.creator.nickname }}</a>
      <img
        v-if="musicInfo.creator.avatarDetail"
        :src="musicInfo.creator.avatarDetail.identityIconUrl"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
export default {
  name: "MusicDisplayFrame1",
  props: {
    width: {
      type: String,
      default: "140px",
    },
    musicInfo: {
      type: Object,
      required: true,
    },
    showAuthor: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  methods: {
    playPlaylist(id) {
      this.$store.dispatch(types.GET_PLAYLIST_MUSIC_LIST_BY_ID_ACTION, { id });
    },
  },
};
</script>

<style scoped lang="less">
#music-display-frame1 {
  font-size: 14px;
  margin-bottom: 30px;
  .image-info {
    width: 140px;
    height: 140px;
    position: relative;
  }
  img {
    width: 140px;
    height: 140px;
  }
  .cover-image {
    width: 140px;
    height: 140px;
    background-position: 0 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  .cover-info {
    height: 27px;
    line-height: 27px;
    padding: 0 7px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-position: 0 -537px;
    color: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .handset-icon {
      display: inline-block;
      width: 17px;
      height: 17px;
      background-position: 0 -22px;
      vertical-align: middle;
    }
    .display-num {
      font-size: 12px;
    }
    .display-icon {
      width: 17px;
      height: 17px;
      background-position: 0 0;
      cursor: pointer;
      &:hover {
        background-position: 0 -60px;
      }
    }
  }
  p {
    margin-top: 10px;
  }
  .warp {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .author-info {
    display: flex;
    align-items: center;
    margin-top: 5px;
    font-size: 12px;
    span {
      color: #999;
      margin-right: 5px;
    }
    a {
      color: #666;
      text-decoration: none;
      max-width: 140px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      &:hover {
        text-decoration: underline;
      }
    }
    img {
      width: 13px;
      height: 13px;
    }
  }
}
</style>