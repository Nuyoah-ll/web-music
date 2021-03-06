<template>
  <div id="recommend-new-album">
    <common-navbar width="688px" height="35px">
      <template v-slot:left>
        <div class="left-insert">
          <div class="icon sprite_02"></div>
          <p class="new-album">新碟上架</p>
        </div>
      </template>
      <template v-slot:right>
        <p>更多></p>
      </template>
    </common-navbar>

    <div class="wiper-container">
      <div class="inner">
        <div class="left-arrow arrow sprite_02" @click="this.toPre"></div>
        <el-carousel
          indicator-position="none"
          height="150px"
          arrow="never"
          :autoplay="false"
          :interval="5000"
          :loop="true"
          ref="caroucel"
        >
          <el-carousel-item v-for="item in [0, 1]" :key="item">
            <music-display-frame2
              :music-info="iten"
              v-for="iten in handledNewAlbum(item)"
              :key="iten.id"
            />
          </el-carousel-item>
        </el-carousel>
        <div class="right-arrow arrow sprite_02" @click="this.toNext"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonNavbar from "components/content/common-navbar/CommonNavbar";
import MusicDisplayFrame2 from "components/content/music-display-frame1/MusicDisplayFrame2";
import { mapGetters } from "vuex";
export default {
  name: "RecommendNewAlbum",
  components: {
    CommonNavbar,
    MusicDisplayFrame2,
  },
  computed: {
    ...mapGetters(["newAlbum"]),
    handledNewAlbum() {
      return (index) => {
        return this.newAlbum.filter((item, indey, arr) => {
          return index === 0 ? indey < arr.length / 2 : indey >= arr.length / 2;
        });
      };
    },
  },
  methods: {
    toPre() {
      this.$refs.caroucel.prev();
    },
    toNext() {
      this.$refs.caroucel.next();
    },
  },
};
</script>

<style scoped lang="less">
#recommend-new-album {
  .icon {
    width: 15px;
    height: 15px;
    margin: 0 15px;
    background-position: -235px -164px;
  }
  .new-album {
    font-size: 20px;
    color: #333333;
  }
  .left-insert {
    display: flex;
    align-items: center;
  }

  .wiper-container {
    width: 686px;
    height: 186px;
    margin: 20px 0px 37px;
    border: 1px solid rgb(211, 211, 211);
    .inner {
      height: 184px;
      padding: 16px;
      background: rgb(245, 245, 245);
      border: 1px solid rgb(255, 255, 255);
      position: relative;
      .swiper {
        height: 150px;
        background-color: red;
      }
      .arrow {
        width: 17px;
        height: 17px;
        position: absolute;
        cursor: pointer;
      }
      .left-arrow {
        background-position: -260px -75px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        &:hover {
          background-position: -280px -75px;
        }
      }
      .right-arrow {
        background-position: -300px -75px;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        &:hover {
          background-position: -320px -75px;
        }
      }
    }
  }

  .el-carousel__item {
    display: flex;
    justify-content: space-evenly;
    transition: transform 1s linear;
  }
}
</style>