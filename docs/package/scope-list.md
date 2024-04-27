---
outline: [2,3]
---

# ScopeList 

## 局部滚动列表

滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。
<br/>
同vant的List组件不同的是，ScopeList是一个`局部滚动`的组件。

## 源文件

<div class="un-prefer-unocss"></div>

[ScopeList.vue](https://github.com/shiouhoo/hooui/blob/main/src/package/scope-list/Index.vue)

<div class="prefer-unocss"></div>

[ScopeList.vue](https://github.com/shiouhoo/hooui/blob/main/src/package/scope-list/Unocss.vue)

## 示例

### 基本使用

和vant的list组件一样，通过 loading 和 finished 两个变量控制加载状态，当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

:::demo

```vue
<template>
    <ScopeList
        v-model:loading="loading"
        :finished="finished"
        @load="load"
        class="wrapper"
    >
        <div v-for="(item,index) in list" :key="index">
            <div class="item">{{ item }}</div>
        </div>
    </ScopeList>
</template>

<script setup lang="ts">

const loading = ref(false);
const finished = ref(false);
const list = ref<number[]>([]);

function load() {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
        for (let i = 0;i < 10;i++) {
            list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 20) {
            finished.value = true;
        }
    }, 1000);
}


</script>

<style scoped lang="less">
.wrapper{
  width: 400px;
  height: 300px;
  background-color: #f5f5f5;
  .item{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
  }
}
</style>
```
:::


## props 参数

<script setup lang="ts">

const data = [
    {
        name: 'loading(v-model)',
        desc: '是否处于加载状态，加载过程中不触发 load 事件',
        type: 'boolean',
        defaultValue: 'false',
    },
    {
        name: 'finished',
        desc: '是否已加载完成，加载完成后不再触发 load 事件',
        type: 'boolean',
        defaultValue: 'false',
    },
];

const data2 = [
    {
        name: 'load',
        desc: '滚动到底部时触发',
        params: '',
    },
];

const data3 = [
    {
        name: 'default',
        desc: '内容插槽',
        params: '-',
    },
];
</script>

<ParamsTable :data="data"></ParamsTable>

## 事件

<EmitTable :data="data2"></EmitTable>

## 插槽

<SlotTable :data="data3"></SlotTable>
