<template>
  <div class="ss">
    <!-- <van-cell title="选择单个日期" :value="date" @click="show = true" /> -->
    <van-calendar
      v-model="showCal"
      @confirm="onConfirm"
      color="rgb(48, 62, 159)"
      @close="onClose"
      :min-date="minDate"
      :max-date="maxDate"
      title="选择日期"
      :show-confirm="false"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Calendar, Cell } from "vant";

@Component({
  components: {
    [Cell.name]: Cell,
    [Calendar.name]: Calendar,
  },
})
export default class Cal extends Vue {
  @Prop(String) position!: string;
  date: Date | string = "";
  showCal = false;
  minDate = new Date(2010, 0, 1);
  maxDate = new Date();

  formatDate(date: Date) {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }
  onConfirm(date: Date) {
    this.showCal = false;

    this.date = this.formatDate(date);

    this.$emit("update:date", this.date);
  }
  onClose() {
    this.showCal = false;
  }
}
</script>

<style lang="scss" scoped>
</style>