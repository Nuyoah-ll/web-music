<template>
  <div id="recommend">
    <recommend-carousel :banners="banners" />
    <div class="recommend-content wrap3">
      <recommend-left-container />
      <recommend-right-container />
    </div>
  </div>
</template>

<script>
import RecommendCarousel from "./child-components/RecommendCarousel";
import RecommendLeftContainer from "./child-components/RecommendLeftContainer";
import RecommendRightContainer from "./child-components/RecommendRightContainer";

import * as types from "@/store/constant";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Recommend",
  components: {
    RecommendCarousel,
    RecommendLeftContainer,
    RecommendRightContainer,
  },
  computed: {
    ...mapGetters(["banners"]),
  },
  methods: {
    // 为了避免飘红，不用mapActions
    // ...mapActions([types.GET_RECOMMEND_TOP_BANNER_ACTION]),
  },
  created() {
    this.$store.dispatch(types.GET_RECOMMEND_TOP_BANNER_ACTION);
    this.$store.dispatch(types.GET_RECOMMEND_HOT_RECOMMEND_ACTION, 8);
    this.$store.dispatch(types.GET_RECOMMEND_NEW_ALBUM_ACTION, 10);
    this.$store.dispatch(types.GET_RECOMMEND_RANKING_LIST_ACTION,0);
    this.$store.dispatch(types.GET_RECOMMEND_RANKING_LIST_ACTION,2);
    this.$store.dispatch(types.GET_RECOMMEND_RANKING_LIST_ACTION,3);
  },
};
</script>

<style scoped lang="less">
.recommend-content {
  display: flex;
  width: 984px;
  margin: 0 auto;
}
</style>