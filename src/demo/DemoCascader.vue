<script setup lang="ts">
import CascaderRadio from '../package/cascader/radio/RadioCascader.vue';
import CascaderRadioUnocss from '../package/cascader-unocss/radio/RadioCascader.vue';
import CascaderMutiple from '../package/cascader/mutiple/MutipleCascader.vue';
import BaseTab from './BaseTab.vue';
import { message } from 'ant-design-vue';

const value = ref<string[]>([]);
const value2 = ref<string[]>([]);

const options = ref<Record<string, any>[]>([]);
// options.value = [
//     {
//         value: 'zhejiang',
//         label: 'Zhejiang',
//         children: [
//             {
//                 value: 'hangzhou',
//                 label: 'Hangzhou',
//                 children: [
//                     {
//                         value: 'xihu',
//                         label: 'West Lake',
//                     },
//                 ],
//             },
//             {
//                 value: 'ningbo',
//                 label: 'Ningbo',
//                 children: [
//                     {
//                         value: 'dongqianlake',
//                         label: 'Dongqian Lake',
//                     },
//                 ],
//             },
//             {
//                 value: 'wenzhou',
//                 label: 'Wenzhou',
//                 children: [
//                     {
//                         value: 'jiangxinpark',
//                         label: 'Jiangxin Park',
//                     },
//                 ],
//             }
//         ],
//     },
//     {
//         value: 'jiangsu',
//         label: 'Jiangsu',
//         children: [
//             {
//                 value: 'nanjing',
//                 label: 'Nanjing',
//                 children: [
//                     {
//                         value: 'zhonghuamen',
//                         label: 'Zhong Hua Men',
//                     },
//                 ],
//             },
//         ],
//     },
// ];

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
                    value: 'zhejiang' + i + Math.random(),
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

                {{ value2 }}
                <CascaderMutiple
                    class="m-10px"
                    v-model:value="value2"
                    :options="options"
                    :is-finished="isFinished"
                    :lazy="true"
                    :loadData="loadData"
                >
                </CascaderMutiple>
            </template>
            <template #unocss>
                {{ value }}
                <CascaderRadioUnocss
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
                </CascaderRadioUnocss>
            </template>
        </BaseTab>
    </div>
</template>

<style scoped lang="less">
.wrapper{
  height: 500px;
}
</style>