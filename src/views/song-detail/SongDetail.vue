<template>
  <div id="song-detail">
    <discovery-navbar />
    <div class="wrap3" v-if="music.length !== 0">
      <!-- 歌曲详细页左边部分 -->
      <div class="left">
        <!-- 歌曲的具体信息 -->
        <div class="song">
          <!-- 左边的头像 -->
          <div class="img">
            <div class="song-img sprite_cover">
              <img :src="music.musicInfo.al.picUrl + '?param=130y130'" alt="" />
            </div>
            <a href="" class="outer-link">生成外联播放器</a>
          </div>
          <!-- 右边的歌名、作者、专辑、歌词等 -->
          <div class="song-info">
            <header>
              <!-- 歌曲名称及别名 -->
              <div class="song-name">
                <div class="sm-icon sprite_icon2"></div>
                <div class="detail">
                  <span class="name">{{ music.musicInfo.name }}</span>
                  <span class="al">{{ music.musicInfo.alia[0] }}</span>
                </div>
              </div>
              <!-- 歌曲作者及专辑 -->
              <div class="belong">
                <div class="artist">
                  歌手：
                  <span>{{ music.musicInfo.ar[0].name }}</span>
                </div>
                <div class="album">
                  所属专辑：
                  <span>{{ music.musicInfo.al.name }}</span>
                </div>
              </div>
              <!-- 播放、收藏等按钮 -->
              <operation-icon />
            </header>

            <!-- 歌词 -->
            <div class="lyric" :class="{ fold: isFolded }">
              <p v-for="item in formatLyric(music.lyric)" :key="item[0]">
                {{ item[1] }}
              </p>
            </div>

            <!-- 歌词下面的展开按钮 -->
            <span @click="fold" class="set-fold">{{
              isFolded ? "展开" : "收起"
            }}</span>
          </div>
        </div>

        <!-- 评论头 -->
        <common-navbar>
          <template v-slot:left>
            <h1>评论</h1>
          </template>
          <template v-slot:center>
            <div style="margin: 10px 0 0 20px; color: #666">
              共{{ music.comment.total }}条评论
            </div>
          </template>
        </common-navbar>

        <!-- 热评 -->
        <p class="hot-comment">最热评论</p>
        <comment-box
          v-for="item in music.comment.hotComments"
          :comment-info="item"
          :key="item.commentId"
        />

        <!-- 新评 -->
        <p class="new-comment">最新评论（{{ music.comment.total }}）</p>
        <comment-box
          v-for="item in newComment"
          :comment-info="item"
          :key="item.commentId"
        />

        <music-pagination
          :item-count="music.comment.total"
          :item-per-page="20"
          @page-changed="changePage"
        />
      </div>

      <!-- 歌曲详细页右边部分 -->
      <div class="right">
        <p class="simi-playlist">包含这首歌的歌单</p>
        <simple-display-box
          v-for="item in music.simiPlaylists"
          :name="item.name"
          :author="item.creator.nickname"
          :imgUrl="item.coverImgUrl"
          :imgSize="50"
          :key="item.id"
        />

        <p class="simi-song">相似歌曲</p>
        <div class="simi-songs" v-for="item in music.simiSongs" :key="item.id">
          <div class="info">
            <p class="name">{{ item.name }}</p>
            <div class="author">
              <span v-for="(iten, index) in item.artists" :key="iten.id">
                {{ index === 0 ? iten.name : "/" + iten.name }}
              </span>
            </div>
          </div>
          <span class="play">播放</span>
          <span class="add">添加</span>
        </div>

        <p class="download">网易云音乐多端下载</p>
        <p style="margintop: 20px; color: #999">【略】</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "store/constant";
import DiscoveryNavbar from "views/discovery/child-components/DiscoveryNavbar";
import OperationIcon from "components/content/operation-icon/OperationIcon";
import CommonNavbar from "components/content/common-navbar/CommonNavbar";
import CommentBox from "components/content/comment/CommentBox";
import SimpleDisplayBox from "components/content/simple-display-box/SimpleDisplayBox";
import MusicPagination from "components/content/music-pagination/MusicPagination";
import { splitLyric } from "utils/format.js";
export default {
  name: "SongDetail",
  components: {
    DiscoveryNavbar,
    OperationIcon,
    CommonNavbar,
    CommentBox,
    SimpleDisplayBox,
    MusicPagination,
  },
  data() {
    return {
      isFolded: true,
      currentPage: 1,
    };
  },
  methods: {
    fold() {
      this.isFolded = !this.isFolded;
    },
    formatLyric(l) {
      return splitLyric(l);
    },
    changePage(page) {
      this.currentPage = page;
      this.$store.dispatch(types.GET_NEW_COMMENT_BY_ID_AND_PAGE_ACTION, {
        page: this.currentPage,
        id: this.$route.query.id,
      });
    },
  },
  computed: {
    music() {
      return this.$store.getters.getMusicDetailById(this.$route.query.id);
    },
    newComment() {
      return this.$store.getters.getMusicCommentByIdAndPage(
        this.$route.query.id,
        this.currentPage
      );
    },
  },
  activated() {
    this.$store.dispatch(types.GET_DISPLAY_MUSIC_ACTIONS, {
      id: this.$route.query.id,
      page: 1,
    });
  },
};
</script>


55 24 463
<style scoped lang="less">
#song-detail {
  background-color: #f5f5f5;
  .wrap3 {
    background-color: #fff;
    border: 1px solid rgb(216, 216, 216);
    margin: 0 auto;
    display: flex;
    .left {
      width: 709px;
      width: 260px;
      padding: 30px;
      flex-grow: 1;
      .song {
        display: flex;
        justify-content: space-evenly;
        .img {
          text-align: center;
          .song-img {
            width: 200px;
            height: 200px;
            margin-bottom: 30px;
            background-position: -143px -583px;
            img {
              border-radius: 50%;
              position: relative;
              top: 35px;
            }
          }
        }

        .song-info {
          width: 380px;
          header {
            .song-name {
              display: flex;
              align-items: flex-start;
              .sm-icon {
                width: 54px;
                height: 24px;
                background-position: 0 -463px;
              }
              .detail {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                span:first-child {
                  font-size: 24px;
                  color: #333;
                }
                span:last-child {
                  font-size: 14px;
                  color: #bababa;
                  margin: 3px 0 10px 0;
                }
              }
            }
            .belong {
              div {
                margin: 10px 0;
                color: #999;
              }
              span {
                color: #0c73c2;
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
          .lyric {
            overflow: hidden;
            line-height: 23px;
            color: #333;
            margin-top: 40px;
          }
          .set-fold {
            color: #0c73c2;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .fold {
            max-height: 327px;
          }
        }
      }
    }
    .right {
      width: 270px;
      padding: 30px;
      border-left: 1px solid rgb(216, 216, 216);
      .simi-songs {
        display: flex;
        align-items: center;
        margin: 10px 0;
        .info {
          width: 156px;
          padding-right: 10px;
          line-height: 20px;
          .name {
            color: #333;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .author {
            color: #666;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .play,
        .add {
          color: #999;
          cursor: pointer;
          &:hover {
            color: #666;
          }
        }
        .play {
          margin-right: 5px;
        }
      }
    }
    .hot-comment,
    .new-comment,
    .simi-playlist,
    .simi-song,
    .download {
      font-weight: bold;
      margin-top: 20px;
      padding-bottom: 5px;
      border-bottom: 1px solid #cfcfcf;
    }
  }
}
</style>