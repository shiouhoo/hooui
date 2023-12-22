---
outline: [1,2, 3]
---
<script setup>
import DemoLoading from '../../src/demo/DemoLoading.vue';
</script>
# v-h-loading
这是一个作用于`pc`上，用于在元素上添加一个loading效果，弥补了antdv没有loading指令的缺陷。

## 源文件

[loading.ts](https://github.com/shiouhoo/hooui/blob/main/src/directive/loading.ts)，以及同级目录下的components文件夹下的LoadingComponent组件(在组件中可以改变loading的样式)。
<DemoLoading></DemoLoading>
## 组件内部使用
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
## 全局使用
在main.ts中引入
```ts
import { loadingDirective } from './directive/loading';
const app = createApp(App);
app.directive(loadingDirective.name, loadingDirective.directive);
```