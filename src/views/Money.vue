<template>
  <div class="money-content">
    {{ record }}
    <Money-return />
    <Tabs :type.sync="record.type" />
    <Tags :type="record.type" @update:tag="record.tags = $event" />
    <Notes :show="showPad" @update:notes="record.notes = $event" />
    <Number-pad :show="showPad" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import MoneyReturn from "@/components/money/MoneyReturn.vue";
import Tags from "@/components/money/Tags.vue";
import Tabs from "@/components/money/Tabs.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Notes from "@/components/money/Notes.vue";
@Component({
  components: { MoneyReturn, Tags, Tabs, NumberPad, Notes },
})
export default class Money extends Vue {
  record: RecordItem = {
    type: "-",
    tags: [],
    notes: "",
    amount: "0",
  };

  get showPad() {
    if (this.record.tags.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
.money-content {
  background-color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  ::v-deep .icon {
    width: 30px;
    height: 30px;
  }
}
</style>