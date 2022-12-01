<template>
  <layout class="bills">
    <div class="operation">
      <div class="selectTime">
        <div></div>
        <div class="time">
          <span>2022年11月</span>
          <Icon name="caret-bottom"/>
        </div>
        <Icon name="exchange"/>
      </div>
      <div class="resultWrapper">
        <div class="expense">
          <span>本月支出</span>
          <div class="moneyWrapper">
            <span>￥</span>
            <span class="money">100.00</span>
          </div>
        </div>
        <div class="others">
          <div class="item">
            <span>本月收入</span>
            <span class="money">5.00</span>
          </div>
          <div class="item">
            <span>本月结余</span>
            <span class="money">5.00</span>
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
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import CircularIcon from '@/components/CircularIcon.vue';
import clone from '@/lib/clone';
import dayjs from 'dayjs';

type List = { title: string; expenseTotal?: number; incomeTotal?: number; items: RecordItem[] };
@Component({
  components: {CircularIcon},
})
export default class Bills extends Vue {
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }

  get result() {
    const {recordList} = this;
    const newList = clone(recordList).sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
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
    console.log(list);
    list.forEach((group) => {
      group.expenseTotal = clone(group.items)
          .filter((t) => t.tags[0].type === '-')
          .reduce((sum, i) => sum + Number(i.amount), 0);
      group.incomeTotal = clone(group.items)
          .filter((t) => t.tags[0].type === '+')
          .reduce((sum, i) => sum + Number(i.amount), 0);
    });
    return list;
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
