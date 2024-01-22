<template>
    <van-popup
        :show="show"
        round
        position="bottom"
        :style="{ height }"
        v-bind="popupProps"
        @update:show="(flag: any) => onClose(flag)"
    >
        <div class="popup-main">
            <div class="header" :style="`flex-direction: ${closepos === 'left' ? 'row': 'row-reverse'};`">
                <slot name="header">
                    <span class="close-btn" @click="onClose()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg>
                    </span>
                    <span class="title">{{ props.popupProps?.title || '' }}</span>
                    <span v-show="conformText" class="confirm-btn" @click="onConform">{{ conformText }}</span>
                </slot>
            </div>
            <div class="content">
                <slot></slot>
            </div>

            <div class="w-100% h-5.88rem bg-#fff bottom-0 p-0.75rem">
                <van-button
                    type="primary"
                    size="normal"
                    class="confirm-btn mt-0.75rem w-100% text-center"
                    @click="onConform"
                >
                    确认
                </van-button>
            </div>
        </div>
        <template #overlay-content>
            <slot name="overlay-content"></slot>
        </template>
    </van-popup>
</template>

<script lang='ts' setup>

const props = withDefaults(defineProps<{
    show: boolean;
    height?: string;
    closepos?: 'left' | 'right';
    conformText?: string;
    popupProps?: Record<string, any>;
}>(), {
    height: '75%',
    closepos: 'left',
    conformText: '确定',
    popupProps: () => ({})
});

const emit = defineEmits(['update:show', 'on-close', 'on-confirm']);

const onClose = (flag = false) => {
    emit('update:show', flag);
    emit('on-close');
};

const onConform = () => {
    emit('update:show', false);
    emit('on-confirm');
};

</script>
<style lang='less' scoped>
.popup-main{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.header{
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    font-size: 1.25rem;
    padding: 0.5rem 0.75rem;
    .close-btn{
        width: 1.5rem;
        height: 1.5rem;
        svg{
            width: 100%;
            height: 100%;
        }
    }
    .confirm-btn{
        color: #666;
    }
}
.content{
    flex: 1;
    overflow: auto;
}
</style>