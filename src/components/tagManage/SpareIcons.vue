<template>
  <div class="spareIcons">
    <span>选择图标</span>
    <ol>
      <li v-for="index in spareIcons" :key="index">
        <div class="icon">
          <Icon :name="index" />
        </div>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import spareIcons from "@/constants/spareIcons";
@Component
export default class SpareIcons extends Vue {
  spareIcons = spareIcons;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.spareIcons {
  @extend %iconSize;
  display: flex;
  flex-direction: column;
  height: 100%;
  span {
    background: #eee;
    padding: 4px 16px;
  }
  ol {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;
    padding-bottom: 16px;
    li {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 16px;
      .icon {
        @extend %iconStyle;
      }
    }
  }
}
</style>