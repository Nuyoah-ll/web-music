<template>
  <div id="recommend-right-container" class="wrap4">
    <div class="login sprite_02">
      <span>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</span>
      <button class="sprite_02">用户登录</button>
    </div>

    <!-- 入驻歌手 -->
    <div class="signed-artist">
      <!-- 头部标题 -->
      <div class="head">
        <span>入驻歌手</span>
        <span>更多></span>
      </div>

      <!-- 歌手列表 -->
      <div
        class="artist-list"
        v-for="item in signedArtistsMock"
        :key="item.id"
        @click="toUserHome(item.id)"
      >
        <img v-lazy="item.imgUrl" alt="" />
        <div class="des">
          <p>{{ item.name }}</p>
          <p>{{ item.des }}</p>
        </div>
      </div>

      <!-- 加入我们按钮 -->
      <div class="join-us">
        <span class="sprite_button btn-left" @click="joinUs"
          >申请成为网易音乐人</span
        >
        <span class="sprite_button btn-right"></span>
      </div>
    </div>

    <!-- 热门主播 -->
    <div class="hot-dj">
      <!-- 头部标题 -->
      <div class="head">
        <span>热门主播</span>
      </div>

      <!-- 主播列表 -->
      <div class="dj-list" v-for="item in hotDjMock" :key="item.id">
        <img v-lazy="item.imgUrl" alt="" @click="toUserHome(item.id)" />
        <div class="des">
          <p class="dj-name" @click="toUserHome(item.id)">{{ item.name }}</p>
          <p>{{ item.des }}</p>
        </div>
      </div>
    </div>

    <p style="padding:20px 10px;color:#e0e0e0;">入驻歌手和热门主播都是mock数据，但是有这些歌手的id，可以点击跳转到他们的主页</p>
  </div>
</template>

<script>
import { signedArtists, hotDj } from "assets/mock";
export default {
  name: "RecommendRightContainer",
  components: {},
  data() {
    return {
      signedArtistsMock: signedArtists,
      hotDjMock: hotDj,
    };
  },
  methods: {
    joinUs() {
      window.open("https://music.163.com/st/musician", "_blank");
    },
    toUserHome(id) {
      this.$router.push(`/user/home?id=${id}`);
    },
  },
};
</script>

<style scoped lang="less">
#recommend-right-container {
  width: 251px;
  border-right: 1px solid #d3d3d3;
  .login {
    width: 250px;
    height: 126px;
    background-position: 0 0;
    text-align: center;
    span {
      display: inline-block;
      color: #666666;
      padding: 16px 23px;
      line-height: 20px;
    }
    button {
      width: 100px;
      height: 31px;
      color: #fff;
      outline: none;
      border: none;
      margin-top: 5px;
      background-position: 0 -195px;
      cursor: pointer;
      &:hover {
        background-position: -110px -195px;
      }
    }
  }
  .signed-artist {
    padding: 15px;
    .artist-list {
      margin: 20px 0;
      display: flex;
      background-color: #fafafa;
      cursor: pointer;
      &:hover {
        background-color: #e7e7e7;
      }
      img {
        width: 62px;
        height: 62px;
      }
    }

    .join-us {
      width: 220px;
      height: 31px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .btn-left {
        width: 205px;
        height: 31px;
        font-weight: bold;
        line-height: 31px;
        text-align: center;
        background-position: 0 -305px;
      }
      .btn-right {
        width: 5px;
        height: 31px;
        background-position: -245px -346px;
      }
      &:hover {
        .btn-left {
          background-position: 0 -141px;
        }
        .btn-right {
          background-position: -245px -182px;
        }
      }
    }
  }

  .hot-dj {
    padding: 15px;
    img {
      cursor: pointer;
    }
    .dj-list {
      display: flex;
      margin: 10px 0;
    }
  }

  .artist-list,
  .dj-list {
    .des {
      width: 158px;
      padding: 0 10px;
      line-height: 20px;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:first-child {
        color: #333;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        &.dj-name {
          font-size: 12px;
        }
        &:hover {
          text-decoration: underline;
        }
      }
      p:last-child {
        color: #666;
      }
    }
  }

  .head {
    color: rgb(51, 51, 51);
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(204, 204, 204);
    span:first-child {
      font-weight: bold;
    }
  }
}
</style>