<template>
  <nav class="nav">
    <router-link to="/bills" class="nav-item" active-class="selected">
      <svg class="icon">
        <use xlink:href="#bill"></use>
      </svg>
      <span>账单</span>
    </router-link>
    <router-link to="/money" class="nav-item" active-class="selected">
      <svg class="icon">
        <use xlink:href="#add"></use>
      </svg>
      <span>记一笔</span>
    </router-link>
    <router-link to="/statistics" class="nav-item" active-class="selected">
      <svg class="icon">
        <use xlink:href="#statistics"></use>
      </svg>
      <span>统计</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import add from "@/assets/icons/add.svg";
import bill from "@/assets/icons/bill.svg";
import statistics from "@/assets/icons/statistics.svg";

console.log(add, bill, statistics);
@Component
export default class Nav extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.nav {
  display: flex;
  font-size: 12px;
  background: #fff;

  .nav-item {
    display: flex;
    width: 33.3333333%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 4px 0;
    &.selected {
      color: $color-highlight;
    }
    ::v-deep .icon {
      width: 30px;
      height: 30px;
      margin-bottom: 4px;
    }
  }
}
</style>