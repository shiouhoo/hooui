---
outline: [2,3]
---

# v-h-copy
这是一个用于在文本后面添加复制按钮的指令。

## 源文件

[copy.ts](https://github.com/shiouhoo/hooui/blob/main/src/directive/copy.ts)

## 示例

### 基本使用

:::demo

```vue
<template>
    <div class="wrapper" v-h-copy @copy-success="copy(true)" @copy-error="copy(false)">
        这里测试一下复制
    </div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue';

function copy(secuss: boolean) {
    if (secuss) {
        message.success('复制成功');
    } else {
        message.error('复制失败');
    }
}

</script>
```
:::

## 参数值
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
        name: 'v-h-copy',
        desc: '是否显示loading,为空或者为`Truthy`时，会在文本后面添加复制按钮',
        type: 'boolean',
        defaultValue: 'false',
    }
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
        name: 'copy-success',
        desc: '复制成功时触发',
        params: '无',
    },
    {
        name: 'copy-error',
        desc: '复制失败时触发',
        params: '无',
    },
];
</script>
<a-table :columns="columns" :pagination="false" :data-source="data" bordered></a-table>


## 事件
<a-table :columns="columns2" :pagination="false" :data-source="data2" bordered></a-table>

