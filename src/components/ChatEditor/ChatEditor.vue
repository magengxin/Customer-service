<template>
  <div>
    <div class="association">
      <div
        v-for="(item,index) in list"
        :key="index"
        @click="handleOnQuickReply(item.content)"
        class="item"
      >{{item.content}}</div>
    </div>

    <div style="position: absolute;left: 10px;bottom: 10px;z-index: 100;">
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link">
          <a-icon type="setting" style="font-size:20px" />
        </a>
        <a-menu slot="overlay">
          <a-sub-menu :title="$t('text.send')">
            <a-menu-item>
              Enter
              <a-switch
                size="small"
                :checked="!$store.getters.isSendCtrlEnter"
                @change="settingEnter"
              />
            </a-menu-item>
            <a-menu-item>
              Ctrl+Enter
              <a-switch
                size="small"
                defaultChecked
                :checked="$store.getters.isSendCtrlEnter"
                @change="settingCtrlEnter"
              />
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu title="输入">
            <a-menu-item>
              联想
              <a-switch
                size="small"
                :checked="$store.getters.isRelevance"
                @change="settingRelevance"
              />
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-dropdown>
    </div>

    <a-button
      type="primary"
      :disabled="!(user && user.sessionId) || !$store.getters.isSocketRun"
      :style="{position: 'absolute',bottom: '10px',left: '640px',zIndex: 100}"
      @click="handleSend"
    >{{$t('text.send')}}</a-button>

    <div class="editor-emoji" v-show="isShowEmoji" v-clickoutside="hideEmoji">
      <emoji></emoji>
    </div>
    <a-spin :spinning="!(user && user.sessionId) || !$store.getters.isSocketRun" :indicator="indicator" >
      <a-spin :spinning="spinning">
        <editor
          ref="editor"
          id="tinymceEditor"
          :init="tinymceInit"
          v-model="content"
          :key="tinymceFlag"
        ></editor>
      </a-spin>
    </a-spin>

    <input
      type="file"
      accept="image/*"
      ref="imageUpload"
      style="display: none"
      v-on:change="upload"
    />
  </div>
</template>
<script>
import { convertTreeToList } from "@/utils/data";
import { mapGetters } from "vuex";
import { uploadFile } from "@/api/ice";

import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme";
import Editor from "@tinymce/tinymce-vue";

import "tinymce/plugins/autolink";
import "tinymce/plugins/paste";
import "tinymce/plugins/emoticons";
import Emoji from "./Emoji.vue";

