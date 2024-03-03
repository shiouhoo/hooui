<script setup lang="ts">
import { useFullScreen } from '../hooks';

const dom = ref<HTMLElement>();

const { isFull } = useFullScreen(dom as Ref<HTMLElement>);

function handleClick() {
    isFull.value = !isFull.value;
}

/** 局域内全屏 */
const boxDom = ref<HTMLElement>();

const { isFull: isFull2 } = useFullScreen(boxDom as Ref<HTMLElement>, dom as Ref<HTMLElement>);

function handleClick2() {
    isFull2.value = !isFull2.value;
}

</script>
<template>
    <div ref="dom" class="h-100% flex flex-col bg-#f5f5f5 p-20px" border="1px solid red">
        <a-button class="w-180px" type="primary" @click="handleClick">{{isFull?"退出全屏":"全屏" }}</a-button>
        <div class="w-100% h-100%">
            <div ref="boxDom" class="w-30% h-30% flex flex-col mt-20px bg-#999" border="1px solid red">
                <a-button class="w-180px" type="primary" @click="handleClick2">{{isFull2?"退出全屏":"局域内全屏" }}</a-button>
            </div>

        </div>
    </div>
</template>

<style scoped lang="less">

</style>