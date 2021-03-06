<template>
  <div id="music-list">
    <header>
      <span class="sprite_table s1"></span>
      <span class="sprite_table s2">标题</span>
      <span class="sprite_table s3">时长</span>
      <span class="sprite_table s4">歌手</span>
    </header>
    <div v-if="$store.getters.toplistDetailById(currentId)">
      <music-list-item
        v-for="(item, index) in $store.getters.toplistDetailById(currentId).list
          .tracks"
        :key="item.id"
        :music-info="item"
        :index = "index"
      />
    </div>
  </div>
</template>

<script>
import MusicListItem from "./MusicListItem";
export default {
  name: "MusicList",
  components: {
    MusicListItem,
  },
  props: {
    currentId: {
      type: String,
      default: "19723756",
    },
  },
};
</script>

<style scoped lang="less">
#music-list {
  border: 1px solid rgb(216, 216, 216);
  margin-bottom: 20px;
  header {
    display: flex;
    span {
      height: 38px;
      line-height: 18px;
      padding: 8px 10px;
      color: #666;
      background-position: 0px 0px;
    }
    .s1 {
      width: 78px;
      border-right: 1px solid rgb(216, 216, 216);
    }
    .s2 {
      width: 327px;
    }
    .s3 {
      width: 91px;
      border-left: 1px solid rgb(216, 216, 216);
      border-right: 1px solid rgb(216, 216, 216);
    }
    .s4 {
      width: 173px;
    }
  }
}
</style>