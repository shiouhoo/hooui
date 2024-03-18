<template>
    <div class="relative">
        <a-cascader v-model:value="value" :options="options" placeholder="Please select" >
        </a-cascader>
        <div class="nav-menus absolute z-99 h-15rem top-2.35rem flex">
            <RootNav :tree-data="options"></RootNav>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, watch, computed, nextTick } from 'vue';
import RootNav from './RootNav.vue';

const value = ref<string[]>([]);
const options: Record<string, any>[] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
</script>
<style lang='less' scoped>
.nav-menus{
    font-variant: initial;
    background-color: #fff;
    border-radius: 2px;
    outline: none;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
</style>