<template>
  <ul class="tags" v-if="type === '-'">
    <li
      v-for="tag in expenseTags"
      :key="tag.id"
      @click="select(tag)"
      :class="{ selected: selectedTag.indexOf(tag) >= 0 }"
    >
      <div class="tags-icons">
        <Icon :name="tag.name" />
      </div>
      <span>{{ tag.name }}</span>
    </li>
    <li @click="manageTags">
      <div class="tags-icons user-defined">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
  </ul>
  <ul class="tags" v-else>
    <li
      v-for="tag in incomeTags"
      :key="tag.id"
      @click="select(tag)"
      :class="{ selected: selectedTag.indexOf(tag) >= 0 }"
    >
      <div class="tags-icons">
        <Icon :name="tag.name" />
      </div>
      <span>{{ tag.name }}</span>
    </li>
    <li @click="manageTags">
      <div class="tags-icons user-defined">
        <Icon name="自定义" />
      </div>
      <span>自定义</span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { expenseTags, incomeTags } from "@/constants/defaultTagList";
@Component
export default class Tags extends Vue {
  @Prop(String) type!: string;

  expenseTags = expenseTags;
  incomeTags = incomeTags;
  selectedTag: Tag[] = [];
  select(tag: Tag) {
    if (this.selectedTag.length > 0) {
      this.selectedTag = [];
    }
    this.selectedTag.push(tag);
    this.$emit("update:tag", this.selectedTag);
  }
  manageTags() {
    this.$router.push("/manageTags");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
  border-top: 1px solid #eee;
  // padding-bottom: 50vh;
  > li {
    display: flex;
    flex-direction: column;
    width: 25%;
    min-height: 89px;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
    margin-bottom: 4px;
    font-size: 14px;
    &.selected {
      > .tags-icons {
        background: $color-highlight;
        color: #fff;
      }
    }
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
      &.user-defined {
        color: $color-highlight;
      }
    }
  }
}
</style>