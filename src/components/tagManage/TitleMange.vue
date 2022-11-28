<template>
  <div class="titleManage">
    <span>编辑支出类别</span>
    <button class="save">保存</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class TitleManage extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.titleManage {
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: $color-highlight;
  font-size: 18px;
  padding: 18px 16px 16px 70px;
  span {
  }
  .save {
    border-style: none;
    background: inherit;
  }
}
</style>