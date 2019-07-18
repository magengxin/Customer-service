<template>
  <a-tabs
          defaultActiveKey="1"
          type="card"
          class="tabs-small-height"
          :style="{ height: '100%',border: '1px solid #ebedf0'}">
    <a-tab-pane
            :tab="$t('text.customer.basicMessage')"
            key="1"
            :style="{ height: '100%'}"
    >
      <div class="tab-content">
        <div>
          <customer-info :customerInfo="customerInfo"/>
        </div>

        <div class="pt-3">
          <customer-assets/>
        </div>

        <div class="padding6 pt-3">
          <case-info :caseData="caseData" :caseInfoIndex="caseInfoIndex"/>
          <case-form :caseInfo="caseInfo" :customerInfo="customerInfo" :emptyForm="emptyForm"/>
        </div>
      </div>
    </a-tab-pane>
    <a-tab-pane :tab="$t('text.customer.assetsMessage')" key="2"
                :style="{ height: '100%'}">
      <div class="tab-content">
        <div>
          <customer-asset :customerInfo="customerInfo"/>
        </div>

        <div class="padding6 pt-3">
          <case-info :caseData="caseData" :caseInfoIndex="caseInfoIndex"/>
          <case-form :caseInfo="caseInfo" :customerInfo="customerInfo" :emptyForm="emptyForm"/>
        </div>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
  import {mapState} from "vuex";

  import CustomerInfo from "./customer/CustomerInfo";
  import CustomerAsset from "./customer/CustomerAsset";
  import CustomerAssets from "./customer/customerAssets";
  import CaseInfo from "./customer/CaseInfo";
  import CaseForm from "./customer/Caseform";

  export default {
    name: "tabs",
    components: {
      CustomerInfo,
      CustomerAsset,
      CustomerAssets,
      CaseInfo,
      CaseForm
    },
    data() {
      return {};
    },
    computed: {
      ...mapState({
        customerInfo: state => state.history.customerInfo,

        caseData: state => state.history.caselist,
        caseInfoIndex: state => state.history.caseInfoIndex,

        caseInfo: state => state.history.caseInfo,
        emptyForm: state => state.history.emptyForm,

      })
    },
    methods: {
    }
  };
</script>
<style lang="less" scoped>
  .tabs /deep/ .ant-row {
    margin-right: 0 !important;
  }

  .ant-tabs-content,
  .case-content {
    padding: 6px 0;
  }

  .tab-content {
    height: 100%;
    overflow-y: scroll;
  }
  .padding6{
    padding: 6px 12px;
  }
</style>
