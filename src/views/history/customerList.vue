<template>
  <scroll>
    <div class="customer">
      <a-row :gutter="16">
        <a-col :span="4" style="padding-left: 10px">
          <a-button icon="sync" size="small" @click="init">{{$t('text.refresh')}}</a-button>
        </a-col>
        <a-col :span="4">
          <a-button icon="message" size="small">{{$t('text.cell')}}</a-button>
        </a-col>
        <a-col :span="2"></a-col>
        <a-col :span="12">
          <a-input-search
                  :placeholder="$t('text.customer.name')"
                  style="width: 154px;"
                  @search="onSearch"
                  size="small"
                  enterButton
          ></a-input-search>
        </a-col>
      </a-row>
      <a-row style="margin: 10px 0;" :gutter="16">
        <a-col :span="4" >{{$t('text.customer.list')}}</a-col>
        <a-col :span="20">
          <a-select
                  :defaultValue="$t('text.customer.lastTime')"
                  style="margin-right: 10px; width: 100px;"
                  @change="handleChangeTime"
                  size="small"
          >
            <a-select-option value="0">{{$t('text.lastTime.days')}}</a-select-option>
            <a-select-option value="1">{{$t('text.lastTime.month')}}</a-select-option>
            <a-select-option value="2">{{$t('text.lastTime.year')}}</a-select-option>
          </a-select>
          <a-select
                  :defaultValue="$t('text.channel')"
                  style="margin-right: 10px; width: 100px;"
                  @change="handleChangeChannel"
                  size="small"
          >
            <a-select-option :value="item.code" v-for="item in channelList" :key="item.code">{{item.name}}</a-select-option>
          </a-select>
          <a-select
                  :defaultValue="$t('text.allAgent')"
                  style="width: 100px;"
                  size="small"
                  @change="handleChangeAgent">

            <a-select-option v-for="item in agentList" :value="item.agentId" :key="item.agentId">{{item.nickname}}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-table :columns="columns"
               :dataSource="customerList"
               :pagination="pagination"
               :loading="loading"
               bordered
               rowKey="lastAgentId"
               :customRow="customRow"
               :rowClassName="rowClassName"
               @change="handleTableChange"
      >
      </a-table>
    </div>
  </scroll>
</template>
<script>
import { getAgentList, getCustomerList, getCustomerInfo, getChannelList, postCaselist } from "@/api/history";

export default {
  data() {
    return {
      columnIndex: 0, // 當前行索引
      lastAgentId: 0, // 列表第一个id
      pagination: {},
      loading: false,
      columns:[{
        title: this.$t('text.table.nickname'),
        dataIndex: 'nickname',
      }, {
        title: this.$t('text.table.lastTime'),
        dataIndex: 'lastCloseTs'
      }, {
        title: this.$t('text.table.connectAgent'),
        dataIndex: 'lastAgentName'
      }],
      customerList: [], // 客户列表
      agentList: [], // 客服列表
      channelList: [], // 渠道列表
      customer: { // 查询客户列表条件
        channelCode: '', // 渠道代码
        name: '',
        startTs: 0, // 开始时间
        agentId: 0, // 客服ID
        pageIndex: 1,
        pageSize: 10,
        operationAgentId: 0 // 操作客服ID
      },
      // 单元格配置
      customRow: (record, index) => {
        return {
          on: {
            click: () => {
              this.columnIndex = index; // 提取当前索引
              this.$store.commit('changeSpinning', true); // 修改全局页面loading
              this.getCustomerInfo(record.lastAgentId); // 获取客戶基本信息
              this.postCaselist(record.lastAgentId); // 获取case列表
            }
          }
        };
      }
    };
  },
  created() {
    this.getCustomerList(this.customer);
  },
  mounted() {
    this.getAgentList();
    this.getChannelList();

    this.getCustomerInfo(this.lastAgentId); // 获取客戶基本信息
    this.postCaselist(this.lastAgentId); // 获取case列表
  },
  methods: {
    // 加载数据
    init(){
      this.pagination.current = 1;
      this.handleTableChange(this.pagination)
    },
    // 分页切换功能
    handleTableChange (pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.customer.pageIndex = pagination.current;
      this.pagination = pager;
      this.load({
        results: pagination.pageSize,
        page: pagination.current,
      });
    },
    load () {
      this.getCustomerList(this.customer);
    },
    // 点击搜索客户
    onSearch(value) {
      if (!value) {
        this.$message.warning(this.$t('text.warning.name'));
        return
      }
      this.customer.name = value;
      this.init();
    },
    // 点击切换时间
    handleChangeTime(value) {
      const moment = this.$moment;

      let lastTime = 0;

      value = parseInt(value);
      switch (value) {
        case 0:
          lastTime = moment().subtract(7, 'days').calendar();
          break;
        case 1:
          lastTime = moment().subtract(30, 'days').calendar();
          break;
        case 2:
          lastTime = moment().subtract(365, 'days').calendar();
          break;
        default:
          console.log("switch error lastTime",lastTime);
      }
      let result = moment(lastTime).valueOf();
      result = parseInt(moment(result).format('X'));

      this.customer.startTs = result;
      this.init();
    },
    // 点击切换渠道
    handleChangeChannel(value) {
      this.customer.channelCode = value;
      this.init();
    },
    // 点击切换客服
    handleChangeAgent(value) {
      this.customer.agentId = value;
      this.init();
    },
    // 获取客户列表
    getCustomerList(data) {
      this.loading = true;

      getCustomerList(data)
          .then(res => {
            if (res.code === 0) {
              this.loading = false;

              this.customerList = res.data.contents;
              this.lastAgentId = this.customerList[0].lastAgentId;

              let pagination = {
                pageNo: res.data.pageNo,
                pageSize: res.data.pageSize,
                totalCount: res.data.totalCount,
                totalPages: res.data.totalPages,
              };
              this.pagination = pagination;
            }
          })
          .catch(error => {
            console.log("error", error);
          })
    },
    // 获取所有客服列表
    getAgentList() {
      getAgentList().then(res => {
        this.agentList = res.data.contents;
      });
    },
    // 获取所有渠道列表
    getChannelList() {
      getChannelList().then(res => {
        if (res.code === 0) {
          this.channelList = res.data;
        }
      });
    },
    // 获取客戶基本信息
    getCustomerInfo (id) {
      getCustomerInfo(id)
          .then(res => {
            if (res.code === 0) {
              this.$store.commit('getCustomerInfo', res.data);
              this.$store.commit('changeSpinning', false)
            }
          })
          .catch(error => {
            console.log("error", error);
          });
    },
    // 获取case列表
    postCaselist(id) {
      postCaselist({customerId: id})
          .then(res => {
            if (res.code === 0) {
              this.$store.commit('postCaselist', res.data)
            }
          })
          .catch(error => {
            console.log("error", error);
          })
    },
    // 單元格樣式
    rowClassName(record, index) {
      //判断索引相等时添加行的高亮样式
      return index === this.columnIndex ? 'column-bg-color' : '';
    }
  }
};
</script>

<style lang="less" scoped>
.customer /deep/ .ant-table-thead > tr > th {
  padding: 5px 5px;
}
.customer /deep/ .ant-table-tbody > tr > td {
  padding: 5px 5px;
}
.ant-row {
  position: relative;
  margin-left: 0!important;
  margin-right: 0!important;
  height: auto;
  zoom: 1;
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>