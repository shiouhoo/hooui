---
outline: [2,3]
---

# BottomPopup

一个移动端弹窗

## 源文件

<div class="un-prefer-unocss"></div>

[BottomPopup.vue](https://github.com/shiouhoo/hooui/blob/main/src/package/popup/BottomPopup.vue)

<div class="prefer-unocss"></div>

[BottomPopup.vue](https://github.com/shiouhoo/hooui/blob/main/src/package/popup/BottomPopupUnocss.vue)

## 示例

### 直接使用

不想添加额外组件的情况下直接使用

:::demo

```vue
<template>
    <van-button @click="show = !show">显示/隐藏</van-button>
    <van-popup
        v-model:show="show"
        round
        :style="{ height: '70%' }"
        position="bottom"
    >
        <div class="popup-main flex flex-col h-100%">
            <div class="header flex justify-between items-center text-1.25rem px-0.5rem py-0.75rem">
                <span class="close-btn w-1.5rem h-1.5rem" @click="show = false">
                    <svg class="w-100% h-100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg>
                </span>
                <span class="title text-#666">弹窗</span>
                <span class="confirm-btn" @click="onConform">确定</span>
            </div>
            <div class="flex-1 overflow-auto">这是内容</div>
            <div class="w-100% h-5.88rem bg-#fff bottom-0 p-0.75rem">
                <van-button
                    type="primary"
                    size="normal"
                    class="confirm-btn mt-0.75rem w-100% text-center"
                    @click="onConform"
                >
                    确认
                </van-button>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">

const show = ref(false);

const onConform = () => {
    console.log('确定')
};

</script>
```
:::

### 基本使用

:::demo

```vue
<template>
    <van-button @click="show = !show">显示/隐藏</van-button>
    <BottomPopup
        v-model:show="show"
    ></BottomPopup>
</template>

<script setup lang="ts">

const show = ref(false);

</script>
```
:::


## props 参数

<script setup lang="ts">

const data = [
    {
        name: 'show(v-model)',
        desc: '是否显示',
        type: 'boolean',
        defaultValue: '-',
    },
    {
        name: 'height',
        desc: '弹窗高度',
        type: 'string',
        defaultValue: '75%',
    },
    {
        name: 'closepos',
        desc: '关闭按钮的位置',
        type: 'left | right',
        defaultValue: 'left',
    },
    {
        name: 'conformText',
        desc: '确认按钮的文字',
        type: 'string',
        defaultValue: '确定',
    },
    {
        name: 'popupProps',
        desc: 'vant组件popup支持的所有参数',
        type: 'Record<string, any>',
        defaultValue: '{}',
    },
];

const data2 = [
    {
        name: 'on-close',
        desc: '弹窗关闭按钮时触发',
        params: '',
    },
    {
        name: 'on-confirm',
        desc: '点击确认按钮时触发',
        params: '',
    },
];

const data3 = [
    {
        name: 'default',
        desc: '内容插槽',
        params: '-',
    },
    {
        name: 'header',
        desc: '头部插槽',
        params: '-',
    },
    {
        name: 'overlay-content',
        desc: '遮罩层内容插槽',
        params: '-',
    },
];
</script>

<ParamsTable :data="data"></ParamsTable>

## 事件

<EmitTable :data="data2"></EmitTable>

## 插槽

<SlotTable :data="data3"></SlotTable>
