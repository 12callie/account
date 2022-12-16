<template>
  <div ref="container" class="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import * as echarts from 'echarts';
import { EChartOption, ECharts } from 'echarts';

@Component
export default class MyChart extends Vue {
  @Prop() option!: EChartOption;
  chart?: ECharts;

  mounted() {
    this.chart = echarts.init(this.$refs.container as HTMLDivElement);

    this.chart.setOption(this.option);
  }

  @Watch('option')
  onOptionChange(newValue: EChartOption) {
    this.chart!.setOption(newValue);
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
