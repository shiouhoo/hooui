<script setup lang="ts">
import SearchScopeInput from './package/searchscopeinput/Index.vue';

const loading = ref(0);

const options = [{
    label: 'label1',
    value: 'value1'
}, {
    label: 'label2',
    value: 'value2'
}];

const select = ref('value1');

const input = ref('value1');

</script>

<template>
    <header>
        <div class="wrapper" v-h-loading="loading" h-loading-text="sdf">
            <SearchScopeInput :options="options" v-model:select="select" v-model:input="input"></SearchScopeInput>
        </div>
        <div v-h-copy="true" class="flex items-center" @click="loading++">测试复制</div>
    </header>
</template>

<style scoped lang="less">
.wrapper{
  width: 500px;
  height: 500px;
  background: rgb(181, 206, 135);
}
</style>
