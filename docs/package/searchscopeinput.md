---
outline: [2,3]
---

# SearchScopeInput
这是一个带有下拉框的搜索框。

## 源文件

[SearchScopeInput.vue](https://github.com/shiouhoo/hooui/blob/main/src/package/searchscopeinput/Index.vue)

## 示例
### 向下展开

:::demo

```vue
<template>
    <div class="wrapper">
        <SearchScopeInput
            :options="options"
            v-model:select="select"
            v-model:input="input"
        ></SearchScopeInput>
    </div>
</template>

<script setup lang="ts">

const options = [{
    label: 'label1',
    value: 'value1'
}, {
    label: 'label2',
    value: 'value2'
}];

const select = ref();

const input = ref('');

</script>
```
:::


## props 参数

<script setup lang="ts">

const columns = [
    {
        title: '参数名',
        dataIndex: 'name',
    },
    {
        title: '说明',
        dataIndex: 'desc',
    },
    {
        title: '类型',
        dataIndex: 'type',
    },
    {
        title: '默认值',
        dataIndex: 'defaultValue',
    },
];

const data = [
    {
        name: 'select(v-model)',
        desc: '选中的值',
        type: 'string',
        defaultValue: '-',
    },
    {
        name: 'input(v-model)',
        desc: '输入框的值',
        type: 'string',
        defaultValue: '-',
    },
    {
        name: 'options',
        desc: '下拉框的选项',
        type: 'Array<{label: string, value: string}>',
        defaultValue: '-',
    },
    {
        name: 'fieldNames',
        desc: '同antdv的fieldNames',
        type: 'object',
        defaultValue: '-',
    },
    {
        name: 'placeholder',
        desc: '数组，第一个元素为下拉框的placeholder，第二个元素为输入框的placeholder',
        type: 'string[]',
        defaultValue: '-',
    },
];

const columns2 = [
  {
    title: '事件名',
    dataIndex: 'name',
  },
  {
    title: '说明',
    dataIndex: 'desc',
  },
  {
    title: '参数',
    dataIndex: 'params',
  },
];

const data2 = [
    {
        name: 'select-change',
        desc: '下拉框选中值改变时触发，参数为选中的id',
        params: 'value: string',
    },
    {
        name: 'input-change',
        desc: '输入框值改变时触发，参数为输入框的值',
        params: 'value: string',
    },
    {
        name: 'input-blur',
        desc: '输入框失去焦点时触发，参数为输入框的值',
        params: 'value: string',
    },
    {
        name: 'input-enter',
        desc: '输入框按下回车时触发，参数为输入框的值',
        params: 'value: string',
    },
];

const columns3 = [
    {
        title: '插槽名',
        dataIndex: 'name',
    },
    {
        title: '说明',
        dataIndex: 'desc',
    },
    {
        title: '参数',
        dataIndex: 'params',
    },
];

const data3 = [
    {
        name: 'suffix',
        desc: '输入框右侧图标',
        params: '-',
    },
];
</script>

<a-table :columns="columns" :pagination="false" :data-source="data" bordered></a-table>

## 事件

<a-table :columns="columns2" :pagination="false" :data-source="data2" bordered></a-table>


## 插槽
<a-table :columns="columns3" :pagination="false" :data-source="data3" bordered></a-table>
