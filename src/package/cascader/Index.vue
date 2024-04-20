<template>
    <div class="cascader-radio" @click.stop>
        <div @click="openCascader">
            <a-cascader
                :value="props.value"
                @update:value="clearValue"
                :options="options"
                placeholder="Please select"
                ref="cascader"
                :open="false"
            >
            </a-cascader>
        </div>
        <div v-if="init" v-show="open" class="nav-menus">
            <RootNav
                ref="nextNavRef"
                :tree-data="options"
                :lazy="props.lazy"
                :is-finished="props.isFinished"
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
import RootNav from './RootNav.vue';

// =================== props，emit ====================
const props = withDefaults(defineProps<{
    // 选中项
    value: (string | number)[];
    // 下拉菜单数据
    options: Record<string, any>[];
    // 是否在选择后立即改变
    changeOnSelect?: boolean;
    // 加载数据函数
    loadData?: (label: Record<string, any> | undefined, pageNum:number) => void;
    // 是否懒加载
    lazy?: boolean;
    // 第一页数据是否加载完毕，其余页数据加载标识在上级数据中
    isFinished?: boolean;
}>(), {
    value: ()=>[],
    changeOnSelect: false,
    options: ()=>[],
    lazy: false,
    isFinished: false,
});
const emit = defineEmits(['update:value', 'change']);
provide('loadData', props.loadData);

const init = ref(false);
const nextNavRef = ref();

// =================== 选中项 ====================
const selectValue = ref<(string | number | ((string | number)[]))[]>([]);
if(props.value?.length) {
    selectValue.value = JSON.parse(JSON.stringify(props.value));
}
// clear触发时
function clearValue() {
    open.value = false;
    nextNavRef.value?.clearSelect();
    selectValue.value = [];
    emitChange();
}
function emitChange() {
    emit('change', JSON.parse(JSON.stringify(selectValue.value)));
    emit('update:value', JSON.parse(JSON.stringify(selectValue.value)));
}

// =================== 选中项改变 ====================
function change(record: (string | number)[], isEnd:boolean) {
    selectValue.value = record;
    if(isEnd || props.changeOnSelect) {
        isEnd && (open.value = false);
        emitChange();
    }
}

// =================== 控制下拉菜单的显示和隐藏 ====================
const cascader = ref<HTMLElement>();
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
    width: fit-content;
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