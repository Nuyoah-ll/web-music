<template>
  <div id="app">
    <main-navbar />
    <div class="red-line"></div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <bottom-clause />
    <music-play-bar />
  </div>
</template>

<script>
import MainNavbar from "components/content/main-navbar/MainNavbar";
import BottomClause from "components/content/bottom-clause/BottomClause";
import MusicPlayBar from "components/content/music-play-bar/MusicPlayBar";
export default {
  name: "App",
  components: {
    MainNavbar,
    BottomClause,
    MusicPlayBar,
  },
};
</script>

<style scoped>
@import "./assets/css/base.css"; /* @import url("./assets/css/normalize.css"); */
.red-line{
  height: 5px;
  background-color: #C20C0C;
}
</style>
