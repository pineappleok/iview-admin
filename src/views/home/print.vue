<template>
    <div class="home-main">
        <div class="main-header-con">
            <div class="main-header">
                <div class="breadcrumb">
                    <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                </div>
                <div class="action">
                    <Button type="primary" @click="pageToPrev">返回</Button>
                    <Button type="primary" @click="doPrint">打印</Button>
                </div>
            </div>
        </div>
        <div class="main-content">
            <div class="content no-left">
                <div class="home-debugging-con">
                    <div class="tc">
                        <h3>{{productInfo.name}}</h3>
                        <p>产品ID：<span class="stress">{{productInfo.id}}</span>产品行业：<span class="stress">{{productInfo.industry}}</span>连接方式：<span class="stress">{{productInfo.connection}}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import breadcrumbNav from "../main-components/breadcrumb-nav.vue";
    import topTimeline from "../my-components/top-timeline";
    import leftInfo from "../my-components/left-info";
    export default {
        name: 'home_print',
        components: {
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
                    "http://test.www.yuedujiayuan.com/activity-ui/spring-reading/images/act-student.jpg",
                    industry:'照明行业',
                    connection:"蓝牙"
                },
                cur: 2,
                steps: [{ step: "提交申请", time: "2016.02.20 12:00:00" }, { step: "系统审核", time: "2016.02.20 12:00:00" }, { step: "发布成功", time: "2016.02.20 12:00:00" }],
            };
        },
        computed: {
            currentPath() {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            // 跳上一步骤页面
            pageToPrev() {
                this.$router.go(-1);
            }
        }
    };
</script>
<style lang="less" scoped>
    .home-debugging-con {
        font-size: 14px;
        padding: 25px 2%;
        background: #fff;
    }
</style>