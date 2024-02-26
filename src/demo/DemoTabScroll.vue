<script setup lang="ts">
import { message } from 'ant-design-vue';
import { useTabScroll } from '../hooks';

const one = ref<HTMLElement>();
const two = ref<HTMLElement>();
const three = ref<HTMLElement>();

const { tabActive, onChange } = useTabScroll([{
    key: 'one',
    value: one as Ref<HTMLElement>,
}, {
    key: 'two',
    value: two as Ref<HTMLElement>,
}, {
    key: 'three',
    value: three as Ref<HTMLElement>,
}], 'scroll-box');

onChange(()=>{
    message.info('滚动到了' + tabActive.value);
});

</script>
<template>
    <div class="h-100% flex flex-col">
        <div class="flex-shrink-0 text-20px ">
            <div
                :class="{'text-red': tabActive === 'one'}"
                class="cursor-pointer"
                @click="tabActive = 'one'"
            >1</div>
            <div
                :class="{'text-red': tabActive === 'two'}"
                class="cursor-pointer"
                @click="tabActive = 'two'"
            >2</div>
            <div
                :class="{'text-red': tabActive === 'three'}"
                class="cursor-pointer"
                @click="tabActive = 'three'"
            >3</div>
        </div>
        <div id="scroll-box" class="flex-1 overflow-auto">
            <div ref="one" class="h-500px">
                这是第一个tab
            </div>
            <div ref="two" class="h-500px">
                这是第二个tab
            </div>
            <div ref="three" class="h-1000px">
                这是第三个tab
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">

</style>