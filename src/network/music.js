import request from "./request";

export function getCurrentPlayedMusic(ids) {
  return request({
    url: "/song/detail",
    params: {
      ids
    }
  })
}

export function getCurrentDisplayMusic(ids) {
  return request({
    url: "/song/detail",
    params: {
      ids
    }
  })
}

export function getLyric(id) {
  return request({
    url: "/lyric",
    params: {
      id
    }
  })
}

export function getSimiSong(id) {
  return request({
    url: "/simi/song",
    params: {
      id
    }
  })
}

export function getSimiPlaylist(id) {
  return request({
    url: "/simi/playlist",
    params: {
      id
    }
  })
}

export function getSongRecommend(id, page) {
  return request({
    url: "/comment/music",
    params: {
      id,
      offset: (page - 1) * 20
    }
  })
}