<template>
  <div id="category-item">
    <div class="category-name">
      <img :src="require(`assets/img/category/${categroyName}.png`)" alt="" />
      <h3 class="name">{{ categroyName }}</h3>
    </div>

    <div class="sub-categories">
      <span
        v-for="item in subCategories"
        :key="item.name"
        @click="toThisCat(item.name)"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryItem",
  components: {},
  props: {
    categroyName: {
      type: String,
      require: true,
    },
    subCategories: {
      type: Array,
      require: true,
    },
  },
  methods: {
    toThisCat(cat) {
      this.$router.push(`/discovery/playlist?cat=${cat}`);
      this.$bus.$emit("close-category");
    },
  },
};
</script>

<style scoped lang="less">
#category-item {
  display: flex;
  .category-name {
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 16px;
    margin-left: 26px;
    margin-bottom: 26px;
    .name {
      text-align: center;
      font-size: 12px;
      width: 45px;
    }
  }
  .sub-categories {
    border-left: 1px solid #ccc;
    padding-right: 10px;
    flex-grow: 1;
    line-height: 30px;
    word-break: break-all;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    span {
      margin-left: 10px;
      cursor: pointer;
      &::after {
        content: "|";
        color: #d8d8d8;
        margin-left: 10px;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>