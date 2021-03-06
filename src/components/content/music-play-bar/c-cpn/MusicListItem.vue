<template>
  <div
    id="music-list-item"
    @click="play(music)"
    :class="{ playing: currentMusicId === music.id }"
  >
    <span class="sprite_icon play" v-if="currentMusicId === music.id"></span>
    <span class="play" v-else></span>
    <span class="name">{{ music.name }}</span>
    <span class="op-ic" @click.stop="deleteMusic(music)">删除</span>
    <span class="author">
      <span v-for="(item, index) in music.ar" :key="item.id">
        {{ index === 0 ? item.name : "/" + item.name }}
      </span>
    </span>
    <span class="dt">{{ toMinuteAndSecond(music.dt) }}</span>
  </div>
</template>

<script>
import * as types from "store/constant";
import { formatMinuteSecond } from "utils/format";
export default {
  name: "MusicListItem",
  components: {},
  props: {
    music: {
      type: Object,
      required: true,
    },
    currentMusicId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    toMinuteAndSecond(time) {
      return formatMinuteSecond(time);
    },
    play(music) {
      this.$store.commit(types.CHANGE_CURRENT_MUSIC_BY_ID, { id: music.id });
    },
    deleteMusic(music) {
      this.$store.commit(types.DELETE_CURRENT_MUSIC, { id: music.id });
    },
  },
};
</script>
70 105
<style scoped lang="less">
#music-list-item {
  height: 28px;
  background-color: #1d1d1d71;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  cursor: pointer;
  &.playing {
    background-color: #000;
  }
  .play {
    width: 16px;
    height: 16px;
    margin: 0 10px;
    background-position: -20px -60px;
  }
  .name {
    color: #ccc;
    flex: 1;
    text-align: start;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .op-ic {
    width: 45px;
    color: #ccc;
    &:hover{
      text-decoration: underline;
    }
  }
  .author {
    color: #9b9b9b;
    width: 100px;
    padding: 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .dt {
    color: #666;
    width: 50px;
  }
  &:hover {
    background-color: #000;
    .name,
    .op-ic,
    .author,
    .dt {
      color: #fff;
    }
  }
}
</style>