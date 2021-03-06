<template>
  <div id="login-button">
    <div class="sprite_button left">立即登录</div>
    <div class="sprite_button right"></div>
  </div>
</template>

<script>
export default {
  name: "LoginButton",
  components: {},
};
</script>

<style scoped lang="less">
#login-button {
  display: flex;
  color: #fff;
  font-size: 20px;
  line-height: 35px;
  text-align: center;
  position: absolute;
  top: 300px;
  right: 250px;
  cursor: pointer;
  .left {
    width: 130px;
    height: 35px;
    background-position: 0px -1650px;
  }
  .right {
    width: 5px;
    height: 35px;
    background-position: -245px -1690px;
  }
  &:hover {
    .left {
      background-position: 0px -1730px;
    }
    .right {
      background-position: -246px -1730px;
    }
  }
}
</style>