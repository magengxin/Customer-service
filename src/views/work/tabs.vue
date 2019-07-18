<template>
  <a-tabs type="card" size="small" defaultActiveKey="1" class="tabs-small chat-tabs">
    <a-tab-pane :tab="$t('tabs.knowledge')" key="1">
      <a-tabs defaultActiveKey="1" size="small" class="tabs-small chat-tabs">
        <a-tab-pane :tab="$t('tabs.quickReply')" key="1">
          <knowledge-quick-reply />
        </a-tab-pane>
        <!-- <a-tab-pane tab="常见问题" key="2" forceRender>
            <knowledge-faq/>
          </a-tab-pane>
          <a-tab-pane tab="视频专区" key="3">
            <knowledge-video/>
        </a-tab-pane>-->
      </a-tabs>
    </a-tab-pane>
    <a-tab-pane :tab="$t('tabs.customer')" key="2">
      <a-tabs defaultActiveKey="1" size="small" class="tabs-small chat-tabs">
        <a-tab-pane :tab="$t('text.customer.basicMessage')" key="1">
          <customer-info :customerInfo="customerInfo"/>

          <customer-assets />
        </a-tab-pane>
        <a-tab-pane :tab="$t('text.customer.assetsMessage')" key="2" forceRender>
          <customer-asset :customerInfo="customerInfo"/>
        </a-tab-pane>
      </a-tabs>

      <div class="padding6 pt-3">
        <case-info :caseData="caseData" :caseInfoIndex="caseInfoIndex"/>
        <case-form :caseInfo="caseInfo" :customerInfo="customerInfo" :emptyForm="emptyForm"/>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
  import {mapState} from "vuex";

  import KnowledgeQuickReply from "./knowledge/KnowledgeQuickReply";
// import KnowledgeFaq from "./knowledge/KnowledgeFaq";
// import KnowledgeVideo from "./knowledge/KnowledgeVideo";
import CustomerInfo from "@/views/history/customer/CustomerInfo";
import CustomerAssets from "@/views/history/customer/customerAssets";
import CaseInfo from "@/views/history/customer/CaseInfo";
import CaseForm from "@/views/history/customer/Caseform";
import CustomerAsset from "@/views/history/customer/CustomerAsset";

export default {
  components: {
    KnowledgeQuickReply,
    CustomerInfo,
    CustomerAssets,
    CaseInfo,
    CaseForm,
    CustomerAsset
  },
  data() {
    return {
      mode: "top"
    };
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
  methods: {}
};
</script>

