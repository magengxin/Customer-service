<template>
  <div class="customerAsset padding-b10 border-t">
    <scroll>
      <a-table
        :columns="customerAsset"
        :dataSource="customerAssetData"
        :pagination="pagination"
        :expandIconAsCell="false"
        :expandIconColumnIndex="-1"
        :expandRowByClick="expandRowByClick"
        bordered
        rowKey="id"
        class="components-table-demo-nested"
      >
        <span slot="operation" slot-scope="text,record">
          <a href="javascript:;" @click="showModal('edit',record)">{{$t('text.asset.editInfo')}}</a>
          <a-divider type="vertical"></a-divider>
          <a-popconfirm
            v-if="customerAssetData.length"
            title="Sure to delete?"
            @confirm="() => del(record.id)">
          <a href="javascript:;">{{$t('text.asset.deleteInfo')}}</a>
        </a-popconfirm>
          <a-divider type="vertical"></a-divider>
          <a href="javascript:;" @click="toggle">{{$t('text.asset.guaranteeInfo')}}</a>
        </span>
        <a-table
          slot="expandedRowRender"
          slot-scope="text"
          :columns="innerColumns"
          :dataSource="innerData"
          bordered
          :pagination="false"
        >
          <a slot="operation" slot-scope="text" class="table-operation">{{warrantyState}}</a>
        </a-table>
      </a-table>
      <a-button
        type="primary"
        size="small"
        @click="showModal('add')"
        style="float: right; margin: 10px 5px;"
      >{{$t('text.asset.addProducts')}}</a-button>
    </scroll>

    <a-modal v-model="visible" :title="modelTitle" @ok="handleOk" :confirmLoading="confirmLoading" closable @cancel="closeModal" class="customer-asset">
      <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
        <a-form-item
          :label="$t('text.asset.productsLine')"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'pl',
              {rules: [{ required: false, message: '请输入您的产品线!' }],
              initialValue: editData.pl
            }]"
          ></a-input>
        </a-form-item>
        <a-form-item
          :label="$t('text.asset.productsName')"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'productName',
              {rules: [{ required: false, message: '请输入您的产品名称!' }],
              initialValue: editData.productName
            }]"
          ></a-input>
        </a-form-item>
        <a-form-item
          :label="$t('text.asset.productsPn')"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
                   v-decorator="[
              'pn',
              {rules: [{ required: checkNick, message: '请输入您的产品PN!' }],
              initialValue: editData.pn
            }]"
          ></a-input>
        </a-form-item>
        <a-form-item
          :label="$t('text.asset.productsSn')"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
                   v-decorator="[
              'sn',
              {rules: [{ required: checkNick, message: '请输入您的产品SN!' }],
              initialValue: editData.sn
            }]"
          ></a-input>
        </a-form-item>
        <a-form-item
          :label="$t('text.asset.productsGuaranteeInfo')"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
                   v-decorator="[
              'warrantyJson',
              {rules: [{ required: checkNick, message: '请输入您的产品保修信息!' }],
              initialValue: editData.warrantyJson
            }]"
          ></a-input>
        </a-form-item>
        <button html-type="submit" ref="aa" class="submitPpacity"></button>

      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  import {delCustomerProduct, getCustomerProduct, csPutCustomerProduct, csPostCustomerProduct} from "@/api/history";
