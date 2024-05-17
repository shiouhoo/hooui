<script setup lang="ts">

withDefaults(defineProps<{
  text?: string;
}>(), {
    text: '加载中...'
}
);

import { ref } from 'vue';
import loadingDirective from '../directive/loading/loading';

const vHLoading = loadingDirective.directive;

const loading = ref(true);

</script>
<template>
    <div class="wrapper" v-loading="loading" :h-loading-text="text">
        这里测试一下loading
    </div>
</template>

<style scoped lang="less">
.wrapper{
  width: 500px;
  height: 100px;
  padding: 20px;
  color: black;
  border: 1px solid #f1dfdf;
}
</style>