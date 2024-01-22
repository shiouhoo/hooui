<script setup lang="ts">
import BaseTab from './BaseTab.vue';
import SearchScopeInput from '../package/searchscopeinput/Index.vue';
import { message } from 'ant-design-vue';

const options = [{
    label: 'label1',
    value: 'value1'
}, {
    label: 'label2',
    value: 'value2'
}];

const select = ref('label1');

const input = ref('');

function onChange(type: string, value: string) {
    message.info(type + ':' + value);
}

</script>

<template>
    <div class="wrapper">

        <BaseTab>
            <template #common>
                <SearchScopeInput
                    :options="options"
                    v-model:select="select"
                    v-model:input="input"
                    @input-blur="(value) => onChange('input-blur',value)"
                    @input-change="(value) => onChange('input-change',value)"
                    @input-enter="(value) => onChange('input-enter',value)"
                    @select-change="(value) => onChange('select-change',value)"
                    @input-click="(value) => onChange('input-click',value)"
                ></SearchScopeInput>
            </template>
            <template #unocss>
                <SearchScopeInput
                    :options="options"
                    v-model:select="select"
                    v-model:input="input"
                    @input-blur="(value) => onChange('input-blur',value)"
                    @input-change="(value) => onChange('input-change',value)"
                    @input-enter="(value) => onChange('input-enter',value)"
                    @select-change="(value) => onChange('select-change',value)"
                    @input-click="(value) => onChange('input-click',value)"
                ></SearchScopeInput>
            </template>
        </BaseTab>
    </div>
</template>

<style scoped lang="less">
.wrapper{
  width: 400px;
}
</style>