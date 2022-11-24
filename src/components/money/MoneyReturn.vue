<template>
  <div class="moneyReturn">
    <Icon name="return" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class MoneyReturn extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.moneyReturn {
  color: $color-highlight;
  ::v-deep .icon {
    width: 24px;
    height: 24px;
  }
}
</style>