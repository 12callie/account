<template>
  <layout>
    <Tabs :type.sync="type" />
    <MyChart :option="option" />
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Tabs from '@/components/money/Tabs.vue';
import MyChart from '@/components/MyChart.vue';
import { EChartOption } from 'echarts';

@Component({
  components: { MyChart, Tabs },
})
export default class Statistics extends Vue {
  type = '-';
  option: EChartOption = {
    color: ['#333'],
    grid: {
      left: '24px',
      right: '24px',
      top: '24px',
      bottom: '24px',
    },
    xAxis: {
      type: 'category',
      data: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
      ],
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
        data: [
          120, 200, 150, 80, 0, 0, 0, 120, 200, 150, 80, 0, 0, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80,
          70, 110, 130, 1, 2,
        ],
        type: 'bar',
        label: {
          show: true,
          position: 'top',
        },
        barWidth: '30%',
      },
    ],
  };
}
</script>

<style lang="scss" scoped></style>
