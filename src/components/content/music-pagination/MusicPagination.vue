<template>
  <div id="music-pagination">
    <pagination
      :page-size="itemPerPage"
      :pager-count="maxPageCount"
      :total="itemCount"
      layout="prev,pager,next"
      prev-text="上一页"
      next-text="下一页"
      @current-change="changePage"
    />
  </div>
</template>

<script>
import { Pagination } from "element-ui";
export default {
  name: "MusicPagination",
  components: {
    Pagination,
  },
  props: {
    itemCount: {
      type: Number,
      default: 1000,
    },
    itemPerPage: {
      type: Number,
      default: 20,
    },
    maxPageCount: {
      type: Number,
      default: 9,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    changePage(page) {
      this.$emit("page-changed", page);
    },
  },
};
</script>

<style lang="less">
#music-pagination {
  display: flex;
  justify-content: center;
  .btn-prev,
  .btn-next {
    width: 69px;
    height: 24px;
    border: 1px solid #ccc;
    span {
      font-size: 12px;
      display: inline-block;
      height: 24px;
      line-height: 24px;
      color: #000;
      position: relative;
    }
  }

  .btn-prev {
    margin-right: 5px;
    background: url("../../../assets/img/sprite_button2.png") 0px -560px no-repeat;
    &:hover {
      background: url("../../../assets/img/sprite_button2.png") 0px -590px no-repeat;
    }
    span {
      left: 10px;
    }
  }
  .btn-next {
    margin-left: 5px;
    background: url("../../../assets/img/sprite_button2.png") -75px -560px
      no-repeat;
    &:hover {
      background: url("../../../assets/img/sprite_button2.png") -75px -590px
        no-repeat;
    }
    span {
      right: 10px;
    }
  }
  .el-pager {
    .number {
      height: 24px;
      border: 1px solid #ccc;
      padding: 0 8px;
      min-width: 0px;
      line-height: 24px;
      font-size: 12px;
      font-weight: normal;
      margin: 0px 1px 0px 2px;
      &:hover {
        color: #000;
        border: 1px solid #000;
      }
    }
    .active {
      color: #fff;
      background: url("../../../assets/img/sprite_button2.png") 0px -650px no-repeat;
      &:hover {
        color: #fff;
        border: 1px solid #ccc;
      }
    }
    .el-icon-more {
      padding: 0;
      min-width: 0px;
      width: 21px;
      &::before {
        content: "...";
      }
    }
    .el-icon-d-arrow-right,
    .el-icon-d-arrow-left {
      min-width: 0px;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>