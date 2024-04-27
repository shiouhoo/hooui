<script setup lang="ts">
import BaseTab from './BaseTab.vue';
import ScopeList from '../package/scope-list/Index.vue';
import ScopeListUnocss from '../package/scope-list/Unocss.vue';

const loading = ref(false);
const finished = ref(false);
const list = ref<number[]>([]);

function load() {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
        for (let i = 0;i < 10;i++) {
            list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 20) {
            finished.value = true;
        }
    }, 1000);
}

</script>

<template>
    <div class="wrapper">

        <BaseTab>
            <template #common>
                <ScopeList
                    v-model:loading="loading"
                    :finished="finished"
                    @load="load"
                    class="w-100% max-w-50vw h-50vh bg-#f5f5f5"
                >
                    <div v-for="(item,index) in list" :key="index">
                        <div class="flex flex-center mt-1rem">{{ item }}</div>
                    </div>
                </ScopeList>
            </template>
            <template #unocss>
                <ScopeListUnocss
                    v-model:loading="loading"
                    :finished="finished"
                    @load="load"
                    class="w-100% max-w-50vw h-50vh bg-#f5f5f5"
                >
                    <div v-for="(item,index) in list" :key="index">
                        <div class="flex flex-center mt-1rem">{{ item }}</div>
                    </div>
                </ScopeListUnocss>
            </template>
        </BaseTab>
    </div>
</template>

<style scoped lang="less">
.wrapper{
  width: 400px;
}
</style>