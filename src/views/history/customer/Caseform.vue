<template>
  <div class="caseFrom">
    <a-form :form="form" @submit="handleSubmitContent">
    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="24" style="width: 100%;" class="">
        <a-row :gutter="24" type="flex" align="top">
          <a-col :span="3" align="right">
            <span>Case模板:</span>
          </a-col>
          <a-col :span="20">
            <template v-for="item in caseTempList">
              <a-checkable-tag
                      :key="item.id"
                      :checked="false"
                      @change="(checked) => handleChange(item, checked)"
              >【{{item.title}}】
              </a-checkable-tag>
            </template>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="24" style="width: 100%;" class="">

        <a-row :gutter="24">
          <a-col :span="3" align="right" class="">
            <span>Q&A</span>
          </a-col>
          <a-col :span="20">
            <a-form-item
            >
            <a-textarea placeholder=""
                        v-decorator="[
          'caseContent',
          {rules: [{ required: true, message: 'Please enter the content!' }],
            initialValue: caseData.caseContent}
        ]"

                        :autosize="{ minRows: 4, maxRows: 20 }"
                        style="width: 100%; height: 120px;"></a-textarea>

            </a-form-item>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="24" style="width: 100%;" class="cloAuto">

        <a-row :gutter="24" type="flex" align="top">
          <a-col :span="3" align="right">
            <span>问题内容:</span>
          </a-col>
          <a-col :span="12" :class="{ 'scroll-relative': scrollStatus }">
            <a-input-search v-model="caseData.question" @search="onSearch" enterButton="搜索" size="small"></a-input-search>

            <scroll class="scroll-positon" v-show="scrollStatus">
              <a-table :columns="columns" :dataSource="this.caseList" bordered :customRow="customRow" :rowKey="rowKey">
              </a-table>
            </scroll>
          </a-col>

          <a-col :span="3" align="right" class="validate">
            <span>推荐SPOS:</span>
          </a-col>
          <a-col :span="4">
            <a-form-item
            >
            <a-radio-group    class="width-radio-auto" @change="changeSpos"
                              v-decorator="[
          'spos',
          {rules: [{ required: true, message: 'Please select the content！' }],
            initialValue: ''}
        ]"
            >
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
            </a-form-item>

          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="24" style="width: 100%;" class="">
        <a-row :gutter="24" type="flex" align="top">

          <a-col :span="3" align="right" class="validate">
            <span>主要类别:</span>
          </a-col>
          <a-col :span="4">
            <a-form-item
            >

            <a-select
                    class="width-auto"
                    size="small"
                    v-decorator="[
          'symptomTopCategory',
          {rules: [{ required: true, message: 'Please select the content！' }],
          initialValue: caseData.symptomTopCategory
            }
        ]"
                    @change="handleSymptomTopCategoryChange"
            >
              <a-select-option value="100" disabled>---请选择---</a-select-option>

              <a-select-option :value="index" v-for="(item,index) in symptomTopCategory" :key="index">{{item.name}}
              </a-select-option>

            </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="3" align="right" class="validate">
            <span>子类别:</span>
          </a-col>
          <a-col :span="4">
            <a-form-item
            >
            <a-select
                    class="width-auto"

                    size="small"
                    v-decorator="[
          'symptomSubCategory',
          {rules: [{ required: true, message: 'Please select the content！' }],
            initialValue: caseData.symptomSubCategory}
        ]"
                    @change="handleSymptomSubCategoryChange"
            >
              <a-select-option value="100" disabled>---请选择---</a-select-option>
              <a-select-option :value="index" v-for="(item,index) in symptomSubCategory" :key="index">{{item.name}}
              </a-select-option>
            </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="3" align="right" class="validate">
            <span>详细类别:</span>
          </a-col>
          <a-col :span="4">
            <a-form-item
            >
            <a-select
                    class="width-auto"

                    size="small"
                    v-decorator="[
          'symptomSpecific',
          {rules: [{ required: true, message: 'Please select the content！' }],
            initialValue: caseData.symptomSpecific}
        ]"
            >
              <a-select-option value="100" disabled>---请选择---</a-select-option>
              <a-select-option :value="index" v-for="(item,index) in symptomSpecific" :key="index">{{item.name}}
              </a-select-option>
            </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="24" style="width: 100%;" class="">
        <a-row :gutter="24" type="flex" align="middle">

          <a-col :span="3" align="right">
            <span>接入渠道:</span>
          </a-col>
          <a-col :span="4">
            <a-select
                    class="width-auto"
                    size="small"
                    v-model="caseData.caseSource"
                    v-decorator="[
          'caseSource',
          {rules: [{ required: false, message: 'Please select the content！' }],
            initialValue: caseData.caseSource}
        ]"
            >
              <a-select-option value="10000" disabled>---请选择---</a-select-option>

              <a-select-option :value="item.code" v-for="item in caseSource" :key="item.code">{{item.name}}
              </a-select-option>
            </a-select>
          </a-col>

          <a-col :span="3" align="right" >
            <span>接入入口:</span>
          </a-col>
          <a-col :span="4">
            <a-select
                    class="width-auto"
                    size="small"
                    v-model="caseData.caseSourceName"
                    v-decorator="[
          'caseSourceName',
          {rules: [{ required: false, message: 'Please select the content！' }],
            initialValue: caseData.caseSourceName}
        ]"
            >
              <a-select-option value="10000" disabled>---请选择---</a-select-option>

              <a-select-option :value="item.name" v-for="item in caseSourceList" :key="item.id">{{item.name}}
              </a-select-option>
            </a-select>
          </a-col>

          <a-col :span="3" align="right" >
            <span>case类别:</span>
          </a-col>
          <a-col :span="4">
            <a-select
                    class="width-auto"
                    size="small"
                    v-model="caseData.caseType"
                    v-decorator="[
          'caseType',
          {rules: [{ required: false, message: 'Please select the content！' }],
            initialValue: caseData.caseType}
        ]"
            >
              <a-select-option value="10000" disabled>---请选择---</a-select-option>

              <a-select-option :value="item.id" v-for="item in caseTypeList" :key="item.id">{{item.name}}
              </a-select-option>
            </a-select>
          </a-col>

        </a-row>
      </a-col>
    </a-row>

    <a-row :gutter="24" style="margin-top: 10px;" type="flex" justify="space-around">
      <a-col :span="2">
        <a-button type="primary" style="height: 24px;" @click="addQAModal" :disabled='!disabledButon'>新增Note</a-button>
      </a-col>
      <a-col :span="6">
        <a-button type="primary"
                  html-type="submit"
                  style=" height: 24px;"  :disabled='disabledButon'>保存</a-button>
        <a-button type="primary"
                  html-type="submit"
                  style="margin-left: 10px;height: 24px;"
                  :disabled='disabledCloseButon'>关闭
        </a-button>
      </a-col>
    </a-row>
    </a-form>

    <a-modal
            v-model="addQAModalVisible"
            :title="addQATitle"
            onOk="handleOk"
            @cancel="clearModal"
    >
      <template slot="footer">
        <a-button key="back" @click="addQAModalhandleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click.stop.prevent="addQAModalhandleOk">保存</a-button>
      </template>

      <a-form  :form="form1" @submit="handleSubmit">
        <a-form-item
                label="内容"
                :label-col="formLayout.labelCol"
                :wrapper-col="formLayout.wrapperCol"
        >
          <a-textarea placeholder=""
                      :autosize="{ minRows: 4, maxRows: 20 }"
                      style="width: 100%; height: 120px;"
                      v-decorator="[
          'caseContent',
          {rules: [{ required: true, message: 'Please enter the content' }],
            }
        ]"
          ></a-textarea>

        </a-form-item>
        <a-button type="primary" ref="aa" class="submitPpacity"
                  html-type="submit">提交
        </a-button>
      </a-form>
    </a-modal>

  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {
    postCaseTemplate,
    postCaseTypeList,
    getCaseSource,
    getServiceList,
    postCase,
    putCase,
    postCaseSymptom,
    postCaseTreeSymptom,
    postCaseContent
  } from "@/api/history";

