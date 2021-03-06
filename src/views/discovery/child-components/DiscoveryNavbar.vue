<template>
  <div id="discovery-navbar">
    <div class="wrap">
      <ul>
        <li v-for="(item, index) in navbarItem" :key="item.title">
          <span
            :class="{
              active: isActive(index),
            }"
            @click="toLink(index)"
          >
            {{ item.title }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiscoveryNavbar",
  data() {
    return {
      navbarItem: [
        {
          title: "推荐",
          link: "/discovery",
        },
        {
          title: "排行榜",
          link: "/discovery/toplist",
        },
        {
          title: "歌单",
          link: "/discovery/playlist",
        },
        {
          title: "主播电台",
          link: "/discovery/djradio",
        },
        {
          title: "歌手",
          link: "/discovery/artist",
        },
        {
          title: "新碟上架",
          link: "/discovery/album",
        },
      ],
      currentIndex: 0,
    };
  },
  components: {},
  methods: {
    toLink(index) {
      this.$router.push(this.navbarItem[index].link);
      this.currentIndex = index;
    },
  },
  computed: {
    isActive() {
      return (index) => {
        if (index === 0)
          return this.navbarItem[index].link === this.$route.path;
        return this.$route.path.includes(this.navbarItem[index].link);
      };
    },
  },
};
</script>

<style scoped lang="less">
#discovery-navbar {
  height: 35px;
  box-sizing: border-box;
  background-color: #c20c0c;
  border-bottom: 1px solid #a40011;
  .wrap {
    margin: 0 auto;
    ul {
      padding-left: 180px;
      list-style: none;
      display: flex;
      li {
        width: 84px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        color: white;
        span:hover {
          cursor: pointer;
          .active();
        }
      }
    }
  }
}

.active {
  background-color: #9b0909;
  padding: 4px 13px;
  border-radius: 20px;
}
</style>