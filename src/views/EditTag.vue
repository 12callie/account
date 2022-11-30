<template>
  <div class="editTag">
    <Back />
    <Title-manage :type="tag.type" @submitChanges="update" />
    <Current-tag
      :iconName="tag.svg"
      :tagName="tag.name"
      @update:name="onUpdateName"
    />
    <Spare-icons @update:svg="onUpdateSvg" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Back from "@/components/money/Back.vue";
import TitleManage from "@/components/tagManage/TitleMange.vue";
import CurrentTag from "@/components/tagManage/CurrentTag.vue";
import SpareIcons from "@/components/tagManage/SpareIcons.vue";
let _ = require("lodash");

@Component({
  components: { Back, TitleManage, CurrentTag, SpareIcons },
})
export default class EditTag extends Vue {
  tag = {} as Tag;

  created() {
    this.$store.commit("fetchTags");
    this.$store.commit("setCurrentTag", Number(this.$route.params.id));
    this.tag = _.cloneDeep(this.$store.state.currentTag) as Tag;
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update() {
    if (this.tag) {
      this.$store.commit("updateTag", this.tag);
    }
  }
  onUpdateName(val: string) {
    this.tag.name = val;
  }
  onUpdateSvg(val: string) {
    this.tag.svg = val;
  }
}
</script>

<style lang="scss" scoped>
.editTag {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>