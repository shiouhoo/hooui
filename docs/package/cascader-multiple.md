---
outline: [2,3]
---

# CascaderMultiple

一个只能父子节点分开选择的级联选择器 <br/>

特点：

- 支持选项中使用插槽
- 支持选项当前页懒加载以及下一页懒加载
- 只能父子节点分开

## 源文件


[CascaderRadio.vue](https://github.com/shiouhoo/hooui/blob/main/src/package/cascader/multiple/MultipleCascader.vue)


## 示例

### 基本使用

:::demo

```vue
<script setup lang="ts">
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
            {
                value: 'ningbo',
                label: 'Ningbo',
                children: [
                    {
                        value: 'dongqianlake',
                        label: 'Dongqian Lake',
                    },
                ],
            },
            {
                value: 'wenzhou',
                label: 'Wenzhou',
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


</script>

<template>
    <CascaderMultiple
        class="m-10px w-20rem!"
        v-model:value="value"
        :options="options"
    >
    </CascaderMultiple>
</template>

<style>
</style>

```
:::

### 插槽

:::demo

```vue
<script setup lang="ts">
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
            {
                value: 'ningbo',
                label: 'Ningbo',
                children: [
                    {
                        value: 'dongqianlake',
                        label: 'Dongqian Lake',
                    },
                ],
            },
            {
                value: 'wenzhou',
                label: 'Wenzhou',
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


</script>

<template>
    <CascaderMultiple
        class="m-10px w-20rem!"
        v-model:value="value"
        :options="options"
    >
    <template #label="{data}">
        <span style="color: #348;font:700">{{ data.label}}</span>
    </template>
    </CascaderMultiple>
</template>

<style>
</style>

```
:::


### 懒加载

当前页懒加载和下一页懒加载

:::demo

```vue
<script setup lang="ts">
const value = ref<string[]>([]);

const options = ref<Record<string, any>[]>([]);
// 一级菜单是否加载完成，其余菜单的标识在options数据的父节点上
const isFinished = ref(false);
// data为当前菜单的父节点,parent为当前菜单加载的页码
function loadData(data: Record<string, any> | undefined, pageNum:number) {
    setTimeout(() => {
        if(data) {
            !data.children && (data.children = []);
            const list = [...data.children];
            for(let i = pageNum * 10;i < pageNum * 10 + 10;i++) {
                list.push({
                    value: 'zhejiang' + i + Math.random(),
                    label: 'Zhejiang' + i,
                    // 懒加载时，需要标识是否是叶子节点
                    isLeaf: true,
                });
            }
            // 可直接修改data.children，也可修改options变量
            data.children = list;
        }else{
            for(let i = pageNum * 10;i < pageNum * 10 + 10;i++) {
                options.value.push({
                    value: 'zhejiang' + i + Math.random(),
                    label: 'Zhejiang-text' + i,
                    // 懒加载时，需要标识是否是叶子节点
                    isLeaf: false,
                });
            }
        }
        if(pageNum === 1) {
            // 二级及以上菜单的加载标识
            data && (data.isfinished = true);
            !data && (isFinished.value = true);
        }
    }, 1000);
}

</script>

<template>
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

```
:::

## props 参数

<script setup lang="ts">

const data = [
    {
        name: 'value(v-model)',
        desc: '选中项',
        type: '((string | number)[])[]',
        defaultValue: '-',
    },
    {
        name: 'options',
        desc: '下拉菜单数据',
        type: 'Record<string, any>[]',
        defaultValue: '[]',
    },
    {
        name: 'loadData',
        desc: '懒加载数据的方法',
        type: '(label: Record<string, any> | undefined, pageNum:number) => void',
        defaultValue: '-',
    },
    {
        name: 'lazy',
        desc: '是否懒加载,需要配合loadData使用',
        type: 'boolean',
        defaultValue: 'false',
    },
    {
        name: 'isFinished',
        desc: '第一页数据是否加载完毕，其余页数据加载标识在上级options数据中,lazy为true时有效',
        type: 'boolean',
        defaultValue: 'false',
    },
];

const data2 = [
    {
        name: 'change',
        desc: '选中值改变时触发',
        params: 'value: ((string | number)[])[]',
    },
];

const data3 = [
    {
        name: 'label',
        desc: '选项的插槽，参数为当前选项的数据',
        params: '-',
    },
];
</script>
<ParamsTable :data="data"></ParamsTable>

## 事件

<EmitTable :data="data2"></EmitTable>

## 插槽

<SlotTable :data="data3"></SlotTable>
