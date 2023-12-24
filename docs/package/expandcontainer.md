---
outline: [2,3]
---

# ExpandContainernput

一个可以展开收起的容器

## 使用
### 源文件

[ExpandContainer.vue](https://github.com/shiouhoo/hooui/blob/main/src/package/ExpandContainer/Index.vue)

### 向下展开
<br/>
<DemoExpandContainer height='75px'></DemoExpandContainer>

::: details 显示代码
```vue
<script setup lang="ts">

const expand = ref(false);

</script>

<template>
    <header>
        <!-- 这里的父类高度不能是固定值，否则会导致展开时的高度错误 -->
        <div class="wrapper">
            <ExpandContainer>
                <div 
                    v-for="(item,index) in '123456789'"
                    :key="index"
                    height="80px"
                    v-model:expand="expand"
                >item{{ item }}</div>
            </ExpandContainer>
        </div>
    </header>
</template>
```
:::
### 向上展开
采用定位实现，需要设置父类的高度
<br />
<DemoExpandContainer height='75px' position="top" style="height: 85px"></DemoExpandContainer>

::: details 显示代码
```vue
<script setup lang="ts">

const expand = ref(false);

</script>

<template>
    <header>
        <div class="wrapper" style="height: 85px">
            <ExpandContainer>
                <div 
                    v-for="(item,index) in '123456789'"
                    :key="index"
                    height="80px"
                    position="top"
                    v-model:expand="expand"
                >item{{ item }}</div>
            </ExpandContainer>
        </div>
    </header>
</template>
```
:::

## props 参数

### expand(v-model)

是否展开

### height

容器收起时的高度

### position

展开方向，可选值为top和bottom，默认为bottom

### iconSize

图标大小，默认为20px，用于计算整个容器的高度

### duration

动画时长，默认为0.3s

## 事件

### expand-change

展开状态改变时触发

## 插槽

### default

容器内容插槽

### down

没有展开，箭头向下时的图标插槽

### up

展开，箭头向上时的图标插槽

## 样式

### .block-bg

这个类名的高度会随着容器的展开而改变，包含了展开图标，用于设置背景