<template>
  <a target="_blank" rel="noreferrer noopener" :href="downloadLink" download="report.pdf">
    <v-btn> 
      <v-icon left>
        mdi-download
      </v-icon>
      Offence Declaration
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
    fileName: String
  },
  created() {
    const storageRef = firebase.storage().ref(this.task.fileUpload);
    storageRef.getDownloadURL().then(res => {
      this.downloadLink = res;
    });
  },
};
</script>



