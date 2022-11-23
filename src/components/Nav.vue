<template>
  <nav class="nav">
    <router-link to="/bills" class="nav-item" active-class="selected">
      <Icon name="bill" />
      <span>账单</span>
    </router-link>
    <router-link to="/money" class="nav-item" active-class="selected">
      <Icon name="add" />
      <span>记一笔</span>
    </router-link>
    <router-link to="/statistics" class="nav-item" active-class="selected">
      <Icon name="statistics" />
      <span>统计</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Nav extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
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