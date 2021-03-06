<template>
  <div id="list-abstract">
    <div class="list-img">
      <img :src="listInfo.coverImgUrl | getTargetSize(150)" alt="" />
      <span class="sprite_cover cover-img"></span>
    </div>
    <div class="list-info">
      <h2>{{ listInfo.name }}</h2>
      <div class="latest-update">
        <span>最近更新： {{ toMonthDay(listInfo.updateTime) }}</span>
        <span>（{{ listInfo.updateFrequency }}这个接口里没有该数字）</span>
      </div>
      <operation-icon
        @play="playThisList(listInfo.id)"
        :subscribe="listInfo.subscribedCount + ''"
        :share="listInfo.shareCount + ''"
        :comment="listInfo.commentCount + ''"
      />
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import { formatMonthDay } from "utils/format";
import OperationIcon from "components/content/operation-icon/OperationIcon";
export default {
  name: "ListAbstract",
  components: {
    OperationIcon,
  },
  props: {
    listInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toMonthDay(time) {
      return formatMonthDay(time);
    },
    playThisList(id) {
      this.$store.dispatch(types.GET_PLAYLIST_MUSIC_LIST_BY_ID_ACTION, {
        id,
        noslice: true,
      });
    },
  },
};
</script>

<style scoped lang="less">
#list-abstract {
  width: 740px;
  height: 238px;
  padding: 40px 0;
  display: flex;
  align-items: center;
  .list-img {
    width: 150px;
    height: 150px;
    position: relative;
    .cover-img {
      width: 208px;
      height: 208px;
      transform: scale(0.72);
      position: absolute;
      top: -29px;
      left: -29px;
      background-position: 0px -1285px;
    }
  }

  .list-info {
    height: 114px;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h2 {
      font-size: 20px;
      font-weight: normal;
    }
    .latest-update {
      height: 16px;
      color: #999;
      margin-bottom: 25px;
      text-indent: 20px;
      background: url("../../../../../assets/img/timer-icon.png") 0px -1px no-repeat;
      span:first-of-type {
        color: #666;
      }
    }
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
  }
}
</style>