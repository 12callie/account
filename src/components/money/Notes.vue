<template>
  <div class="notes" v-if="showPad">
    <span class="name">备注</span>
    <input type="text" placeholder="输入备注…" v-model="value" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop(Boolean) showPad!: boolean;
  value = "";
  @Watch("value")
  onValueChange(value: string) {
    this.$emit("update:notes", value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  background-color: #fff;
  font-size: 14px;
  .name {
    padding-right: 16px;
  }
  input {
    border: none;
    height: 44px;
    flex-grow: 1;
  }
}
</style>