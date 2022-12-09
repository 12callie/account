<template>
  <div ref="container" class="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';

@Component
export default class MyChart extends Vue {
  @Prop() option?: EChartOption;

  mounted() {
    const chart = echarts.init(this.$refs.container as HTMLDivElement);
    chart.setOption(this.option!);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 150px;
  background-color: #fff;
}
</style>
