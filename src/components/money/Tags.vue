<template>
  <ul class="tags">
    <li
      v-for="tag in tags"
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
@Component
export default class Tags extends Vue {
  created() {
    this.$store.commit("fetchTags");
  }
  get tagList() {
    return this.$store.state.tagList as Tag[];
  }
  @Prop(String) type!: string;

  get tags() {
    return this.tagList.filter((i) => i.type === this.type);
  }

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
      @extend %iconStyle;
      margin-bottom: 4px;
      &.user-defined {
        color: $color-highlight;
      }
    }
  }
}
</style>