export default {
  components: {
    editor: Editor,
    Emoji
  },
  data() {
    return {
      spinning: false,
      isShowEmoji: false,
      sourceList: [],
      list: [],
      tinymceFlag: 1,
      tinymceInit: {},
      content: "",
      file: null,
      isControl: false,
      indicator: <a-icon type="none" spin />
    };
  },
  mounted() {
    this.$on("emit-handlerClick", data => {
      this.$store.dispatch("requestSend", {
        sessionId: this.user.sessionId,
        msgType: "Image",
        message: data.url
      });
      this.hideEmoji();
    });
    this.$on("emit-emoji", html => {
      tinymce.execCommand("mceInsertContent", false, html);
    });
    this.$on("emit-close", () => {
      this.hideEmoji();
    });
    //快捷回复
    this.$root.$on("on-quick-reply", ({ title, image }) => {
      if (title && title.length > 0) {
        tinymce.execCommand("mceInsertContent", false, title);
      }
      if (image && image.length > 0) {
        this.insertImage(image);
      }
    });
  },
  methods: {
    settingEnter(checked) {
      this.$store.dispatch("setSendCtrlEnter", !checked);
    },
    settingCtrlEnter(checked) {
      this.$store.dispatch("setSendCtrlEnter", checked);
    },
    settingRelevance(checked) {
      this.$store.dispatch("setRelevance", checked);
    },
    hideEmoji() {
      this.isShowEmoji = false;
    },
    upload() {
      uploadFile(this.$refs.imageUpload.files[0]).then(res => {
        if (res.code === 0) {
          this.insertImage(res.data.url);
        } else {
          this.$message.error("上传失败");
        }
      });
    },
    onEditorChange() {
      const searchValue = this.content.trim().replace(/<\/?[^>]*>/g, "");
      this.list = [];
      if (searchValue.length === 0) {
        return;
      }
      let i = 0;
      this.sourceList.forEach(e => {
        if (i <= 5 && e.content.indexOf(searchValue) != -1) {
          this.list.push(e);
          i++;
        }
      });
    },
    setSourceList() {
      /**
       * 联想
       */
      //个人快捷回复
      const array1 = convertTreeToList(
        this.privateQuickReply,
        node => {
          return node.type === "Directory";
        },
        node => {
          return node.type === "File";
        }
      );
      //公共快捷回复
      const array2 = convertTreeToList(
        this.quickReply,
        node => {
          return node.type === "Directory";
        },
        node => {
          return node.type === "File";
        }
      );
      this.sourceList = [...array1, ...array2];
    },
    handleOnQuickReply(txt) {
      if (this.$store.getters.isRelevance) {
        this.content = txt;
        this.list = [];
      }
    },
    //发送消息
    handleSend() {
      let content = this.content;
      //是否需要
      content = content.replace(/<\/?[^>](^img)*>/g, "");
      if (content.length === 0) {
        return false;
      }
      //是否需要差分
      if (content.indexOf("data-image") === -1) {
        //不需要
        this.send(content);
      } else {
        let i = content.lastIndexOf("<", content.indexOf("data-image"));
        while (i != -1) {
          if (i > 0) {
            //前置文本
            const txt = content.substring(0, i);
            this.send(txt);
            content = content.substring(i, content.length);
          }
          const image = content.substring(0, content.indexOf(">") + 1);
          this.send(image, "Image");
          content = content.substring(content.indexOf(">") + 1, content.length);
          i = content.lastIndexOf("<", content.indexOf("data-image"));
        }
        if (content.length > 0) {
          this.send(content);
        }
      }

      tinymce.activeEditor.setContent("");
    },
    send(txt, msgType = "Text") {
      this.$store.dispatch("requestSend", {
        sessionId: this.user.sessionId,
        msgType: msgType,
        message:
          msgType === "Text"
            ? txt.replace(/<(?:img|IMG).*?data-text="(.*?)".*?>/g, function(
                e,
                t
              ) {
                return t;
              })
            : txt.replace(/<(?:img|IMG).*?src="(.*?)".*?>/g, function(e, t) {
                return t;
              })
      });
    },
    // 插入图片至编辑器
    insertImage(src) {
      tinymce.execCommand(
        "mceInsertContent",
        false,
        `<img data-image src=${src}>`
      );
    }
  },
  computed: {
    ...mapGetters({
      user: "serviceObjects",
      quickReply: "quickReplyTree",
      privateQuickReply: "privateQuickReplyTree"
    })
  },
  watch: {
    quickReply() {
      this.setSourceList();
    },
    privateQuickReply() {
      this.setSourceList();
    }
  },
  activated() {
    this.tinymceFlag++;
  },
  created() {
    this.setSourceList();
    const that = this;
    this.tinymceInit = {
      skin_url: "tinymce/skins/ui/oxide",
      language_url: `tinymce/langs/zh_CN.js`,
      language: "zh_CN",
      height: 200,
      browser_spellcheck: false, // 拼写检查
      branding: false, // 去水印
      // elementpath: false,  //禁用编辑器底部的状态栏
      statusbar: false, // 隐藏编辑器底部的状态栏
      paste_data_images: true, // 允许粘贴图像
      paste_as_text: true,
      menubar: false, // 隐藏最上方menu
      plugins: "autolink paste",
      toolbar: "emoji imageUpload",
      content_css: "tinymce/emoji/emoji.css",
      importcss_append: true,
      setup: editor => {
        editor.ui.registry.addButton("emoji", {
          tooltip: "表情",
          icon: "emoji",
          onAction: () => {
            that.isShowEmoji = true;
          }
        });

        editor.ui.registry.addButton("imageUpload", {
          // text: '插入图片',
          tooltip: "插入图片",
          icon: "image",
          onAction: () => {
            that.$refs.imageUpload.click();
          }
        });
        editor.shortcuts.add("ctrl+13", "ctrl+enter", function() {
          if (that.$store.getters.isSendCtrlEnter) {
            that.handleSend();
          } else {
            //发送回车
            that.isControl = true;
            tinymce.execCommand("mceInsertContent", false, "<p></p>");
          }
        });
      },
      init_instance_callback: function(editor) {
        editor.on("click", function() {
          that.hideEmoji();
        });
        editor.on("KeyUp", function(e) {
          if (
            e.key === "Enter" &&
            !that.$store.getters.isSendCtrlEnter &&
            !that.isControl
          ) {
            //发送消息
            that.handleSend();
            return false;
          }
          if (e.key === "Control") {
            that.isControl = false;
          }
          that.onEditorChange();
        });
      },
      paste_preprocess: function(plugin, args) {
        //检查图片
        if (args.content.indexOf("img") != -1) {
          that.spinning = true;
          var src = /<img.*?src="(.*?)">/.exec(args.content)[1];
          args.content = "";
          var xhr = new XMLHttpRequest();
          xhr.open("GET", src, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = function() {
            var arrayBufferView = new Uint8Array(this.response);
            var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
            let files = new File([blob], "blob.png", { type: "image/jpeg" });
            uploadFile(files).then(res => {
              if (res.code === 0) {
                that.insertImage(res.data.url);
              } else {
                that.$message.error("上传失败");
              }
              that.spinning = false;
            });
          };
          xhr.send();
        }
      }
    };
  }
};
</script>
<style>
.quill-editor:not(.bubble) .ql-container,
.quill-editor:not(.bubble) .ql-container .ql-editor {
  height: 180px;
  padding-bottom: 2rem;
}
</style>
<style lang="less" scoped>
.autoList {
  .ant-list-item {
    padding: 0px;
  }
}
.editor-emoji {
  position: absolute;
  bottom: 210px;
  height: 250px;
  width: 435px;
  background-color: #fcfcfc;
  border: 1px solid #ccc;
  z-index: 10;
}

.editor-emoji:after {
  content: "";
  position: absolute;
  top: 245px;
  width: 0;
  height: 0;
  border-style: solid dashed dashed;
  border-color: #fff transparent transparent;
  overflow: hidden;
  border-width: 18px;
}
</style>


