<script setup lang="ts">
import copyDirective from '../directive/copy';
import { message } from 'ant-design-vue';

const vHCopy = copyDirective.directive;

function copy(success: boolean) {
    if (success) {
        message.success('复制成功');
    } else {
        message.error('复制失败');
    }
}

</script>
<template>
    <div class="wrapper" v-h-copy @copy-success="()=>copy(true)" @copy-error="copy(false)">
        这里测试一下复制
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