<template>
  <div>
    <v-btn
      target="_blank"
      :href="task.fileUpload"
      icon
      rel="noreferrer noopener"
      download="Offence Declaration.pdf"
      color="accent"
    >
      <v-icon>mdi-download</v-icon>
    </v-btn>
    <v-btn color="accent darken-1" text @click="deleteFile"> Delete </v-btn>
  </div>
</template>

<script>
import firebase from "firebase";
import 'firebase/firestore';

export default {
  name: "download",
  props: {
    task: Object,
    applicantID: String,
  },
  methods: {
    async deleteFile() {
      // If the resource was a file, have to delete from firebase storage as well
      // TODO: Handle delete. Make delete button read only when already approved and show tool tip
      try {
        // await firebase
        //   .storage()
        //   .ref(`${this.applicantID}/${this.task.name}`)
        //   .delete();

        await firebase.firestore()
          .collection("users")
          .doc(this.applicantID)
          .update({
            fileUpload: firebase.firestore.FieldValue.delete()
          });
          console.log("done")

        this.$emit("deleted", this.task);
      } catch (error) {
        console.log(error)
        this.$emit("delete-error", error.message);
      }
    },
  },
};
</script>