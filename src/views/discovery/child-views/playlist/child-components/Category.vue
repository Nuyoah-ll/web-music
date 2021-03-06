<template>
  <div id="category" v-if="categoryInfo" v-show="isShow">
    <div class="content">
      <header class="all">
        <div class="category-btn">
          <div class="left sprite_button" @click="toAllCat">全部风格</div>
          <div class="right sprite_button"></div>
        </div>
      </header>
      <div v-for="(value, key) in categoryInfo.categories" :key="value">
        <category-item
          :categroy-name="value"
          :sub-categories="getSubCategoriesBytype(key)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryItem from "./CategoryItem";
export default {
  name: "Category",
  components: {
    CategoryItem,
  },
  props: {
    categoryInfo: {
      type: Object,
      require: true,
    },
    subCategories: {
      type: Array,
      require: true,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getSubCategoriesBytype() {
      return (type) => {
        return this.subCategories.filter((item) => {
          return item.category === parseInt(type);
        });
      };
    },
  },
  methods:{
    toAllCat(){
      this.$router.push(`/discovery/playlist?cat=全部`)
      this.$bus.$emit("close-category");
    }
  }
};
</script>

<style scoped lang="less">
#category {
  position: absolute;
  width: 700px;
  padding-bottom: 30px;
  border: 1px solid #ccc;
  box-shadow: 0px 5px 10px 1px #ccc;
  background-color: #fff;
  z-index: 999;
  .content {
    .all {
      margin-top: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #ccc;
      .category-btn {
        display: flex;
        margin-left: 20px;
        cursor: pointer;
        .left {
          width: 70px;
          height: 31px;
          line-height: 31px;
          text-indent: 15px;
          background-position: 0px -141px;
        }
        .right {
          width: 8px;
          height: 31px;
          background-position: -245px -182px;
        }
      }
      .category-btn:hover .left {
        background-position: 0px -223px;
      }
      .category-btn:hover .right {
        background-position: -245px -264px;
      }
    }
  }
}

</style>