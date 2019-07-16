<template>
  <div class="caseInfo">
    <a-table
      :columns="caseInfo"
      :dataSource="caseData"
      :pagination="pagination"
      :customRow="customRow"
      rowKey="caseId"
      bordered
    ></a-table>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CaseInfo",
  data() {
    return {
      caseInfo: [
        { title: "插入时间", dataIndex: "accessTs" },
        { title: "客服", dataIndex: "agentName" },
        { title: "状态", dataIndex: "status" },
        { title: "升级类型", dataIndex: "caseType" },
        { title: "SPOS", dataIndex: "spos" },
        { title: "关闭时间", dataIndex: "endTs" }
      ],
      pagination:false,
      customRow: (record) => {
        return {
          on: {
            click: () => {
              this.$store.commit('getCaseInfo', record); // case详情
              this.$store.commit('changeSpinning', true); // 修改全局页面loading
            }
          }
        };
      }

    };
  },
  computed: {
    ...mapState({
      caseData: state => state.history.caselist
    })
  },
  watch: {
    caseData() {
      if (this.caseData.length < 6) {
        this.pagination = false
      } else {
        this.pagination = {
          pageSize: 5,
          size: 'small'
        }
      }
    }
  },
};
</script>

<style lang="less" scoped>
.caseInfo /deep/ .ant-tabs-bar {
  margin: 0 0 8px 0;
}
.caseInfo /deep/ .ant-form-item {
  margin-bottom: 0px;
}
.caseInfo /deep/ .ant-input {
  height: 24px;
}
.caseInfo /deep/ .ant-form-item-label {
  width: 90px;
  padding-left: 10px;
  text-align: left;
}
.caseInfo /deep/ .ant-form-item-label {
  line-height: 30px;
}
.caseInfo /deep/ .ant-form-item-control {
  line-height: 30px;
}
.caseInfo /deep/ form textarea.ant-input {
  width: 494px;
}
.caseInfo /deep/ .ant-form-item-required:before {
  margin: 0;
}
.caseInfo /deep/ .ant-table-thead > tr > th{
  padding: 5px 5px;
}
.caseInfo /deep/ .ant-table-tbody > tr > td{
  padding: 5px 5px;
}
</style>
