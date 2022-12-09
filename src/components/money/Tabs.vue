<template>
  <basics-tabs
    :data-source="recordTypeList"
    :type="type"
    class="types"
    class-prefix="types"
    @update:value="selectTab"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import BasicsTabs from '@/components/BasicsTabs.vue';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: { BasicsTabs },
})
export default class Tabs extends Vue {
  @Prop(String) type!: string;
  recordTypeList = recordTypeList;

  selectTab(val: string) {
    this.$emit('update:type', val);
  }
}
</script>

<style lang="scss" scoped>
.types {
  display: flex;
  justify-content: center;
  align-items: center;

  ::v-deep .types-tabs-item {
    padding: 24px 28px 4px 28px;
    height: 56px;
  }
}
</style>
