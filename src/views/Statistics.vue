<template>
  <layout class="statistics-wrapper">
    <div class="header">
      <Tabs :type.sync="type" />
      <TabBar :interval.sync="interval" />
    </div>
    <div class="statistics">
      <div class="period">
        <span v-if="interval === 'week'">本周</span>
        <span v-else-if="interval === 'month'">本月</span>
        <span v-else-if="interval === 'year'">今年</span>
      </div>
      <MyChart :option="option" />
    </div>
    <div class="rank">
      <div class="rank-title">
        <span v-if="type === '-'">支出排行</span>
        <span v-else-if="type === '+'">收入排行</span>
      </div>
      <ol class="rank-content">
        <li v-for="(item, index) in rankList" :key="index">
          <CircularIcon :iconName="item.tag[0].svg" />
          <div class="information">
            <span class="name">{{ item.tag[0].name }}</span>
            <span class="percent">{{ item.percent }}%</span>
          </div>
          <span>{{ type }}{{ item.itemAmount }}</span>
        </li>
      </ol>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Tabs from '@/components/money/Tabs.vue';
import MyChart from '@/components/MyChart.vue';
import TabBar from '@/components/TabBar.vue';
import BasicsTabs from '@/components/BasicsTabs.vue';
import clone from '@/lib/clone';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import CircularIcon from '@/components/CircularIcon.vue';
import _ from 'lodash';
import { EChartOption } from 'echarts';

dayjs.extend(weekOfYear);

type Interval = 'week' | 'month' | 'year';
@Component({
  components: { CircularIcon, BasicsTabs, TabBar, MyChart, Tabs },
})
export default class Statistics extends Vue {
  type: '-' | '+' = '-';
  interval: Interval = 'week';

  get option() {
    return {
      color: ['#333'],
      grid: {
        left: '24px',
        right: '24px',
        top: '24px',
        bottom: '24px',
      },
      tooltip: {
        show: true,
        position: 'top',
        formatter: function (params: EChartOption.Tooltip.Format): string {
          return params.data;
        },
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
            position: 'top',
          },
          barWidth: '30%',
        },
      ],
    } as EChartOption;
  }

  get chartTime() {
    if (this.interval === 'week') {
      return this.chartData.map((i) => dayjs(i.date).format('M/D'));
    } else if (this.interval === 'month') {
      return this.chartData.map((i) => dayjs(i.date).format('D'));
    } else if (this.interval === 'year') {
      return this.chartData.map((i) => dayjs(i.date).format('M'));
    }
  }

  get seriesData() {
    return this.chartData.map((i) => i.chartAmount);
  }

  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }

  get targetRecords() {
    return clone(this.recordList)
      .filter((i) => i.type === this.type)
      .filter((i) => dayjs(i.date).isSame(dayjs(), this.interval))
      .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
  }

  get chartData() {
    if (this.targetRecords.length === 0) {
      return [];
    }
    const x: { date: string; amount: number }[] = [
      { date: this.targetRecords[0].date, amount: Number(this.targetRecords[0].amount) },
    ];
    for (let i = 1; i < this.targetRecords.length; i++) {
      const last = x[x.length - 1];
      const now = this.targetRecords[i];
      const hash: Record<Interval, 'day' | 'month'> = {
        week: 'day',
        month: 'day',
        year: 'month',
      };
      if (dayjs(now.date).isSame(dayjs(last.date), hash[this.interval])) {
        last.amount += Number(now.amount);
      } else {
        x.push({ date: now.date, amount: Number(now.amount) });
      }
    }
    if (this.interval === 'year') {
      x.map((i) => (i.date = dayjs(i.date).format('YYYY/M')));
    }
    let res1: { date: string; chartAmount: string }[] = [];
    const today = dayjs();

    if (this.interval === 'week') {
      const mondayOfTheWeek = today.subtract(today.day() ? today.day() - 1 : 6, 'day');
      for (let i = 0; i < 7; i++) {
        const date = mondayOfTheWeek.add(i, 'day').format('YYYY/M/D');
        const found = _.find(x, { date: date });
        res1.push({ date: date, chartAmount: found ? found.amount.toFixed(2) : (0).toFixed(2) });
      }
    } else if (this.interval === 'month') {
      const firstOfTheMonth = today.startOf('month');
      const daysOfTheMonth = today.daysInMonth();
      for (let i = 0; i < daysOfTheMonth; i++) {
        const date = firstOfTheMonth.add(i, 'day').format('YYYY/M/D');
        const found = _.find(x, { date: date });
        res1.push({ date: date, chartAmount: found ? found.amount.toFixed(2) : (0).toFixed(2) });
      }
    } else if (this.interval === 'year') {
      const firstMonth = today.month(0);
      for (let i = 0; i < 12; i++) {
        const date = firstMonth.add(i, 'month').format('YYYY/M');
        const found = _.find(x, { date: date });
        res1.push({ date: date, chartAmount: found ? found.amount.toFixed(2) : (0).toFixed(2) });
      }
    }
    return res1;
  }

  get rankList() {
    const grossAmount = this.targetRecords.reduce((sum, i) => sum + Number(i.amount), 0);
    type RankGroup = { tag: Tag[]; itemAmount: string; percent: string }[];
    const tagNames: string[] = [];
    const res2: RankGroup = [];
    for (let i of this.targetRecords) {
      const index = tagNames.indexOf(i.tags[0].name);
      if (index < 0) {
        tagNames.push(i.tags[0].name);
        res2.push({ tag: i.tags, itemAmount: i.amount, percent: '' });
      } else {
        res2[index].itemAmount = (Number(res2[index].itemAmount) + Number(i.amount)).toFixed(2);
      }
      for (let i = 0; i < res2.length; i++) {
        res2[i].percent = ((Number(res2[i].itemAmount) * 100) / grossAmount).toFixed(2);
      }
    }
    res2.sort((a, b) => Number(b.percent) - Number(a.percent));
    return res2;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
}
</script>

<style lang="scss" scoped>
.statistics-wrapper {
  position: relative;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 110px;
  position: absolute;
  width: 100%;
  z-index: 100;
}

.statistics {
  padding-top: 110px;

  .period {
    padding: 4px 16px;
    font-size: 14px;
  }
}

.rank {
  .rank-title {
    padding: 4px 16px;
    font-size: 14px;
  }

  .rank-content {
    background-color: #fff;
    display: flex;
    flex-direction: column;

    li {
      padding: 8px 16px;
      border-bottom: 1px solid #eee;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .information {
        margin-right: auto;
        margin-left: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;

        .name {
        }

        .percent {
          color: #999;
          font-size: 14px;
          padding-left: 24px;
        }
      }
    }
  }
}
</style>
