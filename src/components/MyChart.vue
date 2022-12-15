<template>
  <div ref="container" class="wrapper">{{ s }}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';

@Component
export default class MyChart extends Vue {
  @Prop(Array) chartTime!: string[];
  @Prop(Array) seriesData!: string[];
  get s() {
    console.log('this.chartTime,this.seriesData', this.chartTime, this.seriesData);
    return 0;
  }
  setChartOption() {
    const chart = echarts.init(this.$refs.container as HTMLDivElement);
    const option: EChartOption = {
      color: ['#333'],
      grid: {
        left: '24px',
        right: '24px',
        top: '24px',
        bottom: '24px',
      },
      xAxis: {
        type: 'category',
        data: this.chartTime,
        axisLine: {
          show: true,
          lineStyle: {
            width: 0.5,
            color: 'rgb(142,142,142)',
          },
        },
        axisLabel: {
          show: true,
          color: 'rgb(142,142,142)',
          fontSize: 10,
          // formatter: function (value, index) {
          //   return value + 'kg';
          // },
        },
        axisTick: {
          inside: true,
          interval: 0,
        },
      },

      yAxis: {
        show: false,
        type: 'value',
      },
      series: [
        {
          data: this.seriesData,
          type: 'bar',
          label: {
            show: true,
            position: 'top',
          },
          barWidth: '30%',
        },
      ],
    };
    console.log(option, 'option');
    chart.setOption(option);
  }

  mounted() {
    this.setChartOption();
  }
  updated() {
    this.setChartOption();
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
