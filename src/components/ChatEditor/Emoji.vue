<template>
  <div>
    <a-tabs defaultActiveKey="1" size="small" :tabBarStyle="{margin: '0px'}">
      <a-tab-pane tab="QQ表情" key="1">
        <div class="qq_face">
          <a
            v-for="(name,index) in $store.getters.QQFaceList"
            type="qq"
            :key="index"
            :title="name"
            :class="'face qqface'+$store.getters.QQFaceMap[name]"
            @click="qqOnClick(name)"
          >{{name}}</a>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="符号表情" key="2">
        <div class="emoji_face">
          <a
            v-for="(name,index) in $store.getters.EmojiList"
            type="emoji"
            :key="index"
            :title="name"
            :class="'face emoji'+index"
            @click="emojiOnClick(name)"
          >{{name}}</a>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          自定义表情
          <a-button
            shape="circle"
            icon="setting"
            size="small"
            class="setting"
            @click="isShowModel = true;$parent.$emit('emit-close')"
          />
        </span>
        <div class="hp_face">
          <img
            v-for="(item,index) in $store.getters.customizeList"
            :key="index"
            :src="item.url"
            @click="$parent.$emit('emit-handlerClick', item)"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-modal v-model="isShowModel" :maskClosable="false" title="自定义表情" width="840px" :footer="null">
      <emoji-form />
    </a-modal>
  </div>
</template>
<script>
import EmojiForm from "./EmojiForm";
import { genQQEmoticonHTML, genEmoticonHTML } from "@/utils/emoji";
export default {
  components: {
    EmojiForm
  },
  data() {
    return {
      isShowModel: false,
      MM_EMOTICON_WEB: "_web"
    };
  },
  methods: {
    qqOnClick(name) {
      const num = this.$store.getters.QQFaceMap[name];
      this.$parent.$emit("emit-emoji", genQQEmoticonHTML(name, num));
    },
    emojiOnClick(name) {
      let key = this.$store.getters.QQFaceMap[`<${name}>`];
      if (key) {
        const emoji = this.$store.getters.EmojiCodeMap[key];
        this.$parent.$emit("emit-emoji", genEmoticonHTML(name, emoji, key));
      } else {
        this.qqOnClick(name);
      }
    },
    genEmoticonHTML: function(e, t) {
      var n = this;
      return (
        '<img class="' +
        e +
        '" text="' +
        t +
        (t.indexOf(n.MM_EMOTICON_WEB) > -1 ? "" : n.MM_EMOTICON_WEB) +
        '" src="' +
        n.RES_IMG_PLACEHOLDER +
        '" />'
      );
    },
    htmlDecode(e) {
      return e && 0 != e.length
        ? e
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, "&")
        : "";
    },
    formatHTMLToSend(e) {
      var t = this;
      var n = this;
      var a = this;
      return n
        .htmlDecode(
          n.clearHtmlStr(
            e
              .replace(/<(?:img|IMG).*?text="(.*?)".*?>/g, function(e, t) {
                return t.replace(a.MM_EMOTICON_WEB, "");
              })
              .replace(/<(?:br|BR)\/?>/g, "\n")
          )
        )
        .replace(/<(.*?)>/g, function(e) {
          return t.EmojiCodeMap[t.QQFaceMap[e]] || e;
        });
    },
    transformSpanToImg: function(e) {
      var t = this;
      var n = this;
      return (
        e &&
        e.replace(/<span.*?class="emoji emoji(.*?)"><\/span>/g, function() {
          var e = t.EmojiCodeMap[arguments[1]];
          return n.genEmoticonHTML("emoji emoji" + arguments[1], e || "");
        })
      );
    },
    emoticonFormat: function(e) {
      var t = this;
      var a = this;
      return 0 == e.length
        ? ""
        : ((e = e
            .replace(
              new RegExp("(\\[.+?\\])(?!" + a.MM_EMOTICON_WEB + ")", "g"),
              function(e, a) {
                return t.getEmoticonByText(a) || e;
              }
            )
            .replace(
              new RegExp("&lt;(.+?)&gt;(?!" + a.MM_EMOTICON_WEB + ")", "g"),
              function(e, a) {
                return t.getEmoticonByText("<" + a + ">") || e;
              }
            )),
          (e = t.transformSpanToImg(e)));
    },
    getEmoticonById: function(e) {
      var n = this;
      var t = this.EmojiCodeMap[e];
      return t ? n.genEmoticonHTML("emoji emoji" + e, t) : "";
    },
    getEmoticonByText: function(e) {
      var n = this;
      var t;
      if (e.indexOf("<") > -1) {
        if ((t = this.QQFaceMap[e]))
          return n.genEmoticonHTML("emoji emoji" + t, this.EmojiCodeMap[t]);
      } else if ((t = this.QQFaceMap[e.replace(/\[|\]/g, "")]))
        return n.genEmoticonHTML("qqemoji qqemoji" + t, e);
      return null;
    },
    getTuzkiByMd5: function(e) {
      return this.md52Tuzki[e];
    },
    getMd5ByTuzki: function(e) {
      return this.Tuzki2Md5[e];
    }
  }
};
</script>
<style lang="less" scoped>
.setting {
  margin-left: 5px;
  border: 0;
}

.hp_face {
  overflow: hidden;
  height: 220px;
  overflow-y: scroll;
  padding-left: 10px;
  img {
    width: 50px;
    height: 50px;
    border-bottom: 1px solid #f0f0f0;
    border-right: 1px solid #f0f0f0;
    cursor: pointer;
  }
}
</style>

