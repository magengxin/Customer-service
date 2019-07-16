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

    <div class="editor-emoji" v-show="isShowEmoji" v-clickoutside="hideEmoji">
      <emoji></emoji>
    </div>
    <editor
      ref="editor"
      id="tinymceEditor"
      :init="tinymceInit"
      v-model="content"
      :key="tinymceFlag"
    ></editor>
    <a-button
      type="primary"
      :disabled="!(user && user.sessionId) || !$store.getters.isSocketRun"
      :style="{position: 'fixed',bottom: '10px',left: '860px'}"
      @click="handleSend"
    >{{$t('text.send')}}</a-button>

    <input
      type="file"
      accept="image/*"
      ref="imageUpload"
      style="display: none"
      v-on:change="upload"
    >
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
      isShowEmoji: false,
      sourceList: [],
      list: [],
      tinymceFlag: 1,
      tinymceInit: {},
      content: "",
      file: null
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
  },
  methods: {
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
    onEditorChange(editor) {
      const searchValue = editor.text.trim();
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
      this.content = txt;
    },
    //发送消息
    handleSend() {
      this.$store.dispatch("requestSend", {
        sessionId: this.user.sessionId,
        message: this.content
      });
      tinymce.activeEditor.setContent("");
    },
    // 插入图片至编辑器
    insertImage(src) {
      tinymce.execCommand("mceInsertContent", false, `<img src=${src}>`);
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
      skin_url: "/tinymce/skins/ui/oxide",
      language_url: `/tinymce/langs/zh_CN.js`,
      language: "zh_CN",
      height: 200,
      browser_spellcheck: true, // 拼写检查
      branding: false, // 去水印
      // elementpath: false,  //禁用编辑器底部的状态栏
      statusbar: false, // 隐藏编辑器底部的状态栏
      paste_data_images: true, // 允许粘贴图像
      menubar: false, // 隐藏最上方menu
      plugins: "autolink paste",
      toolbar: "emoji imageUpload",
      content_css: "/tinymce/emoji.css",
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


