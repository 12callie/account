<template>
  <div>
    <ol class="tabs">
      <li
        class="tabs-item"
        :class="type === '-' && 'selected'"
        @click="selectType('-')"
      >
        支出
      </li>
      <li
        class="tabs-item"
        :class="type === '+' && 'selected'"
        @click="selectType('+')"
      >
        收入
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Tabs extends Vue {
  type = "-";
  selectType(type: string) {
    if (this.type !== "-" && this.type !== "+") {
      throw new Error("type is unknown");
    }
    this.type = type;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tabs {
  display: flex;
  justify-content: center;
  align-content: center;
  &-item {
    padding: 24px 28px 4px 28px;
    height: 56px;
    position: relative;
    &.selected {
      color: $color-highlight;
    }
    &.selected::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: $color-highlight;
    }
  }
}
</style>