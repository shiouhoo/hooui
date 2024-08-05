---
outline: [2,3]
---

# usePreconditionFunc

在开发的时候经常遇到props中的数据需要格式化，但是数据有还处于请求之中，而父组件直接使用v-if判断该数据是否要渲染子组件则会留下空白，就需要在实现有数据之后才调用格式化函数。
<br />

这是一个封装数据以及副作用函数的hook，该hook返回封装后的函数，该函数会在合适的时机调用传入的副作用函数。
## 源文件

[usePreconditionFunc.ts](https://github.com/shiouhoo/hooui/blob/main/src/hooks/usePreconditionFunc.ts)

## 示例

### 基本使用

:::demo

```vue
<script setup lang="ts">
import { usePreconditionFunc } from '../../src/hooks';

const num = ref();

const text = ref<string>('等待数据加载。。。');

const getData = usePreconditionFunc(num,() => {
    text.value = '页面加载完成';
});
// 会等待监听数据存在之后调用，如果存在着立即调用
getData();

</script>
<template>
    <div >
        {{ text }}
    </div>
    <a-button @click="num = 12"> 点击模拟数据加载完成 </a-button>
</template>
```
:::

## props 参数

<script setup lang="ts">

const data = [
    {
        name: '第一个参数',
        desc: '监听的数据，可以是ref，或者getter函数(一定要是响应式数据)',
        type: 'Ref | Ref[] | (() => any) | [() => any]',
        defaultValue: '-',
    },
    {
        name: '第二个参数',
        desc: '回调函数',
        type: 'Function',
        defaultValue: '-',
    },
];

const data2 = [
    {
        name: 'default',
        desc: '封装后的函数，执行时监听数据不为空这执行，否则使用watch函数监听数据变化后执行',
        type: 'Function',
        defaultValue: '-',
    },
];

</script>

<ParamsTable :data="data"></ParamsTable>

## 返回值

<ParamsTable :data="data2"></ParamsTable>

