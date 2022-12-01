<template>
  <van-overlay :show="show" @click="show = false">
    <van-datetime-picker
        v-model="currentDate"
        :formatter="formatter"
        :max-date="maxDate"
        :min-date="minDate"
        item-height="32px"
        type="year-month"
        visible-item-count="5"
        @confirm="submitDate"
    >
      <template v-slot:confirm>
        <div style="color: rgb(48, 62, 159);font-weight: bold">确定</div>
      </template>
      <template v-slot:cancel>
        <div style="color: rgb(48, 62, 159);font-weight: bold">取消</div>
      </template>
    </van-datetime-picker>
  </van-overlay>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {DatetimePicker} from 'vant';
import {Button} from 'vant';
import {Overlay} from 'vant';

@Component({
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Overlay.name]: Overlay,
    [Button.name]: Button,
  },
})
export default class PickDate extends Vue {
  show = false;
  minDate = new Date(2010, 0, 1);
  maxDate = new Date();
  currentDate = new Date();

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
  }
}
</script>

<style lang="scss" scoped></style>
