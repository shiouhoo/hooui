---
outline: [2,3]
---

# SearchScopeInput
这是一个带有下拉框的搜索框。
## 使用
### 源文件

[SearchScopeInput.vue](https://github.com/shiouhoo/hooui/blob/main/src/package/searchscopeinput/Index.vue)

<DemoSearchScopeInput></DemoSearchScopeInput>

::: details 显示代码

```vue
<script setup lang="ts">
import { ref } from 'vue';

const options = [{
    label: 'label1',
    value: 'value1'
}, {
    label: 'label2',
    value: 'value2'
}];

const select = ref();

const input = ref('');


</script>

<template>
    <div class="wrapper">
        <SearchScopeInput
            :options="options"
            v-model:select="select"
            v-model:input="input"
        ></SearchScopeInput>
    </div>
</template>
```
:::

## props 参数

### select(v-model)

选中的值

### input(v-model)

输入框的值

### options

下拉框的选项

### fieldNames

同antdv的fieldNames

### placeholder

数组，第一个元素为下拉框的placeholder，第二个元素为输入框的placeholder

## 事件

### select-change

下拉框选中值改变时触发，参数为选中的值

### input-change

输入框值改变时触发，参数为输入框的值

### input-blur

输入框失去焦点时触发，参数为输入框的值

### input-enter

输入框按下回车时触发，参数为输入框的值

## 插槽

### suffix

输入框右侧图标