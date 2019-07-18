<template>
  <div class="customerAsset pb-3 border-t">
    <div class="case-title case-tit mb-2 font-weight-bold">{{$t('text.customer.assetsMessage')}}
      <a-icon type="sync" style="color: #1890ff;" @click="sync"></a-icon>
    </div>
    <scroll>
      <div class="collapse">
        <div class="collapse-content" v-for="item in customerAssetData" :key="item.id">
          <div class="collapse-head" @click="show">
            <div class="item">

              <div class="text-truncate">
                <span>Modal  :  {{item.productName}}</span>
              </div>
              <div class="text-truncate">
                <span>SN : {{item.sn}}</span>
              </div>
              <div class="text-truncate">
                <span>PN : {{item.pn}}</span>
              </div>

            </div>
          </div>
          <div class="collapse-main" v-if="toggleItem">
            <div class="item">
              <div class="text-truncate">
                <span>基本保修</span>
              </div>
              <div class="text-truncate line-through">
                <a href=""><span>HP链接(上门服务)</span></a>
              </div>
              <div class="text-truncate">
                <span>{{subscribeTs}}  ~  {{subscribeTsend }}</span>
              </div>
              <div class="text-truncate warrantyJson">
                <span>保修期内</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </scroll>
  </div>
</template>

<script>
  import {delCustomerProduct, getCustomerProduct, csPutCustomerProduct, csPostCustomerProduct} from "@/api/history";

  export default {
    name: "CustomerAsset",
    data() {
      return {
        toggleItem: false,
        warrantyJson: '', // 保修信息
        subscribeTs: '', // 保修信息
        customerProductId: 0, // 当前客户id
        expandRowByClick: false, // 页面是否支持二级table展开
        customerAsset: [
          {title: "产品线", dataIndex: "pl", key: "pl"},
          {title: "产品名称", dataIndex: "productName", key: "productName"},
          {title: "PN", dataIndex: "pn", key: "pn"},
          {title: "SN", dataIndex: "sn", key: "sn"},
          {
            title: "操作",
            key: "operation",
            scopedSlots: {customRender: "operation"}
          }
        ],
        customerAssetData: [],
        innerColumns: [
          {title: "保修类型", dataIndex: "date", key: "date"},
          {title: "服务类型", dataIndex: "name", key: "name"},
          {title: "开始日期", dataIndex: "status", key: "state"},
          {title: "结束日期", dataIndex: "upgradeNum", key: "upgradeNum"},
          {
            title: "状态(点击刷新)",
            dataIndex: "operation",
            key: "operation",
            scopedSlots: {customRender: "operation"}
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
        modelTitle: '', // 弹出框
        editData: {
          id: 88,
          pl: ")JL",
          pn: "q4[",
          productName: "#VPtM",
          sn: "^xHXiT&",
          warrantyJson: "%ornA3"
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
              this.warrantyJson = res.data.products[0].warrantyJson
              this.subscribeTs = res.data.subscribeTs
              this.subscribeTsend = res.data.subscribeTsend
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
      formItemLayout() {
        const {formLayout} = this;
        return formLayout === 'horizontal' ? {
          labelCol: {span: 4},
          wrapperCol: {span: 14},
        } : {};
      },
      buttonItemLayout() {
        const {formLayout} = this;
        return formLayout === 'horizontal' ? {
          wrapperCol: {span: 14, offset: 4},
        } : {};
      },
    },
    methods: {
      sync() {
        this.$store.commit('changeSpinning', true); // 修改全局页面loading

        setTimeout(() => {
          this.$store.commit('changeSpinning', false);
        }, 1000);
      },
      show() {
        this.toggleItem = !this.toggleItem
      },
      // 删除客户产品信息
      del(id) {
        const dataSource = [...this.customerAssetData];
        this.customerAssetData = dataSource.filter(item => item.id !== id);
        delCustomerProduct(id)
            .then(res => {
              if (res.code === 0) {
                this.$message.success('刪除成功');
              }
            })
            .catch(error => {
              console.log("error", error);
            });
      },
      // 显示保修结果
      toggle() {
        this.expandRowByClick = true;
        setTimeout(() => {
          this.expandRowByClick = false
        }, 30)
      },
      // 弹出编辑产品信息框
      showModal(tag, data) {
        if (tag == 'edit') {
          this.checkNick = true;
          this.tag = 'edit';
          this.modelTitle = this.$t('text.asset.editProducts');

          this.editData = JSON.parse(JSON.stringify(data));
          delete this.editData.productLine;
        } else if (tag == 'add') {
          this.checkNick = false;
          this.tag = 'add';

          this.modelTitle = this.$t('text.asset.addingProducts')
        }
        this.visible = true;
      },
      // 关闭弹框
      closeModal() {
        for (let item in this.editData) {
          this.editData[item] = ''
        }
      },
      // 提交
      handleOk() {
        if (this.tag == 'edit') {
          this.confirmLoading = true;
          setTimeout(() => {
            this.confirmLoading = false;
          }, 1000);

          this.csPutCustomerProduct(this.editData.id, this.editData)
        } else if (this.tag == 'add') {
          this.checkNick = true;

          delete this.editData.id

          this.confirmLoading = true;
          setTimeout(() => {
            this.confirmLoading = false;
          }, 1000);

          this.csPostCustomerProduct(this.editData)
        }
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
      }
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

  /* 边框样式 */
  .ant-collapse > .ant-collapse-item[data-v-7bcf402d] {
    border-bottom: none;
  }

  .ant-collapse > .ant-collapse-item {
    border-bottom: none;
  }

  .customerAsset {
    padding: 6px 12px;
    color: #000;
  }

  .line-through {
    text-decoration: underline;
  }

  /* 标题样式 */
  .case-tit {
    overflow: hidden;
  }

  .case-tit i {
    float: right;
    margin-right: 12px;
    cursor: pointer;
  }

  /* 内容样式 */
  .collapse-head .item,
  .collapse-main .item {
    display: flex;
    justify-content: center;
    padding: 10px;
    font-size: 14px;
  }

  .collapse-head .item {
    div {
      padding-right: 16px;

      &:nth-child(1) {
        width: 50%;
      }

      &:nth-child(2) {
        width: 30%;
      }

      &:nth-child(3) {
        width: 20%;
      }
    }
  }

  .collapse-main {
    background: #eee;

    a {
      color: #000;
    }

    .warrantyJson {
      color: #51CF59;
    }

    .item {
      div:nth-child(1) {
        width: 14%;
      }

      div:nth-child(2) {
        width: 40%;
      }

      div:nth-child(3) {
        width: 30%;
      }

      div:nth-child(4) {
        width: 20%;
      }
    }
  }

</style>
