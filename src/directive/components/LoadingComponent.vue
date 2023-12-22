<script setup lang="ts">
import { ref } from 'vue';
const text = ref('加载中...');

const setLoadingText = (val: string)=>{
    text.value = val;
};

defineExpose({
    setLoadingText
});

</script>

<template>
    <div class="h-mask">
        <div class="h-loader">
            <div class="h-icon">
                <svg class="circular" viewBox="0 0 50 50">
                    <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
                </svg>
            </div>
            <div class="h-tip-text">{{ text }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@keyframes loading-rotate {
    to {
        transform: rotate(360deg)
    }
}
@keyframes loading-icon {
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0
    }

    50% {
        stroke-dasharray: 90,150;
        stroke-dashoffset: -40px
    }

    to {
        stroke-dasharray: 90,150;
        stroke-dashoffset: -120px
    }
}

.h-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 9;
    transition: opacity 0.3s;

    .h-loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        display: flex;
        flex-direction: column;
        align-items: center;
        .circular {
            display: inline;
            height: 42px;
            width: 42px;
            animation: loading-rotate 2s linear infinite;
            .path{
                animation: loading-icon 1.5s ease-in-out infinite;
                stroke-dasharray: 90,150;
                stroke-dashoffset: 0;
                stroke-width: 2;
                stroke: #409eff;
                stroke-linecap: round;
            }
        }
    }

    .h-tip-text {
        color: #3793ff;
        padding-top: 10px;
    }

}

</style>