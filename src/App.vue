<script setup lang="ts">
import DemoExpandContainer from './demo/DemoExpandContainer.vue';
import DemoSearchScopeInput from './demo/DemoSearchScopeInput.vue';
import DemoCopy from './demo/DemoCopy.vue';
import DemoLoading from './demo/DemoLoading.vue';
import DemoBottomPopup from './demo/DemoBottomPopup.vue';
import DemoTabScroll from './demo/DemoTabScroll.vue';

const selectedKeys = ref<string[]>(['Copy']);

const coms = shallowRef([
    {
        name: 'Copy',
        component: DemoCopy
    },
    {
        name: 'BottomPopup',
        component: DemoBottomPopup
    },
    {
        name: 'ExpandContainer',
        component: DemoExpandContainer
    },
    {
        name: 'Loading',
        component: DemoLoading
    },
    {
        name: 'SearchScopeInput',
        component: DemoSearchScopeInput
    },
    {
        name: 'TabScroll',
        component: DemoTabScroll
    }
]);

</script>

<template>
    <a-layout has-sider>
        <a-layout-sider
            :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
        >
            <div class="logo" ></div>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item v-for="(item) in coms" :key="item.name">
                    <span class="nav-text">{{ item.name }}</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout class="flex flex-col ml-200px h-100vh" >
            <a-layout-content class="flex-1 overscroll-auto bg-#fff p-20px" :style="{ margin: '24px 16px 0', overflow: 'auto' }">
                <component
                    :is="coms.find((item) => item.name === selectedKeys[0])?.component"
                ></component>
            </a-layout-content>
            <a-layout-footer class="flex-shrink-0" :style="{ textAlign: 'center' }">
                Copyright © 2023-present shiouhoo
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<style scoped lang="less">
</style>
