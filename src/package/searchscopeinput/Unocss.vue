<template>
    <a-input-group compact class="search-scope-input flex">
        <a-select
            class="search-select flex-shrink-0 w-20%"
            :options="options"
            :fieldNames="fieldNames"
            :value="select"
            @update:value="(selectValue : any)=> emit('update:select', selectValue)"
            :placeholder="placeholder[0]"
            @change="onChangeSelect"
        >
        </a-select>
        <a-input
            value="input"
            class="search-input"
            :placeholder="placeholder[1]"
            @update:value="(inputValue : string)=> emit('update:input', inputValue)"
            @change="onChangeInput"
            @blur="onBlurInput"
            @press-enter="onEnterInput"
        >
            <template #suffix>
                <slot name="suffix">
                    <svg
                        focusable="false"
                        class="input-icon w-1rem h-1rem cursor-pointer"
                        data-icon="search"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="64 64 896 896"
                        @click="onClick"
                    ><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
                </slot>
            </template>
        </a-input>
    </a-input-group>
</template>

<script lang='ts' setup>
import type { SelectValue } from 'ant-design-vue/lib/select';

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

const emit = defineEmits(['update:select', 'update:input', 'select-change', 'input-change', 'input-blur', 'input-enter', 'input-click']);
/** 选择器 */
function onChangeSelect(value: SelectValue) {
    emit('select-change', value);
}
/** 输入框 */

function onChangeInput(e: Event) {
    emit('input-change', (e.target as HTMLInputElement)?.value);
}
// 失去焦点
function onBlurInput(e: Event) {
    emit('input-blur', (e.target as HTMLInputElement)?.value);
}
// 回车
function onEnterInput(e: Event) {
    emit('input-enter', (e.target as HTMLInputElement)?.value);
}
// 点击图标
function onClick() {
    emit('input-click', props.input);
}
</script>
<style lang='less' scoped>
</style>