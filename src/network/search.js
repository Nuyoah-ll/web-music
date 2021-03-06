import request from "./request";

export function getSearchSuggestion(keywords){
  return request({
    url:"/search/suggest",
    params:{
      keywords
    }
  })
}