<template>
  <div>
    <ol class="tabs">
      <li class="selected">支出</li>
      <li>收入</li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Tabs extends Vue {}
</script>

<style lang="scss" scoped>
</style>