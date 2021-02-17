<template>
  <div class="value-input">
    <input class="input" type="number" v-model="currency">
    {{ $store.state.baseCurrency }}
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
  },
  computed: {
    currency: {
      get() {
        return this.value;
      },
      set(currency) {
        if (currency > 0) {
          this.$emit('input', currency);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .currency-input {
    margin: 0;
    display: flex;
    align-items: center;

    .input {
      border: none;
      outline: none;
      margin: 0;
      padding: 0;
      font-size: inherit;
      font-family: Roboto;
      width: 100%;

      text-align: right;
      margin-right: 5px;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
      }
    }
  }
</style>
