<template>
  <div id="common-navbar" :style="{ height, width }">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "CommonNavbar",
  props: {
    width: {
      type: String,
    },
    height: {
      type: String,
    },
  },
  components: {},
};
</script>

<style scoped>
#common-navbar {
  border-bottom: 2px solid #c10d0c;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.center{
  flex: 1;
}
</style>