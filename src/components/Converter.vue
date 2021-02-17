<template>
  <div class="converter">
    <div class="data">
      <DateInput class="date-input" v-model="getDate" @input="loadCurrencyByDate"/>
      <CurrencyInput class="currency-input" v-model.number="currentValue" />
    </div>
    <div v-if="Object.keys(rates).length === 0 && currency.length !== 0" class="error-load">
      Возможно, данных с такими параметрами нет. Попробуйте сменить дату или валюту.
    </div>
    <div v-else class="card-list">
      <div v-for="name in currency" class="card-item" id="card" :key="name">
        <div class="current-currency">
          <span class="value">{{ currentValue }}</span>
          {{ baseCurrency }} =
        </div>
        <div class="converted-currency">
          <span class="value">{{ rates[name] * currentValue | currencyFormat }}</span>
          {{ name }}
        </div>
      </div>
    </div>

    <NavigateArrows :page.sync="page" :total="total" />
  </div>
</template>

<script>
import NavigateArrows from '@/components/NavigateArrows.vue';
import DateInput from '@/components/DateInput.vue';
import CurrencyInput from '@/components/CurrencyInput.vue';
import currencyFormat from '@/helpers/currencyFormat';

export default {
  components: { NavigateArrows, DateInput, CurrencyInput },
  filters: { currencyFormat },
  data() {
    return {
      currentValue: 1,
      page: 1,
      date: '',
    };
  },
  computed: {
    currency() {
      const ofset = (this.page - 1) * this.perPage + this.perPage;
      return this.$store.state.currency
        .filter((item) => item !== this.baseCurrency)
        .slice((this.page - 1) * this.perPage, ofset);
    },
    getDate: {
      get() {
        return new Date(this.$store.state.date) || new Date();
      },
      set(newDate) {
        this.date = newDate;
      },
    },
    rates() {
      return this.$store.state.rates;
    },
    perPage() {
      return this.$store.state.smallAppWidth ? 2 : 4;
    },
    baseCurrency() {
      return this.$store.state.baseCurrency;
    },
    total() {
      return Math.ceil((this.$store.state.currency.length - 1) / this.perPage);
    },
  },
  methods: {
    loadCurrencyByDate(newDate) {
      if (Object.prototype.toString.call(newDate) === '[object Date]') {
        const day = `0${newDate.getDate()}`.slice(-2);
        const month = `0${newDate.getMonth() + 1}`.slice(-2);
        const year = newDate.getFullYear();

        this.$store.dispatch('loadCurrency', { date: `${year}-${month}-${day}` })
          .catch(() => {
            this.$store.commit('clearData');
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .converter {
    padding: 22px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

    .data {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 18px;

      .date-input, .currency-input {
        border-bottom: 1px solid gray;
        width: 125px;
      }
    }

    .card-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      grid-gap: 16px;
      margin-top: 24px;
      width: 100%;

      .card-item {
        height: 140px;
        min-width: 250px;
        width: 100%;
        padding: 18px 30px;
        border-radius: 12px;
        box-shadow: 0 3px 6px rgba(157, 157, 157, .16);
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .current-currency, .converted-currency {
          font-size: 24px;
          color: #B9B9B9;
          font-weight: 300;

          .value {
            color: black;
          }
        }

        .converted-currency {
          color: black;

          .value {
            font-size: 27px;
            font-weight: 400;
          }
        }
      }
    }

    .error-load {
      margin-top: 24px;
      color: rgb(112, 0, 0);
      text-align: center;
    }
  }
</style>
