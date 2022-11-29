<template>
  <ul class="tags">
    <li
      v-for="tag in tags"
      :key="tag.id"
      @click="select(tag)"
      :class="{ selected: selectedTag.indexOf(tag) >= 0 }"
    >
      <Circular-icon :iconName="tag.svg" class="tags-icons" />
      <span>{{ tag.name }}</span>
    </li>
    <li @click="manageTags">
      <Circular-icon iconName="自定义" class="tags-icons user-defined" />
      <span>自定义</span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import CircularIcon from "@/components/CircularIcon.vue";
import clone from "@/lib/clone";

@Component({
  components: { CircularIcon },
})
export default class Tags extends Vue {
  @Prop(String) type!: string;

  beforeCreate() {
    this.$store.commit("fetchTags");
  }
  get tagList() {
    return this.$store.state.tagList as Tag[];
  }

  get tags() {
    const newTagList = clone(this.tagList);
    return newTagList.filter((i) => i.type === this.type);
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
    this.$router.push({
      path: "/manageTags",
      query: {
        type: this.type,
      },
    });
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
      margin-bottom: 4px;
      &.user-defined {
        color: $color-highlight;
      }
    }
  }
}
</style>