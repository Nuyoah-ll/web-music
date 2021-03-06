<template>
  <div id="download">
    <header>
      <div class="wrap download">
        <p>
          <span class="download-icon"></span>
          <span>其他操作系统客户端</span>
        </p>
        <div class="pc-and-mobile">
          <div class="pc">
            <h3>在电脑上听</h3>
            <img
              src="http://p1.music.126.net/PGNd0EAtUgA7iRCWXPnUuA==/109951164207162781.png?param=557x0"
              alt=""
            />
            <div class="ops">
              <img
                src="http://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/icon_mac_black_new.bbaa33f484108e702bc365c250b74e79.png"
                alt=""
                style="height: 44px"
              />
              <span class="download-icon window"></span>
              <span class="ops-name">Window</span>
            </div>
            <button class="download-btn download-pc">下载电脑端</button>
          </div>
          <div class="mobile">
            <h3>在手机上听</h3>
            <img
              src="http://p1.music.126.net/sLtya87wVHWn-HWJ33oN4g==/109951164207180884.png?param=300x0"
              alt=""
            />
            <div class="ops">
              <img
                src="http://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/icon_iphone_black_new.3c51a3730124d2d8d662aa4393572914.png"
                alt=""
                style="height: 44px"
              />
              <span class="download-icon android"></span>
              <span class="ops-name">Android</span>
            </div>
            <button class="download-btn download-mobile">下载手机端</button>
          </div>
        </div>
      </div>
    </header>
    <div class="content">
      <div v-for="(item, index) in mock" :key="item.title" class="content-wrap">
        <div v-if="index % 2 === 1" class="img-wrap">
          <img :src="item.imgUrl" :alt="item.title" />
        </div>
        <div class="info">
          <h2 class="title">{{ item.title }}</h2>
          <p class="content">{{ item.content }}</p>
        </div>
        <div v-if="index % 2 === 0" class="img-wrap">
          <img :src="item.imgUrl" :alt="item.title" />
        </div>
      </div>
    </div>

    <aside class="qr-code">
      <img
        src="http://p1.music.126.net/wCRnpjXHpGRiq1c1uCkIFQ==/109951164246717547.png"
        alt=""
      />
      <span>扫描二维码下载</span>
    </aside>
  </div>
</template>

<script>
export default {
  name: "DownLoad",
  components: {},
  data() {
    return {
      mock: [
        {
          title: "千万曲库 首首CD音质",
          content:
            "囊括百万无损SQ音乐，你在用手机听歌时，也能感受到纤毫毕现的CD音质，更能免费离线收听",
          imgUrl:
            "http://p1.music.126.net/KP4aN9umGMNnCS8iCgiV9w==/109951164206415504.jpg",
        },
        {
          title: "千位明星 亲自推荐音乐",
          content:
            "韩红，戴佩妮等千位明星已入驻，亲自创建私房歌单，录制独家DJ节目，推荐他们心中的好音乐",
          imgUrl:
            "http://p1.music.126.net/rpwYXqZt_UpO_de46JyYwQ==/109951164488922626.jpg",
        },
        {
          title: "社交关系 发现全新音乐",
          content:
            "你可以关注明星、DJ和好友，通过浏览他们的动态、收藏和分享，发现更多全新好音乐",
          imgUrl:
            "http://p1.music.126.net/9CQFSDAZN7TcOWz7UNEqmQ==/109951164488924083.jpg",
        },
        {
          title: "手机电脑 歌单实时同步",
          content:
            "只要一个帐号，你就可以同步在手机、电脑上创建、收藏的歌单，随时随地畅享好音乐",
          imgUrl:
            "http://p1.music.126.net/IZIgZjpBv9WkyMZ53i043w==/109951164206417003.jpg",
        },
        {
          title: "听歌识曲 助你疯狂猜歌",
          content:
            "歌曲很动听却不知道歌名，歌名在嘴边却想不起来……用听歌识曲功能，几秒钟就知道歌名",
          imgUrl:
            "http://p1.music.126.net/MGGp3L7AerIVlskMkAk1HA==/109951164488904737.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
#download {
  color: #fff;
  header {
    height: 770px;
    background-color: #161616;
    .download {
      height: 100%;
      margin: 0 auto;
      p {
        height: 60px;
        font-size: 14px;
        font-weight: bold;
        line-height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span:first-child {
          width: 21px;
          height: 21px;
          margin-right: 5px;
          background-position: 0 -3px;
        }
        &:hover {
          color: rgb(129, 129, 129);
          span:first-child {
            background-position: -21px -3px;
          }
        }
      }
      .pc-and-mobile {
        height: 85%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h3 {
          font-size: 22px;
          text-align: center;
          margin-bottom: 33px;
        }
        .ops {
          height: 85px;
          display: flex;
          justify-content: center;
          align-items: center;
          .ops-name {
            font-size: 16px;
            color: #eee;
          }
          .window,
          .android {
            width: 25px;
            height: 25px;
            margin-left: 30px;
            margin-right: 10px;
          }
          .window {
            background-position: -163px 0;
          }
          .android {
            background-position: -189px 0;
          }
        }
        .download-btn {
          width: 300px;
          height: 65px;
          border-radius: 65px;
          background-color: #fff;
          color: #d10000;
          font-size: 22px;
          line-height: 65px;
          text-align: center;
          outline: none;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          &:hover {
            background-color: #ccc;
          }
        }
      }
    }
  }

  .content {
    .content-wrap {
      height: 438px;
      border-bottom: 1px solid #e3e3e3;
      display: flex;
      align-items: center;
      justify-content: center;
      &:nth-child(2n) {
        background-color: #f8f8f8;
      }
      .info {
        display: flex;
        flex-direction: column;
        width: 480px;
        .title {
          color: #000;
          font-weight: normal;
          font-size: 40px;
        }
        .content {
          width: 390px;
          margin-top: 20px;
          font-size: 16px;
          color: #666;
        }
      }
      .img-wrap{
        width: 480px;
      }
    }
  }

  .qr-code {
    width: 136px;
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 20px 0 10px 0;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    img {
      width: 100px;
    }
    span {
      margin-top: 15px;
      color: #333333;
    }
  }
}
</style>