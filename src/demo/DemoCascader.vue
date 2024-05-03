<script setup lang="ts">
import CascaderRadio from '../package/cascader/radio/RadioCascader.vue';
import CascaderMultiple from '../package/cascader/multiple/MultipleCascader.vue';
import BaseTab from './BaseTab.vue';
import { message } from 'ant-design-vue';

const value = ref<string[]>([]);
const value2 = ref<string[]>([]);

const options = ref<Record<string, any>[]>([]);
options.value = [
    {
        value: 'zhejiang',
        label: '浙江',
        children: [
            {
                value: 'hangzhou',
                label: '杭州',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
            {
                value: 'ningbo',
                label: '宁波',
                children: [
                    {
                        value: 'dongqianlake',
                        label: 'Dongqian Lake',
                    },
                ],
            },
            {
                value: 'wenzhou',
                label: '温州',
                children: [
                    {
                        value: 'jiangxinpark',
                        label: 'Jiangxin Park',
                    },
                ],
            }
        ],
    },
    {
        value: 'jiangsu',
        label: '江苏',
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
    setTimeout(() => {
        if(data) {
            !data.children && (data.children = []);
            const list = [...data.children];
            for(let i = pageNum * 10;i < pageNum * 10 + 10;i++) {
                list.push({
                    value: 'zhejiang' + i + Math.random(),
                    label: 'Zhejiang' + i,
                    isLeaf: true,
                });
            }
            data.children = list;
        }else{
            for(let i = pageNum * 10;i < pageNum * 10 + 10;i++) {
                options.value.push({
                    value: 'zhejiang' + i,
                    label: 'Zhejiang-text' + i,
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
                <CascaderRadio
                    class="m-10px"
                    v-model:value="value"
                    :options="options"
                    :is-finished="isFinished"
                    :lazy="true"
                    :loadData="loadData"
                >
                    <template #label="{data}">
                        <span>{{data.label}}</span>
                    </template>
                </CascaderRadio>
                <div>多选：</div>
                {{ value2 }}
                <CascaderMultiple
                    class="m-10px w-20rem!"
                    v-model:value="value2"
                    :options="options"
                    :is-finished="isFinished"
                    :lazy="true"
                    :loadData="loadData"
                >
                </CascaderMultiple>
            </template>
            <template #unocss>
            </template>
        </BaseTab>
    </div>
</template>

<style scoped lang="less">
.wrapper{
  height: 500px;
}
</style>