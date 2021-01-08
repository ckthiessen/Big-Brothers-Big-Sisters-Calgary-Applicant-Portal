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

export default {
  name: "download",
  props: {
    task: Object
  },
  methods: {
    async delete() {
        // If the resource was a file, have to delete from firebase storage as well
        // TODO: Handle delete. Make delete button read only when already approved and show tool tip
        await firebase.storage().ref(resource.name).delete();
        await db.collection('resources').doc(resource.name).delete();
      }
  }
};
</script>
<style>
a {
  text-decoration: none;
}
</style>



