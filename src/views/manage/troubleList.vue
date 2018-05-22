<!-- 运维管理-产品库管理 -->
<template>
    <div class="manage-right troubleList">
        <div class="top-bar clearfix">
            产品反馈和售后
            <div class="fr">
                <Select v-model="model1" style="width:160px" placeholder="产品型号">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Input class="search" v-model="searchName" icon="ios-search" placeholder="输入产品名称搜索..." style="width: 160px"></Input>
                <Select v-model="model1" style="width:160px" placeholder="产品状态">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期范围" style="width: 240px"></DatePicker>
            </div>
        </div>
        <div class="manage-content">
            <div class="content">
                <h3>产品故障单
                </h3>
                <table class="mytable">
                        <thead>
                          <tr>
                            <th width="7%">序号</th>
                            <th width="13%">故障时间</th>
                            <th width="10%">产品ID</th>
                            <th width="10%">故障时长</th>
                            <th width="10%">故障原因</th>
                            <th width="10%">故障次数</th>
                            <th width="10%">故障状态</th>
                            <th width="10%">处理人</th>
                            <th width="10%">处理措施</th>
                            <th width="10%">用户反馈</th>
                          </tr>
                        </thead>
                         <tbody>
                           <tr v-for="(item,index) in tableData">
                             <td>{{index+1}}</td>
                             <td>{{item.time}}</td>
                             <td>{{item.productId}}</td>
                             <td>{{item.duration}}</td>
                             <td>{{item.reason}}</td>
                             <td>{{item.times}}</td>
                             <td>{{item.condition}}</td>
                             <td>{{item.operator}}</td>
                             <td>{{item.measure}}</td>
                             <td>{{item.feedback}}</td>
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
        name: "troubleList",
        data() {
            return {
                tableData: {}
            };
        },
        beforeCreate() {
            // 传值给父级main.vue（第二个导航）
            this.$emit("set-manage-menu", "products");
        },
        mounted() {
            this.mockTableData();
        },
        methods: {
            mockTableData() {
                let data = [];
                for (let i = 0; i < 100; i++) {
                    data.push({
                      time:"2018.04.03 15:21",
                      productId:"15603018537",
                      duration:"14:21:12",
                      reason:"功能点失灵 ",
                      times:"2 ",
                      condition:"已修复 ",
                      operator:"张三",
                      measure:"后台调控",
                      feedback:"xxxx"
                    });
                }
                this.tableData=data;
            }
        }
    };
</script>
<style lang="less" scoped>
    .troubleList {
        .fr{float: right;}
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