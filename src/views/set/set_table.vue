<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <!-- <table>
                <tr v-for="item in row" :key="item.setId">
                    <td class="expand-value">{{ item.setId }}</td>
                    <td class="expand-value">{{ item.setType }}</td>
                    <td class="expand-value">{{ item.setName }}</td>
                    <td class="expand-value">{{ item.data }}</td>
                    <td class="expand-value">{{ item.dataType }}</td>
                    <td class="expand-value">{{ item.readWrite }}</td>
                    <td class="expand-value">{{ item.maxMin }}</td>
                    <td class="expand-value">{{ item.decimal }}</td>
                    <td class="expand-value">{{ item.ifDecimal }}</td>
                    <td class="expand-value">{{ item.note }}</td>
                    <td class="expand-value">                        
                        <a href="javascript:void(0)" @click="view" style="marign-right:5px;">编辑</a>
                        <a href="javascript:void(0)" @click="view" style="marign-right:5px;">删除</a>
                    </td>
                </tr>
            </table> -->
            <Row v-for="item in row" :key="item.setId">
                <Col span="3">
                    <span class="expand-value">{{ item.setId }}</span>
                </Col>
                <Col span="3">
                    <span class="expand-value">{{ item.setType }}</span>
                </Col>
                <Col span="2">
                    <span class="expand-value">{{ item.setName }}</span>
                </Col>
                <Col span="2">
                    <span class="expand-value">{{ item.data }}</span>
                </Col>
                <Col span="2">
                    <span class="expand-value">{{ item.dataType }}</span>
                </Col>
                <Col span="2">
                    <span class="expand-value">{{ item.readWrite }}</span>
                </Col>
                <Col span="2">
                    <span class="expand-value">{{ item.maxMin }}</span>
                </Col>
                <Col span="2">
                    <span class="expand-value">{{ item.decimal }}</span>
                </Col>
                <Col span="2">
                    <span class="expand-value">{{ item.ifDecimal }}</span>
                </Col>
                <Col span="2">
                    <span class="expand-value">{{ item.note }}</span>
                </Col>
                <Col span="2">
                    <span class="expand-value">
                        <a href="javascript:void(0)" @click="view" style="marign-right:5px;">编辑</a>
                        <a href="javascript:void(0)" @click="view" style="marign-right:5px;">删除</a>
                    </span>
                </Col>
            </Row>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        methods:{            
            view: () => {
                this.show(params.index)
            },
            delete: () => {
                this.remove(params.index)
            }
        }
    };
</script>