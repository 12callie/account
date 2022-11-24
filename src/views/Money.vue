<template>
  <layout>
    <div>
      <Icon name="return" />
    </div>
    <ol class="tabs">
      <li>支出</li>
      <li>收入</li>
    </ol>
    <div class="tags">
      <ul>
        <li>
          <Icon name="水果" />
          <span>水果</span>
        </li>
        <li>
          <Icon name="餐饮" />
          <span>餐饮</span>
        </li>
        <li>
          <Icon name="零食" />
          <span>零食</span>
        </li>
        <li>
          <Icon name="交通" />
          <span>交通</span>
        </li>
        <li>
          <Icon name="通讯" />
          <span>通讯</span>
        </li>
        <li>
          <Icon name="自定义" />
          <span>自定义</span>
        </li>
      </ul>
    </div>
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
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Money extends Vue {
  type = "-";
}
</script>

<style lang="scss" scoped>
</style>