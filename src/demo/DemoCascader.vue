<script setup lang="ts">
import CustomItem from '../package/cascader/Index.vue';
import BaseTab from './BaseTab.vue';
import { message } from 'ant-design-vue';

const value = ref<string[]>([]);

const options = ref<Record<string, any>[]>([]);
options.value = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

const isFinished = ref(false);
function loadData(data: Record<string, any> | undefined, pageNum:number) {
    console.log(data, pageNum);
    setTimeout(() => {
        if(data) {
            !data.children && (data.children = []);
            const list = [...data.children];
            for(let i = pageNum * 10;i < pageNum * 10 + 10;i++) {
                list.push({
                    value: 'zhejiang' + i,
                    label: 'Zhejiang' + i,
                    isLeaf: true,
                });
            }
            data.children = list;
        }else{
            for(let i = pageNum * 10;i < pageNum * 10 + 10;i++) {
                options.value.push({
                    value: 'zhejiang' + i,
                    label: 'Zhejiangfdsaaaaaaaaaa' + i,
                    isLeaf: false,
                });
            }
        }
        if(pageNum === 1) {
            message.success('数据加载完毕');
            data && (data.isfinished = true);
            !data && (isFinished.value = true);
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
                    multiple
                    :is-finished="isFinished"
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