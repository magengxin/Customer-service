<template>
   <scroll>
  <div class="tabs ant-tabs-content"
    style="background: #fff;"
  >
    <a-tabs defaultActiveKey="1" type="card" >
      <a-tab-pane
        :tab="$t('text.customer.basicMessage')"
        key="1"

      >
        <span class="case-title mb10">{{$t('text.customer.basicData')}}</span>
        <customer-info/>
      </a-tab-pane>
      <a-tab-pane :tab="$t('text.customer.assetsMessage')" key="2" >
        <span class="case-title mb10">{{$t('text.customer.HPMessage')}}</span>
        <customer-asset/>
      </a-tab-pane>
    </a-tabs>
    <div >
      <span class="case-title mb10">{{$t('text.customer.caseMessage')}}</span>
      <case-info></case-info>
      <case-form></case-form>
    </div>
  </div>
   </scroll>
</template>
<script>
import CustomerInfo from "./customer/CustomerInfo";
import CustomerAsset from "./customer/CustomerAsset";
import CaseInfo from "./customer/CaseInfo";
import CaseForm from "./customer/Caseform";

export default {
  name: "tabs",
  components: {
    CustomerInfo,
    CustomerAsset,
    CaseInfo,
    CaseForm
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.tabs /deep/ .ant-row{
  margin-right: 0!important;
}
.ant-tabs-content,
.case-content {
  padding: 6px 6px;
}
 .case-title{
  display: block;
  padding-left: 3px;
  border-left: 5px #1890ff solid;
  color: #000;
}
  .mb10{
    margin-bottom: 10px;
  }
</style>
