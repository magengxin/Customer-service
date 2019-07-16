<template>
  <div class="caseFrom">
    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="24" style="width: 100%;" class="">
        <a-row :gutter="24" type="flex" align="middle">
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
          <a-col :span="3" align="right" class="validate">
            <span>Q&A</span>
          </a-col>
          <a-col :span="20">
            <a-textarea placeholder=""
                        v-model="caseData['caseContent']"
                        :autosize="{ minRows: 4, maxRows: 20 }"
                        style="width: 100%; height: 120px;"></a-textarea>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="24" style="width: 100%;" class="cloAuto">

        <a-row :gutter="24" type="flex" align="middle">
          <a-col :span="3" align="right">
            <span>问题内容:</span>
          </a-col>
          <a-col :span="12" :class="{ 'scroll-relative': scrollStatus }">
            <a-input-search v-model="caseData.question" @search="onSearch" enterButton="搜索" size="small"></a-input-search>

            <scroll class="scroll-positon" v-show="scrollStatus">
              <a-table :columns="columns" :dataSource="data" bordered :customRow="customRow">
                <template slot="name" slot-scope="text">
                  <a href="javascript:;">{{text}}</a>
                </template>
              </a-table>
            </scroll>
          </a-col>

          <a-col :span="3" align="right" >
            <span>推荐SPOS:</span>
          </a-col>
          <a-col :span="4">
            <a-radio-group v-model="caseData.spos" class="width-radio-auto">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>

          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="24" style="width: 100%;" class="">
        <a-row :gutter="24">

<!--          <a-col :span="3" align="right" >-->
<!--            <span>CASE症状代码列表</span>-->
<!--          </a-col>-->
<!--          <a-col :span="4">-->
<!--            <a-select-->
<!--                    class="width-auto"-->
<!--                    size="small"-->
<!--                    v-decorator="[-->
<!--          'select5',-->
<!--          {rules: [{ required: true, message: 'Please select your country!' }],-->
<!--            initialValue: caseIndex}-->
<!--        ]"-->
<!--                    @change="casehandleChange"-->
<!--            >-->
<!--              <a-select-option value="0" disabled>-&#45;&#45;请选择-&#45;&#45;</a-select-option>-->

<!--              <a-select-option :value="index+1" v-for="(item,index) in caseList" :key="index">-->
<!--                &lt;!&ndash;                <span>{{item.question}}</span>&ndash;&gt;-->
<!--                <span>{{item.keyword}}</span>-->
<!--                &lt;!&ndash;                <span>{{item.remark}}</span>&ndash;&gt;-->
<!--                &lt;!&ndash;                <span>{{item.specific}}</span>&ndash;&gt;-->
<!--                &lt;!&ndash;                <span>{{item.subCategory}}</span>&ndash;&gt;-->
<!--                &lt;!&ndash;                <span>{{item.topCategory}}</span>&ndash;&gt;-->
<!--              </a-select-option>-->

<!--            </a-select>-->
<!--          </a-col>-->
        </a-row>
      </a-col>
    </a-row>

    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="24" style="width: 100%;" class="">
        <a-row :gutter="24" type="flex" align="middle">

          <a-col :span="3" align="right" class="validate">
            <span>主要类别:</span>
          </a-col>
          <a-col :span="4">
            <a-select
                    class="width-auto"
                    size="small"
                    v-model="caseData.symptomTopCategory"
                    v-decorator="[
          'select1',
          {rules: [{ required: true, message: 'Please select your country!' }]
            }
        ]"
                    @change="handleSymptomTopCategoryChange"
            >
              <a-select-option value="100" disabled>---请选择---</a-select-option>

              <a-select-option :value="index" v-for="(item,index) in symptomTopCategory" :key="index">{{item.name}}
              </a-select-option>

            </a-select>
          </a-col>
          <a-col :span="3" align="right" class="validate">
            <span>子类别:</span>
          </a-col>
          <a-col :span="4">
            <a-select
                    class="width-auto"

                    size="small"
                    v-model="caseData.symptomSubCategory"
                    v-decorator="[
          'select2',
          {rules: [{ required: true, message: 'Please select your country!' }],
            initialValue: caseData.symptomSubCategory}
        ]"
                    @change="handleSymptomSubCategoryChange"
            >
              <a-select-option value="100" disabled>---请选择---</a-select-option>
              <a-select-option :value="index" v-for="(item,index) in symptomSubCategory" :key="index">{{item.name}}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="3" align="right" class="validate">
            <span>详细类别:</span>
          </a-col>
          <a-col :span="4">
            <a-select
                    class="width-auto"

                    size="small"
                    v-model="caseData.symptomSpecific"
                    v-decorator="[
          'select3',
          {rules: [{ required: true, message: 'Please select your country!' }],
            initialValue: caseData.symptomSpecific}
        ]"
            >
              <a-select-option value="100" disabled>---请选择---</a-select-option>
              <a-select-option :value="index" v-for="(item,index) in symptomSpecific" :key="index">{{item.name}}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="24" style="width: 100%;" class="">
        <a-row :gutter="24">

