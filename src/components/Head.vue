<template>
  <div class="head">
    <div class="title">
      Курс {{ $store.state.baseCurrency }} на {{ $store.state.date | dateFormat }}
    </div>
    <CarrencyPanel />
  </div>
</template>

<script>
import CarrencyPanel from '@/components/CarrencyPanel.vue';
import dateFormat from '@/helpers/dateFormat';

export default {
  components: { CarrencyPanel },
  filters: { dateFormat },
};
</script>

<style lang="scss" scoped>
  .head {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 111px;
    width: 100%;
    background: #FFE782;

    .title {
      font-size: 21px;
      text-align: left;
      margin: 0 0 8px 24px;
    }
  }
</style>
