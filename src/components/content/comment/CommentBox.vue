<template>
  <div id="comment-box">
    <img :src="commentInfo.user.avatarUrl | getTargetSize('50')" alt="" />
    <div class="content">
      <div class="comment">
        <div class="user">
          <span class="nickname">{{ commentInfo.user.nickname }}</span>
          <img
            v-if="vipLevel !== 0"
            :src="require(`assets/img/vip/${vipLevel}.png`)"
            alt="vip等级"
            class="vip"
          />
        </div>
        <article>：{{ commentInfo.content }}</article>
      </div>
      <div class="reply" v-if="commentInfo.beReplied.length !== 0">
        <reply-box :be-replied="commentInfo.beReplied[0]" />
      </div>
      <div class="content-bottom">
        <span class="publish-date">{{
          commentInfo.time | changeTimeFormat
        }}</span>
        <div class="star-and-reply">
          <span class="sprite_icon2 star-icon"></span>
          <span class="star-count" v-if="commentInfo.likedCount !== 0"
            >({{ commentInfo.likedCount }})</span
          >
          <span class="reply">回复</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReplyBox from "./ReplyBox";
import { timestampFormat } from "utils/format";
export default {
  name: "CommentBox",
  components: {
    ReplyBox,
  },
  props: {
    commentInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    vipLevel() {
      return this.commentInfo.user.vipRights
        ? this.commentInfo.user.vipRights.redVipLevel
        : 0;
    },
  },
  filters: {
    changeTimeFormat(time) {
      return timestampFormat(time);
    },
  },
};
</script>

<style scoped lang="less">
#comment-box {
  padding: 15px 0;
  display: flex;
  border-top: 1px dotted #ccc;
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .content {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    .comment {
      .user {
        float: left;
        transform: translateY(4px);
        .nickname {
          color: #0c73c2;
          &:hover {
            text-decoration: underline;
          }
        }
        .vip {
          width: 35px;
          height: 12px;
          margin: 0 5px;
          vertical-align: top;
        }
      }
      article {
        line-height: 20px;
      }
    }
  }

  .content-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .publish-date {
      color: #999999;
    }
    .star-and-reply {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .star-icon {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        background-position: -37px -679px;
        cursor: pointer;
      }
      .star-count{
        margin-right: 5px;
      }
      .reply{
        border-left: 2px solid #cccccc;
        padding-left: 5px;
      }
    }
  }
}
</style>