<script setup lang="ts">
import ExpandContainer from '../package/expandcontainer/Index.vue';
import { ref } from 'vue';

withDefaults(defineProps<{
    height: string;
    position?: 'bottom' | 'top';
    iconSize?: number;
}>(), {
    position: 'bottom',
    iconSize: 20
});

const expand = ref(false);

</script>

<template>
    <div class="wrapper">
        <ExpandContainer
            v-model:expand="expand"
            :height="height"
            :position="position"
            :iconSize="iconSize"
        >
            <div class="list">
                <div class="item" v-for="(item,index) in '123456789123456789'" :key="index">item{{ item }}</div>
            </div>
        </ExpandContainer>
    </div>
</template>

<style scoped lang="less">
.wrapper{
  width: 500px;
  :deep(.block-body){
    padding: 10px;
    background-color: #f1dfdf;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    .item{
        margin-top: 5px;
        width: 20%;
    }
  }
}
</style>