export default {
  name: "CustomerAsset",
  data() {
    return {
      warrantyState: '', // 保修信息
      customerProductId: 0, // 当前客户id
      expandRowByClick: false, // 页面是否支持二级table展开
      customerAsset: [
        { title: "产品线", dataIndex: "pl", key: "pl" },
        { title: "产品名称", dataIndex: "productName", key: "productName" },
        { title: "PN", dataIndex: "pn", key: "pn" },
        { title: "SN", dataIndex: "sn", key: "sn" },
        {
          title: "操作",
          key: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      customerAssetData: [],
      innerColumns: [
        { title: "保修类型", dataIndex: "date", key: "date" },
        { title: "服务类型", dataIndex: "name", key: "name" },
        { title: "开始日期", dataIndex: "status", key: "state" },
        { title: "结束日期", dataIndex: "upgradeNum", key: "upgradeNum" },
        {
          title: "状态(点击刷新)",
          dataIndex: "operation",
          key: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      innerData: [
        {
          key: 1,
          date: "Tproduction",
          name: "类型",
          status: "2014-12-24 23:12:00",
          upgradeNum: "2014-12-24 23:12:00"
        }
      ],
      pagination: false,
      loading: false,
      visible: false, // 弹出框显示状态
      modelTitle:'', // 弹出框
      editData: {
        id: 88,
        pl: ")JL",
        pn: "q4[",
        productName: "#VPtM",
        sn: "^xHXiT&",
        warrantyState: "%ornA3"
      },
      formLayout: 'horizontal',
      tag: '', // 编辑与添加区分标识
      confirmLoading: false, // 保存动画
      checkNick: true, // 验证状态
      form: this.$form.createForm(this),
    };
  },
  created() {
    getCustomerProduct(1)
        .then(res => {
          if (res.code === 0) {
            this.customerAssetData = res.data.products;
            this.warrantyState = res.data.products[0].warrantyJson
          }
        })
        .catch(error => {
          console.log("error", error);
        });
  },
  mounted() {
    this.closeModal()
  },
  computed: {
    ...mapState({
      customerInfo: state => state.history.customerInfo
    }),
    formItemLayout () {
      const { formLayout } = this;
      return formLayout === 'horizontal' ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      } : {};
    },
    buttonItemLayout () {
      const { formLayout } = this;
      return formLayout === 'horizontal' ? {
        wrapperCol: { span: 14, offset: 4 },
      } : {};
    },
  },
  watch: {
    customerAssetData() {
      if (this.customerAssetData.length < 6) {
        this.pagination = false
      } else {
        this.pagination = {
          pageSize: 5,
          size: 'small'
        }
      }
    }
  },
  methods: {
    // 删除客户产品信息
    del (id) {
      delCustomerProduct(id)
          .then(res => {
            if (res.code === 0) {
              this.$store.commit('changeSpinning', true); // 修改全局页面loading

              setTimeout(() => {
                this.$store.commit('changeSpinning', false);

                const dataSource = [...this.customerAssetData];
                this.customerAssetData = dataSource.filter(item => item.id !== id);

                this.$message.success('刪除成功');
              }, 1000);
            }
          })
          .catch(error => {
            console.log("error", error);
          });
    },
    // 显示保修结果
    toggle () {
      this.expandRowByClick = true;
      setTimeout(() => {
        this.expandRowByClick = false
      },30)
    },
    // 弹出编辑产品信息框
    showModal(tag, data) {
      this.checkNick = true;
      if (tag == 'edit') {
        this.tag = 'edit';
        this.modelTitle = this.$t('text.asset.editProducts');

        this.editData = JSON.parse(JSON.stringify(data));
        delete this.editData.productLine;
      } else if (tag == 'add') {
        this.checkNick = true;
        this.tag = 'add';
        this.modelTitle = this.$t('text.asset.addingProducts')
      }
      this.visible = true;
    },
    // 关闭弹框
    closeModal() {
      this.form.resetFields();
      for (let item in this.editData){
        this.editData[item] = ''
      }
    },
    // 提交
    handleOk() {
      this.$refs.aa.click();
    },
    csPutCustomerProduct(id, data) {
      csPutCustomerProduct(id, data)
          .then(res => {
            if (res.code === 0) {
              this.loading = true;

              setTimeout(() => {
                this.visible = false;
                this.loading = false;
                this.closeModal();

                this.$message.success('编辑成功');
              }, 1000);
            }
          })
          .catch(error => {
            console.log("error", error);
          })
    },
    csPostCustomerProduct(data) {
      csPostCustomerProduct(data)
          .then(res => {
            if (res.code === 0) {
              this.loading = true;

              setTimeout(() => {
                this.visible = false;
                this.loading = false;
                this.closeModal();

                this.$message.success('添加成功');
              }, 1000);
            }
          })
          .catch(error => {
            console.log("error", error);
          })
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let { channelCode, channelCustomerId} = this.customerInfo;
          values['channelCode'] = channelCode;
          values['channelCustomerId'] = channelCustomerId;

          if (this.tag == 'edit') {
            this.confirmLoading = true;
            setTimeout(() => {
              this.confirmLoading = false;
            }, 1000);
            this.csPutCustomerProduct(this.editData.id, values)
          } else if (this.tag == 'add') {

            this.confirmLoading = true;
            setTimeout(() => {
              this.confirmLoading = false;
            }, 1000);

            this.csPostCustomerProduct(values)
          }
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
.customerAsset /deep/ .ant-tabs-bar {
  margin: 0 0 8px 0;
}
.customerAsset /deep/ .ant-form-item {
  margin-bottom: 0;
}
.customerAsset /deep/ .ant-input {
  height: 24px;
}
.customerAsset /deep/ .ant-form-item-label {
  width: 90px;
  padding-left: 10px;
  text-align: left;
}
.customerAsset /deep/ .ant-form-item-label {
  line-height: 30px;
}
.customerAsset /deep/ .ant-form-item-control {
  line-height: 30px;
}
.customerAsset /deep/ form textarea.ant-input {
  width: 494px;
}
.customerAsset /deep/ .ant-form-item-required:before {
  margin: 0;
}
</style>
