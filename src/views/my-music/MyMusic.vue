<template>
  <div id="my-music">
    <login-button />
  </div>
</template>

<script>
import LoginButton from "components/content/login-button/LoginButton";
export default {
  name: "MyMusic",
  components: {
    LoginButton,
  },
};
</script>

<style scoped>
#my-music {
  width: 980px;
  min-height: 700px;
  height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  background: url("../../assets/img/login/my-music-login.png") center 100px
    no-repeat;
  position: relative;
}
</style>