<template>
  <div class="titleManage">
    <span>{{ title }}类别</span>
    <button class="save">保存</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class TitleManage extends Vue {
  typeNew = this.$route.query.typeNew;
  @Prop(String) type!: string;

  get title() {
    const hash: { [key: string]: boolean } = {
      编辑支出: this.type === "-",
      编辑收入: this.type === "+",
      新增支出: this.typeNew === "-",
      新增收入: this.typeNew === "+",
    };
    for (let i in hash) {
      if (hash[i] === true) {
        return i;
      }
    }
    return "";
  }
}
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

  .save {
    border-style: none;
    background: inherit;
  }
}
</style>