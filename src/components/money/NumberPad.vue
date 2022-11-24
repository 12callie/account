<template>
  <div class="numberPad">
    <div class="output">100</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>今天</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>删除</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>完成</button>
      <button>0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {}
</script>

<style lang="scss" scoped>
button {
  border-style: none;
  background: inherit;
}
</style>