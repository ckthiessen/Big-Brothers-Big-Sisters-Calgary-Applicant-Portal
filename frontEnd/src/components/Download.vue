<template>
  <a target="_blank" rel="noreferrer noopener" :href="downloadLink" download="report.pdf">
    <v-icon> mdi-download </v-icon>
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
    task: Object
  },
  methods: {
  },
  created() {
    const storageRef = firebase.storage().ref(this.task.fileUpload);
    storageRef.getDownloadURL().then(res => {
      this.downloadLink = res;
    });
  },
};
</script>



