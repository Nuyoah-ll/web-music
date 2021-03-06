<template>
  <div id="beautiful-slider">
    <slider
      :value="value"
      :show-tooltip="false"
      @change="changeCurrentTime"
      @input="changeShowTime"
    />
  </div>
</template>

<script>
import { Slider } from "element-ui";
export default {
  name: "Beautiful-Slider",
  components: {
    Slider,
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    changeCurrentTime(progress) {
      this.$emit("change-current-time", progress);
    },
    changeShowTime(progress) {
      this.$emit("change-show-time", progress);
    },
  },
};
</script>

<style lang="less">
#beautiful-slider {
  width: 493px;
  .el-slider {
    height: 22px;
    display: flex;
    align-items: center;

    .el-slider__runway {
      height: 10px;
      margin: 0;

      background: url("../../../../assets/img/progress_bar.png") 0px 0px;
      .el-slider__bar {
        height: 10px;
        border-top-left-radius: 7px 4px;
        border-bottom-left-radius: 10px 5px;
        overflow: hidden;
        background: url("../../../../assets/img/progress_bar.png") 0px -66px;
      }
      .el-slider__button {
        width: 22px;
        height: 22px;
        border: none;
        background: url("../../../../assets/img/sprite_icon.png") 0px -250px;
      }
    }
  }
}
</style>