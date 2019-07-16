<template>
  <div>
    <a-button
      :disabled="!user.sessionId || !$store.getters.isSocketRun || user.loading"
      @click="isShowModel=true"
    >转接</a-button>

    <a-modal
      v-model="isShowModel"
      :maskClosable="false"
      title="转接用户"
      :bodyStyle="{padding:'0'}"
      @ok="ok"
    >
      <a-spin :spinning="isSpinning">
        <a-card :bodyStyle="{padding:'0'}">
          <div slot="cover" class="p-2">
            <p>
              <b class="mr-1">转接组:</b>
              <span
                v-if="user.accessCode==='0001'"
              >产品分类编码:{{user.accessData.productCategory}} 产品分类名称:{{user.accessData.productCategoryName}}</span>
              <span
                v-else-if="user.accessCode==='0002'"
              >售后产品:{{user.accessData.productName}} PN:{{user.accessData.pn}} SN::{{user.accessData.sn}}</span>
              <span v-else-if="user.accessCode==='0003'">Pincode:{{user.accessData.pincode}}</span>
              <span
                v-else-if="user.accessCode==='0004'"
              >组编码:{{user.accessData.workgroupCode}} 组名:{{user.accessData.name}}</span>

              <a-button
                type="primary"
                size="small"
                icon="reload"
                style="float:right;"
                @click="reload"
              >刷新</a-button>
            </p>
          </div>

          <a-row>
            <a-col :span="12">
              <a-card :bodyStyle="{padding:'2px'}">
                <a-input-search
                  style="margin-bottom: 4px"
                  placeholder="工作组"
                  @change="workGroupOnChange"
                />
                <a-tree
                  showIcon
                  :treeData="filterTreeData"
                  @select="workGourpOnclick"
                  :selectedKeys="groupId"
                >
                  <a-icon type="folder" slot="dir" />
                  <a-icon type="team" slot="fil" />
                </a-tree>
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card :bodyStyle="{padding:'2px'}">
                <a-input-search
                  style="margin-bottom: 4px"
                  placeholder="客服"
                  @change="agentOnChange"
                />
                <a-radio-group v-model="radioValue">
                  <a-radio
                    v-for="(item,index) in agentList"
                    :key="index"
                    :style="radioStyle"
                    :value="item.agentId"
                  >{{item.name}}</a-radio>
                </a-radio-group>
                <a-pagination
                  class="p-2"
                  size="small"
                  v-model="pagination.current"
                  :total="pagination.total"
                  :pageSize="pagination.pageSize"
                  @change="agentPaginationChange"
                />
              </a-card>
            </a-col>
          </a-row>

          <a-form :form="form" class="p-2">
            <a-form-item label="备注">
              <a-textarea v-decorator="['remork']" />
            </a-form-item>
          </a-form>
        </a-card>
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { treeWorkgroup } from "@/api/ice";
import {
  arrayReplacePrototypeName,
  arrayPushPrototype,
  arrayFilter
} from "@/utils/data";
import { getAgentList } from "@/api/history";

export default {
  data() {
    return {
      isShowModel: false,
      form: this.$form.createForm(this),
      isSpinning: false,
      treeData: [],
      filterTxt: "",
      filterTreeData: [],
      groupId: [],
      searchTxt: "",
      radioValue: null,
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px",
        paddingLeft: "10px"
      },
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0
      },
      agentList: []
    };
  },
  computed: {
    ...mapGetters({
      user: "serviceObjects"
    })
  },
  methods: {
    workGroupOnChange(e) {
      this.filterTxt = e.target.value;
      this.filter();
    },
    reload() {
      this.isSpinning = true;
      this.groupId = [];
      this.agentList = [];
      this.radioValue = null;
      treeWorkgroup().then(res => {
        let data = [];
        if (res.code === 0) {
          data = res.data;
          arrayReplacePrototypeName(data, "key", "id");
          arrayReplacePrototypeName(data, "title", "name");
          arrayPushPrototype(data, [
            {
              validate: obj => {
                return obj.type === "Directory";
              },
              prop: { slots: { icon: "dir" } }
            },
            {
              validate: obj => {
                return obj.type === "File";
              },
              prop: { slots: { icon: "fil" } }
            }
          ]);
        } else {
          this.groupId = null;
        }
        this.treeData = data;
        this.filter();
        this.isSpinning = false;
      });
    },
    filter() {
      if (this.filterTxt && this.filterTxt.length > 0) {
        this.filterTreeData = arrayFilter(
          this.treeData,
          item => item.title.indexOf(this.filterTxt) != -1
        );
      } else {
        this.filterTreeData = this.treeData;
      }
    },
    workGourpOnclick(selectedKeys, { selected }) {
      if (selected) {
        this.groupId = selectedKeys;
      } else {
        this.groupId = [];
      }
      this.reloadAgent();
    },
    agentOnChange(e) {
      this.searchTxt = e.target.value;
      this.reloadAgent();
    },
    agentPaginationChange(page) {
      this.pagination.current = page;
      this.reloadAgent();
    },
    reloadAgent() {
      this.isSpinning = true;
      this.radioValue = null;
      getAgentList({
        pageIndex: this.pagination.current,
        pageSize: this.pagination.pageSize,
        groupId: this.groupId,
        keyword: this.searchTxt
      }).then(res => {
        if (res.code === 0) {
          this.pagination.total = res.data.totalCount;
          this.agentList = res.data.contents;
        } else {
          this.agentList = [];
        }
        this.isSpinning = false;
      });
    },
    ok() {
      if (null === this.radioValue && this.groupId.length === 0) {
        this.$message.error("请选择工作组或客服");
        return false;
      }
      this.$store.dispatch("requestTransferSession", {
        sessionId: this.user.sessionId,
        transferType: null === this.radioValue ? "Workgroup" : "Agent",
        transferId:
          null === this.radioValue ? this.groupId[0] : this.radioValue,
        transferRemark: this.form.getFieldValue("remork")
      });
      this.$message.info("发起会话转接申请");
      this.isShowModel = false;
    }
  },
  created() {
    this.reload();
  }
};
</script>

