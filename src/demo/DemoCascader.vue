<script setup lang="ts">
import CustomItem from '../package/cascader/Index.vue';
import BaseTab from './BaseTab.vue';
import { message } from 'ant-design-vue';

const value = ref<string[]>([]);

const options = ref<Record<string, any>[]>([]);
let number = 1;
function loadData(data: Record<string, any> | undefined, pageNum:number) {
    setTimeout(() => {
        if(data) {
            !data.children && (data.children = []);
            for(let i = number;i < 10;i++) {
                data.children.push({
                    value: 'zhejiang' + i,
                    label: 'Zhejiang' + i,
                    isLeaf: true,
                });
            }
        }else{
            for(let i = number;i < 10;i++) {
                options.value.push({
                    value: 'zhejiang' + i,
                    label: 'Zhejiang' + i,
                    isLeaf: false,
                });
            }
        }
        if(pageNum === 1) {
            message.success('数据加载完毕');
            data && (data.isfinished = true);
        }
    }, 1000);
}

</script>
<template>
    <div class="wrapper">
        <BaseTab class="h-100%">
            <template #common>
                {{ value }}
                <CustomItem
                    class="m-10px"
                    v-model:value="value"
                    :options="options"
                    :load-data="loadData"
                    lazy
                >
                    <!-- <template #label="{data}">
                        <span>{{data.value}}</span>
                    </template> -->
                </CustomItem>
            </template>
            <template #unocss>
                <CustomItem class="m-10px"></CustomItem>
            </template>
        </BaseTab>
    </div>
</template>

<style scoped lang="less">
.wrapper{
  height: 500px;
}
</style>