<template>
  <div class="currency-panel">
    <div class="arrow_left" @click="back" :class="{disabled: ofset < 1}" />
    <div class="currency-items" v-if="loadError">
      Доступные валюты не загрузились, попробуйте позже
    </div>
    <div class="currency-items" v-else>
      <div v-for="value in currency"
          :key="value"
          :class="{active: value === $store.state.baseCurrency}"
          class="item"
          @click="selectCurrency(value)"
      >
        {{ value }}
      </div>
    </div>
    <div class="arrow_right"
         @click="forward"
         :class="{ disabled: total >= $store.state.currency.length }" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      ofset: 0,
      loadError: false,
    };
  },
  computed: {
    currency() {
      return this.$store.state.currency
        .slice(this.ofset, this.total);
    },
    total() {
      return Math.floor(window.document.getElementById('app').clientWidth / 75) + this.ofset - 2;
    },
  },
  methods: {
    selectCurrency(currency) {
      this.$store.dispatch('loadCurrency', { currency })
        .catch(() => {
          this.$store.commit('clearData');
        });
    },
    back() {
      if (this.ofset > 0) {
        this.ofset -= 1;
      }
    },
    forward() {
      if (this.total < this.$store.state.currency.length) {
        this.ofset += 1;
      }
    },

  },
};
</script>

<style lang="scss" scoped>
  .currency-panel {
    display: flex;
    align-items: center;
    height: 48px;

    .currency-items {
      display: flex;
      justify-content: space-between;
      flex: 1;
      color: rgba(0, 0, 0, 0.3);
      height: 100%;
      font-weight: 500;
      overflow: auto;

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        height: 100%;
        min-width: 75px;
      }

      .active {
        background: #fff;
        color: black;
        border-radius: 10px 10px 0 0;
      }
    }

    .arrow_left, .arrow_right {
      height: 100%;
      width: 45px;
      mask-image: url('../assets/arrow.svg');
      mask-size: contain;
      background: #000;
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: 7px;
      cursor: pointer;
    }

    .arrow_right {
      transform: rotate(180deg);
    }

    .disabled {
      cursor: default;
      background: transparent;
    }
  }
</style>
