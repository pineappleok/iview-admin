<template>
    <div class="home-main"> 
        <div class="sets">
            <div class="product_info">
                <img class="avator-img" :src="avatorPath" />
                <h3>冷暖白光灯</h3>
                <p class="info">产品ID：20180228</p>
                <a href="javascript:void(0)">编辑产品信息</a>
            </div>
            <div class="table_container">
                <h3 style="margin:24px 0;">功能设置<Button icon="plus" style="margin-left:10px;">添加</Button></h3>
                <Table :columns="columns" :data="tableData" class="table"></Table>
                <h3 style="margin:24px 0;">触发器设置<Button icon="plus" style="margin-left:10px;">添加</Button></h3>
                <Table :columns="columns1" :data="tableData1" class="table"></Table>
            </div>
        </div>
    </div>
</template>

<script>
import expandRow from './set_table.vue';
import expandRow2 from './set_table_trigger.vue';
export default {
    name: 'home_set',
    components: {
        expandRow,
        expandRow2
    },
    data () {
        return {
            transferData: {
                progressActiveIndex: 0,
                isHome: false
            },
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row['functionPoint']
                            }
                        });
                    }
                },
                {
                    title: 'DPID',
                    key: 'setId'
                },
                {
                    title: '功能类型',
                    key: 'setType'
                },
                {
                    title: '名称',
                    key: 'setName'
                },
                {
                    title: '数据点',
                    key: 'data'
                },
                {
                    title: '数据类型',
                    key: 'dataType'
                },
                {
                    title: '读写特性',
                    key: 'readWrite'
                },
                {
                    title: '上下限',
                    key: 'maxMin'
                },
                {
                    title: '小数点数',
                    key: 'decimal'
                },
                {
                    title: '是否传输小数',
                    key: 'ifDecimal'
                },
                {
                    title: '备注',
                    key: 'note'
                },
                {
                    title: '操作',
                    key: 'operate',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index);
                                    }
                                }
                            }, '编辑'),
                            h('a', {
                                on: {
                                    click: () => {
                                        this.remove(params.index);
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            tableData: this.mockSetsData(),
            columns1: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow2, {
                            props: {
                                row: params.row['functionPoint']
                            }
                        });
                    }
                },
                {
                    title: 'DPID',
                    key: 'setId'
                },
                {
                    title: '触发器名称',
                    key: 'tirggerName'
                },
                {
                    title: '触发功能点',
                    key: 'triggerFunction'
                },
                {
                    title: '触发方式',
                    key: 'triggerType'
                },
                {
                    title: '触发结果',
                    key: 'triggerResult'
                },
                {
                    title: '关联功能点',
                    key: 'associate'
                },
                {
                    title: '控制方式',
                    key: 'controlType'
                },
                {
                    title: '备注',
                    key: 'note'
                },
                {
                    title: '操作',
                    key: 'operate',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index);
                                    }
                                }
                            }, '编辑'),
                            h('a', {
                                on: {
                                    click: () => {
                                        this.remove(params.index);
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            tableData1: this.mockSetsData1()
        };
    },
    props: {
        home: Object
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    created () {
        setTimeout( res => {
            this.$emit ("childChange", this.transferData);
        }, 200);
    },
    mounted () {
        alert(11);
    },
    methods: {
        mockSetsData () {
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                    setId: i + 1,
                    setType: '功能集',
                    setName: 'GPS功能集',
                    data: 'smart_1',
                    dataType: '浮点型',
                    readWrite: '可读',
                    maxMin: '12',
                    decimal: '两位小数',
                    ifDecimal: '传输',
                    note: '开发中',
                    functionPoint: [{
                        setId: '0' + (i + 1),
                        setType: '功能点',
                        setName: 'GPS功能集',
                        data: 'smart_1',
                        dataType: '浮点型',
                        readWrite: '可读',
                        maxMin: '12',
                        decimal: '两位小数',
                        ifDecimal: '传输',
                        note: '开发中'}]
                });
            }
            return data;
        },
        mockSetsData1 () {
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                    setId: i + 1,
                    tirggerName: '烟雾报警',
                    triggerFunction: '温度',
                    triggerType: '报警',
                    triggerResult: '电话',
                    associate: '湿度',
                    controlType: '正向',
                    note: '开发中',
                    functionPoint: [{
                        setId: '0' + (i + 1),
                        tirggerName: '烟雾报警',
                        triggerFunction: '温度',
                        triggerType: '报警',
                        triggerResult: '电话',
                        associate: '湿度',
                        controlType: '正向',
                        note: '开发中'},
                    {
                        setId: '00' + (i + 1),
                        tirggerName: '烟雾报警',
                        triggerFunction: '温度',
                        triggerType: '报警',
                        triggerResult: '电话',
                        associate: '湿度',
                        controlType: '正向',
                        note: '开发中'}]
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
            return y + '-' + m + '-' + d + ' ' + hour + ':' + minute;
        }
    }
};
</script>
<style lang="less" scoped>
    .sets{
        position: relative;
        margin:20px 40px 20px 200px;
        .table{
            width:100%;
        }
        .product_info{
            position: absolute;
            left:-200px;
            top:-20px;
            width:160px;
            height:100%;
            box-sizing:border-box;
            padding:56px 22px;
            background:#fff;
            img{
                width:64px;
                height:64px;
            }
            h3{
                padding:5px 0;
                font-size: 14px;
                color: rgba(23,35,61,0.80);
                font-weight:bold;
            }
            .info{
                font-size:12px;
                font-weight: normal;
                color: rgba(23,35,61,0.55);
                line-height: 1;
            }
            a{
                display:inline-block;
                padding-top:24px;
            }
        }
        .ivu-btn{
            border-color:#57a3f3;
            color:#57a3f3;
        }
    }
</style>