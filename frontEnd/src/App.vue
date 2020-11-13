<template>
  <div id="app">
    <h1> this is on the client </h1>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  data () {
    return {
      users : [],
    }
  },
  components: {
    HelloWorld
  },
  mounted: {
    emitToApp (value) {
      this.users = value
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>