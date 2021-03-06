<template>
  <div
    id="music-list-item"
    @mouseenter="showIcon"
    @mouseleave="hideIcon"
    :class="{ gray: index % 2 === 0 }"
  >
    <div class="ranking">{{ index + 1 }}</div>
    <div class="title">
      <img
        :src="musicInfo.al.picUrl | getTargetSize('50')"
        alt="musicPic"
        v-if="[0, 1, 2].indexOf(index) !== -1"
      />
      <div
        class="sprite_table play"
        @click="play(musicInfo)"
        :class="{ playing: musicInfo.id === getCurrentMusic.id }"
      ></div>
      <div class="music-name">
        <span class="name">{{ musicInfo.name }}</span>
        <span class="come-from" v-if="musicInfo.alia[0]"
          >-({{ musicInfo.alia[0] }})</span
        >
      </div>
      <div class="sprite_table mv" v-if="musicInfo.mv !== 0"></div>
    </div>
    <div class="duration">
      <div v-if="isShow">
        <span class="sprite_table s1"></span>
        <span class="sprite_table s2"></span>
        <span class="sprite_table s3"></span>
        <span class="sprite_table s4"></span>
      </div>
      <p v-else>{{ toMinuteSecond(musicInfo.dt) }}</p>
    </div>
    <div class="author">
      <div>
        <span v-for="(item, index) in musicInfo.ar" :key="item.id">
          {{ index === 0 ? item.name : "/" + item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import { formatMinuteSecond } from "utils/format";
import { mapGetters } from "vuex";
export default {
  name: "MusicListItem",
  components: {},
  props: {
    musicInfo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapGetters(["getCurrentMusic"]),
  },
  methods: {
    showIcon() {
      this.isShow = true;
    },
    hideIcon() {
      this.isShow = false;
    },
    toMinuteSecond(time) {
      return formatMinuteSecond(time);
    },
    play(music) {
      this.$store.dispatch(types.GET_SINGLE_MUSIC_BY_ID_ACTION, {
        id: music.id,
      });
    },
  },
};
</script>

<style scoped lang="less">
#music-list-item {
  display: flex;
  align-items: center;
  div {
    padding: 6px 10px;
  }
  .ranking {
    width: 78px;
    color: #999999;
    text-align: center;
  }
  .title {
    width: 327px;
    color: #333333;
    display: flex;
    align-items: center;
    .play {
      width: 17px;
      height: 17px;
      margin-left: 14px;
      cursor: pointer;
      background-position: 0px -103px;
      &:hover {
        background-position: 0px -128px;
      }
    }
    .playing,.playing:hover{
      background-position: -20px -128px;
    }
    .music-name {
      width: 327px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      .come-from {
        color: #aeaeae;
      }
    }
    .mv {
      width: 24px;
      height: 17px;
      cursor: pointer;
      background-position: 0px -151px;
      &:hover {
        background-position: -30px -151px;
      }
    }
  }
  .duration {
    width: 60px;
    height: 38px;
    margin-right: 15px;
    color: #666666;
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      transform: translateX(-15%);
    }
    span {
      display: inline-block;
      margin-right: 3px;
      cursor: pointer;
    }
    .s1 {
      width: 14px;
      height: 14px;
      background-position: -83px -197px;
      &:hover {
        background-position: -105px -197px;
      }
    }
    .s2 {
      width: 18px;
      height: 16px;
      background-position: 0px -174px;
      &:hover {
        background-position: -20px -174px;
      }
    }
    .s3 {
      width: 16px;
      height: 16px;
      background-position: 0px -195px;
      &:hover {
        background-position: -20px -195px;
      }
    }
    .s4 {
      width: 16px;
      height: 16px;
      background-position: -81px -174px;
      &:hover {
        background-position: -104px -174px;
      }
    }
  }
  .author {
    width: 173px;
    color: #333333;
    display: flex;
    align-items: center;
    div {
      width: 173px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    span {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.gray {
  background-color: #f7f7f7;
}
</style>