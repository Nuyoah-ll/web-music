<template>
  <div id="list-and-lyric-display-box">
    <div class="listbd">
      <img
        v-if="getCurrentMusic.al"
        :src="getCurrentMusic.al.picUrl + '?imageView&blur=40x20'"
        alt=""
      />
    </div>
    <div class="listhd">
      <div class="list">
        <header>
          <h3>播放列表</h3>
          <div class="op">
            <span>收藏全部</span>
            <span @click="clearMusicList">清除</span>
          </div>
        </header>
        <div class="c-list" v-if="getCurrentList.length !== 0">
          <music-list-item
            v-for="item in getCurrentList"
            :key="item.id"
            :music="item"
            :current-music-id="getCurrentMusic.id"
          />
        </div>
      </div>
      <div class="lyric">
        <header>
          <h3>{{ getCurrentMusic.name }}</h3>
        </header>
        <article ref="lyricRef">
          <span
            v-for="(item, index) in getCurrentLyric(getCurrentMusic.id)"
            :key="item[0]"
            :class="{ activeSpan: isActiveSpan(item[0], index) }"
          >
            {{ item[1] }}
          </span>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import { mapGetters } from "vuex";
import MusicListItem from "./MusicListItem";
export default {
  name: "ListAndLyricDisplayBox",
  props: {
    currentTime: {
      type: Number,
      default: 0,
    },
  },
  components: {
    MusicListItem,
  },
  computed: {
    ...mapGetters(["getCurrentList", "getCurrentMusic", "getCurrentLyric"]),
    isActiveSpan() {
      return (startTime, index) => {
        let endTime = this.getCurrentLyric(this.getCurrentMusic.id)[index + 1]
          ? this.getCurrentLyric(this.getCurrentMusic.id)[index + 1][0]
          : 10000000;
        return this.currentTime >= startTime && this.currentTime < endTime;
      };
    },
  },
  mounted() {
    this.$bus.$on("change-lyric-position", () => {
      // 改变歌词的位置
      const activeSpan = document.querySelector(".activeSpan");
      this.$refs.lyricRef.scrollTop = activeSpan ? activeSpan.offsetTop - 150 : 0;
    });
  },
  methods:{
    clearMusicList(){
      this.$store.commit(types.CLEAR_MUSIC_LIST);
    }
  }
};
</script>

<style scoped lang="less">
#list-and-lyric-display-box {
  width: 986px;
  height: 301px;
  color: #fff;
  position: fixed;
  bottom: 47px;
  border-radius: 5px 5px 0 0;
  box-shadow: 7px 0 7px -7px #3d3d3d, -7px 0 7px -7px #3d3d3d;
  .listhd,
  .listbd {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .listbd {
    overflow: hidden;
    img {
      width: 986px;
    }
  }
  .listhd {
    display: flex;
    background-color: #3f3f3f10;
    .list {
      width: 558px;
      border-right: 1px solid #000;
      background-color: #2d2d2dda;
      header {
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .op {
          span {
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          span:first-child {
            margin-right: 20px;
          }
        }
      }
    }
    .lyric {
      flex: 1;
      header {
        text-align: center;
        line-height: 39px;
      }
      article {
        height: 262px;
        padding: 10px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #2d2d2dda;
        span {
          color: #989898;
          text-align: center;
          margin: 10px 0;
          transition: color 1s;
        }
        .activeSpan {
          font-size: 14px;
          color: #fff;
        }
      }
    }
    .c-list,
    article {
      max-height: 262px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 6px;
        background-color: #000;
      }
      &::-webkit-scrollbar-thumb {
        width: 4px;
        border: 1px solid #555;
        border-radius: 3px;
        background-color: #484848;
      }
    }
    header {
      height: 39px;
      background-color: #1d1d1d;
    }
  }
}
</style>