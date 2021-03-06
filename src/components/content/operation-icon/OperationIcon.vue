<template>
  <div class="operate-icon">
    <div class="play" @click="playList">
      <span class="sprite_button play-left">播放</span>
      <span class="sprite_button play-right"></span>
    </div>
    <div class="collect">
      <span class="sprite_button collect-left">{{ subscribe }}</span>
      <span class="sprite_button collect-right"></span>
    </div>
    <div class="share">
      <span class="sprite_button share-left">{{ share }}</span>
      <span class="sprite_button share-right"></span>
    </div>
    <div class="download">
      <span class="sprite_button download-left">下载</span>
      <span class="sprite_button download-right"></span>
    </div>
    <div class="comment">
      <span class="sprite_button comment-left">{{ comment }}</span>
      <span class="sprite_button comment-right"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "OperateIcon",
  components: {},
  props: {
    subscribe: {
      type: String,
      default: "订阅",
    },
    share: {
      type: String,
      default: "分享",
    },
    comment: {
      type: String,
      default: "评论",
    }
  },
  methods: {
    playList() {
      this.$emit("play");
    },
  },
};
</script>

<style scoped lang="less">
.operate-icon {
  display: flex;
  div {
    margin-right: 10px;
  }
  span {
    height: 31px;
    cursor: pointer;
  }
  .play {
    display: flex;
    align-items: center;
    .play-left {
      width: 65px;
      color: #fff;
      line-height: 31px;
      text-indent: 33px;
      background-position: 0px -633px;
      &:hover {
        background-position: 0px -719px;
      }
      &:active {
        background-position: 0px -805px;
      }
    }
    .play-right {
      width: 32px;
      background-position: 0px -1588px;
      &:hover {
        background-position: -40px -1588px;
      }
      &:active {
        background-position: -80px -1588px;
      }
    }
  }

  .collect {
    display: flex;
    align-items: center;
    .collect-left {
      line-height: 31px;
      text-indent: 28px;
      background-position: 0px -977px;
    }
    .collect-right {
      width: 5px;
      background-position: -245px -1020px;
    }
    &:hover .collect-left {
      background-position: 0px -1063px;
    }

    &:hover .collect-right {
      background-position: -245px -1106px;
    }
  }

  .share {
    display: flex;
    align-items: center;
    .share-left {
      line-height: 31px;
      text-indent: 28px;
      background-position: 0px -1225px;
    }
    .share-right {
      width: 5px;
      background-position: -245px -1020px;
    }
    &:hover .share-left {
      background-position: 0px -1268px;
    }

    &:hover .share-right {
      background-position: -245px -1106px;
    }
  }

  .download {
    display: flex;
    align-items: center;
    .download-left {
      line-height: 31px;
      text-indent: 28px;
      background-position: 0px -2761px;
    }
    .download-right {
      width: 5px;
      background-position: -245px -1020px;
    }
    &:hover .download-left {
      background-position: 0px -2805px;
    }

    &:hover .download-right {
      background-position: -245px -1106px;
    }
  }

  .comment {
    display: flex;
    align-items: center;
    .comment-left {
      line-height: 28px;
      text-indent: 28px;
      background-position: 0px -1465px;
    }
    .comment-right {
      width: 5px;
      background-position: -245px -1020px;
    }
    &:hover .comment-left {
      background-position: 0px -1508px;
    }

    &:hover .comment-right {
      background-position: -245px -1106px;
    }
  }
}
</style>