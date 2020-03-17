<template>
  <v-app>
    <v-app-bar
      :clipped-left="false"
      app
      dark
      flat
      prominent
      color="primary"
    >
      <v-toolbar-title class="display-1 font-weight-bold">Listee 🍕🍷</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer :absolute="true" app dark color="primary">
      <Footer></Footer>
    </v-footer>
  </v-app>
  <!-- <div id="app">
    <Home class="home"></Home>
    <Footer></Footer>
  </div> -->
</template>

<style lang="scss">
@import '@/sass/variables.scss';

html {
  overflow-y: hidden !important;
}

#app {
  // font-family: 'Roboto', sans-serif;
  // font-size: 1.125rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
}
</style>

<script>
import Footer from '@/components/Footer';
export default {
  components: {
    Footer
  }
};
</script>
