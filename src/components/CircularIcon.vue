<template>
  <div class="icon-wrapper">
    <Icon :name="iconName" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class CircularIcon extends Vue {
  @Prop(String) iconName?: string;
}
</script>

<style lang="scss" scoped>
.icon-wrapper {
  width: 48px;
  height: 48px;
  padding: 4px;
  border-radius: 50%;
  background: rgb(221, 221, 221);
  display: flex;
  justify-content: center;
  align-items: center;
  ::v-deep .icon {
    width: 30px;
    height: 30px;
  }
}
</style>