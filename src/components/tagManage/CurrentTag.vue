<template>
  <div class="currentTag">
    <Circular-icon :iconName="iconName" />
    <div class="input-wrapper">
      <input
        type="text"
        placeholder="输入类别名称"
        maxlength="6"
        :value="tagName"
        @input="$emit('update:name', $event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import CircularIcon from "@/components/CircularIcon.vue";
@Component({
  components: { CircularIcon },
})
export default class CurrentTag extends Vue {
  @Prop(String) iconName?: string;
  @Prop(String) tagName?: string;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.currentTag {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;

  .input-wrapper {
    border-bottom: 2px solid $color-highlight;

    input {
      border-style: none;
      text-align: center;
      width: 7rem;
      font-size: 16px;
      height: 24px;
      line-height: 24px;
      caret-color: $color-highlight;
      padding: 2px 0;
      margin-top: 16px;
    }
  }
}
</style>