<template>
  <div class="return">
    <Icon name="return" @click.native="goBack" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Back extends Vue {
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.return {
  position: absolute;
  top: 0;
  left: 0;
  margin: 16px;
  color: $color-highlight;
}
</style>