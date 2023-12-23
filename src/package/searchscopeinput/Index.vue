<template>
    <a-input-group compact class="search-scope-input">
        <a-select
            class="search-select"
            :options="options"
            :fieldNames="fieldNames"
            v-model:value="selectValue"
            :placeholder="placeholder[0]"
            @change="onChangeSelect"
        >
        </a-select>
        <a-input
            v-model:value="inputValue"
            class="search-input"
            :placeholder="placeholder[1]"
            @change="onChangeInput"
            @blur="onBlurInput"
            @press-enter="onEnterInput"
        >
            <template #suffix>
                <slot name="suffix">
                    <svg focusable="false" class="input-icon" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
                </slot>
            </template>
        </a-input>
    </a-input-group>
</template>

<script lang='ts' setup>
import { ref, watch } from 'vue';

const props = withDefaults(defineProps<{
    options: Record<string, any>[];
    fieldNames?: Record<string, string>;
    select?: string | number;
    input?: string | number;
    placeholder?: string[];
}>(), {
    option: () => [],
    fieldNames: () => ({ label: 'label', value: 'value' }),
    placeholder: () => ['请选择', '请输入'],
});

const emit = defineEmits(['update:select', 'update:input', 'select-change', 'input-change', 'input-blur', 'input-enter']);
/** 选择器 */
const selectValue = ref();
watch(() => props.select, (value) => {
    selectValue.value = value;
}, { immediate: true });
function onChangeSelect() {
    emit('update:select', selectValue.value);
    emit('select-change', selectValue.value);
}
/** 输入框 */
const inputValue = ref();
watch(() => props.input, (value) => {
    inputValue.value = value;
}, { immediate: true });
function onChangeInput() {
    emit('update:input', inputValue.value);
    emit('input-change', inputValue.value);
}
// 失去焦点
function onBlurInput() {
    emit('input-blur', inputValue.value);
}
// 回车
function onEnterInput() {
    emit('input-enter', inputValue.value);
}

</script>
<style lang='less' scoped>
.search-scope-input{
    display: flex;
    .search-select{
        flex-shrink: 0;
        min-width: 20%;
    }
    .search-input{
        flex: 1;
    }
    .input-icon{
        cursor: pointer;
    }
}
</style>