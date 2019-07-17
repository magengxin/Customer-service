/**
 * QQ表情转HTML
 * @param {*} name 名称
 * @param {*} num 样式编码
 */
export function genQQEmoticonHTML(name, num) {
  return `<img
            data-type="qq"
            data-text="/${name}"
            title="${name}"
            src="tinymce/emoji/spacer.gif"
            class="qqemoji qqemoji${num}"
          />`
}

/**
 * 符号表情转HTML
 * @param {*} name 名称
 * @param {*} emoji 微信表情
 * @param {*} num 样式编码
 */
export function genEmoticonHTML(name, emoji, num) {
  return `<img
  data-type="emoji"
  data-text="${emoji}"
  title="${name}"
  src="tinymce/emoji/spacer.gif"
  class="emoji emoji${num}"
/>`
}