<template>
  <div class="editTag">
    <Back />
    <Title-manage />
    <Current-tag />
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
  created() {
    this.$store.commit("fetchTags");
    const id = this.$route.params.id;
    const tagList = this.$store.state.tagList;
    const tag = tagList.filter((t: Tag) => t.id === Number(id))[0];
    console.log(tag);
  }
}
</script>

<style lang="scss" scoped>
.editTag {
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>