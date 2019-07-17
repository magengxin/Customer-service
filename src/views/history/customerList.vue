<template>
  <scroll>
    <div class="customer">
      <div class="top-info">
        <a-row :gutter="16">
          <a-col :span="4"
                 class="sync">
            <a-button icon="sync" size="small" @click="sync">{{$t('text.refresh')}}</a-button>
          </a-col>
          <a-col :span="4"
                 class="create-session"
                 >
            <a-button icon="message" size="small"
                      @click="createSession">{{$t('text.cell')}}</a-button>
          </a-col>
          <a-col :span="12">
            <a-input-search
                    :placeholder="$t('text.customer.name')"
                    style="width: 208px;"
                    @search="onSearch"
                    size="small"
                    enterButton
            ></a-input-search>
          </a-col>
        </a-row>
        <a-row style="margin: 10px 0;" :gutter="16">
          <a-col :span="4">{{$t('text.customer.list')}}</a-col>
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
              <a-select-option :value="item.code" v-for="item in channelList" :key="item.code">{{item.name}}
              </a-select-option>
            </a-select>
            <a-select
                    :defaultValue="$t('text.allAgent')"
                    style="width: 100px;"
                    size="small"
                    @change="handleChangeAgent">

              <a-select-option v-for="item in agentList" :value="item.agentId" :key="item.agentId">{{item.nickname}}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </div>

      <a-list
              :dataSource="customerList"
              :pagination="paginationList"
              :loading="loading"
      >
        <a-list-item slot="renderItem" slot-scope="item, index"
                     @click="handleClick(item, index)"
                     @mouseenter="enter(index)"
                     @mouseleave="leave()"
                     :class="{active:current == index,active1:current1 == index}">

          <div class="w40 radius"><img :src="item.headPic" alt="头像">{{item.nickname}}</div>
          <div class="w30 ">{{item.lastCloseTs}}</div>
          <div class="w30 ">{{item.lastAgentName}}</div>

        </a-list-item>
        <div slot="header" class="list-head flex-align-center">
          <div class="w40 ">{{$t('text.table.nickname')}}</div>
          <div class="w30 ">{{$t('text.table.lastTime')}}</div>
          <div class="w30 ">{{$t('text.table.connectAgent')}}</div>
        </div>
      </a-list>

    </div>
  </scroll>
</template>
<script>
  import {getAgentList, getCustomerList, getCustomerInfo, getChannelList, postCaselist} from "@/api/history";

  export default {
    data() {
      return {
        columnIndex: 0, // 當前行索引
        lastAgentId: 0, // 列表第一个id
        loading: false,
        columns: [{
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
          agentId: this.$store.getters.agent.agentId, // 客服ID
          pageIndex: 1,
          pageSize: 10,
          operationAgentId: 0 // 操作客服ID
        },
        current: 0,
        current1: 0,
        paginationList: {
          onChange: (page) => {
            this.init(page)
          },
          pageSize: 20,
          size: 'small'
        },
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
      init(page) {
        this.current1 = 0;
        if (page) {
          this.paginationList.current = page;
        }else{
          this.paginationList.current  = 1;
        }
        this.getCustomerList(this.customer);
      },
      sync() {
        this.init();
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
            console.log("switch error lastTime", lastTime);
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
              }
            })
            .catch(error => {
              console.log("error", error);
            })
      },
      // 获取所有客服列表
      getAgentList() {
        getAgentList().then(res => {
          this.agentList = res.data.content;
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
      getCustomerInfo(id) {
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
      handleClick(item, index) {
        this.current1 = index;

        this.$store.commit('changeSpinning', true); // 修改全局页面loading

        let obj = {
          accessTs: "2018-10-16 16:17:00",
          agentId: "1000000",
          agentName: "zero0",
          caseId: "10000000000",
          caseType: "技术升级0",
          channelName: "marketing",
          channelSource: "售前",
          contents: [{content: "xxxx", email: "xx@hp.com", createTs: "2018-10-16 16:17:00"}],
          endTs: "2018-10-16 16:26:00",
          spos: 0,
          status: "close",
          symptomQuestion: "问题内容0",
          symptomSpecific: "关于产品或服务规格的投诉0",
          symptomSubCategory: "提供产品意见0",
          symptomTopCategory: "获取客户支持0"
        }
        this.columnIndex = index; // 提取当前索引
        this.$store.commit('changeCaseInfoIndex', 0); // case详情
        this.$store.commit('getCaseInfo', obj); // case详情

        // this.$store.commit('setEmptyForm'); // 清空form
        this.getCustomerInfo(item.lastAgentId); // 获取客戶基本信息
        this.postCaselist(item.lastAgentId); // 获取case列表

        setTimeout(() => {
          this.$store.commit('changeSpinning', false);
        }, 1000);
      },
      enter(index) {
        this.current = index;
      },
      leave() {
        this.current = null;
      },
      //发起会话
      createSession(){
        if(this.columnIndex==0){
          this.$store.dispatch('requestCreateSession',this.customerList[this.columnIndex].customerId)
          this.$message.success('发起会话申请');
        }else{
          this.$message.error('未选择客户');
        }
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
    margin-left: 0!important;
    margin-right: 0!important;
    margin-bottom: 0!important;
  }

  /* active样式 */
  .w10 {
    width: 10%;
  }

  .w20 {
    width: 20%;
  }

  .w25 {
    width: 25%;
  }

  .w30 {
    width: 30%;
  }

  .w40 {
    width: 40%;
  }

  .textalc {
    text-align: center;
  }

  .active {
    background: #54A9DE;
  }

  .active1 {
    background: #54A9DE;
  }

  .color {
    color: #000;
  }

  .ant-list-split .ant-list-item {
    border-bottom: none;

  }

  .customer {
    .top-info {
      [class*=ant-col] {
        padding: 0!important;
      }
      .sync{
        margin-right: 12px;
        width: 60px;
      }
      .create-session{
        margin-right: 12px;
        width: 100px;
      }
      .ant-btn-sm {
        width: 100%;
        line-height: 20px;
      }
    }

    .list-head {
      color: #000;
    }

    .ant-list-item {
      padding: 4px;
      cursor: pointer;

      div {
        height: 30px;
        line-height: 30px;
      }
    }

    .radius {
      position: relative;

      img {
        margin-right: 4px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }
    }
  }
</style>