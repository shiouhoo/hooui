---
outline: [2,3]
---

# ExpandContainernput

一个可以展开收起的容器

## 源文件

[ExpandContainer.vue](https://github.com/shiouhoo/hooui/blob/main/src/package/expandcontainer/Index.vue)


## 示例
### 向下展开

:::demo

```vue
<script setup lang="ts">

const expand = ref(false);

</script>

<template>
    <ExpandContainer
        v-model:expand="expand"
        height="80px"
        :iconSize="20"
    >
        <div class="list">
            <div class="item" v-for="(item,index) in '123456789137458793'" :key="index">item{{ item }}</div>
        </div>
    </ExpandContainer>
</template>

<style scoped lang="less">

:deep(.block-body){
    padding: 10px;
    background-color: #73f46c;
}
.list{
    display: flex;
    flex-wrap: wrap;
    .item{
        margin-bottom: 15px;
        width: 25%;
    }
}
</style>

```
:::

### 向上展开
采用定位实现，需要设置父类的高度
:::demo

```vue
<script setup lang="ts">

const expand = ref(false);

</script>

<template>
    <div style="height:200px">
        <ExpandContainer
            v-model:expand="expand"
            height="80px"
            position="top"
            :iconSize="20"
        >
            <div class="list">
                <div class="item" v-for="(item,index) in '12345678458793'" :key="index">item{{ item }}</div>
            </div>
        </ExpandContainer>
    </div>
</template>

<style scoped lang="less">

:deep(.block-body){
    padding: 10px;
    background-color: #73f46c;
}
.list{
    display: flex;
    flex-wrap: wrap;
    .item{
        margin-bottom: 15px;
        width: 25%;
    }
}
</style>

```
:::

## props 参数

<script setup lang="ts">

const data = [
    {
        name: 'expand(v-model)',
        desc: '是否展开',
        type: 'boolean',
        defaultValue: 'false',
    },
    {
        name: 'height',
        desc: '容器收起时的高度',
        type: 'string',
        defaultValue: '0',
    },
    {
        name: 'position',
        desc: '展开方向，可选值为top和bottom，默认为bottom',
        type: 'string',
        defaultValue: 'bottom',
    },
    {
        name: 'iconSize',
        desc: '图标大小，默认为20，单位为像素，用于计算图标位置',
        type: 'number',
        defaultValue: '20',
    },
    {
        name: 'duration',
        desc: '动画时长，默认为0.3s',
        type: 'number',
        defaultValue: '0.3',
    },
];

const data2 = [
    {
        name: 'expand-change',
        desc: '展开状态改变时触发',
        params: '展开状态',
    },
];

const data3 = [
    {
        name: 'default',
        desc: '容器内容插槽',
        params: '-',
    },
    {
        name: 'down',
        desc: '没有展开，箭头向下时的图标插槽',
        params: '-',
    },
    {
        name: 'up',
        desc: '展开，箭头向上时的图标插槽',
        params: '-',
    },
];
</script>
<ParamsTable :data="data"></ParamsTable>

## 事件

<EmitTable :data="data2"></EmitTable>

## 插槽

<SlotTable :data="data3"></SlotTable>

## 样式

### .block-bg

这个类名的高度会随着容器的展开而改变，包含了展开图标，用于设置背景