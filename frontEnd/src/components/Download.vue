<template>
  <a target="_blank" rel="noreferrer noopener" :href="downloadLink" download="report.pdf">
    <v-btn 
    rounded
    color="accent"> 
      <v-icon v-if="buttonText === ''">
        mdi-download
      </v-icon>
      <v-icon v-else left>
        mdi-download
      </v-icon>
      {{ buttonText }}
      </v-btn>
  </a>
</template>

<script>
import firebase from "firebase";

export default {
  name: "upload",
  data() {
    return {
      downloadLink: null,
    };
  },
  props: {
    task: Object,
    buttonText: {
      type: String,
      default: ""
    }
  },
  created() {
    const storageRef = firebase.storage().ref(this.task.fileUpload);
    storageRef.getDownloadURL().then(res => {
      this.downloadLink = res;
    });
  },
};
</script>
<style>
 a {
   text-decoration: none;
 }
</style>



