<template>
    <div ref="cascaderRef" class="cascader-radio" @click.stop>
        <div @click="openCascader">
            <div class="ant-select ant-cascader css-16pw25h ant-select-multiple ant-select-allow-clear">
                <div class="ant-select-selector">
                    <div class="ant-select-selection-overflow">
                        <div v-for="(item,index) in selectValue.slice(0,maxTagNum)" :key="index"   class="ant-select-selection-overflow-item" style="opacity: 1; order: 0;">
                            <span class="ant-select-selection-item" :title="optionMap[item.slice(-1)[0]].label">
                                <span class="ant-select-selection-item-content">{{ optionMap[item.slice(-1)[0]].label }}</span>
                                <span class="ant-select-selection-item-remove" unselectable="on" aria-hidden="true" style="user-select: none;">
                                    <span role="img" aria-label="close" class="anticon anticon-close">
                                        <svg
                                            focusable="false"
                                            data-icon="close"
                                            width="1em"
                                            height="1em"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            fill-rule="evenodd"
                                            viewBox="64 64 896 896"
                                            @click.stop="removeValue(item)"
                                        >
                                            <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"/>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                        </div>
                        <div v-show="selectValue.length > maxTagNum" class="ant-select-selection-overflow-item ant-select-selection-overflow-item-rest" style=" order: 2">
                            <span class="ant-select-selection-item">
                                <span class="ant-select-selection-item-content">+ {{ selectValue.length - maxTagNum }} ...</span>
                            </span>
                        </div>
                    </div>
                    <span v-if="!selectValue.length" class="ant-select-selection-placeholder">Please select</span>
                </div>
                <!-- 清除图标 -->
                <span v-show="selectValue.length" class="ant-select-clear" unselectable="on" aria-hidden="true" style="user-select: none;">
                    <span role="img" aria-label="close-circle" class="anticon anticon-close-circle">
                        <svg
                            focusable="false"
                            data-icon="close-circle"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            fill-rule="evenodd"
                            viewBox="64 64 896 896"
                            @click.stop="changeValue([])"
                        >
                            <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"/>
                        </svg>
                    </span>
                </span>
            </div>
        </div>
        <div v-if="init" v-show="open" class="nav-menus">
            <RootNav
                ref="nextNavRef"
                :tree-data="options"
                :lazy="props.lazy"
                :is-finished="props.isFinished"
                :update-option-map="updateOptionMap"
                @change="change"
            >
                <template #label="{data}: any">
                    <slot name="label" :data="data"></slot>
                </template>
            </RootNav>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, onBeforeUnmount, provide } from 'vue';
import RootNav from './MultipleRootNav.vue';

// =================== props，emit ====================
const props = withDefaults(defineProps<{
    // 选中项
    value: (string | number)[];
    // 下拉菜单数据
    options: Record<string, any>[];
    // 加载数据函数
    loadData?: (label: Record<string, any> | undefined, pageNum:number) => void;
    // 是否懒加载
    lazy?: boolean;
    // 第一页数据是否加载完毕，其余页数据加载标识在上级数据中
    isFinished?: boolean;
}>(), {
    value: ()=>[],
    options: ()=>[],
    lazy: false,
    isFinished: false,
});
const emit = defineEmits(['update:value', 'change']);
provide('loadData', props.loadData);

const init = ref(false);
const nextNavRef = ref();
// 记录id对应的数据
const optionMap = ref<Record<string, any>>({});
function initOptionMap(value: Record<string, any>[]) {
    for(const item of value) {
        optionMap.value[item.value] = item;
        if(item.children && item.children.length) {
            initOptionMap(item.children);
        }
    }
}
initOptionMap(props.options);
function updateOptionMap(value: Record<string, any>[]) {
    for(const item of value) {
        optionMap.value[item.value] = item;
    }
}
// 最大显示数量
const maxTagNum = ref(100);
const cascaderRef = ref();

// =================== 选中项 ====================
const selectValue = ref<((string | number)[])[]>([]);
if(props.value?.length) {
    selectValue.value = JSON.parse(JSON.stringify(props.value));
}
// clear触发时
function changeValue(value: any) {
    selectValue.value = value;
    if(!value.length) {
        open.value = false;
        nextNavRef.value?.clearSelect();
    }else{
        nextNavRef.value?.updateSelect(selectValue.value);
    }
    emitChange();
}
// remove触发时
function removeValue(value: (number | string)[]) {
    selectValue.value = selectValue.value.filter((item)=>item.join('-') !== value.join('-'));
    nextNavRef.value?.updateSelect(selectValue.value);
    emitChange();
}
function emitChange() {
    emit('change', JSON.parse(JSON.stringify(selectValue.value)));
    emit('update:value', JSON.parse(JSON.stringify(selectValue.value)));
}

// =================== 选中项改变 ====================
function change(record: (string | number)[], type : 'add' | 'remove') {
    if(type === 'add') {
        selectValue.value.push(record);
    }else{
        selectValue.value = selectValue.value.filter((item)=>item.join('-') !== record.join('-'));
    }
    const maxWidth = cascaderRef.value.clientWidth - 80;
    // 总字数
    let total = 0;
    maxTagNum.value = selectValue.value.length;
    for(let i = 0;i < selectValue.value.length;i++) {
        const label = optionMap.value[selectValue.value[i].slice(-1)[0]].label;
        label.split('').forEach((item:string)=>{
            total += item.charCodeAt(0) > 255 ? 2 : 1;
        });
        if(total * 6 + (i + 1) * 40 > maxWidth) {
            maxTagNum.value = i;
            break;
        }
    }
    emitChange();
}

// =================== 控制下拉菜单的显示和隐藏 ====================
const open = ref(false);
function openCascader() {
    open.value = true;
    if(!init.value) {
        init.value = true;
        nextTick(()=>{
            nextNavRef.value?.updateSelect(selectValue.value);
        });
    }
}
function closeCascader() {
    open.value = false;
}
document.addEventListener('click', closeCascader);
onBeforeUnmount(()=>{
    document.removeEventListener('click', closeCascader);
});

</script>
<style lang='less' scoped>
.cascader-radio{
    position: relative;
    width: 10rem;
    .ant-cascader{
        width: 100%;
    }
    .nav-menus{
        display: flex;
        position: absolute;
        z-index: 99;
        top: 2.35rem;
        height: 15rem;
        background-color: #fff;
        border-radius: 2px;
        font-variant: initial;
        outline: none;
        box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
        transition: all 3s;
    }
}
</style>