<template>
  <div id="dj-radio-box">
    <img
      v-lazy="djRadioInfo.picUrl + '?param=120y120'"
      alt="djRadioInfo.name"
      class="dj-img"
    />
    <div class="info">
      <h3 class="djr-name">{{ djRadioInfo.name }}</h3>
      <div class="artist">
        <span class="sprite_icon2 user-icon"></span>
        <span class="nickname">{{ djRadioInfo.dj.nickname }}</span>
        <img
          v-if="djRadioInfo.dj.avatarDetail"
          v-lazy="djRadioInfo.dj.avatarDetail.identityIconUrl"
          alt="identity-icon"
        />
      </div>
      <div class="subscribe">
        <span>共{{ djRadioInfo.programCount }}期</span>
        <span>共{{ djRadioInfo.subCount }}次</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DjRadioBox",
  components: {},
  props: {
    djRadioInfo: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped lang="less">
#dj-radio-box {
  margin-left: 20px;
  padding: 20px 0;
  display: flex;
  color: #333;
  border-bottom: 1px solid #ccc;
  .dj-img{
    width: 120px;
    height: 120px;
  }
  .info {
    margin-left:20px;
    .djr-name {
      font-size: 18px;
      margin: 20px 0;
    }
    .artist {
      display: flex;
      margin-bottom: 10px;
      .user-icon {
        width: 14px;
        height: 14px;
        margin-right: 10px;
        background-position: -50px -300px;
      }
      img {
        width: 14px;
        height: 14px;
        margin-left: 5px;
      }
    }
  }
}
</style>