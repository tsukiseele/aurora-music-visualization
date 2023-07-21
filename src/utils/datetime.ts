//@ts-nocheck
/**
 * 将Date格式化为指定格式
 * new Date().format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * new Date().format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param {String} fmt
 * @returns
 */
export function format(fmt: string = 'yyyy-MM-dd hh:mm:ss') {
  const date = this instanceof Date ? this : new Date(this)
  const o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  }
  for (const k in o) {
    const match = new RegExp(k).exec(fmt)
    fmt = match && match[0] ? fmt.replace(match.toString(), match[0].length == 1 ? o[k] : o[k].toString().padStart(match[0].length, '0')) : fmt
  }
  return fmt
}
