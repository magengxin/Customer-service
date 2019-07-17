<template>
      <a-tabs
              defaultActiveKey="1"
              type="card"
              class="tabs-small"
              :style="{ height: '100%',border: '1px solid #ebedf0'}">
        <a-tab-pane
                :tab="$t('text.customer.basicMessage')"
                key="1"
                :style="{ height: '100%'}"
        >
          <div class="tab-content">
            <div>
              <span class="case-title mb10 bold">{{$t('text.customer.basicData')}}</span>
              <customer-info/>
            </div>

            <div class="padding-t10">
              <div class="case-title case-tit mb10 bold">{{$t('text.customer.assetsMessage')}}
                <a-icon type="sync" style="color: #1890ff;" @click="sync"></a-icon>
              </div>
              <customer-assets/>
            </div>

            <div class="padding-t10">
              <span class="case-title mb10 bold">{{$t('text.customer.caseMessage')}}</span>
              <case-info></case-info>
              <case-form></case-form>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane :tab="$t('text.customer.assetsMessage')" key="2"
                    :style="{ height: '100%'}">
          <div class="tab-content">
            <div>
              <span class="case-title mb10 bold">{{$t('text.customer.HPMessage')}}</span>
              <customer-asset/>
            </div>

            <div class="padding-t10">
              <span class="case-title mb10 bold">{{$t('text.customer.caseMessage')}}</span>
              <case-info></case-info>
              <case-form></case-form>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
</template>
<script>
import CustomerInfo from "./customer/CustomerInfo";
import CustomerAsset from "./customer/CustomerAsset";
import CustomerAssets from "./customer/customerAssets";
import CaseInfo from "./customer/CaseInfo";
import CaseForm from "./customer/Caseform";

export default {
  name: "tabs",
  components: {
    CustomerInfo,
    CustomerAsset,
    CustomerAssets,
    CaseInfo,
    CaseForm
  },
  data() {
    return {};
  },
  methods: {
    sync(){
      this.$store.commit('changeSpinning', true); // 修改全局页面loading

      setTimeout(() => {
        this.$store.commit('changeSpinning', false);
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
.tabs /deep/ .ant-row{
  margin-right: 0!important;
}
.ant-tabs-content,
.case-content {
  padding: 6px 0;
}
 .case-title{
  display: block;
  padding-left: 3px;
  border-left: 5px #1890ff solid;
  color: #000;
}
  .mb10{
    margin-bottom: 10px;
  }
  .case-tit{
    overflow: hidden;
  }
  .case-tit i{
    float: right;
    margin-right: 12px;
    cursor: pointer;
  }

  .tab-content{
    height: 100%;
    padding-bottom: 40px;
    overflow-y: scroll;
  }
</style>
