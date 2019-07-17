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
          <span class="case-title mb10 bold">{{$t('text.customer.basicData')}}</span>
          <customer-info />

          <div class="case-title case-tit mb10 bold">
            {{$t('text.customer.assetsMessage')}}
            <a-icon type="sync" style="color: #1890ff;"></a-icon>
          </div>
          <customer-assets />
        </a-tab-pane>
        <a-tab-pane :tab="$t('text.customer.assetsMessage')" key="2" forceRender>
          <span class="case-title mb10 bold">{{$t('text.customer.HPMessage')}}</span>
          <customer-asset />
        </a-tab-pane>
      </a-tabs>

      <span class="case-title mb10 bold">{{$t('text.customer.caseMessage')}}</span>
      <case-info></case-info>
      <case-form></case-form>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
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
  methods: {}
};
</script>

