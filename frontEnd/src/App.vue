<template>
  <v-app>
  <div id="app">
    <!-- <Header></Header>
    <h1> this is on the client </h1>
    <HelloWorld></HelloWorld>
    <Footer></Footer> -->
    <router-view/>
  </div>
  </v-app>
</template>

<script>
// import Header from './components/Header.vue'
// import HelloWorld from './components/HelloWorld.vue'
// import Footer from './components/Footer.vue'

export default {
  name: 'Applicant',
  data () {
    return {
      users : [],
    }
  },
  methods : {
    emitToApp (value) {
      console.log(value);
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

