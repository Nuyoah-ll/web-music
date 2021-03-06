// 入驻歌手模拟数据
export const signedArtists = [
  {
    id: 29879272,
    name: "张惠妹",
    des: "台湾歌手张惠妹",
    imgUrl: "http://p1.music.126.net/p9U80ex1B1ciPFa125xV5A==/5931865232210340.jpg?param=62y62"
  },
  {
    id: 100167517,
    name: "Fine乐团",
    des: "独立音乐人",
    imgUrl: "http://p1.music.126.net/1EN_iqQWU_E3DafzEOh3cA==/3302932937408956.jpg?param=62y62"
  },
  {
    id: 58426904,
    name: "萬曉利",
    des: "名谣歌手，中国现代民谣的代表人物之一",
    imgUrl: "http://p2.music.126.net/ZuktZvjcxpYBjcWC3gmbPg==/19027048718765608.jpg?param=62y62"
  },
  {
    id: 93504818,
    name: "音乐人赵雷",
    des: "名谣歌手",
    imgUrl: "http://p2.music.126.net/v_zYgE9kmAwVGWV2c8hFxA==/7943971513291094.jpg?param=62y62"
  },
  {
    id: 46998208,
    name: "王三溥",
    des: "音乐人",
    imgUrl: "http://p2.music.126.net/6wPGl_ddgAbJTx5kOohcyw==/109951163892302996.jpg?param=62y62"
  },
]

// 热门主播模拟数据
export const hotDj = [
  {
    id: 278438485,
    name: "陈立",
    des: "心理学家、美食家陈立教授",
    imgUrl: "http://p1.music.126.net/H3QxWdf0eUiwmhJvA4vrMQ==/1407374893913311.jpg?param=40y40"
  },
  {
    id: 91239965,
    name: "DJ艳秋",
    des: "著名音乐节目主持人",
    imgUrl: "http://p1.music.126.net/y5-sM7tjnxnu_V9LWKgZlw==/7942872001461517.jpg?param=40y40"
  },
  {
    id: 324314596,
    name: "国家大剧院古典音乐频道",
    des: "国家大剧院古典音乐官方",
    imgUrl: "http://p2.music.126.net/6cc6lgOfQTo6ovNnTHPyJg==/3427177769086282.jpg?param=40y40"
  },
  {
    id: 1611157,
    name: "谢谢收听",
    des: "南京电台主持人王馨",
    imgUrl: "http://p1.music.126.net/xa1Uxrrn4J0pm_PJwkGYvw==/3130309604335651.jpg?param=40y40"
  },
  {
    id: 2313954,
    name: "DJ晓苏",
    des: "独立DJ，CRI环球旅游广播特邀DJ",
    imgUrl: "http://p2.music.126.net/slpd09Tf5Ju82Mv-h8MP4w==/3440371884651965.jpg?param=40y40"
  },
]

// 模拟电台首页，下面要展示的一部分电台分类
export const showedDjCategories = [
  {
    id:"2",
    name:"音乐故事"
  },
  {
    id:"6",
    name:"助眠解压"
  },
  {
    id:"5",
    name:"侃侃而谈"
  },
  {
    id:"3",
    name:"情感调频"
  },
  {
    id:"2001",
    name:"创作翻唱"
  },
  {
    id:"11",
    name:"其他"
  }
]


// 模拟歌手页面数据，artistsCategories表示具体有哪些分类
export const artistsCategories = [
  {
    area: -100,
    areaName: "推荐",
    subCategories: [
      {
        type: -100,
        name: "推荐歌手"
      },
    ]
  },
  {
    area: 7,
    areaName: "华语",
    subCategories: [
      {
        type: 1,
        id: 1001,
        name: "华语男歌手"
      },
      {
        type: 2,
        id: 1002,
        name: "华语女歌手"
      },
      {
        type: 3,
        id: 1003,
        name: "华语组合/乐队"
      }
    ]
  },
  {
    area: 96,
    areaName: "欧美",
    subCategories: [
      {
        type: 1,
        id: 2001,
        name: "欧美男歌手"
      },
      {
        type: 2,
        id: 2002,
        name: "欧美女歌手"
      },
      {
        type: 3,
        id: 2003,
        name: "欧美组合/乐队"
      }
    ]
  },
  {
    area: 8,
    areaName: "日本",
    subCategories: [
      {
        type: 1,
        id: 6001,
        name: "日本男歌手"
      },
      {
        type: 2,
        id: 6002,
        name: "日本女歌手"
      },
      {
        type: 3,
        id: 6003,
        name: "日本组合/乐队"
      }
    ]
  },
  {
    area: 16,

    areaName: "韩国",
    subCategories: [
      {
        type: 1,
        id: 7001,
        name: "韩国男歌手"
      },
      {
        type: 2,
        id: 7002,
        name: "韩国女歌手"
      },
      {
        type: 3,
        id: 7003,
        name: "韩国组合/乐队"
      }
    ]
  },
  {
    area: 0,
    areaName: "其他",
    subCategories: [
      {
        type: 1,
        id: 4001,
        name: "其他男歌手"
      },
      {
        type: 2,
        id: 4002,
        name: "其他女歌手"
      },
      {
        type: 3,
        id: 4003,
        name: "其他组合/乐队"
      }
    ]
  }
]