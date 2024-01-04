<template>
    <a-table :columns="columns" :pagination="false" :data-source="data" bordered></a-table>
</template>

<script lang='ts' setup>

withDefaults(defineProps<{
    data: {
        name: string;
        desc: string;
        type: string;
        defaultValue: string;
    }[];
}>(), {
    data: () => [],
});

const columns = [
    {
        title: '参数名',
        dataIndex: 'name',
    },
    {
        title: '说明',
        dataIndex: 'desc',
    },
    {
        title: '类型',
        dataIndex: 'type',
    },
    {
        title: '默认值',
        dataIndex: 'defaultValue',
    },
];

</script>
<style lang='less' scoped>

</style>