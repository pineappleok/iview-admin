<template>
  <div class="home-main">
    <div class="main-header">
      <div class="breadcrumb">
        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
      </div>
      <top-timeline :cur-step="1" />
      <div class="action">
        <Button type="primary">下一步</Button>
      </div>
    </div>
    <div class="main-content">
      <left-info :product-info="productInfo" />
      <div class="content">
        <h3 style="margin:24px 0;">功能设置
          <Button icon="plus" @click="addSet = true" style="margin-left:10px;">添加</Button>
        </h3>
        <Modal v-model="addSet" class="modal" title="功能添加" @on-ok="ok" @on-cancel="cancel">
          <Tabs value="name1">
            <TabPane label="功能点" name="name1">
              <span v-for="(item,index) in functionList" class="check_a" :class="item.checked?'checked':''" @click="item.checked=!item.checked" :key="index">
                <Icon :type="item.checked?'android-checkbox':'android-checkbox-outline'" :color="item.checked?'#008CF8':''" class="check_a_icon"></Icon>{{item.label}}</span>
              <div style="margin-top:20px;">
                没有找到合适的功能点，去自定义一个吧。
                <a href="javascript:void(0)" @click="addSet=false,customFunction=true">自定义功能点</a>
                <Modal v-model="customFunction" class="modal" title="自定义功能点" @on-ok="ok" @on-cancel="cancel">
                  <Row class="mtb15">
                    <Col class="label" span="5">功能点名称</Col>
                    <Col span="19">
                    <Input v-model="functionNameModal" placeholder="请输入功能点名称..." size="large"></Input>
                    </Col>
                  </Row>
                  <Row class="mtb15">
                    <Col class="label" span="5">数据点名称</Col>
                    <Col span="19">
                    <Input v-model="dataNameModal" placeholder="请输入数据点名称..." size="large"></Input>
                    </Col>
                  </Row>
                  <Row class="mtb15">
                    <Col class="label" span="5">数据类型</Col>
                    <Col span="19">
                    <!-- <span v-for="item in dataTypeList" class="check_a" :class="item.checked?'checked':''" @click="radioClick()"><Icon :type="item.checked?'ios-checkmark':'ios-checkmark-outline'" :color="item.checked?'#008CF8':''" class="check_a_icon"></Icon>{{item.label}}</span> -->
                    <RadioGroup v-model="dataTypeRadio" on-change="consoletest">
                      <Radio v-for="item in dataTypeList" :label="item.label" :key="item.id">
                        <span>{{item.label}}</span>
                      </Radio>
                    </RadioGroup>
                    </Col>
                  </Row>
                  <Row class="mtb15">
                    <Col class="label" span="5">读写类型</Col>
                    <Col span="19">
                    <RadioGroup v-model="rwTypeRadio">
                      <Radio v-for="item in rwTypeList" :label="item.label" :key="item.id">
                        <span>{{item.label}}</span>
                      </Radio>
                    </RadioGroup>
                    </Col>
                  </Row>
                  <Row class="mtb15" v-show="dataTypeRadio==='整数'||dataTypeRadio==='浮点数'">
                    <Col class="label" span="5">上下限</Col>
                    <Col span="19">
                    <InputNumber :max="10" :step="0.1" v-model="min" placeholder="请输入..."></InputNumber>　至
                    <InputNumber :min="min" :step="0.1" v-model="max" placeholder="请输入..."></InputNumber>
                    </Col>
                  </Row>
                  <!-- <Row class="mtb15">
                                        <Col class="label" span="5">连接方式</Col>
                                        <Col span="19">       
                                            <span v-for="item in connectionList" class="check_a" :class="item.checked?'checked':''" @click="item.checked=!item.checked"><Icon :type="item.checked?'ios-checkmark':'ios-checkmark-outline'" :color="item.checked?'#008CF8':''" class="check_a_icon"></Icon>{{item.label}}</span>  
                                        </Col>
                                    </Row>   -->
                </Modal>
              </div>
            </TabPane>
            <TabPane label="功能集" name="name2">
              <span v-for="item in setList" class="check_a" :class="item.checked?'checked':''" @click="item.checked=!item.checked">
                <Icon :type="item.checked?'android-checkbox':'android-checkbox-outline'" :color="item.checked?'#008CF8':''" class="check_a_icon"></Icon>{{item.label}}</span>
              <div style="margin-top:20px;">
                没有找到合适的功能集，去自定义一个吧。
                <a href="javascript:void(0)" @click="customSet=true">自定义功能集</a>
                <Modal v-model="customSet" class="modal" title="自定义功能集" @on-ok="ok" @on-cancel="cancel">
                  <!-- <Row class="mtb15">
                                        <Col class="label" span="5">产品行业</Col>
                                        <Col span="19">
                                            <Select placeholder="请选择产品行业..." size="large">
                                                <Option v-for="item in industryList" :value="item.value" :key="item.value"></Option>
                                            </Select>
                                        </Col>
                                    </Row> 
                                    <Row class="mtb15">
                                        <Col class="label" span="5">产品名称</Col>
                                        <Col span="19">
                                            <Input v-model="poductNameModal" placeholder="请输入产品名称..." size="large"></Input>
                                        </Col>
                                    </Row>
                                    <Row class="mtb15">
                                        <Col class="label" span="5">连接方式</Col>
                                        <Col span="19">       
                                            <span v-for="item in connectionList" class="check_a" :class="item.checked?'checked':''" @click="item.checked=!item.checked"><Icon :type="item.checked?'ios-checkmark':'ios-checkmark-outline'" :color="item.checked?'#008CF8':''" class="check_a_icon"></Icon>{{item.label}}</span>  
                                        </Col>
                                    </Row>  -->
                </Modal>
              </div>
            </TabPane>
            <TabPane label="触发器" name="name3">
              <span v-for="item in triggerList" class="check_a" :class="item.checked?'checked':''" @click="item.checked=!item.checked">
                <Icon :type="item.checked?'android-checkbox':'android-checkbox-outline'" :color="item.checked?'#008CF8':''" class="check_a_icon"></Icon>{{item.label}}</span>
              <div style="margin-top:20px;">
                没有找到合适的触发器，去自定义一个吧。
                <a href="javascript:void(0)" @click="customTrigger=true">自定义触发器</a>
                <Modal v-model="customTrigger" class="modal" title="自定义触发器" @on-ok="ok" @on-cancel="cancel">
                  <!-- <Row class="mtb15">
                                        <Col class="label" span="5">产品行业</Col>
                                        <Col span="19">
                                            <Select placeholder="请选择产品行业..." size="large">
                                                <Option v-for="item in industryList" :value="item.value" :key="item.value"></Option>
                                            </Select>
                                        </Col>
                                    </Row> 
                                    <Row class="mtb15">
                                        <Col class="label" span="5">产品名称</Col>
                                        <Col span="19">
                                            <Input v-model="poductNameModal" placeholder="请输入产品名称..." size="large"></Input>
                                        </Col>
                                    </Row>
                                    <Row class="mtb15">
                                        <Col class="label" span="5">连接方式</Col>
                                        <Col span="19">       
                                            <span v-for="item in connectionList" class="check_a" :class="item.checked?'checked':''" @click="item.checked=!item.checked"><Icon :type="item.checked?'ios-checkmark':'ios-checkmark-outline'" :color="item.checked?'#008CF8':''" class="check_a_icon"></Icon>{{item.label}}</span>  
                                        </Col>
                                    </Row> -->
                </Modal>
              </div>
            </TabPane>
          </Tabs>
        </Modal>
        <Table :columns="columns" :data="tableData" class="table01"></Table>
        <h3 style="margin:24px 0;">触发器设置
          <Button icon="plus" style="margin-left:10px;">添加</Button>
        </h3>
        <!-- <Table :columns="columns1" :data="tableData1" class="table02"></Table> -->
        <table class="mytable">
          <thead>
            <tr>
              <th>DPID</th>
              <th>触发器名称</th>
              <th>触发功能点</th>
              <th>触发方式</th>
              <th>触发结果</th>
              <th>关联功能点</th>
              <th>控制方式</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item,i) in mytableData">
              <tr>
                <td :rowspan="item.control.length+1">{{item.setId}}</td>
                <td :rowspan="item.control.length+1">{{item.tirggerName}}</td>
                <td :rowspan="item.control.length+1">{{item.triggerFunction}}</td>
                <td>{{item.triggerType}}</td>
                <td>{{item.triggerResult}}</td>
                <td>{{item.associate}}</td>
                <td>{{item.controlType}}</td>
                <td :rowspan="item.control.length+1">{{item.note}}</td>
                <td :rowspan="item.control.length+1">
                  <a href="javascript:void(0)" @click="edit" style="marign-right:5px;">编辑</a>
                  <a href="javascript:void(0)" @click="del" style="marign-right:5px;">删除</a>
                </td>
              </tr>
              <tr v-for="(control,j) in item.control">
                <td>{{control.triggerType}}</td>
                <td>{{control.triggerResult}}</td>
                <td>{{control.associate}}</td>
                <td>{{control.controlType}}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import expandRow from "./set_table.vue";
