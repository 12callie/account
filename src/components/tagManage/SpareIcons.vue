<template>
  <div class="spareIcons">
    <span>选择图标</span>
    <ol>
      <li v-for="(item, index) in spareIcons" :key="index">
        <Circular-icon :iconName="item" class="icon" />
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import spareIcons from "@/constants/spareIcons";
import CircularIcon from "@/components/CircularIcon.vue";

@Component({
  components: { CircularIcon },
})
export default class SpareIcons extends Vue {
  spareIcons = spareIcons;
}
</script>

<style lang="scss" scoped>
.spareIcons {
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  span {
    background: #eee;
    padding: 4px 16px;
    font-size: 14px;
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
    }
  }
}
</style>