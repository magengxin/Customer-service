<template>
  <scroll>
    <a-spin :spinning="spinning">
      <a-card class="card-small">
        <div slot="extra">
          <a-input-search
            v-model="searchText"
            style="width: 200px"
            size="small"
            @change="handlerSearchText"
          />
          <a-button
            class="ml-2"
            icon="delete"
            size="small"
            @click="searchText='';handlerSearchText()"
          />
        </div>
        <a-table
          rowKey="id"
          :dataSource="filterTreeData"
          :pagination="false"
          :showHeader="false"
          :defaultExpandAllRows="true"
          :columns="columns"
          :customRow="customRow"
        >
          <template slot="content" slot-scope="text,record">
            <span v-if="record.type==='File'" :title="record.content">
              <a-avatar
                v-if="record.image"
                shape="square"
                style="margin-top:-2px;margin-right:5px;"
                size="small"
                :src="record.image"
                @click="previewImage=record.image;previewVisible=true;"
              />
              {{record.content}}
            </span>
            <span v-else>
              <a-icon type="folder" class="mr-1" />
              {{record.content}}
            </span>
          </template>
          <div slot="action" slot-scope="text,record">
            <template v-if="record.type==='File'">
              <a-button
                v-if="record.isCollect===1"
                type="primary"
                shape="circle"
                size="small"
                icon="star"
                @click="handlerUncollection(record)"
                style="border:0"
              />
              <a-dropdown v-else :trigger="['click']">
                <a-button class="ant-dropdown-link" shape="circle" size="small" icon="star" />
                <a-menu slot="overlay">
                  <a-tree :treeData="privateQuickReplyData" :defaultExpandAll="true">
                    <template slot="title" slot-scope="menu">
                      <span @click="handlerCollection(record.id,menu.key)">{{menu.content}}</span>
                    </template>
                  </a-tree>
                </a-menu>
              </a-dropdown>
            </template>
          </div>
        </a-table>
      </a-card>
    </a-spin>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img style="width: 100%" :src="previewImage" />
    </a-modal>
  </scroll>
</template>
<script>
import { mapGetters } from "vuex";
import {
  copy,
  arrayPushPrototype,
  arrayReplacePrototypeName,
  arrayRemoveItem,
  arrayFilter
} from "@/utils/data";
import { collection, uncollection } from "@/api/customer";
export default {
  data() {
    return {
      spinning: false,
      searchText: "",
      filterTreeData: [],
      treeData: [],
      expandedKeys: [],
      columns: [
        {
          dataIndex: "content",
          scopedSlots: { customRender: "content" }
        },
        {
          align: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      privateQuickReplyData: [],
      previewVisible: false,
      previewImage: ""
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    setTreeData(data) {
      this.treeData = data;
      this.handlerSearchText();
    },
    setProvateTreeData() {
      const array = copy(this.privateQuickReplyTree);
      //更改属性名称
      arrayReplacePrototypeName(array, "key", "id");
      //删除File子项
      arrayRemoveItem(array, item => {
        return item.type === "File";
      });
      arrayPushPrototype(array, [
        {
          //目录
          validate: () => {
            return true;
          },
          prop: {
            scopedSlots: { title: "title" }
          }
        }
      ]);
      this.privateQuickReplyData = array;
    },
    handlerCollection(fastReplyId, targetParentId) {
      this.spinning = true;
      collection({
        fastReplyId: fastReplyId,
        agentId: this.$store.getters.agent.agentId,
        targetParentId: targetParentId
      }).then(res => {
        if (res.code === 0) {
          this.$store.dispatch("setCollection", {
            id: fastReplyId,
            isCollect: 1
          });
          //刷新个人快捷回复树
          this.$store.dispatch(
            "iceOnAgentId",
            this.$store.getters.agent.agentId
          );
        } else {
          this.$message.error(res.msg);
        }
        this.spinning = false;
      });
    },
    handlerUncollection(record) {
      this.spinning = true;
      uncollection({
        fastReplyId: record.id,
        agentId: this.$store.getters.agent.agentId
      }).then(res => {
        if (res.code === 0) {
          this.$store.dispatch("setCollection", {
            id: record.id,
            isCollect: 0
          });
          //刷新个人快捷回复树
          this.$store.dispatch(
            "iceOnAgentId",
            this.$store.getters.agent.agentId
          );
        } else {
          this.$message.error(res.msg);
        }
        this.spinning = false;
      });
    },
    //双击事件
    customRow(record) {
      return {
        on: {
          dblclick: () => {
            if (record.type === "File") {
              this.$root.$emit("on-quick-reply", {
                title: record.content,
                image: record.image
              });
            }
          }
        }
      };
    },
    //搜索
    handlerSearchText() {
      if (this.searchText) {
        this.filterTreeData = arrayFilter(
          this.treeData,
          item => item.content.indexOf(this.searchText) != -1
        );
        //展开
      } else {
        this.filterTreeData = this.treeData;
      }
    }
  },
  computed: {
    ...mapGetters({
      quickReply: "quickReplyTree",
      privateQuickReplyTree: "privateQuickReplyTree"
    })
  },
  watch: {
    quickReply() {
      this.setTreeData(this.quickReply);
    },
    privateQuickReplyTree() {
      this.setProvateTreeData();
    }
  },
  created() {
    this.setTreeData(this.quickReply);
    this.setProvateTreeData();
  }
};
</script>

