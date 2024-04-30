<template>
    <div ref="menuRef" class="nav-menu">
        <div
            v-for="(item,index) in treeData"
            :key="index"
            class="nav-item"
            :style="{backgroundColor: isHeighLight(item) ?'#e6f7ff':''}"
            @click="clickSelectItem(item)"
        >
            <div class="nav-label">
                <slot name="label" :data="item">
                    <span class="nav-checkbox" :class="{checked : select.includes(item.value)}" @click.stop="toogleSelect(item)" ></span>
                    <span class="nav-text">{{ item.label }}</span>
                </slot>
            </div>
            <!-- 向右箭头 -->
            <svg
                v-show="!loadingMap[item.value] && ((item.children?.length > 0) || (loadData && !item.isLeaf))"
                class="arrow-right"
                focusable="false"
                data-icon="right"
                aria-hidden="true"
                viewBox="64 64 896 896"
            ><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"/></svg>
            <!-- 加载图标 -->
            <svg
                v-show="loadingMap[item.value]"
                class="nav-loading"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 1024 1024"
            ><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"/></svg>
        </div>
        <div v-show="!props.parentRecord?.isfinished && !props.isFinished && props.lazy" ref="endLineRef" class="end-line flex flex-center">
            <span class="text-#333">加载中</span>
            <svg
                class="nav-loading"
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
        :parent-record="props.treeData.find((item:Record<string, any>) => item.value === expand)"
        @change="nextSelectChange"
    >
        <template #label="{data}: any">
            <slot name="label" :data="data"></slot>
        </template>
    </RootNav>
</template>

<script lang='ts' setup>
import { nextTick, onBeforeUnmount } from 'vue';
import RootNav from './MutipleRootNav.vue';

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

// =================== 选中项 ====================
// 展开项
const expand = ref<(string | number)>();
// 保存不同的父级对应的选中项
const select = ref<(string | number)[]>([]);
// 切换选择
function toogleSelect(record: Record<string, any>) {
    if(select.value.includes(record.value)) {
        select.value = select.value.filter((item)=>item !== record.value);
        emit('change', [record.value], 'remove');
    }else{
        select.value.push(record.value);
        emit('change', [record.value], 'add');
    }
}
// 点击某一项
function clickSelectItem(record: Record<string, any>) {
    if(expand.value === record.value) return;
    expand.value = record.value;
    loadNextData(record);
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
    select.value = [];
    // 清空下级选中项
    nextNavRef.value?.clearSelect();
    nextTreeData.value = [];
}
// 更新选中项,用于设置默认值
function updateSelect(value: (string | number)[]) {
    select.value = [];
    for(const data of props.treeData) {
        if(value.includes(data.value)) {
            select.value.push(data.value);
        }
    }
    nextTick(()=>{
        nextNavRef.value?.updateSelect(value);
    });
}
function nextSelectChange(record: (string | number)[], type: 'add' | 'remove') {
    emit('change', expand.value ? [expand.value, ...record] : record, type);
}
// 更新下级options，动态加载数据
let unwatchMap:Record<string, any> = {};
function updateNextOptions(record: Record<string, any>) {
    loadingMap.value[record.value] = true;
    unwatchMap[record.value] = watch(()=>record.children?.length, (length: number)=>{
        // 两次加载同时触发，保证先后顺序
        if(length && record.value === expand.value) {
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
    return expand.value === record.value;
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
    display: flex;
    flex-direction: column;
    width: 10rem;
    border-right: 1px solid #f0f0f0;
    padding: 5px 0;
    overflow: auto;
    .nav-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        height: 2rem;
        padding: 0 0.35rem;
        cursor: pointer;
        transition: all 0.3s;
        &:hover{
            background-color: #f5f5f5;

        }
    }
    .nav-checkbox{
        flex-shrink: 0;
        box-sizing: border-box;
        position: relative;
        top: -0.07rem;
        inset-inline-start: 0;
        display: block;
        width: 1rem;
        height: 1rem;
        direction: ltr;
        background-color: #ffffff;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        border-collapse: separate;
        transition: all 0.3s;
        &.checked{
            background-color: #1677ff;
            border-color: #1677ff;
            &::after{
                opacity: 1;
                transform: rotate(45deg) scale(1) translate(-50%,-50%);
                transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
            }
        }
        &:after{
            box-sizing: border-box;
            position: absolute;
            top: 50%;
            inset-inline-start: 21.5%;
            display: table;
            width: 5.7142857142857135px;
            height: 9.142857142857142px;
            border: 2px solid #fff;
            border-top: 0;
            border-inline-start: 0;
            transform: rotate(45deg) scale(0) translate(-50%,-50%);
            opacity: 0;
            content: "";
            transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
        }
    }
    .arrow-right{
        flex-shrink: 0;
        width: 0.75rem;
        height: 0.75rem;
        margin-left: 0.75rem;
    }
    .nav-loading{
        flex-shrink: 0;
        width: 0.75rem;
        height: 0.75rem;
        margin-left: 0.75rem;
        animation: rotate 1s linear infinite;
    }
    .nav-label{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 0.5rem;
        cursor: pointer;
        overflow: hidden;
        .nav-text{
            transform: translateY(-0.06rem);
            margin-left: 0.5rem;
        }
    }
    .nav-label > :deep(*) ,
    .nav-label > * {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

}
</style>