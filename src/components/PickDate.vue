<template>
  <van-popup v-model="show" :style="{ height: '30%' }" position="top">
    <van-datetime-picker
      v-if="mode === 'month'"
      v-model="currentDate"
      :formatter="formatter"
      :max-date="maxDate"
      :min-date="minDate"
      item-height="32px"
      type="year-month"
      visible-item-count="5"
      @cancel="closeDatePicker"
      @confirm="submitDate"
    >
      <template v-slot:confirm>
        <div class="fourButtons">确定</div>
      </template>
      <template v-slot:cancel>
        <div class="fourButtons">取消</div>
      </template>
    </van-datetime-picker>
    <van-picker
      v-else-if="mode === 'year'"
      :columns="columns"
      :default-index="13"
      item-height="32px"
      show-toolbar
      @cancel="closeDatePicker"
      @confirm="onConfirm"
    >
      <template v-slot:confirm>
        <div class="fourButtons">确定</div>
      </template>
      <template v-slot:cancel>
        <div class="fourButtons">取消</div>
      </template>
    </van-picker>
  </van-popup>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { DatetimePicker } from 'vant';
import { Popup } from 'vant';
import { Picker } from 'vant';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

@Component({
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
  },
})
export default class PickDate extends Vue {
  @Prop(String) mode!: string;
  show = false;
  minDate = new Date(2010, 0, 1);
  maxDate = new Date();
  currentDate = new Date();

  get columns() {
    let now = dayjs();
    const years = now.diff('2010', 'year');
    const arrYear = [];
    for (let i = 0; i <= years; i++) {
      arrYear.push(now.format('YYYY年'));
      now = now.subtract(1, 'year');
    }
    return arrYear.reverse();
  }

  formatter(type: string, val: number) {
    if (type === 'year') {
      return `${val}年`;
    } else if (type === 'month') {
      return `${val}月`;
    }
    return val;
  }

  submitDate(value: Date) {
    this.$emit('update:date', value);
    this.show = false;
  }

  closeDatePicker() {
    this.show = false;
  }

  onConfirm(value: string) {
    const val = dayjs(value, 'YYYY年');
    this.$emit('update:date', val);
    this.show = false;
  }
}
</script>

<style lang="scss" scoped>
.fourButtons {
  color: rgb(48, 62, 159);
  font-weight: bold;
}
</style>
