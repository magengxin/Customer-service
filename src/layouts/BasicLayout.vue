<template>
  <a-layout class="layout">
    <a-layout-header :style="{ padding: '0',height: '48px' }">
      <div class="header-index-wide">
        <div class="header-index-left">
          <div class="logo">
            <img src="@/assets/logo.png">
          </div>
          <a-menu v-model="current" mode="horizontal" :style="{height: '48px' }">
            <a-menu-item key="work">
              <router-link to="/work">聊天窗口</router-link>
            </a-menu-item>
            <a-menu-item key="history">
              <router-link to="/history">聊天记录</router-link>
            </a-menu-item>
          </a-menu>
        </div>
        <user-menu class="header-index-right"/>
      </div>
    </a-layout-header>
    <router-view></router-view>
  </a-layout>
</template>
<script>
import UserMenu from "@/components/UserMenu/UserMenu";

export default {
  name: "BasicLayout",
  components: { UserMenu },
  data() {
    return {
      current: ["work"]
    };
  }
};
</script>
<style lang="less" scoped>
.layout{
  height: 100%;
}
.header-index-wide{
  .header-index-left{
    .logo{
      width: 220px;
      border-right:1px solid #f0f2f4;
      .img{
        width: 92%;
      }
    }
  }
}
</style>


