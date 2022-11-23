<template>
  <div class="wrapper">
    <div class="content">账单</div>
    <Nav />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Bills extends Vue {}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .content {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>