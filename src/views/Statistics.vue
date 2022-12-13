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
import { EChartOption } from 'echarts';
import TabBar from '@/components/TabBar.vue';
import BasicsTabs from '@/components/BasicsTabs.vue';
import clone from '@/lib/clone';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import CircularIcon from '@/components/CircularIcon.vue';

dayjs.extend(weekOfYear);

interface NewRecordItem extends RecordItem {
  time: string;
}

@Component({
  components: { CircularIcon, BasicsTabs, TabBar, MyChart, Tabs },
})
export default class Statistics extends Vue {
  type: '-' | '+' = '-';
  interval: 'week' | 'month' | 'year' = 'week';
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

  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }

  get targetRecords() {
    // if (this.interval === 'week') {
    //   const x = newList.map((i) => ({
    //     ...i,
    //     time: [dayjs(i.date).year(), dayjs(i.date).week()].join(','),
    //   }));
    //   const result: Record<string, NewRecordItem[]> = {};
    //   for (let i = 0; i < x.length; i++) {
    //     const key = x[i].time;
    //     if (key in result) {
    //       result[key].push(x[i]);
    //     } else {
    //       result[key] = [];
    //       result[key].push(x[i]);
    //     }
    //   }
    //   const arr = console.log(result, 'result');
    // } else if (this.interval === 'month') {
    // } else if (this.interval === 'year') {
    // }
    return clone(this.recordList)
      .filter((i) => i.type === this.type)
      .filter((i) => dayjs(i.date).isSame(dayjs(), this.interval))
      .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
  }

  get result1() {
    return [];
  }

  get rankList() {
    const grossAmount = this.targetRecords.reduce((sum, i) => sum + Number(i.amount), 0);

    // const res2: { [key: string]: RecordItem[] } = {};
    // for (let i = 0; i < this.targetRecords.length; i++) {
    //   const key = this.targetRecords[i].tags[0].name;
    //   if (key in res2) {
    //     res2[key].push(this.targetRecords[i]);
    //   } else {
    //     res2[key] = [];
    //     res2[key].push(this.targetRecords[i]);
    //   }
    // }
    // const rankItemAmount: string[] = [];
    //
    // for (let j in res2) {
    //   const x = res2[j]
    //     .map((item) => item.amount)
    //     .reduce((sum, i) => sum + Number(i), 0)
    //     .toFixed(2);
    //   rankItemAmount.push(x);
    // }
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
