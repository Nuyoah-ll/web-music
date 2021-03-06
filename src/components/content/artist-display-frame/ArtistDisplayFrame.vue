<template>
  <div id="artist-display-frame" :class="{ needMargin: showImg }">
    <div class="artist-img" v-if="showImg">
      <img v-lazy="artistInfo.picUrl + '?param=130y130'" alt="" />
      <span class="cover-img sprite_cover"></span>
    </div>
    <div class="artist-info" :class="{ toRight: showImg }">
      <span class="name">{{ artistInfo.name }}</span>
      <span
        class="homepage-icon sprite_icon2"
        v-if="artistInfo.accountId"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistDisplayFrame",
  components: {},
  props: {
    showImg: {
      type: Boolean,
      default: true,
    },
    artistInfo: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped lang="less">
#artist-display-frame {
  width: 130px;
  &.needMargin {
    margin-top: 20px;
  }
  display: flex;
  flex-direction: column;
  .artist-img {
    width: 130px;
    height: 130px;
    position: relative;
    .cover-img {
      width: 130px;
      height: 130px;
      position: absolute;
      top: 0;
      left: 0;
      background-position: 0 -680px;
    }
  }
  .artist-info {
    display: flex;
    align-items: center;
    margin: 6px 0;
    .name {
      height: 18px;
      line-height: 18px;
      margin-right: 5px;
    }
    .homepage-icon {
      width: 18px;
      height: 18px;
      background-position: 0 -739px;
    }
  }

  .toRight {
    justify-content: space-between;
  }
}
</style>