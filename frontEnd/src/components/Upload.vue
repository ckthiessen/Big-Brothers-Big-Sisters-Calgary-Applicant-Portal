<template>
  <div>
    <v-file-input
      label="Upload an image to Firebase"
      accept="application/pdf"
      v-model="imageData"
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
      imageData: null,
      picture: null,
      uploadValue: 0,
    };
  },
  props: {
    task: Object,
  },
  methods: {
    onUpload() {
      this.picture = null;
      //adds to a folder based on the users ID
      const storageRef = firebase.storage().ref(this.$route.params.applicantID + "/" + `${this.imageData.name}`).put(this.imageData);
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
            this.picture = url;
          });
          this.$emit(
            "Uploaded",
            this.$route.params.applicantID + "/" + `${this.imageData.name}`
          );
        }
      );
    },
  },
  created() {
    //const storageRef = firebase.storage().ref(this.task.fileUpload).getDownloadURL();
  },
};
</script>
