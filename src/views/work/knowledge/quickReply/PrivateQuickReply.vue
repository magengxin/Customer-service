<template>
  <scroll>
    <a-spin :spinning="spinning">
      <a-card class="card-small" :bordered="false">
        <div class="p-2">
          <a-button
            icon="plus"
            size="small"
            @click="add({sortIndex:privateQuickReplyData.length>0?(privateQuickReplyData[privateQuickReplyData.length-1].sortIndex+1):0})"
          ></a-button>
          <a-button
            icon="delete"
            size="small"
            class="ml-2"
            style="float:right"
            @click="searchText='';handlerSearchText()"
          ></a-button>
          <a-input-search
            style="width: 200px;float:right;"
            size="small"
            v-model="searchText"
            @change="handlerSearchText"
          />
        </div>

        <a-tree
          :draggable="true"
          :defaultExpandAll="true"
          :treeData="filterTreeData"
          @drop="onDrop"
        >
          <div slot="dir" slot-scope="record">
            <a-icon type="folder" class="mr-1" />
            <a-dropdown :trigger="['contextmenu']">
              <span style="user-select: none">{{record.title}}</span>
              <a-menu slot="overlay">
                <a-menu-item
                  key="1"
                  @click="add({parentId:record.key,sortIndex:record.children && record.children.length>0?(record.children[record.children.length-1].sortIndex+1):0})"
                >新增目录</a-menu-item>
                <a-menu-item
                  key="2"
                  @click="add({parentId:record.key,type:'File',sortIndex:record.children && record.children.length>0?(record.children[record.children.length-1].sortIndex+1):0})"
                >新增子项</a-menu-item>
                <a-menu-item key="3" @click="edit(record)">编辑</a-menu-item>
                <a-menu-item key="4" @click="remove(record)">删除</a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
          <div slot="txt" slot-scope="record">
            <a-avatar
              v-if="record.img"
              shape="square"
              style="margin-top:-2px;margin-right:5px;"
              size="small"
              :src="record.img"
              @click="previewImage=record.img;previewVisible=true;"
            />
            <a-dropdown :trigger="['contextmenu']">
              <span style="user-select: none" :title="record.title" @dblclick="handlerDbclick(record)">{{record.title}}</span>
              <a-menu slot="overlay">
                <a-menu-item key="1" @click="edit(record)">编辑</a-menu-item>
                <a-menu-item key="2" @click="remove(record)">删除</a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </a-tree>
      </a-card>
    </a-spin>
    <a-modal
      :title="isAdd?'新增':'编辑'"
      v-model="isShowModel"
      :bodyStyle="{padding:'10px'}"
      @ok="handleOk"
    >
      <a-spin :spinning="spinning">
        <a-form :form="form">
          <a-form-item label="名称">
            <a-input
              v-decorator="[
              'title',
              {
                rules: [{ required: true,max:1024 }],
              }
            ]"
            />
          </a-form-item>
          <a-form-item v-if="formData.type==='File'">
            <a-upload
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
              :disabled="true"
            >
              <div v-if="fileList.length < 1">
                <textarea class="ant-upload-text" style="height:80px;" @paste="handlerPaste"></textarea>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </scroll>
</template>
<script>
import { mapGetters } from "vuex";
import {
  arrayPushPrototype,
  arrayReplacePrototypeName,
  arrayFilter,
  copy,
  loop
} from "@/utils/data";
import {
  saveQuickReply,
  updateQuickReply,
  deleteQuickReply,
  sortQuickReply
} from "@/api/customer";
import { uploadFile } from "@/api/ice";

