<template>
    <Layout>
        <template  v-if="show" #sidebar-nav-before>
            <div class="wrapper">
                <span>是否使用 unocss：</span>
                <a-switch :checked="preferUnocss" @change="toggleUnocssAPI" ></a-switch>
            </div>
        </template>
        <template  #nav-bar-title-after>
            <!-- <span class="pl-10px text-16px">v</span> -->
            <div class="pl-20px text-14px text-[rgba(60,60,67)] font-400">{{ pkg.version }}</div>
        </template>
    </Layout>
</template>

<script lang='ts' setup>
import DefaultTheme from 'vitepress/theme';
import { preferUnocssKey, preferUnocss } from '../preferences';
import { Ref, computed } from 'vue';
import { useRoute } from 'vitepress';
import pkg from '../../../package.json';
const route = useRoute();

const show = computed(() =>
    /^\/hooui\/(directive|package)\//.test(route.path)
);

const { Layout } = DefaultTheme;

const toggleUnocssAPI = useToggleFn(
    preferUnocssKey,
    preferUnocss,
    'docs-prefer-unocss'
);
function useToggleFn(
    storageKey: string,
    state: Ref<boolean>,
    className: string
) {
    if (typeof localStorage === 'undefined') {
        return () => {};
    }
    const classList = document.documentElement.classList;
    return (value = !state.value) => {
        if ((state.value = value)) {
            classList.add(className);
        } else {
            classList.remove(className);
        }
        localStorage.setItem(storageKey, String(state.value));
    };
}

toggleUnocssAPI(preferUnocss.value);

</script>
<style lang='less' scoped>
.wrapper{
    font-size: 14px;
    border-bottom: 1px solid var(--vp-c-divider);
    transition: border-color 0.5s, background-color 0.5s ease;
    position: sticky;
    top: -0.5px;
    padding: 10px 0;
    z-index: 10;
    color: #666;
}
</style>