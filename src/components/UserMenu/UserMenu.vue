<template>
  <div>
    <div class="content-box">
      <span class="mr-3 usecode">PINCODE:{{$store.getters.pinCode}}</span>
      <lang-select class="langico"/>
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu userinfo">
          <span>Admin(admin@hp.com)</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="1">
            <a href="javascript:;">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
import LangSelect from "@/components/LangSelect/LangSelect";
export default {
  components: {
    LangSelect
  }
};
</script>

<style scoped>
.action .avatar {
  margin: 8px 8px 8px 0;
}

</style>
<style lang="less" scoped>
/* 0626 */
.content-box{
  position: relative;
  .usecode{
    position: absolute;
    top: -20px;
    right: -7px;
    height: 1px;
  }
  .langico{
    border-right: 1px solid #f1f3f5;
    height: 48px;
    display: inline-block;
    line-height: 48px;
    padding: 0 10px;
    float: left;
    margin-right: 10px;
    transition: all .3s;
  }
  .userinfo{
    margin:8px 8px 8px 0;
  }
  .langico:hover{
    background: #f9f9f9;
  }
}
</style>

