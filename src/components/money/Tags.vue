<template>
  <ul class="tags">
    <li>
      <div class="tags-icons">
        <Icon name="水果" />
      </div>
      <span>水果</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="餐饮" />
      </div>
      <span>餐饮</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="零食" />
      </div>
      <span>零食</span>
    </li>
    <li>
      <div class="tags-icons selected">
        <Icon name="交通" />
      </div>
      <span>交通</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="通讯" />
      </div>
      <span>通讯</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
    <li>
      <div class="tags-icons">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Tags extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
  border-top: 1px solid #eee;
  > li {
    display: flex;
    flex-direction: column;
    width: 25%;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
    font-size: 14px;
    > .tags-icons {
      width: 48px;
      height: 48px;
      padding: 4px;
      border-radius: 50%;
      background: rgb(221, 221, 221);
      margin-bottom: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      &.selected {
        background: $color-highlight;
        color: #fff;
      }
    }
  }
}
</style>