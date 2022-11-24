<template>
  <div class="numberPad">
    <div class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="输入备注…" />
    </div>
    <div class="output">100</div>

    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>今天</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>
        <Icon name="delete" />
      </button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok">完成</button>
      <button class="zero">0</button>
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
@import "~@/assets/style/helper.scss";
$bg: rgb(242, 242, 242);

.numberPad {
  > .notes {
    border-top: 1px solid #eee;
    display: flex;
    align-items: center;
    padding: 0 16px;
    .name {
      padding-right: 16px;
    }
    input {
      border: none;
      background-color: transparent;
      height: 44px;
      flex-grow: 1;
    }
  }
  > .output {
    font-size: 28px;
    font-family: Consolas, monospace;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 4px 16px;
    height: 50px;
    background-color: $bg;
  }
  > .buttons {
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    > button {
      width: 25%;
      height: 44px;
      font-size: 18px;
      float: left;
      background-color: transparent;
      border: none;
      &.ok {
        height: 88px;
        float: right;
      }
      &.zero {
        width: 25% * 2;
      }
      &:nth-child(1) {
        background-color: darken($bg, 4%);
      }
      &:nth-child(2),
      &:nth-child(5) {
        background-color: darken($bg, 4% * 2);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background-color: darken($bg, 4% * 3);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background-color: darken($bg, 4% * 4);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background-color: darken($bg, 4% * 5);
      }
      &:nth-child(14) {
        background-color: darken($bg, 4% * 6);
      }
      &:nth-child(12) {
        background-color: darken($bg, 4% * 7);
      }
    }
  }
}
</style>