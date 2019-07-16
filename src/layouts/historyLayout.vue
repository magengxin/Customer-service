<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider width="460px" class="customer-list">
      <customer-list></customer-list>
    </a-layout-sider>
        <a-layout-sider width="400px" class="message">
          <message></message>
        </a-layout-sider>
    <a-layout-content>
      <a-spin :spinning="loading">
        <tabs></tabs>
      </a-spin>
    </a-layout-content>
  </a-layout>
</template>
<script>
  import customerList from '@/views/history/customerList'
  import message from '@/views/history/message'
  import tabs from '@/views/history/tabs'

  import {mapState} from "vuex";

  export default {
    computed: {
      ...mapState({
        loading: state => state.history.spinning
      })
    },
    components: {
      customerList, message, tabs
    }
  }
</script>
<style>
  #components-layout-demo-fixed-sider > .customer-list {
    padding: 10px;
  }
</style>
