<template>
  <div id="djradio">
    <div class="wrap3">
      <nav v-if="categoryList.length" class="cate-list">
        <span
          class="category"
          v-for="item in categoryList"
          :key="item.id"
          @click="toCategoryPage(item.id)"
          :class="{ active: item.id + '' === $route.query.id }"
        >
          <img :src="item.picWebUrl" alt="" />
          <span class="des">{{ item.name }}</span>
        </span>
      </nav>

      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import { mapGetters } from "vuex";
export default {
  name: "Djradio",
  components: {},
  activated() {
    this.$store.dispatch(types.GET_DJRADIO_CATELIST_ACTION);
  },
  computed: {
    ...mapGetters(["categoryList"]),
  },
  methods: {
    toCategoryPage(id) {
      this.$router.push(`/discovery/djradio/category?id=${id}`);
    },
  },
};
</script>

<style scoped lang="less">
#djradio {
  background-color: #f5f5f5;
}
.wrap3 {
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  .cate-list {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    row-gap: 20px;
    text-align: center;
    .category {
      width: 60px;
      height: 70px;
      border: 2px solid transparent;
      overflow: hidden;
      text-decoration: none;
      cursor: pointer;
      &:hover {
        background-color: #f0f0f0;
      }
      img {
        position: relative;
        left: 5px;
      }
      .des {
        color: #888;
      }
    }
    .active {
      border: 2px solid #d35757;
      img {
        position: relative;
        left: -43px;
      }
      .des {
        color: #d35757;
      }
      &:hover {
        background-color: #fff;
      }
    }
  }
}
</style>