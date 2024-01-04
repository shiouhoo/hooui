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
    <div v-h-copy @copy-success="copy(true)" @copy-error="copy(false)">
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

### 文本过长

有的时候文字超出了盒子所设定的宽度，需要用额外的样式来处理

:::demo
 
```vue

<template>
    <!-- 这里wrapper的样式只是为了demo -->
    <span class="wrapper" v-h-copy style="display: flex; align-items: center;">
        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            这是一段过长的文本，父盒子有溢出隐藏，测试一下复制
        </span>
    </span>
</template>
<style scoped lang="less">

.wrapper {
    display: inline-block;
    width: 300px;
    padding: 0 5px;
    border: 1px solid #ccc;
}

</style>
```
:::


<script setup lang="ts">

const data = [
    {
        name: 'v-h-copy',
        desc: '是否显示复制图标,为空或者为`Truthy`时，会在文本后面添加复制按钮',
        type: 'boolean',
        defaultValue: 'false',
    }
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

## 参数值
<ParamsTable :data="data"></ParamsTable>

## 事件
<EmitTable :data="data2"></EmitTable>


