<template>
  <div id="artist">
    <div class="wrap3">
      <div class="artists-category">
        <div
          class="category-item"
          v-for="(item, index) in mock"
          :key="item.area"
        >
          <p>{{ item.areaName }}</p>
          <ul>
            <li
              v-for="iten in item.subCategories"
              :key="iten.name"
              @click="toPage(index, iten.id)"
              :class="{ active: isActive(index, iten.id) }"
            >
              {{ iten.name }}
            </li>
          </ul>
        </div>
      </div>
      <aside>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </aside>
    </div>
  </div>
</template>

<script>
import { artistsCategories } from "assets/mock/index";
export default {
  name: "Artist",
  components: {},
  data() {
    return {
      mock: artistsCategories,
    };
  },
  computed: {
    isActive(index, id) {
      return (index, id) => {
        if (index === 0) return this.$route.path === "/discovery/artist/hot";
        return this.$route.query.id === id + "";
      };
    },
  },
  methods: {
    toPage(index, id) {
      if (index === 0) {
        this.$router.push("/discovery/artist/hot");
      } else {
        this.$router.push(`/discovery/artist/cat?id=${id}`);
      }
    },
  },
};
</script>

<style scoped lang="less">
#artist {
  background-color: #f5f5f5;
  .wrap3 {
    border: 1px solid #d8d8d8;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    .artists-category {
      width: 180px;
      padding: 30px 15px;
      background-color: #f9f9f9;
      border-right: 1px solid #d8d8d8;
      .category-item {
        padding: 15px 0;
        padding-bottom: 0;
        color: #333333;
        border-bottom: 1px solid #d8d8d8;
        p {
          font-size: 16px;
          font-weight: bold;
        }
        ul {
          list-style-type: square;
          list-style-position: inside;
          padding: 10px 0;
          li {
            padding: 5px 10px;
            border: 1px solid transparent;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .active {
            border: 1px solid #d8d8d8;
            background-color: #ffffff;
            color: #c20c0c;
          }
        }
      }
    }

    aside {
      width: 800px;
      padding: 40px;
    }
  }
}
</style>