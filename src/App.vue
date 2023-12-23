<script setup lang="ts">
import { loadingDirective } from './directive/loading';
import SearchScopeInput from './package/searchscopeinput/Index.vue';

const vHLoading = loadingDirective.directive;

const loading = ref(false);

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
        <div class="wrapper" v-h-loading="loading">
            <SearchScopeInput :options="options" v-model:select="select" v-model:input="input"></SearchScopeInput>
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
