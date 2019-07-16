/**
 * 过滤HTML标签
 */
export function filterHTMLTag(str) {
  let txt = str.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
  txt = txt.replace(/[|]*\n/, '') //去除行尾空格
  txt = txt.replace(/&npsp;/ig, ''); //去掉npsp
  return txt;
}