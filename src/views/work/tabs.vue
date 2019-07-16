<template>
  <a-tabs
    defaultActiveKey="1"
    tabPosition="top"
    :style="{ height: '100%',border: '1px solid #ebedf0'}"
    :tabBarStyle="{margin: '0px',}"
    class="tabs-small"
  >
    <a-tab-pane tab="知识库" key="1">
        <a-tabs defaultActiveKey="1" size="small" type="card" :tabBarStyle="{margin: '0px'}" :style="{ height: '100%'}">
          <a-tab-pane tab="快捷回复" key="1" :style="{ height: '100%'}">
            <knowledge-quick-reply/>
          </a-tab-pane>
          <!-- <a-tab-pane tab="常见问题" key="2" forceRender>
            <knowledge-faq/>
          </a-tab-pane>
          <a-tab-pane tab="视频专区" key="3">
            <knowledge-video/>
          </a-tab-pane>  -->
        </a-tabs>
    </a-tab-pane>
    <a-tab-pane tab="客户信息" key="2">Content of tab 2</a-tab-pane>
  </a-tabs>
</template>
<script>
import KnowledgeQuickReply from "./knowledge/KnowledgeQuickReply";
// import KnowledgeFaq from "./knowledge/KnowledgeFaq";
// import KnowledgeVideo from "./knowledge/KnowledgeVideo";

export default {
  components: {
    KnowledgeQuickReply
  },
  data() {
    return {
      mode: "top"
    };
  },
  methods: {}
};
</script>

