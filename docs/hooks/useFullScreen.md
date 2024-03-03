---
outline: [2,3]
---

# useFullScreen

这是一个全屏的hook，可以快速将一个元素全屏显示,并且支持了iframe。

## 源文件

[useFullScreen.ts](https://github.com/shiouhoo/hooui/blob/main/src/hooks/useFullScreen.ts)

## 示例

### 基本使用

:::demo

```vue
<script setup lang="ts">
import { useFullScreen } from '../../src/hooks';

const dom = ref<HTMLElement>();

const { isFull } = useFullScreen(dom as Ref<HTMLElement>);

function handleClick() {
    isFull.value = !isFull.value;
}

</script>
<template>
    <div ref="dom" class="h-100% flex flex-col bg-#f5f5f5 p-20px" border="1px solid red">
        <a-button class="w-180px" type="primary" @click="handleClick">{{isFull?"退出全屏":"全屏" }}</a-button>
    </div>
</template>
```
:::

### 局域内全屏

将元素在他的祖先容器中全屏显示，祖先元素会被修改为relative且无论中间节点是否有定位。

:::demo

```vue
<script setup lang="ts">
import { useFullScreen } from '../../src/hooks';

const dom = ref<HTMLElement>();
/** 局域内全屏 */
const boxDom = ref<HTMLElement>();

const { isFull: isFull2 } = useFullScreen(boxDom as Ref<HTMLElement>, dom as Ref<HTMLElement>);

function handleClick2() {
    isFull2.value = !isFull2.value;
}

</script>
<template>
    <div ref="dom" class="h-300px flex flex-col bg-#f5f5f5 p-20px" border="1px solid red">
        <div ref="boxDom" class="w-30% h-30% flex flex-col mt-20px bg-#999" border="1px solid red">
            <a-button class="w-180px" type="primary" @click="handleClick2">{{isFull2?"退出全屏":"局域内全屏" }}</a-button>
        </div>
    </div>
</template>
```
:::

## props 参数

<script setup lang="ts">

const data = [
    {
        name: '第一个参数',
        desc: '要全屏的节点',
        type: 'Ref<HTMLElement>| string | HTMLElement',
        defaultValue: '-',
    },
    {
        name: '第二个参数',
        desc: '全屏容器，将目标节点在此容器上全屏，不填默认为window',
        type: 'Ref<HTMLElement>| string | HTMLElement | Window ',
        defaultValue: 'window',
    },
];

const data2 = [
    {
        name: 'isFull',
        desc: '标识是否全屏',
        type: 'Ref<boolean>',
        defaultValue: '-',
    },
];

</script>

<ParamsTable :data="data"></ParamsTable>

## 返回值

<ParamsTable :data="data2"></ParamsTable>

