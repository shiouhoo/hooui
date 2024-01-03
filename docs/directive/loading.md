---
outline: [2,3]
---

# v-h-loading
这是一个作用于`pc`上，用于在元素上添加一个loading效果，弥补了antdv没有loading指令的缺陷。
## 使用
### 源文件

[loading.ts](https://github.com/shiouhoo/hooui/blob/main/src/directive/loading.ts)，以及同级目录下的components文件夹下的LoadingComponent组件(在组件中可以改变loading的样式)。
<DemoLoading></DemoLoading>

### 组件内部使用
::: details 显示代码

```vue
<script setup lang="ts">
import { loadingDirective } from './directive/loading';

const vHLoading = loadingDirective.directive;

const loading = ref(true);

</script>
<template>
  <header>
    <div class="wrapper" v-h-loading="loading">
      这里会加载
    </div>
  </header>
</template>
```
:::

## 参数值

boolean值，用于控制loading的显示和隐藏。

## 参数

### h-loading-text
loading的文字，默认为`加载中...`

<DemoLoading text="这是自定义文字。。。"></DemoLoading>
::: details 显示代码

```vue
<script setup lang="ts">

const loading = ref(true);

</script>
<template>
    <div class="wrapper" v-h-loading="loading" h-loading-text="这是自定义文字。。。">
        这里会加载
    </div>
</template>
```
:::