<template>
  <div class="navigate">
    <div class="left-arrow" @click="changePage(page - 1)" :class="{ disabled: page <= 1}">
      <div class="arrow" />
      <span class="text">НАЗАД</span>
    </div>
    <div class="right-arrow" @click="changePage(page + 1)" :class="{ disabled: page >= total }">
      <span class="text">ДАЛЕЕ</span>
      <div class="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: Number,
    total: Number,
  },
  methods: {
    changePage(newPage) {
      if (newPage > 0 && newPage <= this.total) {
        this.$emit('update:page', newPage);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .navigate {
    display: flex;
    justify-content: space-between;
    width: 244px;
    margin-top: 24px;

    .left-arrow, .right-arrow {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      font-weight: 200;
      width: 112px;
      height: 34px;
      border-radius: 12px;
      box-shadow: 0 3px 6px rgba(157, 157, 157, .16);
      cursor: pointer;

      .arrow {
        height: 1em;
        width: 0.5em;
        mask-image: url('../assets/arrow.svg');
        background: #000;
        mask-repeat: no-repeat;
        mask-position: center;
      }
    }

    .right-arrow {
      .arrow {
        transform: rotate(180deg);
      }

    }

    .disabled {
      cursor: not-allowed;
      background: #EFEFEF;

      .arrow {
        background: #787878;
      }
    }
  }
</style>
