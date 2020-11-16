<template>
  <div id="app">
    <v-app>
    <applicant-activities class="mx-auto">
    </applicant-activities>
  </v-app>
  </div>
</template>

<script>
import ApplicantActivities from './components/ApplicantActivities.vue';
export default {
  name: 'App',
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

  components: {
    "applicant-activities": ApplicantActivities
  },
  // mounted: {
  //   emitToApp (value) {
  //     this.users = value
  //   }
  // }
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