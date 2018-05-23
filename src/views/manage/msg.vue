<!-- 运维管理-产品库管理 -->
<template>
    <div class="manage-right push">
        <div class="top-bar clearfix">
            APP消息推送
            <div class="fr">
                <Select v-model="pushType" style="width:160px" placeholder="推送类型">
                    <Option v-for="item in pushTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="auditCondition" style="width:160px" placeholder="审核状态">
                    <Option v-for="item in productConditionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期范围" style="width: 240px"></DatePicker>
                <Button class="create" type="primary" icon="plus" @click="ModalCreateProduct = true">新增推送</Button>
            </div>
        </div>
        <div class="manage-content">
            <div class="content">
                <h3>消息列表
                    <Button type="ghost" class="ghost-blue fr">撤销审核</Button>
                </h3>
                <table class="mytable">
                    <thead>
                        <tr>
                            <tr>
                                <th width="5%">
                                    <!-- <Checkbox v-model="tableData.allChecked" @on-change="checkAll(tableData)"></Checkbox> -->
                                    <input type="checkbox" v-model="tableData.allChecked" @change="checkAll(tableData)" />
                                </th>
                                <th width="5%">序号</th>
                                <th width="10%">推送类型</th>
                                <th width="15%">编辑时间</th>
                                <th width="15%">推送时间</th>
                                <th width="10%">题目</th>
                                <th width="10%">内容</th>
                                <th width="7%">审核状态</th>
                                <th width="8%">审核备注</th>
                                <th width="8%">接受APP设备</th>
                                <th width="7%">操作人员</th>
                            </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in tableData.rows" :key="index">
                            <td>
                                <!-- <Checkbox v-model="item.checked" @on-change="check(tableData,item,index)"></Checkbox> -->
                                <input type="checkbox" v-model="item.checked" @change="check(tableData,item,index)" />
                            </td>
                            <td>{{item.no}}</td>
                            <td>{{item.msgType}}</td>
                            <td>{{item.editTime}}</td>
                            <td>{{item.pushTime}}</td>
                            <td>{{item.msgTitle}}</td>
                            <td>{{item.msgCon}}</td>
                            <td>{{item.auditProgress}}</td>
                            <td>{{item.auditNote}}</td>
                            <td>{{item.appId}}</td>
                            <td>{{item.operator}}</td>
                        </tr>
                    </tbody>
                </table>
                <Page :total="100" :page-size="10" :current="1" @on-change="changePage" class="page"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "msg",
        data() {
            return {
                tableData: {},
                pushTypeList: [
                    { label: "系统消息", value: "all" },
                    { label: "升级消息", value: "custom" },
                    { label: "活动消息", value: "show" }],
                productModelList: [
                    { label: "系统消息", value: "all" },
                    { label: "升级消息", value: "custom" },
                    { label: "活动消息", value: "show" }],
                searchId: "",
                auditCondition: "",
                productConditionList: {}
            };
        },
        beforeCreate() {
            // 传值给父级main.vue（第二个导航）
            this.$emit("set-manage-menu", "msg");
        },
        mounted() {
            this.mockTableData();
        },
        methods: {
            mockTableData() {
                let data = [];
                data.allChecked = false;
                data.rows = [];
                for (let i = 0; i < 10; i++) {
                    data.rows.push({
                        no: "00" + (i + 1),
                        msgType: "升级消息",
                        editTime: "2018.5.10",
                        pushTime: "2018.5.12 ",
                        msgTitle: "母亲节",
                        msgCon: "母亲节内容 ",
                        auditProgress: '审核中',
                        auditNote: "全部版本",
                        appId: "15603018537",
                        operator: "汉尼拔"
                    });
                }
                this.tableData = data;
            },
            changePage() {
                // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
                this.mockTableData();
            },
            mockproductModelListData() {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        label: "产品型号" + (i + 1),
                        value: "产品型号" + (i + 1)
                    });
                }
                this.productModelList = data;
            },
            mockproductConditionListData() {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        label: "产品状态" + (i + 1),
                        value: "产品状态" + (i + 1)
                    });
                }
                this.productConditionList = data;
            },
            check(tableData, item, index) {
                console.log('1heihouer');
                if (item.checked) {
                    item.checked = false;
                    tableData.allChecked = false;
                } else {
                    item.checked = true;
                    tableData.allChecked = tableData.rows.every(val => {
                        return !!val.checked;
                    })
                }
            },
            checkAll(tableData) {
                console.log('heihouer');
                tableData.rows.forEach(val => {
                    val.checked = tableData.allChecked ? false : true;
                });
                tableData.allChecked = !tableData.allChecked;
            }
        }
    };
</script>
<style lang="less" scoped>
    .push {
        .fr {
            float: right;
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
                    text-align: left;
                    &:first-child,
                    &:last-child {
                        text-align: center;
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
                    &:first-child,
                    &:last-child {
                        text-align: center;
                    }
                }
            }
            .page {
                margin-top: 20px;
                float: right;
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
            .posR {
                position: relative;
            }
        }
    }
</style>