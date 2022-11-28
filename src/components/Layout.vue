<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Nav from "@/components/Nav.vue";

@Component({
  components: { Nav },
})
export default class Layout extends Vue {
  @Prop(String) classPrefix?: string;
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: rgb(245, 245, 245);
  .content {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>