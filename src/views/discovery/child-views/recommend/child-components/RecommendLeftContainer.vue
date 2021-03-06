<template>
  <div id="recommend-left-container" class="wrap2">
    <recommend-hot-recommend />
    <recommend-new-albums/>
    <recommend-ranking-list/>
  </div>
</template>

<script>
import RecommendHotRecommend from "./RecommendHotRecommend";
import RecommendNewAlbums from "./RecommendNewAlbums";
import RecommendRankingList from "./RecommendRankingList";
export default {
  name: "RecommendLeftContainer",
  components: {
    RecommendHotRecommend,
    RecommendNewAlbums,
    RecommendRankingList
  },
};
</script>

<style scoped lang="less">
#recommend-left-container {
  width: 732px;
  padding: 20px 20px 40px;
  border: 1px solid #d3d3d3;
  border-bottom: none;
}
</style>