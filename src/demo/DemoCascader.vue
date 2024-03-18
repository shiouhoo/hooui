<script setup lang="ts">
import CustomItem from '../package/cascader/CustomItem.vue';
import BaseTab from './BaseTab.vue';
import { message } from 'ant-design-vue';

</script>
<template>
    <div class="wrapper">
        <BaseTab class="h-100%">
            <template #common>
                <CustomItem class="m-10px"></CustomItem>
            </template>
            <template #unocss>
                <CustomItem class="m-10px"></CustomItem>
            </template>
        </BaseTab>
    </div>
</template>

<style scoped lang="less">
.wrapper{
  height: 500px;
}
</style>