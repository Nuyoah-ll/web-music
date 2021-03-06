import request from "./request";

export function getAlbumListByAreaAndPage(area, page, limit = 35) {
  return request({
    url: "/top/album",
    params: {
      area,
      offset: (page - 1) * limit,
      limit
    }
  })
}

export function getAlbumMusicListById(id) {
  return request({
    url: "/album",
    params: {
      id
    }
  })
}