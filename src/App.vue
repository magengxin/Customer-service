<template>
  <a-locale-provider
    :locale="$store.getters.lang==='en-US'?enUS:($store.getters.lang==='zh-TW'?zhTW:($store.getters.lang==='ja-JP'?jaJP:($store.getters.lang==='ko-KR'?koKR:zhCN)))"
  >
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import zhTW from "ant-design-vue/lib/locale-provider/zh_TW";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import koKR from "ant-design-vue/lib/locale-provider/ko_KR";
import jaJP from "ant-design-vue/lib/locale-provider/ja_JP";
export default {
  data() {
    return {
      zhCN,
      zhTW,
      enUS,
      koKR,
      jaJP
    };
  },
  mounted() {}
};
</script>
<style>
#app {
  height: 100%;
}
</style>
