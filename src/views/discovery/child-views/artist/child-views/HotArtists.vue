<template>
  <div id="hot-artists">
    <common-navbar>
      <template v-slot:left>
        <h1>热门歌手</h1>
      </template>
    </common-navbar>

    <div class="list">
      <artist-display-frame
        v-for="item in $store.state.e.topArtists"
        :key="item.id"
        :artist-info="item"
      />
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import CommonNavbar from "components/content/common-navbar/CommonNavbar";
import ArtistDisplayFrame from "components/content/artist-display-frame/ArtistDisplayFrame";
export default {
  name: "HotArtists",
  components: {
    CommonNavbar,
    ArtistDisplayFrame,
  },
  activated() {
    this.$store.dispatch(types.GET_TOP_ARTISTS_ACTION);
  },
};
</script>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
</style>