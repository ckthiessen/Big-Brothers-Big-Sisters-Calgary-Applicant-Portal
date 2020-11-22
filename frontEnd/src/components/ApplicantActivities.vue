<template>
  <v-card width="90%" class="mx-auto">
    <v-card-title> Activities </v-card-title>
    <v-container>
     <v-row justify-space-around>
        <v-col cols="1" class="d-flex flex-left pl-6 pr-0"> Name </v-col>
        <v-col cols="2" offset="2" class="pl-0"> Status </v-col>
        <v-col cols="1" offset="1" class="pl-0">  Due Date </v-col>
        <v-col > Upload </v-col>
        <v-col cols="1"></v-col>
      </v-row>
      <v-divider></v-divider>
      <v-expansion-panels accordion focusable>
        <div
          v-for="(task, index) in tasks"
          :key="task.name"
          width="100%"
          style="width: 1800px"
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row>
                <v-col>
                  {{ task.name }}
                </v-col>
                <v-col>
                  <v-chip
                    text-color="black"
                    class="ma-2"
                    :color="status[task.status].color"
                  >
                    <v-icon class="pl-1" color="white" left>
                      {{ status[task.status].icon }}
                    </v-icon>
                    {{ status[task.status].title }}
                  </v-chip>
                </v-col>
                <v-col> {{ task.dueDate }} </v-col>
                <v-col>
                  <v-icon color="accent">
                    {{
                      task.upload ? uploadIcons.upload : uploadIcons.noUpload
                    }}
                  </v-icon>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p class="float-left mt-7" style="width: 40%; text-align: left">
                {{ task.description }}
              </p>
              <v-btn
                @click="changeStatus(task.status, index)"
                v-if="!noActions.includes(task.name)"
                class="float-right mt-5"
              >
                {{ buttonTitle(task.status) }}
              </v-btn>
              <v-btn v-if="task.upload" class="float-right mt-5 mr-5">
                Upload Document
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-divider></v-divider>
        </div>
      </v-expansion-panels>
    </v-container>
  </v-card>
</template>

<script>
// TODO: Handle due dates -> Will be done on account creation
// TODO: Fix alignment -> I have given up, someone else can try it. 
// TODO: Figure out how to upload docs --> Wait until backend is fully functioning
// TODO: How to handle API get error? --> Ditto
// TODO: How to update tasks application status in the backend? --> Ditto 
// TODO: Decide whether will refactor out activities.json --> Ditto


import {getUserByID} from "../services/apiServices" //Import any func you need

export default {
  data() {
    return {
      applicant: {},
      tasks: [],
      headers: ["Name", "Status", "Due Date", "Upload"],
      status: {
        Complete: {
          color: "complete",
          title: "Complete",
          icon: "mdi-check-circle",
        },
        InProgress: {
          color: "inprogress",
          title: "Waiting Approval",
          icon: "mdi-dots-horizontal-circle",
        },
        Incomplete: {
          color: "needsattention",
          title: "Incomplete",
          icon: "mdi-alert",
        },
      },
      uploadIcons: {
        noUpload: "mdi-cloud-off-outline",
        upload: "mdi-cloud-upload",
        uploadComplete: "mdi-cloud-check",
      },
      requiresHomeAssessment: false,
      isCommunityMentor: false,
      noActions: [
        "BIG Profile",
        "You are no BIG Deal :(",
        "You are a BIG Deal!",
      ],
    };
  },
  // props: {
  //   applicant: Object,
  // },
  // created() {},
  // computed: {
  // },
  methods: {
    changeStatus(status, index) {
      let selectedTask = this.tasks[index];
      if (selectedTask.status === "Incomplete") {
        selectedTask.status = "InProgress";
      } else if (selectedTask.status === "InProgress") {
        selectedTask.status = "Incomplete";
      }
    },
    buttonTitle: function (status) {
      return status === "InProgress" ? "Mark Incomplete" : "Request Approval"
    },
  },
  created() {
    getUserByID(1).then(res => {
      for (const serverTask of Object.values(res.tasks)) {
        let clientTask = {} 
        clientTask.name = serverTask.name;
        clientTask.dueDate = serverTask.dueDate; 
        if(serverTask.isComplete) {
            clientTask.status = "Complete"; 
        }
        else if(serverTask.isSubmitted) { 
            clientTask.status = "InProgress"; 
        } else {
            clientTask.status = "Incomplete"; 
        }
        clientTask.description = "Lorem Ipsum"
        // TODO: Refactor into getDescription using map lookup
        this.tasks.push(clientTask);
      }
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>