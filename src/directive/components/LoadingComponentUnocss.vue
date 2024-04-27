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
    <div class="h-mask w-100% h-100% absolute left-0 top-0 right-0 bottom-0 m-auto bg-[rgba(255,255,255,0.9)] z-9">
        <div class="h-loader flex flex-col items-center absolute top-50% left-50% translate--50%">
            <div class="h-icon">
                <svg class="circular inline w-42px h-42px" viewBox="0 0 50 50">
                    <circle class="path" cx="25" cy="25" r="20" fill="none"/>
                </svg>
            </div>
            <div class="h-tip-text color-#3793ff pt-10px">{{ text }}</div>
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
    transition: opacity 0.3s;

    .h-loader {

        .circular {
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

}

</style>