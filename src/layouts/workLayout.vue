<template>
  <a-layout>
    <a-layout-sider width="220px">
        <online></online>
    </a-layout-sider>
    <a-layout-sider width="720px">
      <chat></chat>
    </a-layout-sider>
    <a-layout-content :style="{background:'#fff'}">
      <tabs></tabs>
    </a-layout-content>
  </a-layout>
</template>
<script>
import online from "@/views/work/online";
import chat from "@/views/work/chat";
import tabs from "@/views/work/tabs";

export default {
  components: {
    online,
    chat,
    tabs
  }
};
</script>

