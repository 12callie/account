<template>
  <layout class="bills">
    {{ mode }}
    <div class="operation">
      <div class="selectTime">
        <div></div>
        <div class="time" @click="pickDate">
          <span>{{ date }}</span>
          <Icon v-if="mode === '1' || mode === '2'" name="caret-bottom"/>
        </div>
        <Icon name="exchange" @click.native="switchMode"/>
      </div>
      <div class="resultWrapper">
        <div class="expense">
          <span>{{ duration }}支出</span>
          <div class="moneyWrapper">
            <span>￥</span>
            <span class="money">{{ someExpenseTotal }}</span>
          </div>
        </div>
        <div class="others">
          <div class="item">
            <span>{{ duration }}收入</span>
            <span class="money">{{ someIncomeTotal }}</span>
          </div>
          <div class="item">
            <span>{{ duration }}结余</span>
            <span class="money">{{ someSurplusTotal }}</span>
          </div>
        </div>
      </div>
    </div>
    <ol class="content">
      <li v-for="group in result" :key="group.title">
        <div class="title">
          <span>{{ beautify(group.title) }}</span>
          <span>{{ summary(group) }}</span>
        </div>
        <ol>
          <li v-for="item in group.items" :key="item.tags.id">
            <CircularIcon :iconName="tagSvg(item.tags)"/>
            <div class="information">
              <span class="name">{{ tagName(item.tags) }}</span>
              <span class="notes">{{ item.notes }}</span>
            </div>
            <span :class="{ exp: item.type === '-', inc: item.type === '+' }">{{ item.type }}{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <PickDate ref="dateTime" @update:date="onUpdateDate"/>
    <SwitchingPeriod ref="switch" :radio.sync="mode"></SwitchingPeriod>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Ref, Watch} from 'vue-property-decorator';
import CircularIcon from '@/components/CircularIcon.vue';
import clone from '@/lib/clone';
import PickDate from '@/components/PickDate.vue';
import SwitchingPeriod from '@/components/SwitchingPeriod.vue';
import dayjs from 'dayjs';

const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

type List = { title: string; expenseTotal?: number; incomeTotal?: number; items: RecordItem[] };
@Component({
  components: {PickDate, CircularIcon, SwitchingPeriod},
})
export default class Bills extends Vue {
  @Ref('dateTime') dateTime!: PickDate;
  @Ref('switch') switch!: SwitchingPeriod;
  mode = '1';
  date: string = dayjs().format('YYYY年M月');
  duration: string = '本月';
  someExpenseTotal: string = (0).toFixed(2);
  someIncomeTotal: string = (0).toFixed(2);
  someSurplusTotal: string = (0).toFixed(2);

  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }

  get result() {
    const {recordList} = this;
    const newList = clone(recordList)
        .filter((i) => dayjs(i.date).isSame(dayjs(this.date, 'YYYY年M月'), 'month'))
        .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
    if (newList.length === 0) {
      return [];
    }
    const list: List[] = [
      {
        title: newList[0].date,
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const last = list[list.length - 1];
      const now = newList[i];
      if (dayjs(now.date).isSame(dayjs(last.title), 'day')) {
        last.items.push(now);
      } else {
        list.push({title: now.date, items: [now]});
      }
    }
    list.forEach((group) => {
      group.expenseTotal = clone(group.items)
          .filter((t) => t.tags[0].type === '-')
          .reduce((sum, i) => sum + Number(i.amount), 0);
      group.incomeTotal = clone(group.items)
          .filter((t) => t.tags[0].type === '+')
          .reduce((sum, i) => sum + Number(i.amount), 0);
    });
    this.someExpenseTotal = clone(list)
        .reduce((sum, i) => sum + (i.expenseTotal || 0), 0)
        .toFixed(2);
    this.someIncomeTotal = clone(list)
        .reduce((sum, i) => sum + (i.incomeTotal || 0), 0)
        .toFixed(2);
    this.someSurplusTotal = (Number(this.someIncomeTotal) - Number(this.someExpenseTotal)).toFixed(2);
    return list;
  }

  switchMode() {
    this.switch.show = true;
  }

  onUpdateDate(date: Date) {
    this.date = dayjs(date).format('YYYY年M月');
  }

  pickDate() {
    this.dateTime.show = true;
  }

  tagName(tags: Tag[]) {
    return tags.length === 0 ? '空' : tags[0].name;
  }

  tagSvg(tags: Tag[]) {
    return tags.length === 0 ? '' : tags[0].svg;
  }

  summary(group: List) {
    if (group.expenseTotal && group.incomeTotal) {
      return `支出：${group.expenseTotal.toFixed(2)}，收入： ${group.incomeTotal.toFixed(2)}`;
    } else if (group.expenseTotal) {
      return `支出：${group.expenseTotal.toFixed(2)}`;
    } else if (group.incomeTotal) {
      return `收入： ${group.incomeTotal.toFixed(2)}`;
    }
  }

  beautify(time: string) {
    if (dayjs(time).isSame(dayjs(), 'year')) {
      return dayjs(time).format('M月D日');
    } else {
      return dayjs(time).format('YYYY年M月D日');
    }
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  @Watch('mode')
  onModeChanged() {
    if (this.mode === '1') {
      this.duration = '本月';
    } else if (this.mode === '2') {
      this.duration = '年度';
      // this.date = dayjs().format('YYYY年');
    } else if (this.mode === '3') {
      this.duration = '总计';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.bills {
  position: relative;

  .operation {
    ::v-deep .icon {
      width: 20px;
      height: 20px;
    }

    position: absolute;
    width: 100%;
    height: 184px;
    display: flex;
    flex-direction: column;
    color: #fff;
    background-color: $color-highlight;
    padding: 24px 24px 8px 24px;
    font-size: 14px;

    .selectTime {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .time {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 18px;

        span {
          margin-right: 12px;
        }
      }
    }

    .resultWrapper {
      .expense {
        padding-top: 16px;
        display: flex;
        flex-direction: column;

        .moneyWrapper {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .money {
            margin-left: 8px;
            font-size: 28px;
          }
        }
      }

      .others {
        padding-top: 16px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .item {
          display: flex;
          flex-direction: row;
          width: 50%;
          align-items: center;
          justify-content: flex-start;

          .money {
            margin-left: 8px;
            font-size: 20px;
          }
        }
      }
    }
  }

  .content {
    padding-top: 184px;
    width: 100vw;

    li {
      .title {
        font-size: 14px;
        padding: 4px 16px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      ol {
        li {
          background-color: #fff;
          padding: 8px 16px;
          border-bottom: 1px solid #eee;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;

          .information {
            width: 65%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            margin-left: 16px;
            margin-right: auto;

            .notes {
              color: #999;
              width: 100%;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .exp {
            color: rgb(197, 3, 12);
          }

          .inc {
            color: rgb(11, 127, 30);
          }
        }
      }
    }
  }
}
</style>