<!--          <a-col :span="3" align="right">-->
<!--            <span>CNF</span>-->
<!--          </a-col>-->
<!--          <a-col :span="4">-->
<!--            <a-input v-model="caseData.CNF" class="width-auto"-->
<!--            ></a-input>-->
<!--          </a-col>-->
<!--          <a-col :span="3" align="right">-->
<!--            <span>SN</span>-->
<!--          </a-col>-->
<!--          <a-col :span="4">-->
<!--            <a-input v-model="caseData.sn" class="width-auto"-->
<!--            ></a-input>-->
<!--          </a-col>-->
<!--          <a-col :span="3" align="right">-->
<!--            <span>PN</span>-->
<!--          </a-col>-->
<!--          <a-col :span="4">-->
<!--            <a-input v-model="caseData.pn" class="width-auto"-->
<!--            ></a-input>-->
<!--          </a-col>-->
        </a-row>
      </a-col>
    </a-row>

    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="24" style="width: 100%;" class="">
        <a-row :gutter="24" type="flex" align="middle">








<!--          <a-col :span="3" align="right">-->
<!--            <span>产品型号</span>-->
<!--          </a-col>-->
<!--          <a-col :span="4">-->
<!--            <a-input v-model="caseData.productsNumber" class="width-auto"-->
<!--            ></a-input>-->
<!--          </a-col>-->
<!--          <a-col :span="3" align="right">-->
<!--            <span>产品线</span>-->
<!--          </a-col>-->
<!--          <a-col :span="4">-->
<!--            <a-select class="width-auto"-->
<!--                    size="small"-->
<!--                    v-model="caseData.productsLine"-->
<!--                    v-decorator="[-->
<!--              'select4',-->
<!--              {rules: [{ required: false, message: 'Please select your country!' }],-->
<!--              initialValue: caseData.productsLine}-->
<!--              ]">-->

<!--              <a-select-option value="0" disabled>-&#45;&#45;请选择-&#45;&#45;</a-select-option>-->

<!--              <a-select-option value="1">产品线1</a-select-option>-->
<!--              <a-select-option value="2">产品线2</a-select-option>-->
<!--            </a-select>-->
<!--          </a-col>-->
          <a-col :span="3" align="right">
            <span>接入渠道:</span>
          </a-col>
          <a-col :span="4">
            <a-select
                    class="width-auto"
                    size="small"
                    v-model="caseData.caseSource"
                    v-decorator="[
          'select5',
          {rules: [{ required: true, message: 'Please select your country!' }],
            initialValue: caseData.caseSource}
        ]"
            >
              <a-select-option value="0" disabled>---请选择---</a-select-option>

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
          'select6',
          {rules: [{ required: true, message: 'Please select your country!' }],
            initialValue: caseData.caseType}
        ]"
            >
              <a-select-option value="0" disabled>---请选择---</a-select-option>

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
          'select6',
          {rules: [{ required: true, message: 'Please select your country!' }],
            initialValue: caseData.caseType}
        ]"
            >
              <a-select-option value="0" disabled>---请选择---</a-select-option>

              <a-select-option :value="item.id" v-for="item in caseTypeList" :key="item.id">{{item.caseTypeName}}
              </a-select-option>
            </a-select>
          </a-col>

        </a-row>
      </a-col>
    </a-row>

    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="24" style="width: 100%;" class="">
        <a-row :gutter="24">
