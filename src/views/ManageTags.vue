<template>
  <div class="manageTags">
    <Back />
    <Tabs :type.sync="type" />
    <ol class="tags">
      <li v-for="t in tags" :key="t.id">
        <div class="removeTag" @click="remove(t)">
          <Icon name="remove" />
        </div>
        <Circular-icon :iconName="t.svg" class="icons" />
        <span>{{ t.name }}</span>
        <router-link :to="`/editTag/${t.id}`" class="editButton">
          <span>编辑</span>
        </router-link>
      </li>
    </ol>
    <div class="createTag" @click="createTag">
      <button>
        <Icon name="add" />
        <span>新增类别</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Back from "@/components/money/Back.vue";
import Tabs from "@/components/money/Tabs.vue";
import CircularIcon from "@/components/CircularIcon.vue";
import clone from "@/lib/clone";

@Component({
  components: { Back, Tabs, CircularIcon },
})
export default class ManageTags extends Vue {
  type = this.$route.query.type;
  created() {
    this.$store.commit("fetchTags");
  }
  get tagList() {
    return this.$store.state.tagList as Tag[];
  }
  get tags() {
    const newTagList = clone(this.tagList);
    return newTagList.filter((i) => i.type === this.type);
  }
  remove(t: Tag) {
    if (this.tags.length === 1) {
      return window.alert("当前是最后一个标签了，请先添加标签再删除吧");
    }
    this.$store.commit("removeTag", t);
  }
  createTag() {
    this.$router.push({
      path: "/newTag",
      query: {
        typeNew: this.type,
      },
    });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.manageTags {
  @extend %iconSize;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .tags {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex-grow: 1;
    li {
      width: 100vw;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      border-top: 1px solid #eee;
      .removeTag {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgb(219, 1, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-right: 16px;
      }
      .icons {
        margin-right: 16px;
      }
      span {
        float: left;
        flex-grow: 1;
      }
    }
  }
  .createTag {
    border: 1px solid #eee;
    padding: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 42px;
    button {
      border-style: none;
      background: inherit;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: $color-highlight;
      ::v-deep .icon {
        width: 24px;
        height: 24px;
      }
      span {
        margin-left: 4px;
      }
    }
  }
}
</style>