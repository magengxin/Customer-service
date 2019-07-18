<template>
  <a-layout class="chat_main">
    <a-layout-content>
      <chat-content></chat-content>
    </a-layout-content>
    <a-layout-footer>
      <a-pagination showQuickJumper :defaultCurrent="2" size="small" :total="500" @change="onChange"/>
    </a-layout-footer>
  </a-layout>
</template>
<script>
  import ChatContent from "@/components/ChatContent/ChatContent";

  export default {
    name: "chat",
    components: {
      ChatContent
    },
    data() {
      return {
        data: [{name: "1"}]
      };
    },
    methods: {
      onChange(pageNumber) {
        console.log("Page: ", pageNumber);
      }
    }
  };
</script>
<style lang="less" scoped>
  .chat_main {
    height: 100%;
    overflow: hidden;
  }

  .ant-layout-footer {
    padding: 10px 0px;
    margin: 0 auto;
  }
</style>

