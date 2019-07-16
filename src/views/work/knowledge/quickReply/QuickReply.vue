<template>
  <scroll>
    <a-card class="card-small">
      <div slot="extra">
        <a-input size="small" class="input-small">
          <a-button-group slot="addonAfter" size="small">
            <a-button type="dashed">搜索</a-button>
            <a-button type="dashed">清空</a-button>
          </a-button-group>
        </a-input>
      </div>
      <a-tree key="id" :treeData="treeData" :showLine="true">
        <template slot="dir" slot-scope="record">
          {{record.content}}
        </template>
         <template slot="txt" slot-scope="record">
           {{record.content}}
        </template>
      </a-tree>
    </a-card>
  </scroll>
</template>
<script>
import { mapGetters } from "vuex";
import { arrayPushPrototype } from "@/utils/data";

export default {
  data() {
    return {
      treeData: []
    };
  },
  methods: {
    setTreeData(data) {
      let tree = [...data];
      arrayPushPrototype(tree, [
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
      this.treeData = tree;
    }
  },
  computed: {
    ...mapGetters({
      quickReply: "quickReplyTree"
    })
  },
  watch: {
    quickReply() {
      this.setTreeData(this.quickReply);
    }
  },
  created() {
    this.setTreeData(this.quickReply);
  }
};
</script>

