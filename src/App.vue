<script setup lang="ts">
import DemoExpandContainer from './demo/DemoExpandContainer.vue';
import DemoSearchScopeInput from './demo/DemoSearchScopeInput.vue';
import DemoCopy from './demo/DemoCopy.vue';
import DemoLoading from './demo/DemoLoading.vue';
import DemoBottomPopup from './demo/DemoBottomPopup.vue';
import DemoTabScroll from './demo/DemoTabScroll.vue';
import DemoFullScreen from './demo/DemoFullScreen.vue';
import DemoCascader from './demo/DemoCascader.vue';
import DemoScopeList from './demo/DemoScopeList.vue';

const selectedKeys = ref<string[]>(['Copy']);
const openKeys = ref<string[]>([]);
const selectCom = shallowRef<any>(DemoCopy);

window.onbeforeunload = function () {
    localStorage.setItem('selectedKeys', JSON.stringify(selectedKeys.value));
    localStorage.setItem('openKeys', JSON.stringify(openKeys.value));
};
onMounted(()=>{
    const keys = localStorage.getItem('selectedKeys');
    openKeys.value = JSON.parse(localStorage.getItem('openKeys') || '[]');
    if (keys) {
        selectedKeys.value = JSON.parse(keys);
        // 使用功能dfs查找对应的组件
        const dfs = (list: Record<string, any>[], key: string) => {
            for (let i = 0;i < list.length;i++) {
                if (list[i].name === key) {
                    selectCom.value = list[i].component;
                    return;
                }
                if (list[i].children) {
                    dfs(list[i].children, key);
                }
            }
        };
        dfs(tabs, selectedKeys.value[0]);
    }
});

function titleClick(tabList: Record<string, any>, key:string) {
    selectCom.value = tabList.find((item: any) => item.name === key)?.component;
}

const tabs: Record<string, any>[] = [
    {
        name: 'directive',
        children: [
            {
                name: 'Copy',
                component: DemoCopy
            },
            {
                name: 'Loading',
                component: DemoLoading
            },
        ]
    },
    {
        name: 'hooks',
        children: [
            {
                name: 'FullScreen',
                component: DemoFullScreen
            },
            {
                name: 'TabScroll',
                component: DemoTabScroll
            }
        ]
    },
    {
        name: 'components',
        children: [
            {
                name: 'BottomPopup',
                component: DemoBottomPopup
            },
            {
                name: 'Cascader',
                component: DemoCascader
            },
            {
                name: 'ExpandContainer',
                component: DemoExpandContainer
            },
            {
                name: 'ScopeList',
                component: DemoScopeList
            },
            {
                name: 'SearchScopeInput',
                component: DemoSearchScopeInput
            },
        ]
    }
];
</script>

<template>
    <a-layout has-sider>
        <a-layout-sider
            :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
        >
            <div class="logo" ></div>
            <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" theme="dark" mode="inline">
                <template v-for="item in tabs" :key="item.name">
                    <template v-if="!item.children">
                        <a-menu-item :key="item.name" @click="()=>titleClick(item, item.name)">
                            {{ item.name }}
                        </a-menu-item>
                    </template>
                    <a-sub-menu v-else :key="item.name" :title="item.name">
                        <template v-for="com in item.children" :key="com.name">
                            <template v-if="!com.children">
                                <a-menu-item :key="com.name" @click="()=>titleClick(item.children, com.name)">
                                    {{ com.name }}
                                </a-menu-item>
                            </template>
                            <a-sub-menu v-else :key="com.name" :title="com.name">
                                <a-menu-item v-for="c in com.children" :key="c.name" @click="()=>titleClick(item.children, c.name)">{{ com.name }}</a-menu-item>
                            </a-sub-menu>
                        </template>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout class="flex flex-col ml-200px h-100vh" >
            <a-layout-content class="flex-1 overscroll-auto bg-#fff p-20px" :style="{ margin: '24px 16px 0', overflow: 'auto' }">
                <component :is="selectCom"></component>
            </a-layout-content>
            <a-layout-footer class="flex-shrink-0" :style="{ textAlign: 'center' }">
                Copyright © 2023-present shiouhoo
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<style scoped lang="less">
</style>