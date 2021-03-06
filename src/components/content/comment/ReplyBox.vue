<template>
  <div id="reply-box">
    <a href="#" class="user" v-if="beReplied.content">
      {{ beReplied.user.nickname }}
    </a>
    <span class="comment">
      {{ beReplied.content ? "：" + beReplied.content : "该评论已删除" }}
    </span>
  </div>
</template>

<script>
export default {
  name: "ReplyBox",
  components: {},
  props: {
    beReplied: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="less">
#reply-box {
  padding: 8px 19px;
  margin-top: 10px;
  line-height: 20px;
  background: #f4f4f4;
  border: 1px solid #dedede;
  .user {
    color: #0c73c2;
    text-decoration: none;
    &:hover{
      text-decoration: underline;
    }
  }
  .comment {
    color: #666;
  }
}
</style>