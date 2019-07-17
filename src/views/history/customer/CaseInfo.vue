<template>
  <div class="caseInfo border-t">
    <scroll>
      <a-list
              :dataSource="caseData"
      >
        <a-list-item slot="renderItem" slot-scope="item, index"
                     @click="handleClick(item, index)"
                     @mouseenter="enter(index)"
                     @mouseleave="leave()"
                     :class="{active:current == index,active1:current1 == index}"
        >
          <div class="w25 textalc arrow">
            <div class="radius"></div>
            <div>{{item.accessTs}}</div>
          </div>
          <div class="w10 textalc">{{item.agentName}}</div>
          <div class="w10 textalc">{{item.status}}</div>
          <div class="w20 textalc">{{item.caseType}}</div>
          <div class="w10 textalc">{{item.spos}}</div>
          <div class="w25 textalc">{{item.endTs}}</div>
        </a-list-item>
        <div slot="header" class="list-head flex-align-center">
          <div v-for="item in caseInfo" :key="item.dataIndex" :class="[item.width, 'textalc']">{{item.title}}</div>
        </div>
      </a-list>
    </scroll>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CaseInfo",
  data() {
    return {
      current:null,
      current1: 0,
      caseInfo: [
        { title: "接入时间", dataIndex: "accessTs", width: 'w25'},
        { title: "客服", dataIndex: "agentName", width: 'w10'},
        { title: "状态", dataIndex: "status", width: 'w10'},
        { title: "升级类型", dataIndex: "caseType", width: 'w20'},
        { title: "SPOS", dataIndex: "spos", width: 'w10'},
        { title: "关闭时间", dataIndex: "endTs", width: 'w25'}
      ],
    };
  },
  computed: {
    ...mapState({
      caseData: state => state.history.caselist,
      caseInfoIndex: state => state.history.caseInfoIndex,
    })
  },
  watch:{
    caseInfoIndex(){
      this.current1 = this.caseInfoIndex;
    }
  },
  methods: {
    handleClick(item, index) {
      this.current1 = index;
      this.$store.commit('getCaseInfo', item); // case详情
      this.$store.commit('changeCaseInfoIndex', index); // 修改 case table 默认索引
      this.$store.commit('changeSpinning', true); // 修改全局页面loading
      setTimeout(() => {
        this.$store.commit('changeSpinning', false);
      }, 1000);
    },
    enter( index) {
      this.current = index;
    },
    leave() {
      this.current = null;
    },
  }
};
</script>

<style lang="less" scoped>
  .w10{
    width: 10%;
  }
  .w20{
    width: 20%;
  }
  .w25{
    width: 25%;
  }

  .textalc{
    text-align: center;
  }
  .active{
    color: deepskyblue;
  }
  .active1{
    color: deepskyblue;
  }
  .color{
    color: #000;
  }

  .ant-list-split .ant-list-item {
    border-bottom: none;
  }

  .caseInfo {
    height: 200px;
  }
  .caseInfo .list-head{
    color: #000;
  }
  .caseInfo .ant-list-item{
    padding: 6px;
    overflow: hidden;
  }
  .ant-list-item .arrow{
    display: flex;
    justify-items: center;
  }
  .ant-list-item .arrow .radius{
    position: relative;
    margin-right: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #EAF3F6;
  }
  .ant-spin-container .ant-list-item:not(:last-child) .arrow .radius:after{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -126%;
    content: '';
    display: block;
    width: 4px;
    height: 10px;
    background: #F8F8F8;
  }
  .ant-list-item.active .radius,
  .ant-list-item.active1 .radius {
    background: #79C1E6;
  }
</style>
