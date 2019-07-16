<template>
  <a-layout :style="{height: '100%'}">
    <a-layout-header class="chat-header">
      <chat-header />
    </a-layout-header>
    <a-layout-content class="chat-nav">
      <scroll>
        <chat-content :data="user.messages"></chat-content>
      </scroll>
    </a-layout-content>
    <a-layout-footer class="chat-footer">
      <chat-editor/>
    </a-layout-footer>
  </a-layout>
</template>
<script>
import ChatHeader from "./ChatHeader";
import ChatContent from "@/components/ChatContent/ChatContent";
import ChatEditor from "@/components/ChatEditor/ChatEditor";
import { mapGetters } from "vuex";

export default {
  name: "chat",
  components: {
    ChatHeader,
    ChatContent,
    ChatEditor
  },
  data() {
    return {
      data: [{ name: "1" }],
      header: {
        headUrl: this.$store.getters.customerId
      }
    };
  },
  computed: {
    ...mapGetters({
      user: "serviceObjects"
    })
  }
};
</script>


