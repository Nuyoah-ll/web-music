<template>
  <div id="recommend-ranking-list">
    <common-navbar width="688px" height="35px">
      <template v-slot:left>
        <div class="left-insert">
          <div class="icon sprite_02"></div>
          <p class="ranking-list">榜单</p>
        </div>
      </template>
      <template v-slot:right>
        <p>更多></p>
      </template>
    </common-navbar>

    <div class="ranking-content">
      <recommend-sub-ranking-list
        :playlist="$store.state.a.cloudSoaringMusicRanking"
      />
      <recommend-sub-ranking-list
        :playlist="$store.state.a.cloudNewMusicRanking"
      />
      <recommend-sub-ranking-list
        :playlist="$store.state.a.originalMusicRanking"
      />
    </div>
  </div>
</template>

<script>
import CommonNavbar from "components/content/common-navbar/CommonNavbar";
import RecommendSubRankingList from "components/content/recommend-sub-ranking-list/RecommendSubRankingList";

export default {
  name: "RecommendRankingList",
  components: {
    CommonNavbar,
    RecommendSubRankingList,
  },

  created() {},
};
</script>

<style scoped lang="less">
#recommend-ranking-list {
  .icon {
    width: 15px;
    height: 15px;
    margin: 0 15px;
    background-position: -235px -164px;
  }
  .ranking-list {
    font-size: 20px;
    color: #333333;
  }
  .left-insert {
    display: flex;
    align-items: center;
  }

  .ranking-content {
    width: 689px;
    height: 472px;
    margin-top: 20px;
    background: url("~assets/img/recommend-top-bg.png");
    display: flex;
    justify-content: flex-start;
  }
}
</style>