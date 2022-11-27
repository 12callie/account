<template>
  <div>
    <Back />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Back from "@/components/money/Back.vue";
@Component({
  components: { Back },
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
</style>