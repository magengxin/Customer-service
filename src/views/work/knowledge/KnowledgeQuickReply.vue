<template>
  <a-tabs size="small" :tabBarStyle="{margin: '0px'}" :style="{ height: '100%'}">
    <a-tab-pane tab="公共" key="1">
      <quick-reply />
    </a-tab-pane>
    <a-tab-pane tab="个人" key="2">
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
  }
}
</script>

