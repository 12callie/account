<template>
  <ol class="tabBar">
    <li :class="{ selected: interval === 'week' }" class="tabItem" @click="selectInterval('week')">周</li>
    <li :class="{ selected: interval === 'month' }" class="tabItem" @click="selectInterval('month')">月</li>
    <li :class="{ selected: interval === 'year' }" class="tabItem" @click="selectInterval('year')">年</li>
  </ol>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class TabBar extends Vue {
  @Prop(String) interval!: 'week' | 'month' | 'year';

  selectInterval(val: 'week' | 'month' | 'year') {
    this.$emit('update:interval', val);
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.tabBar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  width: 80%;

  .tabItem {
    border: 1px solid $color-highlight;
    width: 33.3333333%;
    text-align: center;
    padding: 2px;

    &.selected {
      background-color: $color-highlight;
      color: #fff;
    }
  }
}
</style>
