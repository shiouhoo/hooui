<template>
    <a-table :columns="columns" :pagination="false" :data-source="data" bordered></a-table>
</template>

<script lang='ts' setup>

withDefaults(defineProps<{
  data: {
    name: string;
    desc: string;
    params: string;
  }[];
}>(),{
  data: () => [],
});

const columns = [
  {
    title: '事件名',
    dataIndex: 'name',
  },
  {
    title: '说明',
    dataIndex: 'desc',
  },
  {
    title: '参数',
    dataIndex: 'params',
  },
];

</script>
<style lang='less' scoped>

</style>