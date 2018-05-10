<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
    .product-ul{
        list-style-type: none;
        margin-left:-19px;
    }
    .product-ul li{
        float: left;
        width:317px;
        height:192px;
        margin:10px;
    }
    .product-ul .ivu-card-bordered{
        width:100%;
        height: 100%;
    }
    .product-ul .name{
        margin-bottom:10px;
        font-weight: bold;
        font-size: 16px;
        color: #17233D;
        line-height: 26px;
    }
    .product-ul .info{
        font-size: 12px;
        color: rgba(23,35,61,0.70);
        line-height: 2;
    }
    .timeline{
        width:100px;
        margin:24px auto 0;
        list-style-type: none;
        text-align: center;
    }
    .timeline_icon{
        width:27px;
        height: 27px;
        background:#fff;
        border: 1px solid rgba(23,35,61,0.15);
        border-radius: 50%;
        line-height:27px;
    }
    .timeline li:first-child .timeline_icon{
        position: relative;
        margin-bottom:18px;
    }
    .timeline_text{
        position: relative;
        display:inline-block;
        margin-bottom:18px;
        font-size: 14px;
        color: rgba(23,35,61,0.75);
        letter-spacing: 0;
        text-align: center;
        line-height: 22px;
    }
    .timeline_text:after,
    .timeline li:first-child .timeline_icon:after{
        content:"";
        position: absolute;
        top:100%;
        left: 50%;
        width:0px;
        height:18px;
        border-left:1px solid rgba(23,35,61,0.10);
        z-index:0;
    }
    .timeline li:last-child .timeline_text:after{
        display:none;
    }
</style>
<template>
    <div class="home-main">    
        <Row>
            <Col span="2">&nbsp;</Col>
            <Col span="18">
                <Row>
                    <ul class="product-ul">
                        <li v-for="item in products">
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
                                    <a href="javascript:void(0)" style="margin-right:8px;">编辑产品</a><a href="javascript:void(0)" style="color: rgba(23,35,61,0.55);">删除</a>
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
                            <Icon type="android-settings" size="18px" class="timeline_icon"></Icon>
                            <br />
                            <span class="timeline_text">功能设置</span> 
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
                    <a href="" style="font-size:14px;font-weight:100%:"><Icon type="android-arrow-dropright-circle" color="#008CF8" style="margin-right:10px;"></Icon>观看演示视频</a>
                </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'home',
    components: {
    },
    data () {
        return {
            products:this.mockProductsData(),
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        mockProductsData () {
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                    productName: '智能冷暖白光灯' +(i+1)+'(CW)',
                    status: '开发中',
                    start:this.formatDate(new Date()),
                    update: this.formatDate(new Date()),
                    imgSrc:'../images/logo.png'
                });
            }
            return data;
        },
        formatDate (date) {
            const y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let hour = date.getHours();
            hour = hour < 10 ? ('0' + hour) : hour;
            let minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            return y + '-' + m + '-' + d+ ' ' + hour+ ':' + minute;
        }
    }
};
</script>
