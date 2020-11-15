<template>
  <v-card width="90%" class="mx-auto">
    <v-card-title> Activities </v-card-title>
    <v-container fluid>
      <v-row>
        <v-col v-for="header in headers" :key="header"> {{ header }} </v-col>
      </v-row>
      <v-divider></v-divider>
      <div v-for="task in tasks" :key="task.name">
        <v-row>
          <v-dialog scrollable max-width="80%" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
              <v-col>
                <v-btn text v-bind="attrs" v-on="on"> {{ task.name }} </v-btn>
              </v-col>
            </template>

            <v-card>
              <v-card-title> {{ task.name }} </v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 50vh">
                {{ task.description }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-col>
            <v-chip class="ma-2" color="accent"> {{ task.status }} </v-chip>
          </v-col>
          <v-col> {{ task.dueDate }} </v-col>
          <v-col>
            <v-icon color="accent">
              {{ task.upload ? icons.upload : icons.noUpload }}
            </v-icon>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { mdiCloudCheck, mdiCloudUpload, mdiCloudOffOutline } from "@mdi/js";
// TODO:
//EXAMPLE Vue component:
// import {getAllUsers} from "../services/apiServices" //Import any func you need

export default {
  data() {
    return {
      tasks: require("../assets/activities.json"),
      headers: ["Name", "Status", "Due Date", "Upload"],
      icons: {
        noUpload: mdiCloudOffOutline,
        upload: mdiCloudUpload,
        complete: mdiCloudCheck,
      },
      dialog: false,
    };
  },
  created() {},
  computed: {
    // showIcon: () => {
    //   return this.
    // }
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Vertically center the text in each row */
div .col {
  margin: auto 0 auto 0;
}
a {
  color: #8A8A8A;
}
a:visited {
  color: #8A8A8A;
}
a:active {
  color: #8A8A8A;
}
a:hover {
  color: #8A8A8A;
}
</style>