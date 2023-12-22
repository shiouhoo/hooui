<script setup lang="ts">
import { loadingDirective } from './directive/loading';

const vHLoading = loadingDirective.directive;

const loading = ref(true);

</script>

<template>
  <header>
    <div class="wrapper" v-h-loading="loading">
    </div>
  </header>
</template>

<style scoped lang="less">
.wrapper{
  width: 500px;
  height: 500px;
  background: red;
}
</style>
