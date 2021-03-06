<template>
  <div id="main-navbar">
    <div class="wrap">
      <p class="home-logo sprite_01" @click="toLink(0)"></p>
      <ul class="navbar">
        <li
          v-for="(item, index) in navbarItem"
          :key="item.title"
          :class="{ active: $route.path.includes(item.link) }"
          @click="toLink(index)"
        >
          <span>{{ item.title }}</span>
          <div
            class="little-triangle"
            :style="{
              display: $route.path.includes(item.link) ? 'block' : 'none',
            }"
          ></div>
        </li>
        <span class="sprite_01 hot"></span>
      </ul>
      <div class="navbar-right">
        <input
          class="sprite_01"
          type="text"
          :placeholder="placeholderText"
          @focus="inputFocus"
          @blur="inputBlur"
          @input="changeKeywords"
        />
        <search-result :keywords="keywords" :hide="hideSearchResult" />
        <button class="creator-center">创作者中心</button>
        <button class="log-in">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResult from "../search-result/SearchResult";
export default {
  name: "MainNavbar",
  data() {
    return {
      keywords: "",
      navbarItem: [
        {
          link: "/discovery",
          title: "发现音乐",
        },
        {
          link: "/my-music",
          title: "我的音乐",
        },
        {
          link: "/friends",
          title: "朋友",
        },
        {
          link: "https://music.163.com/store/product",
          title: "商城",
        },
        {
          link: "https://music.163.com/st/musician",
          title: "音乐人",
        },
        {
          link: "/download",
          title: "下载客户端",
        },
      ],
      placeholderText: "音乐/视频/电台/用户",
      hideSearchResult: true,
    };
  },
  components: {
    SearchResult,
  },
  methods: {
    toLink(index) {
      if (index === 3 || index === 4) {
        window.open(this.navbarItem[index].link, "_blank");
      } else {
        this.$router.push(this.navbarItem[index].link);
      }
    },
    inputFocus() {
      this.placeholderText = "";
      this.hideSearchResult = false;
    },
    inputBlur() {
      this.placeholderText = "音乐/视频/电台/用户";
      this.hideSearchResult = true;
    },
    changeKeywords(e) {
      this.keywords = e.target.value;
    },
  },
};
</script>

<style scoped lang="less">
#main-navbar {
  // width: 100vw;
  height: 70px;
  background-color: #333333;
  .wrap {
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .home-logo {
      height: 100%;
      width: 157px;
      padding-right: 20px;
      background-position: 0 0;
      cursor: pointer;
    }
    .navbar {
      flex: 1;
      display: flex;
      list-style: none;
      line-height: 70px;
      color: #ccc;
      li {
        padding: 0 19px;
        font-size: 14px;
        height: 100%;
        &:hover {
          background-color: #000;
          cursor: pointer;
        }
        .little-triangle {
          content: "";
          display: block;
          width: 12px;
          height: 6px;
          margin: 0 auto;
          transform: translateY(-6px);
          background: url("~assets/img/sprite_01.png") -226px 0;
        }
      }
      .hot {
        width: 28px;
        height: 19px;
        margin-top: 20px;
        background-position: -190px 0;
      }
    }
    .navbar-right {
      position: relative;
      display: flex;
      align-items: center;
      input.sprite_01 {
        width: 158px;
        height: 32px;
        background-color: white;
        border: none;
        border-radius: 32px;
        outline: none;
        text-indent: 30px;
        background-position: 0 -99px;
      }
      .creator-center {
        width: 90px;
        height: 32px;
        border: 1px solid #4f4f4f;
        color: #cccccc;
        outline: none;
        background-color: transparent;
        border-radius: 32px;
        margin-left: 19px;
        &:hover {
          border: 1px solid #ffffff;
          color: #ffffff;
          cursor: pointer;
        }
      }
      .log-in {
        color: #787878;
        background-color: transparent;
        margin-left: 19px;
        outline: none;
        border: none;
        &:hover {
          border-bottom: 1px solid #787878;
          cursor: pointer;
        }
      }
    }
  }
}

.active {
  background-color: #000;
  color: #fff;
}
</style>