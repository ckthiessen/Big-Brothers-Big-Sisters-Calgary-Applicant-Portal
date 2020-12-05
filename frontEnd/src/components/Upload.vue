<template>
  <div>
    <v-file-input
      label="Upload a file"
      accept="application/pdf"
      v-model="fileData"
      @change="onUpload"
    >
    </v-file-input>
    <div>
      <p>
        Progress: {{ uploadValue.toFixed() + "%" }}
        <progress id="progress" :value="uploadValue" max="100"></progress>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "upload",
  data() {
    return {
      fileData: null,
      file: null,
      uploadValue: 0,
    };
  },
  props: {
    task: Object,
  },
  methods: {
    onUpload() {
      this.file = null;
      //adds to a folder based on the users ID
      const storageRef = firebase.storage().ref(this.$route.params.applicantID + "/" + `${this.fileData.name}`).put(this.fileData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.file = url;
          });
          this.$emit(
            "Uploaded",
            this.$route.params.applicantID + "/" + `${this.fileData.name}`
          );
        }
      );
    },
  }
};
</script>
