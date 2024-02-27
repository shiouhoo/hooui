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
}], '#scroll-box');

onChange(()=>{
    message.info('滚动到了' + tabActive.value);
});

const open = ref<boolean>(false);
const one2 = ref<HTMLElement>();
const two2 = ref<HTMLElement>();
const three2 = ref<HTMLElement>();
const { tabActive: tabDialog } = useTabScroll([{
    key: 'one',
    value: one2 as Ref<HTMLElement>,
}, {
    key: 'two',
    value: two2 as Ref<HTMLElement>,
}, {
    key: 'three',
    value: three2 as Ref<HTMLElement>,
}], '#scroll-box2', 20, open);

const showModal = () => {
    open.value = true;
};

</script>
<template>
    <div class="h-100% flex flex-col">
        <a-button class="w-180px" type="primary" @click="showModal">弹窗内使用</a-button>
        <a-modal v-model:visible="open" title="Basic Modal" >
            <div class="flex gap-20px text-20px ">
                <div
                    :class="{'text-red': tabDialog === 'one'}"
                    class="cursor-pointer"
                    @click="tabDialog = 'one'"
                >1</div>
                <div
                    :class="{'text-red': tabDialog === 'two'}"
                    class="cursor-pointer"
                    @click="tabDialog = 'two'"
                >2</div>
                <div
                    :class="{'text-red': tabDialog === 'three'}"
                    class="cursor-pointer"
                    @click="tabDialog = 'three'"
                >3</div>
            </div>
            <div id="scroll-box2" class="flex-1 w-300px h-400px overflow-auto bg-#f5f5f5">
                <div ref="one2" class="h-300px">
                    这是第一个tab
                </div>
                <div ref="two2" class="h-200px">
                    这是第二个tab
                </div>
                <div ref="three2" class="h-400px">
                    这是第三个tab
                </div>
            </div>
        </a-modal>
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
        <div id="scroll-box" class="flex-1 w-300px overflow-auto bg-#f5f5f5">
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