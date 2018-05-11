<template>
    <div class="home-main" id="sets">    
        <Row>            
            <Col span="5" class="sets_left">
                <Row>
                    <img class="avator-img" :src="avatorPath" />
                </Row>
                <Row>冷暖白光灯</Row>
                <Row>产品ID：20180228</Row>
                <Row>
                    <a href="javascript:void(0)">编辑产品信息</a>
                </Row>
            </Col>
            <Col span="19" class="sets_right">
                <!-- <Row class="sets">
                    <Col span="8">
                        <span class="expand-key">Job: </span>
                        <span class="expand-value">{{ row.job }}</span>
                    </Col>
                    <Col span="8">
                        <span class="expand-key">Interest: </span>
                        <span class="expand-value">{{ row.interest }}</span>
                    </Col>
                    <Col span="8">
                        <span class="expand-key">Birthday: </span>
                        <span class="expand-value">{{ row.birthday }}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <span class="expand-key">Favorite book: </span>
                        <span class="expand-value">《{{ row.book }}》</span>
                    </Col>
                    <Col span="8">
                        <span class="expand-key">Favorite movie: </span>
                        <span class="expand-value">{{ row.movie }}</span>
                    </Col>
                    <Col span="8">
                        <span class="expand-key">Favorite music: </span>
                        <span class="expand-value">{{ row.music }}</span>
                    </Col>
                </Row> -->
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'home_set',
    components: {
    },
    data () {
        return {
            products:this.mockProductsData()
        };
    },
    props: {
        home:Boolean
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    created() {
        setTimeout(res=>{

        },2000)
        
    },
    mounted(){
            this.$emit("childChange",false);
alert(1)
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
<style lang="less" scoped>
    #sets .sets_left{
        background:#fff;
    }
</style>