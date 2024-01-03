---
outline: [2,3]
---

# v-h-copy
这是一个用于在文本后面添加复制按钮的指令。
## 使用
### 源文件

[copy.ts](https://github.com/shiouhoo/hooui/blob/main/src/directive/copy.ts)

<DemoCopy></DemoCopy>

### 组件内部使用
::: details 显示代码

```vue
<script setup lang="ts">
import copyDirective from '../directive/copy';
import { message } from 'ant-design-vue';

const vHCopy = copyDirective.directive;

function copy(secuss: boolean) {
    if (secuss) {
        message.success('复制成功');
    } else {
        message.error('复制失败');
    }
}

</script>
<template>
    <div class="wrapper" v-h-copy @copy-success="copy(true)" @copy-error="copy(false)">
        这里测试一下复制
    </div>
</template>
```
:::

## 参数值

为空或者为`Truthy`时，会在文本后面添加复制按钮。

## 事件

### copy-success

复制成功时触发

### copy-error

复制失败时触发
