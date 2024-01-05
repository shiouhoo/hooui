<template>
    <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="常规">
            <slot name="common"></slot>
        </a-tab-pane>
        <a-tab-pane key="2" tab="unocss">
            <slot name="unocss"></slot>
        </a-tab-pane>
    </a-tabs>

</template>

<script lang='ts' setup>
const activeKey = ref('1');

</script>
<style lang='less' scoped>

</style>