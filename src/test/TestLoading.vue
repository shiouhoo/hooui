<script setup lang="ts">
import { ref } from 'vue';
import { loadingDirective } from '../directive/loading';

const vHLoading = loadingDirective.directive;

const loading = ref(true);

</script>

<template>
  <header>
    <div class="wrapper" v-h-loading="loading">
      这里测试一下加载
    </div>
  </header>
</template>

<style scoped lang="less">
.wrapper{
  width: 500px;
  height: 100px;
  color: black;
  border: 1px solid #f1dfdf;
}
</style>