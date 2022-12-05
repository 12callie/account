<template>
  <van-popup v-model="show" :style="{ height: '176px', width: '80%' }" close-on-popstate>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell>
          <template #title>
            <div class="titleWrapper">
              <span class="custom-title">切换账单周期</span>
            </div>
          </template>
        </van-cell>
        <van-cell clickable title="按月" @click="selectMonth">
          <template #right-icon>
            <van-radio name="1">
              <template #icon="props">
                <img :src="props.checked ? activeIcon : inactiveIcon" alt="√" class="img-icon"/>
              </template>
            </van-radio>
          </template>
        </van-cell>
        <van-cell clickable title="按年" @click="selectYear">
          <template #right-icon>
            <van-radio name="2">
              <template #icon="props">
                <img :src="props.checked ? activeIcon : inactiveIcon" alt="√" class="img-icon"/>
              </template>
            </van-radio>
          </template>
        </van-cell>
        <van-cell clickable title="全部" @click="selectAll">
          <template #right-icon>
            <van-radio name="3">
              <template #icon="props">
                <img :src="props.checked ? activeIcon : inactiveIcon" alt="√" class="img-icon"/>
              </template>
            </van-radio>
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </van-popup>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {Popup, RadioGroup, Radio, Cell, CellGroup} from 'vant';

@Component({
  components: {
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
})
export default class SwitchingPeriod extends Vue {
  @Prop(String) radio!: string;
  show = false;
  activeIcon = require('@/assets/icons/tick.png');
  inactiveIcon = require('@/assets/icons/untick.png');

  selectMonth() {
    this.radio = '1';
    this.$emit('update:radio', this.radio);
    this.show = false;
  }

  selectYear() {
    this.radio = '2';
    this.$emit('update:radio', this.radio);
    this.show = false;
  }

  selectAll() {
    this.radio = '3';
    this.$emit('update:radio', this.radio);
    this.show = false;
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.van-cell {
  height: 25%;
}

.titleWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-title {
  color: $color-highlight;
  font-size: 18px;
}

.img-icon {
  height: 20px;
}
</style>
