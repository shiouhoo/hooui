<script setup lang="ts">
import ExpandContainer from '../package/expandcontainer/Index.vue';
import ExpandContainerUnocss from '../package/expandcontainer/Unocss.vue';
import BaseTab from './BaseTab.vue';

const expand = ref(false);

const height = ref('50px');

const position = ref<'bottom' | 'top'>('bottom');

const changePostion = () => {
    position.value = position.value === 'bottom' ? 'top' : 'bottom';
};

const iconSize = ref(20);

</script>

<template>
    <a-button type="primary" @click="changePostion">切换position</a-button>
    <div class="wrapper">
        <BaseTab>
            <template #common>
                <ExpandContainer
                    v-model:expand="expand"
                    :height="height"
                    :style="`height: ${position === 'top' ? '150px' : ''};`"
                    :position="position"
                    :iconSize="iconSize"
                >
                    <div class="list">
                        <div class="item" v-for="(item,index) in '123456789123456789'" :key="index">item{{ item }}</div>
                    </div>
                </ExpandContainer>
            </template>
            <template #unocss>
                <ExpandContainerUnocss
                    v-model:expand="expand"
                    :height="height"
                    :style="`height: ${position === 'top' ? '150px' : ''};`"
                    :position="position"
                    :iconSize="iconSize"
                >
                    <div class="list">
                        <div class="item" v-for="(item,index) in '123456789123456789'" :key="index">item{{ item }}</div>
                    </div>
                </ExpandContainerUnocss>
            </template>
        </BaseTab>

    </div>
</template>

<style scoped lang="less">
.wrapper{
  width: 500px;
  :deep(.block-body){
    padding: 10px;
    background-color: #73F46C;
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
