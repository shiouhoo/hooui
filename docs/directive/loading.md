---
outline: [2,3]
---

# v-h-loading
这是一个作用于`pc`上，用于在元素上添加一个loading效果，弥补了antdv没有loading指令的缺陷。

## 源文件

<div class="un-prefer-unocss"></div>

[loading.ts](https://github.com/shiouhoo/hooui/blob/main/src/directive/loading.ts)，以及同级目录下的components文件夹下的LoadingComponent组件(在组件中可以改变loading的样式)。

<div class="prefer-unocss"></div>

[loading.ts](https://github.com/shiouhoo/hooui/blob/main/src/directive/loading.ts)，以及同级目录下的components文件夹下的LoadingComponentUnocss组件(在组件中可以改变loading的样式)。


## 示例

### 基本使用

:::demo

```vue
<template>
    <div class="wrapper" v-h-loading="loading">
        随便写点是吗
    </div>
</template>
<script setup lang="ts">

const loading = ref(true);

</script>

<style scoped lang="less">
.wrapper{
    width: 100%;
    height: 100px;
}
</style>
```
:::

### 自定义加载文字

:::demo

```vue
<template>
    <div class="wrapper" v-h-loading="loading" h-loading-text="这是自定义文字。">
        随便写点是吗
    </div>
</template>
<script setup lang="ts">

const loading = ref(true);

</script>

<style scoped lang="less">
.wrapper{
    width: 100%;
    height: 100px;
}
</style>
```
:::

<script setup lang="ts">

const data = [
    {
        name: 'v-h-loading',
        desc: '是否显示loading',
        type: 'boolean',
        defaultValue: 'false',
    },
    {
        name: 'h-loading-text',
        desc: 'loading的文字',
        type: 'string',
        defaultValue: '加载中...',
    }
];
</script>

## 参数
<ParamsTable :data="data"></ParamsTable>