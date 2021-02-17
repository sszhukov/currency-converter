<template>
  <div id="app">
    <Head />
    <Converter />
  </div>
</template>

<script>
import Head from '@/components/Head.vue';
import Converter from '@/components/Converter.vue';

export default {
  name: 'App',
  components: { Head, Converter },
  created() {
    this.$store.dispatch('loadCurrency', {});
    this.$store.commit('smallAppWidth');
    window.addEventListener('resize', () => {
      this.$store.commit('smallAppWidth');
    });
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html {
  background: #000;
}
body {
  background: rgb(223, 223, 223);
}

#app {
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
  min-width: 320px;
}
</style>
