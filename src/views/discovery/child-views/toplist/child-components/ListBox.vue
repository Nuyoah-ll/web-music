<template>
  <div
    id="list-box"
    @click="toTargetListById"
    :class="{ selected: isSelected }"
  >
    <img :src="listInfo.coverImgUrl | getTargetSize(40)" alt="" />
    <div class="name-and-update">
      <p>{{ listInfo.name }}</p>
      <p>{{ listInfo.updateFrequency }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListBox",
  components: {},
  props: {
    listInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isSelected() {
      if (this.listInfo.id === 19723756) {
        return (
          this.listInfo.id + "" === this.$route.query.id ||
          !this.$route.query.id
        );
      } else {
        return this.listInfo.id + "" === this.$route.query.id;
      }
    },
  },
  methods: {
    toTargetListById() {
      this.$router.push(`/discovery/toplist?id=${this.listInfo.id}`);
    },
  },
};
</script>

<style scoped lang="less">
#list-box {
  padding: 10px 0 10px 20px;
  display: flex;
  align-items: center;
  width: 240px;
  height: 62px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  &.selected {
    background-color: #e6e6e6;
  }
  .name-and-update {
    height: 40px;
    font-size: 12px;
    margin-left: 10px;
    p:last-of-type {
      margin-top: 12px;
      color: #999;
    }
  }
}
</style>