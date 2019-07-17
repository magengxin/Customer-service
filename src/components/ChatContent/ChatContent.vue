<template>
  <div class="im-chat-main">
    <ul class="chat-viewer" v-viewer="{movable: false,filter:filter}">
      <li
        v-for="(item,index) in data"
        :key="index"
        :class="{'im-chat-mine':(item.sendType=='Agent' || item.sendType=='System')}"
      >
        <!-- 客户 -->
        <div class="im-chat-user" v-if="item.sendType==='Customer'">
          <a-avatar v-if="customerAvatar" size="large" :src="customerAvatar" />
          <a-avatar v-else-if="item.sendName" size="large">{{item.sendName.substring(0,1)}}</a-avatar>
          <a-avatar v-else style="backgroundColor:#87d068" icon="user" size="large" />
          <cite>
            {{item.sendName}}
            <i>{{item.sendTs}}</i>
          </cite>
        </div>
        <!-- 客服/系统 -->
        <div class="im-chat-user" v-else>
          <img size="large" src="@/assets/logo.png" />
          <cite>
            <a-icon v-show="item.isSendSuccess===-1" type="loading" />
            <a-tooltip>
              <template slot="title">{{item.errormsg}}</template>
              <span
                v-show="item.isSendSuccess!=-1 && item.isSendSuccess!=0"
                class="ant-tag ant-tag-pink"
              >发送失败</span>
            </a-tooltip>
            <i>{{item.sendTs}}</i>
            {{item.sendName}}
          </cite>
        </div>
        <!-- 内容 -->
        <div class="im-chat-text">
          <span v-if="item.msgType==='Text'" v-html="format(item.msgContent)"></span>
          <img viewer="1" v-else :src="item.msgContent" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { genQQEmoticonHTML, genEmoticonHTML } from "@/utils/emoji";

export default {
  name: "ChatContent",
  props: {
    data: Array,
    customerAvatar: String
  },
  data() {
    return {
      //匹配QQ表情
      qqReg: null,
      //匹配符号表情
      emojiReg: null,
      emojiMap: null
    };
  },
  methods: {
    format(txt) {
      let that = this;
      // 如果消息中有QQ表情
      txt = txt.replace(this.qqReg, function(e, t) {
        const num = that.$store.getters.QQFaceMap[t];
        return genQQEmoticonHTML(t, num);
      });
      //如果消息中有符号表情
      txt = txt.replace(this.emojiReg, function(e, t) {
        const v = that.emojiMap.get(t);
        return genEmoticonHTML(v.name, t, v.key);
      });
      return txt;
    },
    filter(image) {
      return image.getAttribute('viewer')==='1'
    }
  },
  created() {
    let map = new Map();
    let array = [];
    let qq = [];
    this.$store.getters.EmojiList.forEach(title => {
      const item = {
        name: title,
        key: this.$store.getters.QQFaceMap[`<${title}>`]
      };
      if (item.key) {
        let emoji = this.$store.getters.EmojiCodeMap[item.key];
        array.push(emoji);
        map.set(emoji, item);
      } else {
        qq.push(title);
      }
    });
    this.emojiMap = map;
    this.emojiReg = new RegExp("(" + array.join("|") + ")", "g");

    this.qqReg = new RegExp(
      "/(" +
        this.$store.getters.QQFaceList.join("|") +
        "|" +
        qq.join("|") +
        ")",
      "g"
    );
  }
};
</script>

