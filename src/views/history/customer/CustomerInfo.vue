<template>
  <div id="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-row :gutter="24">
        <a-col
          v-for="(item,index) in userInfo"
          :key="index"
          :span="item.isFull ? 24 : 12"
          :style="{ textAlign: 'left' }"
        >
          <a-form-item :label="item.label" :label-col="{ span: item.isFull ? 4 : 8}">
            <a-input
              :style="{ display: item.isEditStatus ? 'block' : 'none' }"
              v-decorator="[
                item.label,
                {
                  rules: [{
                    required: item.isRequired,
                    message: 'Input something!',
                  }],
                  initialValue:item.value
                }
              ]"
              placeholder
            ></a-input>
            <span class="text-truncate"
                  :style="{width:'120px', display: !item.isEditStatus ? 'block' : 'none', color:'#000'}">{{item.value}}</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button
            type="primary"
            html-type="submit"
            v-if="isEdit"
            size="small"
            :style="{  marginLeft: '8px',marginRight: '10px' }"
          >{{$t('text.determine')}}</a-button>
          <a-button @click="cancelEdit"
                    size="small"
                    v-if="isEdit">{{$t('text.cancelInfo')}}
          </a-button>
          <a-button
                  size="small"
                  type="primary" html-type="submit" v-if="!isEdit" @click="edit">{{$t('text.modify')}}
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
      form: this.$form.createForm(this),
      // 客户基本信息
      docData: { // 数据字典
        "id":"OPEN ID",
        "name": "姓名",
        "nickname": "昵称",
        "sex": "性别",
        "city": "城市",
        "province": "省",
        "address": "联系地址",
        "phone": "联系电话",
        "email": "电子邮件",
        "subscribeTs": "关注时间",
        "customerType": "会员级别",
        "remark":"备注"
      },
      userInfo: [
        {
          label: "OPEN ID",
          value: "100",
          isFull: true, // 是否单行显示
          isEditStatus: false, // 改变编辑状态
          disable: true, // 禁止修改
          tag: 'id'
        },
        {label: "姓名", value: "卢丽", isRequired: '', isEditStatus: false, tag: 'name'},
        {label: "昵称", value: "邱娟", isEditStatus: false, tag: 'nickname'},
        {label: "性别", value: "男", isRequired: '', isEditStatus: false, tag: 'sex'},
        {label: "城市", value: "新竹县", isRequired: '', isEditStatus: false, tag: 'city'},
        {label: "省", value: "江苏省", isRequired: '', isEditStatus: false, tag: 'province'},
        {label: "联系地址", value: "贵州省 黔西南布依族苗族自治州 兴仁县", isRequired: '', isEditStatus: false, tag: 'address'},
        {label: "联系电话", value: "15555555555", isRequired: '', isEditStatus: false, tag: 'phone'},
        {label: "电子邮件", value: "x.qwpl@tsj.am", isEditStatus: false, tag: 'email'},
        {label: "关注时间", value: "2019-05-05 17:17:17", isEditStatus: false, tag: 'subscribeTs'},
        {label: "会员级别", value: "大客户", isEditStatus: false, tag: 'customerType'},
        {label: "备注", value: "", isFull: true, isEditStatus: false, tag: 'remark'}
      ]
    };
  },
  computed: {
    ...mapState({
      customerInfo: state => state.history.customerInfo
    })
  },
    watch: {
      customerInfo() {
        this.userInfo.forEach((v) => {
          let data = this.customerInfo;
          for (let key in data) {
            if (v.tag == key) {
              v.value = data[key]
            }
          }
        });
      },
    },
  methods: {
    // 提交数据
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        let obj = {};
        obj.channelCustomerId = this.customerInfo.channelCustomerId;
        obj.channelCode = this.customerInfo.channelCode;

        for(let item in this.docData) {
          obj[item] = values[this.docData[item]]
        }

        putCustomerInfo(obj.id, obj)
            .then(res => {
              if (res.code === 0) {
                this.$message.success(res.msg);
                this.cancelEdit();
              }
            })
            .catch(error => {
              console.log("error", error);
            })
      });
    },
    // 编辑数据
    edit() {
      this.userInfo.forEach((v) => {
        if (v.isRequired === '') {
          v.isRequired = true
        }
        v.disable ? v.isEditStatus = false : v.isEditStatus = true
      });
      this.isEdit = true
    },
    // 取消编辑
    cancelEdit() {
      this.userInfo.forEach((v) => {
        if (v.isRequired) {
          v.isRequired = ''
        }

        v.isEditStatus = false;
      });
      this.isEdit = false;
      this.form.resetFields();
    },
    // 重置表单
    handleReset() {
      this.form.resetFields();
    }
  }
};
</script>
<style>
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