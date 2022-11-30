<template>
  <layout class="bills">
    <div class="operation">
      <div class="selectTime">
        <div></div>
        <div class="time">
          <span>2022年11月</span>
          <Icon name="caret-bottom" />
        </div>
        <Icon name="exchange" />
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
      <li>
        <div class="title">
          <span>11月18日，周五</span>
          <span>支出：100.00，收入：5.00</span>
        </div>
        <ol>
          <li>
            <div class="information">
              <CircularIcon class="icon" />
              <span class="name">餐饮餐饮餐饮</span>
              <span class="notes">米线米线米线米线米线米线米线米线米线米线米线米线米线米线米线米线米线米线</span>
            </div>
            <span>-21.00</span>
          </li>
        </ol>
      </li>
    </ol>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import CircularIcon from '@/components/CircularIcon.vue';

@Component({
  components: { CircularIcon },
})
export default class Bills extends Vue {}
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
          width: 100vw;

          .information {
            width: 85%;
            flex-grow: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            .icon {
              margin-right: 8px;
              min-width: 48px;
            }
            .name {
              margin-right: 8px;
              max-width: 64px;
            }
            .notes {
              padding-right: 8px;
              color: #999;
              max-width: 55%;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
            }
          }
        }
      }
    }
  }
}
</style>
