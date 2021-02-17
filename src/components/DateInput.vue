<template>
  <DatePicker
    mode="date"
    v-model="date"
    :masks="mask"
    :disabled-dates="disabledDates"
    :min-date="new Date('2000-01-01')"
    :max-date="new Date()"
  >
    <template v-slot="{ inputValue, inputEvents }">
      <div class="icon"></div>
      <input class="input" :value="inputValue" v-on="inputEvents" />
    </template>
  </DatePicker>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

export default {
  props: {
    value: Date,
  },
  components: { DatePicker },
  data() {
    return {
      mask: {
        input: 'DD-MM-YYYY',
      },
      disabledDates: [{ weekdays: [1, 7] }],
    };
  },
  computed: {
    date: {
      get() {
        return this.value;
      },
      set(date) {
        this.$emit('input', date);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .date-input {
    margin: 0;
    display: flex;
    align-items: center;

    .icon {
      mask-image: url('../assets/shape.svg');
      height: 1em;
      width: .9em;
      background: #000;
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: contain;
    }

    .input {
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      padding-left: .5em;
      background: inherit;
      font-family: inherit;
      font-size: inherit;
      font-family: inherit;
      width: 100%;
    }
  }
</style>
