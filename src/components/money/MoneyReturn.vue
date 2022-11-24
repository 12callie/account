<template>
  <div>
    <Icon name="return" class="moneyReturn" />
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
}
</style>