<template>
  <a-layout style="height:100%;">
    <a-layout-header class="layout-header-left">
      <!-- 接入信息 -->
      <a-row class="nav-left-header">
        <a-col :span="10">
          <b>{{$store.getters.queue.Workgroup}} {{$t('online.people')}}</b>
          <br />
          <span>{{$t('online.group.waiting')}}</span>
        </a-col>
        <a-col :span="2">
          <a-divider type="vertical" style="height:30px;margin-top:6px;" />
        </a-col>
        <a-col :span="10">
          <b>{{$store.getters.queue.Agent}} {{$t('online.people')}}</b>
          <br />
          <span>{{$t('online.people.waiting')}}</span>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <scroll>
        <a-spin :spinning="!$store.getters.isSocketRun">
          <!-- 客户列表 -->
          <div class="nav-left-chat">
            <div
              class="chat-item"
              v-for="(item,index) in sessionList"
              :key="index"
              :class="{'chat-item-active' : $store.getters.customerId === item.customerId}"
              @click="handleUserChange(item)"
            >
              <div class="avatar">
                <a-badge :count="item.unread">
                  <a-avatar v-if="item.headUrl && item.headUrl.length>0" :src="item.headUrl" />
                  <a-avatar v-else>{{item.nickname.substring(0,1)}}</a-avatar>
                </a-badge>
              </div>
              <div class="ext">
                <div>
                  <a-icon type="loading" v-show="$store.getters.isSocketRun && item.loading" />
                  <a-popconfirm :title="$t('online.confirm.close')" @confirm="closeSession(item.sessionId)">
                    <a-icon type="close" v-show="$store.getters.isSocketRun && !item.loading" />
                  </a-popconfirm>
                </div>
                <div class="pt-1">
                  <span>{{item.formatLastTime}}</span>
                </div>
              </div>
              <div class="info">
                <h3 class="nickname">{{item.nickname}}</h3>
                <span class="more">{{item.lastChat}}</span>
              </div>
            </div>
          </div>
        </a-spin>
      </scroll>
    </a-layout-content>
    <a-layout-footer class="layout-footer-left">
      <span>{{$t('online.text')}}({{$store.getters.agent.maxServeCount}})</span>
      <a-switch
        :checkedChildren="$t('online.open')"
        :unCheckedChildren="$t('online.close')"
        :loading="$store.getters.loading.online"
        :checked="$store.getters.online"
        @change="handlerConnectionStateChange"
      />
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      loading: false,
      loadingMore: false,
      showLoadingMore: false,
      data: [1, 2, 3, 3, 3, 3, 3, 3, 3, 4, 3, 2],
      isConnectionStateLoading: false
    };
  },
  computed: {
    ...mapState({
      sessionList: state => state.chat.sessionList
    })
  },
  mounted() {},
  created() {},
  methods: {
    // 切换聊天对象
    handleUserChange(item) {
      this.$store.dispatch("setServiceObjects", item);
    },
    // 开启连接
    handlerConnectionStateChange(checked) {
      this.$store.dispatch("requestOnline", checked);
    },
    closeSession(sessionId) {
      this.$store.dispatch("requestCloseSession", {
        sessionId: sessionId,
        loading: true
      });
    }
  }
};
</script>