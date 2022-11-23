<template>
  <div class="not-found">
    <div>你要找的页面不存在，请检查链接是否正确</div>
    <router-link to="/">点击此处回首页</router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.not-found {
  padding: 24px;
  a {
    border-bottom: 1px solid #333;
  }
}
</style>