<!--          <a-col :span="3" align="right">-->
<!--            <span>操作系统</span>-->
<!--          </a-col>-->
<!--          <a-col :span="4">-->
<!--            <a-select-->
<!--                    class="width-auto"-->
<!--                    size="small"-->
<!--                    v-model="caseData.servers"-->
<!--                    v-decorator="[-->
<!--          'select6',-->
<!--          {rules: [{ required: true, message: 'Please select your country!' }],-->
<!--            initialValue: caseData.servers}-->
<!--        ]"-->

<!--            >-->
<!--              <a-select-option value="0" disabled>-&#45;&#45;请选择-&#45;&#45;</a-select-option>-->

<!--              <a-select-option :value="item.id" v-for="item in serviceList" :key="item.id">{{item.name}}-->
<!--              </a-select-option>-->
<!--            </a-select>-->
<!--          </a-col>-->
<!--          <a-col :span="3" align="right">-->
<!--            <span>固体/BIOS版本</span>-->
<!--          </a-col>-->
<!--          <a-col :span="4">-->
<!--            <a-input v-model="caseData.servers" class="width-auto"></a-input>-->
<!--          </a-col>-->
        </a-row>
      </a-col>
    </a-row>

    <a-row :gutter="24" style="margin-top: 10px;">
      <a-col :span="8" offset="1">
        <a-button type="primary" style="height: 24px;" @click="addQAModal">新增Note</a-button>
      </a-col>
      <a-col :span="6" :offset="8">
        <a-button type="primary"  style="margin:0 20px; height: 24px;" @click="saveQAHandel">保存</a-button>
        <a-button type="primary" style="height: 24px;" @click="closeQAHandel">关闭</a-button>
      </a-col>
    </a-row>

    <a-modal
            v-model="addQAModalVisible"
            :title="addQATitle"
            onOk="handleOk"
            @cancel="clearModal"
    >
      <template slot="footer">
        <a-button key="back" @click="addQAModalhandleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="addQAModalhandleOk">保存</a-button>
      </template>

      <a-form  :form="form" @submit="handleSubmit">
        <a-form-item
                label="邮箱"
                :label-col="formLayout.labelCol"
                :wrapper-col="formLayout.wrapperCol"
        >
          <a-input v-model='caseData.workerEmail'
                   v-decorator="[ 'Email' ]"
                   @blur="validateEmailBlur"
                   placeholder="Please input your workerEmail"
          ></a-input>
          <a-button type="primary" ref="aa" class="submitPpacity"
                    html-type="submit"  >提交
          </a-button>
        </a-form-item>
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
    postCaseTreeSymptom
  } from "@/api/history";

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  }, {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];

  const data = [{
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  }];


