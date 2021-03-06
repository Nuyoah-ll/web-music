<template>
  <div id="recommend-sub-ranking-list" v-if="playlist">
    <div class="head">
      <img :src="playlist.coverImgUrl" class="head-img" />
      <div class="head-info">
        <p>{{ playlist.name }}</p>
        <div class="op-icon">
          <span class="play sprite_02"></span>
          <span class="collect sprite_02"></span>
        </div>
      </div>
    </div>
    <ul class="music" v-if="playlist.tracks">
      <li
        v-for="(item, index) in playlist.tracks.slice(0, 10)"
        :key="item.id"
        @mouseenter="changeShowIndex(index)"
        @mouseleave="initShowIndex"
      >
        <span
          class="music-index"
          :class="{ firstthree: index === 0 || index === 1 || index === 2 }"
          >{{ index + 1 }}
        </span>

        <span class="music-name">{{ item.name }}</span>

        <div
          class="op-icon2"
          :style="{ display: showIndex === index ? 'flex' : 'none' }"
        >
          <div class="play2 sprite_02" @click="playThisMusic(item.id)"></div>
          <div class="add2 sprite_icon2"></div>
          <div class="collect2 sprite_02"></div>
        </div>
      </li>
      <li>查看全部></li>
    </ul>
  </div>
</template>

<script>
import * as types from "store/constant";
export default {
  name: "RecommendSubRankingList",
  components: {},
  props: {
    playlist: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showIndex: -1,
    };
  },
  methods: {
    changeShowIndex(index) {
      this.showIndex = index;
    },
    initShowIndex() {
      this.showIndex = -1;
    },
    playThisMusic(id) {
      console.log(id,"????")
      this.$store.dispatch(types.GET_SINGLE_MUSIC_BY_ID_ACTION, { id });
    },
  },
};
</script>

<style scoped lang="less">
#recommend-sub-ranking-list {
  width: 230px;
}
.head {
  width: 230px;
  height: 120px;
  padding: 20px 0 0 20px;
  .head-img {
    width: 80px;
    height: 80px;
  }

  .head-info {
    display: inline-block;
    width: 116px;
    height: 51px;
    margin: 6px 0 0 10px;
    vertical-align: top;
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    .op-icon {
      .play,
      .collect {
        width: 22px;
        height: 22px;
        margin-top: 10px;
        margin-right: 10px;
        display: inline-block;
        &:hover {
          cursor: pointer;
        }
      }
      .play {
        background-position: -267px -205px;

        &:hover {
          background-position: -267px -235px;
        }
      }
      .collect {
        background-position: -300px -205px;
        &:hover {
          background-position: -300px -235px;
        }
      }
    }
  }
}
.music {
  li {
    width: 230px;
    height: 32px;
    list-style: none;
    line-height: 32px;
    display: flex;
    &:last-child {
      margin-left: 150px;
    }
    .music-index {
      font-size: 16px;
      margin: 0 10px 0 25px;
      width: 30px;
      text-align: center;
    }
    .music-name {
      flex-grow: 1;
      // 宽度如果太大，超过可容纳范围的时候，将鼠标移动到item上，
      // 会将左边的index往右边挤
      width: 50px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .firstthree {
      color: #c10d0c;
    }

    .op-icon2 {
      width: 90px;
      height: 32px;
      justify-content: space-evenly;
      align-items: center;
      .play2 {
        width: 17px;
        height: 17px;
        // background-color: red;
        background-position: -267px -268px;
        &:hover {
          background-position: -267px -288px;
          cursor: pointer;
        }
      }
      .add2 {
        width: 14px;
        height: 17px;
        background-position: 0 -698px;
        &:hover {
          background-position: -22px -698px;
          cursor: pointer;
        }
      }
      .collect2 {
        width: 17px;
        height: 17px;
        background-position: -297px -268px;
        &:hover {
          background-position: -297px -288px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>