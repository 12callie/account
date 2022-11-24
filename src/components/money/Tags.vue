<template>
  <ul class="tags">
    <li>
      <Icon name="水果" />
      <span>水果</span>
    </li>
    <li>
      <Icon name="餐饮" />
      <span>餐饮</span>
    </li>
    <li>
      <Icon name="零食" />
      <span>零食</span>
    </li>
    <li>
      <Icon name="交通" />
      <span>交通</span>
    </li>
    <li>
      <Icon name="通讯" />
      <span>通讯</span>
    </li>
    <li>
      <Icon name="自定义" />
      <span>自定义</span>
    </li>
    <li>
      <Icon name="自定义" />
      <span>自定义</span>
    </li>
    <li>
      <Icon name="自定义" />
      <span>自定义</span>
    </li>
    <li>
      <Icon name="自定义" />
      <span>自定义</span>
    </li>
    <li>
      <Icon name="自定义" />
      <span>自定义</span>
    </li>
    <li>
      <Icon name="自定义" />
      <span>自定义</span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Tags extends Vue {}
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #eee;
  > li {
    display: flex;
    flex-direction: column;
  }
  ::v-deep .icon {
    width: 30px;
    height: 30px;
  }
}
</style>