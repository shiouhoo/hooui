<template>
    <div class="scope-list">
        <slot></slot>
        <!-- loading状态不影响加载中的显示 -->
        <div v-show="!props.finished" ref="endLineRef" class="end-line end-text">
            <span>加载中</span>
            <svg
                class="nav-loading"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 1024 1024"
            ><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"/></svg>
        </div>
        <div v-show="props.finished" class="end-text">
            没有更多了
        </div>
    </div>
</template>

<script lang='ts' setup>

const props = withDefaults(defineProps<{
    finished: boolean
    loading: boolean
}>(), {
    finished: true,
    loading: false
});

const emit = defineEmits(['update:loading', 'load']);

const endLineRef = ref<HTMLElement>();
let observer: IntersectionObserver;
onMounted(()=>{
    observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !props.loading && !props.finished) {
            emit('update:loading', true);
            emit('load');
        }
    });
    observer.observe(endLineRef.value!);
    // 挂载时判断是否需要加载
    // 触发浏览器重绘
    endLineRef.value!.offsetHeight;

});
onBeforeUnmount(()=>{
    if (observer) {
        observer.disconnect();
    }
});
</script>
<style lang='less' scoped>
.scope-list{
    width: 100%;
    overflow: auto;
    .end-line{
        .nav-loading{
            flex-shrink: 0;
            width: 0.75rem;
            height: 0.75rem;
            margin-left: 0.75rem;
            animation: rotate 1s linear infinite;
        }
    }
    .end-text{
        color: #666;
        margin: 1rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
@keyframes rotate {
    100%{
        transform: rotate(360deg);
    }
}
</style>