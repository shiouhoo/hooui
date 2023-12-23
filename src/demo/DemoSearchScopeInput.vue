<script setup lang="ts">
import { ref } from 'vue';
import SearchScopeInput from '../package/searchscopeinput/Index.vue';

const options = [{
    label: 'label1',
    value: 'value1'
}, {
    label: 'label2',
    value: 'value2'
}];

const select = ref();

const input = ref('');

</script>

<template>
    <div class="wrapper">
        <SearchScopeInput
            :options="options"
            v-model:select="select"
            v-model:input="input"
        ></SearchScopeInput>
    </div>
</template>

<style scoped lang="less">
.wrapper{
  width: 400px;
}
</style>