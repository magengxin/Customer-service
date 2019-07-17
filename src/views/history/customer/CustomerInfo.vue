<template>
  <div id="components-form-demo-advanced-search" class="customer-info border-t padding-b10">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">
            <a-form-item
                    label="客户 ID"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
            >
              <span >{{customerInfo.id}}</span>
            </a-form-item>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">
            <a-form-item
                    label="昵称"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"

            >
              <a-input
                      v-decorator="[
          'nickname',
          {rules: [{ required: false}],
          initialValue:customerInfo.nickname}
        ]"
                      v-if="isEditStatus"></a-input>
              <span v-else>{{customerInfo.nickname}}</span>
            </a-form-item>
          </div>
        </a-col>
      </a-row><a-row :gutter="16">
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">
            <a-form-item
                    label="姓名"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
            >
              <a-input
                      v-decorator="[
                          'name',
                          {rules: [{ required: false}],
                          initialValue:customerInfo.name}
                        ]"
                      v-if="isEditStatus"></a-input>
              <span v-else>{{customerInfo.name}}</span>
            </a-form-item>
          </div>
        </a-col>
      <a-col class="gutter-row" :span="8">
          <div class="gutter-box">
            <a-form-item
                    label="联系电话"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
            >
              <a-input
                      v-decorator="[
          'phone',
          {rules: [{ required: false}],
          initialValue:customerInfo.phone}
        ]"
                      v-if="isEditStatus"></a-input>
              <span v-else>{{customerInfo.phone}}</span>
            </a-form-item>
          </div>
        </a-col>
      <a-col class="gutter-row" :span="8">
          <div class="gutter-box">
            <a-form-item
                    label="电子邮件"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
            >
              <a-input
                      v-decorator="[
          'email',
          {rules: [{ required: false}],
          initialValue:customerInfo.email}
        ]"
                      v-if="isEditStatus"></a-input>
              <span v-else>{{customerInfo.email}}</span>
            </a-form-item>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">
            <a-form-item
                    label="性别"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
            >
              <a-select
                      size="small"
                      v-decorator="[
                        'sex',
                        {rules: [{ required: false }] ,
                        initialValue:customerInfo.sex}
                      ]"
                      v-if="isEditStatus"
              >
                <a-select-option value="0">男</a-select-option>
                <a-select-option value="1">女</a-select-option>
              </a-select>

              <span v-else>{{customerInfo.sex}}</span>
            </a-form-item>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">
            <a-form-item
                    label="省    市"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
            >
              <a-input
                      v-decorator="[
          'province',
          {rules: [{ required: false}],
          initialValue:customerInfo.province}
        ]"
                      v-if="isEditStatus"></a-input>
              <span v-else>{{customerInfo.province}}</span>
            </a-form-item>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">
            <a-form-item
                    label="联系地址"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
            >
              <a-input
                      v-decorator="[
          'address',
          {rules: [{ required: false}],
          initialValue:customerInfo.address}
        ]"
                      v-if="isEditStatus"></a-input>
              <span v-else>{{customerInfo.address}}</span>
            </a-form-item>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">
            <a-form-item
                    label="关注时间"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
            >
              <a-input
                      v-decorator="[
          'subscribeTs',
          {rules: [{ required: false}],
          initialValue:customerInfo.subscribeTs}
        ]"
                      v-if="isEditStatus"></a-input>
              <span v-else>{{customerInfo.subscribeTs}}</span>
            </a-form-item>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">
            <a-form-item
                    label="备注"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
            >
              <a-input
                      v-decorator="[
          'remark',
          {rules: [{ required: false}],
          initialValue:customerInfo.remark}
        ]"
                      v-if="isEditStatus"></a-input>
              <span v-else>{{customerInfo.remark}}</span>
            </a-form-item>
          </div>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button
                  size="small"
                  type="primary" v-if="!isEdit" @click="edit">{{$t('text.modify')}}
          </a-button>
          <a-button
                  type="primary"
                  html-type="submit"
                  v-if="isEdit"
                  size="small"
                  :style="{  marginLeft: '8px',marginRight: '10px' }"
          >{{$t('text.determine')}}
          </a-button>
          <a-button @click="cancelEdit"
                    size="small"
                    v-if="isEdit">{{$t('text.cancelInfo')}}
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import {mapState} from "vuex";

import {putCustomerInfo} from "@/api/history";

export default {
  data() {
    return {
      isEdit: false, // 是否编辑
      isEditStatus: false, // 是否编辑
      form: this.$form.createForm(this),
    };
  },
  computed: {
    ...mapState({
      customerInfo: state => state.history.customerInfo
    })
  },
  methods: {
    // 提交数据
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        values['channelCustomerId'] = this.customerInfo.channelCustomerId;
        values['channelCode'] = this.customerInfo.channelCode;
        values['id'] = this.customerInfo.id;

        if (values['sex'] == '男') {
          values['sex'] = 1
        } else {
          values['sex'] = 0
        }

        putCustomerInfo(values.id, values)
            .then(res => {
              if (res.code === 0) {
                this.$store.commit('changeSpinning', true);

                setTimeout(() => {
                  this.$store.commit('changeSpinning', false);

                  this.$message.success(res.msg);
                  this.cancelEdit();
                }, 1000);
              }
            })
            .catch(error => {
              console.log("error", error);
            })
      });
    },
    // 编辑数据
    edit() {
      this.isEditStatus = true;
      this.isEdit = true;
    },
    // 取消编辑
    cancelEdit() {
      this.isEditStatus = false;
      this.isEdit = false;
    },
    // 重置表单
    handleReset() {
      this.form.resetFields();
    }
  }
};
</script>
<style lang="less" scoped>

  .ant-advanced-search-form .ant-row.ant-form-item{
  margin-bottom: 0;
}
.ant-advanced-search-form .ant-form-item {
  display: flex;
}
.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}
#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>