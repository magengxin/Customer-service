<template>
  <a-spin :spinning="spinning">
    <a-upload
      listType="picture-card"
      :fileList="fileList"
      :remove="removeImage"
      :beforeUpload="uploadFile"
      @preview="handlePreview"
    >
      <div v-if="fileList.length < 999">
        <a-icon type="plus"/>
        <div class="ant-upload-text">上传</div>
      </div>
      <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
        <img style="width: 100%" :src="previewImage">
      </a-modal>
    </a-upload>
  </a-spin>
</template>
<script>
import { uploadFile } from "@/api/ice";
import { addEmoji, removeEmoji } from "@/api/customer";
export default {
  data() {
    return {
      spinning: false,
      previewVisible: false,
      previewImage: "",
      fileList: []
    };
  },
  methods: {
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    uploadFile(file) {
      this.spinning = true;
      uploadFile(file).then(res => {
        if (res.code === 0) {
          addEmoji({
            agentId: this.$store.getters.agent.agentId,
            img: res.data.url
          }).then(res1 => {
            if (res.code === 0) {
              this.$store.dispatch("addEmoji", {
                uid: res1.data.id,
                url: res.data.url
              });
            } else {
              this.$message.error("上传失败");
            }
            this.spinning = false;
          });
        } else {
          this.$message.error("上传失败");
          this.spinning = false;
        }
      });
      return false;
    },
    removeImage(data) {
      this.spinning = true;
      removeEmoji(data.uid).then(res => {
        if (res.code === 0) {
          this.$store.dispatch("removeEmoji", data.uid);
        } else {
          this.$message.error(res.msg);
        }
        this.spinning = false;
      });
      return false;
    },
    reload() {
      this.fileList = JSON.parse(
        JSON.stringify(this.$store.getters.customizeList)
      );
    }
  },
  computed: {
    getCustomizeList() {
      return this.$store.getters.customizeList;
    }
  },
  watch: {
    getCustomizeList() {
      this.reload();
    }
  },
  created() {
    this.reload();
  }
};
</script>
