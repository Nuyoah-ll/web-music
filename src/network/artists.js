import request from "./request";


export function gerTopArtists(limit = 100) {
  return request({
    url: "/top/artists",
    params: {
      limit
    }
  })
}

export function getArtistsRankingByIdAndInitial(id, initial, limit = 100) {
  return request({
    url: "/artist/list",
    params: {
      ...getAreaAndTypeById(id),
      initial,
      limit
    }
  })
}

function getAreaAndTypeById(id) {
  let temp = {};
  switch (id) {
    case "1001":
      temp = { area: 7, type: 1 };
      break;
    case "1002":
      temp = { area: 7, type: 2 };
      break;
    case "1003":
      temp = { area: 7, type: 3 };
      break;
    case "2001":
      temp = { area: 96, type: 1 };
      break;
    case "2002":
      temp = { area: 96, type: 2 };
      break;
    case "2003":
      temp = { area: 96, type: 3 };
      break;
    case "6001":
      temp = { area: 8, type: 1 };
      break;
    case "6002":
      temp = { area: 8, type: 2 };
      break;
    case "6003":
      temp = { area: 8, type: 3 };
      break;
    case "7001":
      temp = { area: 16, type: 1 };
      break;
    case "7002":
      temp = { area: 16, type: 2 };
      break;
    case "7003":
      temp = { area: 16, type: 3 };
      break;
    case "4001":
      temp = { area: 0, type: 1 };
      break;
    case "4002":
      temp = { area: 0, type: 2 };
      break;
    case "4003":
      temp = { area: 0, type: 3 };
      break;
    default:
      return;
  }
  return temp;
}