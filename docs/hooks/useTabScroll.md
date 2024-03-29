---
outline: [2,3]
---

# useTabScroll

这是一个tab滚动的hook。作用类似于`vant`的`tab`组件中的滚动导航。但是vant使用了插槽，需要一定的组件结构，有的时候代码已经成型不方便修改，所以这里提供了一个hook来实现这个功能。

## 源文件

[useTabScroll.ts](https://github.com/shiouhoo/hooui/blob/main/src/hooks/useTabScroll.ts)

## 示例

### 基本使用

滚动位置自动改变ref变量并触发事件，也可以点击tab改变滚动位置。

:::demo

```vue
<script setup lang="ts">
import { message } from 'ant-design-vue';
import { useTabScroll } from '../../src/hooks/useTabScroll';

const one = ref<HTMLElement>(null);
const two = ref<HTMLElement>(null);
const three = ref<HTMLElement>(null);

const { tabActive, onChange } = useTabScroll([{
    key: 'one',
    value: one as Ref<HTMLElement>,
}, {
    key: 'two',
    value: two as Ref<HTMLElement>,
}, {
    key: 'three',
    value: three as Ref<HTMLElement>,
}], '#scroll-box');

onChange(()=>{
    message.info('滚动到了' + tabActive.value);
});

</script>
<template>
    <div class="h-400px flex flex-col">
        <div class="flex-shrink-0 text-20px flex gap-20px">
            <div
                :class="{'text-red': tabActive === 'one'}"
                class="cursor-pointer"
                @click="tabActive = 'one'"
            >1</div>
            <div
                :class="{'text-red': tabActive === 'two'}"
                class="cursor-pointer"
                @click="tabActive = 'two'"
            >2</div>
            <div
                :class="{'text-red': tabActive === 'three'}"
                class="cursor-pointer"
                @click="tabActive = 'three'"
            >3</div>
        </div>
        <div id="scroll-box" class="flex-1 overflow-auto">
            <div ref="one" class="h-150px">
                这是第一个tab
            </div>
            <div ref="two" class="h-200px">
                这是第二个tab
            </div>
            <div ref="three" class="h-250px">
                这是第三个tab
            </div>
        </div>
    </div>
</template>
```
:::

### 在弹窗中使用

由于默认实在onMounted中绑定滚动事件的的，所以在弹窗中使用的时候需要指定在什么时候绑定(或则可以将弹窗内容代码放在另一个组件中保证正确触发滚动容器的事件绑定)。

:::demo

```vue
<script setup lang="ts">
import { message } from 'ant-design-vue';
import { useTabScroll } from '../../src/hooks/useTabScroll';

const open = ref<boolean>(false);
const showModal = () => {
    open.value = true;
};

const { tabActive: tabModal, onChange } = useTabScroll([{
    key: 'one',
    value: '#first',
}, {
    key: 'two',
    value: '#second',
}, {
    key: 'three',
    value: '#third',
}], '#scroll-container', 20, open);

onChange(()=>{
    message.info('滚动到了' + tabModal.value);
});

</script>
<template>
    <a-button class="w-180px" type="primary" @click="showModal">弹窗内使用</a-button>
    <a-modal v-model:visible="open" title="Basic Modal" >
        <div class="flex gap-20px text-20px ">
            <div
                :class="{'text-red': tabModal === 'one'}"
                class="cursor-pointer"
                @click="tabModal = 'one'"
            >1</div>
            <div
                :class="{'text-red': tabModal === 'two'}"
                class="cursor-pointer"
                @click="tabModal = 'two'"
            >2</div>
            <div
                :class="{'text-red': tabModal === 'three'}"
                class="cursor-pointer"
                @click="tabModal = 'three'"
            >3</div>
        </div>
        <div id="scroll-container" class="flex-1 w-300px h-400px overflow-auto bg-#f5f5f5">
            <div id="first" class="h-300px">
                这是第一个tab
            </div>
            <div id="second" class="h-200px">
                这是第二个tab
            </div>
            <div id="third" class="h-400px">
                这是第三个tab
            </div>
        </div>
    </a-modal>
</template>
```
:::

## props 参数

<script setup lang="ts">

const data = [
    {
        name: '第一个参数',
        desc: '目标节点数组，必填',
        type: 'TabScroll[]，类型详情如下',
        defaultValue: '-',
    },
    {
        name: '第二个参数',
        desc: '滚动容器，ref或者支持querySelector的字符串或者节点，不填默认为window',
        type: 'Ref<HTMLElement> | string | HTMLElement',
        defaultValue: 'window',
    },
    {
        name: '第三个参数',
        desc: '目标节点距离顶部的大小，有的时候节点完全从顶部开始并不好看',
        type: 'number',
        defaultValue: '20',
    },
    {
        name: '第四个参数',
        desc: '绑定和解绑的ref变量，为真时绑定滚动事件（确保滚动容器存在），为假时解绑滚动事件',
        type: 'Ref<boolean>',
        defaultValue: 'onMounted时绑定，onUnmounted时解绑',
    },
];

const data2 = [
    {
        name: 'key',
        desc: 'tab的key值，用于标识当前滚动到了哪个tab',
        type: 'string | number',
        defaultValue: '-',
    },
    {
        name: 'value',
        desc: 'tab的节点，用于滚动到这个节点时触发事件,如果是HTMLElement类型，请确保节点存在',
        type: ' HTMLElement | Ref<HTMLElement> | string',
        defaultValue: '-',
    },
];

const data3 = [
    {
        name: 'tabActive',
        desc: '当前滚动到的tab的key值',
        type: 'Ref<string | number>',
        defaultValue: '-',
    },
    {
        name: 'onChange',
        desc: '绑定滚动到tab时触发的事件',
        type: '(func: (key: string | number) => void | any ) => void',
        defaultValue: '-',
    },
];

</script>

<ParamsTable :data="data"></ParamsTable>

## 返回值

<ParamsTable :data="data3"></ParamsTable>


## TabScroll

<ParamsTable :data="data2"></ParamsTable>

