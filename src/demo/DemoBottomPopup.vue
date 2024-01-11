<template>
    <BaseTab>
        <template #common>
            <BottomPopup v-model:show="show" :popup-props="popupProps" @on-close="onClose" @on-confirm="onConfirm">
                <div v-for="(item,index) in '12345783695786sdfsdf3'" :key="index">
                    <div class="item">{{ item }}</div>
                </div>
                <template #overlay-content>
                    <div class="text-red text-1.5rem">hello popup</div>
                </template>
            </BottomPopup>
            <a-button type="primary" @click="show = true">显示弹窗</a-button>
        </template>
        <template #unocss>
            <BottomPopupUnocss v-model:show="show" :popup-props="popupProps" @on-close="onClose" @on-confirm="onConfirm">
                <div v-for="(item,index) in '12345783695786sdfsdf3'" :key="index">
                    <div class="item">{{ item }}</div>
                </div>
                <template #overlay-content>
                    <div class="text-red text-1.5rem">hello popup</div>
                </template>
            </BottomPopupUnocss>
            <a-button type="primary" @click="show = true">显示弹窗</a-button>
        </template>
    </BaseTab>

</template>

<script lang='ts' setup>
import { ref } from 'vue';
import BaseTab from './BaseTab.vue';
import BottomPopup from '../package/popup/BottomPopup.vue';
import BottomPopupUnocss from '@/package/popup/BottomPopupUnocss.vue';
import { message } from 'ant-design-vue';

const show = ref(false);

const popupProps = {
    title: '这是一个弹窗',
};

function onClose() {
    message.info('onClose');
}

function onConfirm() {
    message.info('onConfirm');
}

</script>
<style lang='less' scoped>
.item{
    height: 2rem;
    margin-bottom: 0.5rem;
    background: pink;
    text-align: center;
}
</style>