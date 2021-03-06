<template>
  <div id="recommend-carousel">
    <div class="block" :style="{ backgroundImage: blurImageUrl }">
      <div class="content">
        <div class="left-arrow arrow" @click="toPre"></div>
        <div class="wrap2">
          <el-carousel
            trigger="click"
            height="283px"
            arrow="never"
            ref="caroucel"
            @change="changeCurrentIndex"
          >
            <el-carousel-item v-for="item in banners" :key="item.scm" @click.native="toSongDetail(item.targetId)">
              <img :src="item.imageUrl" class="banner-images" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="download">
          <div class="download-ic" @click="toDownloadPage"></div>
          <p class="download-text">PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
        <div class="right-arrow arrow" @click="toNext"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendCarousel",
  props: {
    banners: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  components: {},
  computed: {
    blurImageUrl() {
      const url =
        this.banners[this.currentIndex] &&
        this.banners[this.currentIndex].imageUrl + "?imageView&blur=40x20";
      return `url(${url})`;
    },
  },
  methods: {
    changeCurrentIndex(index) {
      this.currentIndex = index;
    },
    toPre() {
      this.$refs.caroucel.prev();
    },
    toNext() {
      this.$refs.caroucel.next();
    },
    toDownloadPage(){
      this.$router.push("/download");
    },
    toSongDetail(id){
      this.$router.push(`/song?id=${id}`);
    }
  },
};
</script>

<style scoped lang="less">
.block {
  // width: 100vw;
  height: 283px;
  .content {
    display: flex;
    width: 984px;
    margin: 0 auto;
    position: relative;
    .banner-images {
      width: 730px;
      height: 283px;
    }
    .arrow {
      width: 37px;
      height: 63px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-image: url("~assets/img/banner_sprite.png");
      cursor: pointer;
    }
    .left-arrow {
      left: -68px;
      background-position: 0 -360px;
      &:hover {
        background-position: 0 -430px;
      }
    }
    .right-arrow {
      left: 1015px;
      background-position: 0 -508px;
      &:hover {
        background-position: 0 -578px;
      }
    }
    .download {
      height: 283px;
      width: 254px;
      position: relative;
      background-image: url("~assets/img/download.png");
      .download-ic {
        width: 215px;
        height: 56px;
        position: absolute;
        top: 185px;
        left: 19px;
        cursor: pointer;
        &:hover {
          background-image: url("~assets/img/download.png");
          background-position: 0 -289px;
        }
      }
      .download-text{
        color:#8d8d8d;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 16px;
        white-space: nowrap;
      }
    }
  }
}
</style>

<style lang="less">
#recommend-carousel {
  .el-carousel {
    cursor: pointer;
  }
  .el-carousel__indicator {
    width: 20px;
    height: 20px;
    .el-carousel__button {
      width: 10px;
      height: 10px;
      background-color: transparent;
      background-image: url("~assets/img/banner_sprite.png");
      background-position: -3px -349px;
      transition: background-position 0s;
      &:hover {
        background-position: -22px -349px;
      }
    }
  }
  .is-active {
    .el-carousel__button {
      background-position: -22px -349px;
    }
  }
}
</style>