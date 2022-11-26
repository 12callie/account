<template>
  <div class="numberPad" v-if="showPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button class="calendar" @click="selectDate">
        <div v-if="date === ''"><Icon name="calendar" /></div>
        <span>{{ date }}</span>
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="remove">
        <Icon name="delete" />
      </button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok">完成</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
    <Cal ref="calElement" @update:date="date = $event" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import Cal from "@/components/Cal.vue";
import dayjs from "dayjs";
@Component({
  components: { Cal },
})
export default class NumberPad extends Vue {
  @Prop(Boolean) showPad!: boolean;
  @Ref("calElement") calElement!: Cal;
  output = "0";
  date = "";
  inputContent(e: MouseEvent) {
    const button = e.target as HTMLButtonElement;
    const input = button.textContent!;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else if (input === ".") {
        this.output = "0.";
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    this.output += input;
    this.output = this.output.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //eslint-disable-line
  }
  selectDate() {
    this.calElement.showCal = true;
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  ok() {
    const values = { date: this.date, output: this.output };
    if (values.date === "") {
      values.date = dayjs().format("YYYY/M/D");
    }
    this.$emit("update:values", values);
    this.$emit("submit", values);
    this.output = "0";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
$bg: rgb(242, 242, 242);

.numberPad {
  > .output {
    font-size: 28px;
    font-family: Consolas, monospace;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 4px 16px;
    height: 50px;
    background-color: $bg;
  }
  > .buttons {
    ::v-deep .icon {
      width: 24px;
      height: 24px;
    }
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    > button {
      width: 25%;
      height: 44px;
      font-size: 18px;
      float: left;
      background-color: transparent;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      &.calendar {
        font-size: 16px;
      }
      &.ok {
        height: 88px;
        float: right;
      }
      &.zero {
        width: 25% * 2;
      }
      &:nth-child(1) {
        background-color: darken($bg, 4%);
      }
      &:nth-child(2),
      &:nth-child(5) {
        background-color: darken($bg, 4% * 2);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background-color: darken($bg, 4% * 3);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background-color: darken($bg, 4% * 4);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background-color: darken($bg, 4% * 5);
      }
      &:nth-child(14) {
        background-color: darken($bg, 4% * 6);
      }
      &:nth-child(12) {
        background-color: darken($bg, 4% * 7);
      }
    }
  }
}
</style>