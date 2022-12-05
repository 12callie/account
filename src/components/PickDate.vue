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
        <div style="color: rgb(48, 62, 159); font-weight: bold">确定</div>
      </template>
      <template v-slot:cancel>
        <div style="color: rgb(48, 62, 159); font-weight: bold">取消</div>
      </template>
    </van-datetime-picker>
    <!--    <van-picker-->
    <!--      v-else-if="mode === 'year'"-->
    <!--      :columns="columns"-->
    <!--      show-toolbar-->
    <!--      title="标题"-->
    <!--      @cancel="onCancel"-->
    <!--      @change="onChange"-->
    <!--      @confirm="onConfirm"-->
    <!--    />-->
  </van-popup>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
import { DatetimePicker } from 'vant';
import { Popup } from 'vant';
import { Picker } from 'vant';
import { Toast } from 'vant';

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
  columns = [];

  getYearsToNow() {}

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
}
</script>

<style lang="scss" scoped></style>
