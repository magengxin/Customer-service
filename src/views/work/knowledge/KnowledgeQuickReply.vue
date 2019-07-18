<template>
  <a-tabs size="small" class="tabs-small chat-tabs" :defaultActiveKey="$store.getters.quickReplyTab" @change="SwitchTab">
    <a-tab-pane :tab="$t('tabs.public')" key="1">
      <quick-reply />
    </a-tab-pane>
    <a-tab-pane :tab="$t('tabs.private')" key="2">
      <private-quick-reply />
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import QuickReply from "./quickReply/QuickReply";
import PrivateQuickReply from "./quickReply/PrivateQuickReply";
export default {
  components:{
    QuickReply,PrivateQuickReply
  },
  methods:{
    SwitchTab(activeKey){
      this.$store.dispatch('quickReplyTab',activeKey)
    }
  }
}
</script>

