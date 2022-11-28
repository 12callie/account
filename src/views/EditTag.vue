<template>
  <div class="editTag">
    <Back />
    <Title-manage :type="tag.type" />
    <Current-tag :iconName="tag.name" :tagName="tag.name" />
    <Spare-icons />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Back from "@/components/money/Back.vue";
import TitleManage from "@/components/tagManage/TitleMange.vue";
import CurrentTag from "@/components/tagManage/CurrentTag.vue";
import SpareIcons from "@/components/tagManage/SpareIcons.vue";
@Component({
  components: { Back, TitleManage, CurrentTag, SpareIcons },
})
export default class EditTag extends Vue {
  get tag() {
    return this.$store.state.currentTag;
  }
  created() {
    this.$store.commit("fetchTags");
    this.$store.commit("setCurrentTag", Number(this.$route.params.id));
    if (!this.tag) {
      this.$router.replace("/404");
    }
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