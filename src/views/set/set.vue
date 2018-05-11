<style lang="less">
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">    
        <Row>
        cececece
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