export default {
  data() {
    return {
      spinning: false,
      isShowModel: false,
      isAdd: false,
      searchText: "",
      filterTreeData: [],
      columns: [
        { dataIndex: "content" },
        {
          align: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      privateQuickReplyData: [],
      form: this.$form.createForm(this),
      previewVisible: false,
      previewImage: "",
      fileList: [],
      formData: {}
    };
  },
  computed: {
    ...mapGetters({
      privateQuickReplyTree: "privateQuickReplyTree"
    })
  },
  methods: {
    setProvateTreeData() {
      const array = JSON.parse(JSON.stringify(this.privateQuickReplyTree));
      arrayReplacePrototypeName(array, "title", "content");
      arrayReplacePrototypeName(array, "key", "id");
      arrayPushPrototype(array, [
        {
          //目录
          validate: node => {
            return node.type === "Directory";
          },
          prop: {
            scopedSlots: { title: "dir" }
          }
        },
        {
          //非目录
          validate: node => {
            return node.type === "File";
          },
          prop: {
            scopedSlots: { title: "txt" }
          }
        }
      ]);
      this.privateQuickReplyData = array;
      this.handlerSearchText();
    },
    //搜索
    handlerSearchText() {
      if (this.searchText) {
        this.filterTreeData = arrayFilter(
          this.privateQuickReplyData,
          item => item.title.indexOf(this.searchText) != -1
        );
        //展开
      } else {
        this.filterTreeData = this.privateQuickReplyData;
      }
    },
    add({ parentId, type = "Directory", sortIndex = 0 }) {
      this.fileList = [];
      this.isAdd = true;
      this.formData.type = type;
      this.formData.parentId = parentId;
      this.isShowModel = true;
      this.formData.sortIndex = sortIndex;
      this.form.resetFields();
    },
    edit(record) {
      this.form.resetFields();
      this.fileList = [];
      this.isAdd = false;
      this.formData.type = record.type;
      this.formData.key = record.key;
      this.isShowModel = true;
      this.$nextTick(() => {
        this.form.setFieldsValue({
          title: record.title
        });

        if (record.image) {
          this.fileList = [
            {
              uid: "-1",
              name: "xxx.png",
              status: "done",
              url: record.image
            }
          ];
        }
      });
    },
    handleOk() {
      const form = this.form;
      this.spinning = true;
      form.validateFields((err, values) => {
        if (err) {
          this.spinning = false;
          return;
        }
        if (this.isAdd) {
          //保存
          saveQuickReply({
            parentId: this.formData.parentId,
            content: values.title,
            img: this.fileList.length == 1 ? this.fileList[0].url : "",
            agentId: this.$store.getters.agent.agentId,
            sortIndex: this.formData.sortIndex,
            type: this.formData.type
          }).then(res => {
            if (res.code === 0) {
              this.isShowModel = false;
              //刷新列表
              this.$store
                .dispatch("iceOnAgentId", this.$store.getters.agent.agentId)
                .then(() => {
                  this.spinning = false;
                });
            } else {
              this.$message.error(res.msg);
              this.spinning = false;
            }
          });
        } else {
          //更新
          updateQuickReply(this.formData.key, {
            content: values.title,
            img: this.fileList.length == 1 ? this.fileList[0].url : ""
          }).then(res => {
            if (res.code === 0) {
              this.isShowModel = false;
              //刷新列表
              this.$store
                .dispatch("iceOnAgentId", this.$store.getters.agent.agentId)
                .then(() => {
                  this.spinning = false;
                });
            } else {
              this.$message.error(res.msg);
              this.spinning = false;
            }
          });
        }
      });
    },
    remove(record) {
      this.$confirm({
        title: "确认删除吗?",
        content: record.title,
        okType: "danger",
        onOk: () => {
          this.spinning = true;
          deleteQuickReply(record.key).then(res => {
            if (res.code === 0) {
              //刷新列表
              this.$store
                .dispatch("iceOnAgentId", this.$store.getters.agent.agentId)
                .then(() => {
                  this.spinning = false;
                });
            } else {
              this.$message.error(res.msg);
              this.spinning = false;
            }
          });
        }
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    handlerPaste(e) {
      var items = e.clipboardData.items;
      for (var i = 0; i < items.length; ++i) {
        // 如果剪贴板中的内容类型是图片文件
        if (items[i].kind == "file" && items[i].type.indexOf("image/") >= 0) {
          e.preventDefault();
          this.spinning = true;
          var blob = items[i].getAsFile();
          let files = new File([blob], "blob.png", { type: "image/jpeg" });
          uploadFile(files).then(res => {
            if (res.code === 0) {
              this.fileList = [
                {
                  uid: "-1",
                  name: "xxx.png",
                  status: "done",
                  url: res.data.url
                }
              ];
            } else {
              this.$message.error("上传失败");
            }
            this.spinning = false;
          });
        }
      }
    },
    onDrop(info) {
      const dragKey = info.dragNode.eventKey; //源（拖拽对象Key）
      const dropKey = info.node.eventKey; //目的地(追加到子项、同层[上边、下边])

      const dropPos = info.node.pos.split("-");
      const dropPosition =
        info.dropPosition - Number(dropPos[dropPos.length - 1]); //-1上边 0放置在对象上 1下边

      const data = [...this.privateQuickReplyData];

      // 源对象
      let dragObj;
      loop(data, dragKey, item => {
        dragObj = item;
      });

      //目标
      let ar, i, dropObj;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
        dropObj = item;
      });

      /**
       * 限制条件
       */
      //File不允许在第一层
      if (dropPos.length < 3 && dragObj.type === "File") {
        //console.log('File不允许在第一层')
        return;
      }
      //File不是目录
      if (dropPosition == 0 && dropObj.type === "File") {
        //console.log('File不是目录')
        return;
      }

      let body = {
        parentId: null,
        updateFastReplyPrivates: []
      };
      let children;
      if (info.dropToGap) {
        //上下,同层
        body.parentId = dropObj.parentId;
        children = copy(ar);
        if (dropPosition === -1) {
          children.splice(i, 0, dragObj);
        } else {
          children.splice(i + 1, 0, dragObj);
        }
      } else {
        // dropPosition=0 或 !info.dropToGap
        body.parentId = dropObj.key;
        children = copy(dropObj.children || []);
        children.push(dragObj);
      }

      for (let i in children) {
        body.updateFastReplyPrivates.push({
          fastReplyPrivateId: children[i].key,
          sortIndex: i
        });
      }

      this.spinning = true;
      sortQuickReply(dragObj.key, body).then(res => {
        if (res.code === 0) {
          //刷新列表
          this.$store
            .dispatch("iceOnAgentId", this.$store.getters.agent.agentId)
            .then(() => {
              this.spinning = false;
            });
          this.isShowModel = false;
        } else {
          this.$message.error(res.msg);
          this.spinning = false;
        }
      });
    },
    //双击事件
    handlerDbclick(record) {
      this.$root.$emit("on-quick-reply", {
        title: record.title,
        image: record.image
      });
    }
  },
  watch: {
    privateQuickReplyTree() {
      this.setProvateTreeData();
    }
  },
  created() {
    this.setProvateTreeData();
  }
};
</script>

