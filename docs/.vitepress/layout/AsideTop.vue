<template>
    <Layout>
        <template #sidebar-nav-before>
            My custom sidebar top content
        </template>
    </Layout>
</template>

<script lang='ts' setup>
import DefaultTheme from 'vitepress/theme';

const { Layout } = DefaultTheme;

</script>
<style lang='less' scoped>

</style>