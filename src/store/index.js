import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL, APP_WIDTH_POINT } from '@/config';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    smallAppWidth: false,
    date: '',
    currency: [],
    baseCurrency: '',
    rates: {},
  },
  mutations: {
    smallAppWidth(state) {
      if (window.document.getElementById('app').clientWidth < APP_WIDTH_POINT) {
        state.smallAppWidth = true;
      } else {
        state.smallAppWidth = false;
      }
    },
    setDate(state, date) {
      state.date = date;
    },
    setRates(state, rates) {
      state.rates = rates;
    },
    setCurrency(state, currency) {
      state.currency = currency;
    },
    setBaseCurrency(state, currency) {
      state.baseCurrency = currency;
    },
    clearData(state) {
      state.rates = {};
    },
  },
  actions: {
    loadCurrency(context, { date, currency }) {
      let request = API_BASE_URL;
      if (date && currency) {
        request += `/${date}?base=${currency}`;
      } else if (date) {
        request += `/${date}?base=${context.state.baseCurrency}`;
      } else if (currency) {
        request += `/${context.state.date}?base=${currency}`;
      } else {
        request += '/latest';
      }

      return axios.get(request)
        .then((response) => {
          context.dispatch('setData', response.data);
        })
        .catch((error) => { throw error; });
    },
    setData(context, data) {
      context.commit('setDate', data.date);
      context.commit('setBaseCurrency', data.base);

      const ratesKeys = Object.keys(data.rates);
      if (ratesKeys.indexOf(data.base) === -1) {
        ratesKeys.unshift(data.base);
      }
      context.commit('setCurrency', ratesKeys);

      context.commit('setRates', data.rates);
    },
  },
});

export default store;