export default {
  name: "CaseForm",
  data() {
    return {
      data,
      columns,
      scrollStatus: false, // 搜索结果
      form: this.$form.createForm(this),
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
        code: "0"
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
        customerId: 0,
        caseSourceName: '',
        question: '',
        symptomTopCategory: '100',
        symptomSubCategory: '100',
        symptomSpecific: '100',
        CNF: '',
        sn: '',
        pn: '',
        productsNumber: '1',
        productsLine: '0',
        caseSource: '0',
        caseType: '0',
        servers: '0',
        spos: 1,
        workerEmail: '', // 添加Note弹框 workerEmail
      }, // CASE数据
      caseList: [], // case列表
      loading: false,
      addQAModalVisible: false, // 添加Note弹框
      addQATitle: '', // 添加Note弹框 title
      caseIndex: '1', // case列表默认选项
      customRow: (record, index) => {
        return {
          on: {
            click: () => {
              console.log("record", record);
              this.scrollStatus = false;
            }
          }
        };
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
    }),
  },
  watch: {
    caseInfo() {
      console.log("this.caseInfo", this.caseInfo);
      this.caseData.caseContent = this.caseInfo.contents[0].content;
      this.caseData.caseType = this.caseInfo.caseType;
      this.caseData.caseSource = this.caseInfo.channelName;
      this.caseData.caseSourceName = this.caseInfo.channelSource;
      this.caseData.spos = this.caseInfo.spos;
      this.caseData.question = this.caseInfo.symptomQuestion;

      // let symptomTopCategory = this.caseInfo.symptomTopCategory
      // let symptomSubCategory = this.caseInfo.symptomSubCategory
      // let symptomSpecific = this.caseInfo.symptomSpecific
      // symptomTopCategory  = symptomTopCategory.charAt(symptomTopCategory.length - 1)
      // symptomSubCategory  = symptomSubCategory.charAt(symptomSubCategory.length - 1)
      // symptomSpecific  = symptomSpecific.charAt(symptomSpecific.length - 1)

      // console.log("symptomTopCategory", symptomTopCategory);
      // console.log("symptomTopCategory", typeof symptomTopCategory);

      this.caseData.symptomTopCategory = this.caseInfo.symptomTopCategory;
      if(this.caseData.symptomTopCategory != 100) {
        this.caseData.symptomSubCategory = this.caseInfo.symptomSubCategory;
      }
      if(this.caseData.symptomSubCategory != 100) {
        this.caseData.symptomSpecific = this.caseInfo.symptomSpecific;
      }

      this.$store.commit('changeSpinning', false); // 修改全局页面loading
    }
  },
  methods: {
    init() {
      // 查询CASE模板列表
      this.postCaseTemplate();
      // 查询CASE类型列表
      this.postCaseTypeList();
      // 查询CASE来源
      this.getCaseSource();
      // 查询操作系统列表
      this.getServiceList()
      // 查询CASE症状代码树
      this.postCaseTreeSymptom()
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
              console.log("res.data", res.data);
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
              this.caseSource.push(
                  {
                    code: '0001',
                    name: "marketing"
                  }
              )
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
      this.scrollStatus = true
return
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
    // 验证邮箱
    validateEmailBlur(e) {
      const validateEmailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");

      if (e.target.value && !validateEmailReg.test(e.target.value)) {
        const arr = [{
          message: '您输入的邮箱格式不正确!',
          field: 'Email',
        }];
        this.form.setFields({Email: {value: e.target.value, errors: arr}})
      } else {
        this.form.setFields({Email: {value: e.target.value, errors: ''}});
        this.caseData.workerEmail = e.target.value
      }
    },
    // 保存功能
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.caseData.workerEmail = values['Email']
        }
      });
    },
    // 模版改变状态
    handleChange(tag) {
      this.showConfirm(tag.id);

      return
      this.caseTempList.forEach(v => {
        if (v.id === tag.id) {
          this.caseData['caseContent'] = v.templateContent;
          this.caseTypeList.forEach(T => {
            if (T.id === tag.id) {
              this.caseData.caseType = T.caseTypeName;
            }
          })
        }
      });
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

      // this.symptomTopCategory.forEach((v,i) => {
      //   if(i == this.caseData.symptomTopCategory){
      //     console.log("this.symptomTopCategory[i]", this.symptomTopCategory[this.caseData.symptomTopCategory]);
      //   }
      // })
    },
    // 子类别
    handleSymptomSubCategoryChange(value, option) {
      this.caseData.symptomSubCategory = option.key;
      this.symptomSpecific = this.symptomSubCategory[option.key].children || [];

      // 重置
      this.caseData.symptomSpecific = '100'

      // this.symptomTopCategory.forEach((v,i) => {
      //   if(i == this.caseData.symptomTopCategory){
      //     console.log("this.symptomTopCategory[i]", this.symptomTopCategory[this.caseData.symptomTopCategory]);
      //   }
      // })
    },
    // 保存
    saveQAHandel() {
      console.log("this.caseData", this.caseData);

      let customerInfo = this.customerInfo;
      let id = this.caseInfo.caseId;

      this.caseData['nickName'] = customerInfo.nickName;
      this.caseData['name'] = customerInfo.name;
      this.caseData['phone'] = customerInfo.phone;
      this.caseData['email'] = this.caseData.workerEmail;
      this.caseData['sex'] = customerInfo.sex;
      this.caseData['city'] = customerInfo.city;
      this.caseData['address'] = customerInfo.address;
      this.caseData['remark'] = customerInfo.remark;

      this.caseData['pnName'] = customerInfo.pnName || '产品名称';

      this.caseData['attentionTs'] = customerInfo.attentionTs;

      if (!id) {
        let caseContent = this.caseData.caseContent;
        let symptomTopCategory = this.caseData.symptomTopCategory;
        let symptomSubCategory = this.caseData.symptomSubCategory;
        let symptomSpecific = this.caseData.symptomSpecific;
        if (!caseContent || !symptomTopCategory || !symptomSubCategory || !symptomSpecific) {
          return false
        }

        this.caseData['customerId'] = customerInfo.id;

        this.caseData['agentId'] = customerInfo.agentId || 11;
        this.caseData['agentName'] = customerInfo.agentName || '客服';
        this.caseData['channelCode'] = parseInt(customerInfo.channelCode) || '渠道代码';
        this.caseData['channelName'] = customerInfo.channelName || '渠道名称';
        this.caseData['channelSource'] = customerInfo.channelSource || '渠道来源';

        this.caseData['caseTypeId'] = customerInfo.caseTypeId;

        delete this.caseData.id;

        postCase(this.caseData)
            .then(res => {
              if (res.code === 0) {
                this.$message.success(res.msg);

                for (var i in this.caseData) {
                  this.caseData[i] = ''
                }

                this.$store.commit('changeSpinning', true); // 修改全局页面loading

                setTimeout(() => {
                  this.$store.commit('changeSpinning', false)
                }, 1000);
              }
            })
            .catch(error => {
              console.log("error", error);
            });
      }else{
        let caseContent = this.caseData.caseContent;
        let symptomTopCategory = this.caseData.symptomTopCategory;
        let symptomSubCategory = this.caseData.symptomSubCategory;
        let symptomSpecific = this.caseData.symptomSpecific;
        if (!caseContent || !symptomTopCategory || !symptomSubCategory || !symptomSpecific) {
          return false
        }

        this.caseData['id'] = id;

        this.caseData['spos'] = 0;
        this.caseData['symptomTopCategory'] = this.caseData.symptomTopCategory;
        this.caseData['symptomSubCategory'] = this.caseData.symptomSubCategory;
        this.caseData['symptomSpecific'] = this.caseData.symptomSpecific;
        this.caseData['caseTypeId'] = customerInfo.id;

        putCase(id, this.caseData)
            .then(res => {
              if (res.code === 0) {
                this.$message.success('更新成功！');

                for (var i in this.caseData) {
                  this.caseData[i] = ''
                }
                this.$store.commit('changeSpinning', true); // 修改全局页面loading

                setTimeout(() => {
                  this.$store.commit('changeSpinning', false)
                }, 1000);
              }
            })
            .catch(error => {
              console.log("error", error);
            });
      }
    },
    // 关闭
    closeQAHandel() {
      let id = this.caseInfo.caseId;
      if (!id) {
        this.$message.warning('请选择case');
        return false
      }

      let caseContent = this.caseData.caseContent;
      let symptomTopCategory = this.caseData.symptomTopCategory;
      let symptomSubCategory = this.caseData.symptomSubCategory;
      let symptomSpecific = this.caseData.symptomSpecific;
      if (!caseContent || !symptomTopCategory || !symptomSubCategory || !symptomSpecific) {
        return false
      }

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

      putCase(id, this.caseData)
          .then(res => {
            if (res.code === 0) {
              this.$message.success('关闭成功！');

              for (var i in this.caseData) {
                this.caseData[i] = ''
              }
              this.$store.commit('changeSpinning', true); // 修改全局页面loading

              setTimeout(() => {
                this.$store.commit('changeSpinning', false)
              }, 1000);
            }
          })
          .catch(error => {
            console.log("error", error);
          })
    },
    addQAModalhandleOk(e) {
      this.$refs.aa.$el.click();

      const validateEmailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if(!validateEmailReg.test(this.caseData.workerEmail)){
        return false
      }

      this.loading = true;

      setTimeout(() => {
        this.addQAModalVisible = false;
        this.loading = false;

        let moment = this.$moment;
        moment = moment().format('MMMM Do YYYY, h:mm:ss a');

        this.caseData['caseContent'] += '\n' + 'Note          ';
        this.caseData['caseContent'] += moment + '         ';
        this.caseData['caseContent'] += this.caseData.workerEmail;

        this.form.resetFields();

      }, 1000);
    },
    addQAModalhandleCancel(e) {
      this.addQAModalVisible = false;
    },
    handleOk() {

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
              caseData['caseContent'] = v.templateContent;
              // this.caseTypeList.forEach(T => {
              //   if (T.id === tag.id) {
              //     this.caseData.caseType = T.caseTypeName;
              //   }
              // })
            }
          })
        },
        onCancel() {
        },
        class: 'test',
      });
    },
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
