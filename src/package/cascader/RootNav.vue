<template>
    <div class="nav-menu flex flex-col w-10rem overflow-auto py-5px">
        <div v-for="(item,index) in treeData" :key="index" class="nav-item h-2rem flex items-center justify-between px-0.35rem flex-shrink-0 cursor-pointer hover:bg-#f5f5f5" :class="{'bg-#e6f7ff!':select === item.label}" @click="clickSelectItem(item.label)">
            <div class="flex flex-center cursor-pointer">
                <span class="ml-0.5rem -translate-y-0.08rem">{{ item.label }}</span>
            </div>
            <!-- 向右箭头 -->
            <svg
                v-show="item.children && item.children.length > 0"
                class="w-1rme h-1rem"
                focusable="false"
                data-icon="right"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
            ><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"/></svg>
        </div>
    </div>
    <RootNav v-if="existNext" :tree-data="nextTreeData" :index="props.index+1"></RootNav>
</template>

<script lang='ts' setup>
import RootNav from './RootNav.vue';

const props = withDefaults(defineProps<{
    treeData: Record<string, any>[];
    index?: number;
}>(), {
    index: 0,
});

const nextTreeData = ref<Record<string, any>[]>([]);

const existNext = computed(() => {
    return nextTreeData.value && nextTreeData.value?.length > 0;
});

const select = ref<string | number>('');

function clickSelectItem(label:string | number) {
    select.value = label;
    nextTreeData.value = props.treeData.find((item : Record<string, any>) => item.label === label)?.children || [];
}

</script>
<style lang='less' scoped>
.nav-menu{
    border-right: 1px solid #f0f0f0;
    .nav-item{
        transition: all 0.3s;
    }
}
</style>