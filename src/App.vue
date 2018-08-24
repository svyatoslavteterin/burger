<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer />

    <Auth />
    <DeliveryForm />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Auth from '@/components/Auth';
import DeliveryForm from '@/components/DeliveryForm';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Auth,
    DeliveryForm,
  },
};
</script>


<style lang="scss">
@import url('./assets/fonts/_font.scss');

* {
  margin: 0;
  padding: 0;
  font-family: 'Gilroy' !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  list-style: none;
  outline: none;
}

body {
  max-width: 100vw;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  min-height: 100vh;
}

main {
  max-width: 100vw;
  margin-bottom: auto;
}

button, a {
  user-select: none !important;
}

@for $i from 0 through 10 {
  @media screen and (min-width: #{1000 + 100 * $i}px) {
    html, body {
      font-size: #{10 + $i}px !important;
    }
  }
}
</style>
