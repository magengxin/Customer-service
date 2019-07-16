<template>
  <div class="im-chat-main">
    <ul>
      <li v-for="(item,index) in data" :key="index"  :class="{'im-chat-mine':(item.sendType=='Agent' || item.sendType=='System')}">
        <!-- 客户 -->
        <div class="im-chat-user" v-if="item.sendType==='Customer'">
          <a-avatar v-if="customerAvatar" size="large" :src="customerAvatar" />
          <a-avatar v-else-if="item.sendName" size="large">{{item.sendName.substring(0,1)}}</a-avatar>
          <a-avatar v-else style="backgroundColor:#87d068" icon="user"  size="large"/>
          <cite>
            {{item.sendName}}<i>{{item.sendTs}}</i>
          </cite>
        </div>
        <!-- 客服/系统 -->
        <div class="im-chat-user" v-else>
          <img  size="large" src="@/assets/logo.png" />
          <cite>
            <a-icon v-show="item.isSendSuccess===-1" type="loading" />
            <a-tooltip>
              <template slot='title'>
                {{item.errormsg}}
              </template>
              <span v-show="item.isSendSuccess!=-1 && item.isSendSuccess!=0" class="ant-tag ant-tag-pink">发送失败</span>
            </a-tooltip>
            <i>{{item.sendTs}}</i>{{item.sendName}}
          </cite>
        </div>
        <!-- 内容 -->
        <div class="im-chat-text">
          <span v-if="item.msgType==='Text'" v-html="item.msgContent"></span>
          <img v-else :src="item.msgContent"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ChatContent",
  props: {
    data: Array,
    customerAvatar:String
  }
};
</script>

