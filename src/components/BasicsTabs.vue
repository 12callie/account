<template>
  <ul :class="{ [classPrefix + '-tabs']: classPrefix }" class="tabs">
    <li v-for="item in dataSource" :key="item.value" :class="liClass(item)" class="tabs-item" @click="selectTab(item)">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

type DataSourceItem = {
  text: string;
  value: string;
};
@Component
export default class BasicsTabs extends Vue {
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem;
  @Prop(String) readonly type!: string;
  @Prop(String) readonly classPrefix?: string;

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix,
      selected: item.value === this.type,
    };
  }

  selectTab(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.tabs-item {
  position: relative;

  &.selected {
    color: $color-highlight;
  }

  &.selected::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: $color-highlight;
  }
}
</style>
