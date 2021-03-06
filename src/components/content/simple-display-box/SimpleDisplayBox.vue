<template>
  <div id="simple-display-box">
    <img :src="imgUrl + `?param=${imgSize}y${imgSize}`" alt="" />
    <div class="info">
      <p class="name">{{ name }}</p>
      <p class="author">
        <span>by</span>
        <span>{{ author }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleDisplayBox",
  components: {},
  props: {
    imgUrl: {
      type: String,
      require: true,
    },
    imgSize: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
  },
};
</script>

<style scoped lang="less">
#simple-display-box{
  display: flex;
  margin: 10px 0;
  .info{
    overflow: hidden;
    margin-left: 10px;
    .name{
      font-size: 14px;
      padding: 5px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .author{
      span:first-child{
        color: #999;
      }
      span:last-child{
        color: #666;
      }
    }
  }
}
</style>