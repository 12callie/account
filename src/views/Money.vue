<template>
  <div class="money-content">
    <Money-return />
    <Tabs :type.sync="record.type" />
    <Tags :type="record.type" @update:tag="record.tags = $event" />
    <Notes :showPad="showPad" @update:notes="record.notes = $event" />
    <Number-pad
      :showPad="showPad"
      @update:values="onUpdateValues"
      @submit="saveRecord"
    />
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
    date: "",
  };
  onUpdateValues(values: { date: string; output: string }) {
    const { date, output } = values;
    this.record.date = date;
    this.record.amount = parseFloat(output).toFixed(2);
  }
  saveRecord() {
    if (this.record.tags.length === 0) {
      return window.alert("请选择标签");
    } else if (parseFloat(this.record.amount) === 0) {
      return window.alert("请输入金额");
    }
    this.$store.commit("createRecords", this.record);
    this.$router.push("/bills");
  }
  get showPad() {
    if (this.record.tags.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  created() {
    this.$store.commit("fetchRecords");
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