export function formatDate(time, fmt) {
  let date = new Date(time);

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

export function formatMonthDay(time) {
  return formatDate(time, "MM月dd日");
}

export function formatMinuteSecond(time) {
  return formatDate(time, "mm:ss");
}

export function getMusicSource(id) {
  if (id === -1) return;
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

export function timestampFormat(timestamp) {
  function padZeroLeft(num) {
    return (String(num).length == 1 ? '0' : '') + num;
  }

  let now = new Date().getTime();  //当前时间戳
  let interval = now - timestamp;  // 参数时间戳与当前时间戳相差秒数
  if (interval < 0) throw new Error("时间戳必须小于当前时间");

  let nowDate = new Date(now); // 当前时间日期对象
  let timeDate = new Date(timestamp);  // 参数时间戳转换成的日期对象


  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  let Y = timeDate.getFullYear();
  let M = timeDate.getMonth() + 1;
  let D = timeDate.getDate();
  let H = timeDate.getHours();
  let m = timeDate.getMinutes();
  let s = timeDate.getSeconds();

  // 一分钟以内
  if (interval < minute) {
    return "刚刚";
  }
  // 一小时前之内
  else if (interval < hour) {
    return Math.floor(interval / minute) + "分钟前";
  }
  // 今天某个时间
  else if (nowDate.getFullYear() === Y && nowDate.getMonth() + 1 === M && nowDate.getDate() === D) {
    return padZeroLeft(H) + ':' + padZeroLeft(m);
  }
  else {
    // 获取昨天这个时间的日期对象
    let yesterdayDate = new Date(now - day);
    // 如果传入的时间戳对应的年月日与昨天对应的年月日一致，则返回：“昨天+mm:ss”
    if (yesterdayDate.getFullYear() === Y && yesterdayDate.getMonth() + 1 === M && yesterdayDate.getDate() === D) {
      return '昨天' + padZeroLeft(H) + ':' + padZeroLeft(m);
    }
    // 今年内某个时间点 
    else if (nowDate.getFullYear() === Y) {
      return padZeroLeft(M) + '月' + padZeroLeft(D) + '日 ' + padZeroLeft(H) + ':' + padZeroLeft(m);
    }
    else {
      return Y + '年' + padZeroLeft(M) + '月' + padZeroLeft(D) + '日 ' + padZeroLeft(H) + ':' + padZeroLeft(m);
    }
  }
}


export function splitLyric(lyric) {
  if (lyric === "") return "";
  let result = lyric.split("[0");
  result.shift();
  result = result.map(item => {
    return item.split("]");
  })
  result.forEach((item, index) => {
    let [minute, second] = item[0].split(":")
    let time = parseInt(minute) * 60 + parseFloat(second);
    item[0] = time * 1000;
  })
  return result;
}

export function uniqueList(list) {
  const map = new Map();
  return list.filter(item => {
    return !map.has(item.id) && map.set(item.id, 0);
  })
}

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}