import breadcrumbNav from "../main-components/breadcrumb-nav.vue";
import topTimeline from "../my-components/top-timeline";
import leftInfo from "../my-components/left-info";
export default {
  name: "home_set",
  components: {
    expandRow,
    breadcrumbNav,
    "top-timeline": topTimeline,
    "left-info": leftInfo
  },
  data() {
    return {
      productInfo: {
        id: 23446,
        name: "智能冷暖白光灯1(CW)",
        avator:
          "http://test.www.yuedujiayuan.com/activity-ui/spring-reading/images/act-student.jpg"
      },
      columns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row["functionPoint"]
              }
            });
          }
        },
        {
          title: "DPID",
          key: "setId"
        },
        {
          title: "功能类型",
          key: "setType"
        },
        {
          title: "名称",
          key: "setName"
        },
        {
          title: "数据点",
          key: "data"
        },
        {
          title: "数据类型",
          key: "dataType"
        },
        {
          title: "读写特性",
          key: "readWrite"
        },
        {
          title: "上下限",
          key: "maxMin"
        },
        {
          title: "小数点数",
          key: "decimal"
        },
        {
          title: "是否传输小数",
          key: "ifDecimal"
        },
        {
          title: "备注",
          key: "note"
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: this.mockSetsData(),
      addSet: false,
      functionList: this.mockfunctionListData(),
      setList: this.mocksetListData(),
      triggerList: this.mocktriggerListData(),
      customFunction: false,
      customSet: false,
      customTrigger: false,
      functionNameModal: "",
      dataNameModal: "",
      dataTypeRadio: "",
      dataTypeList: this.mockDataTypeListData(),
      rwTypeRadio: "",
      rwTypeList: this.mockRwTypeListData(),
      min: null,
      max: null,
      mytableData: this.mockMyTableData()
    };
  },

  computed: {
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
      return localStorage.avatorImgPath;
    }
  },
  created() {},
  mounted() {},
  methods: {
    consoletest() {
      alert(1);
      this.$Message.info(this.dataTypeRadio);
    },
    edit() {
      this.$Message.info("已确认");
    },
    ok() {
      this.$Message.info("已确认");
    },
    cancel() {
      this.$Message.info("已取消");
    },
    del: () => {
      this.remove();
    },
    mockSetsData() {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          setId: i + 1,
          setType: "功能集",
          setName: "GPS功能集",
          data: "smart_1",
          dataType: "浮点型",
          readWrite: "可读",
          maxMin: "12",
          decimal: "两位小数",
          ifDecimal: "传输",
          note: "开发中",
          functionPoint: [
            {
              setId: "0" + (i + 1),
              setType: "功能点",
              setName: "GPS功能集",
              data: "smart_1",
              dataType: "浮点型",
              readWrite: "可读",
              maxMin: "12",
              decimal: "两位小数",
              ifDecimal: "传输",
              note: "开发中"
            }
          ]
        });
      }
      return data;
    },
    mockSetsData1() {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          setId: i + 1,
          tirggerName: "烟雾报警",
          triggerFunction: "温度",
          triggerType: "报警",
          triggerResult: "电话",
          associate: "湿度",
          controlType: "正向",
          note: "开发中",
          functionPoint: [
            {
              setId: "0" + (i + 1),
              tirggerName: "烟雾报警",
              triggerFunction: "温度",
              triggerType: "报警",
              triggerResult: "电话",
              associate: "湿度",
              controlType: "正向",
              note: "开发中"
            },
            {
              setId: "00" + (i + 1),
              tirggerName: "烟雾报警",
              triggerFunction: "温度",
              triggerType: "报警",
              triggerResult: "电话",
              associate: "湿度",
              controlType: "正向",
              note: "开发中"
            }
          ]
        });
      }
      return data;
    },
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let hour = date.getHours();
      hour = hour < 10 ? "0" + hour : hour;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      return y + "-" + m + "-" + d + " " + hour + ":" + minute;
    },
    mockfunctionListData() {
      let type = [
        "高度",
        "方向",
        "速度",
        "温度",
        "电压",
        "蓝牙",
        "WiFi",
        "Zigbee",
        "Lore",
        "2G/3G/4G/5G",
        "网关"
      ];
      let data = [];
      for (let i = 0; i < type.length; i++) {
        data.push({
          value: type[i],
          label: type[i],
          checked: false
        });
      }
      return data;
    },
    mocksetListData() {
      let type = [
        "高度",
        "方向",
        "速度",
        "温度",
        "电压",
        "蓝牙",
        "WiFi",
        "Zigbee",
        "Lore",
        "2G/3G/4G/5G",
        "网关"
      ];
      let data = [];
      for (let i = 0; i < type.length; i++) {
        data.push({
          value: type[i],
          label: type[i],
          checked: false
        });
      }
      return data;
    },
    mocktriggerListData() {
      let type = [
        "高度",
        "方向",
        "速度",
        "温度",
        "电压",
        "蓝牙",
        "WiFi",
        "Zigbee",
        "Lore",
        "2G/3G/4G/5G",
        "网关"
      ];
      let data = [];
      for (let i = 0; i < type.length; i++) {
        data.push({
          value: type[i],
          label: type[i],
          checked: false
        });
      }
      return data;
    },
    mockDataTypeListData() {
      let connectionType = [
        "布尔数",
        "整数",
        "浮点数",
        "时间",
        "块数据",
        "数据集"
      ];
      let data = [];
      for (let i = 0; i < connectionType.length; i++) {
        data.push({
          value: connectionType[i],
          label: connectionType[i],
          checked: false
        });
      }
      return data;
    },
    mockRwTypeListData() {
      let connectionType = ["可读", "可写"];
      let data = [];
      for (let i = 0; i < connectionType.length; i++) {
        data.push({
          value: connectionType[i],
          label: connectionType[i],
          checked: false
        });
      }
      return data;
    },
    mockMyTableData() {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          setId: i + 1,
          tirggerName: "烟雾报警0" + (i + 1),
          triggerFunction: "温度",
          triggerType: "报警",
          triggerResult: "电话",
          associate: "湿度",
          controlType: "正向",
          note: "开发中",
          control: []
        });
        for (let j = 0; j < 2; j++) {
          data[i].control.push({
            triggerType: "报警",
            triggerResult: "电话",
            associate: "湿度",
            controlType: "正向"
          });
        }
      }
      return data;
    }
  }
};
</script>
<style lang="less" scoped>
td.ivu-table-expanded-cell {
  padding-right: 0;
}
.ivu-btn {
  border-color: #57a3f3;
  color: #57a3f3;
}
.table {
  width: 100%;
}
.table01 .ivu-table th {
  width: calc((100% - 50px) / 11);
}
.table02 .ivu-table th {
  width: calc((100% - 50px) / 9);
}
.modal {
  .mtb15 {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .label {
    line-height: 34px;
    font-size: 14px;
    color: rgba(29, 36, 54, 0.8);
    font-weight: bold;
    text-align: center;
  }
  .check_a {
    display: inline-block;
    height: 34px;
    line-height: 34px;
    padding: 0 5px;
    border-radius: 3px;
    border: 1px solid #dddee1;
    margin-right: 6px;
    margin-bottom: 5px;
    font-size: 14px;
    text-align: center;
    color: rgba(23, 35, 61, 0.8);
    vertical-align: middle;
    cursor: pointer;
    &.checked {
      border-color: #008cf8;
      color: #008cf8;
    }
    &_icon {
      padding-right: 6px;
      font-size: 20px;
    }
  }
  .check_a_icon {
    vertical-align: middle;
    color: #ddd;
  }
}
.mytable {
  width: 100%;
  border-collapse: collapse;
  th {
    padding: 5px 3px;
  }
  th,
  td {
    border: 1px solid #e0e0e0;
    text-align: center;
  }
  td {
    padding: 3px;
  }
}
</style>