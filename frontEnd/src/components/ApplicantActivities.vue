<template>
  <v-card width="90%" class="mx-auto">
    <v-card-title> Activities </v-card-title>
    <v-container >
      <v-row>
        <v-col v-for="header in headers" :key="header"> {{ header }} </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-expansion-panels accordion focusable >
        <div v-for="task in tasks" :key="task.name" width=100% style="width: 1800px">
          <v-expansion-panel >
            <v-expansion-panel-header>
            <v-row>
              <v-col>
                <v-btn text> {{ task.name }} </v-btn>
              </v-col>
              <v-col>
                <v-chip text-color="black" class="ma-2" :color="statusColor[task.status]"> 
                  <v-icon 
                  class="pl-1"
                  color="white"
                  left>
                    {{ statusIcons[task.status] }}
                  </v-icon>
                  {{ task.status }}  
                </v-chip>
              </v-col>
              <v-col> {{ task.dueDate }} </v-col>
              <v-col>
                <v-icon color="accent">
                  {{ task.upload ? uploadIcons.upload : uploadIcons.noUpload }}
                </v-icon>
              </v-col>
            </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p class="float-left mt-7" style="width: 40%; text-align: left"> {{ task.description }} </p>
              <v-btn v-if="!noActions.includes(task.name)" class="float-right mt-5"> Mark Complete </v-btn>
              <v-btn v-if="task.upload" class="float-right mt-5 mr-5"> Upload Document </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-divider></v-divider>
        </div>
      </v-expansion-panels>
    </v-container>
  </v-card>
</template>

<script>
// TODO:
//EXAMPLE Vue component:
// import {getAllUsers} from "../services/apiServices" //Import any func you need

export default {
  data() {
    return {
      tasks: require("../assets/activities.json"),
      headers: ["Name", "Status", "Due Date", "Upload", ""],
      statusColor: {
        Complete: "accent",
        Incomplete: "needsattention"
      },
      uploadIcons: {
        noUpload: "mdi-cloud-off-outline",
        upload: "mdi-cloud-upload",
        uploadComplete: "mdi-cloud-check",
      },
      statusIcons: {
        Complete: "mdi-check", 
        Incomplete: "mdi-alert"
      },
      dialog: false,
      noActions: ["BIG Profile", "You are no BIG Deal :(", "You are a BIG Deal!"]
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