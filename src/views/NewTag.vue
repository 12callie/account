<template>
  <div>
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
  components: { Back, SpareIcons, TitleManage, CurrentTag },
})
export default class newTag extends Vue {}
</script>

<style lang="scss" scoped>
</style>