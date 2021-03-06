import request from "./request";

export function getAllToplist() {
  return request({
    url: "/toplist"
  })
}

export function getToplistDetailById(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  })
}

export function getSongDetailById(ids) {
  return request({
    url: "/song/detail",
    params: {
      ids
    }
  })
}

export function getLatestComment(id, page) {
  let offset = (page - 1) * 20;
  return request({
    url: "/comment/playlist",
    params: {
      id,
      offset
    }
  })
}