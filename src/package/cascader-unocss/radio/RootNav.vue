<template>
    <div ref="menuRef" class="nav-menu flex flex-col w-10rem overflow-auto py-5px">
        <div
            v-for="(item,index) in treeData"
            :key="index"
            class="nav-item h-2rem flex items-center justify-between px-0.35rem flex-shrink-0 cursor-pointer hover:bg-#f5f5f5"
            :class="{'bg-#e6f7ff!': isHeighLight(item) }"
            @click="clickSelectItem(item)"
        >
            <div class="nav-label flex flex-center cursor-pointer pl-0.5rem overflow-hidden">
                <slot name="label" :data="item">
                    <span class="nav-text -translate-y-0.06rem">{{ item.label }}</span>
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
        <div v-show="!props.parentRecord?.isfinished && !props.isFinished && props.lazy" ref="endLineRef" class="end-line flex flex-center">
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
        v-model:tree-data="nextTreeData"
        :lazy="props.lazy"
        :index="props.index+1"
        :parent-record="props.treeData.find((item:Record<string, any>) => item.value === select)"
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
    isFinished?: boolean;
    parentRecord?: Record<string, any>;
}>(), {
    index: 0,
    lazy: false,
    isFinished: false,
    multiple: false,
});

const emit = defineEmits(['change', 'update:tree-data']);

const menuRef = ref<HTMLElement>();

// 加载数据函数
const loadData = inject<(label?: Record<string, any>, pageNum?: number)=>void>('loadData');

// =================== 记录是否加载过数据以及加载中状态 ====================
const loadNextDataMap:Record<string, any> = {};
const loadingMap = ref<Record<string, any>>({});
// 根据父id保存当前加载的页数
const loadLazyDataMap:Record<string, any> = {};
const parentRecordValue = computed(()=>{
    return props.parentRecord?.value || '__top';
});

// =================== 下级数据 ====================
const nextTreeData = ref<Record<string, any>[]>([]);
const existNext = computed(() => {
    return nextTreeData.value?.length > 0;
});
const nextNavRef = ref();

// =================== 单选选中项 ====================
// 保存不同的父级对应的选中项
const select = ref<string | number>();
// 点击某一项
function clickSelectItem(record: Record<string, any>) {
    if(select.value === record.value) return;
    // 清空下级选中项
    nextNavRef.value?.clearSelect();
    select.value = record.value;
    loadNextData(record);
    let isEnd = !nextTreeData.value?.length;
    if(props.lazy) {
        isEnd = isEnd && record?.isLeaf;
    }
    emit('change', [select.value], isEnd);
}
// 加载下级数据
function loadNextData(record: Record<string, any>) {
    // 动态请求数据，只有非叶子节点才请求数据，且只请求一次
    if(loadData) {
        if(record.isLeaf) {
            nextTreeData.value = [];
        } else if(loadNextDataMap[record.value]) {
            nextTreeData.value = record.children;
        } else{
            updateNextOptions(record);
            loadData(record, 0);
        }
    }else{
        nextTreeData.value = record.children || [];
    }
}
// 清空选项
function clearSelect() {
    select.value = '';
    // 清空下级选中项
    nextNavRef.value?.clearSelect();
    nextTreeData.value = [];
}
// 更新选中项,用于设置默认值
function updateSelect(value: (string | number)[]) {
    const label = value[props.index];
    if(label !== select.value) {
        select.value = label || '';
        nextTreeData.value = props.treeData.find((item : Record<string, any>) => item.value === label)?.children || [];
    }
    nextTick(()=>{
        nextNavRef.value?.updateSelect(value);
    });
}
function nextSelectChange(record: (string | number)[], isEnd:boolean) {
    emit('change', [select.value, ...record], isEnd);
}
// 更新下级options，动态加载数据
let unwatchMap:Record<string, any> = {};
function updateNextOptions(record: Record<string, any>) {
    loadingMap.value[record.value] = true;
    unwatchMap[record.value] = watch(()=>record.children?.length, (length: number)=>{
        // 两次加载同时触发，保证先后顺序
        if(length && record.value === select.value) {
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
            // props.isFinished只有在第一级才有
            const isfinish = props.parentRecord?.isfinished;
            if(entries[0].isIntersecting && !isfinish && !props.isFinished) {
                if(loadData) {
                    const pageNum = getLoadPageNum(parentRecordValue.value);
                    updateOptions();
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
// 更新当前options，动态加载数据
function updateOptions() {
    if(props.parentRecord?.value) {
        const record = props.parentRecord!;
        const value = record.value;
        unwatchMap[value] = watch(()=>record.children.length, (length: number)=>{
            if(length && value === record.value) {
                emit('update:tree-data', record.children || []);
            }
            unwatchMap[value]();
        });
    }
}
// 获取加载页数
function getLoadPageNum(value: string) {
    if(value === '__top') {
        !loadLazyDataMap[value] && (loadLazyDataMap[value] = 0);
        return loadLazyDataMap[value]++;
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

// =================== 初始化 ====================
watch(()=>props.parentRecord?.value, ()=>{
    // 滚动到顶部
    nextTick(()=>{
        menuRef.value?.scrollTo(0, 0);
    });
});

// =================== 样式 ====================
function isHeighLight(record: Record<string, any>) {
    return select.value === record.value;
}

defineExpose({
    clearSelect,
    updateSelect,
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
    .nav-label > :deep(*) ,
    .nav-label > * {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

}
</style>