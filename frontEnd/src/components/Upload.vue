<template>
  <div>
    <v-file-input
      label="Upload an image to Firebase"
      accept="application/pdf"
      v-model="imageData"
    >
    </v-file-input>
    <div v-if="!imageData">
      <div >
        <p>
          Progress: {{ uploadValue.toFixed() + "%" }}
          <progress id="progress" :value="uploadValue" max="100"></progress>
        </p>
      </div>
      <div>
        <br />
        <button @click="onUpload">Upload</button>
      </div>
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
      downloadLink: null
    };
  },
  props: {
    task: Object,
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.picture = null;
      //adds to a folder based on the users ID
      const storageRef = firebase
        .storage()
        .ref(this.$route.params.applicantID + "/" + `${this.imageData.name}`)
        .put(this.imageData);
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
        }
      );
      this.$emit(
        "Uploaded",
        this.$route.params.applicantID + "/" + `${this.imageData.name}`
      );
    },
  },
  created() {
    //const storageRef = firebase.storage().ref(this.task.fileUpload).getDownloadURL();
  },
};
</script>