export default {
  name: "CaseForm",
  data() {
    return {
      disabledButon: true, // 按钮状态
      disabledCloseButon: true, // 关闭按钮状态
      data: [],
      columns: [{
        title: '关键字',
        dataIndex: 'keyword',
      },{
        title: '问题',
        className: 'column-money',
        dataIndex: 'question',
      },{
        title: '备注',
        dataIndex: 'remark',
      }],
      scrollStatus: false, // 搜索结果
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      formLayout: {
        labelCol: {span: 4},
        wrapperCol: {span: 14},
      },
      caseTempList: [{
        caseTypeId: 1032,
        caseTypeName: "技术升级0",
        id: 1000000000,
        templateContent: "模板内容0",
        title: "模板0"
      }], // CASE模版列表
      caseSourceList: [{
        id: 0,
        name: "售前"
      },{
        id: 1,
        name: "售后"
      },{
        id: 2,
        name: "PINCODE"
      },{
        id: 3,
        name: "工作组"
      },],
      caseTypeList: [{
        id: 100000,
        isVaild: 0,
        caseTypeName: "0]z%S6d",
        sortIndex: 1
      }], // CASE类型列表
      caseSource: [{
        name: "惠普服务公众号",
        code: "10000"
      }], // CASE来源
      serviceList: [{
        createTs: "2019-05-14 11:25:16",
        id: 10000009,
        isEnable: 1,
        name: "win10",
        sortIndex: 11
      }], // 操作系统
      symptomTopCategory:[],
      symptomSubCategory:[],
      symptomSpecific:[],
      caseData: {
        caseContent: '',
        caseContentTemp: '',
        customerId: 0,
        caseSourceName: '10000',
        question: '',
        symptomTopCategory: '100',
        symptomSubCategory: '100',
        symptomSpecific: '100',
        CNF: '',
        sn: '',
        pn: '',
        productsNumber: '1',
        productsLine: '0',
        caseSource: '10000',
        caseType: '10000',
        servers: '0',
        spos: '',
        workerEmail: '', // 添加Note弹框 workerEmail
      }, // CASE数据
      caseList: [], // case列表
      loading: false,
      addQAModalVisible: false, // 添加Note弹框
      addQATitle: '', // 添加Note弹框 title
      caseIndex: '1', // case列表默认选项
      customRow: (record) => {
        return {
          on: {
            click: () => {
              this.caseData.symptomTopCategory = record.symptomTopCategory;
              this.caseData.symptomSubCategory = record.symptomSubCategory;
              this.caseData.symptomSpecific = record.symptomSpecific;
              this.scrollStatus = false;
            }
          }
        };
      },
      rowKey: (record) => {
        return record.keyword
      }
    };
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState({
      caseInfo: state => state.history.caseInfo,
      customerInfo: state => state.history.customerInfo,
      emptyForm: state => state.history.emptyForm,
    }),
  },
  watch: {
    caseInfo() {
      let { status , contents} = this.caseInfo;

      if (status == 'close') {
        this.disabledButon = true;
        this.disabledCloseButon = true
      } else if(status == 'open' && contents[0].content){
        this.disabledButon = false;
        this.disabledCloseButon = false
      }else{
        this.disabledButon = false;
        this.disabledCloseButon = true
      }
      this.caseData.caseContent = this.caseInfo.contents[0].content;
      this.caseData.caseType = this.caseInfo.caseType;
      this.caseData.caseSource = this.caseInfo.channelName;
      this.caseData.caseSourceName = this.caseInfo.channelSource;
      this.caseData.spos = this.caseInfo.spos;
      this.caseData.question = this.caseInfo.symptomQuestion;

      this.caseData.symptomTopCategory = this.caseInfo.symptomTopCategory;
      if(this.caseData.symptomTopCategory != 100) {
        this.caseData.symptomSubCategory = this.caseInfo.symptomSubCategory;
      }
      if(this.caseData.symptomSubCategory != 100) {
        this.caseData.symptomSpecific = this.caseInfo.symptomSpecific;
      }

      setTimeout(() => {
        this.$store.commit('changeSpinning', false);
      }, 1000);
    },
    emptyForm(){
      for (var i in this.caseData) {
        this.caseData[i] = ''
      }
    }
  },
  methods: {
    init() {
      // 获取case信息
      this.getInfo();
      // 查询CASE模板列表
      this.postCaseTemplate();
      // 查询CASE类型列表
      this.postCaseTypeList();
      // 查询CASE来源
      this.getCaseSource();
      // 查询操作系统列表
      this.getServiceList();
      // 查询CASE症状代码树
      this.postCaseTreeSymptom()
    },
    // 获取case信息
    getInfo(){
      let { status , contents} = this.caseInfo;

      if (status == 'close') {
        this.disabledButon = true;
        this.disabledCloseButon = true
      } else if(status == 'open' && contents[0].content){
        this.disabledButon = false;
        this.disabledCloseButon = false
      }else{
        this.disabledButon = false;
        this.disabledCloseButon = true
      }

      this.caseData.caseContent = this.caseInfo.contents[0].content;
      this.caseData.caseType = this.caseInfo.caseType;
      this.caseData.caseSource = this.caseInfo.channelName;
      this.caseData.caseSourceName = this.caseInfo.channelSource;
      this.caseData.spos = this.caseInfo.spos;
      this.caseData.question = this.caseInfo.symptomQuestion;

      this.caseData.symptomTopCategory = this.caseInfo.symptomTopCategory;
      if(this.caseData.symptomTopCategory != 100) {
        this.caseData.symptomSubCategory = this.caseInfo.symptomSubCategory;
      }
      if(this.caseData.symptomSubCategory != 100) {
        this.caseData.symptomSpecific = this.caseInfo.symptomSpecific;
      }

    },
    // 查询CASE模板列表
    postCaseTemplate() {
      let orgCode = this.$store.getters.agent.orgId;
      if (orgCode == undefined) {
        orgCode = 123
      }
      postCaseTemplate({orgCode: orgCode})
          .then(res => {
            if (res.code === 0) {
              this.caseTempList = res.data
            }
          })
          .catch(error => {
            console.log("error", error);
          });
    },
    // 查询操作系统列表
    getServiceList() {
      getServiceList()
          .then(res => {
            if (res.code === 0) {
              this.serviceList = res.data
            }
          })
          .catch(error => {
            console.log("error", error);
          });
    },
    // 查询CASE症状代码树
    postCaseTreeSymptom() {
      postCaseTreeSymptom()
          .then(res => {
            if (res.code === 0) {
              this.symptomTopCategory = res.data
            }
          })
          .catch(error => {
            console.log("error", error);
          });
    },
    // 查询CASE类型列表
    postCaseTypeList() {
      postCaseTypeList()
          .then(res => {
            if (res.code === 0) {
              this.caseTypeList = res.data
            }
          })
          .catch(error => {
            console.log("error", error);
          });
    },
    // 查询CASE来源
    getCaseSource() {
      getCaseSource()
          .then(res => {
            if (res.code === 0) {
              this.caseSource = res.data;
            }
          })
          .catch(error => {
            console.log("error", error);
          });
    },
    // 搜索功能
    onSearch(value) {
      let obj = {
        orgCode: this.$store.getters.agent.orgId || 11,
        keyword: value,
        pageNo: 1,
        pageSize: 10,
      };
      this.scrollStatus = true;

      postCaseSymptom(obj)
          .then(res => {
            if (res.code === 0) {
              this.caseList = res.data[0].contents;
              this.scrollStatus = true
            }
          })
          .catch(error => {
            console.log("error", error);
          });
    },
    clearModal(){
      this.form.resetFields();
    },
    // 保存功能
    handleSubmitContent(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let {nickname,name,phone,email,sex,city,address,remark}= this.customerInfo;

          let id = this.caseInfo.caseId;
          values['id'] = id;
          values['nickname'] = nickname;
          values['name'] = name;
          values['phone'] = phone;
          values['email'] = email;
          values['sex'] = sex;
          values['city'] = city;
          values['address'] = address;
          values['remark'] = remark;

          values['status'] = 1;

          putCase(id, values)
              .then(res => {
                if (res.code === 0) {
                  this.$message.success('更新成功！');

                  this.$store.commit('changeSpinning', true); // 修改全局页面loading

                  setTimeout(() => {
                    this.$store.commit('changeSpinning', false);

                    this.$store.commit('changeCaseInfoIndex', 10000); // 修改 case table 默认索引
                    this.disabledCloseButon = false;
                    this.form.resetFields()

                  }, 1000);
                }else{
                  this.$message.warning(res.msg);
                }
              })
              .catch(error => {
                console.log("error", error);
              });
        }
      });
    },
    // 保存功能
    handleSubmit(e) {
      e.preventDefault();
      this.form1.validateFieldsAndScroll((err, values) => {
        if (!err) {

          this.loading = true;
          setTimeout(() => {
            this.addQAModalVisible = false;
            this.loading = false;

            let { caseId, contents } = this.caseInfo;
            let { email } = this.$store.getters.agent;
            values['caseId'] = caseId;
            values['workerEmail'] = email;

            this.postCaseContent(values);

            let moment = this.$moment;
            moment = moment().format('MMMM Do YYYY, h:mm:ss a');

            this.caseData['caseContent'] = '';
            this.caseData['caseContent'] += contents[0].content;
            this.caseData['caseContent'] += '\n' + values['caseContent'];
            this.caseData['caseContent'] += '\n' + 'Notes          ';
            this.caseData['caseContent'] += moment + '         ';
            this.caseData['caseContent'] += email;

            this.caseData.caseContentTemp = '';
            this.form.resetFields();

          }, 1000);
        }
      });
    },
    // 模版改变状态
    handleChange(tag) {
      this.showConfirm(tag.id);
    },
    // 模版改变状态
    casehandleChange(value,option) {
      this.caseData.symptomTopCategory = option.key.toString()
    },
    // 新增CASE CONTENT(NOTE
    addQAModal() {
      this.addQATitle = '确认添加Note？';
      this.addQAModalVisible = true;
    },
    // 主要类别
    handleSymptomTopCategoryChange(value, option) {
      // 赋值
      this.caseData.symptomTopCategory = option.key;
      this.symptomSubCategory = this.symptomTopCategory[option.key].children || [];

      // 重置
      this.caseData.symptomSubCategory = '100';
      this.caseData.symptomSpecific = '100'
    },
    // 子类别
    handleSymptomSubCategoryChange(value, option) {
      this.caseData.symptomSubCategory = option.key;
      this.symptomSpecific = this.symptomSubCategory[option.key].children || [];

      // 重置
      this.caseData.symptomSpecific = '100'
    },
    // 关闭
    closeQAHandel() {
      let id = this.caseInfo.caseId;
      let caseContent = this.caseData.caseContent;
      let customerInfo = this.customerInfo;

      this.caseData['id'] = id;
      this.caseData['nickName'] = customerInfo.nickname;
      this.caseData['name'] = customerInfo.name;
      this.caseData['phone'] = customerInfo.phone;
      this.caseData['email'] = this.caseData.workerEmail;
      this.caseData['sex'] = customerInfo.sex;
      this.caseData['city'] = customerInfo.city;
      this.caseData['address'] = customerInfo.address;
      this.caseData['remark'] = customerInfo.remark | '暂无';

      this.caseData['pnName'] = customerInfo.pnName || '产品名称';

      this.caseData['attentionTs'] = customerInfo.attentionTs;
      this.caseData['spos'] = 0;
      this.caseData['symptomTopCategory'] = this.caseData.symptomTopCategory;
      this.caseData['symptomSubCategory'] = this.caseData.symptomSubCategory;
      this.caseData['symptomSpecific'] = this.caseData.symptomSpecific;
      this.caseData['caseTypeId'] = customerInfo.id;
      this.caseData['status'] = 0;

      putCase(id, this.caseData)
          .then(res => {
            if (res.code === 0) {
              this.$message.success('关闭成功！');

              for (var i in this.caseData) {
                this.caseData[i] = ''
              }
              this.$store.commit('changeSpinning', true); // 修改全局页面loading

              setTimeout(() => {
                this.$store.commit('changeSpinning', false);

                this.$store.commit('changeCaseInfoIndex', 10000); // 修改 case table 默认索引
                this.disabledCloseButon = true

              }, 1000);
            }else{
              this.$message.warning(res.msg);
            }
          })
          .catch(error => {
            console.log("error", error);
          })
    },
    addQAModalhandleOk(e) {
      this.$refs.aa.$el.click();
    },
    postCaseContent(data){
      postCaseContent(data)
          .then(res => {
            if (res.code === 0) {
              this.$message.success('添加成功');
            }
          })
          .catch(error => {
            console.log("error", error);
          });
    },
    addQAModalhandleCancel(e) {
      this.addQAModalVisible = false;
    },
    showConfirm(id) {
      let list = this.caseTempList;
      let caseData = this.caseData;
      this.$confirm({
        title: '提示',
        content: '是否使用此模板,使用将替换掉QA中的内容？',
        onOk() {
          list.forEach(v => {
            if (v.id === id) {
              setTimeout(() => {
                caseData['caseContent'] = v.templateContent;
              }, 500);
            }
          })
        },
        onCancel() {
        },
        class: 'test',
      });
    },
    changeSpos(e){
      this.caseData.spos = e.target.value
    }
  }
};
</script>

<style lang="less" scoped>
  .caseTemplate {
    margin: 10px 0;
  }

  .caseFrom /deep/ .ant-tabs-bar {
    margin: 0 0 8px 0;
  }

  .caseFrom /deep/ .ant-form-item {
    margin-bottom: 0px;
  }

  .caseFrom /deep/ .ant-input {
    height: 24px;
  }

  .caseFrom /deep/ .ant-form-item-label {
    width: 90px;
    padding-left: 10px;
    text-align: left;
  }

  .caseFrom /deep/ .ant-form-item-label {
    line-height: 30px;
  }

  .caseFrom /deep/ .ant-form-item-control {
    line-height: 30px;
  }

  .caseFrom /deep/ form textarea.ant-input {
    width: 494px;
  }

  .caseFrom /deep/ .ant-form-item-required:before {
    margin: 0;
  }

  th.column-money,
  td.column-money {
    text-align: right !important;
  }
</style>
