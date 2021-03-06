<template>
  <div id="search-result" v-if="!hide">
    <header>
      <span class="s-warp">
        <span>搜"</span>
        <span class="keywords">{{ keywords }}</span>
        <span>"相关用户</span>
        <span class="gt">&gt;</span>
      </span>
    </header>
    <div class="content">
      <!-- 单曲 -->
      <div class="content-item song" v-if="result.songs">
        <div class="left">
          <span class="icon sprite_icon2"></span>
          <span class="name">单曲</span>
        </div>
        <div class="right">
          <p v-for="item in result.songs" :key="item.id">
            <span>{{ item.name }}-</span>
            <span v-for="iten in item.artists" :key="iten.name">
              {{ iten.name }}
            </span>
          </p>
        </div>
      </div>

      <!-- 歌手 -->
      <div class="content-item artist" v-if="result.artists">
        <div class="left">
          <span class="icon sprite_icon2"></span>
          <span class="name">歌手</span>
        </div>
        <div class="right">
          <p v-for="item in result.artists" :key="item.id">
            <span>{{ item.name }}</span>
          </p>
        </div>
      </div>

      <!-- 专辑 -->
      <div class="content-item album" v-if="result.albums">
        <div class="left">
          <span class="icon sprite_icon2"></span>
          <span class="name">专辑</span>
        </div>
        <div class="right">
          <p v-for="item in result.albums" :key="item.id">
            <span>{{ item.name }}-</span>
            <span>{{ item.artist.name }}</span>
          </p>
        </div>
      </div>

      <!-- 歌单 -->
      <div class="content-item playlist" v-if="result.playlists">
        <div class="left">
          <span class="icon sprite_icon2"></span>
          <span class="name">歌单</span>
        </div>
        <div class="right">
          <p v-for="item in result.playlists" :key="item.id">
            <span>{{ item.name }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchSuggestion } from "network/search";
export default {
  name: "SearchResult",
  components: {},
  props: {
    keywords: {
      type: String,
      default: "",
    },
    hide: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      result: {},
    };
  },
  watch: {
    keywords(newV, oldV) {
      if (newV === "") return this.result = {};
      getSearchSuggestion(newV).then((res) => {
        this.result = res.result ? res.result : {};
      });
    },
  },
};
</script>

<style scoped lang="less">
#search-result {
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 100;
  header {
    height: 37px;
    padding: 0 10px;
    line-height: 37px;
    border-bottom: 1px solid #ccc;
    color: #666;
    .s-warp {
      height: 14px;
      line-height: 14px;
      display: inline-flex;
      align-items: center;
      span {
        height: 14px;
        cursor: pointer;
      }
      .keywords {
        display: inline-block;
        max-width: 140px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      &:hover {
        span:not(.gt) {
          background-color: rgb(223, 223, 223);
        }
      }
    }
  }

  .content {
    .content-item {
      display: flex;
      justify-content: space-between;
      .left {
        width: 65px;
        display: flex;
        justify-content: center;
        border-right: 1px solid #ccc;
        padding-top: 15px;
        span {
          height: 15px;
        }
      }
      .right {
        width: 185px;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        p {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          padding: 5px 10px;
          cursor: pointer;
          &:hover {
            background-color: rgb(223, 223, 223);
          }
        }
      }
      &:last-child {
        .right {
          border-bottom: none;
        }
      }
    }
    .song {
      .icon {
        width: 15px;
        background-position: -35px -300px;
      }
    }

    .artist {
      .icon {
        width: 15px;
        background-position: -50px -300px;
      }
    }

    .album {
      .icon {
        width: 15px;
        background-position: -35px -320px;
      }
    }

    .playlist {
      .icon {
        width: 15px;
        background-position: -50px -320px;
      }
    }
  }
}
</style>