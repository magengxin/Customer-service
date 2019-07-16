<template>
  <a-row>
    <a-col :span="2">
      <a-avatar class="ml-3" v-if="user.headUrl && user.headUrl.length>0" :src="user.headUrl" />
      <a-avatar class="ml-3" v-else-if="user.nickname">{{user.nickname.substring(0,1)}}</a-avatar>
    </a-col>
    <a-col :span="18" class="pl-2">
      <div style="line-height:40px;">
        <span class="username">{{user.nickname}}</span>
        <a-badge class="channelName" :count="user.channelName" />
      </div>
      <div class="remark">
        <span
          v-if="user.accessCode==='0001'"
        >产品分类编码:{{user.accessData.productCategory}} 产品分类名称:{{user.accessData.productCategoryName}}</span>
        <span
          v-else-if="user.accessCode==='0002'"
        >售后产品:{{user.accessData.productName}} PN:{{user.accessData.pn}} SN::{{user.accessData.sn}}</span>
        <span v-else-if="user.accessCode==='0003'">Pincode:{{user.accessData.pincode}}</span>
        <span
          v-else-if="user.accessCode==='0004'"
        >组编码:{{user.accessData.workgroupCode}} 组名:{{user.accessData.name}}</span>
      </div>
    </a-col>
    <a-col :span="4">
      <chat-header-transfer />
    </a-col>
  </a-row>
</template>
<script>
import ChatHeaderTransfer from "./ChatHeaderTransfer";
import { mapGetters } from "vuex";
export default {
  components: {
    ChatHeaderTransfer
  },
  computed: {
    ...mapGetters({
      user: "serviceObjects"
    })
  }
};
</script>

