<template>
    <div class="block">
        <div class="block-bg" :class="[position === 'top' ? 'isTop' : 'isBottom']">
            <div class="block-body" :style="{'max-height': maxHeight}">
                <div ref="slotRef">
                    <slot>
                    </slot>
                </div>
            </div>
            <div class="down-icon" :style="position === 'top' ? { bottom: maxHeight } : {}">
                <template v-if="(!isExpand && position === 'bottom') || (isExpand && position === 'top')">
                    <slot name="down">
                        <!-- 没有展开。箭头向下 -->
                        <svg
                            @click="toggle"
                            focusable="false"
                            class=""
                            data-icon="down"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            viewBox="64 64 896 896"
                        ><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>
                    </slot>
                </template>
                <template v-else>
                    <slot name="up">
                        <!-- 展开了。箭头向上 -->
                        <svg
                            @click="toggle"
                            focusable="false"
                            class=""
                            data-icon="up"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            viewBox="64 64 896 896"
                        ><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path></svg>
                    </slot>
                </template>
            </div>

        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, watch, computed, nextTick } from 'vue';

const props = withDefaults(defineProps<{
    height: string;
    expand?: boolean;
    position?: 'bottom' | 'top';
    iconSize?: number;
    duration?: string;
}>(), {
    height: '50px',
    expand: false,
    position: 'bottom',
    iconSize: 20,
    duration: '0.3s'
});

const emit = defineEmits(['update:expand', 'expand-change']);

const iconHeight = computed(() => props.iconSize + 'px');

/** 图标定位 */
const maxHeight = ref(props.height);
const slotRef = ref<HTMLElement>();
function setTop(expand: boolean) {
    const style = window.getComputedStyle(document.querySelector('.block-body')!); // 获取元素的所有 CSS 属性值

    const paddingTop = style?.getPropertyValue('padding-top') || '0'; // 获取 padding-top 的值
    const paddingBottom = style?.getPropertyValue('padding-bottom') || '0'; // 获取 padding-bottom 的值
    const slotHeight = (slotRef.value?.offsetHeight || 0) + parseInt(paddingTop) + parseInt(paddingBottom);
    maxHeight.value = expand ? slotHeight + 'px' : props.height;
}

const isExpand = ref<boolean>(props.expand);
watch(() => props.expand, (value) => {
    isExpand.value = value;
    nextTick(() => {
        setTop(value);
    });
}, { immediate: true });

function toggle() {
    isExpand.value = !isExpand.value;
    setTop(isExpand.value);
    emit('update:expand', isExpand.value);
    emit('expand-change', isExpand.value);
}

</script>
<style lang='less' scoped>
.block {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    min-height: 100%;
    .block-bg.isBottom{
        padding-bottom: v-bind(iconHeight);
    }
    .block-bg.isTop{
        position: absolute;
        z-index: 1;
        width: 100%;
        padding-top: v-bind(iconHeight);
        height: calc(v-bind(maxHeight) + v-bind(iconHeight));
        transition: height v-bind(duration) linear;
        bottom: 0;
    }
    .block-body{
        width: 100%;
        overflow: hidden;
        transition: max-height v-bind(duration) linear;
    }
    .down-icon{
        width: v-bind(iconHeight);
        height: v-bind(iconHeight);
        position: absolute;
        left: 50%;
        transition: bottom v-bind(duration) linear;
        transform: translate(-50%, 0px);
        cursor: pointer;
        svg{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
