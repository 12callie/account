<template>
  <div class="money-content">
    <MoneyReturn />
    <Tabs />
    <Tags />
    <NumberPad />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import MoneyReturn from "@/components/money/MoneyReturn.vue";
import Tags from "@/components/money/Tags.vue";
import Tabs from "@/components/money/Tabs.vue";
import NumberPad from "@/components/money/NumberPad.vue";
@Component({
  components: { MoneyReturn, Tags, Tabs, NumberPad },
})
export default class Money extends Vue {}
</script>

<style lang="scss" scoped>
.money-content {
  background-color: #fff;
}
</style>