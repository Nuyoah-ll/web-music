import request from "./request";

export function getAllCategory() {
  return request({
    url: "/playlist/catlist"
  })
}

export function getCategoryList(cat, offset, order = "hot") {
  return request({
    url: "/top/playlist",
    params: {
      limit: 35,
      offset,
      cat,
      order
    }
  })
}