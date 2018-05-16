<template>
    <div class="home-main">
        <div class="main-header-con">
            <div class="main-header">
                <div class="main-search">
                    <Row>
                        <Col span="2">&nbsp;</Col>
                        <Col span="22">
                        <Row>
                            <Col :lg="4" :md="8">
                            <Select v-model="productType" style="width:200px" placeholder="请选择项目类型">
                                <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            </Col>
                            <Col :lg="13" :md="2">&nbsp;</Col>
                            <Col :lg="7" :md="14" style="text-align:right;">
                            <Input v-model="productName" icon="ios-search" placeholder="输入产品名称搜索..." style="width: 220px"></Input>
                            <Button type="primary" icon="plus" @click="ModalCreateProduct = true">创建新产品</Button>
                            <Modal v-model="ModalCreateProduct" class="modal" title="产品创建" @on-ok="ok" @on-cancel="cancel">
                                <Row class="mtb15">
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
                                    <!-- <span v-for="item in connectionList" class="check_a" :class="item.checked?'checked':''" @click="item.checked=!item.checked"><Icon :type="item.checked?'ios-checkmark':'ios-checkmark-outline'" :color="item.checked?'#008CF8':''" class="check_a_icon"></Icon>{{item.label}}</span>   -->
                                    <RadioGroup v-model="connectionTypePadio">
                                        <Radio v-for="item in connectionList" :label="item.label" :key="item.id">
                                            <span>{{item.label}}</span>
                                        </Radio>
                                    </RadioGroup>
                                    </Col>
                                </Row>
                            </Modal>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        <Row>
            <Col span="2">&nbsp;</Col>
            <Col span="18">
            <Row>
                <ul class="product-ul">
                    <li v-for="(item,index) in products" :key="index">
                        <Card>
                            <Row type="flex">
                                <Col span="16" style="padding-left:6px;">
                                <Row class-name="made-child-con-middle" type="flex" align="middle">
                                    <div>
                                        <p class="name">{{item.productName}}</p>
                                        <p class="info">状态　{{item.status}}</p>
                                        <p class="info">创建　{{item.start}}</p>
                                        <p class="info">更新　{{item.update}}</p>
                                    </div>
                                </Row>
                                </Col>
                                <Col span="8">
                                <Row class-name="made-child-con-middle" type="flex" align="middle">
                                    <img class="avator-img" :src="avatorPath" />
                                </Row>
                                </Col>
                            </Row>
                            <div class="line-gray" style="margin:10px 0;"></div>
                            <Row class="margin-top-8">
                                <a href="javascript:void(0)" style="margin-right:8px;">编辑产品</a>
                                <a href="javascript:void(0)" style="color: rgba(23,35,61,0.55);">删除</a>
                            </Row>
                        </Card>
                    </li>
                </ul>
            </Row>
            </Col>
            <Col span="4">
            <Row>
                <ul class="timeline">
                    <li>
                        <Icon type="ios-arrow-thin-down" size="18px" class="timeline_icon"></Icon>
                        <br />
                    </li>
                    <li>
                        <router-link to="/home/set" tag="span">
                            <Icon type="android-settings" size="18px" class="timeline_icon"></Icon>
                            <br />
                            <span class="timeline_text">功能设置</span>
                        </router-link>
                    </li>
                    <li>
                        <Icon type="android-phone-portrait" size="18px" class="timeline_icon"></Icon>
                        <br />
                        <span class="timeline_text">APP界面设置</span>
                    </li>
                    <li>
                        <Icon type="android-wifi" size="18px" class="timeline_icon"></Icon>
                        <br />
                        <span class="timeline_text">虚拟设备调试</span>
                    </li>
                    <li>
                        <Icon type="ios-paperplane-outline" size="18px" class="timeline_icon"></Icon>
                        <br />
                        <span class="timeline_text">申请发布</span>
                    </li>
                </ul>
            </Row>
            <Row style="margin-top:15px;text-align:center;">
                <a href="" style="font-size:14px;font-weight:100%:">
                    <Icon type="android-arrow-dropright-circle" color="#008CF8" style="margin-right:10px;"></Icon>观看演示视频</a>
            </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      products: this.mockProductsData()
    };
  },
  props: {
    home: Object
  },
  computed: {
    avatorPath() {
      return localStorage.avatorImgPath;
    }
  },
  created() {},
  mounted() {
    this.$emit("childChange", {
      progressActiveIndex: 0,
      isHome: true
    });
  },
  methods: {
    mockProductsData() {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          productName: "智能冷暖白光灯" + (i + 1) + "(CW)",
          status: "开发中",
          start: this.formatDate(new Date()),
          update: this.formatDate(new Date()),
          imgSrc: "../images/logo.png"
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
    }
  }
};
</script>
<style lang="less" scoped>
.product-ul {
  list-style-type: none;
  margin-left: -19px;
}
.product-ul li {
  float: left;
  width: 317px;
  height: 192px;
  margin: 10px;
}
.product-ul .ivu-card-bordered {
  width: 100%;
  height: 100%;
}
.product-ul .name {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #17233d;
  line-height: 26px;
}
.product-ul .info {
  font-size: 12px;
  color: rgba(23, 35, 61, 0.7);
  line-height: 2;
}
.timeline {
  width: 100px;
  margin: 24px auto 0;
  list-style-type: none;
  text-align: center;
  cursor: pointer;
}
.timeline_icon {
  width: 27px;
  height: 27px;
  background: #fff;
  border: 1px solid rgba(23, 35, 61, 0.15);
  border-radius: 50%;
  line-height: 27px;
}
.timeline li:first-child .timeline_icon {
  position: relative;
  margin-bottom: 18px;
}
.timeline_text {
  position: relative;
  display: inline-block;
  margin-bottom: 18px;
  font-size: 14px;
  color: rgba(23, 35, 61, 0.75);
  letter-spacing: 0;
  text-align: center;
  line-height: 22px;
}
.timeline_text:after,
.timeline li:first-child .timeline_icon:after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  width: 0px;
  height: 18px;
  border-left: 1px solid rgba(23, 35, 61, 0.1);
  z-index: 0;
}
.timeline li:last-child .timeline_text:after {
  display: none;
}
</style>