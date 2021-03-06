import request from "./request";

export function getDjRadioCateList() {
  return request({
    url: "/dj/catelist"
  })
}

export function getNewDjRadio(type) {
  return request({
    url: "/dj/recommend/type",
    params: {
      type
    }
  })
}


export function getHotDjRadioByIdAndPage(cateId, page, limit = 22) {
  return request({
    url: "/dj/radio/hot",
    params: {
      cateId,
      offset: (parseInt(page) - 1) * limit,
      limit
    }
  })
}