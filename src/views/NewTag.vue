<template>
  <div>
    <Back />
    <Title-manage @submitChanges="createNewTag" />
    <Current-tag :iconName="tag.svg" :tagName="tag.name" @update:name="writeName" />
    <Spare-icons @update:svg="selectSvg" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Back from "@/components/money/Back.vue";
import TitleManage from "@/components/tagManage/TitleMange.vue";
import CurrentTag from "@/components/tagManage/CurrentTag.vue";
import SpareIcons from "@/components/tagManage/SpareIcons.vue";
import createId from "@/lib/createId";
@Component({
  components: { Back, SpareIcons, TitleManage, CurrentTag },
})
export default class newTag extends Vue {
  beforeCreate(){
    this.$store.commit("fetchTags");
  }
  get tagList(){
    return this.$store.state.tagList;
  }
  tag= { id: 0, name: '', svg: '', type: '' } as Tag;
  selectSvg(val: string){
    this.tag.svg = val;
  }
  writeName(val: string){
    this.tag.name = val;
  }
  createNewTag(type: string){
    this.tag.type = type;
    this.tag.id = createId(this.tagList);
    this.$store.commit('createTag', this.tag);
  }
}
</script>

<style lang="scss" scoped>
</style>