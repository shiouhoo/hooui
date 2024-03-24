<template>
    <div class="nav-menu flex flex-col w-10rem overflow-auto py-5px">
        <div v-for="(item,index) in treeData" :key="index" class="nav-item h-2rem flex items-center justify-between px-0.35rem flex-shrink-0 cursor-pointer hover:bg-#f5f5f5" :class="{'bg-#e6f7ff!':select[0] === item.value}" @click="clickSelectItem(item)">
            <div class="nav-label flex flex-center cursor-pointer pl-0.5rem overflow-hidden">
                <slot name="label" :data="item">
                    <span class="nav-text -translate-y-0.08rem">{{ item.label }}</span>
                </slot>
            </div>
            <!-- 向右箭头 -->
            <svg
                v-show="!loadingMap[item.value] && ((item.children?.length > 0) || (loadData && !item.isLeaf))"
                class="w-0.75rem h-0.75rem flex-shrink-0 ml-0.5rem"
                focusable="false"
                data-icon="right"
                aria-hidden="true"
                viewBox="64 64 896 896"
            ><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"/></svg>
            <!-- 加载图标 -->
            <svg
                v-show="loadingMap[item.value]"
                class="nav-loading w-0.75rem h-0.75rem flex-shrink-0 ml-0.5rem"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 1024 1024"
            ><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"/></svg>
        </div>
        <div v-show="!props.parentRecord?.isfinished" ref="endLineRef" class="end-line flex flex-center">
            <span class="text-#333">加载中</span>
            <svg
                class="nav-loading w-0.75rem h-0.75rem flex-shrink-0 ml-0.5rem"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 1024 1024"
            ><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"/></svg>
        </div>
    </div>
    <RootNav
        ref="nextNavRef"
        v-if="existNext"
        :tree-data="nextTreeData"
        :lazy="props.lazy"
        :index="props.index+1"
        :parent-record="props.treeData.find((item:Record<string, any>) => item.value === select[0])"
        @change="nextSelectChange"
    >
        <template #label="{data}: any">
            <slot name="label" :data="data"></slot>
        </template>
    </RootNav>
</template>

<script lang='ts' setup>
import { nextTick, onBeforeUnmount } from 'vue';
import RootNav from './RootNav.vue';

const props = withDefaults(defineProps<{
    treeData: Record<string, any>[];
    index?: number;
    lazy?: boolean;
    parentRecord?: Record<string, any>
}>(), {
    index: 0,
    lazy: false,
});

const emit = defineEmits(['change']);

// 加载数据函数
const loadData = inject<(label?: Record<string, any>, pageNum?: number)=>void>('loadData');

// =================== 记录是否加载过数据以及加载中状态 ====================
const loadNextDataMap:Record<string, any> = {};
const loadingMap = ref<Record<string, any>>({});
// 根据父id保存当前加载的页数
const loadLazyDataMap:Record<string, any> = {};

// =================== 下级数据 ====================
const nextTreeData = ref<Record<string, any>[]>([]);
const existNext = computed(() => {
    return nextTreeData.value?.length > 0;
});
const nextNavRef = ref();

// =================== 选中项 ====================
const select = ref<(string | number)[]>([]);
function clickSelectItem(record: Record<string, any>) {
    if(select.value[0] === record.value) return;
    nextTreeData.value = [];
    select.value[0] = record.value;
    // 清空下级选中项
    nextNavRef.value?.clearSelect();
    // 动态请求数据，只有非叶子节点才请求数据，且只请求一次
    if(loadData) {
        if(record.isLeaf) {
            nextTreeData.value = [];
        } else if(loadNextDataMap[record.value]) {
            nextTreeData.value = record.children;
        } else{
            updateOptions(record);
            loadData(record, 0);
        }
    }else{
        nextTreeData.value = record.children || [];
    }
    emit('change', record, props.index, !nextTreeData.value?.length && !!record?.isLeaf);
}
function clearSelect() {
    select.value[0] = '';
    // 清空下级选中项
    nextNavRef.value?.clearSelect();
    nextTreeData.value = [];
}
// 更新选中项,用于设置默认值
function updateSelect(value: (string | number)[]) {
    const label = value[props.index];
    if(label !== select.value[0]) {
        select.value[0] = label || '';
        nextTreeData.value = props.treeData.find((item : Record<string, any>) => item.value === label)?.children || [];
    }
    nextTick(()=>{
        nextNavRef.value?.updateSelect(value);
    });
}
function nextSelectChange(record:Record<string, any>, index:number, isEnd:boolean) {
    emit('change', record, index, isEnd);
}
// 更新options，动态加载数据
let unwatchMap:Record<string, any> = {};
function updateOptions(record: Record<string, any>) {
    loadingMap.value[record.value] = true;
    unwatchMap[record.value] = watch(()=>record.children?.length, (value)=>{
        // 两次加载同时触发，保证先后顺序
        if(value && record.value === select.value[0]) {
            nextTreeData.value = record.children || [];
        }
        loadingMap.value[record.value] = false;
        loadNextDataMap[record.value] = true;
        unwatchMap[record.value]();
    });
}
onBeforeUnmount(()=>{
    for(const key in unwatchMap) {
        unwatchMap[key]();
    }
});
// =================== 当前组件的选中项的懒加载 ====================
const endLineRef = ref<HTMLElement>();
let observer: IntersectionObserver;
if(props.lazy) {
    onMounted(()=>{
        observer = new IntersectionObserver((entries) => {
            const isfinished = props.parentRecord?.isfinished;
            if(entries[0].isIntersecting && !isfinished) {
                if(loadData) {
                    const pageNum = getLoadPageNum(props.parentRecord?.value || '__top');
                    loadData(props.parentRecord, pageNum);
                }
            }
        });
        observer.observe(endLineRef.value!);
    });
    onBeforeUnmount(()=>{
        if (observer) {
            observer.disconnect();
        }
    });
}
// 获取加载页数
function getLoadPageNum(value: string) {
    if(value === '__top') {
        loadLazyDataMap[value] = 2;
        return 0;
    }
    // 第一个在点击时已经加载过，所以划到底部从第二页开始
    const pageNum = loadLazyDataMap[value] || 1;
    if(loadLazyDataMap[value]) {
        loadLazyDataMap[value]++;
    }else{
        loadLazyDataMap[value] = 2;
    }
    return pageNum;
}

defineExpose({
    clearSelect,
    updateSelect,
    updateOptions
});

</script>
<style lang='less' scoped>
@keyframes rotate {
    100%{
        transform: rotate(360deg);
    }
}
.nav-menu{
    border-right: 1px solid #f0f0f0;
    .nav-item{
        transition: all 0.3s;
    }
    .nav-loading{
        animation: rotate 1s linear infinite;
    }
    .nav-label > *{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>