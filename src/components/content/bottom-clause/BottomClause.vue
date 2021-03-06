<template>
  <div id="bottom-clause">
    <div class="wrap3">
      <div class="left-clause">
        <div class="services-item">
          <a
            :href="item.url"
            v-for="item in buttomLefServicesItem"
            :key="item.title"
          >
            {{ item.title }}<span class="line">|</span>
          </a>
        </div>
        <div class="copyright same">
          <span>网易公司版权所有©1997-2020</span>
          <span>杭州乐读科技有限公司运营：</span>
          <a
            href="https://p1.music.126.net/Mos9LTpl6kYt6YTutA6gjg==/109951164248627501.png"
          >
            浙网文[2018]3506-263号
          </a>
        </div>
        <div class="report-info same">
          <span>违法和不良信息举报电话：0571-89853516</span>
          <span>举报邮箱：</span>
          <a href="mailto:ncm5990@163.com"> ncm5990@163.com </a>
        </div>
        <div class="other-item same">
          <span>粤B2-20090191-18</span>
          <a href="https://beian.miit.gov.cn/#/Integrated/index"
            >工业和信息化部备案管理系统网站</a
          >
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564"
          >
            浙公网安备 33010902002564号
          </a>
        </div>
      </div>

      <div class="right-item">
        <div v-for="(item, index) in bottomRightItem" :key="index">
          <a href="item.url" class="sprite_footer_02" :class="'a' + index"></a>
          <span class="sprite_footer_01" :class="'span' + index"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { buttomLefServicesItem, bottomRightItem } from "common/local-data.js";
export default {
  name: "BottomClause",
  data() {
    return {
      buttomLefServicesItem,
      bottomRightItem,
    };
  },
  components: {},
};
</script>

<style scoped lang="less">
.link() {
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
}
#bottom-clause {
  font-size: 12px;
  height: 173px;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
  .wrap3 {
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left-clause {
      width: 520px;
      padding-top: 15px;
      display: flex;
      flex-direction: column;
      div {
        height: 24px;
      }
      .services-item {
        color: #999;
        a {
          .link();
        }
        .line {
          margin: 0 8px 0 10px;
        }
      }
      .same {
        a {
          .link();
        }
        span:first-child {
          margin-right: 14px;
        }
      }
    }

    .right-item {
      flex: 1;
      display: flex;
      justify-content: space-evenly;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 33px;
        transform: scale(0.5) translateY(-50%);
      }
      a {
        display: block;
        width: 88px;
        height: 88px;
      }
      .a0 {
        background-position: -120px -200px;
      }
      .a1 {
        background-position: 0 0;
      }
      .a2 {
        background-position: -120px -100px;
      }
      .a3 {
        background-position: 0 -200px;
      }
      span {
        display: block;
        width: 100px;
        height: 20px;
        margin-top: 10px;
      }
      .span0 {
        background-position: 0 -200px;
      }
      .span1 {
        background-position: 0 0;
      }
      .span2 {
        background-position: 0 -120px;
      }
      .span3 {
        background-position: 0 -160px;
      }
    }
  }
}
</style>