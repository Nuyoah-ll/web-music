import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 解决重复点击路由报错的bug
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Discovery = () => import("views/discovery/Discovery");
const Recommend = () => import("views/discovery/child-views/recommend/Recommend");
const Toplist = () => import("views/discovery/child-views/toplist/Toplist");
const Playlist = () => import("views/discovery/child-views/playlist/Playlist");
const Djradio = () => import("views/discovery/child-views/djradio/Djradio");
const DjradioCategory = () => import("views/discovery/child-views/djradio/child-view/DjradioCategory");
const DjradioPreview = () => import("views/discovery/child-views/djradio/child-view/DjradioPreview");
const Artist = () => import("views/discovery/child-views/artist/Artist");
const HotArtists = () => import("views/discovery/child-views/artist/child-views/HotArtists");
const ArtistsRanking = () => import("views/discovery/child-views/artist/child-views/ArtistsRanking");
const Album = () => import("views/discovery/child-views/album/Album");

const Friends = () => import("views/friends/Friends");
const MyMusic = () => import("views/my-music/MyMusic");
const Download = () => import("views/download-app/Download");
const SongDetail = () => import("views/song-detail/SongDetail");

const routes = [
  {
    path: "/",
    redirect: "/discovery"
  },
  {
    path: "/discovery",
    component: Discovery,
    children: [
      {
        path: "/discovery",
        component: Recommend
      },
      {
        path: "/discovery/toplist",
        component: Toplist
      },
      {
        path: "/discovery/playlist",
        component: Playlist
      },
      {
        path: "/discovery/djradio",
        component: Djradio,
        children: [
          {
            path: "/",
            redirect: "/discovery/djradio/preview"
          },
          {
            path: "/discovery/djradio/category",
            component: DjradioCategory
          },
          {
            path: "/discovery/djradio/preview",
            component: DjradioPreview
          }
        ]
      },
      {
        path: "/discovery/artist",
        component: Artist,
        children: [
          {
            path: "/",
            redirect: "/discovery/artist/hot"
          },
          {
            path: "/discovery/artist/hot",
            component: HotArtists
          },
          {
            path: "/discovery/artist/cat",
            component: ArtistsRanking
          }
        ]
      },
      {
        path: "/discovery/album",
        component: Album
      },
    ]
  },
  {
    path: "/friends",
    component: Friends
  },
  {
    path: "/my-music",
    component: MyMusic
  },
  {
    path: "/download",
    component: Download
  },
  {
    path: "/song",
    component: SongDetail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router;