<!-- 运维管理-产品库管理 -->
<template>
    <div class="manage-right appManage">
        <div class="top-bar">
            APP管理
        </div>
        <div class="manage-content">
            <ul class="appManageUl clearfix">
                <li>
                    <span>APP用户总量</span>
                    <b class="num">540,000,000</b>
                </li>
                <li>
                    <span>APP活跃用户量</span>
                    <b class="num">68,000,000</b>
                </li>
                <li>
                    <span>APP绑定产品数量</span>
                    <b class="num">3,560,000</b>
                </li>
                <li>
                    <span>APP解绑产品数量</span>
                    <b class="num">230,000</b>
                </li>
            </ul>
            <div class="content">
                <h3>APP解绑用户原因</h3>
                <div class="charts clearfix">
                    <div class="fl">
                        <div id="appVersion"></div>
                    </div>
                    <div class="fr">
                        <ul class="appVersionLegend">
                            <li v-for="item in versions">
                                <b class="icon" :style="{background:item.color}"></b>{{item.reason}}
                                <i class="percent">{{item.percent}}</i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="content">
                <h3>用户反馈信息
                    <ButtonGroup shape="circle" class="feedbackSelect">
                        <Button v-for="item in feedbackTypes" :key="item.id" type="ghost" :class="item.selected?'selected':''" @click="toggleSelect(item)">{{item.text}}</Button>
                    </ButtonGroup>
                </h3>
                <table class="mytable">
                    <thead>
                        <tr>
                            <th width="10%">标记</th>
                            <th width="15%">用户帐号</th>
                            <th width="25%">反馈内容</th>
                            <th width="20%">反馈时间</th>
                            <th width="20%">绑定产品名称／ID</th>
                            <th width="10%">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in tableData">
                            <td v-if="item.marked">
                                <Icon type="ios-star" color="#f5a624"></Icon>
                            </td>
                            <td v-else>
                                <Icon type="ios-star-outline" color="#c5c8ce"></Icon>
                            </td>
                            <td>{{item.account}}</td>
                            <td class="feedbackCon">{{item.text}}</td>
                            <td>{{item.time}}</td>
                            <td>{{item.productName}}</td>
                            <td>
                                <Icon type="trash-b" color="#2d8cf0"></Icon>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Page :total="100" style="margin-top:20px;float: right;"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "appManage",
        data() {
            return {
                versions: this.mockVersions(),
                appVersion: null,
                feedbackTypes: [
                    { text: "已读", selected: false },
                    { text: "未读", selected: false },
                    { text: "标记", selected: false },
                ],
                tableData: this.mockTableData()

            };
        },
        beforeCreate() {
            // 传值给父级main.vue（第二个导航）
            this.$emit("set-manage-menu", "products");
        },
        mounted() {
            console.log(this.versions);
            var _this = this;
            //基于准备好的dom，初始化echarts实例
            this.appVersion = echarts.init(document.getElementById('appVersion'));
            let appVersionData = [];
            for (var i in this.versions) {
                appVersionData[i] = {
                    value: this.versions[i].num,
                    name: this.versions[i].reason
                }
            };
            this.appVersion.setOption({
                color: ['#2D8CF0', '#2DE2C5', '#FCC45F', '#FF8454', '#DB425A'],
                title: {
                    text: '',
                    subtext: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a}{b} : {c} ({d}%)"
                },
                legend: {
                    show: false,
                    orient: 'vertical',
                    left: 'left',
                    data: ['', '', '', '', '']
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['60%', '70%'],
                        avoidLabelOverlap: false,
                        data: appVersionData,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                    }
                ]
            });
        },
        methods: {
            mockVersions() {
                let data = [],
                    colors = ['#2D8CF0', '#2DE2C5', '#FCC45F', '#FF8454', '#DB425A'],
                    percentlist = [30, 40, 5, 65, 88],
                    reasons = ['系统崩溃', '功能失灵', '设备故障', '更换手机设备', '闲置设备'],
                    all = 0;
                percentlist.map(function (item, index, array) { all += item; console.log(all); });
                for (let i = 0; i < 5; i++) {
                    data.push({
                        color: colors[i],
                        reason: reasons[i],
                        percent: (percentlist[i] * 100 / all).toFixed(2) + '%',
                        num: percentlist[i]
                    });
                }
                return data;
            },
            toggleSelect(data) {
                console.log(111);
                this.feedbackTypes.forEach(function (obj) {
                    obj.selected = false;
                });
                data.selected = true;
            },
            mockTableData() {
                let data = [];
                for (let i = 0; i < 100; i++) {
                    data.push({
                        marked: [true, false][Math.round(Math.random())],
                        account: '11010101' + i,
                        text: '用户反馈内容，列表内最多显示20个字，其余省略用户反馈内容，列表内最多显示20个字，其余省略',
                        time: '2016.02.30 12:00:00',
                        productName: '智能喷头'
                    });
                }
                return data;
            }
        }
    };
</script>
<style lang="less" scoped>
    .appManage {
        .appManageUl {
            list-style-type: none;
            li {
                float: left;
                width: calc(~'25% - 11px');
                margin: 0px 14px 22px 0;
                padding: 22px 25px;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(31, 49, 89, 0.25);
                box-sizing: border-box;
                &:last-child {
                    margin-right: 0;
                }
                span {
                    font-size: 14px;
                    color: #80848F;
                }
                .num {
                    display: block;
                    font-size: 24px;
                    color: #1C2438;
                    font-weight: normal;
                }
            }
        }
        .content {
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 rgba(31, 49, 89, 0.25);
            border-radius: 2px;
            .feedbackSelect {
                float: right;
                .selected {
                    color: #2D8CF0;
                }
            }
            .mytable {
                width: 100%;
                th {
                    padding: 12px 2px;
                    background: rgba(20, 35, 63, 0.04);
                    font-size: 12px;
                    color: #17233D;
                    &:first-child,&:last-child{
                        text-align:center;
                    }
                }
                td {
                    padding: 5px 2px;
                    font-size: 14px;
                    color: rgba(28, 36, 56, 0.80);
                    &.feedbackCon {
                        display: inline-block;
                        width: 98%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        vertical-align: middle;
                    }
                    &:first-child,&:last-child{
                        text-align:center;
                    }
                }
            }
            h3 {
                padding: 16px 24px;
                border-bottom: 1px solid rgba(23, 35, 61, 0.10);
                font-weight: normal;
                font-size: 16px;
                color: #17233D;
            }
            h4 {
                padding: 20px 24px;
                font-size: 14px;
                color: rgba(28, 36, 56, 0.80);
                font-weight: normal;
            }
            #appVersion {
                margin-top: 10px;
                width: 80%;
                height: 224px;
            }
            .fl {
                float: left;
                width: 50%;
                box-sizing: border-box;
            }
            .fr {
                width: 50%;
                float: right;
                box-sizing: border-box;
            }
            .posR {
                position: relative;
            }
            .appVersionLegend {
                padding: 10px 27px 22px;
                list-style-type: none;
                li {
                    padding: 12px 4px 12px 4px;
                    border-bottom: 1px solid rgba(28, 36, 56, 0.08);
                    font-size: 14px;
                    color: rgba(28, 36, 56, 0.80);
                    .icon {
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 12px;
                        background: #2D8CF0;
                        border-radius: 2px;
                        vertical-align: middle;
                    }
                    .percent {
                        float: right;
                        font-style: normal;
                        font-size: 14px;
                        color: rgba(28, 36, 56, 0.56);
                    }
                }
            }
        }
    }
</style>